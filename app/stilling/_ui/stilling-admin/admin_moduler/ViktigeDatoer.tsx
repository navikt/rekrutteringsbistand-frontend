import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { DatoVelger } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/DatoVelger';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { BodyLong, Checkbox, Heading } from '@navikt/ds-react';
import { addWeeks, format } from 'date-fns';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const formaterFraISOdato = (dato: string) => {
  if (dato.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) return dato;
  return format(new Date(dato), 'dd.MM.yyyy');
};

interface Props {
  skjulFrist?: boolean;
}
export default function ViktigeDatoer({ skjulFrist }: Props) {
  const { watch, control, setValue } = useFormContext<StillingsDataDTO>();
  const starttime = watch('stilling.properties.starttime');
  const applicationdue = watch('stilling.properties.applicationdue');
  const oppstartEtterAvtale = starttime === 'Etter avtale';
  const søknadsfristSnarest = applicationdue === 'Snarest';
  const søknadsfristDato =
    !søknadsfristSnarest && typeof applicationdue === 'string' && applicationdue
      ? formaterFraISOdato(applicationdue)
      : undefined;
  const oppstartDato =
    !oppstartEtterAvtale && typeof starttime === 'string' && starttime
      ? formaterFraISOdato(starttime)
      : undefined;

  useEffect(() => {
    if (oppstartDato && starttime !== oppstartDato) {
      setValue('stilling.properties.starttime', oppstartDato as any, {
        shouldDirty: false,
      });
    }
    if (søknadsfristDato && applicationdue !== søknadsfristDato) {
      setValue('stilling.properties.applicationdue', søknadsfristDato as any, {
        shouldDirty: false,
      });
    }
  }, [oppstartDato, søknadsfristDato, starttime, applicationdue, setValue]);

  return (
    <RedigerBoks tittel='Viktige datoer'>
      <BodyLong className='mb-6'>
        Velg oppstartsdato og søknadsfristen.
      </BodyLong>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col'>
          <Heading size='small'>Oppstart</Heading>
          <div className='flex gap-8 items-center'>
            <DatoVelger
              key='oppstart'
              disabled={oppstartEtterAvtale}
              valgtDato={oppstartDato}
              setDato={(val) => {
                if (val) setValue('stilling.properties.starttime', val as any);
              }}
            />
            <Controller
              name={'stilling.properties.starttime'}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value === 'Etter avtale'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange('Etter avtale');
                    } else if (value === 'Etter avtale') {
                      onChange(null);
                    }
                  }}
                >
                  Etter avtale
                </Checkbox>
              )}
            />
          </div>
        </div>
        {!skjulFrist && (
          <div className='flex flex-col'>
            <Heading size='small'>Søknadsfrist</Heading>
            <div className='flex gap-8 items-center'>
              <DatoVelger
                disabled={søknadsfristSnarest}
                valgtDato={søknadsfristDato}
                setDato={(val) => {
                  if (val)
                    setValue('stilling.properties.applicationdue', val as any);
                }}
              />
              <Controller
                name={'stilling.properties.applicationdue'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value === 'Snarest'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange('Snarest');
                        setValue(
                          'stilling.expires',
                          format(
                            addWeeks(new Date(), 3),
                            "yyyy-MM-dd'T'HH:mm:ss",
                          ),
                        );
                      } else if (value === 'Snarest') {
                        onChange(null);
                      }
                    }}
                  >
                    Snarest
                  </Checkbox>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </RedigerBoks>
  );
}
