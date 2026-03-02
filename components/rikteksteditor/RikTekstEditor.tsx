'use client';

import './RikTekstEditor.css';
import SVGDarkmode from '@/components/layout/SVGDarkmode';
import IconBold from '@/public/editor/iconbold.svg';
import IconItalic from '@/public/editor/iconitalic.svg';
import IconList from '@/public/editor/iconlist.svg';
import IconRedo from '@/public/editor/iconredo.svg';
import IconUndo from '@/public/editor/iconundo.svg';
import { LinkIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage } from '@navikt/ds-react';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export interface IRikTekstEditor {
  skjulToolbar?: boolean;
  tekst?: string;
  id: string;
  onChange: (tekst: string) => void;
  feilMelding?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  utviklerExtensions?: boolean;
}

const RikTekstEditor: React.FC<IRikTekstEditor> = ({
  tekst,
  id,
  onChange,
  skjulToolbar,
  feilMelding,
  onKeyDown,
  utviklerExtensions,
}) => {
  const extensions = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
      blockquote: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
    }),
  ];

  const utviklerExtension = [
    Link.configure({
      openOnClick: false,
      linkOnPaste: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
  ];

  const editor = useEditor({
    extensions: utviklerExtensions
      ? [...extensions, ...utviklerExtension]
      : extensions,
    content: tekst,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Legg til https:// hvis ingen protokoll er angitt
    const urlWithProtocol = url.match(/^https?:\/\//) ? url : `https://${url}`;

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: urlWithProtocol })
      .run();
  };

  if (!editor) {
    return null;
  }
  return (
    <Box>
      {!skjulToolbar && (
        <Box className='flex gap-2'>
          <Button
            type='button'
            icon={<SVGDarkmode src={IconBold} alt='Bold' />}
            variant={
              editor.isActive('bold') ? 'primary-neutral' : 'secondary-neutral'
            }
            size='small'
            onClick={() => editor.chain().focus().toggleBold().run()}
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
            onClick={() => editor.chain().focus().toggleItalic().run()}
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
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-pressed={editor.isActive('bulletList')}
          />
          {utviklerExtensions && (
            <Button
              type='button'
              icon={<LinkIcon />}
              variant={
                editor.isActive('link')
                  ? 'primary-neutral'
                  : 'secondary-neutral'
              }
              size='small'
              onClick={setLink}
              aria-pressed={editor.isActive('link')}
            />
          )}
          <Button
            data-color='neutral'
            type='button'
            icon={<SVGDarkmode src={IconUndo} alt='Undo' />}
            variant='secondary'
            size='small'
            onClick={() => editor.chain().focus().undo().run()}
          />
          <Button
            data-color='neutral'
            variant='secondary'
            type='button'
            icon={<SVGDarkmode src={IconRedo} alt='Redo' />}
            size='small'
            onClick={() => editor.chain().focus().redo().run()}
          />
        </Box>
      )}
      <Box
        background='input'
        borderColor='neutral-strong'
        borderWidth='1'
        borderRadius='8'
        className='mt-2 px-2'
      >
        <EditorContent id={id} editor={editor} onKeyDown={onKeyDown} />
      </Box>
      {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
    </Box>
  );
};

export default RikTekstEditor;
