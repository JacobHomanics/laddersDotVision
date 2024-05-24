"use client";

import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { wagmiConnectors } from "../services/web3/wagmiConnectors";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Chain, createClient, http } from "viem";
import { hardhat } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { createConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { useGlobalState } from "~~/services/store/store";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetNetwork2 = useGlobalState(({ targetNetwork2 }) => targetNetwork2);

  const [wagmiConfig, setWagmiConfig] = useState<any>(
    createConfig({
      chains: [targetNetwork2],
      connectors: wagmiConnectors,
      ssr: true,
      client({ chain }) {
        return createClient({
          chain,
          transport: http(getAlchemyHttpUrl(chain.id)),
          ...(chain.id !== (hardhat as Chain).id
            ? {
                pollingInterval: scaffoldConfig.pollingInterval,
              }
            : {}),
        });
      },
    }),
  );

  useEffect(() => {
    setWagmiConfig(
      createConfig({
        chains: [targetNetwork2],
        connectors: wagmiConnectors,
        ssr: true,
        client({ chain }) {
          return createClient({
            chain,
            transport: http(getAlchemyHttpUrl(chain.id)),
            ...(chain.id !== (hardhat as Chain).id
              ? {
                  pollingInterval: scaffoldConfig.pollingInterval,
                }
              : {}),
          });
        },
      }),
    );
  }, [targetNetwork2.id]);

  // const result = {
  //   ...wagmiConfig,
  //   ...{chains: [targetNetwork2]},
  // };
  // const wagmiConfig = createConfig({
  //   chains: [targetNetwork2],
  //   connectors: wagmiConnectors,
  //   ssr: true,
  //   client({ chain }) {
  //     return createClient({
  //       chain,
  //       transport: http(getAlchemyHttpUrl(chain.id)),
  //       ...(chain.id !== (hardhat as Chain).id
  //         ? {
  //             pollingInterval: scaffoldConfig.pollingInterval,
  //           }
  //         : {}),
  //     });
  //   },
  // });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
