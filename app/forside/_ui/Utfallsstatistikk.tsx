import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { useStatistikk } from '@/app/api/statistikk/useStatistikk';
import SWRLaster from '@/components/SWRLaster';
import { EyeIcon, HandshakeIcon } from '@navikt/aksel-icons';
import { HelpText } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

const Utfallsstatistikk: FunctionComponent<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const statistikkHook = useStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  return (
    <SWRLaster
      hooks={[statistikkHook]}
      skeleton={
        <div className='flex gap-6'>
          <InfokortSkeleton />
          <InfokortSkeleton />
        </div>
      }
    >
      {(data) => (
        <div
          className='flex flex-col gap-6 md:grid md:grid-cols-2'
          data-testid='forside-utfallsstatistikk'
        >
          <Infokort
            tittel='Antall delt med arbeidsgiver'
            ikon={<EyeIcon aria-hidden />}
            tall={data.antPresentasjoner.totalt}
            // beskrivelse={`${data.antPresentasjoner.under30år} under 30 år · ${data.antPresentasjoner.innsatsgruppeIkkeStandard} utenom standardinnsats`}
            beskrivelse={
              <span className='flex items-center gap-2'>
                {`${data.antPresentasjoner.under30år} under 30 år `}{' '}
                <HelpText>
                  Presisering for statistikk som gjelder “var under 30 år” og
                  “hadde ikke standardinnsats se{' '}
                  <a
                    className='font-bold underline'
                    target='_blank'
                    href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-registrere-du-at-en.aspx#statistikk-i-rekrutteringsbistand-for-“var-under-30-år”-og-“hadde-ikke-standardinnsats”'
                  >
                    Se lenke til Navet
                  </a>
                </HelpText>{' '}
                {`· ${data.antPresentasjoner.innsatsgruppeIkkeStandard} utenom standardinnsats`}{' '}
              </span>
            }
          />
          <Infokort
            tittel='Antall som har fått jobb'
            beskrivelse={
              <span className='flex items-center gap-2'>
                {`${data.antFåttJobben.under30år} under 30 år `}{' '}
                <HelpText>
                  Presisering for statistikk som gjelder “var under 30 år” og
                  “hadde ikke standardinnsats.
                  <br />
                  <a
                    target='_blank'
                    className='font-bold underline'
                    href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-registrere-du-at-en.aspx#statistikk-i-rekrutteringsbistand-for-“var-under-30-år”-og-“hadde-ikke-standardinnsats”'
                  >
                    Se lenke til Navet
                  </a>
                </HelpText>{' '}
                {`· ${data.antFåttJobben.innsatsgruppeIkkeStandard} utenom standardinnsats`}
              </span>
            }
            ikon={<HandshakeIcon aria-hidden />}
            tall={data.antFåttJobben.totalt}
          />
        </div>
      )}
    </SWRLaster>
  );
};

export default Utfallsstatistikk;
