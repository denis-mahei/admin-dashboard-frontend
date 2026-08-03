import * as React from "react";
import Image from "next/image";

type Props = {
  variant?: "white" | "green";
};

const logoImage = {
  white: "logo-white.webp",
  green: "logo-green.webp",
};

function Logo({ variant = "green" }: Props) {
  return (
    <Image
      src={`/assets/logo/${logoImage[variant]}`}
      alt="Logo"
      width={44}
      height={44}
    />
  );
}
export default Logo;
