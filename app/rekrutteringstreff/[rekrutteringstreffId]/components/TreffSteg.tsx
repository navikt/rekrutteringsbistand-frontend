import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckmarkIcon,
  XMarkIcon,
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

  const [itemValidity] = React.useState<Record<string, boolean>>(
    sjekklisteData.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}),
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
          <div className='flex flex-row gap-16'>
            <Stepper
              aria-labelledby='stepper-heading'
              activeStep={1}
              orientation='vertical'
            >
              <Stepper.Step>Publisere</Stepper.Step>
              <Stepper.Step>Invitere</Stepper.Step>
              <Stepper.Step>Arrangere</Stepper.Step>
              <Stepper.Step>Følge opp</Stepper.Step>
              <Stepper.Step>Avslutte</Stepper.Step>
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
                        ? 'border-b border-border-subtle mb-4'
                        : ''
                    }`}
                  >
                    <div
                      role='checkbox'
                      aria-checked={checkedItems[item.id]}
                      onClick={() =>
                        handleCheckChange(item.id, !checkedItems[item.id])
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCheckChange(item.id, !checkedItems[item.id]);
                        }
                      }}
                      tabIndex={0}
                      className='flex items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 rounded'
                    >
                      <div className='w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center mr-2 group-hover:border-blue-700 text-blue-600'>
                        {itemValidity[item.id] ? (
                          <CheckmarkIcon
                            title='Gyldig'
                            fontSize='1rem'
                            className='text-green-600'
                          />
                        ) : (
                          <XMarkIcon
                            title='Ugyldig'
                            fontSize='1rem'
                            className='text-red-600'
                          />
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
