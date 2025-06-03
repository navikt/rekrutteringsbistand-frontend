import { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import RekrutteringstreffDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/RekrutteringstreffDetalj';
import InnleggPenDarkIkon from '@/public/ikoner/innlegg_pen-dark.svg';
import InnleggPenIkon from '@/public/ikoner/innlegg_pen.svg';
import { HandShakeHeartIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Heading, Label } from '@navikt/ds-react';
import * as React from 'react';

export interface InnleggProps {
  InnleggDTO: InnleggDTO | undefined;
}

const Innlegg: React.FC<InnleggProps> = ({}) => {
  return (
    <div className='max-w-[64rem]'>
      <Heading level='2' size='medium'>
        Innlegg
      </Heading>
      <RekrutteringstreffDetalj
        tittelIkon={<HandShakeHeartIcon fontSize='1.5rem' />}
        tittel='Om treffet'
        headingLevel='3'
        knapp={<React.Fragment></React.Fragment>}
      >
        <Box.New
          background='raised'
          className='rounded-full mb-2 flex items-center justify-center'
        >
          <div className='flex flex-col ml-23'>
            <Label size='medium' spacing={true}>
              Her skriver du første innlegg til jobbsøkerne.
            </Label>
            <BodyLong size='small' spacing={true}>
              Skap litt ekstra trygghet ved å forklare hva som vil skje. For
              eksempel hva treffet handler om, et innsalg om hvorfor jobbsøkerne
              burde komme, eller hva de kan forvente.
            </BodyLong>
            <BodyLong size='small'>
              Husk at du ikke trenger å informere om alt med en gang. Du kan
              lage flere nye innlegg helt frem til treffet starter.
            </BodyLong>
          </div>
          <SVGDarkmode
            light={InnleggPenIkon}
            dark={InnleggPenDarkIkon}
            alt='legg_til_innlegg'
          />
        </Box.New>
      </RekrutteringstreffDetalj>
    </div>
  );
};

export default Innlegg;
