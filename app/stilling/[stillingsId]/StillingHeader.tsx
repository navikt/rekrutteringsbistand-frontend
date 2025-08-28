import { useStillingsContext } from './StillingsContext';
import KopierStillingLenke from './_ui/KopierStillingLenke';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from './kandidatliste/KandidatTyper';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import capitalizeEmployerName, {
  navnEierAvAstilling,
} from '@/app/stilling/_util/stilling-util';
import TekstMedIkon from '@/components/felles/TekstMedIkon';
import SideTopBanner from '@/components/layout/SideTopBanner';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const StillingHeader: React.FC = () => {
  const { stillingsData, erFormidling, erSlettet, kandidatlisteInfo, erEier } =
    useStillingsContext();

  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

  const eierNavn = navnEierAvAstilling(stillingsData);

  const antallAktuelle =
    kandidatlisteHook.data?.kandidater?.filter(
      (kandidat) => kandidat.status === InternKandidatstatus.AKTUELL,
    )?.length ?? '-';

  const antallPresenterte =
    kandidatlisteHook.data?.kandidater?.filter((kandidat) =>
      kandidat.utfallsendringer.some(
        (u) => u.utfall === KandidatutfallTyper.PRESENTERT,
      ),
    )?.length ?? '-';

  const ikkeArkiverteKandidater =
    kandidatlisteHook.data?.kandidater?.filter((k) => !k.arkivert) ?? [];

  const antallFåttJobben =
    ikkeArkiverteKandidater?.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    ).length +
    (kandidatlisteHook.data?.formidlingerAvUsynligKandidat?.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    )?.length || 0);

  return (
    <SideTopBanner
      chip={<StillingsTag stillingsData={stillingsData} />}
      headerInnhold={
        <div className='@container/sideheader'>
          <div className='flex justify-between flex-col gap-2 @5xl/sideheader:flex-row @5xl/sideheader:gap-0  '>
            <div>
              <div className='my-2 flex'>
                <TekstMedIkon
                  ikon={<Buildings2Icon />}
                  tekst={capitalizeEmployerName(
                    stillingsData.stilling.businessName ?? '',
                  )}
                />

                {eierNavn && (
                  <TekstMedIkon
                    className='ml-4'
                    ikon={<PersonIcon />}
                    tekst={`Registrert av ${eierNavn}`}
                  />
                )}
              </div>
              {!erFormidling && !erSlettet && (
                <KopierStillingLenke
                  stillingsId={stillingsData.stilling.uuid ?? ''}
                />
              )}
            </div>
            <div className='flex flex-row gap-8 '>
              <div>
                <BodyShort textColor='subtle'>Kandidater</BodyShort>
                <BodyShort>{kandidatlisteInfo?.antallKandidater}</BodyShort>
              </div>
              <div>
                <BodyShort textColor='subtle'>Aktuelle</BodyShort>
                <BodyShort>{antallAktuelle ?? '-'}</BodyShort>
              </div>
              <div>
                <BodyShort textColor='subtle'>Presentert</BodyShort>
                <BodyShort>{antallPresenterte}</BodyShort>
              </div>
              <div>
                <BodyShort textColor='subtle'>Ansatt</BodyShort>
                <BodyShort>
                  {antallFåttJobben} av{' '}
                  {stillingsData?.stilling?.properties?.positioncount}
                </BodyShort>
              </div>
            </div>
          </div>
        </div>
      }
      tilbakeKnapp
      tittel={stillingsData.stilling.title ?? ''}
    />
  );
};

export default StillingHeader;
