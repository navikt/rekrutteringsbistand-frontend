// Denne ligger her, men vi gikk bort ifra å velge kontor i sidebar til modia dekoratør august 2025
// import { useSidebar } from '../../../../components/ui/sidebar';
// import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
// import { Buildings3Icon, ChevronDownIcon } from '@navikt/aksel-icons';
// import { ActionMenu, Button } from '@navikt/ds-react';
// import * as React from 'react';

// const VelgKontor: React.FC = () => {
//   const { valgtNavKontor, setValgtNavKontor, brukerData } =
//     useApplikasjonContext();

//   const { open } = useSidebar();
//   return (
//     <ActionMenu>
//       <ActionMenu.Trigger>
//         <Button
//           variant='tertiary-neutral'
//           iconPosition='left'
//           icon={<Buildings3Icon title='Nav kontor' />}
//           className={open ? 'w-full text-left justify-start' : ''}
//         >
//           {open && (
//             <div className='flex items-center gap-2 '>
//               {valgtNavKontor?.navKontorNavn} <ChevronDownIcon />
//             </div>
//           )}
//         </Button>
//       </ActionMenu.Trigger>
//       <ActionMenu.Content>
//         <ActionMenu.Group label={`Velg Nav kontor`}>
//           {brukerData.enheter.map((enhet) => (
//             <ActionMenu.Item
//               key={enhet.enhetId}
//               onSelect={() =>
//                 setValgtNavKontor({
//                   navKontor: enhet.enhetId,
//                   navKontorNavn: enhet.navn,
//                 })
//               }
//             >
//               {enhet.navn}
//             </ActionMenu.Item>
//           ))}
//         </ActionMenu.Group>
//       </ActionMenu.Content>
//     </ActionMenu>
//   );
// };

// export default VelgKontor;
