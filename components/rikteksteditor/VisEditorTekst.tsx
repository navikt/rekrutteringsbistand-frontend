import parse from 'html-react-parser';
import * as React from 'react';

interface VisEditorTekstProps {
  htmlTekst?: string | null | number;
}

const VisEditorTekst: React.FC<VisEditorTekstProps> = ({ htmlTekst }) => {
  // If number, parse to string:
  if (typeof htmlTekst === 'number') {
    htmlTekst = htmlTekst.toString();
  }
  const formatertTekst = htmlTekst ?? '';

  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        // Root container styles are handled at the div level

        // Headings
        if (domNode.name === 'h1') {
          domNode.attribs.class =
            'my-4 mb-5 -tracking-wide font-bold text-3xl leading-tight md:text-4xl';
          return domNode;
        }
        if (domNode.name === 'h2') {
          domNode.attribs.class =
            'mt-7 mb-4 -tracking-wider font-bold text-2xl leading-tight md:text-3xl';
          return domNode;
        }
        if (domNode.name === 'h3') {
          domNode.attribs.class =
            'mt-7 mb-3 -tracking-wider font-bold text-xl leading-snug';
          return domNode;
        }
        if (domNode.name === 'h4') {
          domNode.attribs.class =
            'mt-7 mb-3 -tracking-tight font-bold text-lg leading-snug';
          return domNode;
        }
        if (domNode.name === 'h5' || domNode.name === 'h6') {
          domNode.attribs.class =
            'mt-7 mb-3 -tracking-tight font-bold leading-snug';
          return domNode;
        }

        // Paragraphs
        if (domNode.name === 'p') {
          const isInListItem = domNode.parent?.name === 'li';
          domNode.attribs.class = isInListItem
            ? 'mb-2 text-lg leading-relaxed'
            : 'mt-3 mb-5 text-lg leading-relaxed';
          return domNode;
        }

        // Lists
        if (domNode.name === 'ul') {
          domNode.attribs.class = 'list-disc pl-6 mb-5';
          return domNode;
        }
        if (domNode.name === 'ol') {
          domNode.attribs.class = 'list-decimal pl-6 mb-5';
          return domNode;
        }

        // List items
        if (domNode.name === 'li') {
          domNode.attribs.class = 'mb-3 text-lg leading-relaxed';
          return domNode;
        }

        // Bold text
        if (domNode.name === 'b' || domNode.name === 'strong') {
          domNode.attribs.class = 'font-bold';
          return domNode;
        }

        // Links
        if (domNode.name === 'a') {
          domNode.attribs.class =
            'text-blue-600 underline hover:no-underline focus:outline-none focus:bg-blue-100 focus:text-blue-900 active:bg-blue-100 active:text-blue-900';
          return domNode;
        }
      }
      return domNode;
    },
  };

  return <div>{parse(formatertTekst, options)}</div>;
};

export default VisEditorTekst;
