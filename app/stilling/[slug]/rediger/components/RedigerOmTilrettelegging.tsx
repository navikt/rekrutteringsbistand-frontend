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
import { StillingsDataDTO } from '../../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import StegNavigering from './StegNavigering';

export const RedigerOmTilrettelegging: React.FC<{
  stegNummer: number;
  nextStep: () => void;
  forrigeSteg: () => void;
}> = ({ nextStep, forrigeSteg, stegNummer }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<StillingsDataDTO>();

  const onSubmit: SubmitHandler<StillingsDataDTO> = (data) => {
    nextStep();
  };

  const [kanInkludere, setKanInkludere] = React.useState<string>('');

  return (
    <div className='space-y-8'>
      <Heading size='large'>Om tilrettelegging</Heading>
      <p>Vi må vite hvordan arbeidsgiver tilrettelegger for kandidater.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-8 mb-12'>
          <CheckboxGroup legend='Virksomheten tilrettelegger for' disabled>
            <Checkbox
              value='arbeidstid'
              //  {...register('tilretteleggingFor')}
            >
              arbeidstid
              <div className='text-sm text-gray-600'>
                f.eks. kortere dager, eller gradvis økt stillingsprosent
              </div>
            </Checkbox>
            <Checkbox
              value='fysiskeOmgivelser'
              // {...register('tilretteleggingFor')}
            >
              fysiske omgivelser
              <div className='text-sm text-gray-600'>
                f.eks. ergonomisk tilpasning, eller universell utforming
              </div>
            </Checkbox>
            <Checkbox
              value='utfordringerMedNorsk'
              // {...register('tilretteleggingFor')}
            >
              utfordringer med norsk
              <div className='text-sm text-gray-600'>
                f.eks. ved lese- og skrivevansker, språk- og taleforstyrrelse,
                eller utfordringer med norsk fordi man kommer fra et annet land.
              </div>
            </Checkbox>
            <Checkbox
              value='arbeidshverdagen'
              // {...register('tilretteleggingFor')}
            >
              arbeidshverdagen
              <div className='text-sm text-gray-600'>
                f.eks. opplæring, tilpasse arbeidsoppgaver, eller ekstra tett
                oppfølging
              </div>
            </Checkbox>
          </CheckboxGroup>

          <CheckboxGroup
            disabled
            legend='Virksomheten er åpen for folk som har'
          >
            <Checkbox
              value='lonnstilskudd'
              // {...register('apenFor')}
            >
              lønnstilskudd - midlertidig, eller varig
              <div className='text-sm text-gray-600'>
                Kandidaten blir ansatt under vanlige arbeidsvilkår, men NAV
                kompenserer en del av lønnen.
              </div>
            </Checkbox>
            <Checkbox
              value='mentor'
              // {...register('apenFor')}
            >
              mentor
              <div className='text-sm text-gray-600'>
                En kollega hjelper kandidaten med å mestre jobben. NAV
                kompenserer virksomheten med mentortilskudd.
              </div>
            </Checkbox>
            <Checkbox
              value='laeringsplass'
              // {...register('apenFor')}
            >
              læringsplass
              <div className='text-sm text-gray-600'>
                Gir opplæring i læreplaner for fag. Virksomheten må være
                godkjennet som lærebedrift.
                <Link href='#' target='_blank' rel='noopener noreferrer'>
                  Les mer om hva bedriften må gjøre.
                </Link>
              </div>
            </Checkbox>
          </CheckboxGroup>

          <CheckboxGroup
            disabled
            legend='Arbeidsgiver er åpen for kandidater som'
          >
            <Checkbox
              value='under30'
              //  {...register('apenForKandidater')}
            >
              er under 30 år
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å hindre at unge havner utenfor
                arbeidslivet.
              </div>
            </Checkbox>
            <Checkbox
              value='over50'
              // {...register('apenForKandidater')}
            >
              er over 50 år
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å forlenge yrkeslivet og senkarieren til
                innbyggere.
              </div>
            </Checkbox>
            <Checkbox
              value='utenforEOS'
              // {...register('apenForKandidater')}
            >
              er fra land utenfor EØS
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker at flere innvandrere utenfor EØS blir
                inkludert, og får erfaring som det norske arbeidslivet trenger.
              </div>
            </Checkbox>
            <Checkbox
              value='ikkeArbeidSiste5'
              // {...register('apenForKandidater')}
            >
              ikke har vært i arbeid, utdanning, eller opplæring 2 av de siste 5
              årene.
            </Checkbox>
            <Checkbox
              value='litenArbeidserfaring'
              // {...register('apenForKandidater')}
            >
              med 1 år, eller mindre arbeidserfaring
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å ansette folk som er nye i arbeidsmarkedet.
              </div>
            </Checkbox>
            <Checkbox
              value='ikkeFullfortSkole'
              // {...register('apenForKandidater')}
            >
              ikke har fullført videregående skole.
              <div className='text-sm text-gray-600'>
                Virksomheten ønsker å inkludere unge uten fullført
                grunnskoleutdanning.
              </div>
            </Checkbox>
          </CheckboxGroup>

          <RadioGroup
            legend='Er virksomheten del av den statlige inkluderingsdugnaden?'
            required={true}

            // error={errors.inkluderingsdugnad ? 'Påkrevd' : undefined}
          >
            <Radio
              checked={kanInkludere === 'kanInkludere'}
              value='true'
              onChange={() => setKanInkludere('kanInkludere')}
            >
              Ja
            </Radio>
            <Radio
              checked={kanInkludere === 'kanIkkeInkludere'}
              value='false'
              onChange={() => setKanInkludere('kanIkkeInkludere')}
            >
              Nei
            </Radio>
          </RadioGroup>
        </div>
        <StegNavigering stegNummer={stegNummer} forrigeSteg={forrigeSteg} />
      </form>
    </div>
  );
};
