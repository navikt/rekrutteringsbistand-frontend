import TabellRad from './_ui/TabellRad';
import { kandidatHistorikkSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { useKandidatListeoversikt } from '@/app/api/kandidat/useKandidatListeoversikt';
import {
  JobbsøkerTreffHistorikk,
  useJobbsøkerTreff,
} from '@/app/api/rekrutteringstreff/jobbsoker/useJobbsøkerTreff';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import JobbsøkerStatusTag from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/JobbsøkerStatusTag';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import SWRLaster from '@/components/SWRLaster';
import SideInnhold from '@/components/layout/SideInnhold';
import { Alert, Link, Loader, Table, Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC, Fragment } from 'react';

export default function KandidatAktivitet() {
  const { kandidatId, kandidatData } = useJobbsøkerContext();

  return (
    <KandidatAktivitetInnhold
      key={`${kandidatId}-${kandidatData.fodselsnummer}`}
      kandidatId={kandidatId}
      fødselsnummer={kandidatData.fodselsnummer ?? null}
    />
  );
}

function KandidatAktivitetInnhold({
  kandidatId,
  fødselsnummer,
}: {
  kandidatId: string;
  fødselsnummer: string | null;
}) {
  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);
  const rekrutteringstreff = useJobbsøkerTreff(fødselsnummer);

  return (
    <SideInnhold lagreScrollNøkkel={`kandidat-aktivitet-${kandidatId}`}>
      <div className='mt-4 w-full overflow-x-scroll'>
        <Table zebraStripes>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope='col'>Dato</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Type</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Arbeidsgiver</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Lagt til av</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Status/hendelse</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <SWRLaster
              hooks={[kandidatListeoversiktHook]}
              skeleton={
                <Table.Row>
                  <Table.DataCell colSpan={6} className='py-8 text-center'>
                    <Loader size='xsmall' />
                  </Table.DataCell>
                </Table.Row>
              }
            >
              {(data) => {
                const aktiviteter = [
                  ...(data ?? []).map((historikk) => ({
                    type: 'stilling' as const,
                    historikk,
                    tidspunkt: historikk.lagtTilTidspunkt,
                  })),
                  ...(rekrutteringstreff.data ?? []).map(
                    (historikk, index) => ({
                      type: 'rekrutteringstreff' as const,
                      historikk,
                      index,
                      tidspunkt: historikk.lagtTilTidspunkt,
                    }),
                  ),
                ].sort(
                  (a, b) =>
                    (b.tidspunkt
                      ? new Date(b.tidspunkt).getTime()
                      : -Infinity) -
                    (a.tidspunkt ? new Date(a.tidspunkt).getTime() : -Infinity),
                );

                return (
                  <>
                    {aktiviteter.map((aktivitet) =>
                      aktivitet.type === 'rekrutteringstreff' ? (
                        <RekrutteringstreffRad
                          key={`treff-${aktivitet.index}`}
                          historikk={aktivitet.historikk}
                        />
                      ) : (
                        <Fragment key={aktivitet.historikk.uuid}>
                          {aktivitet.historikk.erMaskert ? (
                            <TabellRad
                              dato={aktivitet.historikk.lagtTilTidspunkt}
                              arbeidsgiver={
                                aktivitet.historikk.organisasjonNavn ?? '-'
                              }
                              tittel={aktivitet.historikk.tittel ?? '-'}
                              stillingskategori={
                                aktivitet.historikk.stillingskategori
                              }
                              stillingId={aktivitet.historikk.stillingId}
                              lagtTilAv={
                                aktivitet.historikk.lagtTilAvNavn ?? '-'
                              }
                              status={aktivitet.historikk.status}
                              erMaskert
                            />
                          ) : aktivitet.historikk.stillingId ? (
                            <HistoriskStillingRad
                              historikkData={aktivitet.historikk}
                            />
                          ) : null}
                        </Fragment>
                      ),
                    )}
                    {!rekrutteringstreff.data && !rekrutteringstreff.feil && (
                      <Table.Row>
                        <Table.DataCell
                          colSpan={6}
                          className='py-8 text-center'
                        >
                          <Loader
                            size='xsmall'
                            title='Laster rekrutteringstreff'
                          />
                        </Table.DataCell>
                      </Table.Row>
                    )}
                    {rekrutteringstreff.feil && (
                      <Table.Row>
                        <Table.DataCell colSpan={6}>
                          <Alert variant='error'>
                            Kunne ikke hente rekrutteringstreff.
                          </Alert>
                        </Table.DataCell>
                      </Table.Row>
                    )}
                  </>
                );
              }}
            </SWRLaster>
          </Table.Body>
        </Table>
      </div>
    </SideInnhold>
  );
}

const RekrutteringstreffRad: FC<{
  historikk: JobbsøkerTreffHistorikk;
}> = ({ historikk }) => (
  <Table.Row>
    <Table.HeaderCell scope='row'>
      {historikk.lagtTilTidspunkt
        ? format(new Date(historikk.lagtTilTidspunkt), 'dd.MM.yyyy')
        : ''}
    </Table.HeaderCell>
    <Table.DataCell>
      {historikk.id ? (
        <Link href={`/rekrutteringstreff/${historikk.id}`}>
          {historikk.tittel}
        </Link>
      ) : (
        historikk.tittel
      )}
    </Table.DataCell>
    <Table.DataCell>
      <Tag
        size='small'
        variant='outline'
        data-color={
          historikk.kategori === RekrutteringstreffKategori.WORKOP
            ? 'meta-purple'
            : 'info'
        }
      >
        {historikk.kategori === RekrutteringstreffKategori.WORKOP
          ? 'WorkOp'
          : 'Rekrutteringstreff'}
      </Tag>
    </Table.DataCell>
    <Table.DataCell>
      {historikk.antallArbeidsgivere}{' '}
      {historikk.antallArbeidsgivere === 1 ? 'arbeidsgiver' : 'arbeidsgivere'}
    </Table.DataCell>
    <Table.DataCell>{historikk.lagtTilAvNavn ?? ''}</Table.DataCell>
    <Table.DataCell>
      <JobbsøkerStatusTag status={historikk.status} size='small' />
    </Table.DataCell>
  </Table.Row>
);

const HistoriskStillingRad: FC<{
  historikkData: kandidatHistorikkSchemaDTO;
}> = ({ historikkData }) => {
  const stillingHook = useStilling(historikkData.stillingId);
  return (
    <SWRLaster
      hooks={[stillingHook]}
      skeleton={
        <Table.Row>
          <Table.DataCell colSpan={6} className='py-8 text-center'>
            <Loader size='xsmall' />
          </Table.DataCell>
        </Table.Row>
      }
    >
      {(data) => {
        return (
          <TabellRad
            dato={historikkData.lagtTilTidspunkt}
            tittel={data.stilling.title}
            stillingskategori={historikkData.stillingskategori}
            stillingId={historikkData.stillingId}
            erMaskert={historikkData.erMaskert ?? false}
            arbeidsgiver={
              data?.stilling?.businessName ??
              historikkData.organisasjonNavn ??
              '-'
            }
            lagtTilAv={historikkData.lagtTilAvNavn}
            status={historikkData.status}
            fåttJobben={
              historikkData.utfall === KandidatutfallTyper.FATT_JOBBEN
            }
          />
        );
      }}
    </SWRLaster>
  );
};
