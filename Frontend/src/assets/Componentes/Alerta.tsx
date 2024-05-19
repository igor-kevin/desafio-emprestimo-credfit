import React, { ReactNode } from "react";
import FaceImage from "../Imagens/Fitta.png";

interface AlertaProps {
  children: ReactNode;
}

function Alerta(props: AlertaProps) {
  return (
    <div className="alert alert-danger" role="alert" style={{ color: "black" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="container d-inline col-lg-2">
            <img src={FaceImage} alt="desenho-da-mulher" />
          </div>
          <div className="container d-inline col-lg-8">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Alerta;
