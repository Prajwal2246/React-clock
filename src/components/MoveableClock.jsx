import React, { useState, useRef, useEffect } from "react";
import Clock from "./Clock";

const MoveableClock = () => {
  // Initial clock position
  const [pos, setPos] = useState({ x: 100, y: 100 });

  // Font state
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("white");

  // Show/hide font options on click
  const [showFontOptions, setShowFontOptions] = useState(false);

  // Drag tracking
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  // Handle mouse down
  const onMouseDown = (e) => {
    if (e.target.tagName === "SELECT" || e.target.tagName === "OPTION") return;

    dragging.current = true;

    // Save mouse starting point
    startPos.current = { x: e.clientX, y: e.clientY };

    // Save offset from element's position
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    e.preventDefault();
  };

  // Handle mouse move
  const onMouseMove = (e) => {
    if (!dragging.current) return;

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });

    e.preventDefault();
  };

  // Handle mouse up
  const endDrag = (e) => {
    if (!dragging.current) return;

    dragging.current = false;

    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);

    // Treat as click if mouse barely moved
    if (dx < 5 && dy < 5) {
      setShowFontOptions((prev) => !prev);
    }
  };

  // Add/remove global mouseup listener
  useEffect(() => {
    window.addEventListener("mouseup", endDrag);
    return () => {
      window.removeEventListener("mouseup", endDrag);
    };
  }, []);

  return (
    <div
      onMouseMove={onMouseMove}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          top: pos.y,
          left: pos.x,
          cursor: dragging.current ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <Clock fontFamily={fontFamily} fontColor={fontColor} />

        {showFontOptions && (
          <div
            style={{
              marginTop: 16,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: 10,
              color: "white",
              fontSize: 14,
              userSelect: "none",
            }}
          >
            <label
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: "#ddd",
                marginBottom: 6,
                display: "inline-block",
                userSelect: "none",
              }}
            >
              Font:&nbsp;
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                style={{
                  fontSize: 14,
                  fontFamily: fontFamily, // Show selected font style
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  backgroundColor: "#222",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
                <option value="'Lucida Console', Monaco, monospace">
                  Lucida Console
                </option>
                <option value="'Comic Sans MS', cursive, sans-serif">
                  Comic Sans
                </option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
                  Segoe UI
                </option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Orbitron', sans-serif">Orbitron</option>
                <option value="'Press Start 2P', cursive">
                  Press Start 2P (8-bit style)
                </option>
                <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
              </select>
            </label>
            <br />
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Color:&nbsp;
              <select
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                style={{
                  fontSize: 14,
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  backgroundColor: "#222",
                  color: fontColor,
                  cursor: "pointer",
                  minWidth: 100,
                }}
              >
                <option value="white">White</option>
                <option value="red">red</option>
                <option value="gold">Gold</option>
                <option value="yellow">Yellow</option>
                <option value="skyblue">Sky Blue</option>
                <option value="violet">Violet</option>
                <option value="pink">Pink</option>
                <option value="lime">Lime</option>
                <option value="cyan">Cyan</option>
                <option value="white">White</option>
                <option value="#FFD700">Gold</option>
                <option value="#00FFFF">Cyan</option>
                <option value="#FF69B4">Hot Pink</option>
                <option value="#ADFF2F">Green Yellow</option>
                <option value="#7CFC00">Lawn Green</option>
                <option value="#00FA9A">Medium Spring Green</option>
                <option value="#FF4500">Orange Red</option>
                <option value="#9370DB">Medium Purple</option>
                <option value="#FF1493">Deep Pink</option>
                <option value="#40E0D0">Turquoise</option>
                <option value="#E6E6FA">Lavender</option>
                <option value="#FAFAD2">Light Goldenrod Yellow</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveableClock;
