import { UNSAFE_Combobox } from "@navikt/ds-react";
import * as React from "react";
import { useHentOrgnr } from "../../../api/stilling/hent-orgnummer/hentOrgnr";

export interface IVelgArbeidsgiver {
  children?: React.ReactNode | undefined;
  setArbeidsgiver: (arbeidsgiver: string) => void;
}

const VelgArbeidsgiver: React.FC<IVelgArbeidsgiver> = ({ children }) => {
  const [muligeValg, setMuligeValg] = React.useState<string[]>([]);
  const [søkeOrd, setSøkeord] = React.useState<string>("");
  const { isLoading, error, data } = useHentOrgnr(søkeOrd);
  return (
    <React.Fragment>
      <form role="search">
        <UNSAFE_Combobox
          label="Arbeidsgivers navn eller virksomhetsnummer"
          options={muligeValg}
          shouldAutocomplete={true}
          isLoading={isLoading}
          onChange={(e) => setSøkeord(e?.target.value ?? "")}
          onSelect={(valg) => console.log(valg)}
        />
      </form>
    </React.Fragment>
  );
};

export default VelgArbeidsgiver;
