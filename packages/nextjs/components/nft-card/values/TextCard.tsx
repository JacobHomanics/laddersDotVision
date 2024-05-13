"use client";

import { Size } from "../types/Types";

export type TextCardProps = {
  value: string | undefined;
  valueClassName?: string;
  size?: Size;
};

const regularTextStyleMap = {
  base: "text-md m-0",
};

const undefinedStyleMap = {
  base: "text-md m-0",
};

export const TextCard = ({ value, size = "base", valueClassName = regularTextStyleMap[size] }: TextCardProps) => {
  return (
    <>
      {value ? (
        <p className={`text-center ${valueClassName}`}>{value}</p>
      ) : (
        <p className={`text-center text-base-100 ${undefinedStyleMap[size]}`}>{"None"}</p>
      )}
    </>
  );
};
