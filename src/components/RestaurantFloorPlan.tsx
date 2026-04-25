import { reservationFloorPlanImage } from "../data/sitePhotos";

/**
 * Planta arquitetônica de referência (imagem externa).
 * Não representa as unidades fictícias do cardápio — apenas inspiração visual para o protótipo.
 */
export function RestaurantFloorPlan() {
  return (
    <div className="floor-plan-wrap">
      <figure className="floor-plan-figure">
        <img
          className="floor-plan-img"
          src={reservationFloorPlanImage}
          alt="Planta baixa: salão com mesas, cozinha, banheiros e área externa"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <figcaption className="floor-plan-legend small muted">
          Planta de referência (projeto Pigmento Experimenta — imagem via ArchDaily). Serve para visualizar
          distribuição de mesas e setores; não é o croqui das unidades Raízes do Nordeste.
        </figcaption>
      </figure>
    </div>
  );
}
