import { testTilgangskontroll } from './tilgangskontroll.tester';
import { Roller } from '@/components/tilgangskontroll/roller';
import test from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

testTilgangskontroll(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET);
