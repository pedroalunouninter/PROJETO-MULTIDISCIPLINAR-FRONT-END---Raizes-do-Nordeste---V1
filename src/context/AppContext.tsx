import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { addPointsToUser, spendPoints } from "../lib/auth";
import type { CartLine, Order, TableReservation, User } from "../types";

const K = {
  user: "rdn_user",
  cart: "rdn_cart",
  orders: "rdn_orders",
  reservations: "rdn_reservations",
  unit: "rdn_unit",
  lgpdBanner: "rdn_lgpd_banner",
} as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, val: unknown) {
  localStorage.setItem(key, JSON.stringify(val));
}

type AppContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
  cart: CartLine[];
  setCart: (c: CartLine[]) => void;
  addCartItem: (itemId: string, qty: number) => void;
  updateCartQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  selectedUnit: string | null;
  setSelectedUnit: (id: string | null) => void;
  lgpdDismissed: boolean;
  setLgpdDismissed: (v: boolean) => void;
  promoCode: string;
  setPromoCode: (v: string) => void;
  cartCount: number;
  addPoints: (userId: string, pts: number) => void;
  trySpendPoints: (userId: string, pts: number) => boolean;
  reservations: TableReservation[];
  addReservation: (r: TableReservation) => void;
  updateReservation: (id: string, patch: Partial<TableReservation>) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => readJson<User | null>(K.user, null));
  const [cart, setCartState] = useState<CartLine[]>(() => readJson<CartLine[]>(K.cart, []));
  const [orders, setOrdersState] = useState<Order[]>(() => readJson<Order[]>(K.orders, []));
  const [reservations, setReservationsState] = useState<TableReservation[]>(() =>
    readJson<TableReservation[]>(K.reservations, [])
  );
  const [selectedUnit, setSelectedUnitState] = useState<string | null>(() => readJson<string | null>(K.unit, null));
  const [lgpdDismissed, setLgpdDismissedState] = useState(() => readJson<boolean>(K.lgpdBanner, false));
  const [promoCode, setPromoCodeState] = useState(() => sessionStorage.getItem("rdn_promo") || "");

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) writeJson(K.user, u);
    else localStorage.removeItem(K.user);
  }, []);

  const setCart = useCallback((c: CartLine[]) => {
    setCartState(c);
    writeJson(K.cart, c);
  }, []);

  const addCartItem = useCallback(
    (itemId: string, qty: number) => {
      setCartState((prev) => {
        const next = [...prev];
        const i = next.findIndex((x) => x.itemId === itemId);
        if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + qty };
        else next.push({ itemId, qty: Math.max(1, qty) });
        writeJson(K.cart, next);
        return next;
      });
    },
    []
  );

  const updateCartQty = useCallback((itemId: string, qty: number) => {
    setCartState((prev) => {
      let next: CartLine[];
      if (qty <= 0) next = prev.filter((x) => x.itemId !== itemId);
      else {
        next = prev.map((x) => (x.itemId === itemId ? { ...x, qty } : x));
      }
      writeJson(K.cart, next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartState([]);
    writeJson(K.cart, []);
  }, []);

  const addOrder = useCallback((o: Order) => {
    setOrdersState((prev) => {
      const next = [o, ...prev];
      writeJson(K.orders, next);
      return next;
    });
  }, []);

  const updateOrder = useCallback((id: string, patch: Partial<Order>) => {
    setOrdersState((prev) => {
      const next = prev.map((x) => (x.id === id ? { ...x, ...patch } : x));
      writeJson(K.orders, next);
      return next;
    });
  }, []);

  const addReservation = useCallback((r: TableReservation) => {
    setReservationsState((prev) => {
      const next = [r, ...prev];
      writeJson(K.reservations, next);
      return next;
    });
  }, []);

  const updateReservation = useCallback((id: string, patch: Partial<TableReservation>) => {
    setReservationsState((prev) => {
      const next = prev.map((x) => (x.id === id ? { ...x, ...patch } : x));
      writeJson(K.reservations, next);
      return next;
    });
  }, []);

  const setSelectedUnit = useCallback((id: string | null) => {
    setSelectedUnitState(id);
    if (id) writeJson(K.unit, id);
    else localStorage.removeItem(K.unit);
  }, []);

  const setLgpdDismissed = useCallback((v: boolean) => {
    setLgpdDismissedState(v);
    writeJson(K.lgpdBanner, v);
  }, []);

  const setPromoCode = useCallback((v: string) => {
    setPromoCodeState(v);
    sessionStorage.setItem("rdn_promo", v);
  }, []);

  const cartCount = useMemo(() => cart.reduce((a, b) => a + b.qty, 0), [cart]);

  const addPoints = useCallback(
    (userId: string, pts: number) => {
      addPointsToUser(userId, pts, (u) => setUser(u), () => user);
    },
    [user, setUser]
  );

  const trySpendPoints = useCallback(
    (userId: string, pts: number) => {
      return spendPoints(userId, pts, (u) => setUser(u), () => user);
    },
    [user, setUser]
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      cart,
      setCart,
      addCartItem,
      updateCartQty,
      clearCart,
      orders,
      addOrder,
      updateOrder,
      selectedUnit,
      setSelectedUnit,
      lgpdDismissed,
      setLgpdDismissed,
      promoCode,
      setPromoCode,
      cartCount,
      addPoints,
      trySpendPoints,
      reservations,
      addReservation,
      updateReservation,
    }),
    [
      user,
      setUser,
      cart,
      setCart,
      addCartItem,
      updateCartQty,
      clearCart,
      orders,
      addOrder,
      updateOrder,
      reservations,
      addReservation,
      updateReservation,
      selectedUnit,
      setSelectedUnit,
      lgpdDismissed,
      setLgpdDismissed,
      promoCode,
      setPromoCode,
      cartCount,
      addPoints,
      trySpendPoints,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
