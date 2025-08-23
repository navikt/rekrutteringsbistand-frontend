'use client';

import InnleggModal from './InnleggModal';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import RekrutteringstreffDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/RekrutteringstreffDetalj';
import { formaterKlokkeslett } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/_ui/tidspunkt/utils';
import VisEditorTekst from '@/components/felles/rikteksteditor/VisEditorTekst';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import InnleggPenDarkIkon from '@/public/ikoner/innlegg_pen-dark.svg';
import InnleggPenIkon from '@/public/ikoner/innlegg_pen.svg';
import { formaterNorskDato } from '@/util/util';
import { HandShakeHeartIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  Box,
  Button,
  Detail,
  Heading,
  Label,
} from '@navikt/ds-react';
import { isSameDay } from 'date-fns';
import React, { useRef } from 'react';

export interface InnleggProps {
  rekrutteringstreffId: string;
  innlegg?: InnleggDTO;
  fra: Date | null;
  til: Date | null;
  onInnleggUpdated: () => void;
}

const Innlegg: React.FC<InnleggProps> = ({
  rekrutteringstreffId,
  innlegg,
  fra,
  til,
  onInnleggUpdated,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className='max-w-[64rem]'>
      <Heading level='2' size='medium' className='mb-4'>
        Innlegg
      </Heading>

      <RekrutteringstreffDetalj
        tittelIkon={<HandShakeHeartIcon fontSize='1.5rem' />}
        tittel='Om treffet'
        headingLevel='3'
        knapp={
          <Button
            icon={innlegg ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={openModal}
          >
            {innlegg ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {!innlegg ? (
          <Box.New
            padding='0'
            borderRadius='xlarge'
            className='flex flex-col px-6'
          >
            <div className='flex'>
              <div className='flex-[4] mt-4'>
                <Label size='medium' spacing>
                  Her kan du skrive det første innlegget til jobbsøkerne.
                </Label>
                <BodyLong size='small' spacing>
                  Skap litt ekstra trygghet ved å forklare hva som vil skje.
                </BodyLong>
                <BodyLong size='small' spacing>
                  Husk at du kan lage flere nye innlegg helt frem til treffet
                  starter.
                </BodyLong>
              </div>
              <div className='flex-[1]'>
                <SVGDarkmode
                  light={InnleggPenIkon}
                  dark={InnleggPenDarkIkon}
                  alt='Illustrasjon av en penn'
                />
              </div>
            </div>
          </Box.New>
        ) : (
          <Box.New borderRadius='xlarge' className='mb-2 ml-12'>
            <div className='flex justify-between items-start mb-2'>
              <Label size='small' as='p' textColor='subtle'>
                {innlegg.opprettetAvPersonNavn ||
                  innlegg.opprettetAvPersonNavident}
                {innlegg.opprettetAvPersonBeskrivelse &&
                  ` - ${innlegg.opprettetAvPersonBeskrivelse}`}
              </Label>
            </div>

            {fra && til && (
              <Detail spacing>
                Treffet er:{' '}
                {isSameDay(fra, til)
                  ? `${formaterNorskDato({
                      dato: fra,
                      visning: 'tall',
                    })} kl ${formaterKlokkeslett(fra)} - ${formaterKlokkeslett(
                      til,
                    )}`
                  : `${formaterNorskDato({
                      dato: fra,
                      visning: 'tall',
                    })} kl ${formaterKlokkeslett(fra)} - ${formaterNorskDato({
                      dato: til,
                      visning: 'tall',
                    })} kl ${formaterKlokkeslett(til)}`}
              </Detail>
            )}

            <div className='prose prose-sm max-w-none mt-4'>
              <VisEditorTekst htmlTekst={innlegg.htmlContent} />
            </div>
          </Box.New>
        )}
      </RekrutteringstreffDetalj>

      <InnleggModal
        modalRef={modalRef}
        rekrutteringstreffId={rekrutteringstreffId}
        innlegg={innlegg}
        onInnleggUpdated={onInnleggUpdated}
      />
    </div>
  );
};

export default Innlegg;
