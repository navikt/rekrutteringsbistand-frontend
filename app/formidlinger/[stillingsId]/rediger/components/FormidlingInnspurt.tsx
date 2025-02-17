import { Buildings2Icon, PencilIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Detail, Heading } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

const FormidlingInnspurt = () => {
  const { control, formState, watch, getValues } =
    useFormContext<FormidlingDataForm>();

  const formidlingsVerdier = getValues();

  //   const onSubmit: SubmitHandler<StillingsDataForm> = async (data) => {
  //     setIsLoading(true);

  //     const nyStillingsData = mapFormTilStilling(data, stillingsData);

  //     const publiserStillingsData = {
  //       ...nyStillingsData,
  //       stilling: {
  //         ...nyStillingsData.stilling,
  //         status: 'ACTIVE',
  //         administration: {
  //           ...nyStillingsData.stilling.administration,
  //           status: 'DONE',
  //         },
  //         firstPublished: true,
  //       },
  //     };

  return (
    <div className='space-y-4'>
      <Heading size='large' level='1'>
        Innspurt
      </Heading>
      <BodyShort>Se over at alt stemmer og fullfør registreringen.</BodyShort>

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
          {formidlingsVerdier.omKandiatene?.map((person) => (
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
              {formidlingsVerdier.omFormidling?.categoryList[0].name}
            </BodyShort>
            <BodyShort>{formidlingsVerdier.omFormidling?.sektor}</BodyShort>
            {/* <BodyShort>
              {formidlingsVerdier.omFormidling?.adresseLokasjoner[0].adresse}
            </BodyShort> */}
            <BodyShort>
              {formidlingsVerdier.omFormidling?.ansettelsesform}
            </BodyShort>
            <BodyShort>
              {formidlingsVerdier.omFormidling?.arbeidstidsordning}
            </BodyShort>
            <BodyShort>{formidlingsVerdier.omFormidling?.omfangKode}</BodyShort>
          </div>
        </div>
      </Box.New>

      <div className='mt-8'>
        <Button
          variant='primary'
          className='w-full'
          onClick={() => console.log('🎺 getValues', getValues())}
        >
          Fullfør registreringen
        </Button>
      </div>
    </div>
  );
};

export default FormidlingInnspurt;
