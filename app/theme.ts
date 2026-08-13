"use client";

import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
  },
  palette: {
    primary: {
      main: "#59b17a",
      dark: "#3f945f",
      light: alpha("#3f945f", 0.1),
    },
    error: {
      main: "#e85050",
      light: alpha("#e85050", 0.1),
    },
    text: {
      primary: "#1d1e21",
      disabled: alpha("#1d1e21", 0.4),
      secondary: alpha("#1d1e21", 0.1),
    },
    background: {
      paper: "#fff",
    },
    divider: alpha("#1d1e21", 0.1),
    action: {
      disabled: "#dcdddf",
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
    MuiPickersInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& fieldset": {
            borderRadius: "60px",
            border: "1px solid",
            borderColor: theme.palette.divider,
          },
          "& .MuiPickersInputBase-sectionsContainer:hover ~ fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
            borderColor: theme.palette.primary.light,
          },
          "& .MuiPickersInputBase-sectionsContainer": {
            padding: "10px 12px",
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "0 0 8px 8px",
          border: `1px solid #1D1E211A`,
          borderTop: "none",
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 44,
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "1px",
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
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
          margin: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.disabled,
          fontSize: "12px",
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});

export default theme;
