import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartTotals } from "../lib/cart";
import { money } from "../lib/format";
import { useApp } from "../context/AppContext";

export function CartPage() {
  const { selectedUnit, cart, updateCartQty, promoCode, setPromoCode, user } = useApp();
  const navigate = useNavigate();
  const [localPromo, setLocalPromo] = useState(promoCode);

  const { lines, subtotal, discount, total } = cartTotals(selectedUnit, cart, promoCode);

  function applyPromo() {
    setPromoCode(localPromo);
  }

  if (!selectedUnit) {
    return (
      <section className="panel">
        <h2>Carrinho</h2>
        <p>
          Escolha uma <Link to="/unidades">unidade</Link>.
        </p>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <section className="panel">
        <h2>Carrinho</h2>
        <p>
          Vazio. Veja o <Link to="/cardapio">cardápio</Link>.
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Carrinho</h2>
      <ul className="cart-list">
        {lines.map((l) => (
          <li key={l.id} className="cart-row">
            <div>
              <strong>{l.name}</strong>
              <p className="small muted">
                {money(l.price)} × {l.qty}
              </p>
            </div>
            <div className="cart-qty">
              <button type="button" onClick={() => updateCartQty(l.id, l.qty - 1)}>
                −
              </button>
              <span>{l.qty}</span>
              <button type="button" onClick={() => updateCartQty(l.id, l.qty + 1)}>
                +
              </button>
            </div>
            <div>{money(l.line)}</div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <label>
          Código promocional (mock)
          <input
            type="text"
            value={localPromo}
            onChange={(e) => setLocalPromo(e.target.value)}
            placeholder="Ex.: SUCO10 ou RAIZES2X"
            maxLength={20}
          />
        </label>
        <button type="button" className="btn btn-ghost" onClick={applyPromo}>
          Aplicar
        </button>
      </div>
      <p>Subtotal: {money(subtotal)}</p>
      {discount > 0 ? <p>Desconto: −{money(discount)}</p> : null}
      <p className="total-line">
        Total: <strong>{money(total)}</strong>
      </p>
      {user ? (
        <button type="button" className="btn btn-primary" onClick={() => navigate("/pagamento")}>
          Ir para pagamento (parceiro externo)
        </button>
      ) : (
        <p>
          Para concluir, <Link to="/auth">entre ou cadastre-se</Link> (consentimento LGPD no cadastro).
        </p>
      )}
    </section>
  );
}
