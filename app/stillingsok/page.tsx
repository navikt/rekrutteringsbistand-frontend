"use client";
import { PlusCircleIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import Link from "next/link";
import * as React from "react";
import SideLayout from "../../components/layout/SideLayout";
import { TilgangskontrollForInnhold } from "../../components/tilgangskontroll/TilgangskontrollForInnhold";
import { Rolle } from "../../types/Roller";
import Piktogram from "./icons/finn-stillinger.svg";

const Page: React.FC = () => {
  return (
    <SideLayout
      tittel="Stillinger"
      ikon={<Piktogram />}
      knappIBanner={
        <TilgangskontrollForInnhold
          skjulVarsel
          kreverEnAvRollene={[
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
          ]}
        >
          <Link href={"/stilling/ny-stilling"}>
            <Button variant="secondary" icon={<PlusCircleIcon aria-hidden />}>
              Opprett ny
            </Button>
          </Link>
        </TilgangskontrollForInnhold>
      }
      // banner={kandidatnr !== undefined && <KontekstAvKandidat kandidatnr={kandidatnr} />}
      // sidepanel={<Filter finnerStillingForKandidat={finnerStillingForKandidat} />}
    >
      Stilling{" "}
    </SideLayout>
  );
};

export default Page;
