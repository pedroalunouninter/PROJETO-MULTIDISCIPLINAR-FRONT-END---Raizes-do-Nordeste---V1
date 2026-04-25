import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function normalizeBase(raw: string): string {
  const t = raw.trim();
  if (!t || t === "/") return "/";
  return t.replace(/\/?$/, "/").replace(/^(?!\/)/, "/");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, "");
  const raw = (env.VITE_BASE ?? process.env.VITE_BASE ?? "").trim();
  return {
    base: normalizeBase(raw),
    plugins: [react()],
  };
});
