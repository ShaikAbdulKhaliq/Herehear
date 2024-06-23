import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalProvider } from "./context/globalContext.jsx";
import i18next from "./i18next";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GlobalProvider>
    <React.Suspense fallback="loading...">
      <App />
    </React.Suspense>
  </GlobalProvider>
  // {/* </React.StrictMode>, */}
);
