import Ansettelsesform from '@/app/stilling/_ui/stilling-admin/admin_moduler/Ansettelsesform';
import AntallStillinger from '@/app/stilling/_ui/stilling-admin/admin_moduler/AntallStillinger';
import Arbeidsdager from '@/app/stilling/_ui/stilling-admin/admin_moduler/Arbeidsdager';
import Arbeidstid from '@/app/stilling/_ui/stilling-admin/admin_moduler/Arbeidstid';
import Arbeidstidsordning from '@/app/stilling/_ui/stilling-admin/admin_moduler/Arbeidstidsordning';
import Omfang from '@/app/stilling/_ui/stilling-admin/admin_moduler/Omfang';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PraktiskeForhold() {
  const { watch, setValue, getValues } = useFormContext();
  const kategori = watch('stillingsinfo.stillingskategori');
  const erJobbmesse = kategori === Stillingskategori.Jobbmesse;

  // Tving antall stillinger til 1 for jobbmesse
  useEffect(() => {
    if (erJobbmesse) {
      const current = getValues('stilling.properties.positioncount');
      if (current !== 1) {
        setValue('stilling.properties.positioncount', 1, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    }
  }, [erJobbmesse, getValues, setValue]);

  return (
    <RedigerBoks tittel='Praktiske forhold'>
      <div className='flex flex-col gap-8'>
        {!erJobbmesse && <AntallStillinger inline />}
        <Ansettelsesform inline />
        <Omfang inline />
        <div className='flex flex-col gap-4'>
          <Arbeidsdager inline />
          <Arbeidstid inline />
          <Arbeidstidsordning inline />
        </div>
      </div>
    </RedigerBoks>
  );
}
