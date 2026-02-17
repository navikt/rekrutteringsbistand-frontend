import { InfoCard } from '@navikt/ds-react';

export default function FeilLenkeMelding() {
  return (
    <InfoCard data-color={'warning'}>
      <InfoCard.Header>
        <InfoCard.Title>Feil i URL</InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content>
        Lenken du skrev inn ser ikke ut til å være en gyldig
        rekrutteringsbistand-lenke. Dersom noen gav deg denne, bør du kanskje be
        dem om å sende korrekt lenke.
      </InfoCard.Content>
    </InfoCard>
  );
}
