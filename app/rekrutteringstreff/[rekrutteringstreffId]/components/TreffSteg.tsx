import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface TreffStegCustomProps {
  className?: string;
}

const TreffStegCustom: React.FC<TreffStegCustomProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleContent = () => setIsOpen(!isOpen);

  const headerId = React.useId();
  const contentId = React.useId();

  const commonBoxProps = {
    background: 'raised' as const,
    borderColor: 'neutral-subtleA' as const,
    borderWidth: '1' as const,
    padding: '6' as const,
  };

  return (
    <div className={`my-2 ${className ?? ''}`}>
      <Box.New
        {...commonBoxProps}
        className={`
          ${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'} 
          cursor-pointer 
          focus-visible:shadow-focus focus-visible:outline-none
        `}
        onClick={toggleContent}
        role='button'
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={headerId}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleContent();
          }
        }}
      >
        <div className='flex items-center justify-between w-full'>
          <Heading size='small'>Gjør klar til publisering</Heading>
          <div className='flex items-center gap-4'>
            {' '}
            <div className='flex gap-2'>
              <Button
                disabled
                size='small'
                onClick={(e) => e.stopPropagation()} // Viktig!
              >
                Publiser treffet
              </Button>
              <Button
                variant='secondary'
                size='small'
                onClick={(e) => e.stopPropagation()} // Viktig!
              >
                Se forhåndsvisning
              </Button>
            </div>
            <div className='text-text-action pointer-events-none'>
              {' '}
              {isOpen ? (
                <ChevronUpIcon title='Lukk innhold' fontSize='1.5rem' />
              ) : (
                <ChevronDownIcon title='Åpne innhold' fontSize='1.5rem' />
              )}
            </div>
          </div>
        </div>
      </Box.New>
      {isOpen && (
        <Box.New
          {...commonBoxProps}
          className='rounded-b-xl border-t-0'
          id={contentId}
          role='region'
          aria-labelledby={headerId}
        >
          <BodyShort>
            todo: Her kommer innholdet som vises når boksen er åpen.
          </BodyShort>
        </Box.New>
      )}
    </div>
  );
};

export default TreffStegCustom;
