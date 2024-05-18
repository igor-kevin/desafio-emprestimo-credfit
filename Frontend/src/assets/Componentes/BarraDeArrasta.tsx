import React, { ChangeEvent } from "react";

interface BarraDeArrastaProps {
  valor: number;
  onArrasta: (novoValor: number) => void;
}

const BarraDeArrasta: React.FC<BarraDeArrastaProps> = ({
  valor,
  onArrasta,
}) => {
  const handleArrasta = (event: ChangeEvent<HTMLInputElement>) => {
    onArrasta(parseInt(event.target.value));
  };

  return (
    <div className="barradearrasta-container d-flex justify-content-center">
      <input
        type="range"
        min="0"
        max="800000.00"
        value={valor}
        onChange={handleArrasta}
      />
      <div>R${(valor / 100).toFixed(2)}</div>
    </div>
  );
};

export default BarraDeArrasta;
