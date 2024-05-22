import React from "react";
import CampoValor from "./CampoValor";
import BarraDeArrasta from "./BarraDeArrasta";
import Alerta from "./Alerta";

interface CheckRepresentanteProps {
  representante: string | void;
  valor: number;
  handleArrasta: () => void;
}

function CheckRepresentante({
  representante,
  valor,
  handleArrasta,
}: CheckRepresentanteProps) {
  return (
    <>
      {representante ? (
        <div>
          <h5>
            <span className="" style={{ color: "CadetBlue" }}>
              <b>Simular Empréstimo</b>
            </span>
          </h5>
          <Alerta>
            Você possui saldo para Crédito Consignado pela empresa{" "}
            {representante}. Faça uma simulação!
            <p>Escolha quanto você precisa:</p>
          </Alerta>
          <CampoValor value={valor} />
          <BarraDeArrasta valor={valor} onArrasta={handleArrasta} />
        </div>
      ) : (
        <Alerta>
          Poxa que pena! Você não trabalha em uma empresa cadastrada nosso
          serviço de emprestimo consignado.
        </Alerta>
      )}
    </>
  );
}

export default CheckRepresentante;
