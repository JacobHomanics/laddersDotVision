"use client";

import { renderInputOptions } from "../../scaffold-nft-config";
import type { NextPage } from "next";
import { Collection } from "~~/components/scaffold-nft/collection/Collection";
import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
import { useScaffoldTokens } from "~~/hooks/scaffold-nft/useScaffoldTokens";
import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";

const TestingGroundsPage: NextPage = () => {
  const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const { tokenIds, setTokenIds } = useTokenIds(15);
  async function onSubmit(newIds: bigint[]) {
    setTokenIds([...newIds]);
  }

  const { chosenOption, output: advancedOutput } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useScaffoldTokens(tokenIds, chosenOption);

  return (
    <div className="flex flex-col items-center justify-center">
      {advancedOutput}
      <Collection collection={collection} isLoading={isLoading} isError={isError} renderOrder={componentsToRender} />
    </div>
  );
};

export default TestingGroundsPage;
