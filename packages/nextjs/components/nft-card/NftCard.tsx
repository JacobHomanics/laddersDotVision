"use client";

import { Address } from "../scaffold-eth";
import { Size, Style, beautyStyleMap } from "./types/Types";
import { DescriptorCard } from "./values/DescriptorCard";
import { ImageCard } from "./values/ImageCard";
import { NewAttributesCard } from "./values/NewAttributesCard";
import { TextCard } from "./values/TextCard";
import { v4 as uuidv4 } from "uuid";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

type PrettyLoadType = "animated" | "text";

type Props = {
  token?: ScaffoldToken;
  imageAlt?: string;

  renderOrder?: (
    | "Image"
    | "Id"
    | "Name"
    | "Description"
    | "Attributes"
    | "Address"
    | "CollectionName"
    | "CollectionSymbol"
  )[];
  collectionDataLoadType?: "Together" | "Individual";
  prettyLoad?: boolean;
  prettyLoadType?: PrettyLoadType;
  size?: Size;
  style?: Style;
};

export const NftCard = ({
  token,
  imageAlt = "Image",

  renderOrder = ["Image", "Id", "Name", "Description", "Attributes", "Address", "CollectionName", "CollectionSymbol"],
  prettyLoad = true,
  prettyLoadType = "animated",
  size = "base",
  style = "rounded",
}: Props) => {
  const sizeMap = {
    base: "w-32 lg:w-96 m-0.5 lg:m-4",
    // base: "max-w-96 lg:max-w-max m-4",
  };

  const animatedLoadingSizeMap = {
    base: "h-80 w-32",
  };

  const textLoadingSizeMap = {
    base: "text-4xl",
  };

  const prettyLoadMap = {
    animated: (
      <div className="animate-pulse flex space-x-4">
        <div className="flex items-center space-y-6">
          <div className={`bg-slate-300 ${animatedLoadingSizeMap[size]}  ${beautyStyleMap[style]}`}></div>
        </div>
      </div>
    ),
    text: <p className={`text-center ${textLoadingSizeMap[size]}`}>Loading NFT...</p>,
  };

  const renderedComponents: any = [];

  const bigAndBoldTextStyleMap = {
    base: "text-lg m-0 font-bold",
  };

  const valueStyleMap = {
    base: "xs",
  } as any;

  for (let i = 0; i < renderOrder.length; i++) {
    if (renderOrder[i] === "Image") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Image">
          <ImageCard value={token?.metadata?.image} alt={imageAlt} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Id") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} descriptor="Token Id">
          <TextCard value={token?.id?.toString()} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Name") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Name">
          <TextCard value={token?.metadata?.name} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Description") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Description">
          <TextCard value={token?.metadata?.description} size={size} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Address") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Address">
          <Address address={token?.address} size={valueStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "CollectionName") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Name">
          <TextCard value={token?.collectionName} size={size} />
        </DescriptorCard>,
      );
    }
    if (renderOrder[i] === "CollectionSymbol") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Symbol">
          <TextCard value={token?.collectionSymbol} size={size} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Attributes") {
      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Attributes">
          <NewAttributesCard value={token?.metadata?.attributes} style={style} size={size} />
        </DescriptorCard>,
      );
    }
  }

  let cardContent: any;

  if (prettyLoad) {
    if (
      token?.metadata === undefined ||
      token?.collectionName === undefined ||
      token?.collectionSymbol === undefined ||
      token?.address === undefined ||
      token?.id === undefined
    ) {
      cardContent = prettyLoadMap[prettyLoadType];
    } else {
      cardContent = renderedComponents;
    }
  } else {
    cardContent = renderedComponents;
  }

  return <div className={`flex flex-col bg-base-300 ${sizeMap[size]} ${beautyStyleMap[style]}`}>{cardContent}</div>;
};
