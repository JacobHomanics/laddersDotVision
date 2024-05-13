"use client";

import { ComponentType } from "react";
import { Address } from "../scaffold-eth";
import { Size, Style, beautyStyleMap } from "./types/Types";
// import { AddressCard, AddressCardProps } from "./values/AddressCard";
import { AttributesCard, AttributesCardProps } from "./values/AttributesCard";
// import { CollectionNameCard, CollectionNameCardProps } from "./values/CollectionNameCard";
// import { CollectionSymbolCard, CollectionSymbolCardProps } from "./values/CollectionSymbolCard";
// import { DescriptionCardProps } from "./values/DescriptionCard";
import { DescriptorCard } from "./values/DescriptorCard";
// import { IdCardProps } from "./values/IdCard";
import { ImageCard } from "./values/ImageCard";
import { NewAttributesCard } from "./values/NewAttributesCard";
// import { NameCardProps } from "./values/NameCard";
// import { NewAddressCard } from "./values/NewAddressCard";
import { TextCard } from "./values/TextCard";
// import { CollectionDetails, CollectionDetailsProps } from "./values/extensions/CollectionDetails";
import { v4 as uuidv4 } from "uuid";
import { ScaffoldToken } from "~~/types/ScaffoldToken";

type PrettyLoadType = "animated" | "text";

type Props = {
  token?: ScaffoldToken;
  // NameCard?: ComponentType<NameCardProps>;
  imageAlt?: string;
  // ImageCard?: ComponentType<ImageCardProps>;
  // DescriptionCard?: ComponentType<DescriptionCardProps>;
  AttributesCard?: ComponentType<AttributesCardProps>;
  // AddressCard?: ComponentType<AddressCardProps>;
  // CollectionNameCard?: ComponentType<CollectionNameCardProps>;
  // CollectionSymbolCard?: ComponentType<CollectionSymbolCardProps>;
  // IdCard?: ComponentType<IdCardProps>;
  // CollectionDetailsCard?: ComponentType<CollectionDetailsProps>;

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

// const NameCardComponent = (props: NameCardProps) => {
//   return <NameCard {...props} />;
// };

// const ImageCardComponent = (props: ImageCardProps) => {
//   return <ImageCard {...props} />;
// };

// const DescriptionCardComponent = (props: DescriptionCardProps) => {
//   return <DescriptionCard {...props} />;
// };

const AttributesCardComponent = (props: AttributesCardProps) => {
  return <AttributesCard {...props} />;
};

// const AddressCardComponent = (props: AddressCardProps) => {
//   return <AddressCard {...props} />;
// };

// const CollectionNameCardComponent = (props: CollectionNameCardProps) => {
//   return <CollectionNameCard {...props} />;
// };

// const CollectionSymbolCardComponent = (props: CollectionSymbolCardProps) => {
//   return <CollectionSymbolCard {...props} />;
// };

// const CollectionDetailsCardComponent = (props: CollectionDetailsProps) => {
//   return <CollectionDetails {...props} />;
// };

// const IdCardComponent = (props: IdCardProps) => {
//   return <IdCard {...props} />;
// };

export const NftCard = ({
  token,
  // NameCard = NameCardComponent,
  imageAlt = "Image",
  // ImageCard = ImageCardComponent,
  // DescriptionCard = DescriptionCardComponent,
  AttributesCard = AttributesCardComponent,
  // AddressCard = AddressCardComponent,
  // CollectionNameCard = CollectionNameCardComponent,
  // CollectionSymbolCard = CollectionSymbolCardComponent,
  // IdCard = IdCardComponent,
  // CollectionDetailsCard = CollectionDetailsCardComponent,
  // collectionDataLoadType = "Together",
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
  // const collectionComponents: any = [];

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

        <AttributesCard key={uuidv4()} value={token?.metadata?.attributes} showDescriptor={true} style={style} />,
      );
    }

    //   if (renderOrder[i] === "Address" || renderOrder[i] === "CollectionName" || renderOrder[i] === "CollectionSymbol") {
    //     collectionComponents.push(renderOrder[i]);
    //   }
    // }

    // if (collectionComponents.length > 0) {
    //   if (collectionDataLoadType === "Together") {
    //     renderedComponents.push(
    //       <CollectionDetailsCard
    //         key={uuidv4()}
    //         token={token}
    //         showDescriptor={true}
    //         style={style}
    //         renderOrder={collectionComponents}
    //         AddressCard={props => {
    //           return <AddressCard {...props} value={token?.address} showDescriptor={true} style={style} size={size} />;
    //         }}
    //         CollectionNameCard={props => {
    //           return (
    //             <CollectionNameCard
    //               {...props}
    //               value={token?.collectionName}
    //               showDescriptor={true}
    //               style={style}
    //               size={size}
    //             />
    //           );
    //         }}
    //         CollectionSymbolCard={props => {
    //           return (
    //             <CollectionSymbolCard
    //               {...props}
    //               value={token?.collectionSymbol}
    //               showDescriptor={true}
    //               style={style}
    //               size={size}
    //             />
    //           );
    //         }}
    //       />,
    //     );
    //   } else if (collectionDataLoadType === "Individual") {
    //     for (let i = 0; i < collectionComponents.length; i++) {
    //       if (collectionComponents[i] === "Address") {
    //         renderedComponents.push(
    //           <AddressCard key={uuidv4()} value={token?.address} showDescriptor={true} style={style} size={size} />,
    //         );
    //       }

    //       if (collectionComponents[i] === "CollectionName") {
    //         renderedComponents.push(
    //           <CollectionNameCard
    //             key={uuidv4()}
    //             value={token?.collectionName}
    //             showDescriptor={true}
    //             style={style}
    //             size={size}
    //           />,
    //         );
    //       }
    //       if (collectionComponents[i] === "CollectionSymbol") {
    //         renderedComponents.push(
    //           <CollectionSymbolCard
    //             key={uuidv4()}
    //             value={token?.collectionSymbol}
    //             showDescriptor={true}
    //             style={style}
    //             size={size}
    //           />,
    //         );
    //       }
    //     }
    //   }
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
