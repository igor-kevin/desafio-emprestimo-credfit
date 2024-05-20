import Alerta from "./assets/Componentes/Alerta";
import BarraDeArrasta from "./assets/Componentes/BarraDeArrasta";
import Cabecalho from "./assets/Componentes/Cabecalho";
import QuadroCentral from "./assets/Componentes/QuadroCentral";
import Diretorios from "./assets/Componentes/Diretorios";
import CampoValor from "./assets/Componentes/CampoValor";
import { useState, useEffect } from "react";
import Botoes from "./assets/Componentes/Botoes";
import { api } from "./services/api";
import EscolhaParcelas from "./assets/Componentes/EscolhaParcelas";
import ResumoSimulacao from "./assets/Componentes/ResumoSimulacao";

const App: React.FC = () => {
  //declaração dos estados
  const [representante, setRepresentante] = useState(1);
  const [funcionarioNome, setFuncionarioNome] = useState(1);
  const [valor, setValor] = useState<number>(0);
  const [parcelas, setParcelas] = useState(1);

  async function carregaFuncionarioNome() {
    try {
      const nome = await api.get("funcionarios/4");
      setFuncionarioNome(nome.data.funcionario_nome);

      console.log("empresa do func");
      console.log("empresa do func" + nome.data.empresa);

      console.log(nome.data.empresa.representante_nome_social);
      setRepresentante(nome.data.empresa.representante_nome_social);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  async function geraEmprestimo(idFuncionario: number) {
    try {
      const resposta = await api.post("/emprestimo", {
        valor: valor / 100,
        parcelas: parcelas,
        emprestimoStatus: true,
        funcionario_id: idFuncionario,
      });
    } catch (error) {}
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

  const handleFinal = () => {
    console.log("Agora é só fazer tudo.");
  };

  return (
    <>
      <Cabecalho usuario={funcionarioNome} />
      <div className="container" style={{ backgroundSize: "100va" }}>
        <Diretorios />
        <QuadroCentral>
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
