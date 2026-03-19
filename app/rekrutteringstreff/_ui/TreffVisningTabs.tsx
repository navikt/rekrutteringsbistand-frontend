'use client';

import { useRekrutteringstreffSokData } from './RekrutteringstreffSøk';
import TreffValgteKontorer from './TreffValgteKontorer';
import { Visning } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import LitenPaginering from '@/components/paginering/LitenPaginering';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Button } from '@navikt/ds-react';

export default function TreffVisningTabs() {
  const { visning, setVisning, side, setSide } =
    useRekrutteringstreffSøkFilter();
  const sokHook = useRekrutteringstreffSokData();
  const antallPerSide = sokHook.data?.antallPerSide ?? 20;
  const antallTotalt = sokHook.data?.antallTotalt ?? 0;

  const tabs = [
    { value: Visning.ALLE, label: 'Alle' },
    { value: Visning.MINE, label: 'Mine' },
    { value: Visning.MITT_KONTOR, label: 'Mitt kontor' },
  ] as const;

  return (
    <div>
      <div className='flex flex-wrap-reverse items-center gap-x-3 gap-y-2'>
        <div className='flex flex-1 items-center gap-2'>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={visning === tab.value ? 'primary' : 'tertiary'}
              onClick={() => setVisning(tab.value)}
              size='xsmall'
            >
              {tab.label}
            </Button>
          ))}
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
            ]}
          >
            <Button
              variant={
                visning === Visning.VALGTE_KONTORER ? 'primary' : 'tertiary'
              }
              onClick={() => setVisning(Visning.VALGTE_KONTORER)}
              size='xsmall'
            >
              Velg kontor
            </Button>
          </TilgangskontrollForInnhold>
        </div>
        {antallTotalt > 0 && (
          <div className='ml-auto flex shrink-0 items-center'>
            <LitenPaginering
              fraAntall={(side - 1) * antallPerSide + 1}
              tilAntall={side * antallPerSide}
              total={antallTotalt}
              side={side}
              setSide={setSide}
            />
          </div>
        )}
      </div>
      {visning === Visning.VALGTE_KONTORER && <TreffValgteKontorer />}
    </div>
  );
}
