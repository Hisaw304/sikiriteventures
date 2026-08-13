import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

import logo from "../assets/ziklogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sv-navbar">
      <div className="sv-navbar-container">
        {/* ==========================================
            LEFT - LOGO
        ========================================== */}
        <Link to="/" className="sv-logo" onClick={closeMenu}>
          {/* Replace logo.png with your actual logo */}

          <img src={logo} alt="Sikarite Ventures" />

          <div className="sv-logo-text">
            <h2>Sikarite Ventures</h2>
            <p>Smart Shopping. Better Living.</p>
          </div>
        </Link>

        {/* ==========================================
            CENTER - DESKTOP NAVIGATION
        ========================================== */}
        <nav className="sv-nav">
          <Link to="/">Home</Link>

          <a href="#about">About</a>

          <a href="#how-it-works">How It Works</a>

          <Link to="/products">Available Items</Link>

          {/* <Link to="/contact">Contact</Link> */}
        </nav>

        {/* ==========================================
            RIGHT - ACTIONS
        ========================================== */}
        <div className="sv-actions">
          {/* CART - ALWAYS VISIBLE */}
          <Link
            to="/cart"
            className="sv-cart-icon"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={21} />

            {cartCount > 0 && (
              <span className="sv-cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* WHATSAPP - DESKTOP ONLY */}
          <a
            href="https://wa.me/2348136012465"
            className="sv-whatsapp-btn"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>

          {/* MENU - TABLET / MOBILE ONLY */}
          <button
            type="button"
            className="sv-menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* ==========================================
          MOBILE / TABLET MENU
      ========================================== */}
      <div className={`sv-mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="sv-mobile-menu-inner">
          <Link onClick={closeMenu} to="/">
            Home
          </Link>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <Link onClick={closeMenu} to="/products">
            Available Items
          </Link>

          {/* <Link onClick={closeMenu} to="/contact">
            Contact
          </Link> */}

          {/* WhatsApp inside mobile menu */}
          <a
            href="https://wa.me/2348136012465"
            className="sv-mobile-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
