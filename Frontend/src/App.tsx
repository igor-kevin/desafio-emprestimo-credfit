import Alerta from "./assets/Componentes/Alerta";
import BarraDeArrasta from "./assets/Componentes/BarraDeArrasta";
import Cabecalho from "./assets/Componentes/Cabecalho";
import QuadroCentral from "./assets/Componentes/QuadroCentral";
import FaceImage from "./assets/Imagens/Fitta.png";
import Diretorios from "./assets/Componentes/Diretorios";
import CampoValor from "./assets/Componentes/CampoValor";
import { useState, useEffect } from "react";
import Botoes from "./assets/Componentes/Botoes";
import Teste from "./assets/Componentes/Teste";
import { api } from "./services/api";

const App: React.FC = () => {
  const [valor, setValor] = useState<number>(0);

  useEffect(() => {
    loadC();
  }, []);

  async function handleGetRep() {
    const representantes = await api.get("/representantes");
    console.log(representantes.data);
  }

  async function loadC() {
    const response = await api.get("/representantes");
    console.log(response.data);
  }

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

  return (
    <>
      <Cabecalho />
      <Diretorios />
      <QuadroCentral>
        <h5>
          <span className="" style={{ color: "CadetBlue" }}>
            <b>Simular Empréstimo</b>
          </span>
        </h5>
        <Alerta>
          <div className="container-fluid">
            <div className="row">
              <div className="container d-inline col-lg-2">
                <img src={FaceImage} alt="desenho-da-mulher" />
              </div>
              <div className="container d-inline col-lg-8">
                Você possui saldo para Crédito Consignado pela empresa
                *empresaplacehold*. Faça uma simulação!
                <p>Digite quanto você precisa:</p>
              </div>
            </div>
          </div>
        </Alerta>
        <CampoValor value={valor} />
        <BarraDeArrasta valor={valor} onArrasta={handleArrasta} />
      </QuadroCentral>
      <Botoes onVoltar={handleGetRep} onSimular={handleSimular} />
      <Teste />
    </>
  );
};

export default App;
