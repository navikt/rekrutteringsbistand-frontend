'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import LeggTilJobbsøkerKnapp from '../LeggTilJobbsøkerKnapp';
import InviterModal, { InviterInternalDto } from './components/InviterModal';
import JobbsøkerKort from './components/JobbsøkerKort';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import SWRLaster from '@/app/components/SWRLaster';
import { BodyShort, Button } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);
  const inviterModalRef = React.useRef<HTMLDialogElement>(null);

  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);

  const [valgteJobbsøkere, setValgteJobbsøkere] = React.useState<
    InviterInternalDto[]
  >([]);

  const harPublisert: boolean =
    rekrutteringstreffData?.hendelser?.some(
      (hendelse) => hendelse.hendelsestype === 'PUBLISER',
    ) ?? false;

  const handleCheckboxChange = (jobbsøker: JobbsøkerDTO, erValgt: boolean) => {
    const dto: InviterInternalDto = {
      fornavn: jobbsøker.fornavn,
      etternavn: jobbsøker.etternavn,
      fødselsnummer: jobbsøker.fødselsnummer,
    };

    if (erValgt) {
      setValgteJobbsøkere((prev) => [...prev, dto]);
    } else {
      setValgteJobbsøkere((prev) =>
        prev.filter((j) => j.fødselsnummer !== dto.fødselsnummer),
      );
    }
  };

  const getLagtTilData = (jobbsøker: JobbsøkerDTO) => {
    const leggTilHendelse = jobbsøker.hendelser.find(
      ({ hendelsestype }) => hendelsestype === 'OPPRETT',
    );
    if (leggTilHendelse) {
      return {
        status: 'Lagt til',
        datoLagtTil: leggTilHendelse.tidspunkt,
        lagtTilAv: leggTilHendelse.aktørIdentifikasjon,
      };
    }
    return {
      status: undefined,
      datoLagtTil: 'Ukjent dato',
      lagtTilAv: 'Ukjent',
    };
  };

  return (
    <SWRLaster hooks={[jobbsøkerHook]}>
      {(jobbsøkere) => (
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <LeggTilJobbsøkerKnapp />
            {harPublisert && (
              <Button
                disabled={valgteJobbsøkere.length === 0}
                onClick={() => inviterModalRef.current?.showModal()}
              >
                Inviter ({valgteJobbsøkere.length})
              </Button>
            )}
          </div>

          {jobbsøkere.length === 0 ? (
            <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
          ) : (
            <ul>
              {jobbsøkere.map((j, index) => {
                const { status, datoLagtTil, lagtTilAv } = getLagtTilData(j);
                return (
                  <li key={index}>
                    <JobbsøkerKort
                      fornavn={j.fornavn}
                      etternavn={j.etternavn}
                      kandidatnummer={j.kandidatnummer}
                      fødselsnummer={j.fødselsnummer}
                      navKontor={j.navkontor}
                      veileder={{
                        navn: j.veilederNavn,
                        navIdent: j.veilederNavIdent,
                      }}
                      datoLagtTil={format(new Date(datoLagtTil), 'dd.MM.yyyy')}
                      lagtTilAv={lagtTilAv}
                      status={status}
                      harPublisert={harPublisert}
                      erValgt={valgteJobbsøkere.some(
                        (valgt) => valgt.fødselsnummer === j.fødselsnummer,
                      )}
                      onCheckboxChange={(erValgt) =>
                        handleCheckboxChange(j, erValgt)
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <InviterModal
            modalref={inviterModalRef}
            inviterInternalDto={valgteJobbsøkere}
            onFjernJobbsøker={(fødselsnummer: string) => {
              setValgteJobbsøkere((prev) =>
                prev.filter((j) => j.fødselsnummer !== fødselsnummer),
              );
            }}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Jobbsøkere;
