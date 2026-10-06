'use client';

import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Dialog,
  Link,
  List,
} from '@navikt/ds-react';
import { FC, ReactNode, useState } from 'react';

export type OpprettInfoType = 'rekrutteringstreff' | 'stillingsoppdrag';

const fellestekst = (
  <BodyLong>
    Rekrutteringsbistand er ikke et kontorsperret saksbehandlingssystem. Vær
    derfor svært restriktiv med å beskrive Navs målgrupper eller brukergrupper,
    da dette kan avsløre brukerens forhold til Nav når det opprettes en
    kandidatliste til stillingen. Fokuser heller på krav og ønsker til
    stillingen og arbeidsgivers muligheter for tilrettelegging.
  </BodyLong>
);

const innhold: Record<OpprettInfoType, { tekst: ReactNode }> = {
  rekrutteringstreff: {
    tekst: (
      <>
        <BodyLong>
          Det er krav om at innholdet handler om rekruttering, med én eller
          flere arbeidsgivere som har til hensikt å ansette. Det kan ikke brukes
          til arbeidstrening eller kvalifisering. Et strengt unntak gjelder
          dersom hoveddelen er rekruttering; da kan en mindre del handle om
          arbeidstrening og/eller kvalifisering.
        </BodyLong>
        {fellestekst}
        <BodyLong>
          Det må være minst tre jobbsøkere som oppgir at de planlegger å delta,
          som betyr at det helst bør inviteres flere enn tre for å ha litt
          margin.
        </BodyLong>
        <BodyShort>
          <b>PS: Dette er ikke dekkende for øvrige føringer</b>
        </BodyShort>
        <div>
          <BodyLong>
            For å sette deg inn i relevante forhold rundt disse kravene og
            øvrige føringer kan du lese:
          </BodyLong>
          <Link
            href={
              'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Veiledning%20for%20planlegging%20og%20gjennomf%C3%B8ring%20av%20rekrutteringstreff.aspx?csf=1&web=1&e=G682By&CID=4569423a-d9c1-4886-b247-88024a41449b'
            }
          >
            Føringer for Rekrutteringstreff
          </Link>
        </div>
      </>
    ),
  },
  stillingsoppdrag: {
    tekst: (
      <>
        <BodyLong>
          Det er kun anledning til å registrere stillingsoppdrag for reelle
          stillinger i Rekrutteringsbistand. Det betyr at arbeidsgiver har til
          hensikt å inngå et ansettelsesforhold.
        </BodyLong>
        {fellestekst}
        <BodyShort>
          <b>PS: Dette er ikke dekkende for øvrige retningslinjer</b>
        </BodyShort>
        <div>
          <BodyLong>Du kan lese mer om det her:</BodyLong>
          <Link
            href={
              'https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Slik-skriver-du-gode-stillingsannonser-for-direktemeldte-stillinger.aspx?csf=1&web=1&e=cEng7K&CID=e5282b52-7e73-424d-9d79-3096a2c6e9bb'
            }
          >
            Slik skriver du gode stillingsannonser for direktemeldt
            stillingsoppdrag
          </Link>
        </div>
      </>
    ),
  },
};

interface Props {
  type: OpprettInfoType;
  åpen: boolean;
  onBekreft: () => Promise<void>;
  onLukk: () => void;
}

const OpprettInfoDialog: FC<Props> = ({ type, åpen, onBekreft, onLukk }) => {
  const [laster, setLaster] = useState(false);
  const { tekst } = innhold[type];

  const bekreft = async () => {
    setLaster(true);
    try {
      await onBekreft();
      onLukk();
    } finally {
      setLaster(false);
    }
  };

  return (
    <Dialog
      open={åpen}
      onOpenChange={(nesteÅpen) => {
        if (!nesteÅpen && !laster) onLukk();
      }}
    >
      <Dialog.Popup>
        <Dialog.Header withClosebutton={!laster}>
          <Dialog.Title className={'flex items-center gap-2'}>
            <ExclamationmarkTriangleIcon />
            Husk spesielt:
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Box className={'flex flex-col gap-5 px-6'}>
            <List as={'ul'}>
              <List.Item>Registrer kun reelle rekrutteringsbehov</List.Item>
              <List.Item>Unngå å omtale Navs målgrupper</List.Item>
            </List>
            {tekst}
          </Box>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button type='button' variant='secondary' disabled={laster}>
              Avbryt
            </Button>
          </Dialog.CloseTrigger>
          <Button type='button' loading={laster} onClick={() => void bekreft()}>
            Bekrefter
          </Button>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

export default OpprettInfoDialog;
