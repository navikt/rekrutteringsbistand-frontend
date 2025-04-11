import { usynligKandidaterSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import { KANDIDATLISTE_COLUMN_LAYOUT } from '../../FiltrertKandidatListeVisning';
import { useKandidatlisteContext } from '../../KandidatlisteContext';
import { mapToHendelser } from '../KandidatHendelse';
import KandidatHendelseTag from '../KandidatHendelseTag';
import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import SletteKandidatKnapp from '../SlettKandidatModal';
import VelgInternStatus from '../VelgInternStatus';
import KandidatCheckbox from './components/KandidatCheckbox';
import KandidatlisteNavn from './components/KandidatlisteNavn';
import { BodyShort, Box } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
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

  const {
    forespurteKandidater,
    beskjeder,
    lukketKandidatliste,
    kandidatliste,
  } = useKandidatlisteContext();

  if (usynligKandidat) {
    return (
      <Box.New
        padding='4'
        background='neutral-moderate'
        borderRadius='xlarge'
        data-testid='stillings-kort'
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
            <div>
              <BodyShort> {usynligKandidat.lagtTilAvNavn}</BodyShort>
              <BodyShort textColor='subtle'>
                {format(usynligKandidat.lagtTilTidspunkt, 'dd. MMM yyyy', {
                  locale: nb,
                })}
              </BodyShort>
            </div>
          </div>
        </div>
      </Box.New>
    );
  }

  if (kandidat) {
    const forespørselCvForKandidat =
      kandidat.aktørid && forespurteKandidater
        ? forespurteKandidater[kandidat.aktørid]
        : null;

    const beskjedForKandidat = beskjeder && beskjeder[kandidat.fodselsnr ?? ''];

    const kandidatHendelser = mapToHendelser({
      kandidat,
      forespørselCvForKandidat,
      beskjedForKandidat,
    });

    const sisteAktivitet = kandidatHendelser.filter(
      (h) => h.kilde !== 'Sms',
    )[0];
    const sisteSms = kandidatHendelser.filter((h) => h.kilde === 'Sms')[0];

    return (
      <Box.New
        padding='4'
        background='neutral-softA'
        borderRadius='xlarge'
        data-testid='stillings-kort'
      >
        <div
          className={`grid ${KANDIDATLISTE_COLUMN_LAYOUT} gap-x-3 items-center `}
        >
          <div className={kolonneStyling}>
            <div className='flex gap-4'>
              <KandidatCheckbox kandidat={kandidat} />
              <KandidatlisteNavn kandidat={kandidat} />
            </div>
          </div>
          <div className={kolonneStyling}>
            <div>
              <BodyShort> {kandidat.lagtTilAv.navn}</BodyShort>
              <BodyShort textColor='subtle'>
                {format(kandidat.lagtTilTidspunkt, 'dd. MMM yyyy', {
                  locale: nb,
                })}
              </BodyShort>
            </div>
          </div>
          <div className={kolonneStyling}>
            <KandidatHendelseTag kandidatHendelse={sisteAktivitet} />
          </div>
          <div className={kolonneStyling}>
            <KandidatHendelseTag kandidatHendelse={sisteSms} />
          </div>
          <div className={kolonneStyling}>
            <VelgInternStatus
              lukketKandidatliste={lukketKandidatliste}
              kandidatlisteId={kandidatliste.kandidatlisteId}
              kandidatnr={kandidat.kandidatnr}
              status={kandidat.status}
            />
          </div>
          <div className={`${kolonneStyling} flex items-center justify-center`}>
            <SletteKandidatKnapp
              lukketKandidatliste={lukketKandidatliste}
              kandidat={kandidat}
              kandidatlisteId={kandidatliste.kandidatlisteId}
            />
          </div>
        </div>
      </Box.New>
    );
  }

  return null;
};

export default KandidatListeKort;
