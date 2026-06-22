import { DarkTheme, type Theme } from "@react-navigation/native";

const APP_BACKGROUND = "#0A0A0A";

export const navigationTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: APP_BACKGROUND,
    card: APP_BACKGROUND,
    border: "#262626",
    text: "#FAFAFA",
    primary: "#FF3D00",
  },
};

export { APP_BACKGROUND };
