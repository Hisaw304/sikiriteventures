import products from "../data/products";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  return (
    <section className="sv-products" id="products">
      <div className="sv-products-container">
        <div className="sv-products-header">
          <span>Shop Our Products</span>

          <h2>Quality Groceries at Prices You Can Afford</h2>

          <p>
            Whether you're shopping for your home, stocking up for your
            business, or buying in bulk for your family, we've got you covered.
            Simply choose the products you need, select your preferred quantity,
            and add them to your cart. From a single pack to multiple bags or
            cartons, you can order as much as you want, and we'll prepare and
            deliver your groceries safely to your doorstep.
          </p>
        </div>

        <div className="sv-products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
