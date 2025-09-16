import { leggTilAntall } from './aggregation-utils';
import { StillingsSøkAPI } from '@/app/api/api-routes';
import { proxyWithOBO } from '@/app/api/oboProxy';
import { isLocal } from '@/util/env';
import { NextRequest } from 'next/server';

/**
 * Utfører ElasticSearch søk kun for aggregeringer (antall/counts)
 */
export async function søkEtterAntall(req: NextRequest, body: any) {
  // Modifiser body for å kun hente aggregeringer - sett size til 0 for å ikke hente hits
  const antallBody = {
    ...body,
    size: 0, // Kun aggregeringer, ikke hits
    from: 0,
  };

  // Brukes for å gå rett mot stillingssøk lokalt
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const response = await fetch(`${process.env.STILLING_ES_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(antallBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    return leggTilAntall(data);
  }

  // Proxy via OBO for ikke-lokale miljøer
  // Opprett ny NextRequest med oppdatert body
  const modifiedReq = new NextRequest(req.url, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(antallBody),
  });

  const res = await proxyWithOBO(StillingsSøkAPI, modifiedReq);
  if (!res.ok) {
    throw new Error(`Proxy request failed with status ${res.status}`);
  }

  const json = await res.json();
  return leggTilAntall(json);
}

/**
 * Utfører ElasticSearch søk kun for hits (resultater)
 */
export async function søkEtterHits(req: NextRequest, body: any) {
  // Modifiser body for å kun hente hits - fjern aggregeringer for å redusere størrelse
  const hitsBody = {
    ...body,
    aggs: undefined, // Fjern aggregeringer for å redusere response størrelse
  };

  // Brukes for å gå rett mot stillingssøk lokalt
  if (isLocal && process.env.STILLING_ES_PASSWORD) {
    const response = await fetch(`${process.env.STILLING_ES_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.STILLING_ES_USERNAME}:${process.env.STILLING_ES_PASSWORD}`).toString('base64')}`,
      },
      body: JSON.stringify(hitsBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    return data;
  }

  // Proxy via OBO for ikke-lokale miljøer
  // Opprett ny NextRequest med oppdatert body
  const modifiedReq = new NextRequest(req.url, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(hitsBody),
  });

  const res = await proxyWithOBO(StillingsSøkAPI, modifiedReq);
  if (!res.ok) {
    throw new Error(`Proxy request failed with status ${res.status}`);
  }

  return await res.json();
}
