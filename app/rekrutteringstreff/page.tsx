'use client';
import { RekrutteringstreffSøkProvider } from './_providers/RekrutteringstreffSøkContext';
import RekrutteringstreffSøk from './_ui/RekrutteringstreffSøk';
import RekrutteringstreffSøkLayout from './_ui/RekrutteringstreffSøkLayout';
import Rekrutteringstreff from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import RekrutteringstreffForm from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/RekrutteringstreffForm';
import { RekrutteringstreffProvider } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import WindowView from '@/components/window/WindowView';

export default function RekrutteringstreffSøkPage() {
  return (
    <WindowView
      param='visRekrutteringstreffId'
      window={(rekrutteringstreffId) => (
        <RekrutteringstreffProvider rekrutteringstreffId={rekrutteringstreffId}>
          <RekrutteringstreffForm>
            <Rekrutteringstreff />
          </RekrutteringstreffForm>
        </RekrutteringstreffProvider>
      )}
    >
      <RekrutteringstreffSøkProvider>
        <RekrutteringstreffSøkLayout>
          <RekrutteringstreffSøk />
        </RekrutteringstreffSøkLayout>
      </RekrutteringstreffSøkProvider>
    </WindowView>
  );
}
