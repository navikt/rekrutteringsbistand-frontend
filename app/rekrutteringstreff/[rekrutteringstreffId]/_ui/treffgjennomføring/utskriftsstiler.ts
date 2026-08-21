const URL_I_CSS = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;

const gjørUrlerAbsolutte = (css: string, stilarkadresse: string) =>
  css.replace(URL_I_CSS, (treff, sitattegn: string, adresse: string) => {
    if (/^(data:|blob:|https?:|\/|#)/i.test(adresse)) return treff;
    try {
      return `url(${sitattegn}${new URL(adresse, stilarkadresse).href}${sitattegn})`;
    } catch {
      return treff;
    }
  });

const lesRegler = (stilark: CSSStyleSheet): CSSRuleList | null => {
  try {
    return stilark.cssRules;
  } catch {
    return null;
  }
};

const lagSignatur = (stilark: CSSStyleSheet[]) =>
  stilark
    .map((ark) => `${ark.href ?? 'inline'}:${lesRegler(ark)?.length ?? 'x'}`)
    .join('|');

let bufretSignatur: string | null = null;
let bufredeStiler = '';

/**
 * Serialiserer alle stilarkene på sida til én CSS-tekst.
 *
 * Resultatet bufres til stilarkene endrer seg, slik at funksjonen kan kalles
 * ved hver rendring.
 */
export const hentDokumentstiler = (): string => {
  if (typeof document === 'undefined') return '';

  const stilark = Array.from(document.styleSheets).filter(
    (ark): ark is CSSStyleSheet => ark instanceof CSSStyleSheet,
  );
  const signatur = lagSignatur(stilark);
  if (signatur === bufretSignatur) return bufredeStiler;

  bufredeStiler = stilark
    .map((ark) => {
      const regler = lesRegler(ark);
      if (!regler) return '';
      let css = '';
      for (let i = 0; i < regler.length; i += 1)
        css += `${regler[i].cssText}\n`;
      return ark.href ? gjørUrlerAbsolutte(css, ark.href) : css;
    })
    .join('\n');
  bufretSignatur = signatur;

  return bufredeStiler;
};
