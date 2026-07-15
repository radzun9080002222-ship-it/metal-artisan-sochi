import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAnalytics, readAttribution } from "./analytics.js";
import "./styles.css";

readAttribution();
initAnalytics();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
