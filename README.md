# Raízes do Nordeste — demonstração front-end

**Autor:** Pedro Afonso Barreto Fonseca de Oliveira · **RU:** 1992822

Aplicação **React + TypeScript + Vite** com **dados mockados** (`webapp/src/data/mock.ts`), persistência simulada no **localStorage** (pedidos, carrinho, sessão, consentimento LGPD) e fluxo visual de **pagamento externo** (sem cobrança real).

## O que este projeto cobre (alinhado ao roteiro)

| Requisito | Onde está |
|-----------|-----------|
| Cadastro e autenticação | `/auth` — usuários em `localStorage` (demonstração; senha não é segura) |
| Cardápio por unidade | `/unidades` → `/cardapio` — itens filtrados por unidade em `src/data/mock.ts` |
| Pedido completo | Carrinho → checkout → `/pagamento` |
| Status do pedido | `/pedidos`, `/pedido/:id` — linha do tempo + botão “Simular avanço” |
| Fidelidade | `/fidelidade` — pontos e resgate mock |
| Promoções | `/promocoes` — códigos; no carrinho use `SUCO10` (10%) ou `NORD10` (+10 pts no fechamento) |
| Pagamento externo | `/pagamento` — tela do parceiro fictício + retorno com ID de transação mock |
| Reserva de mesa | `/reservas` — galeria (Unsplash), planta ilustrativa do salão, mapas Google Maps por unidade (embed); formulário; `localStorage` (`rdn_reservations`); lista/cancelamento com conta |
| LGPD | Banner inferior, página `/privacidade`, checkboxes obrigatórias no cadastro |
| Mobile-first / responsivo | `src/styles/global.css` — breakpoints e layout fluido |

## Como rodar localmente

Tudo fica na pasta **`webapp/`**.

### Windows (recomendado se o terminal der erro)

No PowerShell, o comando `npm` costuma falhar com *“execução de scripts foi desabilitada”* (ele tenta rodar `npm.ps1`).

1. Entre na pasta **`webapp`** e dê **dois cliques em `EXECUTAR.bat`**.  
   Ele instala dependências na primeira vez e abre o servidor (geralmente **http://localhost:5173**).

2. Se preferir digitar no **PowerShell**, use sempre **`npm.cmd`** (com `.cmd`):
   ```powershell
   cd webapp
   npm.cmd install
   npm.cmd run dev
   ```

3. Ou abra o **Prompt de Comando (cmd.exe)** e use `npm install` e `npm run dev` normalmente.

4. Para liberar o `npm` no PowerShell de vez:  
   `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` (confirme com `S`).

### Linux / macOS

```bash
cd webapp
npm install
npm run dev
```

Abra o endereço indicado no terminal (em geral `http://localhost:5173`).

- **Build de produção:** `npm run build` (gera `webapp/dist/`).
- **Logo e ícone (aba do navegador):** coloque sua foto em **`webapp/public/img/logo.png`** (nome exato). O mesmo arquivo é usado no menu, no topo e como favicon. Se o PNG não existir, o app usa o SVG `public/logo-icon.svg` como reserva.

## Publicação (entrega técnica)

- **Netlify / Vercel:** importe o repositório com **base directory** `webapp`, **build command** `npm run build` e **publish directory** `dist`. Ative **redirects para SPA** (todas as rotas → `index.html`), pois o app usa rotas do tipo `/cardapio`.
- **GitHub Pages:** exige `base` no Vite apontando para o nome do repositório ou usar uma solução de SPA (404 → index); Netlify/Vercel costuma ser mais simples para React Router.

### Checklist antes de entregar o PDF

- [ ] Link do **repositório** público (GitHub/GitLab etc.).
- [ ] Link da **URL publicada** abrindo em aba anônima.
- [ ] Testar: cadastro → unidade → cardápio → carrinho → pagamento → pedido → status (e, se quiser, **reserva de mesa** em `/reservas`).
- [ ] Declarar no documento se usou assistentes (conforme regras da disciplina): ferramenta, objetivo, prompts, trechos.

## Estrutura principal

```
webapp/
  package.json
  vite.config.ts
  index.html
  EXECUTAR.bat            — dois cliques: instala (1ª vez) e sobe o servidor
  dev.bat / install.bat   — só dev ou só install (cmd)
  public/img/logo.png     — logo + favicon (obrigatório para sua arte em PNG)
  src/
    App.tsx
    main.tsx
    data/mock.ts          — cardápio, unidades, promoções, gateway mock
    context/AppContext.tsx  — carrinho, sessão, pedidos, LGPD
    pages/                — telas
    styles/global.css
```

## Observações

- **Segurança:** senhas ficam em texto no `localStorage` apenas para simulação acadêmica — não reutilize em produção.
- **Dados:** limpar dados do site nas configurações do navegador remove usuários e pedidos locais.
