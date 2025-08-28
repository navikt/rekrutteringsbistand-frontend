import { InkluderingsTag } from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';

export interface InkluderingInfo {
  tittel: string;
  beskrivelse?: string;
}

export const inkluderingsTagInfo: Record<string, InkluderingInfo> = {
  [InkluderingsTag.TilretteleggingArbeidstid]: {
    tittel: 'Arbeidstid',
    beskrivelse: 'f.eks. kortere dager eller gradvis økt stillingsprosent',
  },
  [InkluderingsTag.TilretteleggingFysisk]: {
    tittel: 'Fysiske omgivelser',
    beskrivelse: 'f.eks. ergonomisk tilpasning eller universell utforming',
  },
  [InkluderingsTag.TilretteleggingGrunnleggende]: {
    tittel: 'Utfordringer med norsk',
    beskrivelse:
      'f.eks. ved lese- og skrivevansker, språk- og taleforstyrrelse eller utfordringer med norsk.',
  },
  [InkluderingsTag.TilretteleggingArbeidshverdagen]: {
    tittel: 'Arbeidshverdagen',
    beskrivelse:
      'f.eks. opplæring, tilpasse arbeidsoppgaver eller ekstra tett oppfølging',
  },
  [InkluderingsTag.VirkemiddelLønnstilskudd]: {
    tittel: 'Lønnstilskudd - midlertidig eller varig',
    beskrivelse:
      'Kandidaten blir ansatt under vanlige arbeidsvilkår, men Nav kompenserer en del av lønnen.',
  },
  [InkluderingsTag.VirkemiddelMentortilskudd]: {
    tittel: 'Mentor (tilskudd)',
    beskrivelse:
      'En kollega hjelper kandidaten med å mestre jobben. Nav kompenserer virksomheten med mentortilskudd.',
  },
  [InkluderingsTag.VirkemiddelLærlingplass]: {
    tittel: 'Lærlingplass',
    beskrivelse:
      'Gir opplæring i læreplaner for fag. Virksomheten må være godkjent som lærebedrift.',
  },
  [InkluderingsTag.MålgruppeErUngeUnder30]: {
    tittel: 'Er under 30 år',
  },
  [InkluderingsTag.MålgruppeErSeniorerOver50]: {
    tittel: 'Er over 50 år',
  },
  [InkluderingsTag.MålgruppeKommerFraLandUtenforEØS]: {
    tittel: 'Er fra land utenfor EØS',
  },
  [InkluderingsTag.MålgruppeHullICVen]: {
    tittel: 'Har hull i CV-en',
  },
  [InkluderingsTag.MålgruppeLiteEllerIngenUtdanning]: {
    tittel: 'Har lite eller ingen utdanning',
  },
  [InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring]: {
    tittel: 'Har lite eller ingen arbeidserfaring',
  },
  [InkluderingsTag.StatligInkluderingsdugnad]: {
    tittel: 'Ja',
  },
};

/**
 * Helper function to get inkludering information by tag
 */
export const getInkluderingsInfo = (tag: string): InkluderingInfo => {
  return inkluderingsTagInfo[tag] || { tittel: tag };
};
