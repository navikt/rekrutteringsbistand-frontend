'use client';

import {
  MarkertKandidat,
  useKandidatSøkMarkerteContext,
} from '@/app/kandidat/KandidatSøkMarkerteContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PersonGroupIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading } from '@navikt/ds-react';

export default function MarkerteKandidaterPopover() {
  const { markerteKandidater, setMarkert, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  if (markerteKandidater.length === 0) return null;

  const fjernKandidat = (kandidat: MarkertKandidat) => {
    setMarkert(kandidat);
  };

  return (
    <div className='fixed right-6 bottom-6 z-50'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='primary'
            size='small'
            icon={<PersonGroupIcon aria-hidden />}
            className='shadow-lg'
          >
            {markerteKandidater.length} markert
          </Button>
        </PopoverTrigger>
        <PopoverContent side='top' align='end' sideOffset={8} className='w-80'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <Heading size='xsmall' level='3'>
                Markerte kandidater ({markerteKandidater.length})
              </Heading>
              <Button
                variant='tertiary-neutral'
                size='xsmall'
                icon={<TrashIcon aria-hidden />}
                onClick={fjernMarkerteKandidater}
                title='Fjern alle'
              />
            </div>
            <ul className='flex max-h-60 flex-col gap-1 overflow-y-auto'>
              {markerteKandidater.map((kandidat) => (
                <li
                  key={kandidat.arenaKandidatnr}
                  className='flex items-center justify-between rounded-md px-2 py-1 hover:bg-(--ax-bg-neutral-moderate-hover)'
                >
                  <BodyShort size='small' truncate>
                    {kandidat.fornavn && kandidat.etternavn
                      ? `${kandidat.etternavn}, ${kandidat.fornavn}`
                      : kandidat.arenaKandidatnr}
                  </BodyShort>
                  <Button
                    variant='tertiary-neutral'
                    size='xsmall'
                    icon={<XMarkIcon aria-hidden />}
                    onClick={() => fjernKandidat(kandidat)}
                    title='Fjern kandidat'
                  />
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
