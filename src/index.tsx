import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apis/graphqlClient";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
