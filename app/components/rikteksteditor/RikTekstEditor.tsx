'use client';
import { Box, Button, ErrorMessage } from '@navikt/ds-react';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import IconBold from '../../../public/editor/iconbold.svg';
import IconItalic from '../../../public/editor/iconitalic.svg';
import IconList from '../../../public/editor/iconlist.svg';
import IconRedo from '../../../public/editor/iconredo.svg';
import IconUndo from '../../../public/editor/iconundo.svg';
import SVGDarkmode from '../SVGDarkmode';
export interface IRikTekstEditor {
  skjulToolbar?: boolean;
  tekst?: string;
  id: string;
  onChange: (tekst: string) => void;
  feilMelding?: string;
}

const RikTekstEditor: React.FC<IRikTekstEditor> = ({
  tekst,
  id,
  onChange,
  skjulToolbar,
  feilMelding,
}) => {
  const extensions = [
    StarterKit.configure({
      orderedList: false,
      blockquote: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
    }),
  ];

  const editor = useEditor({
    extensions: extensions,
    content: tekst,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  console.log(editor?.getHTML());
  return (
    <Box.New
      borderColor='neutral-subtleA'
      borderWidth='1'
      padding='4'
      borderRadius='xlarge'
    >
      {!skjulToolbar && (
        <Box.New className='flex gap-2'>
          <Button
            type='button'
            icon={<SVGDarkmode src={IconBold} alt='Bold' />}
            variant={
              editor.isActive('bold') ? 'primary-neutral' : 'secondary-neutral'
            }
            size='small'
            onClick={() => editor.commands.toggleBold()}
            aria-pressed={editor.isActive('bold')}
          />
          <Button
            type='button'
            icon={<SVGDarkmode src={IconItalic} alt='Italic' />}
            variant={
              editor.isActive('italic')
                ? 'primary-neutral'
                : 'secondary-neutral'
            }
            size='small'
            onClick={() => editor.commands.toggleItalic()}
            aria-pressed={editor.isActive('italic')}
          />
          <Button
            type='button'
            icon={<SVGDarkmode src={IconList} alt='List' />}
            variant={
              editor.isActive('bulletList')
                ? 'primary-neutral'
                : 'secondary-neutral'
            }
            size='small'
            onClick={() => editor.commands.toggleBulletList()}
            aria-pressed={editor.isActive('bulletList')}
          />
          <Button
            type='button'
            icon={<SVGDarkmode src={IconUndo} alt='Undo' />}
            variant='secondary-neutral'
            size='small'
            onClick={() => editor.commands.undo()}
          />
          <Button
            variant='secondary-neutral'
            type='button'
            icon={<SVGDarkmode src={IconRedo} alt='Redo' />}
            size='small'
            onClick={() => editor.commands.redo()}
          />
        </Box.New>
      )}
      <hr className='my-4' />
      <EditorContent
        id={id}
        editor={editor}
        className='prose max-w-none prose-ul:list-disc prose-ul:pl-6 [&_ul]:list-disc [&_ul]:pl-6'
      />
      {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
    </Box.New>
  );
};

export default RikTekstEditor;
