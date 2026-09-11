import type { VurderingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import { FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/formidling/formidlingQuery';
import type { Navnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import { Vurderingsrad } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/Vurderingsrad';
import type { VurderingerForArbeidsgiver } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/vurderingsoversikt';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { BodyShort, ExpansionCard, VStack } from '@navikt/ds-react';

type Props = VurderingerForArbeidsgiver & {
  visNavn: Navnvisning;
  åpen: boolean;
  onToggle: (åpen: boolean) => void;
  feilForVurdering: (vurdering: VurderingDTO) => string | null;
  onLagreVurdering: (vurdering: VurderingDTO, jobbsøkernavn: string) => void;
};

const antallstekst = (antall: number) =>
  antall === 1 ? '1 jobbsøker' : `${antall} jobbsøkere`;

export default function Vurderingskort({
  arbeidsgiver,
  rader,
  visNavn,
  åpen,
  onToggle,
  feilForVurdering,
  onLagreVurdering,
}: Props) {
  const headingId = `registrering-av-status-${arbeidsgiver.arbeidsgiverTreffId}`;
  const formidlingerHref = `?visFane=${RekrutteringstreffTabs.FORMIDLINGER}&${FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM}=${encodeURIComponent(arbeidsgiver.organisasjonsnummer)}`;

  return (
    <ExpansionCard aria-labelledby={headingId} open={åpen} onToggle={onToggle}>
      <ExpansionCard.Header>
        <ExpansionCard.Title id={headingId} as='h4'>
          <AvkortetTekst>{arbeidsgiver.navn}</AvkortetTekst>
        </ExpansionCard.Title>
        <ExpansionCard.Description>
          {antallstekst(rader.length)}
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content className='[&>.aksel-expansioncard\_\_content-inner]:min-w-0'>
        {rader.length === 0 ? (
          <BodyShort>
            Ingen jobbsøkere med status hos denne arbeidsgiveren.
          </BodyShort>
        ) : (
          <VStack as='ul' gap='space-12' className='m-0 list-none p-0'>
            {rader.map((rad) => {
              const jobbsøkernavn = visNavn(rad.jobbsøker, 'Ukjent navn');
              return (
                <Vurderingsrad
                  key={`${rad.jobbsøker.personTreffId}:${arbeidsgiver.arbeidsgiverTreffId}`}
                  rad={rad}
                  jobbsøkernavn={jobbsøkernavn}
                  arbeidsgivernavn={arbeidsgiver.navn}
                  formidlingerHref={formidlingerHref}
                  lagringsfeil={feilForVurdering(rad.vurdering)}
                  onLagreVurdering={(vurdering) =>
                    onLagreVurdering(vurdering, jobbsøkernavn)
                  }
                />
              );
            })}
          </VStack>
        )}
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}
