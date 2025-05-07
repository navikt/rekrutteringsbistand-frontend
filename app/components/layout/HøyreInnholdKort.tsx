import HvitKort from './HvitKort';
import {
  ChevronDownIcon,
  ChevronRightDoubleIcon,
  ChevronUpIcon,
  ExpandIcon,
  ShrinkIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface HøyreInnholdKortProps {
  children?: React.ReactNode | undefined;
  className?: string;
  lukkSidebar: () => void;
  nesteSide: (() => void) | null;
  forrigeSide: (() => void) | null;
  ekspanderSidebar: () => void;
  ekspanderHøyre?: boolean;
}

const HøyreInnholdKort: React.FC<HøyreInnholdKortProps> = ({
  children,
  className,
  lukkSidebar,
  nesteSide,
  forrigeSide,
  ekspanderSidebar,
  ekspanderHøyre,
}) => {
  return (
    <HvitKort className={className} id='høyreinnhold'>
      <div className='top-0 z-10 flex items-center justify-between bg-background p-2'>
        <div className='flex items-center'>
          <div>
            <Button
              size='small'
              variant='tertiary'
              icon={<ChevronRightDoubleIcon aria-hidden />}
              onClick={lukkSidebar}
              title='Lukk sidebar'
            />
            <Button
              size='small'
              variant='tertiary'
              icon={
                ekspanderHøyre ? (
                  <ShrinkIcon aria-hidden />
                ) : (
                  <ExpandIcon aria-hidden />
                )
              }
              onClick={ekspanderSidebar}
              title='Ekspander sidebar'
            />
          </div>
          <div className='w-0 h-4 outline outline-offset-[-0.50px] outline-Border-Accent-Accent-Subtle mx-1' />
          <div>
            <Button
              variant='tertiary'
              size='small'
              disabled={!forrigeSide}
              onClick={() => (forrigeSide ? forrigeSide() : null)}
              icon={<ChevronUpIcon />}
            />
          </div>
          <div>
            <Button
              size='small'
              variant='tertiary'
              disabled={!nesteSide}
              onClick={() => (nesteSide ? nesteSide() : null)}
              icon={<ChevronDownIcon />}
            />
          </div>
        </div>
      </div>
      <div className='h-full min-w-[320px]'>{children}</div>
    </HvitKort>
  );
};

export default HøyreInnholdKort;
