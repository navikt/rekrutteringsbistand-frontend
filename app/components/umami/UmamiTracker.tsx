'use client';

import { UmamiProps } from './umami';
import { Link } from '@navikt/ds-react';
import { ReactNode } from 'react';

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
  // Extract the event name and domain from umamiProps
  const { event, domene, ...restProps } = umamiProps;

  // Prepare data attributes
  const dataAttributes: Record<string, string> = {
    'data-umami-event': event,
    'data-umami-event-domene': domene,
  };

  // Add any additional props as data attributes
  Object.entries(restProps).forEach(([key, value]) => {
    if (value !== undefined) {
      dataAttributes[`data-umami-${key}`] = String(value);
    }
  });

  console.log('🎺 umamiProps', umamiProps);
  console.log('🎺 dataAttributes', dataAttributes);
  return href ? (
    <Link className={className} href={href} {...dataAttributes}>
      {children}
    </Link>
  ) : (
    <div {...dataAttributes}>{children}</div>
  );
};
