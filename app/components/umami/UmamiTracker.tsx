import { tilUmami, UmamiProps } from './umami';
import { ReactNode } from 'react';

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
  return (
    <div className={className} onClick={() => tilUmami(umamiProps)}>
      {children}
    </div>
  );
};
