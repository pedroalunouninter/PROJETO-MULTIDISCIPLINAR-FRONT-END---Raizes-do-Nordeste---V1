export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points: number;
};

export type CartLine = { itemId: string; qty: number };

export type OrderStatus = "recebido" | "em_preparo" | "pronto" | "entregue";

export type Order = {
  id: string;
  userId: string;
  unitId: string | null;
  items: { itemId: string; qty: number; name: string; unitPrice: number }[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  transactionId: string;
  promoCode: string | null;
  pointsEarned: number;
};

export type MenuItem = {
  id: string;
  unitId: string;
  category: string;
  name: string;
  price: number;
  desc: string;
};

export type Unit = {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  /** Centro aproximado para mapa (demonstração). */
  lat: number;
  lng: number;
};

export type ReservationStatus = "pendente" | "confirmada" | "cancelada";

export type TableReservation = {
  id: string;
  userId: string | null;
  unitId: string;
  contactName: string;
  contactPhone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: ReservationStatus;
  createdAt: string;
};
