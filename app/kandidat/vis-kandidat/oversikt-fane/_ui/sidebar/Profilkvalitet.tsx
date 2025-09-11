import { useKandidatContext } from '@/app/kandidat/vis-kandidat/KandidatContext';
import { dialogUrl } from '@/components/felles/modia/eksterneUrler';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';

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
  const harSpråk = (kandidatData?.sprak?.length ?? 0) > 0;

  React.useEffect(() => {
    if (kandidatData) {
      let prosent = 0;
      const mangler: string[] = [];
      if (harØnsketJobbsted) {
        prosent += 20;
      } else {
        mangler.push('Ønsket jobbsted');
      }
      if (harJobbønske) {
        prosent += 20;
      } else {
        mangler.push('Jobbønske');
      }
      if (harKompetanse) {
        prosent += 20;
      } else {
        mangler.push('Kompetanse');
      }
      if (harSpråk) {
        prosent += 20;
      } else {
        mangler.push('Språk');
      }
      if (harBosted) {
        prosent += 20;
      } else {
        mangler.push('Bosted');
      }

      setProgress(prosent);
      setManglerFelt(mangler);
    }
  }, [
    kandidatData,
    harØnsketJobbsted,
    harJobbønske,
    harKompetanse,
    harSpråk,
    harBosted,
  ]);

  return (
    <div>
      {/* Progress bar */}
      <div className='mb-4 flex h-2 w-full'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`mr-0.5 flex-1 rounded-sm last:mr-0 ${
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
            {': '}
          </BodyShort>
          <ul>
            {manglerFelt.map((felt) => (
              <li key={felt}>- {felt}</li>
            ))}
          </ul>
          <br />
          <BodyShort spacing>
            Det øker sjansen for at de finner en jobb som passer.
          </BodyShort>
          <Button
            onClick={() => window.open(dialogUrl, '_blank')}
            variant='secondary'
            className='mt-4 w-full'
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
