import { useStillingsContext } from '../StillingsContext';
import parse from 'html-react-parser';
import * as React from 'react';

const StillingsTekst: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const tekst = stillingsData.stilling?.properties?.adtext ?? '';
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        // Apply Tailwind classes to specific HTML tags
        if (domNode.name === 'ul') {
          domNode.attribs.class = 'list-disc pl-6 my-4';
          return domNode;
        }
        if (domNode.name === 'li') {
          domNode.attribs.class = 'mb-2';
          return domNode;
        }
        if (domNode.name === 'p' && domNode.parent?.name === 'li') {
          domNode.attribs.class = 'm-0';
          return domNode;
        }
      }
      return domNode;
    },
  };

  return (
    <div className='adText prose prose-slate max-w-none'>
      {parse(tekst, options)}
    </div>
  );
};

export default StillingsTekst;
