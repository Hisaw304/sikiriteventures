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
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import FixturesPage from "./pages/FixturePage";
// import News from "./pages/News";
// import PlayersPage from "./pages/PlayersPage";
// import PlayerDetails from "./pages/PlayerDetails";
// import LegauesPage from "./pages/LegauesPage";
// import UpdatePlayerImages from "./pages/UpdatePlayerImages";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
