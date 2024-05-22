import CartaoEmprestimo from "./CartaoEmprestimo";

function ListaCartaoEmprestimo({ emprestimos }) {
  return (
    <div>
      {emprestimos.data.map((emprestimo) => (
        <CartaoEmprestimo
          representante={emprestimo.representante}
          parcelas={emprestimo.parcelas}
          status={emprestimo.emprestimoStatus === 2}
        />
      ))}
    </div>
  );
}

export default ListaCartaoEmprestimo;
