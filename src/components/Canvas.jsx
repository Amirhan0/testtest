import React, { useRef, useEffect, useState } from "react";
import backgroundImg from "/map.png";
import figureImg from "/monkey.png";

function MapCanvas() {
  const canvasRef = useRef(null);
  const [figurePosition, setFigurePosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState(() => {
    const initialPoints = [
      { x: 237, y: 530 },
      { x: 241, y: 556 },
      { x: 243, y: 584 },
      { x: 228, y: 610 },
      { x: 195, y: 628 },
      { x: 167, y: 637 },
      { x: 134, y: 628 },
      { x: 117, y: 601 },
      { x: 107, y: 576 },
      { x: 100, y: 554 },
      { x: 97, y: 527 },
      { x: 96, y: 500 },
      { x: 108, y: 475 },
      { x: 129, y: 459 },
      { x: 153, y: 441 },
      { x: 174, y: 422 },
      { x: 198, y: 409 },
      { x: 210, y: 385 },
      { x: 208, y: 358 },
      { x: 195, y: 337 },
      { x: 173, y: 315 },
      { x: 138, y: 297 },
      { x: 110, y: 290 },
      { x: 86, y: 287 },
      { x: 60, y: 274 },
      { x: 51, y: 258 },
      { x: 65, y: 243 },
      { x: 104, y: 252 },
      { x: 133, y: 254 },
      { x: 152, y: 254 },
      { x: 176, y: 249 },
      { x: 192, y: 241 },
      { x: 208, y: 232 },
      { x: 225, y: 223 },
      { x: 233, y: 206 },
      { x: 235, y: 193 },
      { x: 224, y: 179 },
      { x: 211, y: 167 },
      { x: 201, y: 154 },
      { x: 191, y: 142 },
      { x: 187, y: 131 },
      { x: 185, y: 110 },
      { x: 185, y: 85 },
      { x: 181, y: 68 }
    ];

    localStorage.setItem("points", JSON.stringify(initialPoints));
    return initialPoints; 
  });

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const background = new Image();
    background.src = backgroundImg;

    const figure = new Image();
    figure.src = figureImg;

    background.onload = () => {
      const width = Math.min(window.innerWidth, 390);
      const height = Math.min(window.innerHeight, 844);

      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      points.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.fillStyle = "blue";
        context.fill();
      });
      figure.onload = () => {
        context.drawImage(figure, figurePosition.x - 15, figurePosition.y - 15, 30, 30);
      };
    };
  };

  useEffect(() => {
    drawCanvas();

    const handleResize = () => {
      drawCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [figurePosition, points]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let pointClicked = false;
    points.forEach(point => {
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      if (distance < 10) {
        setFigurePosition({ x: point.x, y: point.y });
        pointClicked = true; 
      }
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default MapCanvas;
