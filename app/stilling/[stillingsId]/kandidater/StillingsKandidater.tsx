import { Button, Checkbox, CheckboxGroup, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useForespurteOmDelingAvCv } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../api/kandidat/schema.zod';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import { useSmserForStilling } from '../../../api/kandidatvarsel/kandidatvarsel';
import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import SWRLaster from '../../../components/SWRLaster';
import { useStillingsContext } from '../StillingsContext';
import DelMedArbeidsgiver from './components/DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from './components/DelMedKandidat/DelMedKandidatModal';
import SendSmsModal from './components/SendSMS/SendSmsModal';
import { Kandidatstatus } from './KandidatIKandidatlisteTyper';
import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';

export enum KandidatHendelseValg {
  VURDERES = 'Vurderes',
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

  const varsler = useSmserForStilling(stillingsData.stilling.uuid);
  const [search, setSearch] = React.useState('');

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
      hooks={[kandidatlisteHook, forespurteKandidaterHook]}
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
      {(kandidatliste, forespurteKandidater) => {
        const forespurteKandidaterAktørListe =
          Object.keys(forespurteKandidater);
        console.log('🎺 forespurteKandidater', forespurteKandidater);
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
                  legend='Status'
                  onChange={setStatus}
                  defaultValue={status}
                  className='mb-8'
                >
                  {Object.entries(Kandidatstatus).map(([key, value]) => (
                    <Checkbox key={key} value={key}>
                      {value}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <CheckboxGroup
                  legend='Hendelser'
                  onChange={setHendelse}
                  defaultValue={hendelse}
                >
                  {Object.entries(KandidatHendelseValg).map(([key, value]) => (
                    <Checkbox key={key} value={key}>
                      {value}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </aside>
              <div className='w-full'>
                <StillingsKandidaterTabell
                  forespurteKandidater={forespurteKandidater}
                  markerteKandidater={markerteKandidater}
                  setMarkerteKandidater={setMarkerteKandidater}
                  search={search}
                  kandidatliste={kandidatliste}
                  stillingsId={stillingsData.stilling.uuid}
                  stillingskategori={
                    stillingsData.stillingsinfo?.stillingskategori ?? null
                  }
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
