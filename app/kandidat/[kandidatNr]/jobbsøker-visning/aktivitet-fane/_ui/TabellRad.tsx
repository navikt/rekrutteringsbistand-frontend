import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import InternStatusTag from '@/app/stilling/[stillingsId]/kandidatliste/_ui/InternStatusTag';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { Link, Table, Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import { FC } from 'react';

export interface TabellRadProps {
  erMaskert: boolean;
  dato?: string;
  tittel?: string;
  arbeidsgiver?: string;
  lagtTilAv?: string;
  status?: string;
  stillingskategori?: string | null;
  stillingId?: string | null;
  fåttJobben?: boolean;
}

const TabellRad: FC<TabellRadProps> = ({
  dato,
  tittel,
  erMaskert,
  arbeidsgiver,
  lagtTilAv,
  status,
  stillingskategori,
  stillingId,
  fåttJobben,
}) => {
  const erEtterregistrering =
    stillingskategori !== null &&
    stillingskategori === Stillingskategori.Formidling;
  return (
    <Table.Row>
      <Table.HeaderCell scope='row'>
        {dato ? format(new Date(dato), 'dd.MM.yyyy') : ''}
      </Table.HeaderCell>
      <Table.DataCell>
        {erMaskert ? (
          <span className='text-red-600'>Ingen tilgang</span>
        ) : erEtterregistrering ? (
          <Link href={`/etterregistrering/${stillingId}`}>{tittel}</Link>
        ) : (
          <Link href={`/stilling/${stillingId}`}>{tittel}</Link>
        )}
      </Table.DataCell>
      <Table.DataCell>{arbeidsgiver}</Table.DataCell>
      <Table.DataCell>{lagtTilAv}</Table.DataCell>
      <Table.DataCell>
        <div className='flex items-center gap-2'>
          <InternStatusTag status={(status ?? '') as InternKandidatstatus} />
          {fåttJobben && (
            <Tag size='small' variant='success'>
              Fått jobben
            </Tag>
          )}
        </div>
      </Table.DataCell>
    </Table.Row>
  );
};

export default TabellRad;
