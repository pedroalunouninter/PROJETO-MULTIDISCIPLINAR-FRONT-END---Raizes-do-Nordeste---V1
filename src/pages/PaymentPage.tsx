import { useState } from "react";
import { Link } from "react-router-dom";
import { PAYMENT_PARTNER } from "../data/mock";
import { cartTotals } from "../lib/cart";
import { money, uid } from "../lib/format";
import type { Order, OrderStatus } from "../types";
import { useApp } from "../context/AppContext";

export function PaymentPage() {
  const { user, selectedUnit, cart, promoCode, clearCart, setPromoCode, addOrder, addPoints } = useApp();
  const { lines, total } = cartTotals(selectedUnit, cart, promoCode);
  const [step, setStep] = useState<"review" | "gateway" | "result">("review");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);

  if (!user || !lines.length) {
    return (
      <section className="panel">
        <h2>Pagamento</h2>
        <p>
          Carrinho inválido ou sessão expirada. Volte ao <Link to="/carrinho">carrinho</Link>.
        </p>
      </section>
    );
  }

  const session = user;

  function finalize() {
    const id = uid();
    const tx = "TX-" + Date.now().toString(36).toUpperCase();
    const promo = promoCode.trim().toUpperCase();
    const pts = Math.floor(total) + (promo === "RAIZES2X" ? 10 : 0);
    addPoints(session.id, pts);

    const order: Order = {
      id,
      userId: session.id,
      unitId: selectedUnit,
      items: lines.map((l) => ({
        itemId: l.id,
        qty: l.qty,
        name: l.name,
        unitPrice: l.price,
      })),
      subtotal: lines.reduce((a, l) => a + l.line, 0),
      discount: promo === "SUCO10" ? Math.round(lines.reduce((a, l) => a + l.line, 0) * 0.1 * 100) / 100 : 0,
      total,
      status: "recebido" as OrderStatus,
      createdAt: new Date().toISOString(),
      transactionId: tx,
      promoCode: promo || null,
      pointsEarned: pts,
    };
    addOrder(order);
    clearCart();
    setPromoCode("");
    setOrderId(id);
    setTxId(tx);
  }

  function startGateway() {
    setStep("gateway");
    window.setTimeout(() => {
      finalize();
      setStep("result");
    }, 1800);
  }

  return (
    <section className="panel payment-flow">
      <h2>Pagamento — integração externa (simulação)</h2>
      <p className="muted">{PAYMENT_PARTNER.disclaimer}</p>
      <div id="paySteps">
        {step === "review" ? (
          <div className="pay-step" id="stepReview">
            <h3>Resumo</h3>
            <ul>
              {lines.map((l) => (
                <li key={l.id}>
                  {l.name} × {l.qty} — {money(l.line)}
                </li>
              ))}
            </ul>
            <p>
              Total: <strong>{money(total)}</strong>
            </p>
            <button type="button" className="btn btn-primary" onClick={startGateway}>
              Enviar para {PAYMENT_PARTNER.name}
            </button>
          </div>
        ) : null}
        {step === "gateway" ? (
          <div className="pay-step" id="stepGateway">
            <div className="gateway-box">
              <p className="gateway-brand">{PAYMENT_PARTNER.name}</p>
              <div className="spinner" aria-hidden="true" />
              <p>Processando com serviço externo…</p>
            </div>
          </div>
        ) : null}
        {step === "result" && orderId && txId ? (
          <div className="pay-step" id="stepResult">
            <p className="success">
              Pedido{" "}
              <Link to={`/pedido/${encodeURIComponent(orderId)}`}>{orderId}</Link> registrado. Pagamento aprovado
              (simulado).
            </p>
            <p id="txLine">ID de transação (mock): {txId}</p>
            <Link className="btn btn-primary" to="/pedidos">
              Ver pedidos
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
