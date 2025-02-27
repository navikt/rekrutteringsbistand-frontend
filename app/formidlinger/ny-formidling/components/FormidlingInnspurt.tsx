import { Buildings2Icon, PencilIcon, PersonIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyShort,
  Box,
  Button,
  Detail,
  Heading,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

const FormidlingInnspurt = () => {
  const router = useRouter();
  const { getValues, handleSubmit } = useFormContext<FormidlingDataForm>();

  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const [senderSkjema, setSenderSkjema] = useState(false);
  const formidlingsVerdier = getValues();

  const onSubmit = async (data: FormidlingDataForm) => {
    setSenderSkjema(true);
    const formidlingData = {
      ...data,
      reportee: `${brukerData.fornavn} ${brukerData.etternavn}`,
      navIdent: brukerData.ident,
      navKontor: valgtNavKontor?.navKontor,
    };

    try {
      const nyFormidling = await fetch(
        '/api/etterregistrering/opprett-formidling',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formidlingData),
        },
      );

      const data = await nyFormidling.json();

      if (data.stillingsId) {
        router.push(`/formidlinger/${data.stillingsId}`);
      }
      throw new Error('Fikk ikke stillingsId tilbake fra opprettelse');
    } catch (error) {
      logger.error('Kunne ikke opprette formidling', error);
      throw new Error('Kunne ikke opprette formidling');
    }
  };

  return (
    <div className='space-y-4'>
      <Heading size='large' level='1'>
        Innspurt
      </Heading>
      <BodyShort>Se over at alt stemmer og fullfør registreringen.</BodyShort>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box.New>
          <div className='flex justify-between items-center w-full mb-4'>
            <Heading size='small' level='2'>
              Om kandidatene
            </Heading>

            <Button
              variant='tertiary'
              icon={<PencilIcon aria-hidden />}
              iconPosition='right'
            >
              Endre
            </Button>
          </div>
          <hr />
          <div className='space-y-4'>
            {formidlingsVerdier.omKandidatene?.map((person) => (
              <div key={person.fnr} className='flex items-center gap-2'>
                <PersonIcon className='text-gray-600' aria-hidden />
                <div>
                  <BodyShort>
                    {person.navn.fornavn} {person.navn.etternavn}
                  </BodyShort>
                  <Detail>{person.fnr}</Detail>
                </div>
              </div>
            ))}
          </div>
        </Box.New>

        <Box.New className='mt-8'>
          <div className='flex justify-between items-center w-full mb-4'>
            <Heading size='small' level='2'>
              Om arbeidsgiver og stilling
            </Heading>
            <Button
              variant='tertiary'
              icon={<PencilIcon aria-hidden />}
              iconPosition='right'
            >
              Endre
            </Button>
          </div>
          <hr />
          <div className='space-y-4'>
            <div className='flex items-start gap-2'>
              <Buildings2Icon className='text-gray-600 mt-1' aria-hidden />
              <div>
                <BodyShort>Ordknapp Blomstrete Tiger AS</BodyShort>
                <Detail>Organisasjonsnummer: 974652277</Detail>
              </div>
            </div>

            <div className='space-y-4'>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.categoryList?.[0]?.name}
              </BodyShort>
              <BodyShort>{formidlingsVerdier.omFormidlingen?.sektor}</BodyShort>
              {/* <BodyShort> */}
              {/* {formidlingsVerdier.omFormidlingen?} */}
              {/* </BodyShort> */}
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.ansettelsesform}
              </BodyShort>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.arbeidstidsordning}
              </BodyShort>
              <BodyShort>
                {formidlingsVerdier.omFormidlingen?.omfangKode}
              </BodyShort>
            </div>
          </div>
        </Box.New>

        {senderSkjema && (
          <Alert variant='info'>
            Oppretter formidling, dette kan ta litt tid.
          </Alert>
        )}
        <div className='mt-8'>
          <Button
            variant='primary'
            className='w-full'
            loading={senderSkjema}
            onClick={() => onSubmit(getValues())}
          >
            Fullfør registreringen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormidlingInnspurt;
