import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Tabs } from '@navikt/ds-react';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
}

export default function StillingTabs() {
  const { erEier, kandidatlisteInfo } = useStillingsContext();

  return (
    <Tabs.List className='flex w-full justify-between '>
      <div>
        <Tabs.Tab value={StillingFane.STILLING} label='Om stillingen' />
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          {kandidatlisteInfo?.kandidatlisteId && erEier && (
            <Tabs.Tab
              value={StillingFane.KANDIDATER}
              label={`Jobbsøkere (${kandidatlisteInfo?.antallKandidater ?? '-'})`}
            />
          )}
        </TilgangskontrollForInnhold>
      </div>
    </Tabs.List>
  );
}
