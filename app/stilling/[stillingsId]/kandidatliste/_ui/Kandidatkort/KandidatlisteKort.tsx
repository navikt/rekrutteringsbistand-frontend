import KandidatCheckbox from './_ui/KandidatCheckbox';
import KandidatListeKortValg from './_ui/KandidatListeKortValg';
import KandidatlisteNavn from './_ui/KandidatlisteNavn';
import { usynligKandidaterSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KANDIDATLISTE_COLUMN_LAYOUT } from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import KandidatHendelseTagVisning, {
  SlettetTag,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelseTagVisning';
import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import { KandidatHendelseInformasjon } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import VelgInternStatus from '@/app/stilling/[stillingsId]/kandidatliste/_ui/VelgInternStatus';
import VisKandidatModal from '@/components/modal/kandidat/VisKandidatModal';
import { formaterNorskDato } from '@/util/util';
import { BodyShort, Box } from '@navikt/ds-react';
import { FC, MouseEvent, useState } from 'react';

export interface KandidatListeKortProps {
  kandidat?: KandidatVisningProps;
  usynligKandidat?: usynligKandidaterSchemaDTO;
}

const kolonneStyling = 'break-words';

const KandidatListeKort: FC<KandidatListeKortProps> = ({
  kandidat,
  usynligKandidat,
}) => {
  const stillingsContext = useNullableStillingsContext();
  const { lukketKandidatliste, kandidatlisteId } = useKandidatlisteContext();

  const [visKandidatnr, setVisKandidatnr] = useState<string | null>(null);

  if (usynligKandidat) {
    const fåttJobben =
      usynligKandidat.utfall === KandidatutfallTyper.FATT_JOBBEN;

    const usynligHendelse: KandidatHendelseInformasjon = fåttJobben
      ? {
          type: KandidatHendelseType.Fått_jobben,
          tag: <KandidatHendelseTag type={KandidatHendelseType.Fått_jobben} />,
          tekst:
            formaterNorskDato({
              dato: usynligKandidat.lagtTilTidspunkt,
              visning: 'kortMåned',
            }) ?? '',
          dato: new Date(usynligKandidat.lagtTilTidspunkt),
          raw: usynligKandidat,
        }
      : {
          type: KandidatHendelseType.Fjernet_fått_jobben,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.Fjernet_fått_jobben}
            />
          ),
          tekst:
            formaterNorskDato({
              dato: usynligKandidat.lagtTilTidspunkt,
              visning: 'kortMåned',
            }) ?? '',
          dato: null,
          raw: usynligKandidat,
        };
    return (
      <Box.New
        padding='4'
        background='neutral-moderate'
        borderRadius='xlarge'
        data-testid='stillings-kort'
        className='min-w-fit'
      >
        <div
          className={`grid ${KANDIDATLISTE_COLUMN_LAYOUT} gap-x-3 items-center `}
        >
          <div className={kolonneStyling}>
            <div className='flex gap-4'>
              <KandidatCheckbox />
              <KandidatlisteNavn usynligKandidat={usynligKandidat} />
            </div>
          </div>
          <div className={kolonneStyling}>
            <div className={'flex flex-col items-start'}>
              <BodyShort>
                {formaterNorskDato({
                  dato: usynligKandidat.lagtTilTidspunkt,
                  visning: 'kortMåned',
                })}
              </BodyShort>
              <BodyShort textColor='subtle'>
                {usynligKandidat.lagtTilAvNavn}
              </BodyShort>
            </div>
          </div>
          <div>{usynligHendelse?.tag}</div>
        </div>
      </Box.New>
    );
  }

  const slettet = kandidat?.arkivert;
  const inaktiv = kandidat?.fodselsnr === null;

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  if (kandidat) {
    // const aktiv = visKandidatnr === kandidat.kandidatnr;
    const aktiv = false;
    return (
      <>
        {visKandidatnr && (
          <VisKandidatModal
            tittel={
              stillingsContext?.stillingsData.stilling.title ??
              'Viser jobbsøker'
            }
            stillingsId={stillingsContext?.stillingsData.stilling.uuid}
            kandidatNr={visKandidatnr}
            onClose={() => setVisKandidatnr(null)}
          />
        )}
        <Box.New
          onClick={() =>
            !inaktiv ? setVisKandidatnr(kandidat?.kandidatnr ?? '') : null
          }
          padding='4'
          background='neutral-softA'
          borderRadius='xlarge'
          data-testid='stillings-kort'
          className={` min-w-fit 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ax-border-focus)]
          ${!aktiv && !inaktiv ? 'hover:bg-[var(--ax-bg-neutral-moderate-hover)] cursor-pointer ' : ''}
          ${aktiv ? 'bg-[var(--ax-bg-neutral-moderate-pressed)]' : ''}`}
          tabIndex={0}
        >
          <div
            className={`grid ${KANDIDATLISTE_COLUMN_LAYOUT} gap-x-3 items-center `}
          >
            <div className={`${kolonneStyling} flex flex-col gap-2`}>
              <div className='flex gap-4'>
                <div onClick={stopPropagation}>
                  <KandidatCheckbox kandidat={kandidat} slettet={slettet} />
                </div>
                <KandidatlisteNavn kandidat={kandidat} slettet={slettet} />
              </div>
            </div>
            <div className={`${kolonneStyling} flex flex-col `}>
              <BodyShort>
                {formaterNorskDato({
                  dato: kandidat.lagtTilTidspunkt,
                  visning: 'kortMåned',
                })}
              </BodyShort>
              <BodyShort textColor='subtle'>
                {' '}
                {kandidat.lagtTilAv.navn}
              </BodyShort>
            </div>
            <div className={`${kolonneStyling} flex flex-col `}>
              {slettet ? (
                <SlettetTag kandidat={kandidat} />
              ) : (
                <KandidatHendelseTagVisning
                  kandidatHendelse={kandidat.kandidatHendelser.sisteHendelse}
                />
              )}
            </div>
            <div className={`${kolonneStyling} flex flex-col `}>
              <div>{kandidat.kandidatHendelser.sisteSms?.tag}</div>
              <div />
            </div>
            <div className={kolonneStyling} onClick={stopPropagation}>
              <VelgInternStatus
                lukketKandidatliste={lukketKandidatliste}
                kandidatnr={kandidat.kandidatnr}
                status={kandidat.status}
              />
            </div>
            <div
              className={`${kolonneStyling} flex items-center justify-center`}
              onClick={stopPropagation}
            >
              <KandidatListeKortValg
                kandidat={kandidat}
                kandidatlisteId={kandidatlisteId}
              />
            </div>
          </div>
        </Box.New>
      </>
    );
  }

  return null;
};

export default KandidatListeKort;
