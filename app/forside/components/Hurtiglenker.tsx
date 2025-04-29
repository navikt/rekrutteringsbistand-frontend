// 'use client';

// import StillingsIkonDark from '../../../public/ikoner/finn-stillinger-dark.svg';
// import StillingsIkon from '../../../public/ikoner/finn-stillinger.svg';
// import OpprettNyStillingIkonDark from '../../../public/ikoner/neutral-dark.svg';
// import OpprettNyStillingIkon from '../../../public/ikoner/neutral.svg';
// import { UmamiEvent } from '../../../util/umamiEvents';
// import SVGDarkmode from '../../components/SVGDarkmode';
// import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
// import { Roller } from '../../components/tilgangskontroll/roller';
// import { useUmami } from '../../providers/UmamiContext';
// import { Box, Link } from '@navikt/ds-react';
// import { FunctionComponent, ReactNode } from 'react';

// const Hurtiglenker: FunctionComponent = () => {
//   const { trackAndNavigate } = useUmami();

//   return (
//     <TilgangskontrollForInnhold
//       skjulVarsel
//       kreverEnAvRollene={[
//         Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
//       ]}
//     >
//       <div
//         className='flex flex-col md:flex-row w-full items-start justify-start gap-4'
//         data-testid='forside-hurtiglenker'
//       >
//         <Link
//           className='w-full md:flex-1 text-inherit'
//           onClick={() =>
//             trackAndNavigate(
//               UmamiEvent.Forside.se_mine_stillinger_knapp,
//               '/stilling?portefolje=visMine',
//             )
//           }
//         >
//           <LenkepanelMedIkon
//             ikon={
//               <SVGDarkmode
//                 light={StillingsIkon}
//                 dark={StillingsIkonDark}
//                 alt='Se mine stillinger'
//               />
//             }
//             tittel='Se mine stillinger'
//           />
//         </Link>
//         <Link
//           className='w-full md:flex-1 text-inherit'
//           onClick={() =>
//             trackAndNavigate(
//               UmamiEvent.Forside.opprett_ny_stilling_knapp,
//               '/stilling/ny-stilling',
//             )
//           }
//         >
//           <LenkepanelMedIkon
//             ikon={
//               <SVGDarkmode
//                 light={OpprettNyStillingIkon}
//                 dark={OpprettNyStillingIkonDark}
//                 alt='Opprett ny stilling'
//               />
//             }
//             tittel='Opprett ny stilling'
//           />
//         </Link>
//       </div>w
//     </TilgangskontrollForInnhold>
//   );
// };

// const LenkepanelMedIkon: FunctionComponent<{
//   tittel: string;
//   ikon: ReactNode;
// }> = ({ tittel, ikon }) => {
//   return (
//     <Box.New
//       background={'neutral-softA'}
//       borderColor='neutral-subtleA'
//       borderRadius='xlarge'
//       padding='0'
//       className={`flex h-20 flex-grow cursor-pointer`}
//     >
//       <Box.New className='flex h-20 grow items-center justify-start'>
//         <Box padding='6' className='flex items-center justify-center gap-2'>
//           <div className='h-16 w-16'>{ikon}</div>
//         </Box>
//         <Box padding='6' className='flex h-28 grow items-center justify-start'>
//           <div className='leading-loose font-bold text-[var(--ax-text-default)] underline'>
//             {tittel}
//           </div>
//         </Box>
//       </Box.New>
//     </Box.New>
//   );
// };

// export default Hurtiglenker;
