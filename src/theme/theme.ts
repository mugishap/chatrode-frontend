import { createTheme } from "@mui/material/styles";
import { Theme } from "../types";

const theme: Theme = {
  light: {
    formBg: '#fff',
    addons: "#f5f7fb",
    textColor: '#495057',
    backgroundColor: '#f8f6ff',
    sidebarBackgroundColor:"#ffffff",
    chatsColor:"#f5f7fb0",
    iconColor:"#455369"

  },
  dark: {
    formBg: '#262e35',
    addons: "#36404a",
    textColor: '#000',
    backgroundColor: '#2e374100',
    sidebarBackgroundColor:"#0000",
    chatsColor:"#2e374100",
    iconColor:"#f8f6ff"
  },
};

export const MuiTheme = createTheme({
  typography: {
   "fontFamily": `"Lato", sans-serif`,
   "fontSize": 16,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

export default theme;
