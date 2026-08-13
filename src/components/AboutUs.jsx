import { Link } from "react-router-dom";
import aboutImg from "../assets/about-store.jpg";

const AboutUs = () => {
  return (
    <section id="about" className="sv-about">
      <div className="sv-about-container">
        {/* Content */}
        <div className="sv-about-content">
          <span className="sv-section-tag">About Our Store</span>

          <h2>
            Your Trusted Neighborhood Grocery Store in <span>Lagos</span>
          </h2>

          <p>
            At <strong>SV Grocery Store</strong>, we believe grocery shopping
            should be simple, affordable, and stress-free. We proudly serve
            families, restaurants, retailers, and businesses with quality food
            products sourced from trusted suppliers.
          </p>

          <p>
            Whether you need premium rice, semo, cooking oils, noodles,
            spaghetti, seasonings, or other household essentials, we're here to
            provide quality products at competitive prices with excellent
            customer service and reliable delivery across Lagos.
          </p>

          <div className="sv-about-location">
            <h4>Visit Our Store</h4>

            <p>
              3, Life Mission Street,
              <br />
              Ile-Eja Bus Stop, Command
              <br />
              Abule Egba,
              <br />
              Lagos-state, Nigeria.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="sv-about-image">
          <img src={aboutImg} alt="SV Grocery Store" />
        </div>

        {/* Button */}
        <div className="sv-about-button">
          <Link to="/about" className="sv-btn-primary">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
