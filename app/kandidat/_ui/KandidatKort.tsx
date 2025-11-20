import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { useKandidatSøkMarkerteContext } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { alleInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  hentKandidatensNavn,
  hentKandidatensØnskedeSteder,
  hentKandidatensØnskedeYrker,
} from '@/app/kandidat/util';
import TekstMedIkon from '@/components/TekstMedIkon';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import { HandShakeHeartIcon, HouseIcon, PinIcon } from '@navikt/aksel-icons';
import { Checkbox, Heading, Tag } from '@navikt/ds-react';
import { FC } from 'react';

type IKandidatKort = {
  kandidat: KandidatDataSchemaDTO;
  alleredeLagtTil?: string[];
  stillingsId?: string;
};

type KandidatKortInnholdProps = {
  kandidat: KandidatDataSchemaDTO;
  erMarkert: boolean;
  erLagtTil: boolean;
  kandidatId?: string | null;
  setMarkert: (arenaKandidatnr: string) => void;
};

const KandidatKortInnhold = ({
  kandidat,
  erMarkert,
  erLagtTil,
  kandidatId,
  setMarkert,
}: KandidatKortInnholdProps) => {
  const erBesokt = useWindowAnkerVisited();

  return (
    <ListeKort
      className={`${kandidatId ? 'cursor-pointer' : 'cursor-default'} ${erLagtTil ? 'border-l-4 border-[var(--ax-border-success)]' : ''}`}
    >
      <div className='flex flex-row'>
        <div>
          <Checkbox
            key={`${kandidat.arenaKandidatnr}-${erMarkert}`}
            disabled={!kandidat.arenaKandidatnr || erLagtTil}
            checked={erMarkert || erLagtTil}
            aria-selected={erMarkert}
            hideLabel
            className='-mt-2 mr-4'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.stopPropagation();
              if (kandidat.arenaKandidatnr) {
                setMarkert(kandidat.arenaKandidatnr);
              }
            }}
          >
            Checkbox
          </Checkbox>
        </div>

        <div className='flex-grow'>
          <div className='flex justify-between'>
            <Heading
              size='small'
              className={`inline-flex min-w-0 flex-1 items-center gap-1 pr-2 ${erBesokt ? 'text-text-subtle font-normal' : ''}`}
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
            <div className='mt-2 flex flex-col gap-4 @xl:flex-row'>
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
    </ListeKort>
  );
};

const KandidatKort: FC<IKandidatKort> = ({
  kandidat,
  alleredeLagtTil,
  stillingsId,
}) => {
  const { markerteKandidater, setMarkert } = useKandidatSøkMarkerteContext();
  const erMarkert = Boolean(
    markerteKandidater?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const erLagtTil = Boolean(
    alleredeLagtTil?.some((k) => k === kandidat.arenaKandidatnr),
  );

  const kandidatId = kandidat.arenaKandidatnr;

  const getWindowRefWithParams = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('visKandidatId', kandidat.arenaKandidatnr || '');

    const basePath = stillingsId
      ? `/stilling/${stillingsId}/finn-kandidater`
      : `/kandidat`;

    return kandidat.arenaKandidatnr
      ? `${basePath}?${currentParams.toString()}`
      : '#';
  };

  return (
    <WindowAnker
      windowRef={getWindowRefWithParams()}
      href={
        stillingsId
          ? `/stilling/${stillingsId}/finn-kandidater/${kandidat.arenaKandidatnr}`
          : kandidat.arenaKandidatnr
            ? `/kandidat/${kandidat.arenaKandidatnr}`
            : '#'
      }
    >
      <KandidatKortInnhold
        kandidat={kandidat}
        erMarkert={erMarkert}
        erLagtTil={erLagtTil}
        kandidatId={kandidatId}
        setMarkert={setMarkert}
      />
    </WindowAnker>
  );
};

export default KandidatKort;
