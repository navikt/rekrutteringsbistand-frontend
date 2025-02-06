import { Table } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstavString } from '../../../../kandidat-sok/util';
import { Kandidatutfall } from '../KandidatIKandidatlisteTyper';
import HendelseTag from './HendelseTag';

export interface UsynligKandidatRadProps {
  fornavn?: string;
  etternavn?: string;
  utfall?: Kandidatutfall;
}

const UsynligKandidatRad: React.FC<UsynligKandidatRadProps> = ({
  fornavn,
  etternavn,
  utfall,
}) => {
  return (
    <Table.Row className='bg-blue-50'>
      <Table.DataCell colSpan={2} />
      <Table.DataCell>
        {storForbokstavString(etternavn ?? '')},{' '}
        {storForbokstavString(fornavn ?? '')}
      </Table.DataCell>
      <Table.DataCell colSpan={5}>
        Ikke synlig i Rekrutteringsbistand
      </Table.DataCell>
      <Table.DataCell colSpan={2}>
        {utfall && (
          <HendelseTag
            ikkeVisÅrstall
            utfall={utfall}
            utfallsendringer={[]}
            forespørselOmDelingAvCv={undefined}
            sms={null}
          />
        )}
      </Table.DataCell>
    </Table.Row>
  );
};

export default UsynligKandidatRad;
