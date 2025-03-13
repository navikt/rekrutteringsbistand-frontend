'use client';

import { UmamiProps } from './umami';
import { Link } from '@navikt/ds-react';
import { ReactNode, useCallback } from 'react';

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

  // Manual tracking handler as backup
  const handleClick = useCallback(() => {
    // Try using the JS API directly as a fallback
    if (
      typeof window !== 'undefined' &&
      window.umami &&
      typeof window.umami.track === 'function'
    ) {
      try {
        window.umami.track(event, {
          'event-domene': domene,
          ...restProps,
        });
        console.log('Tracked event via JS API:', event);
      } catch (e) {
        console.error('Failed to track with Umami JS API:', e);
      }
    } else {
      console.log('Umami JS API not available, relying on data attributes');
    }
  }, [event, domene, restProps]);

  return href ? (
    <Link
      className={className}
      href={href}
      {...dataAttributes}
      onClick={handleClick}
    >
      {children}
    </Link>
  ) : (
    <div {...dataAttributes} className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
