'use client';

import { UmamiDomene } from '../providers/UmamiContext';
import { Link } from '@navikt/ds-react';
import { ReactNode } from 'react';

export interface UmamiProps {
  domene: UmamiDomene;
  event: string;
  data?: Record<string, string>;
}
interface UmamiTrackerProps {
  umamiProps: UmamiProps;
  children: ReactNode;
  className?: string;
  href?: string;
}

export const UmamiTracker = ({
  umamiProps,
  children,
  className,
  href,
}: UmamiTrackerProps) => {
  const { event, domene, ...restProps } = umamiProps;

  const dataAttributes: Record<string, string> = {
    'data-umami-event': event,
    'data-umami-event-domene': domene,
  };

  Object.entries(restProps).forEach(([key, value]) => {
    if (value !== undefined) {
      dataAttributes[`data-umami-${key}`] = String(value);
    }
  });

  return href ? (
    <Link className={className} href={href} {...dataAttributes}>
      {children}
    </Link>
  ) : (
    <div {...dataAttributes}>{children}</div>
  );
};
