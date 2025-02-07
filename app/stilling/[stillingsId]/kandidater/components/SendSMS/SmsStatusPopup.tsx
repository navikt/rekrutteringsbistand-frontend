// import { MobileFillIcon, MobileIcon } from '@navikt/aksel-icons';
// import { FunctionComponent } from 'react';

// import {
//   BeskjedEksternStatus,
//   Sms,
//   useSendtKandidatmelding,
// } from '../../../../../api/kandidatvarsel/kandidatvarsel';
// import MedPopover from '../../../../../components/popover/MedPopover';

// const formaterSendtDato = (dato: Date) => {
//   return `${dato.toLocaleString('nb-NO', {
//     day: 'numeric',
//     month: 'numeric',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   })}`;
// };

// type Props = {
//   fnr: string | null;
//   stillingId: string | null;
//   stillingskategori: string | null;
// };

// const Popuptekst: FunctionComponent<{ sms: Sms }> = ({ sms }) => {
//   const minsideStatus = (sms: Sms) => {
//     switch (sms.minsideStatus) {
//       case 'IKKE_BESTILT':
//         return <></>;
//       case 'UNDER_UTSENDING':
//         return (
//           <>
//             {' '}
//             <br /> Min side: under utsending{' '}
//           </>
//         );
//       case 'OPPRETTET':
//         return (
//           <>
//             <br /> Min side: opprettet{' '}
//           </>
//         );
//       case 'SLETTET':
//         return (
//           <>
//             <br /> Min side: slettet
//           </>
//         );
//     }
//   };

//   const eksternStatus = (sms: Sms) => {
//     switch (sms.eksternStatus) {
//       case 'UNDER_UTSENDING':
//         return (
//           <>
//             <br /> Ekstern varsel: under utsending{' '}
//           </>
//         );
//       case 'VELLYKKET_SMS':
//         return (
//           <>
//             <br /> Ekstern varsel: SMS sendt
//           </>
//         );
//       case 'VELLYKKET_EPOST':
//         return (
//           <>
//             <br /> Ekstern varsel: epost sendt
//           </>
//         );
//       case 'FERDIGSTILT':
//         return (
//           <>
//             <br /> Ekstern varsel: varsling er ferdigstilt{' '}
//           </>
//         );
//       case 'FEIL':
//         return (
//           <>
//             <br /> Ekstern varsel feilet:{' '}
//             {sms.eksternFeilmelding ??
//               'En mulig årsak kan være ugyldig telefonnummer i Kontakt- og reservasjonsregisteret.'}{' '}
//           </>
//         );
//     }
//   };

//   return (
//     <>
//       Beskjed bestilt {formaterSendtDato(new Date(sms.opprettet))}
//       {minsideStatus(sms)}
//       {eksternStatus(sms)}
//     </>
//   );
// };

// const SmsStatusPopup: FunctionComponent<Props> = ({
//   fnr,
//   stillingId,
//   stillingskategori,
// }) => {
//   const sms = useSendtKandidatmelding(fnr, stillingId, stillingskategori);
//   return sms ? (
//     <MedPopover hjelpetekst={sms && <Popuptekst sms={sms} />} visOnHover>
//       <MobileFillIcon
//         color={
//           sms?.eksternStatus === BeskjedEksternStatus.FEIL
//             ? 'var(--a-surface-danger)'
//             : 'var(--a-surface-success)'
//         }
//         fontSize='1.5rem'
//       />
//     </MedPopover>
//   ) : (
//     <MobileIcon className='opacity-50' fontSize='1.5rem' />
//   );
//   //
// };

// export default SmsStatusPopup;
