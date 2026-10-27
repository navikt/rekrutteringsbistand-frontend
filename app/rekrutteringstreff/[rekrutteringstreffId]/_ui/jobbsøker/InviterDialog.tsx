import {
  meldingsmalerForTreff,
  useHentRekrutteringstreffMeldingsmaler,
} from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { inviterJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/inviterJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { MeldingsmalVisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/MeldingsmalVisning';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { ariaDeaktivertPrimærknappKlasse } from '@/components/ui/ariaDeaktivertKnapp';
import { RekbisError } from '@/util/rekbisError';
import { NewspaperIcon, TableIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Checkbox,
  Detail,
  Dialog,
  Heading,
  HStack,
  ReadMore,
  Tooltip,
  VStack,
} from '@navikt/ds-react';
import * as React from 'react';
import { FC, useState } from 'react';

export type InviterInternalDto = {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  fødselsnummer: string;
};

export interface InviterModalProps {
  open: boolean;
  onClose: () => void;
  inviterInternalDtoer: InviterInternalDto[];
  onFjernJobbsøker: (personTreffId: string) => void;
  onInvitasjonSendt: () => void;
}

export const InviterDialog: React.FC<InviterModalProps> = ({
  open,
  onClose,
  inviterInternalDtoer,
  onFjernJobbsøker,
  onInvitasjonSendt,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { data: meldingsmaler } = useHentRekrutteringstreffMeldingsmaler();
  const invitasjon =
    meldingsmaler &&
    meldingsmalerForTreff(
      meldingsmaler,
      treff?.kategori === RekrutteringstreffKategori.WORKOP,
    ).invitert;
  const [isLoading, setIsLoading] = useState(false);
  const [bekreftet, setBekreftet] = useState(false);
  const antall = inviterInternalDtoer.length;
  const erFlereInvitert = antall > 1;
  const header =
    antall === 1
      ? 'Inviter jobbsøkeren til treff'
      : `Inviter ${antall} jobbsøkere til treff`;

  const deaktivertBegrunnelse = !bekreftet
    ? 'Du må bekrefte individuell vurdering før du kan invitere'
    : null;
  const inviterDeaktivert = deaktivertBegrunnelse !== null || isLoading;

  const handleInviter = async () => {
    if (inviterDeaktivert) return;
    setIsLoading(true);
    const personTreffIder = inviterInternalDtoer.map((j) => j.personTreffId);

    try {
      await inviterJobbsøkere(rekrutteringstreffId, personTreffIder);
      setBekreftet(false);
      onInvitasjonSendt();
    } catch (error) {
      throw new RekbisError({
        message: 'Feil ved invitasjon av jobbsøkere',
        error: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const håndterOpenChange = (nesteÅpen: boolean) => {
    if (nesteÅpen || isLoading) return;
    setBekreftet(false);
    onClose();
  };

  const listeHeader = (
    <HStack
      className='border-border-subtle text-text-subtle border-b pb-2'
      gap='space-16'
    >
      <Detail className='flex-1'>Navn og fødselsnummer</Detail>
      {erFlereInvitert && (
        <div style={{ width: '48px' }} className='shrink-0 text-right'>
          <Detail>Fjern</Detail>
        </div>
      )}
    </HStack>
  );

  const inviterKnapp = (
    <Button
      type='button'
      variant='primary'
      onClick={handleInviter}
      loading={isLoading}
      aria-disabled={deaktivertBegrunnelse !== null || undefined}
      className={ariaDeaktivertPrimærknappKlasse}
    >
      {antall === 1 ? 'Inviter jobbsøkeren' : `Inviter ${antall} jobbsøkere`}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={håndterOpenChange}>
      <Dialog.Popup width='medium' closeOnOutsideClick={!isLoading}>
        <Dialog.Header withClosebutton={!isLoading}>
          <Dialog.Title>{header}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <VStack gap='space-16'>
            <VStack gap='space-16'>
              <BodyShort>
                Sjekk at jobbsøker{erFlereInvitert ? 'ne' : 'en'} du har valgt
                stemmer, og send dem en invitasjon i aktivitetsplanen.
              </BodyShort>
              <div>
                <ul className='mt-2 space-y-2'>
                  {inviterInternalDtoer.length > 5 && (
                    <ReadMore header='Disse jobbsøkerne blir invitert'>
                      {listeHeader}
                      {inviterInternalDtoer?.map((jobbsøker) => (
                        <JobbsøkerVisning
                          jobbsøker={jobbsøker}
                          key={jobbsøker.personTreffId}
                          erFlereInvitert={erFlereInvitert}
                          onFjernJobbsøker={onFjernJobbsøker}
                        />
                      ))}
                    </ReadMore>
                  )}
                  {inviterInternalDtoer.length <= 5 && (
                    <>
                      {listeHeader}
                      {inviterInternalDtoer?.map((jobbsøker) => (
                        <JobbsøkerVisning
                          jobbsøker={jobbsøker}
                          key={jobbsøker.personTreffId}
                          erFlereInvitert={erFlereInvitert}
                          onFjernJobbsøker={onFjernJobbsøker}
                        />
                      ))}
                    </>
                  )}
                </ul>
              </div>
              <Checkbox
                checked={bekreftet}
                onChange={(e) => setBekreftet(e.target.checked)}
                disabled={isLoading}
              >
                Jeg bekrefter at de valgte jobbsøkerne er vurdert individuelt
                som relevante for den/de stillingen(e) som tilbys
              </Checkbox>
            </VStack>
            <Box background={'neutral-soft'} className='rounded-md p-4'>
              <VStack gap='space-16'>
                <Heading level='3' size='small'>
                  Dette skjer videre
                </Heading>
                <VStack gap='space-12'>
                  <HStack gap='space-8' align='start'>
                    <div className='mt-0.5 w-6 flex-none'>
                      <TableIcon fontSize='1.5rem' aria-hidden />
                    </div>
                    <BodyShort className='flex-1'>
                      Jobbsøkeren får et kort i aktivitetsplanen i kolonnen
                      &quot;Forslag&quot;. Kortet inneholder navnet på treffet,
                      tid, sted og svarfrist.
                    </BodyShort>
                  </HStack>

                  <HStack gap='space-8' align='start'>
                    <div className='mt-0.5 w-6 flex-none'>
                      <NewspaperIcon fontSize='1.5rem' aria-hidden />
                    </div>
                    <BodyShort className='flex-1'>
                      Aktivitetskortet lenker til en informasjonsside om
                      treffet. Der ser de mer informasjon om treffet og svarer
                      på invitasjonen.
                    </BodyShort>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {invitasjon && (
              <MeldingsmalVisning
                tittel='Melding til jobbsøker'
                undertekst='Jobbsøkeren varsles på måten de har valgt (SMS, e-post, nav.no).'
                smsTekst={invitasjon.smsTekst}
                epostTittel={invitasjon.epostTittel}
                epostHtmlBody={invitasjon.epostHtmlBody}
              />
            )}
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button type='button' variant='secondary' disabled={isLoading}>
              Avbryt
            </Button>
          </Dialog.CloseTrigger>
          {deaktivertBegrunnelse && !isLoading ? (
            <Tooltip content={deaktivertBegrunnelse} describesChild>
              {inviterKnapp}
            </Tooltip>
          ) : (
            inviterKnapp
          )}
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

interface JobbsøkerVisningProps {
  jobbsøker: InviterInternalDto;
  erFlereInvitert: boolean;
  onFjernJobbsøker: (personTreffId: string) => void;
}

const JobbsøkerVisning: FC<JobbsøkerVisningProps> = ({
  jobbsøker,
  erFlereInvitert,
  onFjernJobbsøker,
}) => {
  return (
    <li key={jobbsøker.personTreffId}>
      <HStack align='center' className='py-2' gap='space-16'>
        <VStack gap='space-0' className='flex-1'>
          <BodyShort>
            {jobbsøker.fornavn} {jobbsøker.etternavn}
          </BodyShort>
          <BodyShort textColor='subtle'>{jobbsøker.fødselsnummer}</BodyShort>
        </VStack>
        {erFlereInvitert && (
          <div className='flex w-12 shrink-0 justify-end'>
            <Button
              variant='tertiary'
              size='small'
              icon={<XMarkIcon aria-hidden />}
              onClick={() => onFjernJobbsøker(jobbsøker.personTreffId)}
              aria-label={`Fjern ${jobbsøker.fornavn} ${jobbsøker.etternavn}`}
            />
          </div>
        )}
      </HStack>
    </li>
  );
};

export default InviterDialog;
