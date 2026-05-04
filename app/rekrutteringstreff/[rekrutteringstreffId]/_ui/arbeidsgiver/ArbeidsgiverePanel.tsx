'use client';

import { useErTreffEier } from '../useErTreffEier';
import ArbeidsgiverKort from './ArbeidsgiverKort';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import { useRedigerBehov } from './useRedigerBehov';
import { slettArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

const ArbeidsgiverePanel: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);
  const erEier = useErTreffEier();
  const { åpneRediger, behovPerArbeidsgiver, dialog } = useRedigerBehov();
  const [sletter, setSletter] = useState(false);

  const bekreftSlett = async (a: ArbeidsgiverDTO) => {
    try {
      setSletter(true);
      await slettArbeidsgiver(
        rekrutteringstreffId,
        a.arbeidsgiverTreffId ?? a.organisasjonsnummer,
      );
      hendelseHook.mutate();
    } finally {
      setSletter(false);
    }
  };

  const lagAction = (a: ArbeidsgiverDTO) => {
    const id = a.arbeidsgiverTreffId;
    const harBehov = id ? Boolean(behovPerArbeidsgiver.get(id)) : false;
    return (
      <HStack gap='space-4' align='center'>
        {erEier && id && (
          <Button
            type='button'
            size='small'
            variant='tertiary'
            icon={<PencilIcon aria-hidden />}
            onClick={() => åpneRediger(a)}
            aria-label={`Rediger behov for ${a.navn}`}
          >
            {harBehov ? 'Rediger behov' : 'Legg til behov'}
          </Button>
        )}
        <SlettArbeidsgiverModal
          navn={a.navn}
          loading={sletter}
          disabled={sletter}
          onConfirm={() => bekreftSlett(a)}
          arbeidsgivereHook={arbeidsgivereHook}
          variant='cross'
          triggerAriaLabel={`Fjern ${a.navn}`}
        />
      </HStack>
    );
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='space-y-4'>
          {Array.isArray(arbeidsgivere) && arbeidsgivere.length > 0 ? (
            <ul>
              {arbeidsgivere.map((a, index) => (
                <li key={index}>
                  <ArbeidsgiverKort
                    navn={a.navn}
                    organisasjonsnummer={a.organisasjonsnummer}
                    gateadresse={a.gateadresse}
                    postnummer={a.postnummer}
                    poststed={a.poststed}
                    actionSlot={lagAction(a)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          )}

          <LeggTilArbeidsgiverKnapp />
          {dialog}
        </div>
      )}
    </SWRLaster>
  );
};

export default ArbeidsgiverePanel;
