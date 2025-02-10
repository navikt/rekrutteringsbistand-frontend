import { Alert, Box, Button, Heading, Search, Table } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';
import * as React from 'react';
import {
  Kandidatnavn,
  useKandidatNavn,
} from '../../api/kandidat-sok/useKandidatNavn';

export interface LeggTilKandidaterProps {
  children?: React.ReactNode | undefined;
}

interface ValgtKandidatProp extends Kandidatnavn {
  fødselsnummer: string;
}

const validerFnr = (fnr: string): boolean => idnr(fnr).status === 'valid';

const LeggTilKandidater: React.FC<LeggTilKandidaterProps> = ({ children }) => {
  const [feilmelding, setFeilmelding] = React.useState('');
  const [valgteKandidater, setValgteKandidater] = React.useState<
    ValgtKandidatProp[]
  >([]);
  const [fødselsnummer, setFødselsnummer] = React.useState<string | null>(null);
  const [laster, setLaster] = React.useState(false);
  const kandidatNavn = useKandidatNavn(fødselsnummer);

  const handleFnrChange = (fødselsnummer: string) => {
    if (fødselsnummer.length < 11) {
      setFeilmelding('');
      setFødselsnummer(null);
    } else if (fødselsnummer.length > 11) {
      setFødselsnummer(null);
      setFeilmelding('Fødselsnummeret er for langt');
    } else {
      const erGyldig = validerFnr(fødselsnummer);
      if (erGyldig) {
        setFeilmelding('');
        setFødselsnummer(fødselsnummer);
      } else {
        setFødselsnummer(null);
        setFeilmelding('Fødselsnummeret er ikke gyldig');
      }
    }
  };

  return (
    <div>
      <Search
        label='Fødselsnummer på kandidat'
        onChange={handleFnrChange}
        error={feilmelding}
      />

      {kandidatNavn.data && (
        <Box.New
          className='mt-4 flex justify-between'
          background='raised'
          borderColor='neutral-subtleA'
          borderRadius='xlarge'
          borderWidth='1'
          paddingInline='space-16'
          paddingBlock='space-12'
        >
          <div>
            Søkeresultat:{' '}
            <strong>
              {kandidatNavn.data?.fornavn} {kandidatNavn.data?.etternavn} -{' '}
              {fødselsnummer}
            </strong>
          </div>
          <Button
            disabled={!fødselsnummer}
            variant='tertiary'
            size='small'
            onClick={() => {
              setValgteKandidater([
                ...valgteKandidater,
                {
                  fødselsnummer: fødselsnummer!,
                  fornavn: kandidatNavn.data?.fornavn!,
                  etternavn: kandidatNavn.data?.etternavn!,
                  kilde: kandidatNavn.data?.kilde!,
                },
              ]);
            }}
          >
            Legg til kandidat
          </Button>
          {/* {arenaKandidatnr.data && (
      <p>
        <strong>Arena kandidatnr:</strong>{' '}
        {arenaKandidatnr.data?.arenaKandidatnr}
      </p>
    )} */}
        </Box.New>
      )}
      {kandidatNavn.error && (
        <Alert variant='error' className='mt-4'>
          <p>Finner ikke person knyttet til fødselsnummer</p>
        </Alert>
      )}

      <div className='mt-8'>
        <Heading size='medium'>Valgte kandidater</Heading>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {valgteKandidater.map((kandidat) => (
              <Table.Row key={kandidat.fødselsnummer}>
                <Table.DataCell>{kandidat.fødselsnummer}</Table.DataCell>
                <Table.DataCell>
                  {kandidat.fornavn} {kandidat.etternavn}
                </Table.DataCell>
                <Table.DataCell>
                  <Button
                    variant='tertiary'
                    size='small'
                    onClick={() =>
                      setValgteKandidater(
                        valgteKandidater.filter(
                          (kandidat) =>
                            kandidat.fødselsnummer !== kandidat.fødselsnummer,
                        ),
                      )
                    }
                  >
                    Fjern kandidat
                  </Button>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default LeggTilKandidater;
