import { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import * as React from 'react';

export interface InnleggProps {
  InnleggDTO: InnleggDTO | undefined;
}

const Innlegg: React.FC<InnleggProps> = ({}) => {
  return <React.Fragment> Hello </React.Fragment>;
};

export default Innlegg;
