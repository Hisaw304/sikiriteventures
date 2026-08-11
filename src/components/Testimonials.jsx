import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Adebisi A.",
    role: "Regular Customer",
    quote:
      "Shopping here has made getting groceries much easier for my family. The products are always good quality, the prices are reasonable, and ordering is straightforward.",
  },
  {
    name: "Chioma N.",
    role: "Family Shopper",
    quote:
      "I love being able to choose the exact quantity and size I need. From rice to cooking oil and noodles, everything I've ordered has been well packaged and delivered properly.",
  },
  {
    name: "Funke O.",
    role: "Bulk Buyer",
    quote:
      "I regularly buy food items in larger quantities, and the service has been reliable every time. Good prices, quality products, and communication throughout the order process.",
  },
  {
    name: "Blessing E.",
    role: "Regular Customer",
    quote:
      "The convenience is what keeps me coming back. I can order the essentials my household needs without spending hours shopping, and the customer service is always helpful.",
  },
  {
    name: "Tunde K.",
    role: "Business Owner",
    quote:
      "Finding a dependable place to purchase groceries for my business was important to me. I've been impressed with the quality, availability, and attention given to every order.",
  },
  {
    name: "Amaka C.",
    role: "Lagos Customer",
    quote:
      "Great experience from ordering to delivery. The prices are clearly stated, there are different sizes to choose from, and what you order is exactly what you receive.",
  },
];

export default function Testimonials() {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* =========================================
     CHECK SCREEN SIZE
  ========================================= */

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  /* =========================================
     SCROLL TO CARD
  ========================================= */

  const scrollToCard = (index) => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.children[index];

    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    setActive(index);
  };

  /* =========================================
     NEXT
  ========================================= */

  const next = () => {
    const nextIndex = (active + 1) % testimonials.length;
    scrollToCard(nextIndex);
  };

  /* =========================================
     PREVIOUS
  ========================================= */

  const prev = () => {
    const prevIndex = (active - 1 + testimonials.length) % testimonials.length;

    scrollToCard(prevIndex);
  };

  return (
    <section className="sv-testimonials">
      <div className="sv-testimonials-container">
        {/* HEADER */}

        <div className="sv-testimonials-header">
          <span>Customer Stories</span>

          <h2>
            Trusted by Families and <strong>Businesses Across Lagos</strong>
          </h2>

          <p>
            Quality products and dependable service are at the heart of
            everything we do. Here's what customers have to say about their
            shopping experience with us.
          </p>
        </div>

        {/* SLIDER */}

        <div className="sv-testimonials-slider">
          <div className="sv-testimonials-track" ref={sliderRef}>
            {testimonials.map((testimonial, index) => (
              <article key={index} className="sv-testimonial-card">
                {/* TOP */}

                <div className="sv-testimonial-review">
                  <span className="sv-quote-mark">“</span>

                  <p>{testimonial.quote}</p>
                </div>

                {/* BOTTOM */}

                <div className="sv-testimonial-content">
                  <div className="sv-stars">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <h3>{testimonial.name}</h3>

                  <span className="sv-testimonial-role">
                    {testimonial.role}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CONTROLS */}

        <div className="sv-testimonial-controls">
          <button
            className="sv-arrow-btn"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="sv-testimonial-dots">
            {(isMobile ? testimonials.slice(0, 5) : testimonials).map(
              (_, index) => (
                <button
                  key={index}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`sv-dot ${
                    index === (isMobile ? active % 5 : active) ? "active" : ""
                  }`}
                  onClick={() => scrollToCard(index)}
                />
              )
            )}
          </div>

          <button
            className="sv-arrow-btn"
            onClick={next}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
