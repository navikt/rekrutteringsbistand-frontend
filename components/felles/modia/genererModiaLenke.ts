import { buildLinks, Environment, Url, UrlFormat } from './lenkeUtil';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { getMiljø, Miljø } from '@/util/miljø';
import { useMemo } from 'react';

export interface LinkWithTitle extends Url {
  title: string;
  subPath?: string | undefined;
  target?: string | undefined;
}

export interface LinkSection {
  links: LinkWithTitle[];
  title: string;
  newPage?: boolean | undefined;
}

export interface LinkSections {
  modia: LinkSection;
  arbeidsrettet: LinkSection;
  sykefravaer: LinkSection;
  andre: LinkSection;
}

const buildLinkWithTitle = (
  link: Url,
  title: string,
  subPath: string | undefined = '',
  target?: string,
): LinkWithTitle => ({
  ...link,
  title,
  subPath,
  target,
});

const generateLinks = ({
  environment,
  urlFormat,
  fnr,
  enhet,
  aktoerId,
  proxy,
}: {
  environment: Environment;
  urlFormat: UrlFormat;
  fnr?: string | undefined | null;
  enhet?: string | undefined | null;
  aktoerId?: string | undefined | null;
  proxy?: string | undefined | null;
}): LinkSections => {
  const links = buildLinks({
    environment,
    urlFormat,
    fnr,
    enhet,
    aktoerId,
    contextHolderProxy: proxy,
  });
  const modia: LinkSection = {
    title: 'Modia Personoversikt',
    links: [
      buildLinkWithTitle(links.modiaUrl, 'Oversikt'),
      buildLinkWithTitle(links.modiaUrl, 'Oppfølging', '/oppfolging'),
      buildLinkWithTitle(links.modiaUrl, 'Kommunikasjon', '/meldinger'),
      buildLinkWithTitle(links.modiaUrl, 'Utbetalinger', '/utbetaling'),
      buildLinkWithTitle(links.modiaUrl, 'Saksoversikt', '/saker'),
      buildLinkWithTitle(links.modiaUrl, 'Ytelser', '/ytelser'),
      buildLinkWithTitle(links.modiaUrl, 'Varslinger', '/varsler'),
    ],
  };
  const arbeidsrettet: LinkSection = {
    title: 'Modia Arbeidsrettet oppfølging',
    links: [
      buildLinkWithTitle(
        links.veilarbportefoljeUrl,
        'Enhetens oversikt',
        `/enhet`,
      ),
      buildLinkWithTitle(
        links.veilarbportefoljeUrl,
        'Min oversikt',
        `/portefolje`,
      ),
      buildLinkWithTitle(links.beslutterUrl, 'Kvalitetssikring 14a'),
      buildLinkWithTitle(links.veilarbpersonUrl, 'Aktivitetsplan'),
      buildLinkWithTitle(links.arbeidssokerUrl, 'Arbeidssøkerregisteret'),
      buildLinkWithTitle(
        links.tiltaksGjennomforingUrl,
        'Tiltaksgjennomføring - avtaler',
      ),
      buildLinkWithTitle(links.arbeidsmarkedsTiltak, 'Arbeidsmarkedstiltak'),
    ],
  };
  const sykefravaer: LinkSection = {
    title: 'Modia Sykefraværsoppfølging',
    links: [
      buildLinkWithTitle(links.syfooversiktUrl, 'Enhetens oversikt', '/enhet'),
      buildLinkWithTitle(links.syfooversiktUrl, 'Min oversikt', '/minoversikt'),
      buildLinkWithTitle(links.syfomoteOversikt, 'Dialogmøteoversikt'),
      buildLinkWithTitle(links.finnfastlege, 'Finn fastlege'),
      buildLinkWithTitle(links.syfomodiaperson, 'Sykmeldt enkeltperson'),
    ],
  };

  const andre: LinkSection = {
    title: 'Andre systemer',
    newPage: true,
    links: [
      buildLinkWithTitle(links.aaRegister, 'AA register'),
      buildLinkWithTitle(links.pesys, 'Pesys'),
      buildLinkWithTitle(links.gosys, 'Gosys', undefined, 'gosys'),
      buildLinkWithTitle(links.foreldrepenger, 'Foreldrepenger'),
      buildLinkWithTitle(links.k9, 'K9-sak'),
      buildLinkWithTitle(links.rekrutteringsBistand, 'Rekrutteringsbistand'),
      buildLinkWithTitle(links.INST2, 'INST2'),
      buildLinkWithTitle(
        links.rekrutteringsBistand,
        'Søk etter stilling',
        '/stillingssok?standardsok',
      ),
      buildLinkWithTitle(links.modiaSosialhjelp, 'Sosialhjelp'),
      buildLinkWithTitle(links.refusjon, 'Refusjon tilskudd'),
      buildLinkWithTitle(links.salesforce, 'Salesforce'),
      buildLinkWithTitle(links.kunnskapsbasenNKS, 'Kunnskapsbasen NKS'),
    ],
  };

  return { modia, arbeidsrettet, sykefravaer, andre };
};

export const useGenerateLinks = (): LinkSections => {
  const { valgtFnr, valgtNavKontor } = useApplikasjonContext();

  const miljo = getMiljø() === Miljø.ProdGcp ? 'prod' : 'q0';
  const proxyUrl =
    getMiljø() === Miljø.ProdGcp
      ? 'https://rekrutteringsbistand-frontend.intern.nav.no'
      : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no';

  return useMemo((): LinkSections => {
    return generateLinks({
      environment: miljo,
      enhet: valgtNavKontor?.navKontor,
      fnr: valgtFnr,
      urlFormat: 'NAV_NO',
      aktoerId: '',
      proxy: proxyUrl,
    });
  }, [miljo, valgtFnr, valgtNavKontor?.navKontor, proxyUrl]);
};
