import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        navigate("/payment-failed", { replace: true });
        return;
      }

      try {
        setStatus("verifying");

        const response = await fetch(
          `/api/verify-payment?reference=${encodeURIComponent(reference)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          navigate("/payment-failed", { replace: true });
          return;
        }

        navigate("/payment-success", { replace: true });
      } catch (error) {
        console.error("Payment verification error:", error);

        navigate("/payment-failed", { replace: true });
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  return (
    <main className="sv-payment-page">
      <div className="sv-payment-card sv-payment-verifying">
        <div className="sv-payment-loading">
          <LoaderCircle size={48} />
        </div>

        <span className="sv-payment-tag">Payment Verification</span>

        <h1>Confirming Your Payment</h1>

        <p>
          Please wait while we securely verify your payment. Do not close this
          page.
        </p>
      </div>
    </main>
  );
};

export default PaymentCallback;
