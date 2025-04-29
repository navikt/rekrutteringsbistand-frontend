'use client';

import TekstMedIkon from '../../components/TekstMedIkon';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { useKandidatContext } from './KandidatContext';
import KandidatNavigering from './KandidatNavigering';
import {
  CandleIcon,
  EnvelopeClosedIcon,
  LocationPinIcon,
  PersonIcon,
  PhoneIcon,
} from '@navikt/aksel-icons';
import { differenceInYears, format } from 'date-fns';
import * as React from 'react';

export interface KandidatSideProps {
  children?: React.ReactNode | undefined;
  sidebar?: boolean;
}

const KandidatSideLayout: React.FC<KandidatSideProps> = ({
  children,
  sidebar,
}) => {
  const { kandidatsammendragData } = useKandidatContext();

  return (
    <SideLayout
      banner={
        <SideTopBanner
          chip={
            <KandidatNavigering
              kandidatnr={kandidatsammendragData.arenaKandidatnr}
            />
          }
          tittel={
            sidebar
              ? null
              : `${kandidatsammendragData.fornavn} ${kandidatsammendragData.etternavn}`
          }
          headerInnhold={
            <div className={sidebar ? '' : 'mt-2'}>
              <div
                className={
                  sidebar ? 'grid grid-cols-2 gap-4 mb-4' : 'flex gap-4'
                }
              >
                <div>
                  <TekstMedIkon
                    ikon={<CandleIcon />}
                    tekst={`Født ${format(kandidatsammendragData.fodselsdato, 'dd.MM.yyyy')} (${differenceInYears(new Date(), kandidatsammendragData.fodselsdato)}år)`}
                    splitSubtle={sidebar}
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
              </div>
              <div className='mt-2 flex'>
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
