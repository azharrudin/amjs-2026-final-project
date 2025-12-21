import {BrowserRouter} from "react-router-dom";

import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import {ColorsProvider} from "./types/colors.context.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorsProvider>
        <App />
      </ColorsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
