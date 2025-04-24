// import { useForespurteOmDelingAvCv } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
// import { kandidaterSchemaDTO } from '../../../api/kandidat/schema.zod';
// import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
// import { useSmserForStilling } from '../../../api/kandidatvarsel/kandidatvarsel';
// import { oppdaterStilling } from '../../../api/stilling/oppdater-stilling/oppdaterStilling';
// import SWRLaster from '../../../components/SWRLaster';
// import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
// import { Stillingskategori } from '../../stilling-typer';
// import { useStillingsContext } from '../StillingsContext';
// import KandidatlisteFilterrad from './KandidatlisteFilterrad';
// import StillingKandidatKort from './StillingKandidatKort';
// import { useStillingsKandidaterFilter } from './StillingsKandidaterFilterContext';
// import DelMedArbeidsgiver from './components/DelMedArbeidsgiver/DelMedArbeidsgiver';
// import DelMedKandidatModal from './components/DelMedKandidat/DelMedKandidatModal';
// import OrganisasjonsnummerAlert from './components/OrganisasjonsnummerAlert';
// import SendSmsModal from './components/SendSMS/SendSmsModal';
// import { Button } from '@navikt/ds-react';
// import * as React from 'react';

// const StillingsKandidater: React.FC = () => {
//   const { brukerData } = useApplikasjonContext();
//   const { stillingsData, kandidatlisteInfo } = useStillingsContext();
//   const { status, setStatus, hendelse, setHendelse } =
//     useStillingsKandidaterFilter();
//   const [markerteKandidater, setMarkerteKandidater] = React.useState<
//     kandidaterSchemaDTO[]
//   >([]);

//   const kandidatlisteHook = useKandidatliste(stillingsData.stilling.uuid);
//   const forespurteKandidaterHook = useForespurteOmDelingAvCv(
//     stillingsData.stilling.uuid,
//   );
//   const beskjederHook = useSmserForStilling(stillingsData.stilling.uuid);

//   const lukketKandidatliste =
//     kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET';

//   const reFetchKandidatliste = () => kandidatlisteHook.mutate();

//   const erJobbmesse =
//     stillingsData?.stillingsinfo?.stillingskategori ===
//     Stillingskategori.Jobbmesse;

//   const FIXED_COLUMN_LAYOUT =
//     'grid-cols-1 md:grid-cols-[20rem_repeat(4,minmax(6rem,1fr))_5rem]';

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

//   const organisasjonsnummerFraKandidatliste =
//     kandidatlisteHook?.data?.organisasjonReferanse;
//   const organisasjonsnummerFraStilling =
//     stillingsData?.stilling?.employer?.orgnr;

//   const orgnummerDivergererMellomStillingOgKandidatliste: boolean = Boolean(
//     organisasjonsnummerFraKandidatliste &&
//       organisasjonsnummerFraStilling &&
//       organisasjonsnummerFraKandidatliste !== organisasjonsnummerFraStilling,
//   );

//   // const sidePanel = (
//   //   <>
//   //     <CheckboxGroup
//   //       legend='Intern status'
//   //       onChange={setStatus}
//   //       defaultValue={status}
//   //       className='mb-8'
//   //     >
//   //       {Object.entries(InternKandidatstatus).map(([key, value]) => (
//   //         <Checkbox key={key} value={key}>
//   //           {storForbokstavString(value ?? '').replace(/_/g, ' ')}
//   //         </Checkbox>
//   //       ))}
//   //     </CheckboxGroup>
//   //     <div className='flex flex-col gap-8'>
//   //       <CheckboxGroup
//   //         legend='Aktiviteter'
//   //         onChange={setHendelse}
//   //         defaultValue={hendelse}
//   //       >
//   //         {Object.entries(aktivitetTilTekst).map(([key, value]) => (
//   //           <Checkbox key={key} value={key}>
//   //             {value}
//   //           </Checkbox>
//   //         ))}
//   //       </CheckboxGroup>
//   //       <CheckboxGroup
//   //         legend='Varsel'
//   //         onChange={setHendelse}
//   //         defaultValue={hendelse}
//   //       >
//   //         {Object.entries(varselTilTekst).map(([key, value]) => (
//   //           <Checkbox key={key} value={key}>
//   //             {value}
//   //           </Checkbox>
//   //         ))}
//   //       </CheckboxGroup>
//   //     </div>
//   //   </>
//   // );

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
//         const forespurteKandidaterAktørListe =
//           Object.keys(forespurteKandidater);

