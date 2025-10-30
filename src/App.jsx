import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [decorations, setDecorations] = useState([]);
  const [petals, setPetals] = useState([]);

  const containerRef = useRef(null);

  // Add new goal
  function addItem() {
    if (!item.trim()) return;
    setList([
      ...list,
      {
        text: item,
        note: "",
        x: 50,
        y: 50,
        width: 220,
        height: 90,
      },
    ]);
    setItem("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addItem();
  }

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

  // Petals spawn continuously inside animation loop
  useEffect(() => {
    let lastSpawn = Date.now();

    let animationFrame;
    function animate() {
      const now = Date.now();
      // Spawn a new petal every 500ms
      if (now - lastSpawn > 500) {
        setPetals((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: -50,
            speed: 0.5 + Math.random(),
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2,
          },
        ]);
        lastSpawn = now;
      }

      // Animate petals
      setPetals((prev) =>
        prev.map((p) => {
          let newY = p.y + p.speed;
          if (newY > window.innerHeight) newY = -50;
          return { ...p, y: newY, rotation: p.rotation + p.rotationSpeed };
        })
      );

      animationFrame = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  function handleDrag(e, index, type = "goal") {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const startPos =
      type === "goal"
        ? { x: list[index].x, y: list[index].y }
        : type === "decoration"
        ? { x: decorations[index].x, y: decorations[index].y }
        : { x: petals[index].x, y: petals[index].y };

    function onMouseMove(moveEvent) {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (type === "goal") {
        const updated = [...list];
        updated[index].x = startPos.x + dx;
        updated[index].y = startPos.y + dy;
        setList(updated);
      } else if (type === "decoration") {
        const updated = [...decorations];
        updated[index].x = startPos.x + dx;
        updated[index].y = startPos.y + dy;
        setDecorations(updated);
      } else if (type === "petal") {
        const updated = [...petals];
        updated[index].x = startPos.x + dx;
        updated[index].y = startPos.y + dy;
        setPetals(updated);
      }
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function handleResize(e, index) {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { width: list[index].width, height: list[index].height };

    function onMouseMove(moveEvent) {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const updated = [...list];
      updated[index].width = Math.max(150, startSize.width + dx);
      updated[index].height = Math.max(70, startSize.height + dy);
      setList(updated);
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  // Add decoration safely inside container bounds
  function addDecoration() {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const margin = 50;
    const decList = ["📌", "🎀", "✨", "🌸", "💖"];
    const newDec = {
      emoji: decList[Math.floor(Math.random() * decList.length)],
      x: margin + Math.random() * (container.width - 2 * margin),
      y: margin + Math.random() * (container.height - 2 * margin),
      id: Date.now() + Math.random(),
    };
    setDecorations((prev) => [...prev, newDec]);
  }

  return (
    <div className="app-wrapper" ref={containerRef}>
      <div className="petal-container">
        {petals.map((p, i) => (
          <div
            key={p.id}
            className="petal"
            style={{ left: p.x, top: p.y, transform: `rotate(${p.rotation}deg)` }}
            onMouseDown={(e) => handleDrag(e, i, "petal")}
          />
        ))}
      </div>

      <div className="app-container">
        <h1 className="main-title">bouquet list</h1>
        <p className="subtitle">pin your dreams, one blossom at a time</p>

        <button className="add-decoration-btn" onClick={addDecoration}>
          click here to add a cute element
        </button>

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

        <div className="list-container">
          {list.map((goal, index) => (
            <div
              key={index}
              className="goal-card"
              style={{ left: goal.x, top: goal.y, width: goal.width, height: goal.height }}
              onMouseDown={(e) => handleDrag(e, index, "goal")}
            >
              <p className="goal-text">{goal.text}</p>

              {goal.note !== undefined && (
                <textarea
                  className="goal-note"
                  placeholder="write a note or reflection..."
                  value={goal.note}
                  onChange={(e) => {
                    updateNote(index, e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  rows={1}
                />
              )}

              <div
                style={{
                  position: "absolute",
                  width: "15px",
                  height: "15px",
                  right: "2px",
                  bottom: "2px",
                  cursor: "se-resize",
                  background: "#ff8fab",
                  borderRadius: "50%",
                }}
                onMouseDown={(e) => handleResize(e, index)}
              ></div>
            </div>
          ))}

          {decorations.map((dec, i) => (
            <div
              key={dec.id}
              className="decoration"
              style={{ left: dec.x, top: dec.y }}
              onMouseDown={(e) => handleDrag(e, i, "decoration")}
            >
              {dec.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
