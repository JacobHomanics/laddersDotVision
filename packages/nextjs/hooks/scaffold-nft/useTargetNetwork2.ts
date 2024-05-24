import { useEffect } from "react";
// import dynamic from "next/dynamic";
// import * as allChains from "viem/chains";
// import { useAccount } from "wagmi";
// import { createConfig, http, usePublicClient } from "wagmi";
// import scaffoldConfig from "~~/scaffold.config";
import { useGlobalState } from "~~/services/store/store";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { NETWORKS_EXTRA_DATA } from "~~/utils/scaffold-eth";

export function useTargetNetwork2(chainName: string): { targetNetwork2: ChainWithAttributes | undefined } {
  const targetNetwork2 = useGlobalState(({ targetNetwork2 }) => targetNetwork2);
  const setTargetNetwork2 = useGlobalState(({ setTargetNetwork2 }) => setTargetNetwork2);

  // const { chain } = useAccount();
  // const targetNetwork2 = useGlobalState(({ targetNetwork2 }) => targetNetwork2);
  // const setTargetNetwork = useGlobalState(({ setTargetNetwork }) => setTargetNetwork);

  useEffect(() => {
    // const newSelectedNetwork = scaffoldConfig.targetNetworks.find(targetNetwork2 => targetNetwork2.id === chain?.id);
    // if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork2.id) {
    //   setTargetNetwork2(newSelectedNetwork);
    // }

    async function get() {
      // const result = await import("viem/chains/");

      // console.log(result);

      // const chain2 = result[chainName as keyof typeof allChains];

      const value = (await import("viem/chains")) as any;

      // .then((mod) => mod[chainName])
      // const Widget = dynamic(
      //   () => ,
      //   { ssr: false }
      // );

      const chain2 = value[chainName as any];
      setTargetNetwork2(chain2);
    }
    get();
  }, [setTargetNetwork2, targetNetwork2?.id]);

  return {
    targetNetwork2: {
      ...targetNetwork2,
      ...NETWORKS_EXTRA_DATA[targetNetwork2.id],
    },
  };
}
