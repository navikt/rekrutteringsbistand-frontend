import { Loader, Table } from '@navikt/ds-react';
import * as React from 'react';
import { kandidatHistorikkSchemaDTO } from '../../../api/kandidat/schema.zod';
import { useKandidatListeoversikt } from '../../../api/kandidat/useKandidatListeoversikt';
import { useStilling } from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import SWRLaster from '../../../components/SWRLaster';
import { useKandidatContext } from '../KandidatContext';
import TabellRad from './components/TabellRad';

const KandidatAktivitet: React.FC = () => {
  const { kandidatId } = useKandidatContext();

  const kandidatListeoversiktHook = useKandidatListeoversikt(kandidatId);

  return (
    <div className='mt-4'>
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
                <Table.DataCell colSpan={100} className='text-center py-8'>
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
                      <React.Fragment key={i.uuid}>
                        {i.erMaskert ? (
                          <TabellRad
                            dato={i.lagtTilTidspunkt}
                            arbeidsgiver={i.organisasjonNavn}
                            tittel={i.tittel}
                            stillingId={i.stillingId}
                            lagtTilAv={i.lagtTilAvNavn}
                            status={i.status}
                            erMaskert
                          />
                        ) : i.stillingId ? (
                          <HistoriskStillingRad historikkData={i} />
                        ) : null}
                      </React.Fragment>
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
};

const HistoriskStillingRad: React.FC<{
  historikkData: kandidatHistorikkSchemaDTO;
}> = ({ historikkData }) => {
  const stillingHook = useStilling(historikkData.stillingId);
  return (
    <SWRLaster
      hooks={[stillingHook]}
      skeleton={
        <Table.Row>
          <Table.DataCell colSpan={100} className='text-center py-8'>
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
            erMaskert={historikkData.erMaskert}
            arbeidsgiver={
              data?.stilling?.businessName ?? historikkData.organisasjonNavn
            }
            lagtTilAv={historikkData.lagtTilAvNavn}
            status={historikkData.status}
          />
        );
      }}
    </SWRLaster>
  );
};

export default KandidatAktivitet;
