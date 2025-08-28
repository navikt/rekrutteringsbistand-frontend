import RedigerBoks from '@/app/stilling/[stillingsId]/rediger/_ui/RedigerBoks';
import { BodyLong } from '@navikt/ds-react';

export default function ViktigeDatoer() {
  return (
    <RedigerBoks tittel='Viktige datoer'>
      <BodyLong>Velg oppstartsdato og søknadsfristen.</BodyLong>
    </RedigerBoks>
  );
}
