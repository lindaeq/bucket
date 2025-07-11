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
    if (e.key === "Enter") {
      addItem();
    }
  }

  // Handle Backspace key to delete the active goal
  useEffect(() => {
    function handleBackspace(e) {
      if (e.key === "Backspace" && activeIndex !== null) {
        e.preventDefault(); // prevent browser navigation back
        setList((prevList) => {
          const newList = [...prevList];
          newList.splice(activeIndex, 1); // remove item at activeIndex
          return newList;
        });
        setActiveIndex(null); // reset active index after deletion
      }
    }
    window.addEventListener("keydown", handleBackspace);
    return () => {
      window.removeEventListener("keydown", handleBackspace);
    };
  }, [activeIndex]);

  function toggleActive(index) {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }

  return (
    <div>
      <h1>bouquet list</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add your summer goal..."
      />

      {list.map((goal, index) => (
        <div
          key={index}
          onClick={() => toggleActive(index)}
          style={{
            border: activeIndex === index ? "2px solid white" : "1px solid black",
            margin: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{goal}</h3>
          {activeIndex === index && <div><p>Images or details here...</p></div>}
        </div>
      ))}
    </div>
  );
}
