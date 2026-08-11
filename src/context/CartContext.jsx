import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("sv-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("sv-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize, quantity) => {
    const cartItemId = `${product.id}-${selectedSize.label}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: selectedSize.image,
          sizeId: selectedSize.id,
          size: selectedSize.label,
          price: selectedSize.price,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
