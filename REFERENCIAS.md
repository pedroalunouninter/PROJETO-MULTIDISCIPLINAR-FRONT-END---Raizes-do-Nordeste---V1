# Referências do projeto — Raízes do Nordeste

**Autor:** Pedro Afonso Barreto Fonseca de Oliveira · **RU:** 1992822  

Lista **todas as fontes externas, serviços, bibliotecas e links** utilizados ou citados no repositório (exceto dependências transitivas individuais — vide `webapp/package-lock.json` para a árvore completa).

---

## 1. Bibliotecas e ferramentas (npm / build)

Registradas em `webapp/package.json` e instaladas via **npm** a partir de `https://registry.npmjs.org/`.

| Pacote | Uso no projeto | Documentação oficial |
|--------|----------------|----------------------|
| **react** | Interface (componentes) | https://react.dev |
| **react-dom** | Renderização no DOM | https://react.dev/reference/react-dom |
| **react-router-dom** | Rotas SPA (`BrowserRouter`, etc.) | https://reactrouter.com |
| **typescript** | Linguagem tipada / compilação `tsc` | https://www.typescriptlang.org |
| **vite** | Dev server e build | https://vite.dev |
| **@vitejs/plugin-react** | Integração React no Vite | https://github.com/vitejs/vite-plugin-react |
| **@types/react** | Tipos TypeScript para React | https://www.npmjs.com/package/@types/react |
| **@types/react-dom** | Tipos TypeScript para react-dom | https://www.npmjs.com/package/@types/react-dom |

**Observação:** pacotes **indiretos** (Postcss, Nanoid, Rolldown, etc.) vêm do lockfile; licenças estão em `webapp/node_modules/<pacote>/LICENSE*`.

**Runtime:** **Node.js** (para `npm`, `vite`, `tsc`) — https://nodejs.org  

---

## 2. Tipografia (Google Fonts)

Carregamento em `webapp/index.html` (e espelhado no build em `dist/`).

| Recurso | URL |
|---------|-----|
| Preconnect | `https://fonts.googleapis.com` |
| Preconnect (fontes estáticas) | `https://fonts.gstatic.com` |
| Folha de estilo (Anton + DM Sans) | `https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,500&display=swap` |

**Licença / termos:** https://fonts.google.com/ (fontes **Anton** e **DM Sans** — uso web conforme política do Google Fonts).

---

## 3. Imagens — Unsplash

Todas hospedadas em `images.unsplash.com`. **Licença:** https://unsplash.com/license (uso gratuito, inclusive acadêmico/demonstração, com condições do site).

| Uso no código | URL completa |
|---------------|--------------|
| Hero (`sitePhotos.hero`) | `https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?auto=format&w=1200&q=82&fit=crop` |
| Painel Lojas (`panelStores`) | `https://images.unsplash.com/photo-1515898034510-821b204966e4?auto=format&w=900&q=82&fit=crop` |
| Painel Pedido online (`panelDelivery`) | `https://images.unsplash.com/photo-1626379907504-327b925f4b79?auto=format&w=900&q=82&fit=crop` |
| Sobre (`about`) | `https://images.unsplash.com/photo-1628521061262-19b5cdb7eee5?auto=format&w=900&q=82&fit=crop` |
| Reservas — galeria 1 | `https://images.unsplash.com/photo-1559756495-4e4739a920ac?auto=format&w=900&q=82&fit=crop` |
| Reservas — galeria 2 | `https://images.unsplash.com/photo-1653681472495-0a62d97e37fb?auto=format&w=900&q=82&fit=crop` |
| Reservas — galeria 3 | `https://images.unsplash.com/photo-1584493162897-6dae872d8a3c?auto=format&w=900&q=82&fit=crop` |
| Reservas — galeria 4 | `https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&w=900&q=82&fit=crop` |

**Arquivo-fonte:** `webapp/src/data/sitePhotos.ts`.

---

## 4. Imagem — ArchDaily (planta arquitetônica)

| Uso | URL |
|-----|-----|
| Planta de referência na página `/reservas` (`reservationFloorPlanImage`) | `https://images.adsttc.com/media/images/5ba3/e7f7/f197/cc1b/4800/0296/medium_jpg/03_-_Pigmento_Experimenta_-_PLANTA.jpg?1537468400` |

**Contexto:** projeto **Pigmento Experimenta**, divulgação via **ArchDaily** (`images.adsttc.com`). Uso **ilustrativo** no protótipo; direitos da imagem permanecem com autores/editora — ver termos em https://www.archdaily.com (e política de uso de mídia da plataforma).

---

## 5. Mapas — Google Maps

Geradas em `webapp/src/lib/maps.ts` (embed e link “Abrir no Google Maps”).

| Tipo | Padrão de URL |
|------|----------------|
| iframe (embed) | `https://www.google.com/maps?q=<lat>,<lng>&z=17&output=embed&hl=pt-BR` |
| Link nova aba | `https://www.google.com/maps/search/?api=1&query=<lat>,<lng>` |

**Termos / política:** https://www.google.com/intl/pt-BR_BR/help/terms_maps.html  

---

## 6. Site externo citado na interface

| Onde | URL |
|------|-----|
| `HomePage.tsx` — parágrafo “Restaurante Casaboa” (referência de estilo) | `https://www.restaurantecasaboa.com.br` |

---

## 7. Recursos locais (sem URL remota)

| Recurso | Caminho |
|---------|---------|
| Logo / favicon PNG (se existir) | `webapp/public/img/logo.png` |
| Ícone SVG reserva | `webapp/public/logo-icon.svg` |
| Telefone de exemplo (rodapé) | `tel:+5581999999999` — número **fictício** para demonstração |

---

## 8. Documentação e diagramas (ferramentas citadas no repositório)

| Ferramenta / serviço | Finalidade |
|----------------------|------------|
| **Mermaid** (sintaxe nos `.md`) | Diagramas no `DOCUMENTO-PROJETO-Raizes-do-Nordeste.md` |
| **Mermaid Live Editor** | https://mermaid.live — exportar diagramas para imagem |
| **PlantUML** | https://plantuml.com — arquivos em `plantuml/*.puml` |
| Servidor online PlantUML (ex.) | https://www.plantuml.com/plantuml/uml |

---

## 9. Documento acadêmico e checklist

| Conteúdo | Arquivo |
|----------|---------|
| Documentação do projeto (requisitos, testes, IA, etc.) | `DOCUMENTO-PROJETO-Raizes-do-Nordeste.md` |
| Instruções de execução e deploy | `README.md` |

**Menção a IA:** seção **2.3** do documento do projeto (apoio de ferramentas de IA — Cursor ou equivalente).

---

## 10. Ambiente de desenvolvimento e publicação (referências genéricas)

| Tema | Referência |
|------|------------|
| Dev local Vite | `http://localhost:5173` (padrão) — citado no `README.md` |
| Hospedagem sugerida | Netlify / Vercel / GitHub Pages — citados no `README.md` |
| Repositório Git | placeholder no documento — preencher com URL real do GitHub/GitLab ao publicar |

---

## 11. Normas e tecnologias Web (implícitas no stack)

- **HTML living standard** — https://html.spec.whatwg.org  
- **ECMAScript / JavaScript** — especificação seguida pelo TypeScript alvo  
- **CSS** — recursos usados em `global.css`  

---

*Última atualização: gerada a partir da estrutura atual do repositório. Se adicionar novas URLs ou pacotes, atualize este arquivo e a seção correspondente no trabalho escrito.*
