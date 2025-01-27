import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useKandidatSøkFilter } from '../../../KandidaSokContext';
import { Innsatsgruppe, Servicegruppe } from '../../innsatsgrupper';

export enum FiltrerbarInnsatsgruppe {
  Innsatsgruppe,
  AndreInnsatsgrupper = 'ANDRE',
}

const filtrerbareInnsatsgrupper = {
  [Innsatsgruppe.SpesieltTilpassetInnsats]: {
    label: 'Spesielt tilpasset innsats',
    description: 'Har et identifisert behov for tilrettelegging',
  },
  [Innsatsgruppe.SituasjonsbestemtInnsats]: {
    label: 'Situasjonsbestemt innsats',
    description: 'Moderat bistandsbehov',
  },
  [Innsatsgruppe.VarigTilpasset]: {
    label: 'Varig tilpasset',
    description: 'Varig nedsatt arbeidsevne',
  },
  [Innsatsgruppe.Standardinnsats]: {
    label: 'Standardinnsats',
    description: 'Behov for ordinær bistand',
  },
  [FiltrerbarInnsatsgruppe.AndreInnsatsgrupper]: {
    label: 'Andre kvalifiseringsgrupper',
    description:
      'Ikke vurdert, helserelatert arbeidsrettet oppfølging, sykmeldt',
  },
};

export const alleInnsatsgrupper = {
  ...filtrerbareInnsatsgrupper,
  [Servicegruppe.IkkeVurdert]: {
    label: 'Ikke vurdert',
  },
  [Servicegruppe.BehovForArbeidsevnevurdering]: {
    label: 'Behov for arbeidsevnevurdering',
  },
  [Servicegruppe.HelserelatertArbeidsrettetOppfølgingINav]: {
    label: 'Helserelatert arbeidsrettet oppfølging i Nav',
  },
  [Servicegruppe.SykmeldtMedOppfølgingPåArbeidsplassen]: {
    label: 'Sykmeldt med oppfølging på arbeidsplassen',
  },
  [Servicegruppe.SykmeldtUtenArbeidsgiver]: {
    label: 'sykmeldt uten arbeidsgiver',
  },
};

const Innsatsgrupper = () => {
  const { innsatsgruppe, setInnsatsgruppe } = useKandidatSøkFilter();

  const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
    setInnsatsgruppe(valgteInnsatsgrupper);
  };

  return (
    <CheckboxGroup
      legend='Velg innsatsgrupper'
      onChange={onChange}
      value={Array.from(innsatsgruppe)}
    >
      {Object.entries(filtrerbareInnsatsgrupper).map(([kode, gruppe]) => (
        <Checkbox key={kode} value={kode} description={gruppe.description}>
          {gruppe.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default Innsatsgrupper;
