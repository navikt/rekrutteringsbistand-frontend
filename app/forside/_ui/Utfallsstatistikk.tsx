import Infokort, { InfokortSkeleton } from './Infokort';
import { IStatistikkValg } from './Statistikk';
import { useForesporselOmdelingAvCV } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { useRekrutteringstreffStatistikk } from '@/app/api/rekrutteringstreff/statistikk/useRekrutteringstreffStatistikk';
import { useStatistikk } from '@/app/api/statistikk/useStatistikk';
import SWRLaster from '@/components/SWRLaster';
import { getMiljø, Miljø } from '@/util/miljø';
import {
  ArrowForwardIcon,
  BriefcaseIcon,
  EyeIcon,
  HandshakeIcon,
  PersonGroupIcon,
  RulerIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading, HelpText } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

const prioritertMålgruppeBeskrivelse = (
  under30år: number,
  innsatsgruppeIkkeStandard: number,
) => (
  <span className='flex items-center gap-2'>
    {`${under30år} under 30 år `}{' '}
    <HelpText>
      Presisering for statistikk som gjelder “var under 30 år” og “hadde ikke
      standardinnsats.
      <br />
      <a
        target='_blank'
        rel='noopener noreferrer'
        className='font-bold underline'
        href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-registrere-du-at-en.aspx#statistikk-i-rekrutteringsbistand-for-“var-under-30-år”-og-“hadde-ikke-standardinnsats”'
      >
        Se lenke til Navet
      </a>
    </HelpText>{' '}
    {`· ${innsatsgruppeIkkeStandard} utenom standardinnsats`}
  </span>
);

const Utfallsstatistikk: FunctionComponent<IStatistikkValg> = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}) => {
  const visTreff = getMiljø() !== Miljø.ProdGcp;

  const statistikkHook = useStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  const treffStatistikkHook = useRekrutteringstreffStatistikk({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  const forespørselHook = useForesporselOmdelingAvCV({
    navKontor,
    fraOgMed,
    tilOgMed,
  });

  return (
    <SWRLaster
      hooks={[statistikkHook, treffStatistikkHook, forespørselHook]}
      skeleton={
        <div className='flex flex-col gap-6 md:grid md:grid-cols-2'>
          <div className='flex flex-col gap-6'>
            <InfokortSkeleton fullWidth />
            <InfokortSkeleton fullWidth />
          </div>
          <div className='flex flex-col gap-6'>
            <InfokortSkeleton fullWidth />
            <InfokortSkeleton fullWidth />
            {visTreff && <InfokortSkeleton fullWidth />}
            <InfokortSkeleton fullWidth />
          </div>
        </div>
      }
    >
      {(data, treffStatistikk, forespørsel) => {
        const fåttJobbUnder30år =
          data.antFåttJobben.under30år +
          (visTreff ? treffStatistikk.under30år : 0);
        const fåttJobbInnsatsgruppeIkkeStandard =
          data.antFåttJobben.innsatsgruppeIkkeStandard +
          (visTreff ? treffStatistikk.innsatsgruppeIkkeStandard : 0);
        const fåttJobbTotalt =
          data.fåttJobbenPerKategori.stilling.totalt +
          (visTreff
            ? data.fåttJobbenPerKategori.rekrutteringstreff.totalt
            : 0) +
          data.fåttJobbenPerKategori.etterregistrering.totalt;

        return (
          <div
            className='flex flex-col gap-6 md:grid md:grid-cols-2'
            data-testid='forside-utfallsstatistikk'
          >
            <div className='flex flex-col gap-6'>
              <Infokort
                tittel='Antall som har fått jobb'
                beskrivelse={prioritertMålgruppeBeskrivelse(
                  fåttJobbUnder30år,
                  fåttJobbInnsatsgruppeIkkeStandard,
                )}
                ikon={<HandshakeIcon aria-hidden />}
                tall={fåttJobbTotalt}
              />
              <Infokort
                tittel='Antall som har fått jobb - Stilling'
                ikon={<BriefcaseIcon aria-hidden />}
                tall={data.fåttJobbenPerKategori.stilling.totalt}
                beskrivelse={prioritertMålgruppeBeskrivelse(
                  data.fåttJobbenPerKategori.stilling.under30år,
                  data.fåttJobbenPerKategori.stilling.innsatsgruppeIkkeStandard,
                )}
              />
              {visTreff && (
                <Infokort
                  tittel='Antall som har fått jobb - Rekrutteringstreff'
                  ikon={<PersonGroupIcon aria-hidden />}
                  tall={data.fåttJobbenPerKategori.rekrutteringstreff.totalt}
                  beskrivelse={prioritertMålgruppeBeskrivelse(
                    treffStatistikk.under30år,
                    treffStatistikk.innsatsgruppeIkkeStandard,
                  )}
                />
              )}
              <Infokort
                tittel='Antall som har fått jobb - Etterregistrering'
                ikon={<RulerIcon aria-hidden />}
                tall={data.fåttJobbenPerKategori.etterregistrering.totalt}
                beskrivelse={prioritertMålgruppeBeskrivelse(
                  data.fåttJobbenPerKategori.etterregistrering.under30år,
                  data.fåttJobbenPerKategori.etterregistrering
                    .innsatsgruppeIkkeStandard,
                )}
              />
            </div>
            <div className='flex flex-col gap-6'>
              <Infokort
                tittel='Antall delt med arbeidsgiver'
                ikon={<EyeIcon aria-hidden />}
                tall={data.antPresentasjoner.totalt}
                beskrivelse={
                  <span className='flex items-center gap-2'>
                    {`${data.antPresentasjoner.under30år} under 30 år `}{' '}
                    <HelpText>
                      Presisering for statistikk som gjelder “var under 30 år”
                      og “hadde ikke standardinnsats se{' '}
                      <a
                        className='font-bold underline'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-registrere-du-at-en.aspx#statistikk-i-rekrutteringsbistand-for-“var-under-30-år”-og-“hadde-ikke-standardinnsats”'
                      >
                        Se lenke til Navet
                      </a>
                    </HelpText>{' '}
                    {`· ${data.antPresentasjoner.innsatsgruppeIkkeStandard} utenom standardinnsats`}{' '}
                  </span>
                }
              />
              <div data-testid='forside-forespørsel-statistikk'>
                <Infokort
                  ikonFront
                  tittel='CV-er godkjent for deling med arbeidsgiver'
                  ikon={<ArrowForwardIcon />}
                  detaljer={[
                    {
                      beskrivelse: 'Kandidater spurt om å dele',
                      tall:
                        forespørsel.antallSvartJa +
                        forespørsel.antallSvartNei +
                        forespørsel.antallVenterPåSvar +
                        forespørsel.antallUtløpteSvar,
                    },
                    {
                      beskrivelse: 'Godkjent',
                      tall: forespørsel.antallSvartJa,
                    },
                    {
                      beskrivelse: 'Avslått',
                      tall: forespørsel.antallSvartNei,
                    },
                    {
                      beskrivelse: 'Ikke svart',
                      tall: forespørsel.antallVenterPåSvar,
                    },
                    {
                      beskrivelse: 'Utløpt',
                      tall: forespørsel.antallUtløpteSvar,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default Utfallsstatistikk;
