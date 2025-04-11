import { KandidatForespurtOmDelingSchema } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { utfallsendringerSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import { Sms } from '../../../../../api/kandidatvarsel/kandidatvarsel';
import KandidatHendelseKort from '../KandidatHendelseKort';

export interface KandidatHendelseInformasjon {
  tittel: string;
  tekst: string;
  dato?: Date;
  fargeKode: string;
  ikon: React.ReactNode;
  cvDatoer?: {
    deltTidspunkt?: Date;
    svarfrist?: Date;
    svarTidspunkt?: Date;
  };
  raw?: utfallsendringerSchemaDTO | KandidatForespurtOmDelingSchema | Sms;
}

export interface KandidatHendelser {
  opprettet: KandidatHendelseInformasjon;
  sisteAktivitet: KandidatHendelseInformasjon;
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
    kandidatHendelser.opprettet,
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
          <KandidatHendelseKort
            key={`${hendelse.tittel}-${index}`}
            {...hendelse}
          />
        );
      })}
    </div>
  );
};

export default KandidatHendelser;
