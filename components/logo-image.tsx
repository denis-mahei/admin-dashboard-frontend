import * as React from "react";
import Image from "next/image";

function LogoImage() {
  return (
    <Image
      src="/assets/logo/logo-main.webp"
      alt="e-pharmacy logo"
      width={40}
      height={40}
      unoptimized
    />
  );
}

export default LogoImage;
