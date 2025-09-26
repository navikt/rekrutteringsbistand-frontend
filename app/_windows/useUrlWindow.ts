'use client';

import { useQueryState } from 'nuqs';
import { ReactElement, useEffect } from 'react';

export interface UrlWindowConfig {
  urlParam: string;
  windowId: string;
  title?: string;
  position?: 'left' | 'right';
  onClose?: (paramValue: string) => void;
  createContent: (paramValue: string) => ReactElement;
}

export interface WindowState {
  isMinimized?: boolean;
  isMaximized?: boolean;
}

/**
 * Hook for å håndtere URL-baserte vinduer i WindowWrapper.
 * Håndterer ett vindu om gangen med støtte for minimering og maksimering.
 */
export const useUrlWindow = (
  config: UrlWindowConfig,
  addWindow: (props: any) => void,
  removeWindow: (id: string) => void,
  updateWindowState?: (id: string, state: Partial<WindowState>) => void,
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
          `🔗 ${config.windowId}: ${config.urlParam} opened with value:`,
          paramValue,
        );
      }

      const content = config.createContent(paramValue);

      addWindow({
        id: config.windowId,
        content,
        title: config.title ? `${config.title} - ${paramValue}` : paramValue,
        position: config.position,
        isMinimized: false,
        isMaximized: false,
        onClose: () => {
          // Automatisk fjern URL-parameter når vinduet lukkes
          setParamValue('');
          // Kall custom onClose hvis definert
          config.onClose?.(paramValue);
        },
        onMinimize: () => {
          updateWindowState?.(config.windowId, { isMinimized: true });
        },
        onMaximize: () => {
          updateWindowState?.(config.windowId, {
            isMaximized: true,
            isMinimized: false,
          });
        },
        onRestore: () => {
          updateWindowState?.(config.windowId, {
            isMaximized: false,
            isMinimized: false,
          });
        },
      });
    } else {
      removeWindow(config.windowId);
    }
  }, [
    paramValue,
    setParamValue,
    config,
    addWindow,
    removeWindow,
    updateWindowState,
  ]);

  return {
    paramValue,
    isOpen: !!paramValue,
    setParamValue,
  };
};
