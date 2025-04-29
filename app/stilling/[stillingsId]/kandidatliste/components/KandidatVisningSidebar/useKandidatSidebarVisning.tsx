// import { useForespurteOmDelingAvCv } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
// import { useKandidatliste } from '../../../../../api/kandidat/useKandidatliste';
// import { useSmserForStilling } from '../../../../../api/kandidatvarsel/kandidatvarsel';
// import { useStillingsContext } from '../../../StillingsContext';
// import KandidatlisteWrapper from '../../KandidatlisteWrapper';
// import KandidatVisningSidebar from './KandidatVisningSidebar';
// import { useQueryState } from 'nuqs';

// export const useKandidatSidebarVisning = () => {
//   const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidat', {
//     defaultValue: '',
//     clearOnDefault: true,
//   });

//   const { stillingsData } = useStillingsContext();

//   const forespurteKandidaterHook = useForespurteOmDelingAvCv(
//     stillingsData.stilling.uuid,
//   );
//   const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);
//   const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);

//   venstreSidebar.setSidekomponent(
//     visKandidatnr ? (
//       <KandidatlisteWrapper>
//         <KandidatVisningSidebar kandidatnr={visKandidatnr} />
//       </KandidatlisteWrapper>
//     ) : undefined,
//   );
// };