//         return (
//           <div className='my-2'>
//             {orgnummerDivergererMellomStillingOgKandidatliste && (
//               <OrganisasjonsnummerAlert />
//             )}

//             <KandidatlisteFilterrad />
//             {!lukketKandidatliste && (
//               <div>
//                 <SendSmsModal
//                   markerteKandidater={markerteKandidater}
//                   stillingId={stillingsData.stilling.uuid}
//                   stillingskategori={
//                     stillingsData.stillingsinfo?.stillingskategori ?? null
//                   }
//                   fjernAllMarkering={() => setMarkerteKandidater([])}
//                 />

//                 {!erJobbmesse && (
//                   <>
//                     <DelMedKandidatModal
//                       stillingsId={stillingsData.stilling.uuid}
//                       forespurteKandidaterAktørListe={
//                         forespurteKandidaterAktørListe
//                       }
//                       kandidatliste={kandidatliste}
//                       markerteKandidater={markerteKandidater}
//                       fjernAllMarkering={() => setMarkerteKandidater([])}
//                     />
//                     <DelMedArbeidsgiver
//                       eposter={
//                         stillingsData.stilling.contactList
//                           ?.map((kontakt) => kontakt.email)
//                           .filter((email): email is string => email !== null) ||
//                         []
//                       }
//                       stillingsId={stillingsData.stilling.uuid}
//                       stillingTittel={stillingsData.stilling.title}
//                       markerteKandidater={markerteKandidater}
//                       kandidatliste={kandidatliste}
//                       reFetchKandidatliste={reFetchKandidatliste}
//                     />
//                   </>
//                 )}
//               </div>
//             )}
//             <div className='grid grid-cols-1 gap-4'>
//               <div className={`grid ${FIXED_COLUMN_LAYOUT} gap-x-3 px-4`}>
//                 <div className='text-left font-medium'>Navn</div>
//                 <div className='text-left font-medium'>Lagt til av</div>
//                 <div className='text-left font-medium'>Siste hendelser</div>
//                 <div className='text-left font-medium'>Siste varsler</div>
//                 <div className='text-left font-medium'>Intern status</div>
//                 <div></div>
//               </div>

//               {kandidatliste.kandidater.map((kandidat, index) => (
//                 <StillingKandidatKort
//                   key={index}
//                   kandidat={kandidat}
//                   kandidatlisteId={kandidatliste.kandidatlisteId}
//                   lukketKandidatliste={lukketKandidatliste}
//                   columnLayout={FIXED_COLUMN_LAYOUT}
//                 />
//               ))}
//             </div>
//             {/* <aside className='sidebar mr-4 w-full lg:w-[20rem]'>
//                 <Show above='lg'>{sidePanel}</Show>
//                 <Hide above='lg'>
//                   <Accordion className='w-full'>
//                     <Accordion.Item>
//                       <Accordion.Header>Filtrer</Accordion.Header>
//                       <Accordion.Content>{sidePanel}</Accordion.Content>
//                     </Accordion.Item>
//                   </Accordion>
//                 </Hide>
//               </aside> */}
//             {/* <Sheet>
//               <SheetTrigger>Open</SheetTrigger>
//               <SheetContent>
//                 <SheetHeader>
//                   <SheetTitle>Are you absolutely sure?</SheetTitle>
//                   <SheetDescription>
//                     This action cannot be undone. This will permanently delete
//                     your account and remove your data from our servers.
//                   </SheetDescription>
//                 </SheetHeader>
//               </SheetContent>
//             </Sheet> */}
//             {/* <div className='mt-8 flex flex-col lg:flex-row'>
//               <div className='w-full'>
//                 <StillingsKandidaterTabell
//                   lukketKandidatliste={lukketKandidatliste}
//                   key={stillingsData.stilling.uuid}
//                   beskjeder={beskjeder}
//                   forespurteKandidater={forespurteKandidater}
//                   markerteKandidater={markerteKandidater}
//                   setMarkerteKandidater={setMarkerteKandidater}
//                   search={search}
//                   kandidatliste={kandidatliste}
//                   reFetchKandidatliste={reFetchKandidatliste}
//                 />
//               </div>
//             </div> */}
//           </div>
//         );
//       }}
//     </SWRLaster>
//   );
// };

// export default StillingsKandidater;
