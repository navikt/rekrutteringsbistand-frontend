'use client';
import RekrutteringstreffSøk from './_ui/RekrutteringstreffSøk';
import RekrutteringstreffSøkLayout from './_ui/RekrutteringstreffSøkLayout';
import Rekrutteringstreff from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import RekrutteringstreffForm from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/RekrutteringstreffForm';
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
      <RekrutteringstreffSøkLayout>
        <RekrutteringstreffSøk />
      </RekrutteringstreffSøkLayout>
    </WindowView>
  );
}
