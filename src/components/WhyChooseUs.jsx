import { CheckCircle2, XCircle } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="sv-why">
      <div className="sv-why-container">
        <div className="sv-why-header">
          <span>Why Choose Us</span>

          <h2>Experience the Difference When You Shop With Us</h2>

          <p>
            We are committed to providing quality groceries, honest pricing,
            excellent customer service, and a shopping experience you can rely
            on every time.
          </p>
        </div>

        <div className="sv-why-grid">
          {/* OUR STORE */}

          <div className="sv-why-card sv-why-good">
            <h3>Shopping With Us</h3>

            <ul>
              <li>
                <CheckCircle2 size={20} />
                Premium quality grocery products
              </li>

              <li>
                <CheckCircle2 size={20} />
                Affordable and transparent pricing
              </li>

              <li>
                <CheckCircle2 size={20} />
                Multiple product sizes to fit your budget
              </li>

              <li>
                <CheckCircle2 size={20} />
                Reliable delivery across Lagos
              </li>

              <li>
                <CheckCircle2 size={20} />
                Friendly and responsive customer support
              </li>

              <li>
                <CheckCircle2 size={20} />
                Bulk orders available for homes and businesses
              </li>
            </ul>
          </div>

          {/* OTHER STORES */}

          <div className="sv-why-card sv-why-bad">
            <h3>What Customers Often Experience Elsewhere</h3>

            <ul>
              <li>
                <XCircle size={20} />
                Poor product quality
              </li>

              <li>
                <XCircle size={20} />
                Hidden or inconsistent pricing
              </li>

              <li>
                <XCircle size={20} />
                Limited product options
              </li>

              <li>
                <XCircle size={20} />
                Delayed deliveries
              </li>

              <li>
                <XCircle size={20} />
                Poor customer communication
              </li>

              <li>
                <XCircle size={20} />
                Frequent out-of-stock items
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
