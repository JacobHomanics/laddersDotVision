"use client";

import { Address } from "../scaffold-eth";
import { LoadType, RenderableTypes, Size, Style, beautyStyleMap } from "./types/Types";
import { DescriptorCard } from "./values/DescriptorCard";
import { ImageCard } from "./values/ImageCard";
import { NewAttributesCard } from "./values/NewAttributesCard";
import { TextCard } from "./values/TextCard";
import { v4 as uuidv4 } from "uuid";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

const sizeMap = {
  base: "w-32 lg:w-96 m-0.5 lg:m-4",
  // base: "max-w-96 lg:max-w-max m-4",
};

type Props = {
  token?: ScaffoldToken;
  renderOrder?: RenderableTypes[];
  isLoading?: boolean;
  loadType?: LoadType;
  size?: Size;
  style?: Style;
};

export const NftCard = ({
  token,
  renderOrder = [
    "Image",
    "Token Id",
    "Name",
    "Description",
    "Attributes",
    "Address",
    "Collection Name",
    "Collection Symbol",
  ],
  size = "base",
  style = "rounded",
}: Props) => {
  const renderedComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    let selectedDescriptor;
    let selectedElement;

    selectedDescriptor = renderOrder[i];

    if (renderOrder[i] === "Image") {
      selectedDescriptor = undefined;
      selectedElement = <ImageCard value={token?.metadata?.image?.value} alt={token?.metadata?.image?.alt || ""} />;
    }

    const bigAndBoldTextStyleMap = {
      base: "text-lg m-0 font-bold",
    };

    if (renderOrder[i] === "Token Id") {
      selectedElement = (
        <TextCard value={token?.id?.toString()} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );
    }

    if (renderOrder[i] === "Name") {
      selectedElement = (
        <TextCard value={token?.metadata?.name} size={size} valueClassName={bigAndBoldTextStyleMap[size]} />
      );
    }

    if (renderOrder[i] === "Description") {
      selectedElement = <TextCard value={token?.metadata?.description} size={size} />;
    }

    if (renderOrder[i] === "Address") {
      const valueStyleMap = {
        base: "xs",
      } as any;

      selectedElement = <Address address={token?.address} size={valueStyleMap[size]} />;
    }

    if (renderOrder[i] === "Collection Name") {
      selectedElement = <TextCard value={token?.collectionName} size={size} />;
    }
    if (renderOrder[i] === "Collection Symbol") {
      selectedElement = <TextCard value={token?.collectionSymbol} size={size} />;
    }

    if (renderOrder[i] === "Attributes") {
      selectedElement = <NewAttributesCard value={token?.metadata?.attributes} style={style} size={size} />;
    }

    renderedComponents.push(
      <DescriptorCard key={uuidv4()} style={style} size={size} descriptor={selectedDescriptor}>
        {selectedElement}
      </DescriptorCard>,
    );
  }

  return (
    <div className={`flex flex-col bg-base-300 ${sizeMap[size]} ${beautyStyleMap[style]}`}>{renderedComponents}</div>
  );
};
