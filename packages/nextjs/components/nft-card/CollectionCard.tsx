"use client";

import React from "react";
import "react-dropdown/style.css";
import { NftCard } from "~~/components/nft-card/NftCard";
import { CollectionDetails } from "~~/components/nft-card/values/extensions/CollectionDetails";

type Props = {
  collection: any;
  isLoading: any;
  isError: any;
  renderOrder: any;
};

export const CollectionCard = ({ collection, isLoading, isError, renderOrder }: Props) => {
  const tokensComponents = collection?.tokens?.map((token: any, index: number) => {
    return <NftCard key={index} token={token} renderOrder={renderOrder} />;
  });

  let mainContent;
  if (isLoading) {
    mainContent = <p>Loading Collection...</p>;
  } else {
    if (isError) {
      mainContent = <p>There was an error. Please try changing the advanced settings.</p>;
    } else {
      mainContent = (
        <>
          <div className="w-full">
            <CollectionDetails collection={collection} />
          </div>
          <div className="flex flex-wrap justify-center m-1 p-1 bg-base-100 rounded lg:max-w-[1300px]">
            {tokensComponents}
          </div>
        </>
      );
    }
  }

  return <div className="flex flex-col items-center justify-center">{mainContent}</div>;
};
