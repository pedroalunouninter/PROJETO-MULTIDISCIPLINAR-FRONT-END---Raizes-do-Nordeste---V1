import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../lib/auth";
import { useApp } from "../context/AppContext";

export function AuthPage() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");

  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = loginUser(String(fd.get("email")), String(fd.get("password")));
    if (!res.ok) {
      alert(res.msg);
      return;
    }
    setUser(res.user);
    navigate("/cardapio");
  }

  function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("lgpd")) {
      alert("É necessário aceitar a política de privacidade (LGPD).");
      return;
    }
    const res = registerUser({
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      phone: String(fd.get("phone") || ""),
      password: String(fd.get("password")),
    });
    if (!res.ok) {
      alert(res.msg);
      return;
    }
    setUser(res.user);
    navigate("/unidades");
  }

  return (
    <section className="panel panel--access">
      <h2>Acesso</h2>
      <div className="tabs" role="tablist">
        <button
          type="button"
          className={"tab" + (tab === "login" ? " is-active" : "")}
          role="tab"
          aria-selected={tab === "login"}
          onClick={() => setTab("login")}
        >
          Entrar
        </button>
        <button
          type="button"
          className={"tab" + (tab === "register" ? " is-active" : "")}
          role="tab"
          aria-selected={tab === "register"}
          onClick={() => setTab("register")}
        >
          Cadastrar
        </button>
      </div>
      {tab === "login" ? (
        <div className="tab-panel" id="panel-login">
          <form className="form form--auth" onSubmit={onLogin}>
            <label className="form-field">
              <span className="form-label">E-mail</span>
              <input
                className="form-input"
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="seu@email.com"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Senha</span>
              <input
                className="form-input"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-block">
                Entrar
              </button>
            </div>
            <p className="form-hint">Conta de teste: crie um cadastro ou use um já registrado neste navegador.</p>
          </form>
        </div>
      ) : (
        <div className="tab-panel" id="panel-register">
          <form className="form form--auth" onSubmit={onRegister}>
            <label className="form-field">
              <span className="form-label">Nome completo</span>
              <input
                className="form-input"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Como aparece no pedido"
              />
            </label>
            <label className="form-field">
              <span className="form-label">E-mail</span>
              <input
                className="form-input"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Telefone</span>
              <input
                className="form-input"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(00) 00000-0000"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Senha</span>
              <input
                className="form-input"
                name="password"
                type="password"
                required
                minLength={4}
                autoComplete="new-password"
                placeholder="Mínimo 4 caracteres"
              />
            </label>
            <label className="form-field form-field--check check">
              <input type="checkbox" name="lgpd" required />
              <span>
                Li e aceito a <Link to="/privacidade">Política de Privacidade</Link> e o tratamento dos meus dados
                conforme a LGPD.
              </span>
            </label>
            <label className="form-field form-field--check check">
              <input type="checkbox" name="marketing" />
              <span>Quero receber ofertas e novidades (opcional).</span>
            </label>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-block">
                Criar conta
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
