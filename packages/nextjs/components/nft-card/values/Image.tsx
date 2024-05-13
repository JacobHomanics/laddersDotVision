"use client";

import { Style, beautyStyleMap } from "../types/Types";

export type ImageProps = {
  value: string | undefined;
  alt: string;
  style?: Style;
};

export const Image = ({ value, alt = "Image", style = "rounded" }: ImageProps) => {
  return (
    <>
      <img src={value} alt={alt} className={`bg-base-300 ${beautyStyleMap[style]}`} />
    </>
  );
};
