import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { photoCreditLine, sitePhotos } from "../data/sitePhotos";

function photoStyle(url: string): CSSProperties {
  return { ["--cb-photo" as string]: `url("${url}")` } as CSSProperties;
}

export function HomePage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(".js-reveal").forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const els = document.querySelectorAll(".js-reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="landing-casaboa">
      <section className="cb-hero cb-hero--motion" aria-labelledby="cb-hero-title">
        <div className="cb-hero-inner cb-wrap">
          <div className="cb-hero-copy">
            <div className="cb-headline-block">
              <p className="cb-hero-kicker">Cozinha regional · do sertão ao mar</p>
              <h1 id="cb-hero-title" className="cb-headline cb-headline--impact">
                <span className="cb-headline-row cb-headline-row--lead">A nossa riqueza é</span>
                <span className="cb-headline-row cb-headline-row--boom">levar o sabor do Nordeste</span>
                <span className="cb-headline-row cb-headline-row--accent">para a sua mesa.</span>
              </h1>
            </div>
            <div className="cb-hero-actions">
              <Link className="btn btn-cta cb-hero-cta" to="/unidades">
                Faça seu pedido
              </Link>
              <Link className="btn btn-ghost" to="/reservas">
                Reservar mesa
              </Link>
            </div>
            <p className="cb-hero-note">
              Escolha a unidade mais próxima e monte seu pedido pelo site — retirada na loja (demonstração).
            </p>
          </div>
          <div className="cb-hero-visual">
            <figure
              className="cb-photo cb-photo--hero cb-photo--float"
              style={photoStyle(sitePhotos.hero)}
              role="presentation"
            >
              <figcaption className="visually-hidden">Ambiente de restaurante — imagem ilustrativa</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="cb-two js-reveal" aria-labelledby="cb-two-title">
        <h2 id="cb-two-title" className="visually-hidden">
          Onde pedir
        </h2>
        <div className="cb-wrap cb-split">
          <article className="cb-panel">
            <div
              className="cb-panel-img cb-photo cb-photo--square"
              style={photoStyle(sitePhotos.panelStores)}
              role="presentation"
            />
            <h3 className="cb-panel-title">Lojas Raízes</h3>
            <p className="cb-panel-text">
              Ambiente acolhedor para <strong>almoço</strong> e <strong>lanches</strong> com cardápio típico. Venha
              conhecer nossas unidades no Nordeste.
            </p>
            <p className="cb-panel-hours">
              <strong>Funcionamento</strong> (exemplo): seg. a sáb. · 10h às 22h — conforme unidade.
            </p>
            <Link className="btn btn-primary btn-block" to="/unidades">
              Ver unidades
            </Link>
            <Link className="btn btn-ghost btn-block" to="/reservas">
              Reservar mesa
            </Link>
          </article>
          <article className="cb-panel">
            <div
              className="cb-panel-img cb-photo cb-photo--square"
              style={photoStyle(sitePhotos.panelDelivery)}
              role="presentation"
            />
            <h3 className="cb-panel-title">Pedido online</h3>
            <p className="cb-panel-text">
              Receba seu pedido <strong>no conforto de casa</strong> ou retire na loja. Acompanhe o status até ficar
              pronto (fluxo demonstrativo).
            </p>
            <p className="cb-panel-hours">
              <strong>Pedidos pelo site</strong> — fluxo de demonstração.
            </p>
            <Link className="btn btn-primary btn-block" to="/cardapio">
              Nosso cardápio
            </Link>
          </article>
        </div>
      </section>

      <section className="cb-band js-reveal" aria-labelledby="cb-band-title">
        <div className="cb-wrap cb-band-inner">
          <p className="cb-band-name">Raízes do Nordeste</p>
          <h2 id="cb-band-title" className="cb-band-title">
            COMIDA CASEIRA COM SABOR DE VERDADE
          </h2>
        </div>
      </section>

      <section className="cb-offerings js-reveal" aria-labelledby="cb-offerings-title">
        <div className="cb-wrap">
          <h2 id="cb-offerings-title" className="visually-hidden">
            O que oferecemos
          </h2>
          <div className="cb-tiles">
            <article className="cb-tile">
              <h3 className="cb-tile-title">Pratos</h3>
              <p className="cb-tile-text">Baião de dois, moqueca, vatapá e outros clássicos — por unidade no cardápio.</p>
            </article>
            <article className="cb-tile">
              <h3 className="cb-tile-title">Salgados e quitutes</h3>
              <p className="cb-tile-text">Coxinha de charque, pastel, tapioca e quitutes para qualquer hora.</p>
            </article>
            <article className="cb-tile">
              <h3 className="cb-tile-title">Bebidas</h3>
              <p className="cb-tile-text">Sucos naturais, água de coco e refrigerantes regionais.</p>
            </article>
            <article className="cb-tile">
              <h3 className="cb-tile-title">Promoções</h3>
              <p className="cb-tile-text">Cupons e campanhas sazonais — confira as ofertas vigentes.</p>
            </article>
            <article className="cb-tile">
              <h3 className="cb-tile-title">Fidelidade</h3>
              <p className="cb-tile-text">Pontos em cada compra e resgates — com consentimento LGPD no cadastro.</p>
            </article>
            <article className="cb-tile">
              <h3 className="cb-tile-title">Pagamento</h3>
              <p className="cb-tile-text">Fluxo com parceiro externo simulado — sem cobrança real nesta demo.</p>
            </article>
          </div>
          <div className="cb-cta-row">
            <Link className="btn btn-cta" to="/unidades">
              Faça seu pedido
            </Link>
          </div>
        </div>
      </section>

      <section className="cb-social-proof js-reveal" aria-label="Avaliações">
        <div className="cb-wrap cb-stars-inner">
          <p className="cb-stars" aria-hidden="true">
            ★★★★★
          </p>
          <p className="cb-stars-caption">
            Experiência pensada para parecer um <strong>restaurante e delivery de verdade</strong> — interface de
            demonstração.
          </p>
        </div>
      </section>

      <section className="cb-about js-reveal">
        <div className="cb-wrap cb-about-grid">
          <div className="cb-about-text">
            <h2 className="cb-about-title">A sua melhor opção em sabor regional</h2>
            <p>
              Uma proposta inspirada em quem ama <em>culinária nordestina</em> e receber bem. A rede Raízes do Nordeste
              (demonstração) reúne pratos tradicionais, salgados e bebidas típicas — do baião ao acarajé — com a mesma
              lógica de um site como o{" "}
              <a href="https://www.restaurantecasaboa.com.br" target="_blank" rel="noopener noreferrer">
                Restaurante Casaboa
              </a>
              : clareza no cardápio, chamada para pedido e informações de atendimento.
            </p>
            <p>
              Monte seu pedido pelo navegador, acompanhe o preparo e use o programa de fidelidade.{" "}
              <strong>Nenhum dado sai do seu computador</strong> neste protótipo acadêmico.
            </p>
          </div>
          <figure
            className="cb-photo cb-photo--about"
            style={photoStyle(sitePhotos.about)}
            role="presentation"
          />
        </div>
      </section>

      <section className="cb-demo-strip js-reveal">
        <div className="cb-wrap">
          <p>
            <strong>Demonstração:</strong> use o menu superior para explorar o fluxo completo de pedidos neste
            protótipo.
          </p>
          <p className="cb-photo-attribution">{photoCreditLine}</p>
        </div>
      </section>
    </div>
  );
}
