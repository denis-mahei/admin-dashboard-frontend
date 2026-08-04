"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
  },

  palette: {
    primary: {
      main: "#1d1e21",
      bgError: "#1d1e211a",
      textPrimary: "#6c757d",
      textSecondary: "rgba(29, 30, 33, 0.4)",
      tableHeader: "#e7f1ed",
    },
    custom: {
      accent: "#59b17a",
      accent2: "#e85050",
      bgAccent: "#59b17a1a",
      bgAccent2: "#e850501a",
      text: "#dcdddf",
    },
    secondary: {
      main: "rgba(29, 30, 33, 0.1)",
    },
    background: {
      default: "#f7f8fa",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: `1px solid #e0e0e0`,
          paddingLeft: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 44,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.accent,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.custom.accent,
            borderWidth: "1px",
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 20,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.textSecondary,
          "&.Mui-focused": {
            color: theme.palette.custom.accent,
          },
        }),
      },
    },
  },
});

export default theme;
