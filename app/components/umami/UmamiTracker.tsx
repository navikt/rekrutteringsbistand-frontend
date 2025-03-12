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
  const handleClick = () => {
    tilUmami(umamiProps);
  };
  return (
    <div className={className} onClickCapture={handleClick}>
      {children}
    </div>
  );
};
