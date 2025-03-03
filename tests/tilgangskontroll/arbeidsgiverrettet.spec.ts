import { Roller } from '../../app/components/tilgangskontroll/roller';
import { testTilgangskontroll } from './tilgangskontroll.tester';
import test from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

testTilgangskontroll(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET);
