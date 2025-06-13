import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  Heading,
  Stepper,
} from '@navikt/ds-react';
import * as React from 'react';

export interface TreffStegProps {
  className?: string;
}

interface ChecklistItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onCheckChange?: (id: string, checked: boolean) => void;
  onLeggTilClick?: (id: string) => void;
}

const sjekklisteData: ChecklistItemProps[] = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
  { id: 'avslortnavn', label: 'Avslørt navnet på arbeidsgiverne (valgfritt)' },
];

const TreffSteg: React.FC<TreffStegProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleContent = () => setIsOpen(!isOpen);

  const headerId = React.useId();
  const contentId = React.useId();

  const [checkedItems, setCheckedItems] = React.useState<
    Record<string, boolean>
  >(
    sjekklisteData.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.checked ?? false }),
      {},
    ),
  );

  const handleCheckChange = (id: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  };

  const handleLeggTil = () => {};

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
            <div className='flex gap-2'>
              <Button
                disabled
                size='small'
                onClick={(e) => e.stopPropagation()}
              >
                Publiser treffet
              </Button>
              <Button
                variant='secondary'
                size='small'
                onClick={(e) => e.stopPropagation()}
              >
                Se forhåndsvisning
              </Button>
            </div>
            <div className='text-text-action pointer-events-none'>
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
          <div className='flex flex-row gap-8'>
            <Stepper
              aria-labelledby='stepper-heading'
              activeStep={1} // Du må kanskje gjøre denne dynamisk
              orientation='vertical'
            >
              <Stepper.Step>Publisere</Stepper.Step>
              <Stepper.Step>Invitere</Stepper.Step>
              <Stepper.Step>Arrangere</Stepper.Step>
              <Stepper.Step>Følge opp</Stepper.Step>
              <Stepper.Step>Avslutte</Stepper.Step>
            </Stepper>
            <div className='flex-1'>
              <BodyShort spacing>
                Før treffet er tilgjengelig for andre, og du kan invitere
                jobbsøker må noen detaljer være på plass først:
              </BodyShort>
              <ul className='space-y-0'>
                {sjekklisteData.map((item, index) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between py-3 ${
                      index < sjekklisteData.length - 1
                        ? 'border-b border-border-subtle'
                        : ''
                    }`}
                  >
                    <Checkbox
                      checked={checkedItems[item.id]}
                      onChange={(e) =>
                        handleCheckChange(item.id, e.target.checked)
                      }
                      size='small'
                    >
                      {item.label}
                    </Checkbox>
                    <Button
                      variant='tertiary'
                      size='small'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeggTil();
                      }}
                    >
                      Legg til
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Box.New>
      )}
    </div>
  );
};

export default TreffSteg;
