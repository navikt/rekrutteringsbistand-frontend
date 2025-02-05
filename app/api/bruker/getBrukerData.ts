'use server';

import { getToken } from '@navikt/oasis';
import { decodeJwt } from 'jose';
import { headers } from 'next/headers';
import { isLocal } from '../../../util/env';
import { BrukerData } from '../../ApplikasjonContext';
import {
  navnForRolleId,
  Roller,
} from '../../components/tilgangskontroll/roller';
import { decoratorMock } from '../decorator/mocks/dekoratørMock';

const hentRoller = (token: string): string[] => {
  const claims = decodeJwt(token);
  return (claims.groups as string[]) || [];
};

const getDekoratørData = async () => {
  if (isLocal) {
    const devIdent = 'Z993141';
    return {
      ...decoratorMock,
      ident: devIdent,
    };
  }
  const decoratorResponse = await fetch(`/api/decorator`);
  return await decoratorResponse.json();
};

const getRoller = async () => {
  if (isLocal) {
    return [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET];
  }

  const header = await headers();
  const brukerensAccessToken = getToken(header);
  const roller = brukerensAccessToken
    ? hentRoller(brukerensAccessToken)
        .map(navnForRolleId)
        .filter((navn): navn is string => navn !== null)
    : [];

  return roller;
};

export async function getBrukerData(): Promise<BrukerData> {
  try {
    const decoratorData = await getDekoratørData();
    const roller = await getRoller();

    const brukerData = {
      ...decoratorData,
      roller,
    };
    return brukerData;
  } catch (error) {
    throw new Error('Kunne ikke hente brukerdata');
  }
}
