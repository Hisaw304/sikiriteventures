const PRODUCTS = {
  1: {
    name: "Premium Rice",
    sizes: {
      "50kg-bag": {
        label: "50kg Bag",
        price: 52000,
      },
      "25kg-half-bag": {
        label: "25kg Half Bag",
        price: 25000,
      },
    },
  },

  2: {
    name: "Semo",
    sizes: {
      "10kg": {
        label: "10kg",
        price: 15500,
      },
      "5kg": {
        label: "5kg",
        price: 7600,
      },
      "2kg": {
        label: "2kg",
        price: 3000,
      },
      "1kg": {
        label: "1kg",
        price: 1600,
      },
      "500g": {
        label: "500g",
        price: 900,
      },
    },
  },

  3: {
    name: "Groundnut Oil",
    sizes: {
      "25-litres": {
        label: "25 Litres",
        price: 53000,
      },
      "5-litres": {
        label: "5 Litres",
        price: 10500,
      },
      "2.5-litres": {
        label: "2.5 Litres",
        price: 5300,
      },
      "1-litre": {
        label: "1 Litre",
        price: 2000,
      },
    },
  },

  4: {
    name: "Palm Oil",
    sizes: {
      "25-litres": {
        label: "25 Litres",
        price: 50000,
      },
      "5-litres": {
        label: "5 Litres",
        price: 11000,
      },
      "2-litres": {
        label: "2 Litres",
        price: 4000,
      },
      "1-litre": {
        label: "1 Litre",
        price: 2000,
      },
    },
  },

  5: {
    name: "Spaghetti",
    sizes: {
      "full-carton": {
        label: "Full Carton",
        price: 18600,
      },
      "half-carton": {
        label: "Half Carton",
        price: 9300,
      },
      "quarter-carton": {
        label: "Quarter Carton",
        price: 4800,
      },
    },
  },

  6: {
    name: "Indomie Noodles",
    sizes: {
      "1-carton": {
        label: "1 Carton",
        price: 9500,
      },
    },
  },

  7: {
    name: "Mimee Instant Noodles",
    sizes: {
      "1-carton": {
        label: "1 Carton",
        price: 8500,
      },
    },
  },

  8: {
    name: "Salt",
    sizes: {
      "1-pack": {
        label: "1 Pack",
        price: 500,
      },
    },
  },

  9: {
    name: "Maggi Chicken Cubes",
    sizes: {
      "170-cubes": {
        label: "170 Cubes Pack",
        price: 1700,
      },
      "50-cubes": {
        label: "50 Cubes Pack",
        price: 500,
      },
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const { customer, items } = req.body;

    /* =========================================
       CUSTOMER VALIDATION
    ========================================= */

    const name = customer?.name?.trim();
    const phone = customer?.phone?.trim();
    const email = customer?.email?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required.",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Customer phone is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required.",
      });
    }

    /* =========================================
       CART VALIDATION
    ========================================= */

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    /* =========================================
       CALCULATE AUTHORITATIVE TOTAL
    ========================================= */

    let productsTotal = 0;

    const validatedItems = [];

    for (const item of items) {
      const product = PRODUCTS[item.productId];

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "One of the products in your cart is invalid.",
        });
      }

      const size = product.sizes[item.sizeId];

      if (!size) {
        return res.status(400).json({
          success: false,
          message: `Invalid size selected for ${product.name}.`,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for ${product.name}.`,
        });
      }

      const itemTotal = size.price * quantity;

      productsTotal += itemTotal;

      validatedItems.push({
        productId: Number(item.productId),
        name: product.name,
        sizeId: item.sizeId,
        size: size.label,
        price: size.price,
        quantity,
        total: itemTotal,
      });
    }

    if (productsTotal <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order total.",
      });
    }

    /* =========================================
       PAYSTACK REFERENCE
    ========================================= */

    const reference = `SV-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    /* =========================================
       NGN → KOBO
    ========================================= */

    const amountInKobo = Math.round(productsTotal * 100);

    /* =========================================
       INITIALIZE PAYSTACK
    ========================================= */

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          amount: amountInKobo,
          currency: "NGN",
          reference,

          callback_url: `${process.env.APP_URL}/payment/callback`,

          metadata: {
            customer_name: name,
            customer_phone: phone,

            items: validatedItems,

            products_total: productsTotal,
          },
        }),
      }
    );

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      console.error("Paystack initialization failed:", data);

      return res.status(400).json({
        success: false,
        message:
          data.message || "Paystack could not initialize the transaction.",
      });
    }

    /* =========================================
       RESPONSE
    ========================================= */

    return res.status(200).json({
      success: true,

      authorization_url: data.data.authorization_url,

      access_code: data.data.access_code,

      reference: data.data.reference,

      amount: productsTotal,
    });
  } catch (error) {
    console.error("Initialize payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to initialize payment.",
    });
  }
}
