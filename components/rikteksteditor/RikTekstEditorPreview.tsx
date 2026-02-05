import './RikTekstEditorPreview.css';
import { FC } from 'react';

interface IRikTekstEditorPreview {
  htmlContent: string;
}

const RikTekstEditorPreview: FC<IRikTekstEditorPreview> = ({ htmlContent }) => {
  return (
    <div
      className='rikTestPreview max-w-none leading-normal text-gray-800 [&_li>p]:m-0 [&_li>p]:inline [&>ul]:list-inside [&>ul]:list-disc'
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RikTekstEditorPreview;
