import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { z } from 'zod';

/**
 * Møteoppsettet fylles ut to steder i samme steg: inline før møteplanen
 * finnes, og i redigeringsmodalen etterpå. Skjema og standardverdier bor her
 * slik at de to inngangene ikke kan komme i utakt med hverandre.
 */
export const MøteoppsettFormSchema = z.object({
  starttidspunkt: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Oppgi et gyldig starttidspunkt.'),
  varighetPerMøteMinutter: z
    .number({ error: 'Oppgi varighet per møte.' })
    .int({ error: 'Varigheten må være et helt antall minutter.' })
    .min(1, { error: 'Varigheten må være minst 1 minutt.' }),
});

export type MøteoppsettFormValues = z.infer<typeof MøteoppsettFormSchema>;

export const tilFormValues = (møtedag: MøtedagDTO): MøteoppsettFormValues => ({
  starttidspunkt: møtedag.starttidspunkt,
  varighetPerMøteMinutter: møtedag.varighetPerMøteMinutter,
});
