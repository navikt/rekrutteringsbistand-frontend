// import { kandidaterSchemaDTO } from '../../../api/kandidat/schema.zod';
// import { useKandidatlisteContext } from './KandidatlisteContext';
// import { mapToHendelser } from './components/KandidatHendelse';
// import KandidatHendelseTag from './components/KandidatHendelseTag';
// import KandidatVisningSidebar from './components/KandidatVisningSidebar/KandidatVisningSidebar';
// import SletteKandidatKnapp from './components/SlettKandidatModal';
// import VelgInternStatus from './components/VelgInternStatus';
// import { BodyShort, Box, Checkbox } from '@navikt/ds-react';
// import { format } from 'date-fns';
// import { nb } from 'date-fns/locale/nb';
// import * as React from 'react';

// export interface StillingKandidatKortProps {
//   kandidat: kandidaterSchemaDTO;
//   columnLayout: string;
//   kandidatlisteId: string;
//   lukketKandidatliste: boolean;
// }

// const StillingKandidatKort: React.FC<StillingKandidatKortProps> = ({
//   kandidat,
//   columnLayout,
//   kandidatlisteId,
//   lukketKandidatliste,
// }) => {
//   const {
//     markerteKandidater,
//     toggleMarkerKandidat,
//     forespurteKandidater,
//     beskjeder,
//   } = useKandidatlisteContext();

//   const cellClasses = 'break-words';
//   const iconCellClasses = `${cellClasses} flex items-center justify-center`;
//   const innaktiv = !kandidat.fodselsnr;
//   const slettet = kandidat.arkivert;

//   if (slettet) {
//     return null;
//   }

//   const forespørselCvForKandidat =
//     kandidat.aktørid && forespurteKandidater
//       ? forespurteKandidater[kandidat.aktørid]
//       : null;

//   const beskjedForKandidat = beskjeder && beskjeder[kandidat.fodselsnr ?? ''];

//   const kandidatHendelser = mapToHendelser({
//     kandidat,
//     forespørselCvForKandidat,
//     beskjedForKandidat,
//   });

//   // Vis denne i siste hendelse.
//   // const sisteHendelse = kandidat.utfall;
//   const sisteAktivitet = kandidatHendelser.filter((h) => h.kilde !== 'Sms')[0];
//   const sisteSms = kandidatHendelser.filter((h) => h.kilde === 'Sms')[0];

//   return (
//     <Box.New
//       padding='4'
//       background='neutral-softA'
//       borderRadius='xlarge'
//       data-testid='stillings-kort'
//     >
//       <div className={`grid ${columnLayout} gap-x-3 items-center `}>
//         <div className={cellClasses}>
//           <div className='flex gap-4'>
//             <Checkbox
//               disabled={innaktiv || lukketKandidatliste}
//               hideLabel
//               checked={markerteKandidater.includes(kandidat)}
//               onChange={() => toggleMarkerKandidat(kandidat)}
//               aria-labelledby={`id-${kandidat.fodselsnr}`}
//             >
//               {' '}
//             </Checkbox>
//             {innaktiv ? (
//               <div>
//                 <BodyShort>
//                   {kandidat.etternavn}, {kandidat.fornavn}
//                 </BodyShort>
//                 <BodyShort textColor='subtle'>Innaktiv</BodyShort>
//               </div>
//             ) : (
//               <div className='flex flex-col items-start'>
//                 <KandidatVisningSidebar kandidat={kandidat} />
//                 <BodyShort textColor='subtle'>
//                   f.nr. {kandidat.fodselsnr}
//                 </BodyShort>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className={cellClasses}>
//           <div>
//             <BodyShort> {kandidat.lagtTilAv.navn}</BodyShort>
//             <BodyShort textColor='subtle'>
//               {format(kandidat.lagtTilTidspunkt, 'dd. MMM yyyy', {
//                 locale: nb,
//               })}
//             </BodyShort>
//           </div>
//         </div>
//         <div className={cellClasses}>
//           <div className='w-[150px]'>
//             <KandidatHendelseTag kandidatHendelse={sisteAktivitet} />
//           </div>
//         </div>
//         <div className={cellClasses}>
//           <KandidatHendelseTag kandidatHendelse={sisteSms} />
//         </div>
//         <div className={cellClasses}>
//           <VelgInternStatus
//             lukketKandidatliste={lukketKandidatliste}
//             kandidatlisteId={kandidatlisteId}
//             kandidatnr={kandidat.kandidatnr}
//             status={kandidat.status}
//           />
//         </div>
//         <div className={iconCellClasses}>
//           <SletteKandidatKnapp
//             lukketKandidatliste={lukketKandidatliste}
//             kandidat={kandidat}
//             kandidatlisteId={kandidatlisteId}
//           />
//         </div>
//       </div>
//     </Box.New>
//   );
// };

// export default StillingKandidatKort;
