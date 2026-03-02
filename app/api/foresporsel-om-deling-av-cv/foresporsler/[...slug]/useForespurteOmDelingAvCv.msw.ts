import { ForespørselDelingAvCvAPI } from '@/app/api/api-routes';
import { generateMockForespurteOmDelingAvCv } from '@/app/api/foresporsel-om-deling-av-cv/mocks/forespurteOmDelingAvCv.mock';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const ForespurteOmDelingAvCvEndepunkt = (stillingsId: string) => {
  return `${ForespørselDelingAvCvAPI.internUrl}/foresporsler/${stillingsId}`;
};

export const foresporselOmDelingAvCVMSWHandler = getMock(
  ForespurteOmDelingAvCvEndepunkt('*'),
  () => HttpResponse.json(generateMockForespurteOmDelingAvCv()),
);
