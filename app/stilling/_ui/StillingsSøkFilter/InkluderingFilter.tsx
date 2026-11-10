import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Hovedtag, Subtag } from '@/app/stilling/_util/stillingssøk-typer';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FC, Fragment } from 'react';

type GruppeMedTags = {
  hovedtag: Hovedtag;
  subtags: Subtag[];
};

export const visningsnavnForFilter = {
  [Hovedtag.Tilrettelegging]: 'Tilrettelegging',
  [Subtag.TilretteleggingArbeidstid]: 'Arbeidstid',
  [Subtag.TilretteleggingFysisk]: 'Fysisk tilrettelegging',
  [Subtag.TilretteleggingArbeidshverdagen]: 'Arbeidshverdagen',
  [Subtag.TilretteleggingGrunnleggende]: 'Utfordringer med norsk',
  [Hovedtag.TiltakEllerVirkemiddel]: 'Bruk av virkemidler',
  [Subtag.VirkemiddelLønnstilskudd]: 'Lønnstilskudd',
  [Subtag.VirkemiddelMentortilskudd]: 'Mentortilskudd',
  [Subtag.VirkemiddelLærlingplass]: 'Lærlingplass',
  [Hovedtag.PrioritertMålgruppe]: 'Prioriterte målgrupper',
  [Subtag.MålgruppeErUngeUnder30]: 'Unge under 30 år',
  [Subtag.MålgruppeErSeniorerOver50]: 'Seniorer 50+',
  [Subtag.MålgruppeKommerFraLandUtenforEØS]: 'Borgere fra land utenfor EØS',
  [Subtag.MålgruppeHullICVen]: 'Hull i CV-en',
  [Subtag.MålgruppeLiteEllerIngenUtdanning]: 'Lite eller ingen utdanning',
  [Subtag.MålgruppeLiteEllerIngenArbeidserfaring]:
    'Lite eller ingen arbeidserfaring',
  [Hovedtag.StatligInkluderingsdugnad]:
    'Inkluderingssamarbeid med offentlig virksomhet',
};

export const hierarkiAvTagsForFilter: Array<GruppeMedTags> = [
  // {
  //   hovedtag: Hovedtag.Tilrettelegging,
  //   subtags: [
  //     Subtag.TilretteleggingArbeidstid,
  //     Subtag.TilretteleggingArbeidshverdagen,
  //     Subtag.TilretteleggingFysisk,
  //     Subtag.TilretteleggingGrunnleggende,
  //   ],
  // },
  // {
  //   hovedtag: Hovedtag.TiltakEllerVirkemiddel,
  //   subtags: [
  //     Subtag.VirkemiddelLønnstilskudd,
  //     Subtag.VirkemiddelMentortilskudd,
  //     Subtag.VirkemiddelLærlingplass,
  //   ],
  // },
  // {
  //   hovedtag: Hovedtag.PrioritertMålgruppe,
  //   subtags: [
  //     Subtag.MålgruppeErUngeUnder30,
  //     Subtag.MålgruppeErSeniorerOver50,
  //     Subtag.MålgruppeKommerFraLandUtenforEØS,
  //     Subtag.MålgruppeHullICVen,
  //     Subtag.MålgruppeLiteEllerIngenUtdanning,
  //     Subtag.MålgruppeLiteEllerIngenArbeidserfaring,
  //   ],
  // },
  { hovedtag: Hovedtag.StatligInkluderingsdugnad, subtags: [] },
];

const InkluderingFilter: FC = () => {
  const { track } = useUmami();
  const {
    inkludering,
    setInkludering,
    inkluderingUnderkategori,
    setInkluderingUnderkategori,
  } = useStillingsSøkFilter();

  const trackOgSetInkludering = (value: string[]) => {
    setInkludering(value);
    if (value.length > 0) {
      track(UmamiEvent.Stilling.inkludering_filter_søk, {
        inkludering: value.join(', '),
      });
    }
  };

  return (
    <CheckboxGroup
      size='small'
      legend='Inkludering'
      value={inkludering}
      onChange={trackOgSetInkludering}
    >
      {hierarkiAvTagsForFilter.map((gruppeMedTags) => (
        <Fragment key={gruppeMedTags.hovedtag}>
          <Checkbox value={gruppeMedTags.hovedtag}>
            {visningsnavnForFilter[gruppeMedTags.hovedtag]}
          </Checkbox>
          {inkludering.includes(gruppeMedTags.hovedtag) &&
            gruppeMedTags.subtags.length > 0 && (
              <CheckboxGroup
                className='ml-4'
                hideLegend
                legend={`Velg kategorier under ${gruppeMedTags.hovedtag}`}
                value={inkluderingUnderkategori}
                onChange={setInkluderingUnderkategori}
              >
                {gruppeMedTags.subtags.map((subtag) => (
                  <Checkbox key={subtag} value={subtag}>
                    {visningsnavnForFilter[subtag]}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
        </Fragment>
      ))}
    </CheckboxGroup>
  );
};

export default InkluderingFilter;
