'use client';

import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { DatoVelger } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/DatoVelger';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Alert, BodyLong, Button, Checkbox, Modal } from '@navikt/ds-react';
import { addWeeks, format, isValid, parse, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const DATO_FORMAT = 'dd.MM.yyyy';
const BACKEND_FORMAT = "yyyy-MM-dd'T'00:00:00";

const erFormDato = (value?: string | null) =>
  typeof value === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(value);

const tilFormDato = (value?: string | null) => {
  if (!value) return undefined;
  if (erFormDato(value)) return value;
  try {
    const parsed = parseISO(value);
    return isValid(parsed) ? format(parsed, DATO_FORMAT) : undefined;
  } catch {
    return undefined;
  }
};

const formDatoTilDate = (value?: string) => {
  if (!value || !erFormDato(value)) return undefined;
  const parsed = parse(value, DATO_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
};

const tilBackendIso = (value?: string) => {
  if (!value) return null;
  if (!erFormDato(value)) return value;
  const parsed = parse(value, DATO_FORMAT, new Date());
  return isValid(parsed) ? format(parsed, BACKEND_FORMAT) : null;
};

interface FeilState {
  visningsdato?: string;
  oppstart?: string;
  soknadsfrist?: string;
  generell?: string;
}

export default function ForlengeOppdrag() {
  const router = useRouter();
  const { stillingsData, refetch } = useStillingsContext();
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [open, setOpen] = useState(false);
  const [lagrer, setLagrer] = useState(false);
  const [sisteVisningsdato, setSisteVisningsdato] = useState<
    string | undefined
  >();
  const [oppstartDato, setOppstartDato] = useState<string | undefined>();
  const [oppstartEtterAvtale, setOppstartEtterAvtale] = useState(false);
  const [soknadsfristDato, setSoknadsfristDato] = useState<
    string | undefined
  >();
  const [soknadsfristSnarest, setSoknadsfristSnarest] = useState(false);
  const [feil, setFeil] = useState<FeilState>({});

  const defaultSnarestVisningsdato = useMemo(
    () => format(addWeeks(new Date(), 3), DATO_FORMAT),
    [],
  );

  const initialiserState = useCallback(() => {
    const eksisterende = stillingsData?.stilling;
    const properties = stillingsData?.stilling?.properties ?? {};

    setSisteVisningsdato(tilFormDato(eksisterende?.expires));

    const starttime = properties?.starttime;
    if (starttime === 'Etter avtale') {
      setOppstartEtterAvtale(true);
      setOppstartDato(undefined);
    } else {
      setOppstartEtterAvtale(false);
      setOppstartDato(
        typeof starttime === 'string' ? tilFormDato(starttime) : undefined,
      );
    }

    const applicationDue = properties?.applicationdue;
    if (applicationDue === 'Snarest') {
      setSoknadsfristSnarest(true);
      setSoknadsfristDato(undefined);
    } else {
      setSoknadsfristSnarest(false);
      setSoknadsfristDato(
        typeof applicationDue === 'string'
          ? tilFormDato(applicationDue)
          : undefined,
      );
    }

    setFeil({});
  }, [stillingsData]);

  useEffect(() => {
    if (open) {
      initialiserState();
    }
  }, [open, initialiserState]);

  if (!stillingsData) {
    return null;
  }

  const handleLagres = async () => {
    const nesteFeil: FeilState = {};

    const expiresIso = tilBackendIso(sisteVisningsdato);
    if (!expiresIso) {
      nesteFeil.visningsdato = 'Velg siste visningsdato';
    }

    let oppstartVerdi: string | null = null;
    if (oppstartEtterAvtale) {
      oppstartVerdi = 'Etter avtale';
    } else if (oppstartDato) {
      const backend = tilBackendIso(oppstartDato);
      if (!backend) {
        nesteFeil.oppstart = 'Ugyldig dato';
      } else {
        oppstartVerdi = backend;
      }
    }

    let soknadsfristVerdi: string | null = null;
    if (soknadsfristSnarest) {
      soknadsfristVerdi = 'Snarest';
    } else if (soknadsfristDato) {
      const backend = tilBackendIso(soknadsfristDato);
      if (!backend) {
        nesteFeil.soknadsfrist = 'Ugyldig dato';
      } else {
        soknadsfristVerdi = backend;
      }
    }

    if (Object.keys(nesteFeil).length > 0) {
      setFeil(nesteFeil);
      return;
    }

    const eksisterendeProps = stillingsData.stilling.properties ?? {};

    const oppdatert: StillingsDataDTO = {
      ...stillingsData,
      stilling: {
        ...stillingsData.stilling,
        status: StillingsStatus.Aktiv,
        expires: expiresIso!,
        properties: {
          ...eksisterendeProps,
          starttime: oppstartVerdi,
          applicationdue: soknadsfristVerdi,
        },
        administration: {
          ...(stillingsData.stilling.administration ?? {}),
          status: AdminStatus.Done,
        },
      },
    };

    setLagrer(true);
    setFeil({});
    try {
      const respons = await oppdaterStilling(oppdatert, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });

      await refetch?.();
      router.push(`/stilling/${respons.stilling.uuid}`);
      setOpen(false);
    } catch (error: any) {
      setFeil({ generell: error?.message ?? 'Klarte ikke å lagre endringene' });
    } finally {
      setLagrer(false);
    }
  };

  return (
    <>
      <Button
        size='small'
        className='mt-4 w-full'
        onClick={() => setOpen(true)}
      >
        Forlenge søkerforslag
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: 'Forleng oppdraget', size: 'small' }}
        width='small'
      >
        <Modal.Body>
          <BodyLong className='mb-6'>
            Endre datoene for oppdraget hvis du vil ha litt mer tid.
          </BodyLong>
          <div className='flex flex-col gap-6'>
            <DatoVelger
              label='Siste visningsdato'
              disablePastDates
              valgtDato={sisteVisningsdato}
              setDato={(dato) => {
                setSisteVisningsdato(dato);
                setFeil((prev) => ({ ...prev, visningsdato: undefined }));
              }}
              error={feil.visningsdato}
            />
            <div className='flex items-start gap-4'>
              <DatoVelger
                label='Oppstart'
                disablePastDates
                valgtDato={oppstartDato}
                setDato={(dato) => {
                  setOppstartDato(dato);
                  setFeil((prev) => ({ ...prev, oppstart: undefined }));
                }}
                disabled={oppstartEtterAvtale}
                error={feil.oppstart}
              />
              <Checkbox
                className='pt-9'
                checked={oppstartEtterAvtale}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setOppstartEtterAvtale(checked);
                  setFeil((prev) => ({ ...prev, oppstart: undefined }));
                  if (checked) {
                    setOppstartDato(undefined);
                  }
                }}
              >
                Etter avtale
              </Checkbox>
            </div>
            <div className='flex items-start gap-4'>
              <DatoVelger
                label='Søknadsfrist'
                disablePastDates
                valgtDato={soknadsfristDato}
                setDato={(dato) => {
                  setSoknadsfristDato(dato);
                  setFeil((prev) => ({ ...prev, soknadsfrist: undefined }));
                }}
                disabled={soknadsfristSnarest}
                error={feil.soknadsfrist}
              />
              <Checkbox
                className='pt-9'
                checked={soknadsfristSnarest}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSoknadsfristSnarest(checked);
                  setFeil((prev) => ({ ...prev, soknadsfrist: undefined }));
                  if (checked) {
                    setSoknadsfristDato(undefined);
                    setSisteVisningsdato((forrige) => {
                      if (!forrige) return defaultSnarestVisningsdato;
                      const forrigeDato = formDatoTilDate(forrige);
                      const defaultDato = formDatoTilDate(
                        defaultSnarestVisningsdato,
                      );
                      if (
                        !forrigeDato ||
                        (defaultDato && forrigeDato < defaultDato)
                      ) {
                        return defaultSnarestVisningsdato;
                      }
                      return forrige;
                    });
                  }
                }}
              >
                Snarest
              </Checkbox>
            </div>
            {feil.generell && <Alert variant='error'>{feil.generell}</Alert>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setOpen(false)}
            disabled={lagrer}
          >
            Avbryt
          </Button>
          <Button type='button' onClick={handleLagres} loading={lagrer}>
            Lagre
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
