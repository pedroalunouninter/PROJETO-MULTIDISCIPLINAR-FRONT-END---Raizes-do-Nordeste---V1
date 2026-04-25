import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function LoyaltyPage() {
  const { user, trySpendPoints } = useApp();

  if (!user) {
    return (
      <section className="panel">
        <h2>Fidelidade</h2>
        <p>
          <Link to="/auth">Entre</Link> para ver seus pontos.
        </p>
      </section>
    );
  }

  const session = user;
  const pts = session.points || 0;
  const canRedeem = pts >= 100;

  function redeem() {
    if (!trySpendPoints(session.id, 100)) {
      alert("Pontos insuficientes.");
      return;
    }
    alert("Resgate simulado: R$ 5,00 de desconto creditados para o próximo pedido (mock).");
  }

  return (
    <section className="panel">
      <h2>Programa Raízes — fidelidade</h2>
      <p className="lead">
        Seus pontos: <strong>{pts}</strong> (mock — 1 ponto ≈ R$ 1 em compras, regras exemplificadas).
      </p>
      <ul className="loyalty-list">
        <li>Resgate: 100 pontos = R$ 5,00 de desconto na próxima compra (simulação).</li>
        <li>
          Campanha em dobro: código RAIZES2X soma 10 pontos extras no pedido (aplicado ao finalizar pagamento).
        </li>
      </ul>
      {canRedeem ? (
        <button type="button" className="btn btn-primary" onClick={redeem}>
          Resgatar 100 pts por R$ 5,00 (mock)
        </button>
      ) : (
        <p className="muted">Acumule 100 pontos para habilitar resgate.</p>
      )}
    </section>
  );
}
