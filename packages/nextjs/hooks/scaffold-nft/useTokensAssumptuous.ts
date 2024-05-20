import { useEffect, useState } from "react";
import { erc165Abi } from "./erc165Abi";
import { erc1155Abi } from "./erc1155Abi";
import { erc721Abi } from "viem";
import * as allChains from "viem/chains";
import { createConfig, http, usePublicClient } from "wagmi";
import { ScaffoldCollection } from "~~/types/scaffold-nft/ScaffoldCollection";

export const useTokensAssumptuous = (chainName: string, address: string, numToAttemptLoad: number) => {
  const chain = allChains[chainName as keyof typeof allChains];

  const config = createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    } as any,
  });

  const publicClient = usePublicClient({ chainId: chain.id, config });

  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(false);

  const [collection, setCollection] = useState<any>(undefined);

  async function getIsErc1155() {
    let supportsInterface;
    let isErrored;

    try {
      supportsInterface = await publicClient?.readContract({
        address,
        abi: erc165Abi,
        functionName: "supportsInterface",
        args: ["0xd9b67a26"],
      });
    } catch (e) {
      supportsInterface = false;
      isErrored = true;
    }

    return { supportsInterface, isErrored };
  }

  async function getIsErc721() {
    let supportsInterface;
    let isErrored;

    try {
      supportsInterface = await publicClient?.readContract({
        address,
        abi: erc165Abi,
        functionName: "supportsInterface",
        args: ["0x80ac58cd"],
      });
    } catch (e) {
      supportsInterface = false;
      isErrored = true;
    }

    return { supportsInterface, isErrored };
  }

  useEffect(() => {
    async function get() {
      setIsLoading(true);
      const { supportsInterface: isErc1155Result, isErrored: isErc1155Error } = await getIsErc1155();
      const { supportsInterface: isErc721Result, isErrored: isErc721Error } = await getIsErc721();

      let isErc721;

      if (isErc721Error && isErc1155Error) {
        isErc721 = true;
      } else {
        isErc721 = isErc721Result;
      }

      let balanceOf;

      let collectionName;
      let collectionSymbol;

      if (isErc721) {
        collectionName = await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "name",
        });

        collectionSymbol = await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "symbol",
        });

        balanceOf = await publicClient?.readContract({
          address,
          abi: erc721Abi,
          functionName: "balanceOf",
          args: ["0xc689c800a7121b186208ea3b182fAb2671B337E7"],
        });
      }

      const tokens = [];
      let currentIndex = BigInt(0);

      while (true) {
        if (currentIndex === BigInt(numToAttemptLoad)) break;

        let tokenURI: any;
        let tokenURIFormatted;
        let metadataJson;
        let balanceOfToken;

        let isSkip;

        try {
          if (isErc721) {
            tokenURI = await publicClient?.readContract({
              address,
              abi: erc721Abi,
              functionName: "tokenURI",
              args: [currentIndex],
            });
          }

          if (isErc1155Result) {
            balanceOfToken = await publicClient?.readContract({
              address,
              abi: erc1155Abi,
              functionName: "balanceOf",
              args: ["0xc689c800a7121b186208ea3b182fAb2671B337E7", currentIndex],
            });

            tokenURI = await publicClient?.readContract({
              address,
              abi: erc1155Abi,
              functionName: "uri",
              args: [currentIndex],
            });
          }

          if (tokenURI !== "") {
            const supportedGateways = [
              "https://nftstorage.link/ipfs/",
              "https://w3s.link/ipfs/",
              "https://ipfs.io/ipfs/",
            ];

            let foundGateway = false;
            for (let i = 0; i < supportedGateways.length; i++) {
              try {
                tokenURIFormatted = tokenURI?.replace("ipfs://", supportedGateways[i]);
                const metadata = await fetch(tokenURIFormatted);
                metadataJson = await metadata.json();
                foundGateway = true;
                break;
              } catch (e) {}
            }

            if (!foundGateway) {
              metadataJson = JSON.parse(tokenURI.substring(27));
            }

            for (let i = 0; i < supportedGateways.length; i++) {
              metadataJson.image = metadataJson.image.replace("ipfs://", supportedGateways[i]);
            }

            metadataJson.image = {
              value: metadataJson.image,
              alt: metadataJson.name + " Image",
            };
          }
          //skip
          else {
            isSkip = true;
          }
        } catch (e) {
          //skip
          if (e) {
            isSkip = true;
          }
        }

        if (!isSkip) {
          const token = {} as any;
          token.address = address;
          token.metadata = metadataJson;
          token.id = currentIndex;
          token.uri = tokenURIFormatted;
          token.uriRaw = tokenURI;
          token.collectionName = collectionName;
          token.collectionSymbol = collectionSymbol;
          token.balanceOf = balanceOfToken;
          tokens.push(token);
        }

        currentIndex++;
      }

      const collection = {} as ScaffoldCollection;
      collection.tokens = tokens;
      collection.address = address;
      collection.symbol = collectionSymbol;
      collection.name = collectionName;
      collection.balanceOf = balanceOf;

      setCollection(collection);

      setIsLoading(false);
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient?.account]);

  return { collection, isLoading, isError };
};
