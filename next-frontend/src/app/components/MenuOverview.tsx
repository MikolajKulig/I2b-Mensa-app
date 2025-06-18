import React, { useState, useEffect } from "react";
import { ShoppingCart, Check, Image } from "lucide-react";
import Footer from "./Footer";
import Cart, { CartItem } from "./Cart";
import "./MenuOverview.css";

const allMeals = [
  {
    name: "Spaghetti Bolognese",
    description: "Klassische Pasta mit würziger Fleischsoße",
    price: "14.50 CHF",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
  },
  {
    name: "Gemüse-Curry",
    description: "Herzhaftes Curry mit exotischem Aroma",
    price: "13.00 CHF",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
  },
  {
    name: "Käsespätzle",
    description: "Deftige Spätzle mit geschmolzenem Käse",
    price: "12.80 CHF",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
  },
  {
    name: "Hähnchenbrust",
    description: "Zartes Hähnchen, leicht gewürzt",
    price: "16.20 CHF",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
  },
  {
    name: "Schnitzel mit Pommes",
    description: "Knuspriges Schnitzel mit goldenen Pommes",
    price: "15.00 CHF",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
  },
  {
    name: "Linsensuppe",
    description: "Hausgemachte Suppe mit kräftigem Geschmack",
    price: "9.50 CHF",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  },
  {
    name: "Pizza Margherita",
    description: "Knuspriger Boden mit fruchtiger Tomatensoße",
    price: "13.80 CHF",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
  },
  {
    name: "Falafel Wrap",
    description: "Orientalischer Wrap mit frischem Salat",
    price: "12.20 CHF",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  },
  {
    name: "Chili sin Carne",
    description: "Pikant, sättigend und rein pflanzlich",
    price: "13.00 CHF",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  },
  {
    name: "Reis mit Gemüse",
    description: "Leichtes Gericht im Asia-Stil",
    price: "11.90 CHF",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
  },
];

const getWeekdays = () => {
  const weekdays: Date[] = [];
  const today = new Date();
  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekdays.push(day);
  }
  return weekdays;
};

const shortWeekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

type Meal = {
  name: string;
  description: string;
  price: string;
  image: string;
};

interface MenuOverviewProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const MenuOverview: React.FC<MenuOverviewProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  const weekdays = getWeekdays();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [dailyMeals, setDailyMeals] = useState<Record<number, Meal[]>>({});
  const [buttonStates, setButtonStates] = useState<
    Record<string, "idle" | "loading" | "success">
  >({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Apply theme to document when isDarkMode changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  useEffect(() => {
    const shuffled = [...allMeals].sort(() => 0.5 - Math.random());
    const mealsPerDay: Record<number, Meal[]> = {};
    for (let i = 0; i < 5; i++) {
      mealsPerDay[i] = shuffled.slice(i * 2, i * 2 + 3);
    }
    setDailyMeals(mealsPerDay);
  }, []);

  const handleImageError = (mealName: string) => {
    setImageErrors((prev) => ({ ...prev, [mealName]: true }));
  };

  const handleAddToCart = async (meal: Meal) => {
    const buttonId = `${meal.name}-${selectedDayIndex}`;

    // Set loading state
    setButtonStates((prev) => ({ ...prev, [buttonId]: "loading" }));

    // Add item to cart
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.name === meal.name);
      if (existingItem) {
        return prev.map((item) =>
          item.name === meal.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { name: meal.name, price: meal.price, quantity: 1 }];
    });

    // Set success state
    setButtonStates((prev) => ({ ...prev, [buttonId]: "success" }));

    // Reset to idle after 2 seconds
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [buttonId]: "idle" }));
    }, 2000);
  };

  const handleUpdateQuantity = (name: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(name);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const getButtonContent = (meal: Meal) => {
    const buttonId = `${meal.name}-${selectedDayIndex}`;
    const state = buttonStates[buttonId] || "idle";

    switch (state) {
      case "loading":
        return (
          <>
            <span>Wird hinzugefügt...</span>
          </>
        );
      case "success":
        return (
          <>
            <Check size={16} />
            <span>Hinzugefügt!</span>
          </>
        );
      default:
        return (
          <>
            <ShoppingCart size={16} />
            <span>In den Warenkorb</span>
          </>
        );
    }
  };

  return (
    <>
      <div className="menu-overview" data-theme={isDarkMode ? "dark" : "light"}>
        <div className="cart-button" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="cart-count">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
        <div className="weekday-circles">
          {weekdays.map((date, index) => (
            <div
              key={index}
              className={`weekday-circle ${
                selectedDayIndex === index ? "active" : ""
              }`}
              onClick={() => setSelectedDayIndex(index)}
            >
              <div className="weekday">{shortWeekdays[date.getDay()]}</div>
              <div className="date">{date.toLocaleDateString("de-DE")}</div>
            </div>
          ))}
        </div>
        <div className="day-section">
          <h2 className="day-heading">
            {shortWeekdays[weekdays[selectedDayIndex].getDay()]} –{" "}
            {weekdays[selectedDayIndex].toLocaleDateString("de-DE")}
          </h2>
          <div className="meal-grid">
            {(dailyMeals[selectedDayIndex] || []).map((meal, i) => {
              const buttonId = `${meal.name}-${selectedDayIndex}`;
              const buttonState = buttonStates[buttonId] || "idle";
              const hasImageError = imageErrors[meal.name];

              return (
                <div key={i} className="meal-card">
                  {hasImageError ? (
                    <div className="meal-image-placeholder">
                      <Image size={48} />
                      <span>{meal.name}</span>
                    </div>
                  ) : (
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="meal-image"
                      onError={() => handleImageError(meal.name)}
                      loading="lazy"
                    />
                  )}
                  <div className="meal-content">
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                    <p className="meal-price">{meal.price}</p>
                    <button
                      className={`add-to-cart-btn ${buttonState}`}
                      onClick={() => handleAddToCart(meal)}
                      disabled={buttonState === "loading"}
                    >
                      {getButtonContent(meal)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </>
  );
};

export default MenuOverview;
