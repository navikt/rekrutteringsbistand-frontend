import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../../../KandidatContext';

const Profilkvalitet: React.FC = () => {
  const { kandidatData } = useKandidatContext();

  const [progress, setProgress] = React.useState(0);
  const [manglerFelt, setManglerFelt] = React.useState<string[]>([]);

  // Ønsket jobbsted
  const harØnsketJobbsted = (kandidatData?.geografiJobbonsker?.length ?? 0) > 0;
  // Jobbønske
  const harJobbønske = (kandidatData?.yrkeJobbonskerObj?.length ?? 0) > 0;
  // Kompetanse
  const harKompetanse = (kandidatData?.kompetanseObj?.length ?? 0) > 0;
  // Bosted
  const harBosted = kandidatData?.kommuneNavn !== null;
  // Språk
  const harSpråk = (kandidatData?.sprak ?? []).length > 0;

  React.useEffect(() => {
    if (kandidatData) {
      let progress = 0;
      let manglerFelt: string[] = [];
      if (harØnsketJobbsted) {
        progress += 10;
      } else {
        manglerFelt.push('Ønsket jobbsted');
      }
      if (harJobbønske) {
        progress += 10;
      } else {
        manglerFelt.push('Jobbønske');
      }
      if (harKompetanse) {
        progress += 10;
      } else {
        manglerFelt.push('Kompetanse');
      }
      if (harSpråk) {
        progress += 10;
      } else {
        manglerFelt.push('Språk');
      }
      if (harBosted) {
        progress += 10;
      } else {
        manglerFelt.push('Bosted');
      }
      setProgress(progress);
      setManglerFelt(manglerFelt);
    }
  }, [kandidatData]);

  return (
    <div>
      {/* Progress bar */}
      <div className='flex w-full h-2 mb-4'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 mr-0.5 last:mr-0 rounded-sm ${
              i * 20 < progress ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {progress === 100 ? (
        <div className='flex items-start gap-2'>
          <div className='mt-1'>✓</div>
          <BodyShort>
            Kandidaten har fullført profilen sin. Det øker sjansen for at de
            finner en jobb som passer.
          </BodyShort>
        </div>
      ) : (
        <>
          <BodyShort spacing>
            Hør om kandidaten kan {progress < 60 ? 'dele' : 'oppgi'}
          </BodyShort>
          <BodyShort spacing>{manglerFelt.join(', ')}.</BodyShort>
          <BodyShort spacing>
            Det øker sjansen for at de finner en jobb som passer.
          </BodyShort>
          <Button
            // se navigerMedAktivBrukerIModia.ts
            disabled
            variant='secondary'
            className='w-full mt-4'
            icon={<ExternalLinkIcon />}
          >
            Gå til dialogen i Modia
          </Button>
        </>
      )}
    </div>
  );
};

export default Profilkvalitet;
