import { ArrowRight } from "lucide-react";
import footerImage from "../assets/footer-cta.jpg";

const FooterCTA = () => {
  return (
    <section className="sv-footer-cta-section">
      <div className="sv-footer-cta-container">
        <div className="sv-footer-cta">
          {/* LEFT CONTENT */}
          <div className="sv-footer-cta-content">
            <span className="sv-footer-cta-tag">
              Fresh Groceries, Made Easy
            </span>

            <h2>
              Everything You Need for Your
              <span> Kitchen in One Place.</span>
            </h2>

            <p>
              Shop quality rice, semo, cooking oil, noodles, spaghetti,
              seasonings, and other everyday essentials. Choose the quantity you
              need, place your order, and enjoy a simple and convenient shopping
              experience.
            </p>

            <a href="#products" className="sv-footer-cta-btn">
              Start Shopping
              <ArrowRight size={18} />
            </a>
          </div>

          {/* RIGHT IMAGE */}
          <div className="sv-footer-cta-image-wrap">
            <div className="sv-footer-cta-shape"></div>

            <img
              src={footerImage}
              alt="Fresh grocery products"
              className="sv-footer-cta-image"
            />

            <div className="sv-footer-cta-badge">
              <span>Fresh</span>
              <strong>Everyday</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
