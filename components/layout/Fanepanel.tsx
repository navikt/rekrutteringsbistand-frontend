'use client';

import { Tabs } from '@navikt/ds-react';
import { ComponentProps, useLayoutEffect, useRef } from 'react';

/**
 * Wrapper rundt Aksel sin `Tabs.Panel`. Aksel hardkoder `tabIndex={0}` på
 * panelet, noe som gjør hele innholdsområdet til et eget tab-stopp med en stor
 * fokusring rundt alt. Panelene våre inneholder allerede fokuserbart innhold
 * (lenker, kort, knapper), og scrollingen håndteres av egne scroll-containere,
 * så panelet trenger ikke å ligge i tab-rekkefølgen. Vi tar det derfor ut for å
 * unngå et forvirrende fokusområde.
 */
export default function Fanepanel(props: ComponentProps<typeof Tabs.Panel>) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ref.current?.setAttribute('tabindex', '-1');
  }, []);

  return <Tabs.Panel ref={ref} {...props} />;
}
