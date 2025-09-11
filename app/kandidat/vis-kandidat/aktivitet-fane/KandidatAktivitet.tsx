import TabellRad from './_ui/TabellRad';
import { kandidatHistorikkSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { useKandidatListeoversikt } from '@/app/api/kandidat/useKandidatListeoversikt';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import SWRLaster from '@/components/SWRLaster';
import { Loader, Table } from '@navikt/ds-react';
import { Fragment } from 'react';

export default function KandidatAktivitet() {
  const { kandidatId } = useKandidatContext();

  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);

  return (
    <div className='mt-4 w-full'>
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
          {/* {data.map(({ name, fnr, start }, i) => {
          return (
            <Table.Row key={i + fnr}>
              <Table.HeaderCell scope='row'>{name}</Table.HeaderCell>
              <Table.DataCell>{fnr}</Table.DataCell>
              <Table.DataCell>{format(new Date(start))}</Table.DataCell>
            </Table.Row>
          );
        })} */}
        </Table.Body>
      </Table>
    </div>
  );
}

const HistoriskStillingRad: React.FC<{
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
          />
        );
      }}
    </SWRLaster>
  );
};
