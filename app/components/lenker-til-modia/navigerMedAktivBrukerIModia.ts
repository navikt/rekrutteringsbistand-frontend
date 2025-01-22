// import { postApi } from "../../api/fetcher";
// TODO Endre til aktiv bruker i modia context holder
// const navigerMedAktivBrukerIModia = async (href: string, fødselsnummer: string) => {
//     const response = await postApi(`${api.modiaContextHolder}/context`, {
//         verdi: fødselsnummer,
//         eventType: 'NY_AKTIV_BRUKER',
//     });

//     if (response.kind === Nettstatus.Feil) {
//         throw new Error(
//             'Klarte ikke å sette fnr-kontekst i modiacontextholder: ' + response.error.message
//         );
//     }

//     window.open(href, '_blank');
// };

// export default navigerMedAktivBrukerIModia;
