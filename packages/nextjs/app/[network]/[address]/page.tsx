"use client";

import React from "react";
import "react-dropdown/style.css";
import { renderInputOptions } from "~~/app/nftCollectionPagesConfig";
import { CollectionCard } from "~~/components/nft-card/CollectionCard";
import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
import { useCollection } from "~~/hooks/scaffold-nft/useCollection";
import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";

export default function CollectionPage({ params }: { params: { network: string; address: string } }) {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useCollection(
    params["network"],
    params["address"],
    tokenIds,
    chosenOption,
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <CollectionCard
        collection={collection}
        isLoading={isLoading}
        isError={isError}
        renderOrder={componentsToRender}
      />
    </div>
  );
}
