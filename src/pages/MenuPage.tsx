import { Link } from "react-router-dom";
import { MENU, MENU_CATEGORY_ORDER, UNITS } from "../data/mock";
import { money } from "../lib/format";
import { useApp } from "../context/AppContext";

function sortCategories(cats: string[]): string[] {
  const order = [...MENU_CATEGORY_ORDER];
  return [...cats].sort((a, b) => {
    const ia = order.indexOf(a as (typeof MENU_CATEGORY_ORDER)[number]);
    const ib = order.indexOf(b as (typeof MENU_CATEGORY_ORDER)[number]);
    if (ia === -1 && ib === -1) return a.localeCompare(b, "pt-BR");
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export function MenuPage() {
  const { selectedUnit, addCartItem } = useApp();

  if (!selectedUnit) {
    return (
      <section className="panel">
        <h2>Cardápio</h2>
        <p>
          Selecione uma <Link to="/unidades">unidade</Link> primeiro.
        </p>
      </section>
    );
  }

  const unit = UNITS.find((u) => u.id === selectedUnit);
  const items = MENU.filter((m) => m.unitId === selectedUnit);
  const byCat: Record<string, typeof items> = {};
  for (const it of items) {
    if (!byCat[it.category]) byCat[it.category] = [];
    byCat[it.category].push(it);
  }

  const categories = sortCategories(Object.keys(byCat));

  return (
    <section className="panel">
      <h2>Cardápio — {unit?.name}</h2>
      <p className="muted">
        Pratos típicos do Nordeste nesta unidade. <Link to="/unidades">Trocar unidade</Link>
      </p>
      {categories.map((cat) => (
        <div key={cat} className="menu-block">
          <h3>{cat}</h3>
          <ul className="menu-list">
            {byCat[cat].map((it) => (
              <li key={it.id} className="menu-item">
                <div>
                  <strong>{it.name}</strong>
                  <p className="muted small">{it.desc}</p>
                </div>
                <div className="menu-meta">
                  <span>{money(it.price)}</span>
                  <button type="button" className="btn btn-small btn-primary" onClick={() => addCartItem(it.id, 1)}>
                    Adicionar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
