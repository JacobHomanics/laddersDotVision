"use client";

import { renderInputOptions } from "../nftCollectionPagesConfig";
import type { NextPage } from "next";
import { CollectionCard } from "~~/components/nft-card/CollectionCard";
import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
import { useScaffoldCollection } from "~~/hooks/scaffold-nft/useScaffoldCollection";
import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";

const TestingGroundsPage: NextPage = () => {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useScaffoldCollection(tokenIds, chosenOption);

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
};

export default TestingGroundsPage;
