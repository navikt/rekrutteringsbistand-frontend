'use client';

import {
  MarkertKandidat,
  useKandidatSøkMarkerteContext,
} from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useMarkerteKandidaterStore } from '@/app/stilling/[stillingsId]/kandidatliste/markerteKandidaterStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PersonGroupIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const utledKandidatSøkKontekst = (pathname: string | null): string | null => {
  if (!pathname) return null;
  const stilling = pathname.match(/^\/stilling\/([^/]+)\/.*finn-kandidater/);
  if (stilling) return `stilling:${stilling[1]}`;
  const treff = pathname.match(
    /^\/rekrutteringstreff\/([^/]+)\/.*finn-kandidater/,
  );
  if (treff) return `treff:${treff[1]}`;
  if (pathname.startsWith('/kandidat')) return 'kandidatsok';
  return null;
};

export default function MarkerteKandidaterPopover() {
  const aktivKandidatlisteId = useMarkerteKandidaterStore(
    (s) => s.aktivKandidatlisteId,
  );
  const { fjernMarkerteKandidater } = useKandidatSøkMarkerteContext();
  const pathname = usePathname();
  const kontekst = utledKandidatSøkKontekst(pathname);
  const forrigeKontekst = useRef<string | null>(kontekst);
  useEffect(() => {
    if (forrigeKontekst.current !== kontekst) {
      fjernMarkerteKandidater();
      forrigeKontekst.current = kontekst;
    }
  }, [kontekst, fjernMarkerteKandidater]);

  if (aktivKandidatlisteId !== null) {
    return <KandidatlisteVisning kandidatlisteId={aktivKandidatlisteId} />;
  }
  return <KandidatSøkVisning />;
}

function KandidatSøkVisning() {
  const { markerteKandidater, setMarkert, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  if (markerteKandidater.length === 0) return null;

  const fjernKandidat = (kandidat: MarkertKandidat) => {
    setMarkert(kandidat);
  };

  return (
    <Visning
      tittel={`Markerte kandidater (${markerteKandidater.length})`}
      knappTekst={`${markerteKandidater.length} markert`}
      onFjernAlle={fjernMarkerteKandidater}
      kandidater={markerteKandidater.map((k) => ({
        id: k.arenaKandidatnr,
        navn:
          k.fornavn && k.etternavn
            ? `${k.etternavn}, ${k.fornavn}`
            : k.arenaKandidatnr,
        onFjern: () => fjernKandidat(k),
      }))}
    />
  );
}

function KandidatlisteVisning({
  kandidatlisteId,
}: {
  kandidatlisteId: string;
}) {
  const markerteKandidater = useMarkerteKandidaterStore(
    (s) => s.perKandidatliste[kandidatlisteId],
  );
  const setMarkerteKandidater = useMarkerteKandidaterStore(
    (s) => s.setMarkerteKandidater,
  );
  const toggleMarkerKandidat = useMarkerteKandidaterStore(
    (s) => s.toggleMarkerKandidat,
  );

  if (!markerteKandidater || markerteKandidater.length === 0) return null;

  return (
    <Visning
      tittel={`Markerte kandidater på kandidatliste (${markerteKandidater.length})`}
      knappTekst={`${markerteKandidater.length} markert på kandidatliste`}
      onFjernAlle={() => setMarkerteKandidater(kandidatlisteId, [])}
      kandidater={markerteKandidater.map((k) => ({
        id: k.kandidatnr ?? k.fodselsnr ?? '',
        navn:
          k.fornavn && k.etternavn
            ? `${k.etternavn}, ${k.fornavn}`
            : (k.kandidatnr ?? ''),
        onFjern: () => toggleMarkerKandidat(kandidatlisteId, k),
      }))}
    />
  );
}

function Visning({
  tittel,
  knappTekst,
  onFjernAlle,
  kandidater,
}: {
  tittel: string;
  knappTekst: string;
  onFjernAlle: () => void;
  kandidater: { id: string; navn: string; onFjern: () => void }[];
}) {
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
            {knappTekst}
          </Button>
        </PopoverTrigger>
        <PopoverContent side='top' align='end' sideOffset={8} className='w-80'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <Heading size='xsmall' level='3'>
                {tittel}
              </Heading>
              <Button
                variant='tertiary-neutral'
                size='xsmall'
                icon={<TrashIcon aria-hidden />}
                onClick={onFjernAlle}
                title='Fjern alle'
              />
            </div>
            <ul className='flex max-h-60 flex-col gap-1 overflow-y-auto'>
              {kandidater.map((kandidat) => (
                <li
                  key={kandidat.id}
                  className='flex items-center justify-between rounded-md px-2 py-1 hover:bg-(--ax-bg-neutral-moderate-hover)'
                >
                  <BodyShort size='small' truncate>
                    {kandidat.navn}
                  </BodyShort>
                  <Button
                    variant='tertiary-neutral'
                    size='xsmall'
                    icon={<XMarkIcon aria-hidden />}
                    onClick={kandidat.onFjern}
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
