import KandidatBeskrivelse from './_ui/KandidatBeskrivelse';
import KandidatErfaring from './_ui/KandidatErfaring';
import KandidatFørerkort from './_ui/KandidatFørerkort';
import KandidatGodkjenninger from './_ui/KandidatGodkjenninger';
import KandidatKompetanse from './_ui/KandidatKompetanse';
import KandidatKurs from './_ui/KandidatKurs';
import KandidatOversiktDivider from './_ui/KandidatOversiktDivider';
import KandidatSpråk from './_ui/KandidatSpråk';
import KandidatUtdanning from './_ui/KandidatUtdanning';
import KandidatØnsker from './_ui/KandidatØnsker';
import KandidatOversiktSidebar from './_ui/sidebar/KandidatOversiktSidebar';
import { useKandidatContext } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';

export default function KandidatOversikt() {
  const { kandidatData } = useKandidatContext();

  return (
    <div className={`mt-10  mb-8`}>
      <div>
        <div className={`grid gap-x-[3.5rem]  md:flex-row flex-row`}>
          <KandidatØnsker />
          <KandidatOversiktDivider />
          <KandidatBeskrivelse kandidatSammendrag={kandidatData.beskrivelse} />
          <KandidatOversiktDivider />
          <KandidatUtdanning /> <KandidatOversiktDivider />
          <KandidatErfaring />
        </div>
        <div className={`mt-8 grid grid-cols-1 gap-4 `}>
          <KandidatSpråk språk={kandidatData?.sprak} />
          <KandidatGodkjenninger
            godkjenninger={kandidatData?.godkjenninger}
            sertifikatObj={kandidatData?.sertifikatObj}
          />
          <KandidatFørerkort førerkort={kandidatData?.forerkort} />
          <KandidatKompetanse kompetanse={kandidatData?.kompetanseObj} />
          <KandidatKurs kurs={kandidatData?.kursObj} />
        </div>
      </div>

      <KandidatOversiktSidebar />
    </div>
  );
}
