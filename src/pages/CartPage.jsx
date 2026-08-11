import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartCount, cartTotal } =
    useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();

    if (!name) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!phone) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (phone.length < 7) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    if (!email) {
      setFormError("Please enter your email address.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name,
            phone,
            email,
          },

          items: cartItems.map((item) => ({
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to initialize payment.");
      }

      // Save the customer/order information temporarily.
      // We will use this after Paystack redirects back.
      localStorage.setItem(
        "sv-pending-order",
        JSON.stringify({
          customer: {
            name,
            phone,
            email,
          },
          items: cartItems,
          productsTotal: cartTotal,
          reference: data.reference,
        })
      );

      // Send customer to Paystack
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Payment initialization error:", error);

      setFormError(
        error.message ||
          "Something went wrong while starting payment. Please try again."
      );

      setIsSubmitting(false);
    }
  };

  const [formError, setFormError] = useState("");
  const recommendedProducts = products
    .filter(
      (product) => !cartItems.some((item) => item.productId === product.id)
    )
    .slice(0, 4);
  if (cartItems.length === 0) {
    return (
      <section className="sv-cart-page">
        <div className="sv-cart-container">
          <div className="sv-empty-cart">
            <div className="sv-empty-cart-icon">
              <ShoppingCart size={40} />
            </div>

            <span>Your Cart is Empty</span>

            <h1>You Haven't Added Any Groceries Yet</h1>

            <p>
              Browse our available products and add the groceries you need to
              your cart. Choose your preferred size and quantity before placing
              your order.
            </p>

            <Link to="/products" className="sv-cart-shop-btn">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sv-cart-page">
      <div className="sv-cart-container">
        {/* HEADER */}
        <div className="sv-cart-header">
          <div>
            <span>Shopping Cart</span>

            <h1>
              Review Your <strong>Order</strong>
            </h1>

            <p>
              You have {cartCount} {cartCount === 1 ? "item" : "items"} in your
              cart. Review your groceries and update quantities before placing
              your order.
            </p>
          </div>

          <Link to="/products" className="sv-cart-continue">
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>

        {/* CART CONTENT */}
        <div className="sv-cart-layout">
          {/* LEFT - CART ITEMS */}
          <div className="sv-cart-items">
            {cartItems.map((item) => (
              <article className="sv-cart-item" key={item.cartItemId}>
                {/* IMAGE */}
                <div className="sv-cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* DETAILS */}
                <div className="sv-cart-item-details">
                  <span className="sv-cart-item-category">{item.category}</span>

                  <h3>{item.name}</h3>

                  <p className="sv-cart-item-size">
                    Size: <strong>{item.size}</strong>
                  </p>

                  <p className="sv-cart-item-price">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                {/* QUANTITY */}
                <div className="sv-cart-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity - 1)
                    }
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity + 1)
                    }
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* SUBTOTAL */}
                <div className="sv-cart-item-subtotal">
                  <span>Subtotal</span>

                  <strong>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </strong>
                </div>

                {/* REMOVE */}
                <button
                  className="sv-cart-remove"
                  onClick={() => removeFromCart(item.cartItemId)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={19} />
                </button>
              </article>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <aside className="sv-cart-summary">
            <span className="sv-cart-summary-tag">Order Summary</span>

            <h2>Review Your Order Before Checkout</h2>

            {/* CUSTOMER DETAILS */}
            <form
              id="customer-order-form"
              className="sv-cart-customer"
              onSubmit={handleSubmit}
            >
              <h3>Customer Details</h3>

              <div className="sv-cart-form-group">
                <label htmlFor="customer-name">
                  Full Name <span>*</span>
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="sv-cart-form-group">
                <label htmlFor="customer-phone">
                  Phone Number <span>*</span>
                </label>

                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="e.g. 0813 601 2465"
                  required
                />
              </div>

              <div className="sv-cart-form-group">
                <label htmlFor="customer-email">
                  Email Address <span>*</span>
                </label>

                <input
                  id="customer-email"
                  name="email"
                  type="email"
                  value={customer.email}
                  onChange={handleCustomerChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {formError && <p className="sv-cart-form-error">{formError}</p>}
            </form>
            {/* ORDER TOTAL */}
            <div className="sv-cart-summary-row">
              <span>Items ({cartCount})</span>

              <strong>₦{cartTotal.toLocaleString()}</strong>
            </div>

            <div className="sv-cart-summary-row">
              <span>Delivery</span>

              <strong>Calculated on order</strong>
            </div>

            <div className="sv-cart-summary-total">
              <span>Products Total</span>

              <strong>₦{cartTotal.toLocaleString()}</strong>
            </div>

            <p className="sv-cart-summary-note">
              Please note: Delivery fees are not included in the total above.
              Delivery costs may vary depending on your location, order size,
              quantity, and other delivery requirements. The final delivery cost
              will be confirmed with you before your order is processed.
            </p>

            <button
              type="submit"
              form="customer-order-form"
              className="sv-cart-checkout-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Connecting to Paystack..."
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </aside>
        </div>

        {/* YOU MIGHT ALSO LIKE */}
        {recommendedProducts.length > 0 && (
          <section className="sv-recommended-products">
            <div className="sv-recommended-header">
              <div>
                <span>More Essentials</span>

                <h2>
                  You Might Also <strong>Like</strong>
                </h2>

                <p>
                  Complete your shopping with more everyday essentials. Select
                  your preferred size and quantity, then add them to your cart.
                </p>
              </div>

              <Link to="/items" className="sv-view-all-products">
                View All Products
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="sv-recommended-grid">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default CartPage;
