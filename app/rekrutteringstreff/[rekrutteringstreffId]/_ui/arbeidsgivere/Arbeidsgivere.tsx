'use client';

import ArbeidsgiverKort from './_ui/ArbeidsgiverKort';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/LeggTilArbeidsgiverModal';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Button } from '@navikt/ds-react';
import { PlusIcon } from 'lucide-react';
import * as React from 'react';

const RekrutteringstreffArbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const modalRef = React.useRef<HTMLDialogElement>(null); // Ny ref

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const getLagtTilData = (arbeidsgiver: ArbeidsgiverDTO) => {
    const leggTilHendelse = arbeidsgiver.hendelser.find(
      ({ hendelsestype }) => hendelsestype === 'OPPRETT',
    );
    if (leggTilHendelse) {
      return {
        status: 'Lagt til',
      };
    }
    return {
      status: undefined,
    };
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <Button
              onClick={() => modalRef.current?.showModal()}
              icon={<PlusIcon />}
              type='button'
              variant='secondary'
            >
              Legg til arbeidsgiver
            </Button>
          </div>
          <LeggTilArbeidsgiverModal
            modalRef={modalRef} // Send ref til modalen
          />
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <ul>
              {arbeidsgivere.map((a, index) => {
                const { status } = getLagtTilData(a);
                return (
                  <li key={index}>
                    <ArbeidsgiverKort navn={a.navn} status={status} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default RekrutteringstreffArbeidsgivere;
