'use client';

import { innleggMock } from '../mocks/innleggMock';
import { InnleggDTO, InnleggListeDTO, InnleggListeSchema } from './schemas';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';

export type { InnleggDTO, InnleggListeDTO };

export const innleggEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/innlegg`;

export const useInnlegg = (id: string) =>
  useSWR(innleggEndepunkt(id), getAPIwithSchema(InnleggListeSchema));

export const innleggMirage = (server: any) =>
  server.get(innleggEndepunkt('*'), () => innleggMock);
