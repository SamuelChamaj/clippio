import { useMemo, useState } from 'react';

const variants = [
  { id: 'basic', name: 'Základná verzia', price: 39 },
  { id: 'gift', name: 'Darčekové balenie', price: 49 },
  { id: 'premium', name: 'Prémiová verzia', price: 69 }
];

export default function MiniShopDemo() {
  const [variantId, setVariantId] = useState('gift');
  const [quantity, setQuantity] = useState(1);
  const currentVariant = useMemo(() => variants.find((variant) => variant.id === variantId), [variantId]);
  const total = currentVariant.price * quantity;

  return (
    <div className="shop-demo">
      <div className="product-card-demo">
        <div className="product-media">
          <span>Demo produkt</span>
        </div>
        <div>
          <h4>Produktová karta</h4>
          <p>Ukážka variantu, množstva a jednoduchého súhrnu. Bez reálnej platobnej brány.</p>
        </div>
      </div>

      <label className="field">
        Variant
        <select value={variantId} onChange={(event) => setVariantId(event.target.value)}>
          {variants.map((variant) => (
            <option value={variant.id} key={variant.id}>{variant.name} – {variant.price} €</option>
          ))}
        </select>
      </label>

      <div className="quantity-row">
        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
        <span>{quantity} ks</span>
        <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <div className="cart-summary">
        <span>Mini košík</span>
        <strong>{total} €</strong>
      </div>
    </div>
  );
}
