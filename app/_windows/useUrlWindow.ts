'use client';

import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

export interface UrlWindowConfig {
  urlParam: string;
  windowId: string;
  title?: string;
  position?: 'left' | 'right';
  onClose?: () => void;
  createContent: (paramValue: string) => React.ReactElement;
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

  useEffect(() => {
    if (paramValue) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          `🔗 ${config.windowId}: ${config.urlParam} changed to:`,
          paramValue,
        );
      }

      const content = config.createContent(paramValue);

      addWindow({
        id: config.windowId,
        content,
        title: config.title,
        position: config.position,
        onClose: () => {
          // Automatisk fjern URL-parameter når vinduet lukkes
          setParamValue('');
          // Kall custom onClose hvis definert
          config.onClose?.();
        },
      });
    } else {
      removeWindow(config.windowId);
    }
  }, [paramValue, setParamValue, config, addWindow, removeWindow]);

  return { paramValue, isOpen: !!paramValue };
};
