import { Table } from '@navikt/ds-react';
import * as React from 'react';
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
    <Table.Row className='bg-red-50'>
      <Table.DataCell colSpan={2} />
      <Table.DataCell>
        {etternavn}, {fornavn}
      </Table.DataCell>
      <Table.DataCell colSpan={5}>
        Innaktiv / Ikke synlig i Rekrutteringsbistand
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
