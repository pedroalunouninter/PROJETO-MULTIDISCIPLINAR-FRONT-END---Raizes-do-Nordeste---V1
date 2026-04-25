/**
 * GitHub Pages devolve 404 em rotas diretas (ex.: /repo/cardapio) sem ficheiro físico.
 * Duplicar index.html → 404.html é o padrão para SPAs nesse alojamento.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const index = path.join(dist, "index.html");
const four = path.join(dist, "404.html");
if (fs.existsSync(index)) {
  fs.copyFileSync(index, four);
  console.log("Wrote 404.html (copy of index.html) for GitHub Pages SPA.");
}
