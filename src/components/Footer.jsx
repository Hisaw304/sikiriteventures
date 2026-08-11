import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="sv-footer">
      {/* Decorative background */}
      <div className="sv-footer-glow sv-footer-glow-one"></div>
      <div className="sv-footer-glow sv-footer-glow-two"></div>

      <div className="sv-footer-container">
        {/* ==========================================
            COMPANY
        ========================================== */}
        <div className="sv-footer-about">
          <Link to="/" className="sv-footer-brand">
            <span>Sikarite</span> Ventures
          </Link>

          <div className="sv-footer-brand-line"></div>

          <p>
            Making everyday shopping easier through flexible thrift payment
            plans for families and businesses.
          </p>

          <div className="sv-footer-socials">
            <a
              href="https://wa.me/2348136012465"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Sikarite Ventures on WhatsApp"
            >
              <MessageCircle size={19} />
            </a>
          </div>
        </div>

        {/* ==========================================
            QUICK LINKS
        ========================================== */}
        <div className="sv-footer-links">
          <span className="sv-footer-label">Navigation</span>

          <h3>Quick Links</h3>

          <Link to="/">
            <span>Home</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link to="/about">
            <span>About Us</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link to="/how-it-works">
            <span>How It Works</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link to="/items">
            <span>Available Items</span>
            <ArrowUpRight size={15} />
          </Link>

          <Link to="/contact">
            <span>Contact Us</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* ==========================================
            CONTACT
        ========================================== */}
        <div className="sv-footer-contact">
          <span className="sv-footer-label">Get In Touch</span>

          <h3>Contact Us</h3>

          <a
            href="https://maps.google.com/?q=3+Life+Mission+Street+Ile-Epo+Bus+Stop+Abule+Egba+Lagos"
            target="_blank"
            rel="noreferrer"
            className="sv-footer-contact-item"
          >
            <span className="sv-footer-contact-icon">
              <MapPin size={18} />
            </span>

            <span>
              3, Life Mission Street, Ile-Epo Bus Stop, Abule Egba, Lagos.
            </span>
          </a>

          <a href="tel:08136012465" className="sv-footer-contact-item">
            <span className="sv-footer-contact-icon">
              <Phone size={18} />
            </span>

            <span>0813 601 2465</span>
          </a>

          <a
            href="mailto:info@sikariteventures.com"
            className="sv-footer-contact-item"
          >
            <span className="sv-footer-contact-icon">
              <Mail size={18} />
            </span>

            <span>info@sikariteventures.com</span>
          </a>
        </div>
      </div>

      {/* ==========================================
          BOTTOM
      ========================================== */}
      <div className="sv-footer-bottom">
        <div className="sv-footer-bottom-container">
          <p>
            © {new Date().getFullYear()} Sikarite Ventures Nigeria Ltd. All
            Rights Reserved.
          </p>

          <div className="sv-footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>

            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
