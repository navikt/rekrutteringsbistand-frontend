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
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/notatvalg';
import { PlusIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Chips,
  HStack,
  Popover,
  VStack,
} from '@navikt/ds-react';
import { useEffect, useRef, useState, type FC } from 'react';

interface Props {
  notater: string[];
  onEndre: (notater: string[]) => void;
  /** Leses bare av skjermlesere, for å skille radene fra hverandre. */
  kontekst: string;
}

export const Vurderingsnotatvelger: FC<Props> = ({
  notater,
  onEndre,
  kontekst,
}) => {
  const [åpen, settÅpen] = useState(false);
  const [knapp, settKnapp] = useState<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [forrigeNotater, settForrigeNotater] = useState(notater);
  const [lokaleNotater, settLokaleNotater] = useState<string[] | null>(null);

  if (notater !== forrigeNotater) {
    settForrigeNotater(notater);
    if (
      lokaleNotater !== null &&
      sorterNotater(notater).join(',') ===
        sorterNotater(lokaleNotater).join(',')
    ) {
      settLokaleNotater(null);
    }
  }

  const valgte = sorterNotater(lokaleNotater ?? notater);

  // Beskytt mot at Aksel Popover (DismissableLayer) lukker seg ved klikk/draing i scrollbaren
  // eller når fokus flyttes (f.eks. til tabpanel/body) ved klikk på etikett-tekst (label) eller bakgrunn.
  const klikkerInniRef = useRef(false);

  useEffect(() => {
    if (!åpen) return;

    const håndterPointerDownCapture = (event: PointerEvent) => {
      const el = contentRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const erInni =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (erInni) {
        klikkerInniRef.current = true;
        setTimeout(() => {
          klikkerInniRef.current = false;
        }, 150);

        const erRtl = getComputedStyle(el).direction === 'rtl';
        const erPåVertikalScrollbar = erRtl
          ? event.clientX <= rect.left + (el.offsetWidth - el.clientWidth)
          : event.clientX >= rect.left + el.clientWidth;
        const erPåHorisontalScrollbar =
          event.clientY >= rect.top + el.clientHeight;

        if (erPåVertikalScrollbar || erPåHorisontalScrollbar) {
          event.stopPropagation();
        }
      }
    };

    const håndterFocusInCapture = (event: FocusEvent) => {
      const el = contentRef.current;
      if (!el) return;

      // Hvis fokus flyttes som følge av et klikk inni popoveren (f.eks. klikk på label flytter fokus
      // til tabpanel/body på enkelte nettlesere), skal det ikke trigge Aksels useFocusOutside.
      if (
        klikkerInniRef.current ||
        event.target === document.body ||
        el.contains(event.target as Node)
      ) {
        event.stopPropagation();
      }
    };

    document.addEventListener('pointerdown', håndterPointerDownCapture, true);
    document.addEventListener('focusin', håndterFocusInCapture, true);
    return () => {
      document.removeEventListener(
        'pointerdown',
        håndterPointerDownCapture,
        true,
      );
      document.removeEventListener('focusin', håndterFocusInCapture, true);
    };
  }, [åpen]);

  const oppdaterValgte = (nyeValgte: string[]) => {
    settLokaleNotater(nyeValgte);
    onEndre(nyeValgte);
  };

  const veksle = (verdi: string) => {
    const oppdatert = valgte.includes(verdi)
      ? valgte.filter((annen) => annen !== verdi)
      : sorterNotater([...valgte, verdi]);
    oppdaterValgte(oppdatert);
  };

  const lukk = () => {
    settÅpen(false);
  };

  const [notaterVedÅpning, settNotaterVedÅpning] = useState<string[]>(valgte);

  // Mens popoveren er åpen, beholder vi brikkene i bakgrunnen uendret så siden ikke forskyver seg under klikking.
  const visteNotaterIChips = åpen ? notaterVedÅpning : valgte;
  const utenKjentPart = ukjenteNotater(visteNotaterIChips);

  return (
    <VStack gap='space-8'>
      <div>
        <Button
          ref={settKnapp}
          type='button'
          size='small'
          variant='tertiary'
          icon={<PlusIcon aria-hidden />}
          aria-expanded={åpen}
          onClick={() => {
            if (!åpen) {
              settNotaterVedÅpning(valgte);
            }
            settÅpen((forrige) => !forrige);
          }}
        >
          Notat<span className='sr-only'> {kontekst}</span>
        </Button>
        <Popover
          open={åpen}
          onClose={lukk}
          anchorEl={knapp}
          placement='bottom-start'
        >
          <Popover.Content
            ref={contentRef}
            className='max-h-[min(32rem,85vh)] overflow-y-auto'
          >
            <HStack gap='space-24' align='start' wrap>
              {PARTSREKKEFØLGE.map((part) => (
                <Box key={part} minWidth='16rem' className='flex-1'>
                  <CheckboxGroup
                    size='small'
                    legend={PARTSOVERSKRIFT[part]}
                    value={notaterForRad(valgte, part)}
                    onChange={(nyeForParten: string[]) =>
                      oppdaterValgte(
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
                </Box>
              ))}
            </HStack>
          </Popover.Content>
        </Popover>
      </div>
      {PARTSREKKEFØLGE.map((part) => {
        const partensNotater = notaterForRad(visteNotaterIChips, part);
        if (partensNotater.length === 0) return null;
        return (
          <HStack
            key={part}
            gap='space-8'
            align='center'
            wrap
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
                  data-color={part === 'ARBEIDSGIVER' ? 'info' : 'neutral'}
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
    </VStack>
  );
};
