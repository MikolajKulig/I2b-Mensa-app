import React, { useState, useEffect } from "react";
import "./MenuOverview.css";

const allMeals = [
  {
    name: "Spaghetti Bolognese",
    description: "Klassische Pasta mit würziger Fleischsoße",
    price: "4,50€",
    image: "https://source.unsplash.com/400x300/?spaghetti",
  },
  {
    name: "Gemüse-Curry",
    description: "Herzhaftes Curry mit exotischem Aroma",
    price: "4,00€",
    image: "https://source.unsplash.com/400x300/?curry",
  },
  {
    name: "Käsespätzle",
    description: "Deftige Spätzle mit geschmolzenem Käse",
    price: "3,80€",
    image: "https://source.unsplash.com/400x300/?cheese-noodles",
  },
  {
    name: "Hähnchenbrust",
    description: "Zartes Hähnchen, leicht gewürzt",
    price: "5,20€",
    image: "https://source.unsplash.com/400x300/?chicken",
  },
  {
    name: "Schnitzel mit Pommes",
    description: "Knuspriges Schnitzel mit goldenen Pommes",
    price: "5,00€",
    image: "https://source.unsplash.com/400x300/?schnitzel",
  },
  {
    name: "Linsensuppe",
    description: "Hausgemachte Suppe mit kräftigem Geschmack",
    price: "3,50€",
    image: "https://source.unsplash.com/400x300/?lentilsoup",
  },
  {
    name: "Pizza Margherita",
    description: "Knuspriger Boden mit fruchtiger Tomatensoße",
    price: "4,80€",
    image: "https://source.unsplash.com/400x300/?pizza",
  },
  {
    name: "Falafel Wrap",
    description: "Orientalischer Wrap mit frischem Salat",
    price: "4,20€",
    image: "https://source.unsplash.com/400x300/?falafel",
  },
  {
    name: "Chili sin Carne",
    description: "Pikant, sättigend und rein pflanzlich",
    price: "4,00€",
    image: "https://source.unsplash.com/400x300/?chili",
  },
  {
    name: "Reis mit Gemüse",
    description: "Leichtes Gericht im Asia-Stil",
    price: "3,90€",
    image: "https://source.unsplash.com/400x300/?rice-vegetables",
  },
];

const getWeekdays = () => {
  const weekdays = [];
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

const MenuOverview = () => {
  const weekdays = getWeekdays();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [dailyMeals, setDailyMeals] = useState({});

  useEffect(() => {
    const shuffled = [...allMeals].sort(() => 0.5 - Math.random());
    const mealsPerDay = {};
    for (let i = 0; i < 5; i++) {
      mealsPerDay[i] = shuffled.slice(i * 2, i * 2 + 3);
    }
    setDailyMeals(mealsPerDay);
  }, []);

  const handleAddToCart = (meal) => {
    console.log("In den Warenkorb:", meal);
    // Hier kann Warenkorb-Logik ergänzt werden
  };

  return (
    <>
      <div className="menu-overview">
        <div className="weekday-circles">
          {weekdays.map((date, index) => (
            <div
              key={index}
              className={`weekday-circle ${selectedDayIndex === index ? "active" : ""}`}
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
            {(dailyMeals[selectedDayIndex] || []).map((meal, i) => (
              <div key={i} className="meal-card">
                <img src={meal.image} alt={meal.name} className="meal-image" />
                <div className="meal-content">
                  <h3>{meal.name}</h3>
                  <p>{meal.description}</p>
                  <p><strong>Preis:</strong> {meal.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(meal)}
                  >
                    In den Warenkorb
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOverview;
