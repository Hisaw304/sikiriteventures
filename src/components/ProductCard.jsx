import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const currentImage = selectedSize
    ? selectedSize.image
    : product.sizes[0].image;

  const handleSizeChange = (e) => {
    const size = product.sizes.find((item) => item.label === e.target.value);

    setSelectedSize(size);
    setError("");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size before adding this item to your cart.");
      return;
    }

    addToCart(product, selectedSize, quantity);

    setError("");
    setQuantity(1);
  };

  return (
    <article className="sv-product-card">
      <span className="sv-product-category">{product.category}</span>
      {/* PRODUCT IMAGE */}
      <div className="sv-product-image-wrap">
        <img
          src={currentImage}
          alt={product.name}
          className="sv-product-image"
        />
      </div>

      {/* PRODUCT CONTENT */}
      <div className="sv-product-content">
        <h3>{product.name}</h3>

        <p className="sv-product-description">{product.description}</p>

        {/* SIZE */}
        <div className="sv-product-size">
          <label>Select Size</label>

          <select
            className="sv-size-select"
            value={selectedSize?.label || ""}
            onChange={handleSizeChange}
          >
            <option value="">Choose a size</option>

            {product.sizes.map((size, index) => (
              <option key={size.id || index} value={size.label}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className="sv-price-wrap">
          {selectedSize ? (
            <>
              {selectedSize.oldPrice && (
                <span className="sv-old-price">
                  ₦{selectedSize.oldPrice.toLocaleString()}
                </span>
              )}

              <span className="sv-product-price">
                ₦{selectedSize.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="sv-select-price">
              Select a size to see the price
            </span>
          )}
        </div>

        {/* QUANTITY */}
        <div className="sv-product-actions">
          <span className="sv-quantity-label">Quantity</span>

          <div className="sv-quantity">
            <button
              type="button"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && <p className="sv-product-error">{error}</p>}

        {/* ADD TO CART */}
        <button className="sv-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
