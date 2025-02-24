import { PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Checkbox, Link, Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import * as React from 'react';
import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { endreUtfallKandidat } from '../../../../api/kandidat/endreKandidatUtfall';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { Sms } from '../../../../api/kandidatvarsel/kandidatvarsel';
import { useApplikasjonContext } from '../../../../ApplikasjonContext';
import FeilDialog from '../../../../components/feilhåndtering/Feildialog';
import InfoOmKandidat from './InfoOmKandidat';
import SletteKandidatKnapp from './KandidatDropdown';
import KandidatHendelse, { mapToHendelser } from './KandidatHendelse';
import KandidatHendelseTag from './KandidatHendelseTag';
import { InternKandidatstatus, KandidatutfallTyper } from './KandidatTyper';
import VelgInternStatus from './VelgInternStatus';

export interface KandidatRadProps {
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat: Sms | null;
  markerteKandidater: kandidaterSchemaDTO[];
  markerKandidat: (kandidat: kandidaterSchemaDTO) => void;
  kandidatlisteId: string;
  stillingsId: string;
  reFetchKandidatliste: () => void;
}

const KandidatRad: React.FC<KandidatRadProps> = ({
  kandidat,
  forespørselCvForKandidat,
  beskjedForKandidat,
  markerteKandidater,
  markerKandidat,
  kandidatlisteId,
  stillingsId,
  reFetchKandidatliste,
}) => {
  const innaktiv = !kandidat.fodselsnr;
  const { valgtNavKontor } = useApplikasjonContext();
  const kandidatHendelser = mapToHendelser({
    kandidat,
    forespørselCvForKandidat,
    beskjedForKandidat,
  });

  const sisteAktivitet = kandidatHendelser.filter((h) => h.kilde !== 'Sms')[0];
  const sisteSms = kandidatHendelser.filter((h) => h.kilde === 'Sms')[0];

  const sisteUtfall = kandidat.utfallsendringer.find(
    (u) =>
      u.tidspunkt ===
      kandidat.utfallsendringer.sort((a, b) =>
        a.tidspunkt.localeCompare(b.tidspunkt),
      )[0].tidspunkt,
  )?.utfall;

  const [endrerUtfall, setEndrerUtfall] = React.useState(false);
  const [feilDialog, setFeilDialog] = React.useState<string | null>(null);
  const endreUtfallForKandidat = async (utfall: KandidatutfallTyper) => {
    setEndrerUtfall(true);
    try {
      await endreUtfallKandidat(
        utfall,
        valgtNavKontor?.navKontor ?? '',
        kandidatlisteId,
        kandidat.kandidatnr,
      );
      reFetchKandidatliste();
      setFeilDialog(null);
    } catch (error) {
      setFeilDialog(
        error instanceof Error ? error.message : 'En ukjent feil oppstod',
      );
    }
    setEndrerUtfall(false);
  };

  return (
    <Table.ExpandableRow
      content={
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2'>
            <KandidatHendelse
              kandidatHendelser={kandidatHendelser}
              endreUtfallForKandidat={endreUtfallForKandidat}
            />
          </div>
          <div className='col-span-1'>
            {sisteUtfall !== KandidatutfallTyper.FATT_JOBBEN && (
              <Button
                className=' mb-4 w-full'
                icon={<PlusCircleIcon />}
                onClick={() =>
                  endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)
                }
                loading={endrerUtfall}
              >
                Registrer fått jobben
              </Button>
            )}
            <FeilDialog
              isOpen={!!feilDialog}
              onRetry={() =>
                endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)
              }
              errorMessage={feilDialog ?? 'Ukjent feil'}
            />
            {!innaktiv && <InfoOmKandidat kandidat={kandidat} />}
          </div>
        </div>
      }
      selected={markerteKandidater.includes(kandidat)}
    >
      <Table.DataCell>
        <Checkbox
          disabled={innaktiv}
          hideLabel
          checked={markerteKandidater.includes(kandidat)}
          onChange={() => markerKandidat(kandidat)}
          aria-labelledby={`id-${kandidat.fodselsnr}`}
        >
          {' '}
        </Checkbox>
      </Table.DataCell>
      <Table.DataCell scope='row'>
        <div>
          {innaktiv ? (
            <span>
              {kandidat.etternavn}, {kandidat.fornavn}
            </span>
          ) : (
            <Link
              href={`/kandidat/${kandidat.kandidatnr}`}
              id={`id-${kandidat.fodselsnr}`}
            >
              {kandidat.etternavn}, {kandidat.fornavn}
            </Link>
          )}
          <BodyShort> {kandidat.fodselsnr ?? 'Innaktiv'}</BodyShort>
        </div>
      </Table.DataCell>

      <Table.DataCell>
        {format(kandidat.lagtTilTidspunkt, 'dd. MMM yyyy', {
          locale: nb,
        })}
      </Table.DataCell>
      <Table.DataCell>
        <VelgInternStatus
          kandidatlisteId={kandidatlisteId}
          kandidatnr={kandidat.kandidatnr}
          status={kandidat.status as InternKandidatstatus}
        />
      </Table.DataCell>
      <Table.DataCell>
        <KandidatHendelseTag kandidatHendelse={sisteAktivitet} />
      </Table.DataCell>
      <Table.DataCell>
        <KandidatHendelseTag kandidatHendelse={sisteSms} />
      </Table.DataCell>
      <Table.DataCell>
        <div className='flex items-baseline flex-end'>
          <SletteKandidatKnapp kandidat={kandidat} stillingsId={stillingsId} />
        </div>
      </Table.DataCell>
    </Table.ExpandableRow>
  );
};

export default KandidatRad;
