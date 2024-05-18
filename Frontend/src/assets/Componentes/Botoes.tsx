interface BotoesProps {
  onVoltar: () => void;
  onSimular: () => void;
}

const Botoes: React.FC<BotoesProps> = ({ onVoltar, onSimular }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <button
        className="btn btn-outline-primary me-2"
        onClick={onVoltar}
        style={{
          borderTopColor: "CadetBlue",
          borderColor: "CadetBlue",
          color: "CadetBlue",
        }}
      >
        Voltar
      </button>
      <button
        className="btn btn-primary"
        onClick={onSimular}
        style={{ backgroundColor: "CadetBlue", borderColor: "CadetBlue" }}
      >
        Simular Empréstimo
      </button>
    </div>
  );
};

export default Botoes;
