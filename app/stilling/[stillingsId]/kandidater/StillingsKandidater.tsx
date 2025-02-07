import { Button, Checkbox, CheckboxGroup, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useForespurteOmDelingAvCv } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../api/kandidat/schema.zod';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import {
  BeskjedEksternStatus,
  useSmserForStilling,
} from '../../../api/kandidatvarsel/kandidatvarsel';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import SWRLaster from '../../../components/SWRLaster';
import { storForbokstavString } from '../../../kandidat-sok/util';
import { useStillingsContext } from '../StillingsContext';
import DelMedArbeidsgiver from './components/DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './components/DelMedKandidat/DelMedKandidatModal';
import { TilstandPåForespørsel } from './components/HendelseTag';
import SendSmsModal from './components/SendSMS/SendSmsModal';
import { Kandidatstatus } from './KandidatIKandidatlisteTyper';
import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';

export enum KandidatHendelseValg {
  PRESENTERT = 'Presentert',
  TIL_INTERVJU = 'Til intervju',
  FATT_JOBBEN = 'Fått jobb',
}

const StillingsKandidater: React.FC = () => {
  const { brukerData } = useApplikasjonContext();
  const { stillingsData } = useStillingsContext();
  const { status, setStatus, hendelse, setHendelse } =
    useStillingsKandidaterFilter();
  const [markerteKandidater, setMarkerteKandidater] = React.useState<
    kandidaterSchemaDTO[]
  >([]);

  const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);
  const forespurteKandidaterHook = useForespurteOmDelingAvCv(
    stillingsData.stilling.uuid,
  );
  const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);

  const [search, setSearch] = React.useState('');

  // Mutate beskjeder every 3 second: //TODO aktuelt?
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     beskjeder.mutate();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [beskjeder]);

  const onOvertaStilling = async () => {
    await oppdaterStilling({
      ...stillingsData,
      stillingsinfo: {
        ...stillingsData.stillingsinfo,
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
      },
      stilling: {
        ...stillingsData.stilling,
        administration: {
          ...stillingsData.stilling.administration,
          navIdent: brukerData.ident,
          reportee: brukerData.navn,
        },
      },
    });
    window.location.reload();
  };

  return (
    <SWRLaster
      hooks={[kandidatlisteHook, forespurteKandidaterHook, beskjederHook]}
      //TODO Midlertidig løsning for at bruker ikke får feilmelding om de ikke er eier
      egenFeilmelding={() => (
        <div>
          Feil ved henting av kandidater
          <br />
          Du får ikke vise kandidater hvis du ikke er eier, du kan prøve å ta
          eierskap på nytt
          <Button
            onClick={onOvertaStilling}
            variant='secondary'
            size='small'
            className='w-full h-5 my-2'
          >
            Ta eierskap
          </Button>
        </div>
      )}
    >
      {(kandidatliste, forespurteKandidater, beskjeder) => {
        const forespurteKandidaterAktørListe =
          Object.keys(forespurteKandidater);

        return (
          <div className='my-2'>
            <div className='flex justify-between mt-2'>
              <div className=' md:w-[15rem]'>
                <Search
                  placeholder='Søk i kandidatene'
                  label='Kandidatsøk'
                  hideLabel
                  variant='primary'
                  value={search}
                  onChange={(val) => setSearch(val)}
                />
              </div>
              <div>
                <SendSmsModal
                  markerteKandidater={markerteKandidater}
                  stillingId={stillingsData.stilling.uuid}
                  stillingskategori={
                    stillingsData.stillingsinfo?.stillingskategori ?? null
                  }
                  fjernAllMarkering={() => setMarkerteKandidater([])}
                />
                <DelMedKandidatModal
                  forespurteKandidaterAktørListe={
                    forespurteKandidaterAktørListe
                  }
                  kandidatliste={kandidatliste}
                  markerteKandidater={markerteKandidater}
                  fjernAllMarkering={() => setMarkerteKandidater([])}
                />
                <DelMedArbeidsgiver
                  stillingTittel={stillingsData.stilling.title}
                  markerteKandidater={markerteKandidater}
                  kandidatliste={kandidatliste}
                />
              </div>
            </div>

            <div className='mt-8 flex'>
              <aside className='sidebar w-full md:w-[20rem] mr-4 '>
                <CheckboxGroup
                  legend='Intern status'
                  onChange={setStatus}
                  defaultValue={status}
                  className='mb-8'
                >
                  {Object.entries(Kandidatstatus).map(([key, value]) => (
                    <Checkbox key={key} value={key}>
                      {storForbokstavString(value ?? '').replace(/_/g, ' ')}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <div className='flex flex-col gap-8'>
                  <CheckboxGroup
                    legend='Utfalsendring'
                    onChange={setHendelse}
                    defaultValue={hendelse}
                  >
                    {Object.entries(KandidatHendelseValg).map(
                      ([key, value]) => (
                        <Checkbox key={key} value={key}>
                          {value}
                        </Checkbox>
                      ),
                    )}
                  </CheckboxGroup>
                  <CheckboxGroup
                    legend='Deling av CV'
                    onChange={setHendelse}
                    defaultValue={hendelse}
                  >
                    {Object.entries(TilstandPåForespørsel).map(
                      ([key, value]) => (
                        <Checkbox key={key} value={value}>
                          {storForbokstavString(value ?? '').replace(/_/g, ' ')}
                        </Checkbox>
                      ),
                    )}
                  </CheckboxGroup>
                  <CheckboxGroup
                    legend='Beskjed'
                    onChange={setHendelse}
                    defaultValue={hendelse}
                  >
                    {Object.entries(BeskjedEksternStatus).map(
                      ([key, value]) => (
                        <Checkbox key={key} value={key}>
                          {storForbokstavString(value ?? '').replace(/_/g, ' ')}
                        </Checkbox>
                      ),
                    )}
                  </CheckboxGroup>
                </div>
              </aside>
              <div className='w-full'>
                <StillingsKandidaterTabell
                  beskjeder={beskjeder}
                  forespurteKandidater={forespurteKandidater}
                  markerteKandidater={markerteKandidater}
                  setMarkerteKandidater={setMarkerteKandidater}
                  search={search}
                  kandidatliste={kandidatliste}
                  stillingsId={stillingsData.stilling.uuid}
                />
              </div>
            </div>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default StillingsKandidater;
