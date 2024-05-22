import Alerta from "./assets/Componentes/Alerta";
import Cabecalho from "./assets/Componentes/Cabecalho";
import QuadroCentral from "./assets/Componentes/QuadroCentral";
import Diretorios from "./assets/Componentes/Diretorios";
import CampoValor from "./assets/Componentes/CampoValor";
import { useState, useEffect } from "react";
import Botoes from "./assets/Componentes/Botoes";
import { api } from "./services/api";
import EscolhaParcelas from "./assets/Componentes/EscolhaParcelas";
import ResumoSimulacao from "./assets/Componentes/ResumoSimulacao";
import CartaoEmprestimo from "./assets/Componentes/CartaoEmprestimo";
import CheckRepresentante from "./assets/Componentes/CheckRepresentante";

const App: React.FC = () => {
  //declaração dos estados
  const [representante, setRepresentante] = useState();
  const [funcionarioNome, setFuncionarioNome] = useState<string>();
  const [funcionarioId, setFuncionarioID] = useState<number | undefined>();
  const [valor, setValor] = useState<number>(0);
  const [parcelas, setParcelas] = useState(1);
  const [listaEmprestimo, setListaEmprestimo] = useState([]);
  const [listaCarregada, setListaCarregada] = useState(false);

  async function carregaFuncionarioNome() {
    try {
      const nome = await api.get("funcionarios/7");
      setFuncionarioNome(nome.data.funcionario_nome);
      setFuncionarioID(nome.data.funcionario_id);
      setRepresentante(nome.data.empresa.representante_nome_social);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  async function geraEmprestimo(funcionarioId: number) {
    console.log(funcionarioId);
    try {
      const resposta = await api.post("/emprestimos", {
        valor: valor,
        parcelas: parcelas,
        funcionario_id: funcionarioId,
      });
      console.log(resposta);
      return resposta;
    } catch (error) {
      console.log("error");
      return error;
    }
  }
  useEffect(() => {
    carregaFuncionarioNome();
  }, []);

  const handleArrasta = (novoValor: number) => {
    setValor(novoValor);
    console.log(novoValor);
  };

  const handleVoltar = () => {
    console.log("Voltar clicked");
  };

  const handleSimular = () => {
    console.log("Simular Empréstimo clicked");
  };

  const handleEscolhaParcela = () => {
    console.log("Número de parcelas selecionadas:", parcelas);
  };

  const handleFinal = async () => {
    if (funcionarioId === undefined) {
      return;
    }
    try {
      const emprestimoFinal = await geraEmprestimo(funcionarioId);
      console.log("Empréstimo criado com sucesso:", emprestimoFinal);
      const emprestimosLista = await api.get(
        `emprestimos/funcionario/${funcionarioId}`
      );
      setListaEmprestimo(emprestimosLista.data);
      setListaCarregada(true);
    } catch (error) {
      console.error("Erro ao criar empréstimo:", error);
    }
  };

  return (
    <>
      <Cabecalho usuario={funcionarioNome} />
      <div className="container" style={{ backgroundSize: "100va" }}>
        <Diretorios />
        <QuadroCentral>
          <CheckRepresentante
            representante={representante}
            valor={valor}
            handleArrasta={handleArrasta}
          />
        </QuadroCentral>
        <Botoes
          onVoltar={handleVoltar}
          onSimular={handleSimular}
          nome="Simular Empréstimo"
        />
      </div>
      {/* <Teste /> */}
      <Cabecalho usuario={funcionarioNome} />
      <Diretorios />
      <QuadroCentral>
        <h5>
          <span className="" style={{ color: "CadetBlue" }}>
            <b>Simular Empréstimo</b>
          </span>
        </h5>
        <Alerta>
          Escolha a opção de parcelamento que melhor funcionar para você:
        </Alerta>
        <CampoValor value={valor} />
        Divididos em:
        <EscolhaParcelas
          valor={valor}
          numParcelas={parcelas}
          setParcelas={setParcelas}
        />
      </QuadroCentral>
      <Botoes
        onVoltar={handleVoltar}
        onSimular={handleEscolhaParcela}
        nome="Seguinte"
      ></Botoes>
      {/* teste */}
      {/* //
//
//
// */}
      <Cabecalho usuario={funcionarioNome} />
      <div className="container">
        <Diretorios />
        <QuadroCentral>
          <ResumoSimulacao valor={valor} parcelas={parcelas} />
          <div className="d-flex justify-content-center mt-4"></div>
        </QuadroCentral>
        <Botoes
          onSimular={handleFinal}
          onVoltar={handleVoltar}
          nome="Solicitar empréstimo"
        />
      </div>
      {/* //
//
//
// */}
      <Cabecalho usuario={funcionarioNome} />
      <div className="container">
        <Diretorios />
        <QuadroCentral>
          <Alerta>
            Você solicitou o empréstimo! Aguarde as etapas de análises serem
            concluidas!
          </Alerta>
          {listaCarregada ? (
            <div>
              {listaEmprestimo.map((emprestimo, index) => (
                <CartaoEmprestimo
                  key={index}
                  valor={emprestimo.valor}
                  representante={representante}
                  parcelas={emprestimo.parcelas}
                  codigoDeErro={emprestimo.emprestimoStatus}
                  proxPagamento={emprestimo.primeiroPagamento}
                ></CartaoEmprestimo>
              ))}
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </QuadroCentral>

        <Botoes
          onSimular={handleVoltar}
          onVoltar={handleVoltar}
          nome="Novo Empréstimo"
        />
      </div>
    </>
  );
};

export default App;
