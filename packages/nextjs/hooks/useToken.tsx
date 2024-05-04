"use client";

import { useFetches } from "./UseFetches";
import { useTokenURIs } from "./useTokenURIs";
import { useFetch } from "usehooks-ts";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
  w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (tokenIds: bigint[], replacementType: "ipfs" | "nftstorage" | "w3s" = "ipfs") => {
  const { data: scaffoldErc721 } = useScaffoldContract({ contractName: "ScaffoldERC721" });

  const {
    data: collectionName,
    isLoading: isLoadingName,
    isError: isErrorName,
  } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "name",
  });

  const {
    data: collectionSymbol,
    isLoading: isLoadingSymbol,
    isError: isErrorSymbol,
  } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "symbol",
  });

  // const [myUris, setMyUris] = useState<any[]>([]);

  // useEffect(() => {
  //   async function get() {
  //     const tempArr = [];

  //     for (let i = 0; i < tokenIds.length; i++) {
  //       const result = await scaffoldErc721?.read.tokenURI([tokenIds[i]]);
  //       tempArr.push(result);
  //     }

  //     console.log("Set");

  //     setMyUris([...tempArr]);
  //   }

  //   get();
  // }, [scaffoldErc721?.address, tokenIds]);

  const { uris, isLoading: isLoadingUris, isError: isErrorUris } = useTokenURIs(scaffoldErc721, tokenIds);

  for (let i = 0; i < uris.length; i++) {
    uris[i] = uris[i].replace("ipfs://", replacement[replacementType]);
  }

  const { responses, isLoading: isLoadingFetches, isError: isErrorFetches } = useFetches(uris);

  const tokens: any[] = [];
  for (let i = 0; i < responses.length; i++) {
    responses[i] ? (responses[i].image = responses[i].image.replace("ipfs://", replacement[replacementType])) : <></>;

    const token = {} as any;
    token.address = scaffoldErc721?.address;
    token.metadata = responses[i];
    token.id = tokenIds[i];
    token.uri = uris[i];
    token.collectionName = collectionName;
    token.collectionSymbol = collectionSymbol;
    tokens.push(token);
  }

  return {
    tokens,
    isLoading: isLoadingName || isLoadingSymbol || isLoadingUris || isLoadingFetches,
    isError: isErrorName || isErrorSymbol || isErrorUris || isErrorFetches,
    // refetch: refetchURIs,
  };
};

export const useToken = (tokenId: bigint, replacementType: "ipfs" | "nftstorage" | "w3s" = "ipfs") => {
  const { data: scaffoldErc721 } = useScaffoldContract({ contractName: "ScaffoldERC721" });

  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "tokenURI",
    args: [tokenId],
  });

  const { data: collectionName } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "name",
  });

  const { data: collectionSymbol } = useScaffoldReadContract({
    contractName: "ScaffoldERC721",
    functionName: "symbol",
  });

  const formattedURI = tokenURI?.replace("ipfs://", replacement[replacementType]);

  const { data: result } = useFetch<any>(formattedURI);

  result ? (result.image = result?.image?.replace("ipfs://", replacement[replacementType])) : <></>;

  const token = {} as any;
  token.address = scaffoldErc721?.address;
  token.metadata = result;
  token.id = tokenId;
  token.uri = formattedURI;
  token.collectionName = collectionName;
  token.collectionSymbol = collectionSymbol;

  return token;
};
