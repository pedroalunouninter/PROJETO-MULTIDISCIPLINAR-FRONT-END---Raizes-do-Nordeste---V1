import { Link } from "react-router-dom";
import { money } from "../lib/format";
import { useApp } from "../context/AppContext";

const statusLabel: Record<string, string> = {
  recebido: "Recebido",
  em_preparo: "Em preparo",
  pronto: "Pronto para retirada",
  entregue: "Entregue / retirado",
};

export function OrdersPage() {
  const { user, orders } = useApp();

  if (!user) {
    return (
      <section className="panel">
        <h2>Pedidos</h2>
        <p>
          <Link to="/auth">Entre</Link> para ver seus pedidos.
        </p>
      </section>
    );
  }

  const mine = orders.filter((o) => o.userId === user.id);

  if (!mine.length) {
    return (
      <section className="panel">
        <h2>Pedidos</h2>
        <p>
          Nenhum pedido ainda. Monte um no <Link to="/cardapio">cardápio</Link>.
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Meus pedidos</h2>
      <ul className="order-list">
        {mine.map((o) => (
          <li key={o.id} className="order-row">
            <div>
              <strong>{o.id}</strong>
              <p className="small muted">
                {new Date(o.createdAt).toLocaleString("pt-BR")} · {statusLabel[o.status] ?? o.status}
              </p>
              <p>
                {money(o.total)} · +{o.pointsEarned || 0} pts
              </p>
            </div>
            <Link className="btn btn-small btn-ghost" to={`/pedido/${encodeURIComponent(o.id)}`}>
              Acompanhar
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
