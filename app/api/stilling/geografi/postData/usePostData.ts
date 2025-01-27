'use client';

import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../../fetcher';

const postDataEndepunkt = '/api/stilling/geografi/postData';

export const postLocationSchema = z.object({
  postalCode: z.string(),
  city: z.string(),
  municipality: z.object({
    code: z.string(),
    name: z.string(),
    countyCode: z.string(),
    capitalizedName: z.string(),
  }),
  county: z.object({
    code: z.string(),
    name: z.string(),
    capitalizedName: z.string(),
  }),
  capitalizedCityName: z.string(),
});

const postSchema = z.array(postLocationSchema);

export type postLocationDTO = z.infer<typeof postLocationSchema>;

export const usePostData = () =>
  useSWRImmutable(postDataEndepunkt, getAPIwithSchema(postSchema));

export const postDataMirage = (server: any) =>
  server.get(postDataEndepunkt, () => {
    return [
      {
        postalCode: '4889',
        city: 'FEVIK',
        municipality: {
          code: '4202',
          name: 'GRIMSTAD',
          countyCode: '42',
          capitalizedName: 'Grimstad',
        },
        county: {
          code: '42',
          name: 'AGDER',
          capitalizedName: 'Agder',
        },
        capitalizedCityName: 'Fevik',
      },
    ];
  });
