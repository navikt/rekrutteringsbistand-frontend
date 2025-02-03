import {
  BodyShort,
  DatePicker,
  Label,
  Radio,
  RadioGroup,
  useDatepicker,
} from '@navikt/ds-react';
import { addDays, addMonths, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import React, { FunctionComponent, useState } from 'react';
export enum Svarfrist {
  ToDager = 'TO_DAGER',
  TreDager = 'TRE_DAGER',
  SyvDager = 'SYV_DAGER',
  Egenvalgt = 'EGENVALGT',
}

const svarfristLabels: Record<Svarfrist, string> = {
  [Svarfrist.ToDager]: '2 dager',
  [Svarfrist.TreDager]: '3 dager',
  [Svarfrist.SyvDager]: '7 dager',
  [Svarfrist.Egenvalgt]: 'Egenvalgt',
};

type Props = {
  tittel?: string;
  setValgtSvarfrist: (dato?: Date) => void;
};

const VelgSvarfrist: FunctionComponent<Props> = ({
  tittel,
  setValgtSvarfrist,
}) => {
  const [svarFrist, setSvarFrist] = useState<Date | undefined>(undefined);
  const [valgtRadiobutton, setValgtRadiobutton] = useState<Svarfrist>(
    Svarfrist.ToDager,
  );

  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: addDays(new Date(), 2),
    toDate: addMonths(new Date(), 1),
    onDateChange: (date) => setSvarFrist(date),
    defaultSelected: svarFrist,

    // onValidate: onEgenvalgValidation,
    inputFormat: 'dd.MM.yyyy',
    allowTwoDigitYear: false,
  });

  React.useEffect(() => {
    if (svarFrist) {
      setValgtSvarfrist(svarFrist);
    }
  }, [svarFrist]);

  return (
    <div className={'my-4'}>
      <RadioGroup
        legend={
          <>
            <Label as='span'>{tittel || 'Frist for svar'}</Label>
            <BodyShort as='span'> (må fylles ut)</BodyShort>
          </>
        }
        description='Kandidatene kan ikke svare etter denne fristen'
        defaultValue={Svarfrist.ToDager}
      >
        {Object.values(Svarfrist).map((value) => (
          <Radio
            key={value}
            name='svarfrist'
            value={value}
            onChange={(e) => {
              const valg = e.target.value as Svarfrist;
              setValgtRadiobutton(valg);
              {
                if (valg === Svarfrist.Egenvalgt) {
                  setSvarFrist(undefined);
                } else {
                  setSvarFrist(lagFristFraSvarfrist(valg));
                }
              }
            }}
          >
            <span id={`svarfrist-label_${value}`}>
              {`${svarfristLabels[value]} ${lagBeskrivelseAvSvarfrist(value)}`}
            </span>
          </Radio>
        ))}
      </RadioGroup>

      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          // error={egenvalgtFristFeilmelding}
          label='Velg frist for svar (frist ut valgt dato)'
          placeholder='dd.mm.yyyy'
          disabled={valgtRadiobutton !== Svarfrist.Egenvalgt}
        />
      </DatePicker>
    </div>
  );
};

const lagBeskrivelseAvSvarfrist = (svarfrist: Svarfrist): string => {
  let dato = new Date();

  if (svarfrist === Svarfrist.ToDager) {
    dato = addDays(dato, 2);
  } else if (svarfrist === Svarfrist.TreDager) {
    dato = addDays(dato, 3);
  } else if (svarfrist === Svarfrist.SyvDager) {
    dato = addDays(dato, 7);
  } else {
    return '';
  }

  return `(frist ut ${format(dato, 'EEEE d. MMMM', { locale: nb })})`;
};

export const lagFristFraSvarfrist = (svarfrist: Svarfrist) => {
  switch (svarfrist) {
    case Svarfrist.ToDager:
      return addDays(new Date(), 2);
    case Svarfrist.TreDager:
      return addDays(new Date(), 3);
    case Svarfrist.SyvDager:
      return addDays(new Date(), 7);
  }
};

// const sisteGyldigeMaksDato = format(addMonths(new Date(), 1), 'dd.MM.yyyy');

export default VelgSvarfrist;
