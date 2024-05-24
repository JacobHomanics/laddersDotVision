"use client";

import React from "react";
import "react-dropdown/style.css";
// import { Collection } from "~~/components/scaffold-nft/collection/Collection";
// import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
import useAdvancedFilteringAssumptuous from "~~/hooks/scaffold-nft/useAdvancedFilteringAssumptuous";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
// import { useTargetNetwork2 } from "~~/hooks/scaffold-nft/useTargetNetwork2";
// import { useTokens } from "~~/hooks/scaffold-nft/useTokens";
// import { useTokensAssumptuous } from "~~/hooks/scaffold-nft/useTokensAssumptuous";
import { renderInputOptions } from "~~/scaffold-nft-config";

export default function CollectionPage({}: { params: { network: string; address: string } }) {
  // const { targetNetwork2 } = useTargetNetwork2(params["network"]);

  const {
    inputComponents, //componentsToRender
  } = useCheckboxes(renderInputOptions);

  // const { selectedMetadataLoadType, tokenIds, output: advancedOutput } = useAdvancedFiltering(inputComponents, 15);

  // const { collection, isLoading, isError } = useTokens(
  //   params["network"],
  //   params["address"],
  //   tokenIds,
  //   selectedMetadataLoadType,
  // );

  const {
    // startIndex,
    // numToAttemptToRender,
    output: advancedOutput2,
  } = useAdvancedFilteringAssumptuous(inputComponents, 0, 14);

  // const {
  //   collection: collection2,
  //   isLoading: isLoading2,
  //   isError: isError2,
  // } = useTokensAssumptuous(params["network"], params["address"], startIndex, numToAttemptToRender);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* {advancedOutput}
      <Collection collection={collection} isLoading={isLoading} isError={isError} renderOrder={componentsToRender} /> */}

      {advancedOutput2}
      {/* <Collection collection={collection2} isLoading={isLoading2} isError={isError2} renderOrder={componentsToRender} /> */}
    </div>
  );
}
