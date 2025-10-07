'use client';

import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { ReactElement, useEffect, useRef } from 'react';

export interface UrlWindowConfig {
  urlParam: string;
  windowId: string;
  title?: string;
  position?: 'left' | 'right';
  onClose?: () => void;
  createContent: (paramValue: string) => ReactElement;
  /** Liste over paths hvor vinduet kan vises. Vinduet kan vises hvis pathname starter med en av disse. */
  allowedPaths: string[];
}

/**
 * Hook for å håndtere URL-baserte vinduer i WindowWrapper.
 * Tar en konfigurasjon og returnerer en effekt som kan brukes i WindowWrapper.
 */
export const useUrlWindow = (
  config: UrlWindowConfig,
  addWindow: (props: any) => void,
  removeWindow: (id: string) => void,
) => {
  const [paramValue, setParamValue] = useQueryState(config.urlParam, {
    defaultValue: '',
    clearOnDefault: true,
  });
  const pathname = usePathname();

  // Bruk ref for å unngå dependency issues med config
  const configRef = useRef(config);
  configRef.current = config;

  // Bruk ref for funksjoner som kommer fra WindowWrapper
  const addWindowRef = useRef(addWindow);
  const removeWindowRef = useRef(removeWindow);
  addWindowRef.current = addWindow;
  removeWindowRef.current = removeWindow;

  useEffect(() => {
    const currentConfig = configRef.current;

    if (paramValue) {
      // Sjekk om vinduet kan vises på denne pathen
      const isAllowed = currentConfig.allowedPaths.some((allowedPath) =>
        pathname.startsWith(allowedPath),
      );

      if (!isAllowed) {
        // Vis alert og fjern vinduet
        alert(
          `Vinduet "${currentConfig.title || currentConfig.windowId}" kan ikke vises på denne siden.\n\n` +
            `Tillatte paths: ${currentConfig.allowedPaths.join(', ')}\n` +
            `Nåværende path: ${pathname}`,
        );
        // Fjern URL-parameter
        setParamValue('');
        return;
      }

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`🔗 ${currentConfig.windowId}: changed to:`, paramValue);
      }

      const content = currentConfig.createContent(paramValue);

      addWindowRef.current({
        id: currentConfig.windowId,
        content,
        title: currentConfig.title,
        position: currentConfig.position,
        onClose: () => {
          // Automatisk fjern URL-parameter når vinduet lukkes
          setParamValue('');
          // Kall custom onClose hvis definert
          currentConfig.onClose?.();
        },
      });
    } else {
      removeWindowRef.current(currentConfig.windowId);
    }
  }, [paramValue, pathname, setParamValue]);

  return { paramValue, isOpen: !!paramValue };
};
