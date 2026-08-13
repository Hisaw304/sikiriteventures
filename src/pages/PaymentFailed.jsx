import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <main className="sv-payment-page">
      <div className="sv-payment-card sv-payment-failed">
        <div className="sv-payment-icon">
          <XCircle size={52} />
        </div>

        <span className="sv-payment-tag">Payment Not Completed</span>

        <h1>We Couldn't Complete Your Payment</h1>

        <p>
          Your payment was not completed successfully. Don't worry — you can
          return to your cart and try again.
        </p>

        <div className="sv-payment-info">
          <div className="sv-payment-info-icon">
            <RefreshCw size={20} />
          </div>

          <div>
            <h3>Your order has not been confirmed</h3>

            <p>
              If money was deducted from your account despite seeing this
              message, please do not make another payment immediately. Contact
              us so we can verify the transaction with our payment provider.
            </p>
          </div>
        </div>

        <div className="sv-payment-actions">
          <Link to="/cart" className="sv-payment-primary">
            <ArrowLeft size={18} />
            Return to Cart
          </Link>

          <Link to="/" className="sv-payment-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentFailed;
