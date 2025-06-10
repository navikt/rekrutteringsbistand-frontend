'use client';

import { formaterKlokkeslett } from './tidspunkt/utils';
import { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  oppdaterEttInnlegg,
  OpprettEllerOppdaterInnleggDto,
  opprettInnleggForTreff,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import RikTekstEditor from '@/app/components/rikteksteditor/RikTekstEditor';
import VisEditorTekst from '@/app/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/app/components/util';
import RekrutteringstreffDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/RekrutteringstreffDetalj';
import InnleggPenDarkIkon from '@/public/ikoner/innlegg_pen-dark.svg';
import InnleggPenIkon from '@/public/ikoner/innlegg_pen.svg';
import { HandShakeHeartIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Detail,
  ErrorMessage,
  Heading,
  Label,
  Modal,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { isSameDay } from 'date-fns';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';

export interface InnleggProps {
  rekrutteringstreffId: string;
  innlegg?: InnleggDTO;
  fra: Date | null;
  til: Date | null;
  onInnleggUpdated: () => void; // For å trigge SWR mutate e.l.
}

interface InnleggFormFields {
  htmlContent: string;
}

const Innlegg: React.FC<InnleggProps> = ({
  rekrutteringstreffId,
  innlegg,
  fra,
  til,
  onInnleggUpdated,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formId = React.useId();

  const methods = useForm<InnleggFormFields>({
    defaultValues: {
      htmlContent: innlegg?.htmlContent ?? '',
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      htmlContent: innlegg?.htmlContent ?? '',
    });
  }, [innlegg, reset]);

  const onSubmitHandler: SubmitHandler<InnleggFormFields> = async (data) => {
    try {
      const payload: OpprettEllerOppdaterInnleggDto = {
        htmlContent: data.htmlContent,
        tittel: 'Om treffet',
        opprettetAvPersonNavn: null,
        opprettetAvPersonBeskrivelse: 'Markedskontakt',
        sendesTilJobbsokerTidspunkt: new Date().toISOString(),
      };

      if (innlegg?.id) {
        await oppdaterEttInnlegg(rekrutteringstreffId, innlegg.id, payload);
      } else {
        await opprettInnleggForTreff(rekrutteringstreffId, payload);
      }
      onInnleggUpdated();
      modalRef.current?.close();
    } catch (error) {
      logger.error('Feil ved lagring av innlegg:', error);
    }
  };

  const openModal = () => {
    reset({
      htmlContent: innlegg?.htmlContent ?? '',
    });
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
                  Skap litt ekstra trygghet ved å forklare hva som vil skje. For
                  eksempel hva treffet handler om, et innsalg om hvorfor
                  jobbsøkerne burde komme, eller hva de kan forvente.
                </BodyLong>
                <BodyLong size='small' spacing>
                  Husk at du ikke trenger å informere om alt med en gang. Du kan
                  lage flere nye innlegg helt frem til treffet starter.
                </BodyLong>
              </div>
              <div className='flex-[1]'>
                <SVGDarkmode
                  light={InnleggPenIkon}
                  dark={InnleggPenDarkIkon}
                  alt='Illustrasjon av en penn som skriver'
                />
              </div>
            </div>
          </Box.New>
        ) : (
          <Box.New borderRadius='xlarge' className='mb-2 ml-12'>
            <div className='flex justify-between items-start mb-2'>
              <div>
                <Label size='small' as='p' textColor='subtle'>
                  {innlegg.opprettetAvPersonNavn ||
                    innlegg.opprettetAvPersonNavident}
                  {innlegg.opprettetAvPersonBeskrivelse &&
                    ` - ${innlegg.opprettetAvPersonBeskrivelse}`}
                </Label>
              </div>
            </div>

            {fra && til && (
              <Detail spacing>
                Treffet er:{' '}
                {isSameDay(fra, til)
                  ? `${formaterNorskDato({ dato: fra, visning: 'tall' })} kl ${formaterKlokkeslett(fra)} - ${formaterKlokkeslett(til)}`
                  : `${formaterNorskDato({ dato: fra, visning: 'tall' })} kl ${formaterKlokkeslett(fra)} - ${formaterNorskDato({ dato: til, visning: 'tall' })} kl ${formaterKlokkeslett(til)}`}
              </Detail>
            )}
            <div className='prose prose-sm max-w-none mt-4'>
              <VisEditorTekst htmlTekst={innlegg.htmlContent} />
            </div>
          </Box.New>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        ref={modalRef}
        header={{ heading: innlegg ? 'Endre innlegg' : 'Skriv nytt innlegg' }}
        onClose={() => reset()}
        width='medium'
      >
        <FormProvider {...methods}>
          <form id={formId} onSubmit={handleSubmit(onSubmitHandler)}>
            <Modal.Body>
              <div className='flex flex-col gap-6'>
                <BodyShort>
                  Dette innlegget vises til jobbsøkerne før treffet. Skriv
                  gjerne en hyggelig introduksjon og praktisk informasjon.
                </BodyShort>
                <div>
                  <Label
                    htmlFor='rediger-innlegg-htmlcontent'
                    className='mb-2 block'
                  >
                    Innhold
                  </Label>
                  <RikTekstEditor
                    id='rediger-innlegg-htmlcontent'
                    tekst={watch('htmlContent') ?? ''}
                    onChange={(html) =>
                      setValue('htmlContent', html, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  />
                  {errors.htmlContent && (
                    <ErrorMessage>{errors.htmlContent.message}</ErrorMessage>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' loading={isSubmitting}>
                {innlegg ? 'Lagre endringer' : 'Opprett innlegg'}
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  modalRef.current?.close();
                  reset();
                }}
              >
                Avbryt
              </Button>
            </Modal.Footer>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default Innlegg;
