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
    let selectedDescriptor;
    let selectedElement;

    if (renderOrder[i] === "Image") {
      selectedDescriptor = "Image";
      selectedElement = <ImageCard value={token?.metadata?.image} alt={imageAlt} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Image">
          <ImageCard value={token?.metadata?.image} alt={imageAlt} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Id") {
      selectedDescriptor = "Token Id";
      selectedElement = (
        <TextCard value={token?.id?.toString()} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} descriptor="Token Id">
          <TextCard value={token?.id?.toString()} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Name") {
      selectedDescriptor = "Name";
      selectedElement = (
        <TextCard value={token?.metadata?.name} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Name">
          <TextCard value={token?.metadata?.name} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Description") {
      selectedDescriptor = "Description";
      selectedElement = <TextCard value={token?.metadata?.description} size={size} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Description">
          <TextCard value={token?.metadata?.description} size={size} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Address") {
      selectedDescriptor = "Address";
      selectedElement = <Address address={token?.address} size={valueStyleMap[size]} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Address">
          <Address address={token?.address} size={valueStyleMap[size]} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "CollectionName") {
      selectedDescriptor = "Collection Name";
      selectedElement = <TextCard value={token?.collectionName} size={size} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Name">
          <TextCard value={token?.collectionName} size={size} />
        </DescriptorCard>,
      );
    }
    if (renderOrder[i] === "CollectionSymbol") {
      selectedDescriptor = "Collection Symbol";
      selectedElement = <TextCard value={token?.collectionSymbol} size={size} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Collection Symbol">
          <TextCard value={token?.collectionSymbol} size={size} />
        </DescriptorCard>,
      );
    }

    if (renderOrder[i] === "Attributes") {
      selectedDescriptor = "Attributes";
      selectedElement = <NewAttributesCard value={token?.metadata?.attributes} style={style} size={size} />;

      renderedComponents.push(
        <DescriptorCard key={uuidv4()} style={style} size={size} descriptor="Attributes">
          <NewAttributesCard value={token?.metadata?.attributes} style={style} size={size} />
        </DescriptorCard>,
      );
    }

    renderedComponents.push(
      <DescriptorCard key={uuidv4()} style={style} size={size} descriptor={selectedDescriptor}>
        {selectedElement}
      </DescriptorCard>,
    );
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
