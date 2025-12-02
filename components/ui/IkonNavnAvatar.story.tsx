import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { ClockIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: IkonNavnAvatar,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof IkonNavnAvatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MedFulltNavn: Story = {
  args: {
    fulltNavn: 'Navn Navnesen',
  },
  render: (args) => (
    <div className={'grid grid-cols-10 gap-2'}>
      <IkonNavnAvatar {...args} farge={'blå'} />
      <IkonNavnAvatar {...args} farge={'grønn'} />
      <IkonNavnAvatar {...args} farge={'lilla'} />
      <IkonNavnAvatar {...args} farge={'oransje'} />
      <IkonNavnAvatar {...args} farge={'grå'} />

      <IkonNavnAvatar {...args} farge={'blå'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} kantfarge />
    </div>
  ),
};

export const MedFornavnEtternavn: Story = {
  args: {
    fornavn: 'Navn',
    etternavn: 'Navnesen',
  },
  render: (args) => (
    <div className={'grid grid-cols-10 gap-2'}>
      <IkonNavnAvatar {...args} farge={'blå'} />
      <IkonNavnAvatar {...args} farge={'grønn'} />
      <IkonNavnAvatar {...args} farge={'lilla'} />
      <IkonNavnAvatar {...args} farge={'oransje'} />
      <IkonNavnAvatar {...args} farge={'grå'} />

      <IkonNavnAvatar {...args} farge={'blå'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} kantfarge />
    </div>
  ),
};

export const MedIkon: Story = {
  args: {
    ikon: <ClockIcon />,
  },
  render: (args) => (
    <div className={'grid grid-cols-10 gap-2'}>
      <IkonNavnAvatar {...args} farge={'blå'} />
      <IkonNavnAvatar {...args} farge={'grønn'} />
      <IkonNavnAvatar {...args} farge={'lilla'} />
      <IkonNavnAvatar {...args} farge={'oransje'} />
      <IkonNavnAvatar {...args} farge={'grå'} />

      <IkonNavnAvatar {...args} farge={'blå'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} kantfarge />
    </div>
  ),
};

export const UlikeStørrelser: Story = {
  args: {
    fulltNavn: 'Navn Navnesen',
  },
  render: (args) => (
    <div className={'grid grid-cols-10 justify-items-center gap-2'}>
      <IkonNavnAvatar {...args} farge={'blå'} størrelse={'sm'} />
      <IkonNavnAvatar {...args} farge={'grønn'} størrelse={'sm'} />
      <IkonNavnAvatar {...args} farge={'lilla'} størrelse={'sm'} />
      <IkonNavnAvatar {...args} farge={'oransje'} størrelse={'sm'} />
      <IkonNavnAvatar {...args} farge={'grå'} størrelse={'sm'} />

      <IkonNavnAvatar {...args} farge={'blå'} størrelse={'sm'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} størrelse={'sm'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} størrelse={'sm'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} størrelse={'sm'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} størrelse={'sm'} kantfarge />

      <IkonNavnAvatar {...args} farge={'blå'} størrelse={'md'} />
      <IkonNavnAvatar {...args} farge={'grønn'} størrelse={'md'} />
      <IkonNavnAvatar {...args} farge={'lilla'} størrelse={'md'} />
      <IkonNavnAvatar {...args} farge={'oransje'} størrelse={'md'} />
      <IkonNavnAvatar {...args} farge={'grå'} størrelse={'md'} />

      <IkonNavnAvatar {...args} farge={'blå'} størrelse={'md'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} størrelse={'md'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} størrelse={'md'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} størrelse={'md'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} størrelse={'md'} kantfarge />

      <IkonNavnAvatar {...args} farge={'blå'} />
      <IkonNavnAvatar {...args} farge={'grønn'} />
      <IkonNavnAvatar {...args} farge={'lilla'} />
      <IkonNavnAvatar {...args} farge={'oransje'} />
      <IkonNavnAvatar {...args} farge={'grå'} />

      <IkonNavnAvatar {...args} farge={'blå'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grønn'} kantfarge />
      <IkonNavnAvatar {...args} farge={'lilla'} kantfarge />
      <IkonNavnAvatar {...args} farge={'oransje'} kantfarge />
      <IkonNavnAvatar {...args} farge={'grå'} kantfarge />
    </div>
  ),
};
