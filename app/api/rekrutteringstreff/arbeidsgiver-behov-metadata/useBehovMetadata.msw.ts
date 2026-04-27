import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const behovMetadataMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/arbeidsgiver-behov-metadata`,
  () =>
    HttpResponse.json({
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
        'Norsk',
        'Engelsk',
        'Svensk',
        'Dansk',
        'Tysk',
        'Fransk',
        'Spansk',
        'Annet',
      ],
    }),
);
