'use client';

import TekstMedIkon from '../../components/TekstMedIkon';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { useKandidatContext } from './KandidatContext';
import {
  CandleIcon,
  EnvelopeClosedIcon,
  HandHeartIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
} from '@navikt/aksel-icons';
import { differenceInYears, format } from 'date-fns';
import * as React from 'react';

export interface KandidatSideProps {
  children?: React.ReactNode | undefined;
}

const KandidatSideLayout: React.FC<KandidatSideProps> = ({ children }) => {
  const { kandidatsammendragData, kandidatData } = useKandidatContext();

  return (
    <SideLayout
      banner={
        <SideTopBanner
          tittel={`${kandidatsammendragData.fornavn} ${kandidatsammendragData.etternavn}`}
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
                    tekst={`Født ${format(kandidatsammendragData.fodselsdato, 'dd.MM.yyyy')} (${differenceInYears(new Date(), kandidatsammendragData.fodselsdato)}år)`}
                    splitSubtle={true}
                    subtle={`f.nr. ${kandidatsammendragData.fodselsnummer}`}
                  />
                </div>
                <TekstMedIkon
                  ikon={<LocationPinIcon />}
                  tekst={`${kandidatsammendragData.adresselinje1}, ${kandidatsammendragData.postnummer} ${kandidatsammendragData.poststed}`}
                />
                <TekstMedIkon
                  ikon={<EnvelopeClosedIcon />}
                  tekst={kandidatsammendragData.epostadresse}
                />
                <TekstMedIkon
                  ikon={<PhoneIcon />}
                  tekst={kandidatsammendragData.telefon}
                />
                <TekstMedIkon
                  ikon={<HandHeartIcon />}
                  tekst={kandidatData.innsatsgruppe}
                />
                <TekstMedIkon
                  ikon={<PersonIcon />}
                  tekst={`Veileder: ${kandidatsammendragData.veilederVisningsnavn || 'Ukjent veileder'} ${kandidatsammendragData.veilederIdent ? `(${kandidatsammendragData.veilederIdent})` : 'N/A'} ${kandidatsammendragData.veilederEpost || ''}`.trim()}
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
