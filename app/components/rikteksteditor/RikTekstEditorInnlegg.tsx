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
import { useEffect } from 'react';

export interface IRikTekstEditorInnlegg {
  skjulToolbar?: boolean;
  tekst?: string;
  id: string;
  onChange: (tekst: string) => void;
  feilMelding?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  utviklerExtensions?: boolean;
}

const RikTekstEditorInnlegg: React.FC<IRikTekstEditorInnlegg> = ({
  skjulToolbar,
  tekst,
  id,
  onChange,
  feilMelding,
  onKeyDown,
  utviklerExtensions,
}) => {
  const baseExtensions = [
    StarterKit.configure({
      orderedList: false,
      blockquote: false,
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
    }),
  ];

  const extraExtensions = [
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
      ? [...baseExtensions, ...extraExtensions]
      : baseExtensions,
    content: tekst,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL', previousUrl ?? '');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const urlWithProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: urlWithProtocol })
      .run();
  };

  useEffect(() => {
    if (editor && tekst !== editor.getHTML()) {
      editor.commands.setContent(tekst || '', false);
    }
  }, [tekst, editor]);

  if (!editor) return null;

  return (
    <Box.New
      borderColor={feilMelding ? 'danger' : 'neutral-subtleA'}
      borderWidth='1'
      padding='4'
      borderRadius='xlarge'
      className='rikteksteditor-container'
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
            type='button'
            icon={<SVGDarkmode src={IconRedo} alt='Redo' />}
            variant='secondary-neutral'
            size='small'
            onClick={() => editor.commands.redo()}
          />
        </Box.New>
      )}
      <hr className='my-4' />
      <div className='rikteksteditor-content-wrapper'>
        <EditorContent
          editor={editor}
          id={id}
          aria-describedby={feilMelding ? `${id}-feil` : undefined}
          onKeyDown={onKeyDown}
        />
      </div>
      {feilMelding && (
        <div className='rikteksteditor-feilmelding-wrapper'>
          <ErrorMessage id={`${id}-feil`} size='small'>
            {feilMelding}
          </ErrorMessage>
        </div>
      )}
    </Box.New>
  );
};

export default RikTekstEditorInnlegg;
