import React, { ReactNode } from "react";

interface QuadroCentralProps {
  children: ReactNode;
}

function QuadroCentral(qcp: QuadroCentralProps) {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "45vh" }}
    >
      <div
        className="col-md-8 p-4 bg-ligrht rounded shadow"
        style={{
          maxWidth: "500px",
          minWidth: "300px",
          margin: "auto",
        }}
      >
        {qcp.children}
      </div>
    </div>
  );
}

export default QuadroCentral;
