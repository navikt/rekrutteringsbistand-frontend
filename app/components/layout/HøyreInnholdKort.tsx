import HvitKort from './HvitKort';
import {
  ChevronDownIcon,
  ChevronRightDoubleIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface HøyreInnholdKortProps {
  children?: React.ReactNode | undefined;
  className?: string;
  lukkSidebar?: () => void;
  nesteSide?: () => void;
  forrigeSide?: () => void;
}

const HøyreInnholdKort: React.FC<HøyreInnholdKortProps> = ({
  children,
  className,
  lukkSidebar,
  nesteSide,
  forrigeSide,
}) => {
  return (
    <HvitKort className={className}>
      <div className='top-0 z-10 flex items-center justify-between bg-background p-2'>
        <div className='flex items-center'>
          <div>
            <Button
              disabled={!lukkSidebar}
              size='small'
              variant='tertiary'
              icon={<ChevronRightDoubleIcon aria-hidden />}
              onClick={lukkSidebar}
              title='Lukk sidebar'
            />
          </div>
          <div className='w-0 h-4 outline outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle mx-1' />
          <div>
            <Button
              variant='tertiary'
              size='small'
              disabled={!forrigeSide}
              onClick={forrigeSide}
              icon={<ChevronUpIcon />}
            />
          </div>
          <div>
            <Button
              size='small'
              variant='tertiary'
              disabled={!nesteSide}
              onClick={nesteSide}
              icon={<ChevronDownIcon />}
            />
          </div>
        </div>
      </div>
      <div className='mx-auto h-full min-w[320px] max-w-[1440px]'>
        {children}
      </div>
    </HvitKort>
  );
};

export default HøyreInnholdKort;
