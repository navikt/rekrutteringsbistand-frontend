import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { alleInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '@/app/kandidat/util';
import TekstMedIkon from '@/components/TekstMedIkon';
import { HandShakeHeartIcon, HouseIcon, PinIcon } from '@navikt/aksel-icons';
import { Box, Checkbox, Heading, Tag } from '@navikt/ds-react';
import { FC, MouseEvent } from 'react';

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
  // const [visKandidatId, setVisKandidatId] = useQueryState('visKandidatId', {
  //   defaultValue: '',
  //   clearOnDefault: true,
  // });

  const { markerteKandidater, setMarkert } = useKandidatSøkMarkerteContext();
  const erMarkert = Boolean(
    markerteKandidater?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const erLagtTil = Boolean(
    alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const kandidatId = kandidat.arenaKandidatnr;
  const aktiv = false;

  // const stopAllPropagation = (e: MouseEvent<HTMLElement>): void => {
  //   e.stopPropagation();
  // };

  // const ankerWrapper = (children: ReactNode) => {
  //   if (stillingsId) {
  //     return (
  //       <>
  // {visKandidatModal && (
  //   <VisKandidatModal
  //     stillingsId={stillingsId}
  //     tittel='Jobbsøker for stillingsoppdrag'
  //     kandidatId={kandidat.arenaKandidatnr ?? ''}
  //     onClose={() => setVisKandidatModal(false)}
  //   />
  // )}
  //         <div
  //           onClick={() => {
  //             if (stillingsId) {
  //               setVisKandidatModal(true);
  //             }
  //           }}
  //           className='p-5 cursor-pointer'
  //         >
  //           {children}
  //         </div>
  //       </>
  //     );
  //   } else {
  //     return (
  // <a href={`/kandidat/${kandidat.arenaKandidatnr}`}>
  //   <div className='p-5 '> {children}</div>
  // </a>
  //     );
  //   }
  // };

  return (
    <a
      href={
        stillingsId
          ? `/stilling/${stillingsId}/finn-kandidater/${kandidat.arenaKandidatnr}`
          : kandidat.arenaKandidatnr
            ? `/kandidat/${kandidat.arenaKandidatnr}`
            : '#'
      }
    >
      <Box.New
        background='neutral-softA'
        padding='5'
        // onClick={() =>
        //   kandidat.arenaKandidatnr
        //     ? setVisKandidatId(kandidat.arenaKandidatnr)
        //     : null
        // }
        borderRadius='xlarge'
        data-testid='stillings-kort'
        className={` @container/kandidatlistekort flex flex-col min-w-fit
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ax-border-focus)]
          ${kandidatId ? 'cursor-pointer' : 'cursor-default'}
          ${aktiv ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : 'hover:bg-[var(--ax-bg-neutral-moderate-hover)] '}
          ${erLagtTil ? 'border-l-4 border-[var(--ax-border-success)]' : ''}`}
        tabIndex={0}
      >
        <div className='flex flex-row '>
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

          <div className='flex-grow'>
            <div className='flex justify-between'>
              <Heading
                size='small'
                className='flex-1 min-w-0 pr-2 inline-flex items-center gap-1'
              >
                <div
                  data-testid={`kandidatkort-lenke-${kandidat.arenaKandidatnr}`}
                >
                  {hentKandidatensNavn(kandidat)}
                </div>
                {/* {kandidat.arenaKandidatnr && (
                  <Tooltip content='Åpne i ny fane'>
                    <a
                      onClick={stopAllPropagation}
                      onPointerDown={stopAllPropagation}
                      onMouseDown={stopAllPropagation}
                      onAuxClick={stopAllPropagation}
                      target='_blank'
                      href={'/kandidat/' + kandidat.arenaKandidatnr}
                      className='flex-shrink-0 inline-flex items-center text-text-subtle hover:text-text-default'
                    >
                      <ExternalLinkIcon className='shrink-0' />
                    </a>
                  </Tooltip>
                )} */}
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
        </div>
      </Box.New>
    </a>
  );
};

export default KandidatKort;
