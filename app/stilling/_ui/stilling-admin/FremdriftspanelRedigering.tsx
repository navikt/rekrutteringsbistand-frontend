'use client';

import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import {
  hentModulerForKategori,
  ModulKey,
} from '@/app/stilling/_ui/stilling-admin/StillingAdminModuler';
import PubliserModal from '@/app/stilling/_ui/stilling-admin/admin_moduler/PubliserModal';
import OpprettEtterregistrering from '@/app/stilling/_ui/stilling-admin/admin_moduler/etterregistrering/OpprettEtterregistrering';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { validerEpost } from '@/util/validerEpost';
import { validerTelefonnummer } from '@/util/validerTelefonnummer';
import {
  BellDotIcon,
  BellIcon,
  CheckmarkIcon,
  EyeIcon,
  PersonCircleIcon,
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

interface Props {
  setForhåndsvis: () => void;
}

export default function FremdriftspanelRedigering({ setForhåndsvis }: Props) {
  const { watch } = useFormContext<StillingsDataDTO>();
  const data = watch();

  const kategori = data?.stillingsinfo?.stillingskategori;

  // For Formidling ønsker vi 1-til-1 mellom admin-moduler og sjekkliste
  const formidlingModuler = useMemo(
    () =>
      kategori === Stillingskategori.Formidling
        ? hentModulerForKategori(Stillingskategori.Formidling)
        : [],
    [kategori],
  );

  const formidlingDoneByModule = useMemo<
    Partial<Record<ModulKey, (d: StillingsDataDTO) => boolean>>
  >(
    () => ({
      formidling_kandidater: (d) =>
        Array.isArray((d as any).formidlingKandidater) &&
        (d as any).formidlingKandidater.length > 0,
      yrkestittel: (d) => (d.stilling?.categoryList ?? []).length > 0,
      virksomheten: (d) => !!d.stilling?.employer?.name,
      formidling_sektor: (d) => !!d.stilling?.properties?.sector,
      formidling_ansettelsesform: (d) =>
        !!d.stilling?.properties?.engagementtype,
      // Valgfritt: skal ikke blokkere fremdrift
      formidling_arbeidstidsordning: () => true,
      formidling_omfang: (d) => {
        const extent = d.stilling?.properties?.extent;
        if (!extent) return false;
        if (extent === 'Heltid') return true;
        if (extent === 'Deltid') {
          const pct = d.stilling?.properties?.jobpercentage;
          return typeof pct === 'string' && pct.trim().length > 0;
        }
        return false;
      },
      formidling_sted: (d) => (d.stilling?.locationList ?? []).length > 0,
      // Inkludering er valgfritt – ikke blokkér
      formidling_inkludering: () => true,
    }),
    [],
  );

  const items: ChecklistItem[] = useMemo(() => {
    if (kategori === Stillingskategori.Formidling) {
      // 1:1 mellom valgte moduler og sjekkliste
      return formidlingModuler.map((m) => ({
        id: m.key,
        label: m.tittel,
        isDone: formidlingDoneByModule[m.key as ModulKey] ?? (() => true),
      }));
    }
    const erJobbmesse = kategori === Stillingskategori.Jobbmesse;
    return [
      // Ugrupperte (vises øverst)
      {
        id: 'stillingstittel',
        label: 'Yrkestittel',
        isDone: (d) => (d.stilling?.categoryList ?? []).length > 0,
      },
      {
        id: 'beskrivelse',
        label: erJobbmesse ? 'Om jobbmessen' : 'Om jobben',
        isDone: (d) =>
          !!d.stilling?.properties?.adtext &&
          d.stilling.properties.adtext.trim().length > 10,
      },

      // Praktiske forhold (samlet modul, men trackes som del-sjekker)
      // Antall stillinger er låst til 1 og skjult for jobbmesse, behold sjekk kun for ordinær stilling
      ...(!erJobbmesse
        ? [
            {
              id: 'praktiskeForhold_antall',
              label: 'Antall stillinger',
              group: 'Praktiske forhold',
              isDone: (d: StillingsDataDTO) =>
                !!d.stilling?.properties?.positioncount &&
                Number(d.stilling.properties.positioncount) > 0,
            } as ChecklistItem,
          ]
        : []),
      {
        id: 'praktiskeForhold_ansettelsesform',
        label: 'Ansettelsesform',
        group: 'Praktiske forhold',
        isDone: (d) => !!d.stilling?.properties?.engagementtype,
      },
      {
        id: 'praktiskeForhold_omfang',
        label: 'Omfang',
        group: 'Praktiske forhold',
        isDone: (d) => {
          const extent = d.stilling?.properties?.extent;
          if (!extent) return false;
          if (extent === 'Heltid') return true;
          if (extent === 'Deltid') {
            const pct = d.stilling?.properties?.jobpercentage;
            return typeof pct === 'string' && pct.trim().length > 0;
          }
          return false;
        },
      },
      {
        id: 'praktiskeForhold_arbeidsdager',
        label: 'Arbeidsdager',
        group: 'Praktiske forhold',
        isDone: (d) => {
          const raw = d.stilling?.properties?.workday as any;
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
      {
        id: 'praktiskeForhold_arbeidstid',
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
        isDone: (d) => {
          const kontakter = d.stilling?.contactList ?? [];
          return (
            kontakter.length > 0 &&
            kontakter.every((kontakt) => {
              const navn = kontakt?.name?.trim();
              const epost = kontakt?.email?.trim();
              const telefon = kontakt?.phone?.trim();
              const stillingstittel = kontakt?.title?.trim();
              const felter = [navn, epost, telefon, stillingstittel];
              const utfylteFelter = felter.filter(
                (f) => typeof f === 'string' && f.length > 0,
              ).length;
              if (utfylteFelter < 3) return false;
              if (!navn || !stillingstittel || (!epost && !telefon))
                return false;
              if (epost && !validerEpost(epost).erGodkjent) return false;
              return !(telefon && !validerTelefonnummer(telefon).erGodkjent);
            })
          );
        },
      },
      {
        id: 'sektor',
        label: 'Sektor',
        group: 'Sektor',
        isDone: (d) => !!d.stilling?.properties?.sector,
      },
      // Sted
      {
        id: 'arbeidssted',
        label: 'Adresse, og/eller land, fylke, eller kommune',
        group: 'Sted',
        isDone: (d) => {
          const steder = d.stilling?.locationList ?? [];
          return (
            steder.length > 0 &&
            steder.every((sted) => {
              const gateadresse = sted?.address?.trim();
              const postnummer = sted?.postalCode?.trim();
              const land = sted?.country?.trim();
              const fylke = sted?.county?.trim();
              const kommune = sted?.municipal?.trim();
              const felter = [gateadresse, postnummer, land, fylke, kommune];
              const utfylteFelter = felter.filter(
                (f) => typeof f === 'string' && f.length > 0,
              ).length;
              if (utfylteFelter === 0) return false;
              return (gateadresse && postnummer) || land || fylke || kommune;
            })
          );
        },
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
    ];
  }, [kategori, formidlingModuler, formidlingDoneByModule]);

  const doneCount = items.filter((i) => i.isDone(data)).length;
  const total = items.length;

  // Del opp i ugruppeerte og grupperte. Grupper beholdes i definert rekkefølge basert på første forekomst
  const ungrouped =
    kategori === Stillingskategori.Formidling
      ? items // for Formidling viser vi en flat 1:1-liste
      : items.filter((i) => !i.group);
  const groups: { name: string; items: ChecklistItem[] }[] = [];
  if (kategori !== Stillingskategori.Formidling) {
    items
      .filter((i) => i.group)
      .forEach((i) => {
        const g = groups.find((g) => g.name === i.group);
        if (g) g.items.push(i);
        else groups.push({ name: i.group!, items: [i] });
      });
  }

  const etterregistreringKnapper = (
    <div className='flex justify-between items-center pb-3'>
      <Button
        size='small'
        variant='secondary'
        onClick={setForhåndsvis}
        className='whitespace-nowrap shrink-0'
      >
        Forhåndsvis
      </Button>
      <OpprettEtterregistrering disabled={doneCount !== total} />
    </div>
  );

  const stillingKnapper = (
    <div className='flex justify-between items-center pb-3'>
      <Button size='small' variant='secondary' onClick={setForhåndsvis}>
        Forhåndsvis
      </Button>
      <PubliserModal disabled={doneCount !== total} />
    </div>
  );

  return (
    <>
      <div className='flex flex-col gap-6'>
        {kategori === Stillingskategori.Formidling
          ? etterregistreringKnapper
          : stillingKnapper}

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
                Oppdraget blir synlig for kollegaene dine.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <PersonGroupIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                De kan finne og foreslå folk som kan egne seg til jobben. Du kan
                også finne folk på selv.
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
          <Heading size='xsmall' level='3' className='my-4'>
            For arbeidsgiver
          </Heading>
          <div className='flex gap-4 flex-col'>
            <div className='flex gap-2'>
              <BellDotIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Arbeidsgiver får en ny sak på arbeidsgivers Min Side på Nav.no.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <PersonCircleIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                I saken ser de stillingsbeskrivelsen, og jobbsøkere så snart de
                deles.
              </BodyShort>
            </div>
          </div>
        </Box.New>
      </div>
    </>
  );
}
