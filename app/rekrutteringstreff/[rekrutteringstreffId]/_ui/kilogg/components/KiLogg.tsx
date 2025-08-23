'use client';

import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { CheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, Skeleton, Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import { useState, useMemo } from 'react';

export interface KiLoggProps {
  children?: React.ReactNode | undefined;
  feltType?: string;
}

const GRID =
  'grid grid-cols-[10rem_6rem_14rem_4rem_4rem_6rem_4rem] gap-x-4 items-start';

const parseZonedDate = (s?: string | null): Date | null => {
  if (!s) return null;
  const cleaned = s.replace(/\[.*\]$/, '');
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? null : d;
};

const boolTag = (b: boolean, trueText: string, falseText: string) =>
  b ? (
    <Tag size='small' variant='error'>
      {trueText}
    </Tag>
  ) : (
    <Tag size='small' variant='success'>
      {falseText}
    </Tag>
  );

const KiLogg: React.FC<KiLoggProps> = ({ feltType }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data, isLoading, error, setManuell, settingManuell, manuellError } =
    useKiLogg(rekrutteringstreffId, feltType);

  const [openId, setOpenId] = useState<string | null>(null);

  const header = useMemo(
    () => (
      <div className={`${GRID} font-semibold text-lg mt-4`}>
        <span>Tidspunkt</span>
        <span>Felt</span>
        <span>KI</span>
        <span>Prompt-versjon</span>
        <span>Lagret</span>
        <span>KI-resultat</span>
        <span>Manuell vurdering</span>
      </div>
    ),
    [],
  );

  if (error) return <Alert variant='error'>Kunne ikke laste KI-logg.</Alert>;

  return (
    <section className='flex flex-col gap-3'>
      {isLoading && (
        <div className='mt-4 space-y-2'>
          <Skeleton variant='text' width='60%' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </div>
      )}

      {!isLoading && data && data.length > 0 && header}

      {!isLoading &&
        data?.map((row) => {
          const opprettet = parseZonedDate(row.opprettetTidspunkt);
          const manuell = row.manuellKontrollBryterRetningslinjer;
          return (
            <div key={row.id} className='border-b border-gray-200 pb-2'>
              <div className={GRID}>
                <BodyShort className='whitespace-nowrap'>
                  {opprettet ? format(opprettet, 'dd.MM.yyyy HH:mm:ss') : '—'}
                </BodyShort>
                <BodyShort className='whitespace-nowrap'>
                  {row.feltType}
                </BodyShort>
                <BodyShort className='whitespace-nowrap'>
                  {row.kiNavn}@{row.kiVersjon}
                </BodyShort>
                <BodyShort className='whitespace-nowrap'>
                  {row.promptVersjonsnummer ?? '—'}
                </BodyShort>
                <BodyShort className='whitespace-nowrap'>
                  {row.lagret ? 'Ja' : 'Nei'}
                </BodyShort>
                <div className='whitespace-nowrap'>
                  {boolTag(row.bryterRetningslinjer, 'Brudd', 'OK')}
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    size='xsmall'
                    variant={manuell === false ? 'primary' : 'secondary'}
                    loading={settingManuell}
                    onClick={async () =>
                      setManuell({
                        id: row.id,
                        bryterRetningslinjer: false,
                      })
                    }
                    aria-pressed={manuell === false}
                    title='Marker som godkjent'
                  >
                    <CheckmarkIcon aria-hidden className='text-green-700' />
                  </Button>
                  <Button
                    size='xsmall'
                    variant={manuell === true ? 'primary' : 'secondary'}
                    loading={settingManuell}
                    onClick={async () =>
                      setManuell({
                        id: row.id,
                        bryterRetningslinjer: true,
                      })
                    }
                    aria-pressed={manuell === true}
                    title='Marker som ikke godkjent'
                  >
                    <XMarkIcon aria-hidden className='text-red-600' />
                  </Button>

                  <Button
                    size='xsmall'
                    variant='tertiary'
                    onClick={() =>
                      setOpenId((v) => (v === row.id ? null : row.id))
                    }
                  >
                    {openId === row.id ? 'Skjul detaljer' : 'Detaljer'}
                  </Button>
                </div>
              </div>

              {manuellError && (
                <div className='mt-2'>
                  <Alert variant='error'>
                    Kunne ikke oppdatere manuell vurdering.
                  </Alert>
                </div>
              )}

              {openId === row.id && (
                <div className='mt-3 grid grid-cols-1 md:grid-cols-2 gap-3'>
                  <div className='space-y-1'>
                    <BodyShort>
                      <b>ID:</b> {row.id}
                    </BodyShort>
                    <BodyShort>
                      <b>TreffId:</b> {row.treffId}
                    </BodyShort>
                    <BodyShort>
                      <b>Tittel:</b> {row.tittel ?? '—'}
                    </BodyShort>
                    <BodyShort>
                      <b>FeltType:</b> {row.feltType}
                    </BodyShort>
                    <BodyShort>
                      <b>KI-navn:</b> {row.kiNavn}
                    </BodyShort>
                    <BodyShort>
                      <b>KI-versjon:</b> {row.kiVersjon}
                    </BodyShort>
                    <BodyShort>
                      <b>Svartid:</b> {row.svartidMs} ms
                    </BodyShort>
                    <BodyShort>
                      <b>Prompt-versjon:</b> {row.promptVersjonsnummer ?? '—'}
                    </BodyShort>
                    <BodyShort>
                      <b>Prompt-hash:</b> {row.promptHash ?? '—'}
                    </BodyShort>
                    <BodyShort>
                      <b>Prompt-tidspunkt:</b>{' '}
                      {row.promptEndretTidspunkt
                        ? format(
                            parseZonedDate(row.promptEndretTidspunkt)!,
                            'dd.MM.yyyy HH:mm:ss',
                          )
                        : '—'}
                    </BodyShort>
                    <BodyShort>
                      <b>Lagret:</b> {row.lagret ? 'Ja' : 'Nei'}
                    </BodyShort>
                    <BodyShort>
                      <b>KI-resultat:</b>{' '}
                      {row.bryterRetningslinjer ? 'Brudd' : 'OK'}
                    </BodyShort>
                    <BodyShort>
                      <b>Manuell vurdering:</b>{' '}
                      {row.manuellKontrollBryterRetningslinjer === null ||
                      row.manuellKontrollBryterRetningslinjer === undefined
                        ? 'Ikke satt'
                        : row.manuellKontrollBryterRetningslinjer
                          ? 'Brudd'
                          : 'OK'}
                    </BodyShort>
                    <BodyShort>
                      <b>Manuell utført av:</b>{' '}
                      {row.manuellKontrollUtfortAv ?? '—'}
                    </BodyShort>
                    <BodyShort>
                      <b>Manuell tidspunkt:</b>{' '}
                      {row.manuellKontrollTidspunkt
                        ? format(
                            parseZonedDate(row.manuellKontrollTidspunkt)!,
                            'dd.MM.yyyy HH:mm:ss',
                          )
                        : '—'}
                    </BodyShort>
                  </div>

                  <div className='space-y-2 break-words'>
                    <div>
                      <BodyShort className='font-semibold'>
                        Begrunnelse
                      </BodyShort>
                      <pre className='whitespace-pre-wrap text-sm bg-gray-500 p-2 rounded'>
                        {row.begrunnelse ?? '—'}
                      </pre>
                    </div>
                    <div>
                      <BodyShort className='font-semibold'>
                        Spørring (fra frontend)
                      </BodyShort>
                      <pre className='whitespace-pre-wrap text-xs bg-gray-500 p-2 rounded'>
                        {row.spørringFraFrontend}
                      </pre>
                    </div>
                    <div>
                      <BodyShort className='font-semibold'>
                        Spørring (filtrert)
                      </BodyShort>
                      <pre className='whitespace-pre-wrap text-xs bg-gray-500 p-2 rounded'>
                        {row.spørringFiltrert}
                      </pre>
                    </div>
                    <div>
                      <BodyShort className='font-semibold'>
                        Systemprompt
                      </BodyShort>
                      <pre className='whitespace-pre-wrap text-xs bg-gray-500 p-2 rounded'>
                        {row.systemprompt ?? '—'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {!isLoading && (data?.length ?? 0) === 0 && (
        <BodyShort className='mt-4'>Ingen KI-logg for dette treffet.</BodyShort>
      )}
    </section>
  );
};

export default KiLogg;
