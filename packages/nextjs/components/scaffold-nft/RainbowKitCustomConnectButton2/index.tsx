"use client";

// @refresh reset
// import { Balance } from "../../scaffold-eth/Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
// import { useStore } from "zustand";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
// import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
// import { useTargetNetwork2 } from "~~/hooks/scaffold-nft/useTargetNetwork2";
import { useGlobalState } from "~~/services/store/store";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton2 = () => {
  const networkColor = useNetworkColor();
  // const { targetNetwork } = useTargetNetwork();
  // const { targetNetwork2 } = useTargetNetwork2();
  const targetNetwork2 = useGlobalState(({ targetNetwork2 }) => targetNetwork2);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork2!, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.id !== targetNetwork2!.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <>
                  <div className="flex flex-col items-center mr-1">
                    {/* <Balance address={account.address as Address} className="min-h-0 h-auto" /> */}
                    <span className="text-xs" style={{ color: networkColor }}>
                      {chain.name}
                    </span>
                  </div>
                  <AddressInfoDropdown
                    address={account.address as Address}
                    displayName={account.displayName}
                    ensAvatar={account.ensAvatar}
                    blockExplorerAddressLink={blockExplorerAddressLink}
                  />
                  <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
