'use client';

import Breadcrumbs from './Breadcrumbs';
import React, { createContext, useCallback, useContext, useState } from 'react';

type LabelMap = Record<string, string>;

interface Ctx {
  labels: LabelMap;
  setLabel: (href: string, label: string) => void;
  clearLabel: (href: string) => void;
}

const BreadcrumbsContext = createContext<Ctx | null>(null);

interface BreadcrumbsProviderProps {
  children: React.ReactNode;
  skjul?: boolean;
}

export const BreadcrumbsProvider: React.FC<BreadcrumbsProviderProps> = ({
  children,
  skjul,
}) => {
  const [labels, setLabels] = useState<LabelMap>({});

  const setLabel = useCallback((href: string, label: string) => {
    setLabels((prev) =>
      prev[href] === label ? prev : { ...prev, [href]: label },
    );
  }, []);

  const clearLabel = useCallback((href: string) => {
    setLabels((prev) => {
      if (!(href in prev)) return prev;
      const next = { ...prev };
      delete next[href];
      return next;
    });
  }, []);

  if (skjul) {
    return children;
  }
  return (
    <BreadcrumbsContext.Provider value={{ labels, setLabel, clearLabel }}>
      <Breadcrumbs />
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbsLabels = () => {
  const ctx = useContext(BreadcrumbsContext);
  if (!ctx)
    throw new Error(
      'useBreadcrumbsLabels must be used inside BreadcrumbsProvider',
    );
  return ctx;
};
