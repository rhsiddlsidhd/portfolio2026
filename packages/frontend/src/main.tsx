import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import axiosInstance from "./api/axios"; // Import axiosInstance
import { setupInterceptors } from "./api/interceptors"; // Import setupInterceptors

setupInterceptors(axiosInstance); // Setup interceptors

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
