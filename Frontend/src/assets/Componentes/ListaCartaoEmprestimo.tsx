import CartaoEmprestimo from "./CartaoEmprestimo";

// Função para renderizar a lista de empréstimos
function ListaCartaoEmprestimo({ emprestimos }) {
  return (
    <div>
      {emprestimos.data.map((emprestimo) => (
        <CartaoEmprestimo
          representante={emprestimo.representante}
          parcelas={emprestimo.parcelas}
          status={emprestimo.emprestimoStatus === 2} // Verifica se o empréstimo está aprovado
        />
      ))}
    </div>
  );
}

export default ListaCartaoEmprestimo;
