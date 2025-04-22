// import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
// import {
//   kandidaterSchemaDTO,
//   utfallsendringerSchemaDTO,
// } from '../../../../api/kandidat/schema.zod';
// import { Sms } from '../../../../api/kandidatvarsel/kandidatvarsel';
// import { storForbokstavString } from '../../../../kandidat/util';
// import { KandidatutfallTyper } from '../KandidatTyper';
// import KandidatHendelseKort from './KandidatHendelseKort';
// import {
//   CheckmarkCircleIcon,
//   ClipboardIcon,
//   ExclamationmarkTriangleIcon,
//   SparklesIcon,
// } from '@navikt/aksel-icons';
// import { format } from 'date-fns';
// import { nb } from 'date-fns/locale';
// import React from 'react';

// export interface KandidatHendelse {
//   tittel: string;
//   tekst: string;
//   dato: Date;
//   frist?: Date | null;
//   type: 'success' | 'error' | 'info' | 'alt1';
//   ikon: React.ReactNode;
//   raw?: utfallsendringerSchemaDTO | KandidatForespurtOmDelingSchema | Sms;
// }

// export const utfallsEndringPresentasjon = (
//   utfallType: KandidatutfallTyper,
// ): {
//   tittel: string;
//   ikon: React.ReactNode;
//   type: 'success' | 'error' | 'info' | 'alt1';
// } => {
//   switch (utfallType) {
//     case KandidatutfallTyper.FATT_JOBBEN:
//       return {
//         tittel: 'Fått jobben',
//         ikon: <CheckmarkCircleIcon className='text-success' />,
//         type: 'success',
//       };

//     case KandidatutfallTyper.PRESENTERT:
//       return {
//         tittel: 'Presentert',
//         ikon: <CheckmarkCircleIcon className='text-success' />,
//         type: 'success',
//       };
//     case KandidatutfallTyper.IKKE_PRESENTERT:
//       return {
//         tittel: 'Ikke presentert',
//         ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
//         type: 'error',
//       };
//     default:
//       return {
//         tittel: 'Ukjent utfall',
//         ikon: null,
//         type: 'error',
//       };
//   }
// };

// export const mapToHendelser = ({
//   kandidat,
//   forespørselCvForKandidat,
//   beskjedForKandidat,
// }: {
//   kandidat: kandidaterSchemaDTO;
//   forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
//   beskjedForKandidat: Sms | null;
// }): KandidatHendelse[] => {
//   const hendelser: KandidatHendelse[] = [];

//   if (kandidat.lagtTilAv?.navn && kandidat.lagtTilTidspunkt) {
//     hendelser.push({
//       tittel: 'Lagt til i listen',
//       tekst: `av ${kandidat.lagtTilAv.navn}`,
//       dato: new Date(kandidat.lagtTilTidspunkt),
//       type: 'info',
//       ikon: <SparklesIcon className='text-info' />,
//     });
//   }

//   if (kandidat.utfallsendringer) {
//     kandidat.utfallsendringer.forEach((endring) => {
//       if (endring.tidspunkt && endring.utfall) {
//         const presentasjon = utfallsEndringPresentasjon(
//           endring.utfall as KandidatutfallTyper,
//         );

//         hendelser.push({
//           tittel: presentasjon.tittel,
//           tekst: endring.registrertAvIdent
//             ? `av ${endring.registrertAvIdent || 'ukjent'}`
//             : '',
//           type: presentasjon.type,
//           ikon: presentasjon.ikon,
//           dato: new Date(endring.tidspunkt),
//           kilde: 'Utfallsendring',
//           raw: endring,
//         });
//       }
//     });
//   }

//   if (forespørselCvForKandidat) {
//     forespørselCvForKandidat.forEach((forespørsel) => {
//       const type = forespørsel.svar
//         ? forespørsel.svar.harSvartJa
//           ? 'success'
//           : 'error'
//         : 'info';

//       const tekst = forespørsel.svar
//         ? forespørsel.svar.harSvartJa
//           ? `Svart ja  ${forespørsel.svar.svartAv?.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
//           : `Svart nei ${forespørsel.svar.svartAv?.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
//         : `Svarfrist ${format(new Date(forespørsel.svarfrist), 'dd. MMMM yyyy', { locale: nb })}`;

//       hendelser.push({
//         kilde: 'ForespørselOmDelingAvCv',
//         tittel: 'Deling av CV',
//         tekst: tekst,
//         dato: new Date(forespørsel.deltTidspunkt),
//         type,
//         ikon:
//           type === 'error' ? (
//             <ExclamationmarkTriangleIcon className='text-danger' />
//           ) : (
//             <ClipboardIcon className='text-info' />
//           ),
//         raw: forespørsel,
//       });
//     });
//   }

//   if (beskjedForKandidat?.opprettet) {
//     const type = beskjedForKandidat.eksternStatus?.includes('FEIL')
//       ? 'error'
//       : 'success';

//     hendelser.push({
//       kilde: 'Sms',
//       tittel: beskjedForKandidat.eksternStatus?.includes('FEIL')
//         ? 'Varsling på SMS feilet'
//         : 'Sendt varsel på SMS',
//       tekst: storForbokstavString(
//         (beskjedForKandidat.eksternFeilmelding || '').replace(/[_-]/g, ' '),
//       ),
//       dato: new Date(beskjedForKandidat.opprettet),
//       type,
//       ikon:
//         type === 'error' ? (
//           <ExclamationmarkTriangleIcon className='text-danger' />
//         ) : (
//           <CheckmarkCircleIcon className='text-success' />
//         ),
//       raw: beskjedForKandidat,
//     });
//   }

//   return hendelser;
// };

// const KandidatHendelser = ({
//   kandidatHendelser,
// }: {
//   kandidatHendelser: KandidatHendelse[];
// }) => {
//   return (
//     <div className='flex flex-col gap-4'>
//       {kandidatHendelser
//         .sort((h1, h2) => h2.dato.getTime() - h1.dato.getTime())
//         .map((hendelse, index) => {
//           return (
//             <KandidatHendelseKort
//               key={`${hendelse.tittel}-${index}`}
//               {...hendelse}
//             />
//           );
//         })}
//     </div>
//   );
// };

// export default KandidatHendelser;
