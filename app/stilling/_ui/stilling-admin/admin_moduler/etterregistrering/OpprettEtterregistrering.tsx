import { getAPI } from '@/app/api/fetcher';
import { navnSchema } from '@/app/api/kandidat-sok/useKandidatNavn';
import { formidleUsynligKandidat } from '@/app/api/kandidat/formidleKandidat';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { kandidatlisteInfoEndepunkt } from '@/app/api/kandidat/useKandidatlisteInfo';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { oppdaterEtterregistrering } from '@/app/stilling/_ui/stilling-admin/admin_moduler/etterregistrering/etterregistrering-steg';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import z from 'zod';

export const FormidlingKandidatSchema = z.object({
  fnr: z.string(),
  navn: navnSchema,
});

export type FormidlingKandidatDTO = z.infer<typeof FormidlingKandidatSchema>;

export interface FormidlingsDataDTO extends StillingsDataDTO {
  navKontor: string;
  formidlingKandidater: FormidlingKandidatDTO[];
  navIdent: string;
  reportee: string;
}

export interface OpprettEtterregistreringProps {
  disabled: boolean;
}

export default function OpprettEtterregistrering({
  disabled,
}: OpprettEtterregistreringProps) {
  const { getValues } = useFormContext<StillingAdminDTO>();
  const { track } = useUmami();
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const router = useRouter();

  const [steg, setSteg] = useState('');
  const [oppretter, setOppretter] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [laster, setLaster] = useState(false); // Laste-indikator for sekvensen

  const opprettEtterregistrering = async () => {
    // Nullstill feil før ny kjøring
    setFeil(null);
    setLaster(true);
    const adminData = getValues();

    const stillingsId = adminData.stilling?.uuid;
    if (!stillingsId) {
      throw new Error('Mangler stillings UUID');
    }

    if (!valgtNavKontor?.navKontor) {
      throw new Error('Mangler valgt NAV-kontor');
    }
    // debug dto om nødvendig
    try {
      setSteg('Oppdaterer etterregistrering...');
      await oppdaterEtterregistrering(adminData);
      setSteg('Henter nyopprettet kandidatliste...');

      const kandidatlisteInfo = await getAPI(
        kandidatlisteInfoEndepunkt(stillingsId),
      );

      if (!kandidatlisteInfo.kandidatlisteId) {
        throw new Error('Fant ikke kandidatliste id');
      }
      setSteg('Etterregistrerer kandidater...');

      if (
        adminData.formidlingKandidater &&
        adminData.formidlingKandidater.length > 0
      ) {
        for (const kandidat of adminData.formidlingKandidater) {
          const navn = `${kandidat?.fornavn} ${kandidat?.etternavn}`;
          setSteg(`Etterregistrerer ${navn}...`);
          await formidleUsynligKandidat(kandidatlisteInfo.kandidatlisteId, {
            fnr: kandidat.fnr,
            fåttJobb: true,
            navKontor: valgtNavKontor?.navKontor,
            stillingsId: stillingsId,
          });
        }
      }

      setSteg('Ferdigstiller etterregistrering...');

      await setKandidatlisteStatus(
        kandidatlisteInfo.kandidatlisteId,
        Kandidatlistestatus.Lukket,
      );

      track(
        UmamiEvent.Etterregistrering.fullført_etterregistrering_av_formidling,
      );

      track(UmamiEvent.Etterregistrering.yrkestittel_etterregistrering, {
        yrkestittel: adminData.stilling?.categoryList?.[0]?.name,
      });

      setSteg('Etterregistrering fullført!');
    } catch {
      visVarsel({
        type: 'error',
        tekst: 'Feil ved steg: ' + steg,
      });
      setFeil('Feil ved steg: ' + steg);
    } finally {
      setLaster(false);
    }
  };

  return (
    <div>
      <Button
        loading={oppretter}
        onClick={() => {
          setOppretter(true);
          opprettEtterregistrering();
        }}
        size='small'
        disabled={disabled}
        title='Opprett etterregistrering'
      >
        Opprett
      </Button>
      {oppretter && (
        <Modal
          onClose={() => {}}
          open={oppretter}
          width={800}
          header={{
            heading: 'Oppretter etterregistrering',
            closeButton: false,
          }}
        >
          <Modal.Body>
            <BodyLong>{steg}</BodyLong>
            {feil && <BodyLong>{feil}</BodyLong>}
          </Modal.Body>
          <Modal.Footer>
            {feil ? (
              <>
                {/* Vis "Prøv igjen" ved feil */}
                <Button
                  type='button'
                  loading={laster}
                  onClick={() => {
                    setFeil(null);
                    opprettEtterregistrering();
                  }}
                >
                  Prøv igjen
                </Button>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => setOppretter(false)}
                >
                  Avbryt
                </Button>
              </>
            ) : (
              <Button
                type='button'
                disabled={steg !== 'Etterregistrering fullført!'}
                onClick={() =>
                  router.push('/etterregistrering?portefolje=visMine')
                }
              >
                Avslutt
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
