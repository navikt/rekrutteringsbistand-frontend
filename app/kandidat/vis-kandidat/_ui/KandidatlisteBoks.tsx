// import LeggKandidatTilKandidatliste from './LeggKandidatTilKandidatliste';
// import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
// import NavigerTilAktivitetsplanenKnapp from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
// import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
// import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
// import KandidatVisningSidebar from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatVisningSidebar/KandidatVisningSidebar';
// import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
// import SWRLaster from '@/components/SWRLaster';
// import { Box } from '@navikt/ds-react';
// import { FC, ReactNode } from 'react';

// export interface KandidatlisteBoksProps {
//   kandidatnr: string;
// }

// const KandidatlisteBoks: FC<KandidatlisteBoksProps> = ({ kandidatnr }) => {
//   const { stillingsData, erEier, kandidatlisteInfo, kandidatlisteLaster } =
//     useStillingsContext();

//   const kandidatlisteEierHook = useKandidatlisteForEier(stillingsData, erEier);

//   // Felles styling for boks-komponenter
//   const BoksWrapper: FC<{
//     children: ReactNode;
//   }> = ({ children }) => (
//     <Box.New
//       borderColor='neutral-subtleA'
//       background='neutral-soft'
//       borderWidth='1'
//       padding='4'
//       borderRadius='xlarge'
//       className='mb-2'
//     >
//       {children}
//     </Box.New>
//   );

//   if (
//     stillingsData.stillingsinfo?.stillingskategori ===
//     Stillingskategori.Jobbmesse
//   ) {
//     return (
//       <div className='my-5'>
//         <NavigerTilAktivitetsplanenKnapp />
//       </div>
//     );
//   }

//   if (kandidatlisteLaster) {
//     return null; // eller en loader
//   }

//   return (
//     <SWRLaster
//       hooks={[kandidatlisteEierHook]}
//       skjulFeilmelding
//       allowPartialData={true}
//     >
//       {(kandidatlisteEier) => {
//         if (
//           kandidatlisteEier &&
//           kandidatlisteEier.kandidater.some(
//             (kandidat) => kandidat.kandidatnr === kandidatnr,
//           )
//         ) {
//           return (
//             <div className='mb-4'>
//               <KandidatlisteWrapper>
//                 <div className='my-5'>
//                   <NavigerTilAktivitetsplanenKnapp />
//                 </div>
//                 <BoksWrapper>
//                   <KandidatVisningSidebar kandidatnr={kandidatnr} />
//                 </BoksWrapper>
//               </KandidatlisteWrapper>
//             </div>
//           );
//         }

//         if (kandidatlisteInfo) {
//           return (
//             <BoksWrapper>
//               <div className='flex justify-between'>
//                 <div>
//                   <div className='mb-2'>{stillingsData.stilling.title}</div>
//                   <LeggKandidatTilKandidatliste
//                     kandidatId={kandidatnr}
//                     stillingId={stillingsData.stilling.uuid}
//                   />
//                 </div>
//               </div>
//             </BoksWrapper>
//           );
//         }

//         return null;
//       }}
//     </SWRLaster>
//   );
// };

// export default KandidatlisteBoks;
