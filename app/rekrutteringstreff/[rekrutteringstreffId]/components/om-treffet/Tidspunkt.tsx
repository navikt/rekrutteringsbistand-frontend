import RekrutteringstreffDetalj from '../RekrutteringstreffDetalj';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Popover } from '@navikt/ds-react';
import { format } from 'date-fns';
import { useRef, useState } from 'react';

interface TidspunktProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

const Tidspunkt: React.FC<TidspunktProps> = ({
  rekrutteringstreff,
  className,
}) => {
  const { fraTid, tilTid } = rekrutteringstreff;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const startTidDato = fraTid ? format(new Date(fraTid), 'dd.MM.yyyy') : '';
  const startTidKlokken = fraTid ? format(new Date(fraTid), 'HH:mm') : '';
  const sluttTidDato = tilTid ? format(new Date(tilTid), 'dd.MM.yyyy') : '';
  const sluttTidKlokken = tilTid ? format(new Date(tilTid), 'HH:mm') : '';

  const sammeDag = fraTid && tilTid && startTidDato === sluttTidDato;

  return (
    <div ref={anchorRef} className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            icon={fraTid ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {fraTid ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {fraTid && tilTid ? (
          sammeDag ? (
            <BodyShort size='small'>
              {startTidDato}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {startTidKlokken}-{sluttTidKlokken}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {startTidDato}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {startTidKlokken}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {sluttTidDato}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {sluttTidKlokken}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : null}
      </RekrutteringstreffDetalj>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        offset={0}
        arrow={false}
        placement='bottom-start'
      >
        <Popover.Content>
          <div className='flex flex-col gap-4 p-2 min-w-[22rem]'>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-bold flex items-center gap-2'>
                <CalendarIcon fontSize='1.5rem' />
                Tidspunkt
              </span>
              <Button
                size='small'
                variant='tertiary'
                onClick={() => setOpen(false)}
                className='text-text-action'
              >
                Lagre
              </Button>
            </div>
            <div className='flex gap-4 items-center'>
              <span className='w-10'>Fra</span>
              <input
                type='text'
                className='border rounded px-2 py-1 w-[8rem]'
                defaultValue={startTidDato}
                aria-label='Fra dato'
              />
              <CalendarIcon />
              <input
                type='text'
                className='border rounded px-2 py-1 w-[5rem]'
                defaultValue={startTidKlokken}
                aria-label='Fra klokkeslett'
              />
            </div>
            <div className='flex gap-4 items-center'>
              <span className='w-10'>Til</span>
              <input
                type='text'
                className='border rounded px-2 py-1 w-[8rem]'
                defaultValue={sluttTidDato}
                aria-label='Til dato'
              />
              <CalendarIcon />
              <input
                type='text'
                className='border rounded px-2 py-1 w-[5rem]'
                defaultValue={sluttTidKlokken}
                aria-label='Til klokkeslett'
              />
            </div>
            <BodyShort size='small' textColor='subtle'>
              (2 timer)
            </BodyShort>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default Tidspunkt;
