import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Link } from '@navikt/ds-react';

export interface FinnKandidaterKnappProps {
  stillingId: string;
}

export default function FinnKandidaterKnapp({
  stillingId,
}: FinnKandidaterKnappProps) {
  const { trackAndNavigate } = useUmami();
  const href = `/stilling/${stillingId}?finnKandidater=true`;

  const navigate = () =>
    trackAndNavigate(UmamiEvent.Stilling.finn_kandidater_knapp, href);

  return (
    <Box.New
      background='neutral-softA'
      borderRadius='xlarge'
      paddingInline='space-16'
      paddingBlock='space-12'
      role='link'
      tabIndex={0}
      aria-label='Finn og foreslå jobbsøkere. Vet du om noen som kan passe til jobben?'
      className='group flex items-start justify-between gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2'
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
    >
      <div className='flex gap-3 items-start'>
        <span className='text-xl leading-none mt-0.5'>👉</span>
        <div className='flex flex-col'>
          <BodyShort spacing className='m-0'>
            <Link
              href={href}
              onClick={(e) => {
                e.preventDefault();
                navigate();
              }}
            >
              Finn og foreslå jobbsøkere
            </Link>
          </BodyShort>
          <BodyShort size='small'>
            Vet du om noen som kan passe til jobben?
          </BodyShort>
        </div>
      </div>
      <ArrowRightIcon
        aria-hidden
        className='transition-transform group-hover:translate-x-1 mt-1'
      />
    </Box.New>
  );
}
