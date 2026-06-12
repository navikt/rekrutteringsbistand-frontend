'use client';

import FormidlingRad, { formidlingKolonner } from './FormidlingRad';
import { useFormidlinger } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Label, VStack } from '@navikt/ds-react';
import { FC } from 'react';

const Formidlinger: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const formidlingerHook = useFormidlinger(rekrutteringstreffId);

  return (
    <SWRLaster hooks={[formidlingerHook]}>
      {(formidlinger) => (
        <div className='flex flex-col gap-4 p-4'>
          {formidlinger.length === 0 ? (
            <BodyShort textColor='subtle'>
              Ingen formidlinger er registrert for dette treffet ennå.
            </BodyShort>
          ) : (
            <VStack gap='space-4'>
              <div className='flex w-full items-center gap-3 border-b px-4 pb-2'>
                <Label
                  as='span'
                  size='small'
                  className={formidlingKolonner.navn}
                >
                  Jobbsøker
                </Label>
                <Label
                  as='span'
                  size='small'
                  className={formidlingKolonner.arbeidsgiver}
                >
                  Arbeidsgiver
                </Label>
                <Label
                  as='span'
                  size='small'
                  className={formidlingKolonner.formidlet}
                >
                  Formidlet
                </Label>
                <span className={formidlingKolonner.handlinger} aria-hidden />
              </div>
              {formidlinger.map((formidling) => (
                <FormidlingRad key={formidling.id} formidling={formidling} />
              ))}
            </VStack>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default Formidlinger;
