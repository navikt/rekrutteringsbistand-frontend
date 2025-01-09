import {
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { InkluderingsTag } from '../../omStillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from '../redigerFormType.zod';
import StegNavigering from './StegNavigering';

export const RedigerOmTilrettelegging: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { handleSubmit, watch, setValue, trigger } =
    useFormContext<StillingsDataForm>();

  const [kanInkludere, setKanInkludere] = React.useState<boolean | null>(null);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await trigger('omTilrettelegging', { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };

  React.useEffect(() => {
    if (kanInkludere === false) {
      setValue('omTilrettelegging.statligeInkluderingsdugnade', false);
      setValue('omTilrettelegging.tags', []);
    }
  }, [kanInkludere]);

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
      <RadioGroup
        legend='Kan arbeidsgiver inkludere?'
        onChange={(val) => setKanInkludere(val)}
      >
        <Radio value={true}>Ja, arbeidsgiver kan inkludere</Radio>
        <Radio value={false}>Nei, arbeidsgiver kan ikke inkludere</Radio>
      </RadioGroup>
      <form onSubmit={handleStepSubmit}>
        {kanInkludere && (
          <div className='flex flex-col gap-8 mb-12'>
            <CheckboxGroup legend='Virksomheten kan tilrettelegge for (valgfritt)'>
              <TilretteleggingCheckbox
                tag={InkluderingsTag.TilretteleggingArbeidstid}
              >
                Arbeidstid
                <div className='text-sm text-gray-600'>
                  f.eks. kortere dager eller gradvis økt stillingsprosent
                </div>
              </TilretteleggingCheckbox>

              <TilretteleggingCheckbox
                tag={InkluderingsTag.TilretteleggingFysisk}
              >
                Fysiske omgivelser
                <div className='text-sm text-gray-600'>
                  f.eks. ergonomisk tilpasning eller universell utforming
                </div>
              </TilretteleggingCheckbox>
              <TilretteleggingCheckbox
                tag={InkluderingsTag.TilretteleggingGrunnleggende}
              >
                Utfordringer med norsk
                <div className='text-sm text-gray-600'>
                  f.eks. ved lese- og skrivevansker, språk- og taleforstyrrelse
                  eller utfordringer med norsk.
                </div>
              </TilretteleggingCheckbox>
              <TilretteleggingCheckbox
                tag={InkluderingsTag.TilretteleggingArbeidshverdagen}
              >
                Arbeidshverdagen
                <div className='text-sm text-gray-600'>
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
                <div className='text-sm text-gray-600'>
                  Kandidaten blir ansatt under vanlige arbeidsvilkår, men NAV
                  kompenserer en del av lønnen.
                </div>
              </TilretteleggingCheckbox>
              <TilretteleggingCheckbox
                tag={InkluderingsTag.VirkemiddelMentortilskudd}
              >
                Mentor (tilskudd)
                <div className='text-sm text-gray-600'>
                  En kollega hjelper kandidaten med å mestre jobben. NAV
                  kompenserer virksomheten med mentortilskudd.
                </div>
              </TilretteleggingCheckbox>
              <TilretteleggingCheckbox
                tag={InkluderingsTag.VirkemiddelLærlingplass}
              >
                Lærlingplass
                <div className='text-sm text-gray-600'>
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

            <RadioGroup
              legend='Er virksomheten del av den statlige inkluderingsdugnaden?'
              required={true}
              value={watch('omTilrettelegging.statligeInkluderingsdugnade')}
              onChange={(val) => {
                if (val) {
                  setValue(
                    'omTilrettelegging.statligeInkluderingsdugnade',
                    true,
                  );
                  setValue('omTilrettelegging.tags', [
                    ...watch('omTilrettelegging.tags'),
                    InkluderingsTag.StatligInkluderingsdugnad,
                  ]);
                } else {
                  setValue(
                    'omTilrettelegging.statligeInkluderingsdugnade',
                    false,
                  );
                  setValue('omTilrettelegging.tags', [
                    ...watch('omTilrettelegging.tags').filter(
                      (t: string) =>
                        t !== InkluderingsTag.StatligInkluderingsdugnad,
                    ),
                  ]);
                }
              }}
            >
              <Radio value={true}>Ja</Radio>
              <Radio value={false}>Nei</Radio>
            </RadioGroup>
          </div>
        )}
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
