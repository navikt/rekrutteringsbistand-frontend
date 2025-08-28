import StegNavigering from './StegNavigering';
import { getInkluderingsInfo } from './praktiskInfo/inkluderingsTagTekst';
import { FormidlingDataForm } from '@/app/etterregistrering/ny-etterregistrering/redigerFormidlingFormType';
import { InkluderingsTag } from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';
import { StillingsDataForm } from '@/app/stilling/[stillingsId]/rediger-old/redigerFormType.zod';
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

  React.useEffect(() => {
    if (!watch('omTilrettelegging.statligeInkluderingsdugnade')) {
      setValue('omTilrettelegging.statligeInkluderingsdugnade', false);
    }
    if (!watch('omTilrettelegging.tags')) {
      setValue('omTilrettelegging.tags', []);
    }
  }, [watch, setValue]);

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
    children?: React.ReactNode;
  }) => {
    const info = getInkluderingsInfo(tag);

    return (
      <Checkbox
        value={tag}
        defaultChecked={(watch('omTilrettelegging.tags') || []).includes(tag)}
        onChange={(e) => {
          const currentTags = watch('omTilrettelegging.tags') || [];
          if (e.target.checked) {
            setValue('omTilrettelegging.tags', [...currentTags, tag]);
          } else {
            setValue('omTilrettelegging.tags', [
              ...currentTags.filter((t: string) => t !== tag),
            ]);
          }
        }}
      >
        {children || (
          <>
            {info.tittel}
            {info.beskrivelse && (
              <div className='text-sm'>{info.beskrivelse}</div>
            )}
          </>
        )}
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
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingFysisk}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingGrunnleggende}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.TilretteleggingArbeidshverdagen}
            />
          </CheckboxGroup>

          <CheckboxGroup legend='Virksomheten er åpen for folk som trenger (valgfritt)'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelLønnstilskudd}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelMentortilskudd}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.VirkemiddelLærlingplass}
            />
          </CheckboxGroup>

          <CheckboxGroup legend='Arbeidsgiver er åpen for kandidater som (valgfritt)'>
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErUngeUnder30}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeErSeniorerOver50}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeKommerFraLandUtenforEØS}
            />
            <TilretteleggingCheckbox tag={InkluderingsTag.MålgruppeHullICVen} />

            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenUtdanning}
            />
            <TilretteleggingCheckbox
              tag={InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring}
            />
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
