import Ansettelsesform from './admin_moduler/Ansettelsesform';
import AntallStillinger from './admin_moduler/AntallStillinger';
import Arbeidsdager from './admin_moduler/Arbeidsdager';
import Arbeidstid from './admin_moduler/Arbeidstid';
import Arbeidstidsordning from './admin_moduler/Arbeidstidsordning';
import AutolagreStilling from './admin_moduler/AutolagreStilling';
import FormidleKandidater from './admin_moduler/FormidleKandidater';
import Inkludering from './admin_moduler/Inkludering';
import OmJobben from './admin_moduler/OmJobben';
import OmStillingsoppdraget from './admin_moduler/OmStillingsoppdraget';
import OmVirksomheten from './admin_moduler/OmVirksomheten';
import Omfang from './admin_moduler/Omfang';
import PraktiskeForhold from './admin_moduler/PraktiskeForhold';
import PubliserModal from './admin_moduler/PubliserModal';
import Sektor from './admin_moduler/Sektor';
import Sted from './admin_moduler/Sted';
import ViktigeDatoer from './admin_moduler/ViktigeDatoer';
import Yrkestittel from './admin_moduler/Yrkestittel';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

// Viser et utvalg av alle admin-modulene i en inert (ikke-interaktiv) kontekst.
// Må ha react-hook-form provider for at modulene ikke skal kaste feil.

function AdminFormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm<StillingsDataDTO>({
    mode: 'onChange',
    defaultValues: mockBaseStilling as unknown as StillingsDataDTO,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-6 opacity-60 pointer-events-none max-w-[1200px]'>
      <AdminFormWrapper>
        <div className='grid md:grid-cols-2 gap-6'>
          <Yrkestittel />
          <OmJobben />
          <AntallStillinger />
          <Ansettelsesform />
          <Sektor />
          <OmVirksomheten />
          <OmStillingsoppdraget />
          <Inkludering />
          <Omfang />
          <Arbeidstid />
          <Arbeidsdager />
          <Arbeidstidsordning />
          <ViktigeDatoer />
          <PraktiskeForhold />
          <Sted />
          <FormidleKandidater />
          <AutolagreStilling stillingsData={mockBaseStilling as any} />
          <PubliserModal disabled={true} />
        </div>
      </AdminFormWrapper>
    </div>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
