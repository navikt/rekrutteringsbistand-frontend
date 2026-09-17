import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { Tooltip } from '@navikt/ds-react';

interface TreffEiereProps {
  eierOgKontor: EierOgKontor[];
}

export default function TreffEiereOgKontorer({
  eierOgKontor,
}: TreffEiereProps) {
  const kontorer = [...new Set(eierOgKontor.map((eier) => eier.kontorEnhetId))];

  return (
    <div
      role='group'
      aria-label='Eiere og kontorer'
      className='flex flex-wrap items-center gap-2'
    >
      {eierOgKontor.length > 0 && (
        <>
          <ul aria-label='Eiere' className='flex items-center gap-0.5'>
            {eierOgKontor.map(({ navIdent, eierNavn, kontorEnhetId }) => (
              <li key={navIdent}>
                <Tooltip
                  content={[
                    navIdent,
                    eierNavn,
                    hentNavkontorNavn(kontorEnhetId),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                >
                  <span
                    role='img'
                    tabIndex={0}
                    className='relative z-10 flex cursor-default rounded-full focus-visible:outline-2 focus-visible:outline-(--ax-border-focus)'
                  >
                    <IkonNavnAvatar
                      fulltNavn={eierNavn ?? navIdent}
                      størrelse='sm'
                      kantfarge
                      farge='blå'
                    />
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
          <span>{kontorer.map(hentNavkontorNavn).join(', ')}</span>
        </>
      )}
    </div>
  );
}
