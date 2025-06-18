import React from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import "./cart.css";

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (name: string, newQuantity: number) => void;
  onRemoveItem: (name: string) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("CHF", "").trim());
    return sum + price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>
            <ShoppingBag className="cart-icon" size={24} />
            Warenkorb
          </h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Ihr Warenkorb ist leer</p>
              <button className="continue-shopping" onClick={onClose}>
                Weiter einkaufen
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.name} className="cart-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.name, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.name, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => onRemoveItem(item.name)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Gesamtsumme</span>
              <span>{total.toFixed(2)} CHF</span>
            </div>
            <button className="checkout-button">Zur Kasse</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
