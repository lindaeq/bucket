import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Add new goal
  function addItem() {
    if (!item.trim()) return;
    setList([...list, { text: item.toLowerCase(), checked: false, note: "" }]);
    setItem("");
  }

  // Enter key adds item
  function handleKeyDown(e) {
    if (e.key === "Enter") addItem();
  }

  // Toggle active goal
  function toggleActive(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  // Toggle checkbox
  function toggleCheck(index) {
    const updated = [...list];
    updated[index].checked = !updated[index].checked;
    setList(updated);
  }

  // Update note text
  function updateNote(index, text) {
    const updated = [...list];
    updated[index].note = text;
    setList(updated);
  }

  // Delete goal with backspace
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

  // Petals
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

  // Auto-resize textarea
  function autoResize(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <div className="app-wrapper">
      <div className="petal-container"></div>

      <img
        src="https://pngimg.com/d/cherry_blossom_PNG8683.png"
        alt="branch"
        className="branch"
      />

      <div className="app-container">
        <h1 className="main-title">my yearly bucket list</h1>
        <p className="subtitle">pin your dreams, one blossom at a time</p>

        {/* Input */}
        <div className="input-section">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="add a goal..."
          />
          <button onClick={addItem}>add</button>
        </div>

        {/* Bucket list */}
        <div className="list-container">
          {list.length === 0 ? (
            <p className="empty-message">no goals yet 🌷</p>
          ) : (
            list.map((goal, index) => (
              <div
                key={index}
                className={`goal-card ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleActive(index)}
              >
                <div className="goal-top">
                  <input
                    type="checkbox"
                    checked={goal.checked}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCheck(index);
                    }}
                  />
                  <p
                    className={`goal-text ${goal.checked ? "checked" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {goal.text}
                  </p>
                </div>

                {activeIndex === index && (
                  <textarea
                    className="goal-note"
                    placeholder="write a note or reflection..."
                    value={goal.note}
                    onChange={(e) => {
                      updateNote(index, e.target.value);
                      autoResize(e);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    rows={1}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
