import { useThemeProvider } from '@/providers/ThemeProvider';
import React from 'react';

export interface WindowAnkerProps {
  children: React.ReactNode;
  href: string; // Kan være relativ eller full
  windowRef?: string; // Alternativ "intern" referanse
  mode?: 'replace' | 'push'; // Valgfritt: hvordan historikken skal håndteres
  disabled?: boolean;
}

export default function WindowAnker({
  children,
  href,
  windowRef,
  mode = 'replace',
  disabled,
}: WindowAnkerProps) {
  const { windowMode } = useThemeProvider();

  const targetHref = windowMode && windowRef ? windowRef : href;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // La modifier‑klikking (cmd/ctrl/åpne i ny fane) virke normalt
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.button !== 0 // kun venstreklikk
    ) {
      return;
    }

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

  if (disabled) {
    return children;
  }

  return (
    <a href={targetHref} onClick={onClick}>
      {children}
    </a>
  );
}
