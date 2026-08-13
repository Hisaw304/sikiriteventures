import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <main className="sv-payment-page">
      <div className="sv-payment-card sv-payment-success">
        <div className="sv-payment-icon">
          <CheckCircle size={52} />
        </div>

        <span className="sv-payment-tag">Payment Successful</span>

        <h1>Thank You for Your Order!</h1>

        <p>
          Your payment has been received successfully. We are processing your
          order and will contact you with your order and delivery details.
        </p>

        <div className="sv-payment-info">
          <div className="sv-payment-info-icon">
            <ShoppingBag size={20} />
          </div>

          <div>
            <h3>What happens next?</h3>

            <p>
              We will confirm your payment and order details. You may receive an
              email notification regarding your order and delivery.
            </p>
          </div>
        </div>

        <div className="sv-payment-actions">
          <Link to="/" className="sv-payment-primary">
            Continue Shopping
            <ArrowRight size={18} />
          </Link>

          <Link to="/items" className="sv-payment-secondary">
            View Available Items
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
