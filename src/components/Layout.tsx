import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SITE_AUTHOR } from "../data/siteMeta";
import { LogoIcon } from "./Logo";

function topNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "top-nav-link is-active" : "top-nav-link";
}

function mobileNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "mobile-nav-link is-active" : "mobile-nav-link";
}

export function Layout() {
  const { user, cartCount, lgpdDismissed, setLgpdDismissed } = useApp();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setDesktop(mq.matches);
      if (mq.matches) setMenuOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("mobile-menu-open");
    else document.body.classList.remove("mobile-menu-open");
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((o) => !o);

  const closeMenu = () => {
    if (!desktop) setMenuOpen(false);
  };

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Início",
      "/auth": "Entrar",
      "/unidades": "Unidades",
      "/cardapio": "Cardápio",
      "/carrinho": "Carrinho",
      "/pagamento": "Pagamento",
      "/pedidos": "Pedidos",
      "/fidelidade": "Fidelidade",
      "/promocoes": "Promoções",
      "/reservas": "Reservas",
      "/privacidade": "Privacidade",
    };
    let title = titles[location.pathname];
    if (location.pathname.startsWith("/pedido/")) title = "Acompanhar pedido";
    document.title = "Raízes do Nordeste — " + (title || "App");
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={`app-layout${isHome ? " app-layout--home" : ""}`}>
      <div className="layout-main">
        <header className="site-header site-header--topnav">
          <div className="header-inner header-toolbar">
            <button
              type="button"
              className="nav-toggle"
              id="navToggle"
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              aria-label="Abrir ou fechar menu"
              onClick={toggleMenu}
            >
              <span className="nav-toggle-burger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <Link to="/" className="brand" onClick={closeMenu}>
              <span className="brand-mark" aria-hidden="true">
                <LogoIcon />
              </span>
              <span className="brand-text">
                <span className="brand-name">Raízes do Nordeste</span>
                <span className="brand-tagline">Sabores do sertão e do litoral</span>
              </span>
            </Link>
            <nav className="top-nav" aria-label="Seções do site">
              <NavLink to="/unidades" className={topNavLinkClass}>
                Unidades
              </NavLink>
              <NavLink to="/cardapio" className={topNavLinkClass}>
                Cardápio
              </NavLink>
              <NavLink to="/reservas" className={topNavLinkClass}>
                Reservas
              </NavLink>
              <NavLink to="/promocoes" className={topNavLinkClass}>
                Promoções
              </NavLink>
              <NavLink to="/fidelidade" className={topNavLinkClass}>
                Fidelidade
              </NavLink>
              <NavLink to="/pedidos" className={topNavLinkClass}>
                Pedidos
              </NavLink>
            </nav>
            <div className="header-end">
              {user ? (
                <span className="header-user-hi">
                  <span className="hi-label">Olá,</span> {user.name.split(" ")[0]}
                </span>
              ) : (
                <NavLink to="/auth" className="header-auth-link" onClick={closeMenu}>
                  Entrar
                </NavLink>
              )}
              <Link to="/carrinho" className="header-cart-mini" aria-label="Ver carrinho" onClick={closeMenu}>
                <span className="header-cart-label">Carrinho</span>
                <span className="badge">{cartCount}</span>
              </Link>
            </div>
          </div>
        </header>

        <button
          type="button"
          className={"mobile-menu-backdrop" + (menuOpen ? " is-active" : "")}
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={"mobile-nav" + (menuOpen ? " is-open" : "")}
          id="mobileNav"
          aria-hidden={desktop ? "true" : menuOpen ? "false" : "true"}
        >
          <div className="mobile-nav-inner">
            <nav className="mobile-nav-links" aria-label="Seções do site" onClick={closeMenu}>
              <NavLink to="/unidades" className={mobileNavLinkClass}>
                Unidades
              </NavLink>
              <NavLink to="/cardapio" className={mobileNavLinkClass}>
                Cardápio
              </NavLink>
              <NavLink to="/reservas" className={mobileNavLinkClass}>
                Reservas
              </NavLink>
              <NavLink to="/promocoes" className={mobileNavLinkClass}>
                Promoções
              </NavLink>
              <NavLink to="/fidelidade" className={mobileNavLinkClass}>
                Fidelidade
              </NavLink>
              <NavLink to="/pedidos" className={mobileNavLinkClass}>
                Pedidos
              </NavLink>
            </nav>
            <div className="mobile-nav-account">
              <p className="mobile-nav-label">Conta</p>
              {user ? (
                <p className="mobile-nav-hi">
                  <span className="hi-label">Conectado:</span> {user.name}
                </p>
              ) : (
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    "mobile-nav-link mobile-nav-link--cta" + (isActive ? " is-active" : "")
                  }
                  onClick={closeMenu}
                >
                  Entrar ou cadastrar
                </NavLink>
              )}
            </div>
          </div>
        </div>

        <main className={"main-content" + (isHome ? " main-content--home" : "")}>
          {isHome ? (
            <div className="page-stack">
              <Outlet />
            </div>
          ) : (
            <div className="page-stack page-stack--inner">
              <div className="page-body">
                <Outlet />
              </div>
            </div>
          )}
        </main>

        <footer className="site-footer site-footer--full">
          <div className="foot-inner">
            <div className="foot-brand">
              <span className="foot-logo">Raízes do Nordeste</span>
              <p className="foot-desc">
                Cozinha regional nordestina — receitas de terreiro, salão e feira. Demonstração acadêmica com dados
                fictícios.
              </p>
            </div>
            <div className="foot-col">
              <h3 className="foot-heading">Explorar</h3>
              <ul className="foot-links">
                <li>
                  <Link to="/unidades">Unidades</Link>
                </li>
                <li>
                  <Link to="/cardapio">Cardápio</Link>
                </li>
                <li>
                  <Link to="/reservas">Reservar mesa</Link>
                </li>
                <li>
                  <Link to="/promocoes">Promoções</Link>
                </li>
                <li>
                  <Link to="/fidelidade">Fidelidade</Link>
                </li>
              </ul>
            </div>
            <div className="foot-col">
              <h3 className="foot-heading">Conta</h3>
              <ul className="foot-links">
                <li>
                  <Link to="/auth">Entrar ou cadastrar</Link>
                </li>
                <li>
                  <Link to="/pedidos">Meus pedidos</Link>
                </li>
              </ul>
            </div>
            <div className="foot-col">
              <h3 className="foot-heading">Legal</h3>
              <ul className="foot-links">
                <li>
                  <Link to="/privacidade">Privacidade e LGPD</Link>
                </li>
              </ul>
              <p className="foot-note">
                Atendimento (exemplo): <a href="tel:+5581999999999">(81) 99999-9999</a>
              </p>
            </div>
          </div>
          <div className="foot-bottom">
            <p>© {new Date().getFullYear()} Rede Raízes do Nordeste · Projeto demonstrativo front-end.</p>
            <p className="foot-author">
              {SITE_AUTHOR.name} · RU {SITE_AUTHOR.ru}
            </p>
          </div>
        </footer>
      </div>

      {!lgpdDismissed && (
        <div className="lgpd-banner" role="dialog" aria-label="Privacidade">
          <p>
            Usamos dados para pedidos, fidelidade e melhoria da experiência. Ao continuar, você confirma que leu nossa{" "}
            <Link to="/privacidade">política</Link>.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setLgpdDismissed(true)}>
            Entendi
          </button>
        </div>
      )}
    </div>
  );
}
