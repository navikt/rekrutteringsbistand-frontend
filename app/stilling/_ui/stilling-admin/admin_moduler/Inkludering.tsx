import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { InkluderingsTag } from '@/app/stilling/[stillingsId]/_ui/om-stillingen/StillingSidebar/StillingInkludering';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { Switch } from '@navikt/ds-react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

// interface TagGruppe {
//   navn: string;
//   tags: InkluderingsTag[];
// }

// const grupper: TagGruppe[] = [
//   {
//     navn: 'Tilrettelegging',
//     tags: [
//       InkluderingsTag.TilretteleggingArbeidstid,
//       InkluderingsTag.TilretteleggingFysisk,
//       InkluderingsTag.TilretteleggingArbeidshverdagen,
//       InkluderingsTag.TilretteleggingGrunnleggende,
//     ],
//   },
//   {
//     navn: 'Tiltak eller virkemiddel',
//     tags: [
//       InkluderingsTag.VirkemiddelLønnstilskudd,
//       InkluderingsTag.VirkemiddelMentortilskudd,
//       InkluderingsTag.VirkemiddelLærlingplass,
//     ],
//   },
//   {
//     navn: 'Prioritert målgruppe',
//     tags: [
//       InkluderingsTag.MålgruppeErUngeUnder30,
//       InkluderingsTag.MålgruppeErSeniorerOver50,
//       InkluderingsTag.MålgruppeKommerFraLandUtenforEØS,
//       InkluderingsTag.MålgruppeHullICVen,
//       InkluderingsTag.MålgruppeLiteEllerIngenUtdanning,
//       InkluderingsTag.MålgruppeLiteEllerIngenArbeidserfaring,
//     ],
//   },
// ];

export default function Inkludering() {
  const { watch, setValue } = useFormContext<StillingsDataDTO>();
  const raw = watch('stilling.properties.tags');
  const valgte: InkluderingsTag[] = useMemo(() => {
    if (!raw) return [];
    try {
      if (Array.isArray(raw)) return raw as InkluderingsTag[]; // fallback dersom backend senere endrer
      return JSON.parse(raw) as InkluderingsTag[];
    } catch {
      return [];
    }
  }, [raw]);

  const toggleTag = (tag: InkluderingsTag) => {
    const finnes = valgte.includes(tag);
    const oppdatert = finnes
      ? valgte.filter((t) => t !== tag)
      : [...valgte, tag];
    setValue('stilling.properties.tags', JSON.stringify(oppdatert) as any, {
      shouldDirty: true,
    });
  };

  return (
    <RedigerBoks tittel='Om tilrettelegging'>
      {/* <div className='flex flex-col gap-10'> */}
      {/* {grupper.map((g) => (
          <div key={g.navn} className='flex flex-col gap-4'>
            <Heading size='xsmall'>{g.navn}</Heading>
            <div className='flex flex-col '>
              {g.tags.map((tag) => (
                <Checkbox
                  key={tag}
                  checked={valgte.includes(tag)}
                  onChange={() => toggleTag(tag)}
                >
                  {visningsnavnForRegistrering[tag] || tag}
                </Checkbox>
              ))}
            </div>
          </div>
        ))} */}
      <div className='flex flex-col gap-2'>
        <Switch
          defaultChecked={valgte.includes(
            InkluderingsTag.StatligInkluderingsdugnad,
          )}
          onChange={() => toggleTag(InkluderingsTag.StatligInkluderingsdugnad)}
          description='Gjelder offentlige virksomheter med samarbeidsavtale, eller strategisk partneravtale.'
        >
          Arbeidsgiver har avtale om inkluderingssamarbeid
        </Switch>
      </div>
    </RedigerBoks>
  );
}
