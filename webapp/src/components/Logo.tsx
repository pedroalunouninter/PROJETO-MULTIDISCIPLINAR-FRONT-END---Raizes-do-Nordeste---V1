import { useCallback, useState } from "react";

const base = import.meta.env.BASE_URL;

/** PNG em `public/img/logo.png` — logo e favicon */
export function logoAssetUrl(): string {
  return `${base}img/logo.png`.replace(/\/{2,}/g, "/");
}

const logoSvgFallback = `${base}logo-icon.svg`.replace(/\/{2,}/g, "/");

export function LogoIcon({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState(logoAssetUrl());
  const [failed, setFailed] = useState(false);

  const onError = useCallback(() => {
    if (src.includes("/img/logo.png")) {
      setSrc(logoSvgFallback);
    } else {
      setFailed(true);
    }
  }, [src]);

  if (failed) {
    return <span className={`logo-fallback logo-fallback--icon ${className}`.trim()} aria-hidden="true" />;
  }

  return (
    <img
      className={`logo-img logo-img--icon ${className}`.trim()}
      src={src}
      alt="Raízes do Nordeste"
      width={44}
      height={44}
      loading="eager"
      decoding="async"
      onError={onError}
    />
  );
}
