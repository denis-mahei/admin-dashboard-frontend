import Link from "@/components/link";
import Image from "next/image";
import { Button } from "@mui/material";
import * as React from "react";

const LogoImage = () => {
  return (
    <Image
      src="/assets/logo.png"
      alt="e-pharmacy logo"
      width={40}
      height={40}
      unoptimized
    />
  );
};

export default LogoImage;
