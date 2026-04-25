/**
 * iframe do Google Maps (embed clássico por coordenadas — sem chave de API).
 * Se o embed deixar de carregar no futuro, use o HTML gerado em maps.google.com → Compartilhar → Incorporar mapa.
 */
export function googleMapsEmbedUrl(lat: number, lng: number, zoom = 17): string {
  const q = `${lat},${lng}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed&hl=pt-BR`;
}

/** Abre o mesmo ponto no Google Maps no navegador (aba nova). */
export function googleMapsOpenUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;
}
