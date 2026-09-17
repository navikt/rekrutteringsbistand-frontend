import { useKanLeggeTilJobbsøkere } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useKanLeggeTilJobbsøkere';
import { useNullableRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import LeggTilDialog from '@/components/legg-til-jobbsøker/LeggTilDialog';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { Dialog } from '@navikt/ds-react';

export enum LeggTilJobbsøkerType {
  Stilling = 'stilling',
  Rekrutteringstreff = 'rekrutteringstreff',
  Etterregistrering = 'etterregistrering',
}

export interface LeggTilJobbsøkerProps {
  type: LeggTilJobbsøkerType;
}

export default function LeggTilJobbsøker({ type }: LeggTilJobbsøkerProps) {
  const treff = useNullableRekrutteringstreffContext();
  const kanLeggeTil = useKanLeggeTilJobbsøkere(treff?.rekrutteringstreffId);
  if (type === LeggTilJobbsøkerType.Rekrutteringstreff && !kanLeggeTil)
    return null;

  return (
    <Dialog>
      <Dialog.Trigger>
        <LenkeKortMedIkon
          tittel='Legg til jobbsøkere'
          beskrivelse='Vet du fødselsnummeret til personen, kan du legge dem til med en
              gang.'
          ikon={'➕'}
        />
      </Dialog.Trigger>
      <Dialog.Popup>
        <LeggTilDialog type={type} />
      </Dialog.Popup>
    </Dialog>
  );
}
