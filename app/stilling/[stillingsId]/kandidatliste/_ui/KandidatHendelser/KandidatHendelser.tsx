import { KandidatHendelseType } from './KandidatHendelseTag';
import {
  ForespørselOmDelingAvCvDTO,
  usynligKandidaterSchemaDTO,
  utfallsendringerSchemaDTO,
  VarselDTO,
} from '@/app/api/kandidat/schema.zod';
import KandidatHendelseTagVisning from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelseTagVisning';
import { JSX } from 'react';

export interface KandidatHendelseInformasjon {
  tag?: JSX.Element;
  tekst?: string;
  dato: Date | null;
  type: KandidatHendelseType | null;
  raw:
    | utfallsendringerSchemaDTO
    | ForespørselOmDelingAvCvDTO
    | VarselDTO
    | usynligKandidaterSchemaDTO;
}

export interface KandidatHendelser {
  // opprettet: KandidatHendelseInformasjon;
  sisteHendelse: KandidatHendelseInformasjon;
  sisteSms?: KandidatHendelseInformasjon | null;
  cvHendelser?: KandidatHendelseInformasjon[];
  utfallsendringer?: KandidatHendelseInformasjon[];
  varsler?: KandidatHendelseInformasjon[];
}

const KandidatHendelser = ({
  kandidatHendelser,
}: {
  kandidatHendelser: KandidatHendelser;
}) => {
  // Flatten kandidatHendelser
  const flatKandidatHendelser = [
    // kandidatHendelser.opprettet,
    ...(kandidatHendelser.cvHendelser ?? []),
    ...(kandidatHendelser.utfallsendringer ?? []),
    ...(kandidatHendelser.varsler ?? []),
  ].filter((hendelse) => hendelse !== undefined);
  const sortedKandidatHendelser = flatKandidatHendelser.sort(
    (h1, h2) => (h2.dato?.getTime() || 0) - (h1.dato?.getTime() || 0),
  );

  return (
    <div className='flex flex-col gap-4'>
      {sortedKandidatHendelser.map((hendelse, index) => {
        return (
          <KandidatHendelseTagVisning kandidatHendelse={hendelse} key={index} />
        );
      })}
    </div>
  );
};

export default KandidatHendelser;
