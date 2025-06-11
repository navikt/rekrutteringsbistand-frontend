'use client';

import IconBold from '../../../public/editor/iconbold.svg';
import IconItalic from '../../../public/editor/iconitalic.svg';
import IconList from '../../../public/editor/iconlist.svg';
import IconRedo from '../../../public/editor/iconredo.svg';
import IconUndo from '../../../public/editor/iconundo.svg';
import SVGDarkmode from '../SVGDarkmode';
import './RikTekstEditor.css';
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
      orderedList: false,
      blockquote: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
    }),
  ];

  const utviklerExtension = [
    Link.configure({
      openOnClick: false, // Don't open on click in the editor
      linkOnPaste: true, // Auto-convert pasted URLs to links
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank', // Open links in new tab
      },
    }),
  ];

  const editor = useEditor({
    extensions: utviklerExtensions
      ? [...extensions, ...utviklerExtension]
      : extensions,
    content: tekst,
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

    // add https:// if no protocol specified
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
      <EditorContent id={id} editor={editor} onKeyDown={onKeyDown} />
      {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
    </Box.New>
  );
};

export default RikTekstEditor;
