import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantFloorPlan } from "../components/RestaurantFloorPlan";
import { useApp } from "../context/AppContext";
import { photoCreditLine, reservationVenuePhotos } from "../data/sitePhotos";
import { RESERVATION_TIME_SLOTS, UNITS } from "../data/mock";
import { googleMapsEmbedUrl, googleMapsOpenUrl } from "../lib/maps";
import type { TableReservation, Unit } from "../types";

const statusLabel: Record<string, string> = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

function todayISODate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function maxDateISODate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function newReservationId(): string {
  const part =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 10)
      : String(Date.now());
  return `RES-${part.toUpperCase()}`;
}

function UnitLocationMap({ unit }: { unit: Unit }) {
  const src = googleMapsEmbedUrl(unit.lat, unit.lng);
  const mapsLink = googleMapsOpenUrl(unit.lat, unit.lng);
  return (
    <article className="reservation-map-card">
      <h4 className="reservation-map-title">{unit.name}</h4>
      <p className="small muted reservation-map-address">{unit.address}</p>
      <div className="reservation-map-frame">
        <iframe
          title={`Mapa: ${unit.name}`}
          className="reservation-map-iframe"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="reservation-map-link">
        <a href={mapsLink} target="_blank" rel="noopener noreferrer">
          Abrir no Google Maps
        </a>
      </p>
    </article>
  );
}

