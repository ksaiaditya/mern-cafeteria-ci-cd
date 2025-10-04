import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId || "dummy-client-id.apps.googleusercontent.com"}>
      <CartProvider>
      <App />
    </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
