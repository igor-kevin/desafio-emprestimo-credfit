import React from "react";
import Alerta from "./Alerta";

interface ResumosSimulacaoProps {
  valor: number;
  parcelas: number;
}

function ResumoSimulacao({ valor, parcelas }: ResumosSimulacaoProps) {
  return (
    <div>
      <h5>
        <span className="" style={{ color: "CadetBlue" }}>
          <b>Resumo da Simulação</b>
        </span>
      </h5>
      <Alerta>
        Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua
        Conta Creditfit! Veja o resumo da simulação!
      </Alerta>
      <div className="mt-4 p-4 border rounded bg-white">
        <div className="d-flex justify-content-between">
          <div>
            <p>
              <b>Valor a Creditar</b>
              <br />
              R$
              {(valor / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              <b>Valor a financiar</b>
              <br />
              R$
              {(valor / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              <b>Parcelamento</b>
              <br />
              {parcelas} x R$
              {(valor / (parcelas * 100)).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumoSimulacao;
