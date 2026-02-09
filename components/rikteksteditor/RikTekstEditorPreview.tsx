import './RikTekstEditorPreview.css';
import { FC } from 'react';

interface IRikTekstEditorPreview {
  htmlContent: string;
}

const RikTekstEditorPreview: FC<IRikTekstEditorPreview> = ({ htmlContent }) => {
  return (
    <div
      className='rikTekstPreview max-w-none leading-normal [&_li>p]:m-0 [&_li>p]:inline [&>ul]:list-inside [&>ul]:list-disc'
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RikTekstEditorPreview;
