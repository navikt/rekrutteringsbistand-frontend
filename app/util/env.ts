import { z, ZodError } from 'zod';

export type PublicEnv = z.infer<typeof publicEnvSchema>;
const publicEnvSchema = z.object({
  NEXT_PUBLIC_ENVIRONMENT: z.union([
    z.literal('local'),
    z.literal('test'),
    z.literal('dev'),
    z.literal('production'),
  ]),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export const serverEnvSchema = z.object({
  MODIA_CONTEXT_SCOPE: z.string(),
  MODIA_CONTEXT_URL: z.string(),
});

export const browserEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
} satisfies Record<keyof PublicEnv, string | undefined>);

const getRawServerConfig = (): Partial<unknown> =>
  ({
    // Provided by nais-*.yml
    MODIA_CONTEXT_SCOPE: process.env.MODIA_CONTEXT_SCOPE,
    MODIA_CONTEXT_URL: process.env.MODIA_CONTEXT_URL,
  } satisfies Record<keyof ServerEnv, string | undefined>);

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & PublicEnv {
  try {
    return {
      ...serverEnvSchema.parse(getRawServerConfig()),
      ...publicEnvSchema.parse(browserEnv),
    };
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(
        `The following envs are missing: ${
          e.errors
            .filter((it) => it.message === 'Required')
            .map((it) => it.path.join('.'))
            .join(', ') ||
          'None are missing, but zod is not happy. Look at cause'
        }`,
        { cause: e }
      );
    } else {
      throw e;
    }
  }
}

export const isLocal = process.env.NODE_ENV !== 'production';
