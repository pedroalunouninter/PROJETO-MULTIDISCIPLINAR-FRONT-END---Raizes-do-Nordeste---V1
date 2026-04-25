import { MENU } from "../data/mock";
import type { CartLine } from "../types";

export type CartLineDetail = {
  id: string;
  name: string;
  price: number;
  qty: number;
  line: number;
};

export function cartTotals(unitId: string | null, cart: CartLine[], promoCode: string) {
  if (!unitId) {
    return { lines: [] as CartLineDetail[], subtotal: 0, discount: 0, total: 0 };
  }
  const code = promoCode.trim().toUpperCase();
  let sub = 0;
  const lines: CartLineDetail[] = [];
  for (const row of cart) {
    const item = MENU.find((m) => m.id === row.itemId && m.unitId === unitId);
    if (!item) continue;
    const line = item.price * row.qty;
    sub += line;
    lines.push({ id: item.id, name: item.name, price: item.price, qty: row.qty, line });
  }
  let discount = 0;
  if (code === "SUCO10") discount = Math.round(sub * 0.1 * 100) / 100;
  return { lines, subtotal: sub, discount, total: Math.max(0, sub - discount) };
}
