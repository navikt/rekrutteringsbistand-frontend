import {
  Checkbox,
  CheckboxGroup,
  Heading,
  Link,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import * as React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { InkluderingsTag } from '../omStillingen/StillingSidebar/StillingInkludering';
import StegNavigering from './components/StegNavigering';
import { StillingsDataForm } from './redigerFormType.zod';

export const RedigerOmTilrettelegging: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const { handleSubmit, watch, setValue } = useFormContext<StillingsDataForm>();

  const onSubmit: SubmitHandler<StillingsDataForm> = (data) => {
    nextStep();
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
      <p>Vi må vite hvordan arbeidsgiver tilrettelegger for kandidater.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-8 mb-12'>
          <CheckboxGroup legend='Virksomheten tilrettelegger for'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingArbeidstid}
            >
              Arbeidstid
              <div className='text-sm text-gray-600'>
                f.eks. kortere dager, eller gradvis økt stillingsprosent
              </div>
            </TilretteleggingCheckbox>

            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingFysisk}
            >
              Fysiske omgivelser
              <div className='text-sm text-gray-600'>
                f.eks. ergonomisk tilpasning, eller universell utforming
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingGrunnleggende}
            >
              Utfordringer med norsk
              <div className='text-sm text-gray-600'>
                f.eks. ved lese- og skrivevansker, språk- og taleforstyrrelse,
                eller utfordringer med norsk fordi man kommer fra et annet land.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingArbeidshverdagen}
            >
              Arbeidshverdagen
              <div className='text-sm text-gray-600'>
                f.eks. opplæring, tilpasse arbeidsoppgaver, eller ekstra tett
                oppfølging
              </div>
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <CheckboxGroup legend='Virksomheten er åpen for folk som har'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelLønnstilskudd}
            >
              Lønnstilskudd - midlertidig, eller varig
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
              Læringsplass
              <div className='text-sm text-gray-600'>
                Gir opplæring i læreplaner for fag. Virksomheten må være
                godkjennet som lærebedrift.
                <Link href='#' target='_blank' rel='noopener noreferrer'>
                  Les mer om hva bedriften må gjøre.
                </Link>
              </div>
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <CheckboxGroup legend='Arbeidsgiver er åpen for kandidater som'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErUngeUnder30}
            >
              er under 30 år
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å hindre at unge havner utenfor
                arbeidslivet.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErSeniorerOver50}
            >
              er over 50 år
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å forlenge yrkeslivet og senkarieren til
                innbyggere.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeKommerFraLandUtenforEØS}
            >
              er fra land utenfor EØS
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker at flere innvandrere utenfor EØS blir
                inkludert, og får erfaring som det norske arbeidslivet trenger.
              </div>
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox tag={InkluderingsTag.MålgruppeHullICVen}>
              har hull i CV-en
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenUtdanning}
            >
              har lite eller ingen utdanning
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenUtdanning}
            >
              har lite eller ingen utdanning
            </TilretteleggingCheckbox>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring}
            >
              har lite eller ingen arbeidserfaring
            </TilretteleggingCheckbox>
          </CheckboxGroup>

          <RadioGroup
            legend='Er virksomheten del av den statlige inkluderingsdugnaden?'
            required={true}
            value={watch('omTilrettelegging.statligeInkluderingsdugnade')}
            onChange={(val) => {
              if (val) {
                setValue('omTilrettelegging.statligeInkluderingsdugnade', true);
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
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
