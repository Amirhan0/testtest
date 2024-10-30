import React, { useRef, useEffect, useState } from "react";
import backgroundImg from "/map.png";
import figureImg from "/monkey.png";

function MapCanvas() {
  const canvasRef = useRef(null);
  const [figurePosition, setFigurePosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("points");
    return savedPoints ? JSON.parse(savedPoints) : []; 
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

    if (!pointClicked) {
      const newPoints = [...points, { x, y }];
      setPoints(newPoints);
      localStorage.setItem("points", JSON.stringify(newPoints)); 
    }
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
