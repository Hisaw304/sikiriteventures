const Hero = () => {
  return (
    <section className="sv-hero">
      <div className="sv-hero-overlay">
        <div className="sv-hero-container">
          <div className="sv-hero-content">
            <span className="sv-hero-tag">Fresh Groceries • Fast Delivery</span>

            <h1>
              Fresh <span>Groceries</span> Delivered Straight to Your Doorstep
            </h1>

            <p>
              From premium rice and semo to cooking oils, noodles, spaghetti,
              seasonings, and other everyday essentials, we make grocery
              shopping simple and convenient. Choose your preferred size, place
              your order, and let us deliver quality products straight to your
              home or business anywhere across Lagos.
            </p>

            <div className="sv-hero-buttons">
              <a href="#products" className="sv-btn-primary">
                Shop Now
              </a>

              <a href="#about" className="sv-btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
