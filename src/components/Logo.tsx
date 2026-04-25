import { useCallback, useState } from "react";
import logoPng from "../assets/logo.png";

const base = import.meta.env.BASE_URL;
const logoSvgFallback = `${base}logo-icon.svg`.replace(/\/{2,}/g, "/");

/** URL resolvida pelo Vite (inclui `base` do GitHub Pages). Favicon continua a usar `public/img/logo.png`. */
export function logoAssetUrl(): string {
  return logoPng;
}

export function LogoIcon({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState(logoPng);
  const [failed, setFailed] = useState(false);

  const onError = useCallback(() => {
    if (src === logoPng) {
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
