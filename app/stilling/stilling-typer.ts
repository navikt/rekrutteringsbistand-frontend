import { z } from 'zod';
import { stillingSchema } from '../api/stilling/rekrutteringsbistandstilling/[slug]/zod';

export type stillingsDataDTO = z.infer<typeof stillingSchema>;

export enum Status {
  Aktiv = 'ACTIVE',
  Inaktiv = 'INACTIVE',
  Stoppet = 'STOPPED',
  Avslått = 'REJECTED',
  Slettet = 'DELETED',
}

export enum AdminStatus {
  Received = 'RECEIVED',
  Pending = 'PENDING',
  Done = 'DONE',
}

export enum Stillingskategori {
  Stilling = 'STILLING',
  Arbeidstrening = 'ARBEIDSTRENING',
  Jobbmesse = 'JOBBMESSE',
  Formidling = 'FORMIDLING',
}
