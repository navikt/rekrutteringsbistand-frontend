import { UmamiProps } from './umami';
import { ReactNode } from 'react';

interface UmamiTrackerProps {
  umamiProps: UmamiProps;
  children: ReactNode;
}

export const UmamiTracker = ({ umamiProps, children }: UmamiTrackerProps) => {
  const { domene, event, data } = umamiProps;
  const eventName = `[${domene}] ${event}`;

  const dataAttributes: { [key: string]: string } = {};
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      dataAttributes[`data-umami-event-${key}`] = value;
    });
  }

  dataAttributes['data-umami-event-domene'] = domene;

  return (
    <div data-umami-event={eventName} {...dataAttributes}>
      {children}
    </div>
  );
};
