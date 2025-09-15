import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';

export default function FormidlingKandidater() {
  return (
    <div className='w-full'>
      <KandidatlisteWrapper>
        <FiltrertKandidatListeVisning />
      </KandidatlisteWrapper>
    </div>
  );
}
