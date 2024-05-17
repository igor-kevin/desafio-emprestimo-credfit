import React, { useState, ChangeEvent } from "react";

function BarraDeArrasta() {
  const [valor, onUpdate] = useState(0);

  const handleArrasta = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdate(parseInt(event.target.value));
  };

  return (
    <div className="barradearrasta-container">
      <input
        type="range"
        min="0"
        max="8000.00"
        value={valor}
        onChange={handleArrasta}
      />
      <div>R${valor}</div>
    </div>
  );
}

export default BarraDeArrasta;
