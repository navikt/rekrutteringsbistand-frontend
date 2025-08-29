import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '@/components/felles/legg-til-kandidat/LeggTilKandidater';
import { BodyLong } from '@navikt/ds-react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StillingAdminFormidleKandidater() {
  const { getValues, setValue } = useFormContext<StillingAdminDTO>();

  // Stabil callback så useEffect i LeggTilKandidater ikke trigges uendelig
  const onKandidaterChange = useCallback(
    (kandidater: ValgtKandidatProp[]) => {
      // Transformér til skjemaets type (navnSchema[])
      const mapped = kandidater.map((k) => ({
        fornavn: k.fornavn,
        etternavn: k.etternavn,
        kilde: k.kilde,
      }));

      const eksisterende = getValues('formidlingKandidater') || [];

      const sameLength = eksisterende.length === mapped.length;
      const sameContent =
        sameLength &&
        eksisterende.every(
          (e, idx) =>
            e.fornavn === mapped[idx].fornavn &&
            e.etternavn === mapped[idx].etternavn &&
            e.kilde === mapped[idx].kilde,
        );

      if (!sameContent) {
        setValue('formidlingKandidater', mapped, { shouldDirty: true });
      }
    },
    [getValues, setValue],
  );

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
