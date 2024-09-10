import { CheckmarkIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import TekstMedIkon from '../../../../../components/TekstMedIkon';
import { useStillingsContext } from '../../StillingsContext';

export enum InkluderingsTag {
  Tilrettelegging = 'INKLUDERING',
  TilretteleggingArbeidstid = 'INKLUDERING__ARBEIDSTID',
  TilretteleggingFysisk = 'INKLUDERING__FYSISK',
  TilretteleggingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
  TilretteleggingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',

  TiltakEllerVirkemiddel = 'TILTAK_ELLER_VIRKEMIDDEL',
  VirkemiddelLønnstilskudd = 'TILTAK_ELLER_VIRKEMIDDEL__LØNNSTILSKUDD',
  VirkemiddelMentortilskudd = 'TILTAK_ELLER_VIRKEMIDDEL__MENTORTILSKUDD',
  VirkemiddelLærlingplass = 'TILTAK_ELLER_VIRKEMIDDEL__LÆRLINGPLASS',

  PrioritertMålgruppe = 'PRIORITERT_MÅLGRUPPE',
  MålgruppeErUngeUnder30 = 'PRIORITERT_MÅLGRUPPE__UNGE_UNDER_30',
  MålgruppeErSeniorerOver50 = 'PRIORITERT_MÅLGRUPPE__SENIORER_OVER_45',
  MålgruppeKommerFraLandUtenforEØS = 'PRIORITERT_MÅLGRUPPE__KOMMER_FRA_LAND_UTENFOR_EØS',
  MålgruppeHullICVen = 'PRIORITERT_MÅLGRUPPE__HULL_I_CV_EN',
  MålgruppeLiteEllerIngenUtdanning = 'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_UTDANNING',
  MålgruppeLiteEllerIngenArbeidserfaring = 'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_ARBEIDSERFARING',

  StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

export const visningsnavnForRegistrering: Partial<
  Record<InkluderingsTag, string>
> = {
  [InkluderingsTag.TilretteleggingArbeidstid]: 'arbeidstid',
  [InkluderingsTag.TilretteleggingFysisk]: 'fysisk tilrettelegging',
  [InkluderingsTag.TilretteleggingArbeidshverdagen]: 'arbeidshverdagen',
  [InkluderingsTag.TilretteleggingGrunnleggende]: 'utfordringer med norsk',
  [InkluderingsTag.VirkemiddelLønnstilskudd]: 'lønnstilskudd',
  [InkluderingsTag.VirkemiddelMentortilskudd]: 'mentor (tilskudd)',
  [InkluderingsTag.VirkemiddelLærlingplass]: 'lærlingplass',
  [InkluderingsTag.MålgruppeErUngeUnder30]: 'er unge under 30 år',
  [InkluderingsTag.MålgruppeErSeniorerOver50]: 'er seniorer 50+',
  [InkluderingsTag.MålgruppeKommerFraLandUtenforEØS]:
    'kommer fra land utenfor EØS',
  [InkluderingsTag.MålgruppeHullICVen]: 'har hull i CV-en',
  [InkluderingsTag.MålgruppeLiteEllerIngenUtdanning]:
    'har lite eller ingen utdanning',
  [InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring]:
    'har lite eller ingen arbeidserfaring',
  [InkluderingsTag.StatligInkluderingsdugnad]:
    'den statlige inkluderingsdugnaden \n(gjelder kun statlige virksomheter med avtale)',
};

const StillingInkludering: React.FC = () => {
  const { stillingsData } = useStillingsContext();

  const registrerteTags: InkluderingsTag[] = JSON.parse(
    stillingsData.stilling?.properties?.tags ?? '',
  );

  const tilrettelegging = registrerteTags.some((e) =>
    e.startsWith('INKLUDERING'),
  );

  const tiltakEllerVirkemiddel = registrerteTags.some((e) =>
    e.startsWith('TILTAK_ELLER_VIRKEMIDDEL'),
  );

  const prioriterteMålgrupper = registrerteTags.some((e) =>
    e.startsWith('PRIORITERT_MÅLGRUPPE'),
  );
  const statligInkluderingsdugnad = registrerteTags.some((e) =>
    e.startsWith('STATLIG_INKLUDERINGSDUGNAD'),
  );

  return (
    <div className='border-blue-200 rounded mt-4 border p-3'>
      <Heading size='xsmall'>Inkludering</Heading>
      {registrerteTags.map((tag) => (
        <TekstMedIkon
          key={tag}
          ikon={<CheckmarkIcon />}
          tekst={visningsnavnForRegistrering[tag as InkluderingsTag]}
        />
      ))}
    </div>
  );
};

export default StillingInkludering;
