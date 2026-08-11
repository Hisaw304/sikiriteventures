import {
  ShoppingBasket,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Products",
    description:
      "Browse our available groceries and select the products you need for your home, business, or bulk purchase.",
    icon: <ShoppingBasket size={28} />,
  },
  {
    number: "02",
    title: "Select Size & Quantity",
    description:
      "Choose your preferred product size and quantity. You can order as little or as much as you need.",
    icon: <PackageCheck size={28} />,
  },
  {
    number: "03",
    title: "Add to Your Cart",
    description:
      "Add your selected items to your cart and review your order before proceeding to complete your purchase.",
    icon: <ShoppingCart size={28} />,
  },
  {
    number: "04",
    title: "Get Your Delivery",
    description:
      "Confirm your order and delivery details, and we'll help ensure your groceries get to your location conveniently.",
    icon: <Truck size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="sv-how-it-works" id="how-it-works">
      <div className="sv-how-container">
        {/* HEADER */}
        <div className="sv-how-header">
          <span>How It Works</span>

          <h2>
            Getting Your Groceries Is
            <strong> Simple and Easy</strong>
          </h2>

          <p>
            Shop for the essentials you need in just a few simple steps. Choose
            your products, select your preferred size and quantity, place your
            order, and we'll take it from there.
          </p>
        </div>

        {/* STEPS */}
        <div className="sv-how-steps">
          {steps.map((step) => (
            <div className="sv-how-step" key={step.number}>
              <div className="sv-how-step-top">
                <div className="sv-how-icon">{step.icon}</div>

                <span className="sv-how-number">{step.number}</span>
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
