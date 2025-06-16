import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckmarkIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Stepper,
  Detail,
} from '@navikt/ds-react';
import * as React from 'react';

export interface TreffStegProps {
  className?: string;
}

interface ChecklistItemProps {
  id: string;
  label: string;
  checked?: boolean;
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

const steps = [
  { id: 1, stepLabel: 'Publisere', header: 'Gjør klar til publisering' },
  { id: 2, stepLabel: 'Invitere', header: 'Send ut invitasjoner' },
  {
    id: 3,
    stepLabel: 'Arrangere',
    header: 'Planlegg og gjennomfør arrangementet',
  },
  {
    id: 4,
    stepLabel: 'Følge opp',
    header: 'Følg opp påmeldte og gjennomfør treffet',
  },
  {
    id: 5,
    stepLabel: 'Avslutte',
    header: 'Avslutt og evaluer rekrutteringstreffet',
  },
];

const TreffSteg: React.FC<TreffStegProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleContent = () => setIsOpen(!isOpen);

  const headerId = React.useId();
  const contentId = React.useId();

  const [activeStep] = React.useState(1);

  const [checkedItems] = React.useState<Record<string, boolean>>(
    sjekklisteData.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.checked ?? false }),
      {},
    ),
  );

  /*
  const handleCheckChange = (id: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  };*/

  const handleLeggTil = () => {
    // TODO: venter med denne
  };

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
        className={`${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'} cursor-pointer focus-visible:shadow-focus focus-visible:outline-none`}
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
          <Heading size='small' className='flex items-center'>
            <span className='mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-sm text-white'>
              {activeStep}
            </span>
            {steps[activeStep - 1].header}
          </Heading>
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
          <div className='flex flex-row gap-16'>
            <Stepper
              aria-labelledby='stepper-heading'
              activeStep={activeStep}
              orientation='vertical'
              interactive={false}
            >
              {steps.map(({ id, stepLabel }) => (
                <Stepper.Step key={id}>{stepLabel}</Stepper.Step>
              ))}
            </Stepper>

            <div className='flex-1'>
              <Detail spacing>
                Før treffet er tilgjengelig for andre, og du kan invitere
                jobbsøker må noen detaljer være på plass først:
              </Detail>
              <ul className='space-y-0'>
                {sjekklisteData.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between py-1 ${
                      item.id === 'arbeidsgiver' || item.id === 'svarfrist'
                        ? 'border-b border-border-subtle mb-2'
                        : ''
                    }`}
                  >
                    <div
                      role='checkbox'
                      aria-checked={checkedItems[item.id]}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                      tabIndex={0}
                      className='flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 rounded' // Fjernet cursor-pointer, beholdt fokusstiler
                    >
                      <div className='w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center mr-2 group-hover:border-blue-700 text-blue-600'>
                        {checkedItems[item.id] && (
                          <CheckmarkIcon title='Avkrysset' fontSize='1rem' />
                        )}
                      </div>
                      <BodyShort as='span'>{item.label}</BodyShort>
                    </div>
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
