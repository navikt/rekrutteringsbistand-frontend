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
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import WindowAnker, {
  useWindowAnkerVisited,
} from '@/components/window/WindowAnker';
import {
  finnKandidaterAnker,
  kandidatAnker,
} from '@/components/window/ankerLenker';
import { HandShakeHeartIcon, HouseIcon, PinIcon } from '@navikt/aksel-icons';
import { Checkbox, Heading, Tag } from '@navikt/ds-react';
import { FC } from 'react';

type IKandidatKort = {
  kandidat: KandidatDataSchemaDTO;
  // alleredeLagtTil er arenaKandidatnr(stilling/kandidatliste)) eller fødselsnummer(rekrutteringstreff lagrer ikke arenakandidatnummer)
  alleredeLagtTil?: string[];
  stillingsId?: string;
  rekrutteringstreffId?: string;
};

type KandidatKortInnholdProps = {
  kandidat: KandidatDataSchemaDTO;
  erMarkert: boolean;
  erLagtTil: boolean;
  kandidatId?: string | null;
  setMarkert: (arenaKandidatnr: string) => void;
  stillingsId?: string;
  rekrutteringstreffId?: string;
};

const KandidatKortInnhold = ({
  kandidat,
  erMarkert,
  erLagtTil,
  kandidatId,
  setMarkert,
  stillingsId,
  rekrutteringstreffId,
}: KandidatKortInnholdProps) => {
  const erBesokt = useWindowAnkerVisited();

  return (
    <ListeKort
      className={`${kandidatId ? 'cursor-pointer' : 'cursor-default'} ${erLagtTil ? 'border-l-4 border-[var(--ax-border-success)]' : ''}`}
    >
      <div className='flex flex-row'>
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={
            stillingsId || rekrutteringstreffId
              ? [
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                ]
              : [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]
          }
        >
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
        </TilgangskontrollForInnhold>

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
  rekrutteringstreffId,
}) => {
  const { markerteKandidater, setMarkert } = useKandidatSøkMarkerteContext();
  const erMarkert = Boolean(
    markerteKandidater?.some((k) => k === kandidat.arenaKandidatnr),
  );

  // Sjekker mot både fødselsnummer (rekrutteringstreff) og arenaKandidatnr (stilling/kandidatliste)
  const erLagtTil = Boolean(
    alleredeLagtTil?.some(
      (k) => k === kandidat.fodselsnummer || k === kandidat.arenaKandidatnr,
    ),
  );

  const kandidatId = kandidat.arenaKandidatnr;

  const anker =
    kandidatId && stillingsId
      ? finnKandidaterAnker(stillingsId, kandidatId)
      : kandidatId
        ? kandidatAnker(kandidatId)
        : null;

  return (
    <WindowAnker windowRef={anker?.windowRef ?? '#'} href={anker?.href ?? '#'}>
      <KandidatKortInnhold
        kandidat={kandidat}
        erMarkert={erMarkert}
        erLagtTil={erLagtTil}
        kandidatId={kandidatId}
        setMarkert={setMarkert}
        stillingsId={stillingsId}
        rekrutteringstreffId={rekrutteringstreffId}
      />
    </WindowAnker>
  );
};

export default KandidatKort;
