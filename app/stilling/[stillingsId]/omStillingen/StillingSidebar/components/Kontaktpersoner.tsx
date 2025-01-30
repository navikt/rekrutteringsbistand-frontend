// import { EnvelopeClosedIcon, PersonIcon, PhoneIcon } from '@navikt/aksel-icons';
// import { BodyShort, Heading, Link } from '@navikt/ds-react';
// import * as React from 'react';
// import { useStillingsContext } from '../../../StillingsContext';
// export interface KontaktpersonerProps {
//   children?: React.ReactNode | undefined;
// }

// const Kontaktpersoner: React.FC<KontaktpersonerProps> = ({ children }) => {
//   const { stillingsData, erEier, erFormidling } = useStillingsContext();
//   const kontaktInfo = stillingsData?.stilling?.contactList;

//   return (
//     <div className='border-blue-200 rounded mt-4 border p-5'>
//       <Heading size='xsmall' className='mb-4'>
//         {kontaktInfo?.length && kontaktInfo?.length > 1
//           ? 'Kontaktpersoner'
//           : 'Kontaktperson'}
//       </Heading>
//       {kontaktInfo?.map((kontakt, index) => (
//         <>
//           <dl key={index} className='mb-6 last:mb-0 '>
//             <div className='flex items-center gap-2 mb-4'>
//               <PersonIcon
//                 aria-hidden='true'
//                 width={24}
//                 height={24}
//                 className='flex-shrink-0'
//               />
//               <BodyShort>
//                 {kontakt.name}, {kontakt.title}
//               </BodyShort>
//             </div>
//             <div className='flex items-center gap-2 mb-2'>
//               <EnvelopeClosedIcon
//                 aria-hidden='true'
//                 width={24}
//                 height={24}
//                 className='flex-shrink-0'
//               />
//               <Link href={`mailto:${kontakt.email}`}>{kontakt.email}</Link>
//             </div>
//             <div className='flex items-center gap-2'>
//               <PhoneIcon
//                 aria-hidden='true'
//                 width={24}
//                 height={24}
//                 className='flex-shrink-0'
//               />
//               <BodyShort>{kontakt.phone}</BodyShort>
//             </div>
//           </dl>
//           {index < kontaktInfo.length - 1 && (
//             <hr className='border-t border-border-divider mb-4' />
//           )}
//         </>
//       ))}
//     </div>
//   );
// };

// export default Kontaktpersoner;
