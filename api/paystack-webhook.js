import crypto from "crypto";
import { sendCustomerEmail, sendOwnerEmail } from "./notifications.js";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    /* =========================================
       VERIFY PAYSTACK SIGNATURE
    ========================================= */

    const signature = req.headers["x-paystack-signature"];

    if (!signature) {
      return res.status(401).json({
        success: false,
        message: "Missing Paystack signature.",
      });
    }

    const rawBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Paystack signature.",
      });
    }

    /* =========================================
       PAYSTACK EVENT
    ========================================= */

    const event =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    /* =========================================
       ONLY PROCESS SUCCESSFUL PAYMENTS
    ========================================= */

    if (event.event !== "charge.success") {
      return res.status(200).json({
        success: true,
        message: "Event received.",
      });
    }

    const transaction = event.data;

    const reference = transaction.reference;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "Transaction reference missing.",
      });
    }

    /* =========================================
       VERIFY TRANSACTION WITH PAYSTACK
    ========================================= */

    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData.status) {
      console.error("Paystack verification failed:", verifyData);

      return res.status(400).json({
        success: false,
        message: "Unable to verify transaction.",
      });
    }

    const verifiedTransaction = verifyData.data;

    /* =========================================
       VERIFY PAYMENT STATUS
    ========================================= */

    if (verifiedTransaction.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Transaction was not successful.",
      });
    }

    /* =========================================
       VERIFY CURRENCY
    ========================================= */

    if (verifiedTransaction.currency !== "NGN") {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction currency.",
      });
    }

    /* =========================================
       GET METADATA
    ========================================= */

    const metadata = verifiedTransaction.metadata || {};

    const customerName = metadata.customer_name || "";

    const customerPhone = metadata.customer_phone || "";

    const customerAddress = metadata.customer_address || "";

    const items = Array.isArray(metadata.items) ? metadata.items : [];

    const productsTotal = Number(metadata.products_total) || 0;

    /* =========================================
       VERIFY AMOUNT
    ========================================= */

    const expectedAmount = Math.round(productsTotal * 100);

    if (verifiedTransaction.amount !== expectedAmount) {
      console.error("Amount mismatch:", {
        expected: expectedAmount,
        received: verifiedTransaction.amount,
        reference,
      });

      return res.status(400).json({
        success: false,
        message: "Transaction amount mismatch.",
      });
    }

    /* =========================================
   PAYMENT CONFIRMED
========================================= */

    const order = {
      reference,

      customer: {
        name: customerName,
        phone: customerPhone,
        email: verifiedTransaction.customer?.email || "",
        address: customerAddress,
      },

      items,

      productsTotal,

      amountPaid: verifiedTransaction.amount / 100,

      currency: verifiedTransaction.currency,

      paymentStatus: "paid",

      paymentChannel: verifiedTransaction.channel,

      paidAt: verifiedTransaction.paid_at,

      createdAt: verifiedTransaction.created_at,
    };

    /* =========================================
   SEND EMAIL NOTIFICATIONS
========================================= */

    try {
      await Promise.all([sendCustomerEmail(order), sendOwnerEmail(order)]);

      console.log(`Email notifications sent for ${reference}`);
    } catch (notificationError) {
      console.error("Notification error:", notificationError);

      // Payment itself was successful.
      // Do NOT tell Paystack the payment failed
      // simply because an email failed.
    }

    /* =========================================
   WEBHOOK RESPONSE
========================================= */

    return res.status(200).json({
      success: true,
      message: "Payment confirmed and processed.",
    });

    /* =========================================
       NEXT:
       SAVE ORDER + SEND NOTIFICATIONS
    ========================================= */

    // We'll connect:
    //
    // 1. Supabase order creation
    // 2. Customer email
    // 3. Customer WhatsApp
    // 4. Owner email
    // 5. Owner WhatsApp
    //
    // here.
  } catch (error) {
    console.error("Paystack webhook error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed.",
    });
  }
}
