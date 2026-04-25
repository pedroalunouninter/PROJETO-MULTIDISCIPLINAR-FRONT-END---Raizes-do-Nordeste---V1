export function PrivacyPage() {
  return (
    <section className="panel legal">
      <h2>Privacidade e LGPD (texto de interface)</h2>
      <p>
        Este protótipo demonstra <strong>consentimento</strong>, <strong>finalidade</strong> e{" "}
        <strong>transparência</strong>. Em produção, alinhar ao DPO e políticas corporativas.
      </p>
      <ul>
        <li>
          <strong>Dados coletados:</strong> identificação, contato, histórico de pedidos e preferências de marketing (se
          opt-in).
        </li>
        <li>
          <strong>Finalidades:</strong> processar pedidos, programa de fidelidade, suporte e comunicações autorizadas.
        </li>
        <li>
          <strong>Bases legais:</strong> execução de contrato, consentimento onde aplicável, legítimo interesse
          avaliado.
        </li>
        <li>
          <strong>Direitos do titular:</strong> acesso, correção, portabilidade, eliminação, revogação de consentimento e
          reclamação à ANPD.
        </li>
        <li>
          <strong>Pagamento:</strong> dados de pagamento são tratados pelo <em>provedor externo</em> (aqui apenas fluxo
          simulado).
        </li>
      </ul>
      <p className="muted">
        Nenhum dado é enviado a servidores reais nesta demonstração; tudo permanece no seu navegador (localStorage) para
        fins acadêmicos.
      </p>
    </section>
  );
}
