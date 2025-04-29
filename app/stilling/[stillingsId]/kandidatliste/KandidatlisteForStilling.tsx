// import { useForespurteOmDelingAvCv } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
// import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
// import { useSmserForStilling } from '../../../api/kandidatvarsel/kandidatvarsel';
// import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
// import SWRLaster from '../../../components/SWRLaster';
// import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
// import { useStillingsContext } from '../StillingsContext';
// import FiltrertKandidatListeVisning from './FiltrertKandidatListeVisning';
// import { KandidatlisteContextProvider } from './KandidatlisteContext';
// import { KandidatlisteFilterContextProvider } from './components/KandidatlisteFilter/KandidatlisteFilterContext';
// import { Button } from '@navikt/ds-react';
// import * as React from 'react';

// const KandidatlisteForStilling: React.FC = () => {
//   const { brukerData } = useApplikasjonContext();
//   const { stillingsData } = useStillingsContext();

//   const forespurteKandidaterHook = useForespurteOmDelingAvCv(
//     stillingsData.stilling.uuid,
//   );
//   const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);
//   const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);

//   const onOvertaStilling = async () => {
//     await oppdaterStilling({
//       ...stillingsData,
//       stillingsinfo: {
//         ...stillingsData.stillingsinfo,
//         eierNavident: brukerData.ident,
//         eierNavn: brukerData.navn,
//       },
//       stilling: {
//         ...stillingsData.stilling,
//         administration: {
//           ...stillingsData.stilling.administration,
//           navIdent: brukerData.ident,
//           reportee: brukerData.navn,
//         },
//       },
//     });
//     window.location.reload();
//   };

//   const reFetchKandidatliste = () => {
//     kandidatlisteHook.mutate();
//     forespurteKandidaterHook.mutate();
//     beskjederHook.mutate();
//   };

//   return (
//     <SWRLaster
//       hooks={[kandidatlisteHook, forespurteKandidaterHook, beskjederHook]}
//       egenFeilmelding={() => (
//         <div>
//           Feil ved henting av kandidater
//           <br />
//           Du får ikke vise kandidater hvis du ikke er eier, du kan prøve å ta
//           eierskap på nytt
//           <Button
//             onClick={onOvertaStilling}
//             variant='secondary'
//             size='small'
//             className='my-2 h-5 w-full'
//           >
//             Ta eierskap
//           </Button>
//         </div>
//       )}
//     >
//       {(kandidatliste, forespurteKandidater, beskjeder) => {
//         return (
//           <KandidatlisteFilterContextProvider>
//             <KandidatlisteContextProvider
//               kandidatliste={kandidatliste}
//               forespurteKandidater={forespurteKandidater}
//               beskjeder={beskjeder}
//               reFetchKandidatliste={reFetchKandidatliste}
//             >

//             </KandidatlisteContextProvider>
//           </KandidatlisteFilterContextProvider>
//         );
//       }}
//     </SWRLaster>
//   );
// };

// export default KandidatlisteForStilling;
