import { useEffect } from 'react';

/**
 * Dekoratør for å sette URL-search param `visKandidatId` slik at nuqs useQueryState('visKandidatId') plukker den opp.
 * Bruk i en story:
 *  import { createVisKandidatIdDecorator } from '@/.storybook/NuqsVisKandidatIdDecorator';
 *  export const MinStory = { decorators: [createVisKandidatIdDecorator('kandidat-123')] }
 */
export const createVisKandidatIdDecorator = (id: string) => {
  const Decorator = (Story: any) => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('visKandidatId', id);
        window.history.replaceState(null, '', url.toString());
        window.dispatchEvent(new Event('popstate')); // trigge hooks som lytter
      }
    }, []);
    return <Story />;
  };
  Decorator.displayName = `VisKandidatIdDecorator(${id})`;
  return Decorator;
};
