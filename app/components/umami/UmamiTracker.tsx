import { UmamiProps } from './umami';
import React, { ReactNode } from 'react';

interface UmamiTrackerProps {
  umamiProps: UmamiProps;
  children: ReactNode;
  className?: string;
}

export const UmamiTracker = ({
  umamiProps,
  children,
  className,
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

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...({
                'data-umami-event': eventName,
                ...dataAttributes,
              } as React.HTMLAttributes<HTMLElement>),
            })
          : child,
      )}
    </div>
  );
};
