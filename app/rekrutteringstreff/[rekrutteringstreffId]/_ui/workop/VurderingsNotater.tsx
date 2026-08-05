'use client';

import {
  PARTSOVERSKRIFT,
  PARTSETIKETT,
  PARTSREKKEFØLGE,
  finnNotat,
  notaterForPart,
  notaterForRad,
  notattekst,
  sorterNotater,
  ukjenteNotater,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/notatvalg';
import { PlusIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  Chips,
  HStack,
  Popover,
  VStack,
} from '@navikt/ds-react';
import { useState, type FC } from 'react';

interface Props {
  notater: string[];
  onEndre: (notater: string[]) => void;
  /** Leses bare av skjermlesere, for å skille radene fra hverandre. */
  kontekst: string;
}

export const VurderingsNotater: FC<Props> = ({
  notater,
  onEndre,
  kontekst,
}) => {
  const [åpen, settÅpen] = useState(false);
  const [knapp, settKnapp] = useState<HTMLButtonElement | null>(null);
  const valgte = sorterNotater(notater);
  const utenKjentPart = ukjenteNotater(notater);

  const veksle = (verdi: string) =>
    onEndre(
      valgte.includes(verdi)
        ? valgte.filter((annen) => annen !== verdi)
        : sorterNotater([...valgte, verdi]),
    );

  return (
    <VStack gap='space-8'>
      {PARTSREKKEFØLGE.map((part) => {
        const partensNotater = notaterForRad(valgte, part);
        if (partensNotater.length === 0) return null;
        return (
          <HStack
            key={part}
            gap='space-8'
            align='center'
            wrap
            // Etikettene får samme bredde, slik at etikettene under hverandre
            // står på linje og notatene starter på samme sted.
            role='group'
            aria-label={`Notater fra ${PARTSETIKETT[part].toLowerCase()} ${kontekst}`}
          >
            <BodyShort
              size='small'
              weight='semibold'
              className='text-ax-text-neutral-subtle w-32 shrink-0'
            >
              {PARTSETIKETT[part]}
            </BodyShort>
            <Chips>
              {partensNotater.map((verdi) => (
                <Chips.Removable
                  key={verdi}
                  data-color={
                    part === 'ARBEIDSGIVER' ? 'info' : 'brand-magenta'
                  }
                  onDelete={() => veksle(verdi)}
                  aria-label={`Fjern notatet «${notattekst(verdi)}» fra ${PARTSETIKETT[part].toLowerCase()} ${kontekst}`}
                >
                  {notattekst(verdi)}
                </Chips.Removable>
              ))}
            </Chips>
          </HStack>
        );
      })}
      {utenKjentPart.length > 0 && (
        <Chips aria-label={`Notater uten kjent avsender ${kontekst}`}>
          {utenKjentPart.map((verdi) => (
            <Chips.Removable key={verdi} onDelete={() => veksle(verdi)}>
              {verdi}
            </Chips.Removable>
          ))}
        </Chips>
      )}
      <div>
        <Button
          ref={settKnapp}
          type='button'
          size='small'
          variant='tertiary'
          icon={<PlusIcon aria-hidden />}
          aria-expanded={åpen}
          onClick={() => settÅpen((forrige) => !forrige)}
        >
          Notat<span className='sr-only'> {kontekst}</span>
        </Button>
        <Popover
          open={åpen}
          onClose={() => settÅpen(false)}
          anchorEl={knapp}
          placement='bottom-start'
        >
          <Popover.Content className='max-h-96 overflow-y-auto'>
            <VStack gap='space-16'>
              {PARTSREKKEFØLGE.map((part) => (
                <CheckboxGroup
                  key={part}
                  size='small'
                  legend={PARTSOVERSKRIFT[part]}
                  value={notaterForRad(valgte, part)}
                  // Gruppa eier bare sine egne notater. Den andre partens
                  // notater bæres uendret videre, ellers ville gruppene
                  // overskrevet hverandre.
                  onChange={(nyeForParten: string[]) =>
                    onEndre(
                      sorterNotater([
                        ...valgte.filter(
                          (verdi) => finnNotat(verdi)?.part !== part,
                        ),
                        ...nyeForParten,
                      ]),
                    )
                  }
                >
                  {notaterForPart(part).map((notat) => (
                    <Checkbox key={notat.verdi} value={notat.verdi}>
                      {notat.tekst}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              ))}
            </VStack>
          </Popover.Content>
        </Popover>
      </div>
    </VStack>
  );
};
