import React, { ReactNode } from "react";

interface AlertaProps {
  children: ReactNode;
}

function Alerta(props: AlertaProps) {
  return (
    <div className="alert alert-danger" role="alert" style={{ color: "black" }}>
      {props.children}
    </div>
  );
}

export default Alerta;
