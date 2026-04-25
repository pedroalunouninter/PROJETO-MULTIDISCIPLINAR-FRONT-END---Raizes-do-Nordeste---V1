import { Link, useParams } from "react-router-dom";
import { UNITS } from "../data/mock";
import { money } from "../lib/format";
import type { Order, OrderStatus } from "../types";
import { useApp } from "../context/AppContext";

const steps: OrderStatus[] = ["recebido", "em_preparo", "pronto", "entregue"];

const statusLabel: Record<string, string> = {
  recebido: "Recebido",
  em_preparo: "Em preparo",
  pronto: "Pronto para retirada",
  entregue: "Entregue / retirado",
};

export function OrderDetailPage() {
  const { orderId } = useParams();
  const { user, orders, updateOrder } = useApp();

  if (!user) {
    return (
      <section className="panel">
        <h2>Pedido</h2>
        <p>
          <Link to="/auth">Entre</Link> para acompanhar seu pedido.
        </p>
      </section>
    );
  }

  const found = orders.find((x) => x.id === orderId && x.userId === user.id);
  if (!found) {
    return (
      <section className="panel">
        <h2>Pedido</h2>
        <p>Não encontrado.</p>
      </section>
    );
  }

  const pedido: Order = found;

  const unit = UNITS.find((u) => u.id === pedido.unitId);
  const idx = Math.max(0, steps.indexOf(pedido.status));

  function advance() {
    const i = steps.indexOf(pedido.status);
    if (i < 0 || i >= steps.length - 1) return;
    updateOrder(pedido.id, { status: steps[i + 1] });
  }

  return (
    <section className="panel">
      <h2>Pedido {pedido.id}</h2>
      <p className="muted">Unidade: {unit?.name ?? ""}</p>
      <p>
        Total: {money(pedido.total)} · Transação (mock): {pedido.transactionId || "—"}
      </p>
      <ol className="timeline">
        {steps.map((s, i) => (
          <li key={s} className={i <= idx ? "done" : ""}>
            <span>{statusLabel[s]}</span>
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn-ghost" onClick={advance}>
        Simular avanço de status (demo)
      </button>
      <h3>Itens</h3>
      <ul>
        {pedido.items.map((it, idx) => (
          <li key={`${it.itemId}-${idx}`}>
            {it.name} × {it.qty}
          </li>
        ))}
      </ul>
    </section>
  );
}
