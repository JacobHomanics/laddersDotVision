export type ScaffoldToken = {
  address?: string;
  collectionName?: string;
  collectionSymbol?: string;
  id?: bigint;
  balanceOf?: bigint;
  uri?: string;
  metadata?: {
    name?: string;
    description?: string;
    image?: {
      value: string;
      alt: string;
    };
    attributes?: any[];
  };
};
