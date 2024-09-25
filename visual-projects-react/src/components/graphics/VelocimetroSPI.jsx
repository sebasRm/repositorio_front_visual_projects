// Velocimetro.js
import React, { useEffect, useState } from "react";
import "../../css/velocimetro.css";

const VelocimetroSPI = ({ velocidad }) => {
  const velocidadNormalizada = Math.min(Math.max(velocidad, 0), 1);
  const [needleRotation, setNeedleRotation] = useState(-45);

  useEffect(() => {
    let angle;
    if (velocidadNormalizada === 1) {
      angle = 45; // Si la velocidad es 1, coloca la aguja completamente a la derecha
    } else {
      angle = velocidadNormalizada * 90 - 45;
    }
    setNeedleRotation(angle);
  }, [velocidadNormalizada]);

  return (
    <div className="velocimetro-container">
      <div className="velocimetro">
        <div className="velocimetro-semi-circle">
          {/* Círculo negro en la posición de inicio */}
          <div className="velocimetro-start"></div>

          {/* Líneas indicadoras */}
          <div className="velocimetro-line" style={{ left: "25%" }}></div>
          <div className="velocimetro-line" style={{ left: "75%" }}></div>

          {/* Indicadores de límites */}
          <div className="velocimetro-limit" style={{ left: "0%" }}></div>
          <div className="velocimetro-limit" style={{ left: "50%" }}></div>
          <div className="velocimetro-limit" style={{ left: "100%" }}></div>

          <div
            className="velocimetro-needle"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          ></div>
        </div>
        {/* Fondo gris transparente para resaltar el texto */}
        <div className="velocimetro-label-background">
          <div className="velocimetro-label">{velocidad} SPI</div>
        </div>
      </div>
    </div>
  );
};

export default VelocimetroSPI;