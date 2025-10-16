import { testTilgangskontroll } from './tilgangskontroll.tester';
import { Roller } from '@/components/tilgangskontroll/roller';
import { test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/modia_generell.json' });

testTilgangskontroll(Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG);
