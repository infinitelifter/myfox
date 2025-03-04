import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A800",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#CCCCCC",
      contrastText: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "none",
          padding: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 17px 3px #0000001A",
          border: "1px solid #DDD",
        },
      },
    },
  },
});

export default theme;
