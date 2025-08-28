'use client';

import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import {
  BellIcon,
  CheckmarkIcon,
  EyeIcon,
  PersonGroupIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  ProgressBar,
} from '@navikt/ds-react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

interface ChecklistItem {
  id: string;
  label: string;
  group?: string; // Valgfri. Elementer uten group vises øverst uten mellomtittel
  isDone: (data: StillingsDataDTO) => boolean;
}

export interface FremdriftspanelRedigeringProps {
  setForhåndsvis: () => void;
}

export default function FremdriftspanelRedigering({
  setForhåndsvis,
}: FremdriftspanelRedigeringProps) {
  const { watch } = useFormContext<StillingsDataDTO>();
  const data = watch();

  const items: ChecklistItem[] = useMemo(
    () => [
      // Ugrupperte (vises øverst)
      {
        id: 'stillingstittel',
        label: 'Yrkestittel',
        isDone: (d) => (d.stilling?.categoryList ?? []).length > 0,
      },
      {
        id: 'beskrivelse',
        label: 'Om jobben',
        isDone: (d) =>
          !!d.stilling?.properties?.adtext &&
          d.stilling.properties.adtext.trim().length > 10,
      },

      // Praktiske forhold
      {
        id: 'antallStillinger',
        label: 'Antall stillinger',
        group: 'Praktiske forhold',
        isDone: (d) =>
          !!d.stilling?.properties?.positioncount &&
          Number(d.stilling.properties.positioncount) > 0,
      },
      {
        id: 'ansettelsesform',
        label: 'Ansettelsesform',
        group: 'Praktiske forhold',
        isDone: (d) => !!d.stilling?.properties?.engagementtype,
      },
      {
        id: 'arbeidsdager',
        label: 'Arbeidsdager',
        group: 'Praktiske forhold',
        isDone: (d) => {
          const raw = d.stilling?.properties?.workday as any;
          if (!raw) return false;
          if (Array.isArray(raw)) return raw.length > 0;
          if (typeof raw === 'string') {
            // Kan være JSON ("[\"Ukedager\"]"), kommaseparert, eller enkeltverdi
            try {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) return parsed.length > 0;
            } catch {
              // Ignorer parsefeil og fall tilbake på strenginnhold
            }
            return raw.trim().length > 0;
          }
          return false;
        },
      },
      {
        id: 'arbeidstid',
        label: 'Arbeidstid',
        group: 'Praktiske forhold',
        isDone: (d) => {
          const raw = d.stilling?.properties?.workhours as any;
          if (!raw) return false;
          if (Array.isArray(raw)) return raw.length > 0;
          if (typeof raw === 'string') {
            try {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) return parsed.length > 0;
            } catch {}
            return raw.trim().length > 0;
          }
          return false;
        },
      },
      // Om virksomheten
      {
        id: 'virksomheten',
        label: 'Virksomheten',
        group: 'Om virksomheten',
        isDone: (d) => !!d.stilling?.employer?.name,
      },
      {
        id: 'kontaktperson',
        label: 'Kontaktperson',
        group: 'Om virksomheten',
        isDone: (d) => (d.stilling?.contactList ?? []).length > 0,
      },
      // Sted
      {
        id: 'arbeidssted',
        label: 'Adresse, og/eller land, fylke, eller kommune',
        group: 'Sted',
        isDone: (d) => (d.stilling?.locationList ?? []).length > 0,
      },
      // Viktige datoer
      {
        id: 'oppstart',
        label: 'Oppstartsdato',
        group: 'Viktige datoer',
        isDone: (d) => !!d.stilling?.properties?.starttime,
      },
      {
        id: 'soknadsfrist',
        label: 'Søknadsfrist',
        group: 'Viktige datoer',
        isDone: (d) => !!d.stilling?.properties?.applicationdue,
      },
    ],
    [],
  );

  const doneCount = items.filter((i) => i.isDone(data)).length;
  const total = items.length;

  // Del opp i ugruppeerte og grupperte. Grupper beholdes i definert rekkefølge basert på første forekomst
  const ungrouped = items.filter((i) => !i.group);
  const groups: { name: string; items: ChecklistItem[] }[] = [];
  items
    .filter((i) => i.group)
    .forEach((i) => {
      const g = groups.find((g) => g.name === i.group);
      if (g) g.items.push(i);
      else groups.push({ name: i.group!, items: [i] });
    });

  return (
    <Fremdriftspanel>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-evenly items-center pb-3'>
          <Button size='small' variant='secondary' onClick={setForhåndsvis}>
            Forhåndsvis
          </Button>
          <Button size='small' disabled={doneCount !== total}>
            Publiser
          </Button>
        </div>

        <div className='flex flex-col gap-2'>
          <Heading size='small' level='2'>
            Gjør klart til publisering
          </Heading>

          <ProgressBar
            value={doneCount}
            valueMax={total}
            size='small'
            aria-labelledby='progress-bar-label-small'
          />

          <div className=' flex justify-end text-sm tabular-nums'>
            {doneCount}/{total}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <Heading size='xsmall' level='3'>
              Sjekkliste
            </Heading>
            <BodyLong size='small' className='mt-1'>
              Før stillingsoppdraget er tilgjengelig for andre må noen detaljer
              være på plass først:
            </BodyLong>
          </div>
          {/* Ugruppeerte først */}
          {ungrouped.length > 0 && (
            <ul className='flex flex-col gap-2'>
              {ungrouped.map((item) => {
                const done = item.isDone(data);
                return (
                  <li key={item.id} className='flex items-start gap-2 text-sm'>
                    <span
                      aria-hidden
                      className={`mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full border ${done ? 'bg-[var(--ax-bg-action-selected)] border-[var(--ax-bg-action-selected)] text-[var(--ax-fg-on-inverted)]' : 'border-[var(--ax-border-neutral-subtle)]'}`}
                    >
                      {done && <CheckmarkIcon aria-hidden />}
                    </span>
                    <span
                      className={
                        done ? 'line-through text-text-subtle' : undefined
                      }
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          {groups.map((group) => (
            <div key={group.name} className='flex flex-col gap-2'>
              <div className='text-[0.75rem] font-semibold uppercase tracking-wide text-text-subtle mt-2'>
                {group.name}
              </div>
              <ul className='flex flex-col gap-2'>
                {group.items.map((item) => {
                  const done = item.isDone(data);
                  return (
                    <li
                      key={item.id}
                      className='flex items-start gap-2 text-sm'
                    >
                      <span
                        aria-hidden
                        className={`mt-[2px] inline-flex h-4 w-4 items-center justify-center rounded-full border ${done ? 'bg-[var(--ax-bg-action-selected)] border-[var(--ax-bg-action-selected)] text-[var(--ax-fg-on-inverted)]' : 'border-[var(--ax-border-neutral-subtle)]'}`}
                      >
                        {done && <CheckmarkIcon aria-hidden />}
                      </span>
                      <span
                        className={
                          done ? 'line-through text-text-subtle' : undefined
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
          <Heading size='xsmall' level='3' className='mb-4'>
            Hva skjer etter publisering?
          </Heading>
          <div className='flex gap-4 flex-col'>
            <div className='flex gap-2'>
              <EyeIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Annonssen blir synlig for kollegaene dine.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <PersonGroupIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                De kan finne og foreslå folk til som kan egne seg. Du kan også
                finne folk på egenhånd.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <TasklistIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Du velger hvem som kan deles med arbeidsgiveren og spør dem om
                samtykke til å dele CVen deres.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <BellIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Jobbsøkeren får beskjed, og muligheten til å svare i
                aktivtetsplanen.
              </BodyShort>
            </div>
          </div>
        </Box.New>
      </div>
    </Fremdriftspanel>
  );
}
