import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const BehovMetadataSchema = z.object({
  ansettelsesformer: z.array(z.string()),
  arbeidssprak: z.array(z.string()),
});

export type BehovMetadataDTO = z.infer<typeof BehovMetadataSchema>;

const endepunkt = `${RekrutteringstreffAPI.internUrl}/arbeidsgiver-behov-metadata`;

export const useBehovMetadata = () => useSWRGet(endepunkt, BehovMetadataSchema);

export const behovMetadataMock: BehovMetadataDTO = {
  ansettelsesformer: [
    'Fast',
    'Vikariat',
    'Engasjement',
    'Prosjekt',
    'Sesong',
    'Trainee',
    'Lærling',
    'Annet',
    'Selvstendig næringsdrivende',
    'Feriejobb',
    'Åremål',
  ],
  arbeidssprak: [
    'Abaluhyisk',
    'Afar/Danakil',
    'Arabisk',
    'Bono',
    'Cebuano',
    'Dansk',
    'Engelsk',
    'Filipino/Tagalog',
    'Fransk',
    'Italiensk',
    'Kurmanji (Nord-Kurdisk)',
    'Nederlandsk',
    'Nordsamisk',
    'Norsk',
    'Norsk tegnspråk',
    'Polsk',
    'Portugisisk',
    'Somalisk',
    'Spansk',
    'Svensk',
    'Tysk',
    'Ukrainsk',
  ],
};

export const behovMetadataMSWHandler = getMock(endepunkt, () =>
  HttpResponse.json(behovMetadataMock),
);
