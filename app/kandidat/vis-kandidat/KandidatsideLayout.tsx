'use client';

import { useKandidatContext } from './KandidatContext';
import { filtrerbareInnsatsgrupper } from '@/app/kandidat/_ui/innsatsgrupper';
import TekstMedIkon from '@/components/felles/TekstMedIkon';
import SideLayout from '@/components/layout/SideLayout';
import SideTopBanner from '@/components/layout/SideTopBanner';
import { formaterNorskDato } from '@/util/util';
import {
  CandleIcon,
  EnvelopeClosedIcon,
  HandHeartIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
} from '@navikt/aksel-icons';
import { differenceInYears } from 'date-fns';
import * as React from 'react';

export interface KandidatSideProps {
  children?: React.ReactNode | undefined;
}

const KandidatSideLayout: React.FC<KandidatSideProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();

  return (
    <SideLayout
      navigasjon={<div />}
      banner={
        <SideTopBanner
          tittel={`${kandidatData.fornavn} ${kandidatData.etternavn}`}
          headerInnhold={
            <div className='@container/kandidatside'>
              <div
                className={
                  'grid @xl/kandidatside:grid-cols-2 grid-cols-1 gap-4 mb-4'
                }
              >
                <div>
                  <TekstMedIkon
                    ikon={<CandleIcon />}
                    tekst={`Født ${formaterNorskDato({ dato: kandidatData.fodselsdato, visning: 'kortMåned' })} (${kandidatData.fodselsdato && differenceInYears(new Date(), kandidatData.fodselsdato)}år)`}
                    splitSubtle={true}
                    subtle={`f.nr. ${kandidatData.fodselsnummer}`}
                  />
                </div>
                <TekstMedIkon
                  ikon={<LocationPinIcon />}
                  tekst={`${kandidatData.adresselinje1 && `${kandidatData.adresselinje1}, `} ${kandidatData.postnummer && kandidatData.postnummer} ${kandidatData.poststed && kandidatData.poststed}`}
                />
                <TekstMedIkon
                  ikon={<EnvelopeClosedIcon />}
                  tekst={kandidatData.epostadresse}
                />
                <TekstMedIkon
                  ikon={<PhoneIcon />}
                  tekst={kandidatData.telefon}
                />
                <TekstMedIkon
                  ikon={<HandHeartIcon />}
                  tekst={
                    kandidatData.innsatsgruppe
                      ? filtrerbareInnsatsgrupper[kandidatData.innsatsgruppe]
                          ?.label
                      : ''
                  }
                />
                <TekstMedIkon
                  ikon={<PersonIcon />}
                  tekst={`Veileder: ${kandidatData.veilederVisningsnavn || 'Ukjent veileder'} ${kandidatData.veilederIdent ? `(${kandidatData.veilederIdent})` : 'N/A'} ${kandidatData.veilederEpost || ''}`.trim()}
                />
              </div>
            </div>
          }
        />
      }
    >
      {children}
    </SideLayout>
  );
};

export default KandidatSideLayout;
