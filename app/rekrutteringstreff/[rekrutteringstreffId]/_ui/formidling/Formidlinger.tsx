'use client';

import OpprettFormidlingFraTreffKnapp from '../header/actions/OpprettFormidlingFraTreffKnapp';
import FormidlingFilterrad from './FormidlingFilterrad';
import FormidlingRad from './FormidlingRad';
import FormidlingSortHeader from './FormidlingSortHeader';
import {
  FormidlingSortering,
  FormidlingSorteringsretning,
  standardRetningForFelt,
  useFormidlinger,
} from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { getMiljø, Miljø } from '@/util/miljø';
import { BodyShort, VStack } from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';

const Formidlinger: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const [sorteringsfelt, setSorteringsfelt] =
    useState<FormidlingSortering>('tidspunkt');
  const [sorteringsretning, setSorteringsretning] =
    useState<FormidlingSorteringsretning>('desc');
  const [valgteArbeidsgivere, setValgteArbeidsgivere] = useState<string[]>([]);

  const sorter = (felt: FormidlingSortering) => {
    if (felt === sorteringsfelt) {
      setSorteringsretning((forrige) => (forrige === 'asc' ? 'desc' : 'asc'));
    } else {
      setSorteringsfelt(felt);
      setSorteringsretning(standardRetningForFelt(felt));
    }
  };

  // Ufiltrert henting brukes til å bygge stabile arbeidsgivervalg uavhengig av aktivt filter.
  const alleFormidlingerHook = useFormidlinger(rekrutteringstreffId);
  const formidlingerHook = useFormidlinger(rekrutteringstreffId, {
    sortering: sorteringsfelt,
    retning: sorteringsretning,
    arbeidsgivere: valgteArbeidsgivere,
  });

  const arbeidsgivervalg = useMemo(() => {
    const data = alleFormidlingerHook.data ?? [];
    const unike = new Map(
      data.map((formidling) => [
        formidling.orgnr,
        formidling.orgnavn ?? formidling.orgnr,
      ]),
    );
    return Array.from(unike.entries())
      .map(([orgnr, orgnavn]) => ({ orgnr, orgnavn }))
      .sort((a, b) => a.orgnavn.localeCompare(b.orgnavn, 'nb'));
  }, [alleFormidlingerHook.data]);

  const harFormidlinger = (alleFormidlingerHook.data?.length ?? 0) > 0;

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='text-right'>
        {getMiljø() !== Miljø.ProdGcp && <OpprettFormidlingFraTreffKnapp />}
      </div>
      {harFormidlinger && (
        <FormidlingFilterrad
          arbeidsgivervalg={arbeidsgivervalg}
          valgteArbeidsgivere={valgteArbeidsgivere}
          setValgteArbeidsgivere={setValgteArbeidsgivere}
        />
      )}

      <SWRLaster hooks={[formidlingerHook]}>
        {(formidlinger) =>
          formidlinger.length === 0 ? (
            <BodyShort textColor='subtle'>
              {valgteArbeidsgivere.length > 0
                ? 'Ingen formidlinger for valgt arbeidsgiver.'
                : 'Ingen formidlinger er registrert for dette treffet ennå.'}
            </BodyShort>
          ) : (
            <VStack gap='space-4'>
              <FormidlingSortHeader
                sorteringsfelt={sorteringsfelt}
                sorteringsretning={sorteringsretning}
                onSorter={sorter}
              />
              {formidlinger.map((formidling) => (
                <FormidlingRad key={formidling.id} formidling={formidling} />
              ))}
            </VStack>
          )
        }
      </SWRLaster>
    </div>
  );
};

export default Formidlinger;
