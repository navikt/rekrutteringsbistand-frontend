import { z } from 'zod';
import {
  stillingSourceSchema,
  stillingsSøkDTOSchema,
} from '../api/stillingssok/zod';

export type StillingsDTO = z.infer<typeof stillingSourceSchema>;
export type StillingsSøkDTO = z.infer<typeof stillingsSøkDTOSchema>;

export enum StillingsSøkQueryparam {
  // Filtre
  Tekst = 'q',
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
