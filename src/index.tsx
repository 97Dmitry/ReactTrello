import React from "react";
import ReactDOM from "react-dom";
import Global from "./styles/globalStyle";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
