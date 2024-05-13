"use client";

import { RenderableTypes, Size, Style } from "../../types/Types";
import { Descriptor } from "../Descriptor";
import { Text } from "../Text";
import { Address } from "~~/components/scaffold-eth";
import { ScaffoldCollection } from "~~/types/ScaffoldCollection";

export type CollectionDetailsProps = {
  collection?: ScaffoldCollection;
  renderOrder?: RenderableTypes[];
  size?: Size;
  style?: Style;
};

const valueStyleMap = {
  base: "flex-col m-0",
};

export const CollectionDetails = ({
  collection,
  size = "base",
  style = "rounded",
  renderOrder = ["Address", "Collection Name", "Collection Symbol"],
}: CollectionDetailsProps) => {
  const renderedComponents: any = [];

  for (let i = 0; i < renderOrder.length; i++) {
    let selectedDescriptor = renderOrder[i] as any;
    let selectedElement;

    if (renderOrder[i] === "Address") {
      const valueStyleMap = {
        base: "xs",
      } as any;

      selectedElement = <Address address={collection?.address} size={valueStyleMap[size]} />;
    }

    if (renderOrder[i] === "Collection Name") {
      selectedDescriptor = "Name";
      selectedElement = <Text value={collection?.name} size={size} />;
    }
    if (renderOrder[i] === "Collection Symbol") {
      selectedDescriptor = "Symbol";

      selectedElement = <Text value={collection?.symbol} size={size} />;
    }

    renderedComponents.push(
      <Descriptor descriptor={selectedDescriptor} size={size} style={style} bgColor="bg-base-200">
        {selectedElement}
      </Descriptor>,
    );
  }

  return (
    <div>
      <Descriptor descriptor="Collection Details" bgColor="bg-base-100" style={style} size={size}>
        <div className={`flex justify-center ${valueStyleMap[size]}`}>{renderedComponents}</div>
      </Descriptor>
    </div>
  );
};
