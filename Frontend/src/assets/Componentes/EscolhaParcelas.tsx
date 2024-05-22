import React, { FC, useState } from "react";

interface EscolhaParcelasProps {
  setParcelas: (numParcelas: number) => void;
  numParcelas: number;
  valor: number;
}

function EscolhaParcelas({
  valor,
  setParcelas,
  numParcelas,
}: EscolhaParcelasProps) {
  const handleClick = (numParcelas: number) => {
    setParcelas(numParcelas);
  };

  return (
    <>
      <div className="grid text-center">
        <button
          key={1}
          className={`btn btn-outline-primary me-2 ${
            numParcelas === 1 ? "active" : ""
          }`}
          onClick={() => handleClick(1)}
          style={{
            borderTopColor: "CadetBlue",
            borderColor: "green",
            color: "black",
          }}
        >
          1 x de{" "}
          <p>
            {" "}
            <div style={{ fontSize: "25", color: "CadetBlue" }}>
              R$
              {(valor / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </p>
        </button>
        <button
          key={2}
          className={`btn btn-outline-primary me-2 ${
            numParcelas === 2 ? "active" : ""
          }`}
          onClick={() => handleClick(2)}
          style={{
            borderTopColor: "CadetBlue",
            borderColor: "green",
            color: "black",
          }}
        >
          2 x de{" "}
          <p>
            <div style={{ fontSize: "25", color: "CadetBlue" }}>
              R$
              {(valor / 200).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </p>
        </button>
      </div>
      <div className="grid text-center">
        <button
          key={3}
          className={`btn btn-outline-primary me-2 ${
            numParcelas === 3 ? "active" : ""
          }`}
          onClick={() => handleClick(3)}
          style={{
            borderTopColor: "CadetBlue",
            borderColor: "green",
            color: "black",
          }}
        >
          3 x de{" "}
          <p>
            <div style={{ fontSize: "25", color: "CadetBlue" }}>
              R$
              {(valor / 300).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </p>
        </button>
        <button
          key={4}
          className={`btn btn-outline-primary me-2 ${
            numParcelas === 4 ? "active" : ""
          }`}
          onClick={() => handleClick(4)}
          style={{
            borderTopColor: "CadetBlue",
            borderColor: "green",
            color: "black",
          }}
        >
          4 x de{" "}
          <p>
            <div style={{ fontSize: "25", color: "CadetBlue" }}>
              R$
              {(valor / 400).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </p>
        </button>
      </div>
    </>
  );
}

export default EscolhaParcelas;
