import { useThemeProvider } from '@/providers/ThemeProvider';
import React, { createContext, useContext, useMemo, useState } from 'react';

export interface WindowAnkerProps {
  children: React.ReactNode;
  href: string; // Kan være relativ eller full
  windowRef?: string; // Alternativ "intern" referanse
  mode?: 'replace' | 'push'; // Valgfritt: hvordan historikken skal håndteres
  disabled?: boolean;
  className?: string;
  visitedClassName?: string;
  /**
   * Når true rendres lenken som et «stretched link»-overlegg: ankeret omslutter
   * kun navnet/teksten, men dekker hele nærmeste posisjonerte forelder via et
   * usynlig ::after-overlegg. Da kan kortet inneholde andre interaktive elementer
   * (avkrysningsbokser, menyer) som egne, gyldige tab-stopp – uten ugyldig
   * nesting av interaktive elementer inni en <a>.
   */
  stretchet?: boolean;
  /** Eksplisitt tilgjengelig navn for lenken (brukes ved behov). */
  'aria-label'?: string;
}

const WindowAnkerVisitedContext = createContext(false);

export const useWindowAnkerVisited = () =>
  useContext(WindowAnkerVisitedContext);

export default function WindowAnker({
  children,
  href,
  windowRef,
  mode = 'replace',
  disabled,
  className,
  visitedClassName,
  stretchet,
  'aria-label': ariaLabel,
}: WindowAnkerProps) {
  const { windowMode } = useThemeProvider();

  const targetHref = useMemo(
    () => (windowMode && windowRef ? windowRef : href),
    [href, windowMode, windowRef],
  );

  const besoktStorageKey = useMemo(
    () => `window-anker:${targetHref}`,
    [targetHref],
  );
  const [manueltBesokt, setManueltBesokt] = useState<{
    key: string;
    value: boolean;
  }>({ key: besoktStorageKey, value: false });

  const lagretBesokt = useMemo(() => {
    if (typeof window === 'undefined') return false;
    if (!targetHref) return false;
    try {
      return sessionStorage.getItem(besoktStorageKey) === '1';
    } catch {
      return false;
    }
  }, [besoktStorageKey, targetHref]);

  const besokt =
    lagretBesokt ||
    (manueltBesokt.key === besoktStorageKey && manueltBesokt.value);

  const markerSomBesokt = () => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(besoktStorageKey, '1');
      setManueltBesokt({ key: besoktStorageKey, value: true });
    } catch {
      // Ignorer dersom sessionStorage ikke er tilgjengelig
    }
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // La modifier‑klikking (cmd/ctrl/åpne i ny fane) virke normalt
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.button !== 0 // kun venstreklikk
    ) {
      markerSomBesokt();
      return;
    }

    markerSomBesokt();

    // Bygg absolutte URLer for sammenligning
    const current = new URL(window.location.href);
    const target = new URL(targetHref, window.location.origin);

    // Hvis bare search (og/eller hash) er forskjellig men pathname er likt:
    const samePath = current.pathname === target.pathname;
    const onlySearchOrHashChanged =
      samePath &&
      (current.search !== target.search || current.hash !== target.hash) &&
      current.origin === target.origin;

    if (onlySearchOrHashChanged) {
      e.preventDefault();

      const newUrl = target.pathname + target.search + target.hash;

      if (newUrl === current.pathname + current.search + current.hash) {
        // Ingenting å gjøre
        return;
      }

      if (mode === 'replace') {
        window.history.replaceState(null, '', newUrl);
      } else {
        window.history.pushState(null, '', newUrl);
      }
      return;
    }

    // Hvis helt lik URL -> ikke gjør noe
    if (current.href === target.href) {
      e.preventDefault();
      return;
    }

    // Ellers: la normal navigasjon skje
  };

  const onAuxClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button === 1) {
      markerSomBesokt();
    }
  };

  const stretchetKlasser =
    'window-anker text-inherit no-underline outline-none ' +
    "after:absolute after:inset-0 after:rounded-xl after:content-[''] " +
    'focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-(--ax-border-focus)';

  const standardKlasser =
    'window-anker block rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--ax-border-focus)';

  const anchorClassName = [
    stretchet ? stretchetKlasser : standardKlasser,
    className,
    besokt && visitedClassName ? visitedClassName : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  if (disabled) {
    return (
      <WindowAnkerVisitedContext.Provider value={false}>
        {children}
      </WindowAnkerVisitedContext.Provider>
    );
  }

  return (
    <WindowAnkerVisitedContext.Provider value={besokt}>
      <a
        href={targetHref}
        onClick={onClick}
        onAuxClick={onAuxClick}
        className={anchorClassName || undefined}
        aria-label={ariaLabel}
        data-visited={besokt ? 'true' : 'false'}
      >
        {children}
      </a>
    </WindowAnkerVisitedContext.Provider>
  );
}