export function ReservationsPage() {
  const { user, selectedUnit, reservations, addReservation, updateReservation } = useApp();
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const unitDefault =
    selectedUnit && UNITS.some((u) => u.id === selectedUnit) ? selectedUnit : "";

  const mine = useMemo(
    () => (user ? reservations.filter((r) => r.userId === user.id) : []),
    [user, reservations]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const unitId = String(fd.get("unitId") || "");
    const date = String(fd.get("date") || "");
    const time = String(fd.get("time") || "");
    const guests = Math.min(12, Math.max(1, Number(fd.get("guests")) || 1));
    const contactName = String(fd.get("contactName") || "").trim();
    const contactPhone = String(fd.get("contactPhone") || "").trim();
    const notes = String(fd.get("notes") || "").trim();

    if (!unitId || !date || !time || !contactName || !contactPhone) {
      alert("Preencha unidade, data, horário, nome e telefone.");
      return;
    }

    const r: TableReservation = {
      id: newReservationId(),
      userId: user?.id ?? null,
      unitId,
      contactName,
      contactPhone,
      date,
      time,
      guests,
      notes,
      status: "pendente",
      createdAt: new Date().toISOString(),
    };
    addReservation(r);
    setLastCreatedId(r.id);
    e.currentTarget.reset();
    if (user) {
      const nameEl = e.currentTarget.querySelector<HTMLInputElement>('input[name="contactName"]');
      const phoneEl = e.currentTarget.querySelector<HTMLInputElement>('input[name="contactPhone"]');
      if (nameEl) nameEl.value = user.name;
      if (phoneEl && user.phone) phoneEl.value = user.phone;
    }
  }

  function onCancel(id: string) {
    if (!confirm("Cancelar esta reserva?")) return;
    updateReservation(id, { status: "cancelada" });
  }

  return (
    <div className="reservations-page">
      <section className="panel">
        <h2>Reservar mesa</h2>
        <p className="page-intro">
          Conheça o ambiente, veja o mapa do salão e onde ficamos. Depois, escolha unidade, data e horário. A
          confirmação é simulada nesta demonstração — em produção a loja entraria em contato.
        </p>
      </section>

      <section className="panel">
        <h3 className="reservation-subhead">O ambiente</h3>
        <p className="page-intro reservation-intro-tight">
          Fotos no clima de restaurante regional — mesa, bebidas e pratos que lembram o cardápio nordestino do site.
        </p>
        <ul className="reservation-gallery">
          {reservationVenuePhotos.map((ph) => (
            <li key={ph.caption} className="reservation-gallery-item">
              <figure className="reservation-gallery-figure">
                <img src={ph.src} alt="" loading="lazy" decoding="async" width={900} height={600} />
                <figcaption>{ph.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="small muted reservation-photo-credit">{photoCreditLine}</p>
      </section>

      <section className="panel">
        <h3 className="reservation-subhead">Mapa do salão</h3>
        <p className="page-intro reservation-intro-tight">
          Planta arquitetônica de referência para visualizar salão, cozinha, circulação e área externa — inspiração de
          layout (não corresponde às medidas reais das lojas fictícias deste site).
        </p>
        <RestaurantFloorPlan />
      </section>

      <section className="panel">
        <h3 className="reservation-subhead">Como chegar</h3>
        <p className="page-intro reservation-intro-tight">
          Localização aproximada de cada unidade no Google Maps. O ponto indica a região do endereço fictício da
          demonstração.
        </p>
        <div className="reservation-maps-grid">
          {UNITS.map((u) => (
            <UnitLocationMap key={u.id} unit={u} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h3 className="reservation-subhead">Preencher reserva</h3>

        {lastCreatedId && (
          <p className="reservation-flash" role="status">
            Reserva <strong>{lastCreatedId}</strong> registrada.
            {!user && (
              <>
                {" "}
                Guarde o código — para ver suas reservas aqui, <Link to="/auth">entre na sua conta</Link>.
              </>
            )}
            {user && " Ela aparece na lista abaixo."}
          </p>
        )}

        <form className="form form--auth" onSubmit={onSubmit}>
          <label className="form-field">
            <span className="form-label">Unidade</span>
            <select className="form-input" name="unitId" required defaultValue={unitDefault}>
              <option value="" disabled>
                Selecione…
              </option>
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} · {u.city}
                </option>
              ))}
            </select>
          </label>
          <div className="form-row-2">
            <label className="form-field">
              <span className="form-label">Data</span>
              <input
                className="form-input"
                name="date"
                type="date"
                required
                min={todayISODate()}
                max={maxDateISODate()}
                defaultValue={todayISODate()}
              />
            </label>
            <label className="form-field">
              <span className="form-label">Horário</span>
              <select className="form-input" name="time" required defaultValue="">
                <option value="" disabled>
                  Selecione…
                </option>
                {RESERVATION_TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="form-field">
            <span className="form-label">Número de pessoas</span>
            <input
              className="form-input"
              name="guests"
              type="number"
              min={1}
              max={12}
              defaultValue={2}
              required
            />
          </label>
          <label className="form-field">
            <span className="form-label">Nome para a reserva</span>
            <input
              className="form-input"
              name="contactName"
              type="text"
              required
              autoComplete="name"
              placeholder="Como no cartão da mesa"
              defaultValue={user?.name ?? ""}
            />
          </label>
          <label className="form-field">
            <span className="form-label">Telefone (WhatsApp)</span>
            <input
              className="form-input"
              name="contactPhone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(81) 99999-9999"
              defaultValue={user?.phone ?? ""}
            />
          </label>
          <label className="form-field">
            <span className="form-label">Observações (opcional)</span>
            <textarea
              className="form-input form-input--textarea"
              name="notes"
              rows={3}
              placeholder="Aniversário, cadeirante, preferência de mesa…"
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-block">
              Enviar reserva
            </button>
          </div>
        </form>
      </section>

      {user && (
        <section className="panel">
          <h2>Minhas reservas</h2>
          {!mine.length ? (
            <p className="muted">Nenhuma reserva ainda.</p>
          ) : (
            <ul className="order-list">
              {mine.map((r) => {
                const unit = UNITS.find((u) => u.id === r.unitId);
                const when = new Date(r.date + "T12:00:00");
                return (
                  <li key={r.id} className="order-row reservation-row">
                    <div>
                      <strong>{r.id}</strong>
                      <p className="small muted">
                        {when.toLocaleDateString("pt-BR", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · {r.time} · {r.guests} {r.guests === 1 ? "pessoa" : "pessoas"}
                      </p>
                      <p className="small">{unit?.name ?? r.unitId}</p>
                      <p>
                        <span className={"reservation-badge reservation-badge--" + r.status}>
                          {statusLabel[r.status] ?? r.status}
                        </span>
                      </p>
                    </div>
                    <div className="reservation-row-actions">
                      {r.status === "pendente" && (
                        <button type="button" className="btn btn-small btn-ghost" onClick={() => onCancel(r.id)}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {!user && (
        <section className="panel panel--muted">
          <h2>Ver reservas no site</h2>
          <p>
            <Link to="/auth">Entre ou cadastre-se</Link> para listar e cancelar reservas feitas com a sua conta. Quem
            reserva sem login recebe só o código na tela (guarde o número).
          </p>
        </section>
      )}
    </div>
  );
}
