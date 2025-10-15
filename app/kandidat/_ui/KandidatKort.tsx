import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { alleInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '@/app/kandidat/util';
import TekstMedIkon from '@/components/TekstMedIkon';
import VisKandidatModal from '@/components/modal/kandidat/VisKandidatModal';
import { HandShakeHeartIcon, HouseIcon, PinIcon } from '@navikt/aksel-icons';
import { Box, Checkbox, Heading, Tag } from '@navikt/ds-react';
import { FC, MouseEvent, ReactNode, useState } from 'react';

type IKandidatKort = {
  kandidat: KandidatDataSchemaDTO;
  alleredeLagtTil?: string[];
  stillingsId?: string;
};

const KandidatKort: FC<IKandidatKort> = ({
  kandidat,
  alleredeLagtTil,
  stillingsId,
}) => {
  const [visKandidatModal, setVisKandidatModal] = useState(false);

  const { markerteKandidater, setMarkert } = useKandidatSøkMarkerteContext();
  const erMarkert = Boolean(
    markerteKandidater?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const erLagtTil = Boolean(
    alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const aktiv = false;

  const ankerWrapper = (children: ReactNode) => {
    if (stillingsId) {
      return (
        <>
          {visKandidatModal && (
            <VisKandidatModal
              stillingsId={stillingsId}
              tittel='Jobbsøker for stillingsoppdrag'
              kandidatId={kandidat.arenaKandidatnr ?? ''}
              onClose={() => setVisKandidatModal(false)}
            />
          )}
          <div
            onClick={() => {
              if (stillingsId) {
                setVisKandidatModal(true);
              }
            }}
            className='p-5 cursor-pointer'
          >
            {children}
          </div>
        </>
      );
    } else {
      return (
        <a href={`/kandidat/${kandidat.arenaKandidatnr}`}>
          <div className='p-5 '> {children}</div>
        </a>
      );
    }
  };

  return (
    <Box.New
      background='neutral-softA'
      // onClick={() => setVisKandidatnr(kandidat?.arenaKandidatnr ?? '')}
      borderRadius='xlarge'
      data-testid='stillings-kort'
      className={` @container/kandidatlistekort flex flex-col min-w-fit
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ax-border-focus)]
          ${aktiv ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : 'hover:bg-[var(--ax-bg-neutral-moderate-hover)] '}
          ${erLagtTil ? 'border-l-4 border-[var(--ax-border-success)]' : ''}`}
      tabIndex={0}
    >
      {ankerWrapper(
        <div className='flex flex-row '>
          <div onClick={stopPropagation}>
            <Checkbox
              disabled={!kandidat.arenaKandidatnr || erLagtTil}
              checked={erMarkert || erLagtTil}
              aria-selected={erMarkert}
              hideLabel
              className='-mt-2 mr-4'
              onChange={() =>
                kandidat.arenaKandidatnr && setMarkert(kandidat.arenaKandidatnr)
              }
            >
              Checkbox
            </Checkbox>
          </div>

          <div className='flex-grow'>
            <div className='flex justify-between'>
              <Heading size='small'>
                <div
                  data-testid={`kandidatkort-lenke-${kandidat.arenaKandidatnr}`}
                >
                  {hentKandidatensNavn(kandidat)}
                </div>
              </Heading>
              <Tag variant='neutral' size='small'>
                {kandidat.innsatsgruppe &&
                  alleInnsatsgrupper[kandidat.innsatsgruppe].label}
              </Tag>
            </div>
            <div className='flex w-full justify-between'>
              <div className='mt-2 flex flex-col @xl:flex-row gap-4'>
                <TekstMedIkon
                  ikon={<PinIcon />}
                  tekst={hentKandidatensØnskedeSteder(kandidat) ?? '-'}
                />

                <TekstMedIkon
                  ikon={<HouseIcon />}
                  tekst={`${kandidat.postnummer ?? '-'} ${kandidat.poststed ?? '-'} ${kandidat.kommuneNavn ? `(${kandidat.kommuneNavn})` : ''}`}
                />

                <TekstMedIkon
                  ikon={<HandShakeHeartIcon />}
                  tekst={hentKandidatensØnskedeYrker(kandidat) ?? '-'}
                />
              </div>
            </div>
          </div>
        </div>,
      )}
    </Box.New>
  );
};

export default KandidatKort;
