import TabellRad from './_ui/TabellRad';
import { kandidatHistorikkSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { useKandidatListeoversikt } from '@/app/api/kandidat/useKandidatListeoversikt';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import SWRLaster from '@/components/SWRLaster';
import SideInnhold from '@/components/layout/SideInnhold';
import { Loader, Table } from '@navikt/ds-react';
import { FC, Fragment } from 'react';

export default function KandidatAktivitet() {
  const { kandidatId } = useJobbsøkerContext();

  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);

  return (
    <SideInnhold lagreScrollNøkkel={`kandidat-aktivitet-${kandidatId}`}>
      <div className='mt-4 w-full overflow-x-scroll'>
        <Table zebraStripes>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope='col'>Dato</Table.HeaderCell>
              <Table.HeaderCell scope='col'>Navn på stilling</Table.HeaderCell>
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
                  <Table.DataCell colSpan={100} className='py-8 text-center'>
                    <Loader size='xsmall' />
                  </Table.DataCell>
                </Table.Row>
              }
            >
              {(data) => {
                return (
                  <>
                    {data
                      ?.sort(
                        (a, b) =>
                          new Date(b.lagtTilTidspunkt).getTime() -
                          new Date(a.lagtTilTidspunkt).getTime(),
                      )
                      .map((i: kandidatHistorikkSchemaDTO) => (
                        <Fragment key={i.uuid}>
                          {i.erMaskert ? (
                            <TabellRad
                              dato={i.lagtTilTidspunkt}
                              arbeidsgiver={i.organisasjonNavn ?? '-'}
                              tittel={i.tittel ?? '-'}
                              stillingId={i.stillingId}
                              lagtTilAv={i.lagtTilAvNavn ?? '-'}
                              status={i.status}
                              erMaskert
                            />
                          ) : i.stillingId ? (
                            <HistoriskStillingRad historikkData={i} />
                          ) : null}
                        </Fragment>
                      ))}
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

const HistoriskStillingRad: FC<{
  historikkData: kandidatHistorikkSchemaDTO;
}> = ({ historikkData }) => {
  const stillingHook = useStilling(historikkData.stillingId);
  return (
    <SWRLaster
      hooks={[stillingHook]}
      skeleton={
        <Table.Row>
          <Table.DataCell colSpan={100} className='py-8 text-center'>
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
              historikkData.utfall === KandidatHendelseType.Fått_jobben
            }
          />
        );
      }}
    </SWRLaster>
  );
};
