// src/App.jsx (updated)
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import FooterCTA from "./components/FooterCTA";
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentCallback from "./pages/PaymentCallback";
import WhatsAppFloat from "./components/WhatsAppFloat";
export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Routes>
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
