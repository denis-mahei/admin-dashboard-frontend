import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import LogoImage from "@/components/header/logo-image";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg" sx={{ paddingY: "28px" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: "148px",
        }}
      >
        <LogoImage />
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          E-Pharmacy
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { md: 13 },
        }}
      >
        <Box
          sx={{
            mb: "40px",
            position: "relative",
            width: { xs: "335px", sm: "614px" },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "28px", sm: "50px", md: "54px" },
              fontWeight: "bold",
            }}
          >
            Your medication, delivered Say goodbye to all{" "}
            <Typography
              component="span"
              sx={{
                color: "custom.accent",
                fontSize: "inherit",
                fontWeight: "bold",
              }}
            >
              your healthcare
            </Typography>{" "}
            worries with us
          </Typography>
          <Box
            sx={{
              position: "absolute",
              zIndex: -1,
              width: { xs: 95, sm: 179 },
              height: { xs: 93, sm: 175 },
              right: { xs: 12, sm: 17, lg: 13 },
              top: { xs: -40, sm: -75 },
            }}
          >
            <Image
              src="/assets/tab.png"
              alt="Pharmacy"
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "330px" },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
