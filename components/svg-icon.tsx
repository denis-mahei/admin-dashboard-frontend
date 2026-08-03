import React from "react";

interface SvgIconProps {
  name: string;
}

function SvgIcon({ name }: SvgIconProps) {
  return (
    <svg width="20" height="20">
      <use href={`/assets/icons/sprite.svg#${name}`}></use>
    </svg>
  );
}

export default SvgIcon;
