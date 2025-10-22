'use client';

import { useSideLayoutContext } from '@/components/layout/SideLayoutContext';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

interface SidepanelTriggerProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'medium' | 'small' | 'xsmall';
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Knapp som trigger sidepanel Sheet på mobil.
 * Skjules automatisk på desktop (≥720px) der vanlig sidepanel vises.
 */
export const SidepanelTrigger: React.FC<SidepanelTriggerProps> = ({
  children,
  variant = 'tertiary',
  size = 'small',
  icon,
  className = '',
}) => {
  const { openSheet } = useSideLayoutContext();

  return (
    <div
      className={`@[720px]/sidelayout:hidden block whitespace-nowrap ${className}`}
    >
      <Button variant={variant} size={size} icon={icon} onClick={openSheet}>
        {children}
      </Button>
    </div>
  );
};

/**
 * Hook for å kontrollere sidepanel Sheet programmatisk
 */
export const useSidepanelSheet = () => {
  const { isSheetOpen, openSheet, closeSheet, toggleSheet } =
    useSideLayoutContext();

  return {
    isOpen: isSheetOpen,
    open: openSheet,
    close: closeSheet,
    toggle: toggleSheet,
  };
};
