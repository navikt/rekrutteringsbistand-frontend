'use client';

import { ArbeidsgiverDTO as TreffArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { Alert, BodyShort, Loader, Radio, RadioGroup } from '@navikt/ds-react';
import { FC } from 'react';

interface Props {
  arbeidsgivere: TreffArbeidsgiverDTO[];
  laster: boolean;
  valgtOrgnr: string | null;
  onValgtOrgnr: (orgnr: string) => void;
  legend?: string;
}

const ArbeidsgiverRadioGruppe: FC<Props> = ({
  arbeidsgivere,
  laster,
  valgtOrgnr,
  onValgtOrgnr,
  legend = 'Arbeidsgiver fra treffet',
}) => {
  if (laster) return <Loader />;
  if (arbeidsgivere.length === 0) {
    return (
      <Alert variant='info'>
        Treffet har ingen arbeidsgivere. Legg til en arbeidsgiver i treffet
        først.
      </Alert>
    );
  }
  return (
    <RadioGroup
      legend={legend}
      value={valgtOrgnr ?? ''}
      onChange={(verdi: string) => onValgtOrgnr(verdi)}
    >
      {arbeidsgivere.map((a) => (
        <Radio key={a.organisasjonsnummer} value={a.organisasjonsnummer}>
          <div>
            <BodyShort weight='semibold'>{a.navn}</BodyShort>
            <BodyShort size='small' textColor='subtle'>
              Org.nr {a.organisasjonsnummer}
            </BodyShort>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default ArbeidsgiverRadioGruppe;
