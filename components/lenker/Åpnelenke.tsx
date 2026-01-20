import { ExpandIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { MouseEvent } from 'react';

interface ÅpnelenkeProps {
  href: string;
  className?: string;
}

interface LenkeAnkerProps {
  children: React.ReactNode;
  href: string;
  nyFane?: boolean;
}

function LenkeAnker({ children, nyFane, href }: LenkeAnkerProps) {
  const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
  };

  return (
    <a
      onClick={stopAllPropagation}
      onPointerDown={stopAllPropagation}
      onMouseDown={stopAllPropagation}
      onAuxClick={stopAllPropagation}
      target={nyFane ? '_blank' : undefined}
      href={href}
      className='text-text-subtle hover:text-text-default inline-flex flex-shrink-0 items-center'
    >
      {children}
    </a>
  );
}

export default function Åpnelenke({ href, className }: ÅpnelenkeProps) {
  return (
    <div className={className}>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <LenkeAnker href={href}>
          <Button
            data-color='neutral'
            type='button'
            size='small'
            variant='primary'
            icon={<ExpandIcon aria-hidden />}
            iconPosition='right'
          >
            Full visning
          </Button>
        </LenkeAnker>
        <LenkeAnker nyFane href={href}>
          <Button
            data-color='neutral'
            rel='noopener noreferrer'
            size='small'
            variant='primary'
            iconPosition='right'
            icon={<ExternalLinkIcon aria-hidden />}
          >
            Åpne i fane
          </Button>
        </LenkeAnker>
      </div>
    </div>
  );
}
