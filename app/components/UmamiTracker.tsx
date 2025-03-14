'use client';

import { UmamiEventObject } from '../../util/umamiEvents';
import { getScreenInfo } from '../providers/UmamiContext';
import { Link } from '@navikt/ds-react';
import { ReactNode } from 'react';

export interface UmamiProps {
  event: UmamiEventObject;
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
  const { event, ...restProps } = umamiProps;

  const screenInfo = getScreenInfo();
  const dataAttributes: Record<string, string> = {
    'data-umami-event': event.navn,
    'data-umami-event-screenWidth': screenInfo.width.toString(),
    'data-umami-event-screenHeight': screenInfo.height.toString(),
    'data-umami-event-domene': event.domene,
    'data-umami-event-path': window.location.pathname,
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
