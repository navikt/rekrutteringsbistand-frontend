import { TilbakemeldingKategori } from '@/app/api/bruker/tilbakemeldinger/typer';
import { sendTilbakemelding } from '@/app/api/bruker/tilbakemeldinger/useTilbakemeldinger';
import { useSidebar } from '@/components/ui/sidebar';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { PersonChatIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyShort,
  Button,
  Checkbox,
  Popover,
  Select,
  Textarea,
} from '@navikt/ds-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const kategoriTilLabel: Record<TilbakemeldingKategori, string> = {
  [TilbakemeldingKategori.Rekrutteringstreff]: 'Rekrutteringstreff',
  [TilbakemeldingKategori.Stillingsoppdrag]: 'Stillingsoppdrag',
  [TilbakemeldingKategori.Etterregistreringer]: 'Etterregistreringer',
  [TilbakemeldingKategori.Jobbsøker]: 'Jobbsøker',
};

const detekterKategori = (pathname: string): TilbakemeldingKategori => {
  if (pathname.startsWith('/rekrutteringstreff'))
    return TilbakemeldingKategori.Rekrutteringstreff;
  if (pathname.startsWith('/stilling'))
    return TilbakemeldingKategori.Stillingsoppdrag;
  if (pathname.startsWith('/etterregistrering'))
    return TilbakemeldingKategori.Etterregistreringer;
  if (pathname.startsWith('/kandidat')) return TilbakemeldingKategori.Jobbsøker;
  return TilbakemeldingKategori.Rekrutteringstreff;
};

const GiTilbakemelding = () => {
  const [openState, setOpenState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tekst, setTekst] = useState('');
  const [anonym, setAnonym] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sender' | 'sendt' | 'feil'>(
    'idle',
  );
  const pathname = usePathname();
  const [kategori, setKategori] = useState<TilbakemeldingKategori>(
    detekterKategori(pathname),
  );

  const { open } = useSidebar();
  const { brukerData } = useApplikasjonContext();

  const lukk = () => {
    setOpenState(false);
    setAnchorEl(null);
  };

  const nullstill = () => {
    setTekst('');
    setAnonym(false);
    setStatus('idle');
    setKategori(detekterKategori(pathname));
  };

  const handleSend = async () => {
    if (!tekst.trim()) return;
    setStatus('sender');
    try {
      await sendTilbakemelding({
        tilbakemelding: tekst.trim(),
        kategori,
        navn: anonym ? null : brukerData.ident,
      });
      setStatus('sendt');
      setTimeout(() => {
        lukk();
        nullstill();
      }, 2000);
    } catch {
      setStatus('feil');
    }
  };

  return (
    <>
      <Button
        data-color='neutral'
        size='small'
        onClick={(event) => {
          if (openState) {
            lukk();
            return;
          }
          setAnchorEl(event.currentTarget);
          setOpenState(true);
          nullstill();
        }}
        aria-expanded={openState}
        variant='tertiary'
        icon={<PersonChatIcon />}
        className={open ? 'w-full justify-start text-left' : ''}
      >
        {open && 'Gi tilbakemelding'}
      </Button>
      {openState &&
        createPortal(
          <Popover open={openState} onClose={lukk} anchorEl={anchorEl}>
            <Popover.Content className='flex w-[360px] flex-col gap-4'>
              {status === 'sendt' ? (
                <Alert variant='success' size='small'>
                  Takk for tilbakemeldingen!
                </Alert>
              ) : (
                <>
                  <BodyShort weight='semibold'>Gi oss tilbakemelding</BodyShort>
                  <BodyShort size='small'>
                    Ikke skriv personopplysninger her. Hvis du trenger å dele
                    sensitive opplysninger, bruk Porten.
                  </BodyShort>
                  <Textarea
                    label='Tilbakemelding'
                    hideLabel
                    placeholder='Skriv din tilbakemelding her...'
                    value={tekst}
                    onChange={(e) => setTekst(e.target.value)}
                    minRows={3}
                    maxRows={6}
                    size='small'
                  />
                  <Select
                    label='Kategori'
                    size='small'
                    value={kategori}
                    onChange={(e) =>
                      setKategori(e.target.value as TilbakemeldingKategori)
                    }
                  >
                    {Object.entries(kategoriTilLabel).map(([verdi, label]) => (
                      <option key={verdi} value={verdi}>
                        {label}
                      </option>
                    ))}
                  </Select>
                  <Checkbox
                    size='small'
                    checked={anonym}
                    onChange={(e) => setAnonym(e.target.checked)}
                  >
                    Send anonymt
                  </Checkbox>
                  {status === 'feil' && (
                    <Alert variant='error' size='small'>
                      Kunne ikke sende. Prøv igjen.
                    </Alert>
                  )}
                  <div className='flex justify-end gap-2'>
                    <Button size='small' variant='tertiary' onClick={lukk}>
                      Avbryt
                    </Button>
                    <Button
                      size='small'
                      onClick={handleSend}
                      disabled={!tekst.trim()}
                      loading={status === 'sender'}
                    >
                      Send
                    </Button>
                  </div>
                </>
              )}
            </Popover.Content>
          </Popover>,
          document.body,
        )}
    </>
  );
};

export default GiTilbakemelding;
