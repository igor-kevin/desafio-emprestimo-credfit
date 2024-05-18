import "../css/Cabecalho.css";
import logo from "C:/Users/Igor/Documents/desafio-emprestimo-credfit/Frontend/src/assets/Imagens/Credfitlogo.svg";
import usuarioImage from "C:/Users/Igor/Documents/desafio-emprestimo-credfit/Frontend/src/assets/Imagens/userImage.svg";

const Cabecalho = () => {
  return (
    <header>
      <div className="cabecalho-barra">
        <div className="cabecalho-esquerda">
          <img
            src={logo}
            alt="Logo Credfit"
            style={{ width: "100px", height: "auto" }}
          />
        </div>
        <div className="cabecalho-direita">
          <img
            src={usuarioImage}
            alt="Usuario"
            style={{ width: "auto", height: "27px" }}
          />
          Nome do Usuario
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
