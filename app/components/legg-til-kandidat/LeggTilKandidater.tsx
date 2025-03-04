import { useArenaKandidatnr } from '../../api/kandidat-sok/useArenaKandidatnr';
import {
  Kandidatnavn,
  useKandidatNavn,
} from '../../api/kandidat-sok/useKandidatNavn';
import SynlighetsModal from './SynlighetsModal';
import Synlighetsinfo from './Synlighetsinfo';
import {
  CheckmarkCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  Box,
  Button,
  Heading,
  Loader,
  Tag,
  TextField,
} from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';
import * as React from 'react';

export interface LeggTilKandidaterProps {
  callBack: (valgteKandidater: ValgtKandidatProp[]) => void;
  initielleKandidater?: ValgtKandidatProp[];
  synlighetSomModal?: boolean;
  lukkModal?: () => void;
  tilFormidling?: boolean;
}

export interface ValgtKandidatProp extends Kandidatnavn {
  fødselsnummer: string;
  aktørId?: string | null;
}

const validerFnr = (fnr: string): boolean => idnr(fnr).status === 'valid';

const LeggTilKandidater: React.FC<LeggTilKandidaterProps> = ({
  callBack,
  synlighetSomModal,
  initielleKandidater,
  tilFormidling,
}) => {
  const [feilmelding, setFeilmelding] = React.useState('');
  const [valgteKandidater, setValgteKandidater] = React.useState<
    ValgtKandidatProp[]
  >(initielleKandidater ?? []);
  const [fødselsnummer, setFødselsnummer] = React.useState<string | null>(null);
  const [søkeString, setSøkestring] = React.useState<string>('');
  const kandidatNavnHook = useKandidatNavn(fødselsnummer);
  const arenaKandidatnrHook = useArenaKandidatnr(fødselsnummer);

  React.useEffect(() => {
    callBack(valgteKandidater);
  }, [valgteKandidater, callBack]);

  const handleFnrChange = (fødselsnummer: string) => {
    setSøkestring(fødselsnummer);
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

  const velgKandidat = (
    fnr: string,
    kandidat: Kandidatnavn,
    aktørId: string | null,
  ) => {
    if (
      !valgteKandidater.some((k) => k.fødselsnummer === fnr) &&
      kandidatNavnHook.data
    ) {
      setFødselsnummer(null);
      setSøkestring('');
      setValgteKandidater([
        ...valgteKandidater,
        {
          fødselsnummer: fnr,
          fornavn: kandidat.fornavn,
          etternavn: kandidat.etternavn,
          kilde: kandidat.kilde,
          aktørId: aktørId ?? null,
        },
      ]);
    }
  };

  const leggTilKandidat = (fødselsnummer: string) => (
    <Box.New
      data-testid={'velg-kandidat-resultat'}
      className='cursor-pointer'
      onClick={() => {
        if (kandidatNavnHook.data)
          velgKandidat(
            fødselsnummer,
            kandidatNavnHook.data,
            arenaKandidatnrHook.data?.arenaKandidatnr ?? null,
          );
      }}
    >
      <div className='flex items-center justify-between'>
        <div className='p-4'>
          {kandidatNavnHook.data?.fornavn} {kandidatNavnHook.data?.etternavn} -{' '}
          {fødselsnummer}
        </div>
        <div className='mr-4'>
          {valgteKandidater.some((k) => k.fødselsnummer === fødselsnummer) ? (
            <div className='flex items-center gap-2'>
              <CheckmarkCircleIcon /> <strong>Lagt til</strong>
            </div>
          ) : (
            <Button icon={<PlusCircleIcon />} variant='tertiary'>
              Legg til
            </Button>
          )}
        </div>
      </div>
    </Box.New>
  );

  const UsynligKandidat = (fødselsnummer: string) => (
    <Box.New>
      <div className='flex items-center justify-between'>
        <div className='p-4'>
          {kandidatNavnHook.data?.fornavn} {kandidatNavnHook.data?.etternavn} -{' '}
          {fødselsnummer}
        </div>

        <div className='mr-4 flex gap-2'>
          <Tag variant='warning'>Kandidaten er ikke synlig</Tag>
          {synlighetSomModal && (
            <SynlighetsModal fødselsnummer={fødselsnummer} />
          )}
        </div>
      </div>
      {!synlighetSomModal && <Synlighetsinfo fødselsnummer={fødselsnummer} />}{' '}
      <hr />
      <div className='flex justify-end '>
        <Button
          icon={<PlusCircleIcon />}
          variant='tertiary'
          onClick={() => {
            if (kandidatNavnHook?.data)
              velgKandidat(fødselsnummer, kandidatNavnHook?.data, null);
          }}
        >
          Legg til som usynlig kandidat (Registrer som fått jobben)
        </Button>
      </div>
    </Box.New>
  );

  return (
    <div>
      <Heading size='xsmall' className='mb-2'>
        Søk etter fødselsnummer
      </Heading>
      <Box.New
        borderRadius='xlarge'
        borderWidth='1'
        borderColor='info-subtleA'
        background='info-soft'
      >
        <TextField
          type='number'
          inputMode='numeric'
          value={søkeString}
          label='Fødselsnummer på kandidat'
          hideLabel
          onChange={(e) => handleFnrChange(e.target.value)}
          error={feilmelding}
        />

        {(kandidatNavnHook.isLoading || arenaKandidatnrHook.isLoading) && (
          <Box.New className='flex h-full items-center justify-center p-4'>
            <Loader />
          </Box.New>
        )}
        {kandidatNavnHook.data && fødselsnummer
          ? arenaKandidatnrHook.data?.arenaKandidatnr
            ? leggTilKandidat(fødselsnummer)
            : UsynligKandidat(fødselsnummer)
          : null}

        {kandidatNavnHook.error && (
          <Alert variant='error' className='mt-4'>
            <p>Finner ikke person knyttet til fødselsnummer</p>
          </Alert>
        )}
      </Box.New>
      {valgteKandidater.length > 0 && (
        <div className='mt-8'>
          <Heading size='medium'>Utvalgte kandidater</Heading>

          {valgteKandidater.map((kandidat) => (
            <Box.New
              className='flex flex-row items-center justify-between font-bold'
              key={kandidat.fødselsnummer}
              background='raised'
              borderColor='neutral-subtleA'
              borderRadius='xlarge'
              borderWidth='1'
              paddingInline='space-16'
              paddingBlock='space-12'
            >
              <div>
                {kandidat.fornavn} {kandidat.etternavn} (
                {kandidat.fødselsnummer})
              </div>
              {(!kandidat.aktørId || tilFormidling) && (
                <Tag variant='success'>Fått jobben</Tag>
              )}
              <Button
                icon={<XMarkIcon />}
                variant='tertiary'
                onClick={() =>
                  setValgteKandidater(
                    valgteKandidater.filter(
                      (valgKandidat) =>
                        valgKandidat.fødselsnummer !== kandidat.fødselsnummer,
                    ),
                  )
                }
              >
                Fjern
              </Button>
            </Box.New>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeggTilKandidater;
