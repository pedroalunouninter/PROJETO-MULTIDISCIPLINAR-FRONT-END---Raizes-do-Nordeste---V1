import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="panel">
      <h2>Página não encontrada</h2>
      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  );
}
