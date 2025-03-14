import { FormidlingDataForm } from '../../../../etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { InkluderingsTag } from '../../omStillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';
import {
  BodyShort,
  Checkbox,
  CheckboxGroup,
  Heading,
  HelpText,
} from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface RedigerOmTilretteleggingProps {
  omTilretteleggingFelt: 'omTilrettelegging';
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}

export const RedigerOmTilrettelegging: React.FC<
  RedigerOmTilretteleggingProps
> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { watch, setValue, trigger } = useFormContext<
    StillingsDataForm | FormidlingDataForm
  >();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omTilrettelegging', { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };

  const TilretteleggingCheckbox = ({
    tag,
    children,
  }: {
    tag: string;
    children: React.ReactNode;
  }) => {
    return (
      <Checkbox
        value={tag}
        defaultChecked={watch('omTilrettelegging.tags')?.includes(tag)}
        onChange={(e) => {
          if (e.target.checked) {
            setValue('omTilrettelegging.tags', [
              ...watch('omTilrettelegging.tags'),
              tag,
            ]);
          } else {
            setValue('omTilrettelegging.tags', [
              ...watch('omTilrettelegging.tags').filter(
                (t: string) => t !== tag,
              ),
            ]);
          }
        }}
      >
        {children}
      </Checkbox>
    );
  };

  return (
    <div className='space-y-8'>
      <Heading size='large'>Om tilrettelegging</Heading>

      <form onSubmit={handleStepSubmit}>
        <div className='mb-12 flex flex-col gap-8'>
          <CheckboxGroup legend='Virksomheten kan tilrettelegge for (valgfritt)'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingArbeidstid}
            >
              Arbeidstid
              <div className='text-sm'>
                f.eks. kortere dager eller gradvis økt stillingsprosent
              </div>
            </TilretteleggingCheckbox>

            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingFysisk}
            >
              Fysiske omgivelser
              <div className='text-sm'>
                f.eks. ergonomisk tilpasning eller universell utforming
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingGrunnleggende}
            >
              Utfordringer med norsk
              <div className='text-sm'>
                f.eks. ved lese- og skrivevansker, språk- og taleforstyrrelse
                eller utfordringer med norsk.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingArbeidshverdagen}
            >
              Arbeidshverdagen
              <div className='text-sm'>
                f.eks. opplæring, tilpasse arbeidsoppgaver eller ekstra tett
                oppfølging
              </div>
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <CheckboxGroup legend='Virksomheten er åpen for folk som trenger (valgfritt)'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelLønnstilskudd}
            >
              Lønnstilskudd - midlertidig eller varig
              <div className='text-sm'>
                Kandidaten blir ansatt under vanlige arbeidsvilkår, men Nav
                kompenserer en del av lønnen.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelMentortilskudd}
            >
              Mentor (tilskudd)
              <div className='text-sm'>
                En kollega hjelper kandidaten med å mestre jobben. Nav
                kompenserer virksomheten med mentortilskudd.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelLærlingplass}
            >
              Lærlingplass
              <div className='text-sm'>
                Gir opplæring i læreplaner for fag. Virksomheten må være
                godkjent som lærebedrift.
              </div>
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <CheckboxGroup legend='Arbeidsgiver er åpen for kandidater som (valgfritt)'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErUngeUnder30}
            >
              Er under 30 år
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErSeniorerOver50}
            >
              Er over 50 år
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeKommerFraLandUtenforEØS}
            >
              Er fra land utenfor EØS
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox tag={InkluderingsTag.MålgruppeHullICVen}>
              Har hull i CV-en
            </TilretteleggingCheckbox>

            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenUtdanning}
            >
              Har lite eller ingen utdanning
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring}
            >
              Har lite eller ingen arbeidserfaring
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <CheckboxGroup
            hideLegend
            legend='Inkluderingssamarbeid med offentlig virksomhet? (valgfritt)'
          >
            <div className='flex'>
              <BodyShort weight='semibold'>
                Inkluderingssamarbeid med offentlig virksomhet? (valgfritt)
              </BodyShort>
              <HelpText title='Hvor kommer dette fra?'>
                Dette gjelder offentlige virksomheter med samarbeidsavtale eller
                strategisk partneravtale
              </HelpText>
            </div>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.StatligInkluderingsdugnad}
            >
              Ja
            </TilretteleggingCheckbox>
          </CheckboxGroup>
        </div>
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
