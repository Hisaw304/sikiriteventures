import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatPrice = (amount) => `₦${Number(amount).toLocaleString()}`;

/* ==========================================
   BUILD ORDER ITEMS HTML
========================================== */

const buildItemsHtml = (items) => {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;">
            <strong>${item.name}</strong><br />
            <span style="color:#6B7280;">
              ${item.size} × ${item.quantity}
            </span>
          </td>

          <td
            style="
              padding:10px 0;
              text-align:right;
              font-weight:600;
            "
          >
            ${formatPrice(item.total)}
          </td>
        </tr>
      `
    )
    .join("");
};

/* ==========================================
   CUSTOMER EMAIL
========================================== */

export const sendCustomerEmail = async ({
  customer,
  items,
  productsTotal,
  reference,
}) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: customer.email,

    subject: `Order Confirmed - ${reference}`,

    html: `
      <div
        style="
          max-width:620px;
          margin:0 auto;
          font-family:Arial,sans-serif;
          color:#1F2937;
          line-height:1.6;
        "
      >

        <div
          style="
            background:#0B5D2A;
            padding:30px;
            text-align:center;
          "
        >
          <h1
            style="
              margin:0;
              color:#ffffff;
              font-size:26px;
            "
          >
            Order Confirmed
          </h1>
        </div>

        <div style="padding:30px;">

          <h2>
            Thank you, ${customer.name}! 🎉
          </h2>

          <p>
            We've successfully received your payment and your
            order has been confirmed.
          </p>

         <div
            style="
              background:#F8F6F1;
              padding:18px;
              border-radius:8px;
              margin:25px 0;
            "
          >
            <strong>Order Reference</strong>

            <p
              style="
                margin:5px 0 0;
                color:#0B5D2A;
                font-weight:bold;
              "
            >
              ${reference}
            </p>

            <div
              style="
                margin-top:18px;
                padding-top:15px;
                border-top:1px solid #E5E7EB;
              "
            >
              <strong>Delivery Address</strong>

              <p
                style="
                  margin:5px 0 0;
                  color:#1F2937;
                "
              >
                ${customer.address}
              </p>
            </div>
          </div>

          <h3>Your Order</h3>

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
          >
            ${buildItemsHtml(items)}

            <tr>
              <td
                style="
                  padding-top:18px;
                  border-top:1px solid #E5E7EB;
                "
              >
                <strong>Products Total</strong>
              </td>

              <td
                style="
                  padding-top:18px;
                  border-top:1px solid #E5E7EB;
                  text-align:right;
                  font-size:18px;
                  font-weight:bold;
                  color:#0B5D2A;
                "
              >
                ${formatPrice(productsTotal)}
              </td>
            </tr>
          </table>

          <div
            style="
              background:#FFF7ED;
              padding:15px;
              margin-top:25px;
              border-radius:8px;
            "
          >
            <strong>Delivery Information</strong>

            <p style="margin-bottom:0;">
              Delivery fees are not included in the product total.
              Our team will contact you to confirm the delivery
              cost based on your location and order requirements.
            </p>
          </div>

          <p style="margin-top:30px;">
            Thank you for shopping with
            <strong>Sikarite Ventures</strong>.
          </p>

        </div>
      </div>
    `,
  });

  if (error) {
    throw error;
  }

  return data;
};

/* ==========================================
   OWNER EMAIL
========================================== */

export const sendOwnerEmail = async ({
  customer,
  items,
  productsTotal,
  reference,
}) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.OWNER_EMAIL,

    subject: `🛒 New Paid Order - ${reference}`,

    html: `
      <div
        style="
          max-width:650px;
          margin:0 auto;
          font-family:Arial,sans-serif;
          color:#1F2937;
        "
      >

        <div
          style="
            background:#0B5D2A;
            padding:25px;
          "
        >
          <h1
            style="
              margin:0;
              color:white;
            "
          >
            New Paid Order
          </h1>
        </div>

        <div style="padding:30px;">

          <h2>Customer Information</h2>

          <p>
            <strong>Name:</strong>
            ${customer.name}
          </p>

          <p>
            <strong>Phone:</strong>
            ${customer.phone}
          </p>

          <p>
            <strong>Email:</strong>
            ${customer.email}
          </p>

          <p>
            <strong>Delivery Address:</strong>
            ${customer.address}
          </p>

          <p>
            <strong>Reference:</strong>
            ${reference}
          </p>

          <hr
            style="
              border:none;
              border-top:1px solid #E5E7EB;
              margin:25px 0;
            "
          />

          <h2>Order Items</h2>

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
          >
            ${buildItemsHtml(items)}

            <tr>
              <td
                style="
                  padding-top:18px;
                  border-top:1px solid #E5E7EB;
                "
              >
                <strong>Products Total</strong>
              </td>

              <td
                style="
                  padding-top:18px;
                  border-top:1px solid #E5E7EB;
                  text-align:right;
                  font-size:18px;
                  font-weight:bold;
                "
              >
                ${formatPrice(productsTotal)}
              </td>
            </tr>
          </table>

          <div
            style="
              margin-top:25px;
              padding:15px;
              background:#ECFDF5;
              border-radius:8px;
            "
          >
            <strong style="color:#0B5D2A;">
              PAYMENT SUCCESSFUL
            </strong>
          </div>

          <p style="margin-top:25px;">
            Delivery fee still needs to be confirmed
            with the customer.
          </p>

        </div>
      </div>
    `,
  });

  if (error) {
    throw error;
  }

  return data;
};
