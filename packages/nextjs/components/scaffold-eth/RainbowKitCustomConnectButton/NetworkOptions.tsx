import { useTheme } from "next-themes";
import {
  //useAccount,
  useSwitchChain,
} from "wagmi";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { getNetworkColor } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

// import { getTargetNetworks } from "~~/utils/scaffold-eth";

// const allowedNetworks = getTargetNetworks();

type NetworkOptionsProps = {
  hidden?: boolean;
};

export const NetworkOptions = ({ hidden = false }: NetworkOptionsProps) => {
  const targetNetwork2 = useGlobalState(({ targetNetwork2 }) => targetNetwork2);

  const { switchChain } = useSwitchChain();
  // const { chain } = useAccount();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      {/* {allowedNetworks */}
      {/* .filter(allowedNetwork => allowedNetwork.id !== chain?.id) */}
      {/* .map(allowedNetwork => ( */}
      <li key={targetNetwork2.id} className={hidden ? "hidden" : ""}>
        <button
          className="menu-item btn-sm !rounded-xl flex gap-3 py-3 whitespace-nowrap"
          type="button"
          onClick={() => {
            switchChain?.({ chainId: targetNetwork2.id });
          }}
        >
          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
          <span>
            Switch to{" "}
            <span
              style={{
                color: getNetworkColor(targetNetwork2, isDarkMode),
              }}
            >
              {targetNetwork2.name}
            </span>
          </span>
        </button>
      </li>
      {/* ))} */}
    </>
  );
};
