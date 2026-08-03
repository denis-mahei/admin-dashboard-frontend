declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      accent: string;
      lightGreen: string;
      grey: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      green?: string;
      lightGreen?: string;
      grey?: string;
      dark?: string;
    };
  }
}
