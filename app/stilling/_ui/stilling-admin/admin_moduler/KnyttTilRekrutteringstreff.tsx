'use client';

import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  RekrutteringstreffStatus,
  RekrutteringstreffStatusLabel,
} from '@/app/rekrutteringstreff/_types/constants';
import KnyttTilRekrutteringstreffModal from '@/app/stilling/_ui/stilling-admin/admin_moduler/KnyttTilRekrutteringstreffModal';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { LinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function KnyttTilRekrutteringstreff() {
  const { setValue, watch } = useFormContext<StillingAdminDTO>();
  const valgtId = watch('stillingsinfo.rekrutteringstreffId') ?? null;
  const [åpen, setÅpen] = useState(false);

  const { data: tilknyttetTreff } = useRekrutteringstreff(valgtId ?? undefined);

  const fjern = () => {
    setValue('stillingsinfo.rekrutteringstreffId', null, {
      shouldDirty: true,
    });
  };

  return (
    <RedigerBoks tittel='Rekrutteringstreff (valgfritt)'>
      <BodyShort textColor='subtle' size='small' className='mb-3'>
        Hvis denne etterregistreringen hører til et rekrutteringstreff, kan du
        knytte dem sammen. Vi forhåndsfyller arbeidsgiver og kandidater fra
        treffet.
      </BodyShort>

      {valgtId ? (
        <div className='flex items-center justify-between gap-3 rounded border border-(--ax-border-neutral-subtle) p-3'>
          <div>
            <BodyShort weight='semibold'>
              {tilknyttetTreff?.tittel ?? 'Tilknyttet rekrutteringstreff'}
            </BodyShort>
            <BodyShort size='small' textColor='subtle'>
              {tilknyttetTreff?.status
                ? RekrutteringstreffStatusLabel[
                    tilknyttetTreff.status as RekrutteringstreffStatus
                  ]
                : `ID: ${valgtId}`}
            </BodyShort>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              size='small'
              variant='secondary'
              onClick={() => setÅpen(true)}
            >
              Endre
            </Button>
            <Button
              type='button'
              size='small'
              variant='tertiary'
              onClick={fjern}
            >
              Fjern
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type='button'
          size='small'
          variant='secondary'
          icon={<LinkIcon aria-hidden />}
          onClick={() => setÅpen(true)}
        >
          Knytt til rekrutteringstreff
        </Button>
      )}

      <KnyttTilRekrutteringstreffModal
        åpen={åpen}
        onLukk={() => setÅpen(false)}
      />
    </RedigerBoks>
  );
}
