import type { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { z } from 'zod';

export const MøteoppsettFormSchema = z.object({
  starttidspunkt: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Oppgi et gyldig starttidspunkt.'),
  varighetPerMøteMinutter: z
    .number({ error: 'Oppgi varighet per møte.' })
    .int({ error: 'Varigheten må være et helt antall minutter.' })
    .min(1, { error: 'Varigheten må være minst 1 minutt.' }),
});

export type MøteoppsettSkjemaverdier = z.infer<typeof MøteoppsettFormSchema>;

export const tilMøteoppsettSkjemaverdier = (
  treffgjennomføring: TreffgjennomføringDTO,
): MøteoppsettSkjemaverdier => ({
  starttidspunkt: treffgjennomføring.starttidspunkt,
  varighetPerMøteMinutter: treffgjennomføring.varighetPerMøteMinutter,
});
