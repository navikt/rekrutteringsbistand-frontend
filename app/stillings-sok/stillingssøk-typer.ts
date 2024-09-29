import { z } from 'zod';
import {
  stillingSøkSchema,
  stillingSøkSourceSchema,
  stillingsSøkDTOSchema,
} from '../api/stillings-sok/zod';

export type StillingsSøkStillingDTO = z.infer<typeof stillingSøkSourceSchema>;
export type StillingsSøkDTO = z.infer<typeof stillingsSøkDTOSchema>;

export enum StillingsSøkQueryparam {
  // Filtre
  Tekst = 'fritekst',
  Publisert = 'publisert',
  Side = 'side',
  Fylker = 'fylker',
  Kommuner = 'kommuner',
  Statuser = 'statuser',
  Stillingskategorier = 'stillingskategori',
  HovedInkluderingTags = 'inkludering',
  SubInkluderingTags = 'inkluderingUnderkategori',
  Felter = 'felter',
  Sortering = 'sortering',

  // Valgmuligheter
  BrukStandardsøk = 'brukStandardsok',
  BrukKriterierFraKandidat = 'brukKriterierFraKandidat',
  Portefølje = 'portefolje',
  Modal = 'modal',
}

export enum StillingsSøkPortefølje {
  VIS_ALLE = 'visAlle',
  VIS_MINE = 'visMine',
}
