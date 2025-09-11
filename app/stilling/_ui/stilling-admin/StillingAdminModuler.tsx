// Evt. egne komponenter hvis disse ikke allerede dekkes av PraktiskeForhold:
// AntallStillinger, Ansettelsesform, Arbeidsdager, Arbeidstid, Kontaktperson, Oppstartsdato, Søknadsfrist
// Her kan du enten splitte PraktiskeForhold eller lage "små" wrapper-komponenter.
import Ansettelsesform from '@/app/stilling/_ui/stilling-admin/admin_moduler/Ansettelsesform';
import Arbeidstidsordning from '@/app/stilling/_ui/stilling-admin/admin_moduler/Arbeidstidsordning';
import StillingAdminFormidleKandidater from '@/app/stilling/_ui/stilling-admin/admin_moduler/FormidleKandidater';
import Inkludering from '@/app/stilling/_ui/stilling-admin/admin_moduler/Inkludering';
import OmJobben from '@/app/stilling/_ui/stilling-admin/admin_moduler/OmJobben';
import OmStillingsoppdraget from '@/app/stilling/_ui/stilling-admin/admin_moduler/OmStillingsoppdraget';
import OmVirksomheten from '@/app/stilling/_ui/stilling-admin/admin_moduler/OmVirksomheten';
import Omfang from '@/app/stilling/_ui/stilling-admin/admin_moduler/Omfang';
import PraktiskeForhold from '@/app/stilling/_ui/stilling-admin/admin_moduler/PraktiskeForhold';
import Sektor from '@/app/stilling/_ui/stilling-admin/admin_moduler/Sektor';
import Sted from '@/app/stilling/_ui/stilling-admin/admin_moduler/Sted';
import ViktigeDatoer from '@/app/stilling/_ui/stilling-admin/admin_moduler/ViktigeDatoer';
import Yrkestittel from '@/app/stilling/_ui/stilling-admin/admin_moduler/Yrkestittel';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';

export type ModulKey =
  | 'yrkestittel'
  | 'omJobben'
  | 'omJobbmesse'
  | 'praktiskeForhold'
  | 'virksomheten'
  | 'kontaktperson'
  | 'sted'
  | 'oppstartsdato'
  | 'omStillingsoppdraget'
  | 'inkludering'
  | 'sektor'
  // Formidling spesifikke
  | 'formidling_kandidater'
  | 'formidling_sektor'
  | 'formidling_ansettelsesform'
  | 'formidling_arbeidstidsordning'
  | 'formidling_omfang'
  | 'formidling_sted'
  | 'formidling_inkludering';

export interface VisningsModul {
  key: ModulKey;
  tittel: string;
  Component: React.FC;
  // valgfritt: om modul skal vises gitt gjeldende form-data
  vis?: (data: any) => boolean;
  // valgfritt: valideringsstatus kan injiseres senere
}

// Merk: Sektor, Omfang og Arbeidstidsordning egne komponenter finnes men er ikke del av standard stilling foreløpig.

export const alleModuler: VisningsModul[] = [
  { key: 'yrkestittel', tittel: 'Yrkestittel', Component: Yrkestittel },
  { key: 'omJobben', tittel: 'Om jobben', Component: OmJobben },
  { key: 'omJobbmesse', tittel: 'Om jobbmessen', Component: OmJobben },
  {
    key: 'praktiskeForhold',
    tittel: 'Praktiske forhold',
    Component: PraktiskeForhold,
  },
  {
    key: 'virksomheten',
    tittel: 'Virksomheten',
    Component: OmVirksomheten,
  },
  // kontaktperson håndteres i OmVirksomheten
  { key: 'sted', tittel: 'Sted', Component: Sted },
  {
    key: 'oppstartsdato',
    tittel: 'Oppstart og frist',
    Component: ViktigeDatoer,
  },
  {
    key: 'inkludering',
    tittel: 'Inkludering',
    Component: Inkludering,
  },
  {
    key: 'omStillingsoppdraget',
    tittel: 'Om stillingsoppdraget',
    Component: OmStillingsoppdraget,
  },
  { key: 'sektor', tittel: 'Sektor', Component: Sektor },
  // Formidling (Etterregistrering) — enklere variant uten Om jobben / virksomhet (kan justeres senere)
  {
    key: 'formidling_kandidater',
    tittel: 'Legg til kandidater',
    Component: StillingAdminFormidleKandidater,
  },
  { key: 'formidling_sektor', tittel: 'Sektor', Component: Sektor },
  {
    key: 'formidling_ansettelsesform',
    tittel: 'Ansettelsesform',
    Component: Ansettelsesform,
  },
  {
    key: 'formidling_arbeidstidsordning',
    tittel: 'Arbeidstidsordning (valgfritt)',
    Component: Arbeidstidsordning,
    vis: () => true, // separat valgfritt felt
  },
  { key: 'formidling_omfang', tittel: 'Omfang', Component: Omfang },
  { key: 'formidling_sted', tittel: 'Sted', Component: Sted },
  {
    key: 'formidling_inkludering',
    tittel: 'Inkludering',
    Component: Inkludering,
  },
];

const stillingRekkefolge: ModulKey[] = [
  'yrkestittel',
  'omJobben',
  'praktiskeForhold',
  // Sektor, omfang og arbeidstidsordning kan flyttes i rekkefølge senere

  'virksomheten',
  'sektor',
  'kontaktperson',
  'sted',
  'oppstartsdato',
  'inkludering',
  'omStillingsoppdraget',
];

const formidlingRekkefolge: ModulKey[] = [
  'formidling_kandidater',
  'yrkestittel',
  'virksomheten',
  'formidling_sektor',
  'formidling_ansettelsesform',
  'formidling_arbeidstidsordning',
  'formidling_omfang',
  'formidling_sted',
  'formidling_inkludering',
];

// Egen rekkefølge for Jobbmesse – skiller seg fra vanlig stilling ved at vi bruker "Om jobbmessen"
const jobbmesseRekkefolge: ModulKey[] = [
  'yrkestittel',
  'omJobbmesse',
  'praktiskeForhold',
  'virksomheten',
  'sektor',
  'kontaktperson',
  'sted',
  'oppstartsdato',
  'inkludering',
  'omStillingsoppdraget',
];

// Kan utvides for andre kategorier
export function hentModulerForKategori(
  kategori?: string | null,
): VisningsModul[] {
  switch (kategori) {
    case Stillingskategori.Stilling:
      return stillingRekkefolge
        .map((k) => alleModuler.find((m) => m.key === k)!)
        .filter(Boolean);
    case Stillingskategori.Jobbmesse:
      // Egen modul-rekkefølge for jobbmesse (AntallStillinger skjules fortsatt i PraktiskeForhold)
      return jobbmesseRekkefolge
        .map((k) => alleModuler.find((m) => m.key === k)!)
        .filter(Boolean);
    case Stillingskategori.Formidling:
      return formidlingRekkefolge
        .map((k) => alleModuler.find((m) => m.key === k)!)
        .filter(Boolean);
    default:
      return [];
  }
}
