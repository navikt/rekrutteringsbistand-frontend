import { usynligKandidaterSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import { formaterNorskDato } from '../../../../../components/util';
import { KANDIDATLISTE_COLUMN_LAYOUT } from '../../FiltrertKandidatListeVisning';
import { KandidatutfallTyper } from '../../KandidatTyper';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import KandidatHendelseTagVisning, {
  SlettetTag,
} from '../KandidatHendelseTagVisning';
import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from '../KandidatHendelser/KandidatHendelseTag';
import { KandidatHendelseInformasjon } from '../KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import VelgInternStatus from '../VelgInternStatus';
import KandidatCheckbox from './components/KandidatCheckbox';
import KandidatListeKortValg from './components/KandidatListeKortValg';
import KandidatlisteNavn from './components/KandidatlisteNavn';
import { BodyShort, Box } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export interface KandidatListeKortProps {
  kandidat?: KandidatVisningProps;
  usynligKandidat?: usynligKandidaterSchemaDTO;
}

const KandidatListeKort: React.FC<KandidatListeKortProps> = ({
  kandidat,
  usynligKandidat,
}) => {
  const kolonneStyling = 'break-words';
  <div className={kolonneStyling}></div>;
  const { lukketKandidatliste, kandidatlisteId } = useKandidatlisteContext();

  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

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

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (kandidat) {
    const aktiv = visKandidatnr === kandidat.kandidatnr;
    return (
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
            <BodyShort textColor='subtle'> {kandidat.lagtTilAv.navn}</BodyShort>
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
    );
  }

  return null;
};

export default KandidatListeKort;
