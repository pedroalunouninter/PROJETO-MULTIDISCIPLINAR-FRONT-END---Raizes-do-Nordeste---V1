/**
 * Imagens do Unsplash (https://unsplash.com/license — uso gratuito).
 * Escolhidas para combinar com o tema: culinária brasileira / Nordeste, mesa farta, litoral e salão acolhedor.
 * Parâmetros w/q otimizam peso; troque por fotos próprias em public/img/ se preferir.
 */
export const sitePhotos = {
  /** Destaque hero — mesa com vários pratos (busca “comida brasileira”) */
  hero: "https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?auto=format&w=1200&q=82&fit=crop",
  /** Painel “Lojas” — litoral nordestino (praia e cidade) */
  panelStores: "https://images.unsplash.com/photo-1515898034510-821b204966e4?auto=format&w=900&q=82&fit=crop",
  /** Painel “Pedido online” — prato servido (refeição típica) */
  panelDelivery: "https://images.unsplash.com/photo-1626379907504-327b925f4b79?auto=format&w=900&q=82&fit=crop",
  /** Bloco “Sobre” — comida caseira em tigela */
  about: "https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5?auto=format&w=900&q=82&fit=crop",
} as const;

/** Galeria da página de reservas — ambiente de restaurante e comida regional. */
export const reservationVenuePhotos = [
  {
    src: "https://images.unsplash.com/photo-1559756495-4e4739a920ac?auto=format&w=900&q=82&fit=crop",
    caption: "Salão com mesas de madeira",
  },
  {
    src: "https://images.unsplash.com/photo-1653681472495-0a62d97e37fb?auto=format&w=900&q=82&fit=crop",
    caption: "Refeição à mesa",
  },
  {
    src: "https://images.unsplash.com/photo-1584493162897-6dae872d8a3c?auto=format&w=900&q=82&fit=crop",
    caption: "Bebidas e acompanhamentos",
  },
  {
    src: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&w=900&q=82&fit=crop",
    caption: "Saladas e temperos frescos",
  },
] as const;

/**
 * Planta de referência para a página de reservas (layout tipo restaurante).
 * Fonte: ArchDaily — projeto Pigmento Experimenta; uso ilustrativo no protótipo.
 */
export const reservationFloorPlanImage =
  "https://images.adsttc.com/media/images/5ba3/e7f7/f197/cc1b/4800/0296/medium_jpg/03_-_Pigmento_Experimenta_-_PLANTA.jpg?1537468400" as const;

export const photoCreditLine =
  "Imagens temáticas (Nordeste e culinária brasileira) via Unsplash — uso gratuito para fins acadêmicos / demonstração.";
