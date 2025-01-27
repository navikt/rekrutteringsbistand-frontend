import test from '@playwright/test';
import { Roller } from '../../app/components/tilgangskontroll/roller';
import { testTilgangskontroll } from './tilgangskontroll.tester';

test.use({ storageState: 'tests/.auth/modia_generell.json' });

testTilgangskontroll(Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG);
