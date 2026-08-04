import React from "react";

interface SvgIconProps {
  name: string;
  width?: string;
  height?: string;
}

function SvgIcon({ name, width = "20", height = "20" }: SvgIconProps) {
  return (
    <svg width={width} height={height}>
      <use href={`/assets/icons/sprite.svg#${name}`}></use>
    </svg>
  );
}

export default SvgIcon;
