import type { User } from "../types";

const USERS_KEY = "rdn_users";

type StoredUser = User & { password: string };

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(arr: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}

export function registerUser(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): { ok: true; user: User } | { ok: false; msg: string } {
  const users = readUsers();
  if (users.some((u) => u.email === payload.email)) return { ok: false, msg: "E-mail já cadastrado." };
  const user: StoredUser = {
    id: "u-" + Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    points: 50,
  };
  users.push(user);
  saveUsers(users);
  const safe: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    points: user.points,
  };
  return { ok: true, user: safe };
}

export function loginUser(email: string, password: string): { ok: true; user: User } | { ok: false; msg: string } {
  const users = readUsers();
  const u = users.find((x) => x.email === email && x.password === password);
  if (!u) return { ok: false, msg: "Credenciais inválidas." };
  const safe: User = {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    points: u.points,
  };
  return { ok: true, user: safe };
}

export function addPointsToUser(userId: string, pts: number, onSessionUpdate: (u: User) => void, getSession: () => User | null) {
  const users = readUsers();
  const u = users.find((x) => x.id === userId);
  if (u) {
    u.points = (u.points || 0) + pts;
    saveUsers(users);
    const session = getSession();
    if (session?.id === userId) onSessionUpdate({ ...session, points: u.points });
  }
}

export function spendPoints(userId: string, pts: number, onSessionUpdate: (u: User) => void, getSession: () => User | null): boolean {
  const users = readUsers();
  const u = users.find((x) => x.id === userId);
  if (!u || (u.points || 0) < pts) return false;
  u.points -= pts;
  saveUsers(users);
  const session = getSession();
  if (session?.id === userId) onSessionUpdate({ ...session, points: u.points });
  return true;
}
