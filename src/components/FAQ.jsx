import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What products do you sell?",
    answer:
      "We sell a wide range of everyday grocery essentials, including rice, semo, cooking oil, noodles, spaghetti, salt, seasonings, and other food items for homes and businesses.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes. You can place your order with us, and we will arrange convenient delivery to your location. Delivery availability and charges may depend on your location and order size.",
  },
  {
    question: "Can I buy products in bulk?",
    answer:
      "Yes. We welcome both regular and bulk orders. Whether you are shopping for your family, restaurant, shop, office, or business, you can order larger quantities of available products.",
  },
  {
    question: "Can I choose different product sizes?",
    answer:
      "Yes. Many of our products are available in different sizes. Simply select your preferred size before adding the product to your cart.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Choose the product you want, select your preferred size and quantity, add it to your cart, and proceed with your order. Our team will then assist with confirming your order and delivery.",
  },
  {
    question: "Where is your store located?",
    answer:
      "Our store is located at 3, Life Mission Street, Ile-Epo Bus Stop, Abule Egba, Lagos. You can also contact us if you need directions or more information.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="sv-faq">
      <div className="sv-faq-container">
        {/* HEADER */}
        <div className="sv-faq-header">
          <span>Frequently Asked Questions</span>

          <h2>
            Everything You Need to <strong>Know Before Ordering</strong>
          </h2>

          <p>
            Find answers to some of the most common questions about our
            products, ordering process, bulk purchases, and delivery.
          </p>
        </div>

        <div className="sv-faq-main">
          {/* LEFT - FAQ QUESTIONS */}
          <div className="sv-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  className={`sv-faq-item ${isOpen ? "active" : ""}`}
                  key={index}
                >
                  <button
                    className="sv-faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>

                    <span className="sv-faq-icon">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="sv-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT - STICKY CARD */}
          <aside className="sv-faq-side-card">
            <div className="sv-faq-card-icon">
              <MessageCircle size={32} />
            </div>

            <span>Still Have Questions?</span>

            <h3>We're Here to Help You Shop With Confidence.</h3>

            <p>
              Can't find the answer you're looking for? Contact us and our team
              will be happy to help you with your order, product availability,
              bulk purchases, or delivery information.
            </p>

            <a href="#contact" className="sv-faq-card-btn">
              Contact Us
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
