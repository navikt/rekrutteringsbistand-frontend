import LeggTilKandidater, {
  ValgtKandidatProp,
} from '@/app/stilling/_ui/legg-til-kandidat/LeggTilKandidater';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { BodyLong, BodyShort, FormSummary } from '@navikt/ds-react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StillingAdminFormidleKandidater() {
  const { getValues, setValue, watch } = useFormContext<StillingAdminDTO>();
  const erKnyttetTilTreff = !!watch('stillingsinfo.rekrutteringstreffId');
  const valgteKandidater = watch('formidlingKandidater') ?? [];

  // Stabil callback så useEffect i LeggTilKandidater ikke trigges uendelig
  const onKandidaterChange = useCallback(
    (kandidater: ValgtKandidatProp[]) => {
      // Transformér til skjemaets type (navnSchema[])
      const mapped = kandidater.map((k) => ({
        fornavn: k.fornavn,
        etternavn: k.etternavn,
        kilde: k.kilde,
        fnr: k.fødselsnummer,
      }));

      const eksisterende = getValues('formidlingKandidater') || [];

      const sameLength = eksisterende.length === mapped.length;
      const sameContent =
        sameLength &&
        eksisterende.every(
          (e, idx) =>
            e.fornavn === mapped[idx].fornavn &&
            e.etternavn === mapped[idx].etternavn &&
            e.kilde === mapped[idx].kilde &&
            e.fnr === mapped[idx].fnr,
        );

      if (!sameContent) {
        setValue('formidlingKandidater', mapped, { shouldDirty: true });
      }
    },
    [getValues, setValue],
  );

  if (erKnyttetTilTreff) {
    return (
      <RedigerBoks tittel='Kandidater fra rekrutteringstreff'>
        <BodyLong className='mb-2'>
          Kandidatene er valgt fra rekrutteringstreffet. Endre tilknytning
          øverst for å justere utvalget.
        </BodyLong>
        {valgteKandidater.length === 0 ? (
          <BodyShort textColor='subtle'>Ingen kandidater valgt.</BodyShort>
        ) : (
          <FormSummary>
            <FormSummary.Header>
              <FormSummary.Heading level='3'>
                Valgte kandidater ({valgteKandidater.length})
              </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
              {valgteKandidater.map((k) => (
                <FormSummary.Answer key={k.fnr}>
                  <FormSummary.Label>
                    {`${k.etternavn ?? ''}${k.etternavn && k.fornavn ? ', ' : ''}${k.fornavn ?? ''}`.trim() ||
                      'Ukjent navn'}
                  </FormSummary.Label>
                  <FormSummary.Value>f.nr {k.fnr}</FormSummary.Value>
                </FormSummary.Answer>
              ))}
            </FormSummary.Answers>
          </FormSummary>
        )}
      </RedigerBoks>
    );
  }

  return (
    <RedigerBoks tittel='Legg til kandidater'>
      <BodyLong className='mb-2'>
        Vi må vite hvilke kandidater du ønsker å formidle til samme arbeidsgiver
      </BodyLong>
      <div className='flex flex-col space-y-8'>
        <LeggTilKandidater
          tilFormidling
          synlighetSomModal
          callBack={onKandidaterChange}
        />
      </div>
    </RedigerBoks>
  );
}
