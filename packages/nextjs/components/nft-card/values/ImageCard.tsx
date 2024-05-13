"use client";

import { Style, beautyStyleMap } from "../types/Types";

export type ImageCardProps = {
  value: string | undefined;
  alt: string;
  style?: Style;
};

export const ImageCard = ({ value, alt = "Image", style = "rounded" }: ImageCardProps) => {
  return (
    <>
      <img src={value} alt={alt} className={`bg-base-300 ${beautyStyleMap[style]}`} />
    </>
  );
};
