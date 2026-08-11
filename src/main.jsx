// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/style.css";
// import "./assets/pages.css";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
