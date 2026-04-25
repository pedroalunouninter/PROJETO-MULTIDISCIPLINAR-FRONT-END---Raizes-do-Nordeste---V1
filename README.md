<div align="center">

# Raízes do Nordeste

**Culinária nordestina — front-end (demonstração, Opção B · UNINTER)**

*Pedido online, fidelidade e reservas. Dados simulados; pronto para portfólio e entrega académica.*

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev)
[![Node](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=fff)](https://nodejs.org/)

**Autor:** Pedro Afonso Barreto Fonseca de Oliveira &nbsp;·&nbsp; **RU:** 1992822

</div>

---

## Sobre o projeto

Aplicação **React + TypeScript + Vite** com **dados mockados** (`webapp/src/data/mock.ts`) e **localStorage** para pedidos, carrinho, sessão, reservas e consentimento **LGPD**. Há ainda o fluxo visual de **pagamento externo** (sem transação real). Navegação com **React Router**; estilos **CSS** e layout **mobile-first**.

> O código a desenvolver e a correr está na pasta **`webapp/`** — é essa a raiz de trabalho com `npm` e o Vite.

---

## Início rápido

| Requisito | Nota |
|-----------|------|
| [Node.js](https://nodejs.org/) | LTS recomendado; npm vem incluído |

```bash
cd webapp
npm install
npm run dev
```

Abre o endereço que o terminal indicar (em geral **http://localhost:5173**).

**Windows (PowerShell):** se o `npm` falhar por política de execução, usa `npm.cmd` em vez de `npm`, abre a pasta `webapp` e corre **`EXECUTAR.bat`**, ou vê a secção [Windows (detalhe)](#windows-detalhe) abaixo.

---

## Scripts principais

| Comando | O que faz |
|--------|------------|
| `npm run dev` | Servidor de desenvolvimento (hot reload) |
| `npm run build` | Build de produção em `webapp/dist/` |
| `npm run preview` | Pré-visualizar o `dist` localmente |
| `npm run build:github` | Build + cópia para **`docs/`** (GitHub Pages) |

### Logo e ícone (foto em todo o sítio)

A mesma imagem **`webapp/public/img/logo.png`** alimenta o **cabeçalho**, o **rodapé**, o **favicon** (ícone da aba) e o *apple-touch-icon*.

| Ficheiro | Uso |
|----------|-----|
| **`img/logo.png`** | Incluído por defeito (gerado a partir de `logo-icon.svg` em 256px). **Substitui** este ficheiro pela tua foto (mantém o nome `logo.png`) e volta a fazer o build. |
| **`logo-icon.svg`** | Modelo vectorial; podes recriar o PNG com `npm run generate:logo` (na pasta `webapp`). Para sobrescrever um `logo.png` já existente, no PowerShell: `$env:FORCE='1'; npm run generate:logo` |
| **`favicon.svg`** | SVG extra no repositório; o `index` usa o PNG, não depende dele. |

O `index.html` aponta explicitamente para `img/logo.png` em todas as ligações de ícone, para a aba e o atalho no telemóvel coincidirem com a logo do site.

---

## Publicação

### GitHub Pages (recomendado para este repositório)

A URL pública segue: `https://<utilizador>.github.io/<nome-exato-do-repositório>/`

O ficheiro **`webapp/.env.production`** define o `VITE_BASE` (mesmo caminho do repositório). Se estiver errado, a página fica em branco — o JavaScript não encontra os ficheiros.

**Fluxo com pasta `docs` e branch `main`:**

1. Em **`webapp`:** `npm run build:github`
2. Faz **commit** e **push** da pasta **`docs/`** (pode ser pelo GitHub Desktop)
3. **Settings → Pages:** branch `main`, pasta **`/docs`** (não uses a raiz `/(root)` com o `index` de desenvolvimento nem só a pasta de código `webapp`)

A cada alteração no site, repete o build, commit da `docs/` e push.

**Se no GitHub ainda vires ficheiros antigos, erros 404 a imagens, ou a cabeçar a “partida”:**

- Confirma no GitHub que o **último commit** inclui **tudo** o que está em `docs/`, em especial `docs/assets/*.js`, `docs/assets/*.css` e **`docs/assets/logo-….png`**. O build mete a logo num PNG com hash nessa pasta; se só submeteres o `index.html` e não os PNG, o site fica desactualizado.
- No GitHub Desktop, verifica se os ficheiros em **`docs/assets/`** entram no commit (não fiques só com a pasta vazia por engano).
- Se usares o ramo **gh-pages** (workflow) e **não** `main` + `docs/`, o push a `main` sozinho não muda a página: ou activas a action e esperas a correr, ou usas o fluxo `docs/`.
- Depois do push, espera 1–3 minutos e faz **atualizar em força** (Ctrl+F5) ou abre a página em janela anónima (cache de CDN e do browser).

### Netlify / Vercel

- **Base directory:** `webapp`  
- **Build:** `npm run build`  
- **Publicar:** `dist`  
- **SPA:** reencaminhar todas as rotas para `index.html`

Em geral o site fica na raiz do domínio; o `VITE_BASE` em `/` costuma ser suficiente.

### GitHub Actions (opcional)

O workflow `.github/workflows/gh-pages.yml` publica no ramo **`gh-pages`**. Nesse caso, em **Settings → Pages**, escolhe a fonte **gh-pages** (raiz), em alternativa a `main` + `/docs`. Não atives duas formas em simultâneo sem perceber qual prevalece.

---

## Mapa de funcionalidades (roteiro)

| Área | Onde |
|------|------|
| Cadastro e autenticação | `/auth` — `localStorage` (simulação; senha sem segurança real) |
| Unidades e cardápio | `/unidades` → `/cardapio` — `src/data/mock.ts` |
| Pedido completo | Carrinho → checkout → `/pagamento` |
| Pedidos e acompanhamento | `/pedidos`, `/pedido/:id` — linha do tempo + "Simular avanço" |
| Fidelidade | `/fidelidade` |
| Promoções | `/promocoes` — no carrinho: `SUCO10` (10%) ou `NORD10` (+10 pts) |
| Pagamento externo | `/pagamento` (parceiro fictício + transação mock) |
| Reservas | `/reservas` — galeria, mapas, formulário, `localStorage` |
| LGPD | Banner, `/privacidade`, checkboxes no cadastro |
| Responsivo | `src/styles/global.css` |

---

## Estrutura (resumo)

```
Projeto/
├── docs/                    # Site estático para GitHub Pages (gerada por build:github)
├── webapp/
│   ├── .env.production     # VITE_BASE em produção
│   ├── public/
│   ├── scripts/            # gh-pages-404, publish-docs
│   ├── src/
│   │   ├── data/mock.ts
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/global.css
│   ├── index.html
│   ├── EXECUTAR.bat
│   └── vite.config.ts
└── README.md
```

---

## Windows (detalhe)

1. Duplo clique em **`webapp/EXECUTAR.bat`** — instala na primeira vez e abre o servidor.  
2. No PowerShell: `npm.cmd install` e `npm.cmd run dev` dentro de `webapp`.  
3. No **cmd.exe** podes usar `npm` normalmente.  
4. Para permitir `npm` no PowerShell: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

---

## Checklist de entrega

- [ ] Link do repositório público  
- [ ] URL do site a abrir em janela anónima  
- [ ] Testar: cadastro → unidade → cardápio → carrinho → pagamento → pedidos (e, se quiser, reservas)  
- [ ] Regras da disciplina: declarar uso de assistentes (ferramenta, objetivo, prompts, excertos), se aplicável  

---

## Aviso

- **Segurança:** palavras-passe no `localStorage` em claro **apenas** para a demonstração académica.  
- **Dados locais:** limpar dados do site no browser remove pedidos, reservas e sessão.  

---

<div align="center">

**Feito com dedicação · Raízes do Nordeste**

</div>
