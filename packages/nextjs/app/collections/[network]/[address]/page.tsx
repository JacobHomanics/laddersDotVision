"use client";

import React from "react";
import "react-dropdown/style.css";
import { Collection } from "~~/components/scaffold-nft/collection/Collection";
// import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
// import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";
// import { useTokens } from "~~/hooks/scaffold-nft/useTokens";
import { useTokensRevamped } from "~~/hooks/scaffold-nft/useTokensRevampled";
import { renderInputOptions } from "~~/scaffold-nft-config";

export default function CollectionPage({ params }: { params: { network: string; address: string } }) {
  const {
    //inputComponents,
    componentsToRender,
  } = useCheckboxes(renderInputOptions);

  // const { tokenIds, setTokenIds } = useTokenIds(15);
  // async function onSubmit(newIds: bigint[]) {
  //   setTokenIds([...newIds]);
  // }

  // const {
  //   // chosenOption,
  //   // chosenOption2,
  //   output: advancedOutput,
  // } = useAdvancedFiltering(inputComponents, onSubmit);

  // const { collection, isLoading, isError } = useTokens(
  //   params["network"],
  //   params["address"],
  //   tokenIds,
  //   chosenOption,
  //   //chosenOption2,
  // );

  const {
    collection: collection2,
    isLoading: isLoading2,
    isError: isError2,
  } = useTokensRevamped(params["network"], params["address"], 15);

  console.log(collection2);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* {advancedOutput} */}
      <Collection collection={collection2} isLoading={isLoading2} isError={isError2} renderOrder={componentsToRender} />
    </div>
  );
}
