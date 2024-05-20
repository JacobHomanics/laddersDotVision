"use client";

import React from "react";
import "react-dropdown/style.css";
import { Collection } from "~~/components/scaffold-nft/collection/Collection";
import useAdvancedFilteringAssumptuous from "~~/hooks/scaffold-nft/useAdvancedFilteringAssumptuous";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
import { useTokensAssumptuous } from "~~/hooks/scaffold-nft/useTokensAssumptuous";
import { renderInputOptions } from "~~/scaffold-nft-config";

// import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
// import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";
// import { useTokens } from "~~/hooks/scaffold-nft/useTokens";

export default function CollectionPage({ params }: { params: { network: string; address: string } }) {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  // const { tokenIds, setTokenIds } = useTokenIds(15);

  // const [startIndex, setStartIndex] = useState(0);
  // const [numToAttemptToRender, setNumToAttemptToRender] = useState(0);

  // async function onSubmit(newIds: bigint[], startIndex: number, numToAttemptToRender: number) {
  //   // setTokenIds([...newIds]);
  //   setStartIndex(startIndex);
  //   setNumToAttemptToRender(numToAttemptToRender);
  // }

  // const {
  //   // chosenOption,
  //   // chosenOption2,
  //   output: advancedOutput,
  // } = useAdvancedFiltering(inputComponents, onSubmit);

  const {
    startIndex,
    numToAttemptToRender,
    output: advancedOutput,
  } = useAdvancedFilteringAssumptuous(inputComponents, 0, 14);

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
  } = useTokensAssumptuous(params["network"], params["address"], startIndex, numToAttemptToRender);

  console.log(collection2);

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <Collection collection={collection2} isLoading={isLoading2} isError={isError2} renderOrder={componentsToRender} />
    </div>
  );
}
