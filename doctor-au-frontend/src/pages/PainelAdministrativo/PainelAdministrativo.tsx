import { useEffect, useState } from "react";
import "./PainelAdministrativo.css";

const PainelAdministrativo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend ainda não implementado
    setLoading(false);
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Carregando painel...</p>;
  }

  return (
    <div className="admin-container">
      <h1>Painel Administrativo</h1>

      <div className="empty-state">
        <div className="empty-icon">⚙️</div>

        <h2>Backend em desenvolvimento</h2>

        <p>
          As métricas administrativas estarão disponíveis após a integração
          com o backend na <strong>Entrega 3</strong>.
        </p>

        <span className="hint">
          Este painel já está preparado para consumir a API protegida por JWT.
        </span>
      </div>
    </div>
  );
};

export default PainelAdministrativo;
