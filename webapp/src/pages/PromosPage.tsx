import { PROMOS } from "../data/mock";

export function PromosPage() {
  return (
    <section className="panel">
      <h2>Promoções e campanhas</h2>
      <p className="muted">
        Ofertas inspiradas na culinária nordestina — válidas nas unidades participantes (demonstração).
      </p>
      <div className="grid-cards">
        {PROMOS.map((p) => (
          <article key={p.id} className="card promo-card">
            <h3>{p.title}</h3>
            <p>{p.detail}</p>
            <p className="small muted">
              Válido até {p.validUntil} · Código: <strong>{p.code}</strong>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
