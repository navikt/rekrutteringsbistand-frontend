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
  const { domene, event, data } = umamiProps;
  const eventName = `[${domene}] ${event}`;

  const dataAttributes: { [key: string]: string } = {};
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      dataAttributes[`data-umami-event-${key}`] = value;
    });
  }

  dataAttributes['data-umami-event-domene'] = domene;

  return href ? (
    <Link
      className={className}
      href={href}
      data-umami-event={eventName}
      {...dataAttributes}
    >
      {children}
    </Link>
  ) : (
    <div data-umami-event={eventName} {...dataAttributes}>
      {children}
    </div>
  );
};
