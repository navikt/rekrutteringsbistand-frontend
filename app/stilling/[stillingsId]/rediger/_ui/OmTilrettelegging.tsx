import { InkluderingsTag } from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';
import { getInkluderingsInfo } from '@/app/stilling/[stillingsId]/rediger-old/_ui/praktiskInfo/inkluderingsTagTekst';
import RedigerBoks from '@/app/stilling/[stillingsId]/rediger/_ui/_ui/RedigerBoks';
import { BodyLong, Checkbox, Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

const grupper = [
  {
    overskrift: 'Arbeidsgiver tilrettelegger for (valgfritt)',
    tags: [
      InkluderingsTag.TilretteleggingArbeidstid,
      InkluderingsTag.TilretteleggingFysisk,
      InkluderingsTag.TilretteleggingGrunnleggende,
      InkluderingsTag.TilretteleggingArbeidshverdagen,
    ],
  },
  {
    overskrift: 'Arbeidsgiver er åpen for folk med (valgfritt)',
    tags: [
      InkluderingsTag.VirkemiddelLønnstilskudd,
      InkluderingsTag.VirkemiddelMentortilskudd,
      InkluderingsTag.VirkemiddelLærlingplass,
    ],
  },
  {
    overskrift: 'Arbeidsgiver er åpen for folk som (valgfritt)',
    tags: [
      InkluderingsTag.MålgruppeErUngeUnder30,
      InkluderingsTag.MålgruppeErSeniorerOver50,
      InkluderingsTag.MålgruppeKommerFraLandUtenforEØS,
      InkluderingsTag.MålgruppeHullICVen,
      InkluderingsTag.MålgruppeLiteEllerIngenUtdanning,
      InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring,
    ],
  },
];

export default function OmTilrettelegging() {
  const { watch, setValue } = useFormContext<any>();

  const tags: string[] = watch('omTilrettelegging.tags') ?? [];

  // Sikre at felt eksisterer
  if (watch('omTilrettelegging.statligeInkluderingsdugnade') === undefined) {
    setValue('omTilrettelegging.statligeInkluderingsdugnade', false);
  }
  if (!Array.isArray(tags)) {
    setValue('omTilrettelegging.tags', []);
  }

  const toggleTag = (tag: InkluderingsTag) => {
    const current = watch('omTilrettelegging.tags') || [];
    if (current.includes(tag)) {
      setValue(
        'omTilrettelegging.tags',
        current.filter((t: string) => t !== tag),
        { shouldDirty: true, shouldTouch: true },
      );
      if (tag === InkluderingsTag.StatligInkluderingsdugnad) {
        setValue('omTilrettelegging.statligeInkluderingsdugnade', false);
      }
    } else {
      setValue('omTilrettelegging.tags', [...current, tag], {
        shouldDirty: true,
        shouldTouch: true,
      });
      if (tag === InkluderingsTag.StatligInkluderingsdugnad) {
        setValue('omTilrettelegging.statligeInkluderingsdugnade', true);
      }
    }
  };

  const inkluderingChecked = (tag: InkluderingsTag) =>
    (watch('omTilrettelegging.tags') || []).includes(tag);

  return (
    <RedigerBoks tittel='Om tilrettelegging'>
      <div className='flex flex-col gap-10'>
        <BodyLong>
          Fortell om hvordan arbeidsgiveren legger til rette for jobbsøkeren.
        </BodyLong>

        {grupper.map((g) => (
          <div key={g.overskrift} className='flex flex-col gap-3'>
            <Heading level='3' size='xsmall'>
              {g.overskrift}
            </Heading>
            {g.tags.map((tag) => {
              const info = getInkluderingsInfo(tag);
              return (
                <Checkbox
                  key={tag}
                  checked={inkluderingChecked(tag)}
                  onChange={() => toggleTag(tag)}
                >
                  <div>
                    <span>{info.tittel}</span>
                    {info.beskrivelse && (
                      <div className='text-sm'>{info.beskrivelse}</div>
                    )}
                  </div>
                </Checkbox>
              );
            })}
          </div>
        ))}

        <div className='flex flex-col gap-2'>
          <Heading level='3' size='xsmall'>
            Har arbeidsgiver avtale om inkluderingssamarbeid?
          </Heading>
          <BodyLong className='text-gray-700'>
            Gjelder offentlige virksomheter med samarbeidsavtale, eller
            strategisk partneravtale.
          </BodyLong>
          <Checkbox
            checked={inkluderingChecked(
              InkluderingsTag.StatligInkluderingsdugnad,
            )}
            onChange={() =>
              toggleTag(InkluderingsTag.StatligInkluderingsdugnad)
            }
          >
            Ja
          </Checkbox>
        </div>
      </div>
    </RedigerBoks>
  );
}
