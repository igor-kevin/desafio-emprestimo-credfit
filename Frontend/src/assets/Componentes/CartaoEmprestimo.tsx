import React from "react";

interface CartaoEmprestimoProps {
  valor: number;
  representante: string;
  parcelas: number;
  status: boolean;
  proxPagamento: Date;
  foiPago: boolean;
}
function CartaoEmprestimo({
  valor,
  representante,
  parcelas,
  proxPagamento,
  foiPago,
}: CartaoEmprestimoProps) {
  let statusMessage = "";
  let statusClass = "";
  const dataVencimento = new Date(proxPagamento);
  // A parte de baixo é apenas para exibir a data de maneira dia/mes/ano
  const dia = dataVencimento.getDate();
  const mes = dataVencimento.getMonth() + 1; // Os meses são baseados em zero, então adicionamos 1
  const ano = dataVencimento.getFullYear();

  switch (codigoDeErro) {
    case 0:
      statusMessage = "Crédito aprovado";
      statusClass = "bg-success";
      break;
    case 1:
      statusMessage = "Não está em uma empresa conveniada";
      statusClass = "bg-danger";
      break;
    case 2:
      statusMessage =
        "Reprovado por parcela ser muito alta referente ao salário";
      statusClass = "bg-danger";
      break;
    case 3:
      statusMessage = "Reprovado por score";
      statusClass = "bg-danger";
      break;
    default:
      statusMessage = "Status desconhecido";
      statusClass = "bg-secondary";
  }

  return (
    <div className="card mb-3">
      <div className={`card-header ${statusClass} text-white`}>
        {statusMessage}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <strong>Empresa</strong>
            <p>{representante}</p>
          </div>
          <div className="col">
            <strong>Próximo Vencimento</strong>
            <p>{`${dia}/${mes}/${ano}`}</p>
          </div>

          <div className="row">
            <div className="col">
              <strong>Total Financiado</strong>
              <p>
                R$
                {(valor / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="col">
              <p>
                <strong>Status:</strong>
                <p>
                  {statusMessage == "Crédito aprovado"
                    ? "Pago"
                    : "Não Pago/Pendente"}
                </p>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <strong>Número de parcelas</strong>
            <p>{parcelas}</p>
          </div>
          <div className="col">
            <strong>Valor da parcela</strong>
            <p>
              R$
              {(valor / (parcelas * 100)).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <a href="#">Mais informações</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartaoEmprestimo;
