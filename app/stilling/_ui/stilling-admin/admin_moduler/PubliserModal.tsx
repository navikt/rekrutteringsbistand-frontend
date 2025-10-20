import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { DatoVelger } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/DatoVelger';
import { mapSendStillingOppdatering } from '@/app/stilling/_ui/stilling-admin/admin_moduler/mapVerdier';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { BodyLong, Box, Button, Checkbox, Heading, Modal, TextField, ToggleGroup } from '@navikt/ds-react';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface PubliserModalProps {
  disabled: boolean;
}

export const validerEpost = (
  epost: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return epost === ''
    ? { erGodkjent: false, feilmelding: 'E-post kan ikke være tom' }
    : emailRegex.test(epost)
      ? { erGodkjent: true, feilmelding: '' }
      : { erGodkjent: false, feilmelding: 'Ugyldig e-postadresse' };
};

export default function PubliserModal({ disabled }: PubliserModalProps) {
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const ref = useRef<HTMLDialogElement>(null);
  const { watch, setValue, getValues } = useFormContext<StillingsDataDTO>();
  const { track } = useUmami();
  const router = useRouter();
  // Hent eksisterende verdier fra form
  const privacy = watch('stilling.privacy');
  const publishedISO = watch('stilling.published');
  const expiresISO = watch('stilling.expires');
  const applicationEmail = watch('stilling.properties.applicationemail');
  const applicationUrl = watch('stilling.properties.applicationurl');
  const [isLoading, setIsLoading] = useState(false);

  const stillingHook = useStilling(getValues().stilling.uuid);

  const isoTilSkjemaDato = (iso?: string | null) => {
    if (!iso) return undefined;
    try {
      // iso forventes å være ISO-string
      return format(new Date(iso), 'dd.MM.yyyy');
    } catch {
      return undefined;
    }
  };

  const [publiseringsdato, setPubliseringsdato] = useState<string | undefined>(
    isoTilSkjemaDato(publishedISO),
  );
  const [sisteVisningsdato, setSisteVisningsdato] = useState<
    string | undefined
  >(isoTilSkjemaDato(expiresISO));

  const [publiserOffentlig, setPubliserOffentlig] = useState(
    privacy === 'SHOW_ALL',
  );

  const initSøkemetode: 'email' | 'url' = applicationUrl ? 'url' : 'email';
  const [søkemetode, setSøkemetode] = useState<string>(initSøkemetode);
  const [epost, setEpost] = useState(applicationEmail ?? '');
  const [epostError, setEpostError] = useState<string>('');
  const [lenke, setLenke] = useState(applicationUrl ?? '');
  const [lenkeError, setLenkeError] = useState<string>('');

  const skjemaDatoTilIso = (dato?: string) => {
    if (!dato) return null;
    // dd.MM.yyyy -> iso uten timezone (lokal 00:00)
    const parsed = parse(dato, 'dd.MM.yyyy', new Date());
    return format(parsed, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const håndterPubliser = async () => {
    setIsLoading(true);
    try {
      // Sett datoer på form
      setValue('stilling.published', skjemaDatoTilIso(publiseringsdato), {
        shouldDirty: true,
      });
      setValue('stilling.expires', skjemaDatoTilIso(sisteVisningsdato), {
        shouldDirty: true,
      });
      // Privacy
      setValue(
        'stilling.privacy',
        publiserOffentlig ? 'SHOW_ALL' : 'INTERNAL_NOT_SHOWN',
        { shouldDirty: true },
      );
      // Søkemetode felter
      if (publiserOffentlig) {
        if (søkemetode === 'email') {
          const epostValidering = validerEpost(epost);
          setEpostError(epostValidering.feilmelding)
          if (epostValidering.erGodkjent) {
            setValue('stilling.properties.applicationemail', epost, {
              shouldDirty: true,
            });
            setValue('stilling.properties.applicationurl', null as any, {
              shouldDirty: true,
            });
          } else {
            return
          }
        } else {
          if (lenke.trim() !== '') {
            setLenkeError('');
            setValue('stilling.properties.applicationurl', lenke, {
              shouldDirty: true,
            });
            setValue('stilling.properties.applicationemail', null as any, {
              shouldDirty: true,
            });
          } else {
            setLenkeError('Lenke til søknadsskjema kan ikke være tom');
            return;
          }
        }
      }

      // Hvis søknadsfrist er "Snarest" og ingen expires satt, sett en default 3 uker frem i tid
      if (!sisteVisningsdato && publiseringsdato && søkemetode === 'email') {
        // valgfritt: ingen spesifikasjon gitt – hopper over
      }

      const nyData = mapSendStillingOppdatering(getValues());
      const publiserStillingsData = {
        ...nyData,
        stillingsinfo: {
          ...nyData.stillingsinfo,
        },
        stilling: {
          ...nyData.stilling,
          status: 'ACTIVE',
          administration: {
            ...nyData.stilling.administration,
            status: 'DONE',
          },
          firstPublished: true,
        },
      };

      track(UmamiEvent.Stilling.ny_stilling_info, {
        yrkestittel: publiserStillingsData.stilling.categoryList?.[0]?.name,
        sektor: publiserStillingsData.stilling.properties?.sector,
        ansettelsesform:
          publiserStillingsData.stilling.properties?.engagementtype,
        arbeidstidsordning:
          publiserStillingsData.stilling?.properties?.jobarrangement,
        omfangIProsent:
          publiserStillingsData.stilling.properties?.jobpercentage,
        arbeidssted: publiserStillingsData.stilling.locationList,
      });

      try {
        await oppdaterStilling(publiserStillingsData, {
          eierNavident: brukerData.ident,
          eierNavn: brukerData.navn,
          eierNavKontorEnhetId: valgtNavKontor?.navKontor,
        });
      } catch (e) {
        alert('Feil ved opprettelse av stilling');
        new RekbisError({
          message: 'Feil ved opprettelse av stilling',
          error: e,
        });
      }

      ref.current?.close();
      stillingHook.mutate();
      router.push(`/stilling/${getValues().stilling.uuid}`);
    } catch {
      alert('Uventet feil ved publisering');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size='small'
        disabled={disabled}
        onClick={() => ref.current?.showModal()}
      >
        Publiser
      </Button>

      <Modal ref={ref} header={{ heading: 'Publiser stillingsoppdraget' }}>
        <Modal.Body>
          <Box.New background='neutral-soft' padding='6' className='mb-8'>
            <Heading size='small' className='mb-2'>
              Dette skjer når du publiserer oppdraget
            </Heading>
            <ul className='list-disc pl-5 text-sm mb-4'>
              <li>
                Stillingsoppdraget blir synlig for Nav-ansatte i
                rekrutteringsbistand.
              </li>
              <li>
                Ansatte hos arbeidsgiveren på Min Side Arbeidsgiver på nav.no
                (med Altinn-tilgang).
              </li>
              <li>Jobbsøkere som får stillingen delt i aktivitetsplanen.</li>
            </ul>
            <BodyLong size='small'>
              Ikke alt må være helt perfekt! Du kan når som helst endre eller
              avpublisere oppdraget.
            </BodyLong>
          </Box.New>

          <div className='grid gap-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <DatoVelger
                disablePastDates
                label='Publiseringsdato'
                valgtDato={publiseringsdato}
                tilDato={sisteVisningsdato}
                setDato={(d) => setPubliseringsdato(d)}
              />
              <DatoVelger
                disablePastDates
                label='Siste visningsdato'
                valgtDato={sisteVisningsdato}
                fraDato={publiseringsdato}
                setDato={(d) => setSisteVisningsdato(d)}
              />
            </div>
            <Checkbox
              checked={publiserOffentlig}
              onChange={(e) => setPubliserOffentlig(e.target.checked)}
            >
              Publiser stillingsoppdraget offentlig på arbeidsplassen.no også
            </Checkbox>

            {publiserOffentlig && (
              <div>
                <Heading size='small' className='mb-4'>
                  Hvordan skal jobbsøker søke?
                </Heading>

                <ToggleGroup
                  fill
                  defaultValue={søkemetode}
                  onChange={(val) => setSøkemetode(val)}
                >
                  <ToggleGroup.Item value='email' label='E-post' />
                  <ToggleGroup.Item value='url' label='Søknadsskjema' />
                </ToggleGroup>

                {søkemetode === 'email' && (
                  <div className='mt-4'>
                    <TextField
                      label='E-post'
                      value={epost}
                      error={epostError}
                      onChange={(e) => setEpost(e.target.value)}
                    />
                  </div>
                )}
                {søkemetode === 'url' && (
                  <div className='mt-4'>
                    <TextField
                      label='Lenke til søknadsskjema'
                      value={lenke}
                      error={lenkeError}
                      onChange={(e) => setLenke(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            type='button'
            onClick={håndterPubliser}
            //disabled={(publiserOffentlig && epost === '' && lenke === '') || epostError !== ''}
          >
            Publiser oppdraget
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
