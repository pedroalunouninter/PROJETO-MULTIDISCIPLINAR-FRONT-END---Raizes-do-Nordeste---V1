import { useNavigate } from "react-router-dom";
import { UNITS } from "../data/mock";
import { useApp } from "../context/AppContext";

export function UnitsPage() {
  const { setSelectedUnit, setCart } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <section className="page-intro">
        <h1 className="page-title">Onde estamos</h1>
        <p className="page-subtitle">
          Escolha uma unidade — o cardápio e os preços são carregados automaticamente para aquela loja.
        </p>
      </section>
      <section className="panel panel-bleed">
        <div className="grid-units">
          {UNITS.map((u) => (
            <article key={u.id} className="unit-card">
              <div className="unit-card-top">
                <span className="unit-pill">{u.city}</span>
                <h3>{u.name}</h3>
              </div>
              <p className="unit-address">{u.address}</p>
              <p className="muted unit-hours">
                <span className="unit-hours-label">Funcionamento</span> {u.hours}
              </p>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  setSelectedUnit(u.id);
                  setCart([]);
                  navigate("/cardapio");
                }}
              >
                Pedir nesta unidade
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
