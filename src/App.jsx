import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  function addItem() {
    if (item.trim() === "") return;
    setList([...list, item]);
    setItem("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addItem();
  }

  // Delete selected item with Backspace
  useEffect(() => {
    function handleBackspace(e) {
      if (e.key === "Backspace" && activeIndex !== null) {
        e.preventDefault();
        setList((prev) => prev.filter((_, i) => i !== activeIndex));
        setActiveIndex(null);
      }
    }
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [activeIndex]);

  function toggleActive(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  // Create floating petals dynamically
  useEffect(() => {
    const numPetals = 15;
    const container = document.createElement("div");
    container.className = "petal-container";
    document.body.appendChild(container);

    for (let i = 0; i < numPetals; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDelay = Math.random() * 5 + "s";
      petal.style.animationDuration = 5 + Math.random() * 5 + "s";
      petal.style.transform = `scale(${0.6 + Math.random() * 0.6})`;
      container.appendChild(petal);
    }

    return () => container.remove();
  }, []);

  return (
    <div className="app-container">
      <h1>🌸 My Year Bucket List 🌸</h1>
      <p className="subtitle">A gentle reminder of dreams and goals worth chasing.</p>

      <div className="input-section">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new goal..."
        />
        <button onClick={addItem}>Add</button>
      </div>

      <div className="list-container">
        {list.length === 0 ? (
          <p className="empty-message">
            Your bucket list is waiting for your first dream 🌷
          </p>
        ) : (
          list.map((goal, index) => (
            <div
              key={index}
              onClick={() => toggleActive(index)}
              className={`goal-card ${activeIndex === index ? "active" : ""}`}
            >
              <h3>{goal}</h3>
              {activeIndex === index && (
                <div className="goal-details">
                  <p>💭 Write down small steps to make this dream real!</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
