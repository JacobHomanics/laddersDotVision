"use client";

import { Size, Style, beautyStyleMap } from "../types/Types";

export type ValueContainerCardProps = {
  descriptor?: string;
  style?: Style;
  size?: Size;
  children?: any;
};

const containerStyleMap = {
  base: "m-1 p-1",
};

const descriptorStyleMap = {
  base: "p-0 m-0 text-xs",
};

export const DescriptorCard = ({
  descriptor = undefined,
  style = "rounded",
  size = "base",
  children,
}: ValueContainerCardProps) => {
  return (
    <div className={`bg-base-200 ${beautyStyleMap[style]} ${containerStyleMap[size]}`}>
      {descriptor ? <p className={`text-center ${descriptorStyleMap[size]}`}>{descriptor}</p> : <></>}
      <div className="flex justify-center">{children} </div>
    </div>
  );
};
