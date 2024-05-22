import React from "react";

interface CampoValorProps {
  value: number;
}

const CampoValor: React.FC<CampoValorProps> = ({ value }) => {
  return (
    <div className="text-center my-3">
      <div
        className="bg-light border rounded p-3"
        style={{ display: "inline-block", color: "green", fontSize: "30" }}
      >
        R$
        {(value / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
};

export default CampoValor;
