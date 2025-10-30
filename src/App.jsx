import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // 🌸 Add new item
  function addItem() {
    if (item.trim() === "") return;
    setList([...list, { text: item, checked: false }]);
    setItem("");
  }

  // 🌸 Enter key adds item
  function handleKeyDown(e) {
    if (e.key === "Enter") addItem();
  }

  // 🌸 Toggle selection
  function toggleActive(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  // 🌸 Toggle checkbox
  function toggleCheck(index) {
    const newList = [...list];
    newList[index].checked = !newList[index].checked;
    setList(newList);
  }

  // 🌸 Delete active goal with Backspace
  useEffect(() => {
    function handleBackspace(e) {
      if (e.key === "Backspace" && activeIndex !== null) {
        e.preventDefault();
        setList((prevList) => prevList.filter((_, i) => i !== activeIndex));
        setActiveIndex(null);
      }
    }
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [activeIndex]);

  // 🌸 Generate falling petals dynamically
  useEffect(() => {
    const petalContainer = document.querySelector(".petal-container");
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal");
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${6 + Math.random() * 5}s`;
      petal.style.animationDelay = `${Math.random() * 5}s`;
      petalContainer.appendChild(petal);
    }
  }, []);

  return (
    <div className="app-wrapper">
      {/* 🌸 Petal animation layer */}
      <div className="petal-container"></div>

      {/* 🌿 Sakura branch (optional aesthetic element) */}
      <img
        src="https://pngimg.com/d/cherry_blossom_PNG8683.png"
        alt="sakura branch"
        style={{
          width: "220px",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%) rotate(3deg)",
          zIndex: 1,
          opacity: 0.85,
        }}
      />

      {/* 🌷 Main content */}
      <div className="app-container">
        <h1>🌸 My Yearly Bucket List 🌸</h1>
        <p className="subtitle">Pin your dreams, one blossom at a time.</p>

        <div className="input-section">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a goal..."
          />
          <button onClick={addItem}>Add</button>
        </div>

        <div className="list-container">
          {list.length === 0 ? (
            <p className="empty-message">No goals yet — start your journey 🌷</p>
          ) : (
            list.map((goal, index) => (
              <div
                key={index}
                className={`goal-card ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleActive(index)}
              >
                <h3>
                  <input
                    type="checkbox"
                    checked={goal.checked}
                    onChange={() => toggleCheck(index)}
                    style={{
                      marginRight: "10px",
                      transform: "scale(1.2)",
                      accentColor: "#ff8fab",
                    }}
                  />
                  {goal.text}
                </h3>
                {activeIndex === index && (
                  <div className="goal-details">
                    <p>✨ Add photos, notes, or inspiration here...</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
