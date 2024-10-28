'use client';
import {
  ArrowRedoIcon,
  ArrowUndoIcon,
  BulletListIcon,
  ChevronRightDoubleIcon,
  LinkBrokenIcon,
  LinkIcon,
  NumberListIcon,
} from '@navikt/aksel-icons';
import { BodyShort, ErrorMessage, Loader } from '@navikt/ds-react';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import * as React from 'react';

export interface IRikTekstEditor {
  skjulToolbar?: boolean;
  tekst?: string;
  id: string;
  onChange: (tekst: string) => void;
  feilMelding?: string;
  limitLengde?: number;
}

const RikTekstEditor: React.FC<IRikTekstEditor> = ({
  tekst,
  id,
  onChange,
  skjulToolbar,
  feilMelding,
  limitLengde,
}) => {
  const [headerValue, setHeaderValue] = React.useState<number>(0);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      HardBreak,
      Document,
      Paragraph,
      Text,
      History,
      Bold,
      Italic,
      Underline,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      CharacterCount.configure({
        limit: limitLengde,
      }),
    ],
    content: tekst,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onTransaction: ({ editor, transaction }) => {
      if (transaction.selection) {
        const level = editor.getAttributes('heading').level;
        setHeaderValue(level ? level : 0);
      }
    },
  });

  if (!editor) {
    return <Loader />;
  }
  const setLink = () => {
    const url = prompt('Skriv inn lenke');
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const onSelectHeading = (value: string) => {
    const level = parseInt(value, 10);

    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      // @ts-ignore
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const aktivKnapp = 'bg-gray-200 ';
  const inaktivKnapp = 'bg-white ';
  return (
    <div className='border border-black p-2.5 rounded-md' id={id}>
      <div>
        {skjulToolbar ? (
          <div />
        ) : (
          <div className='border-b border-black pb-2.5 flex space-x-3'>
            <select
              value={headerValue}
              onChange={(e) => onSelectHeading(e.target.value)}
            >
              <option value={0}>Normal</option>
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
            </select>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? aktivKnapp : inaktivKnapp}
            >
              <strong>B</strong>
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? aktivKnapp : inaktivKnapp}
            >
              <strong>
                <i>I</i>
              </strong>
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={
                editor.isActive('underline') ? aktivKnapp : inaktivKnapp
              }
            >
              <strong>
                <ins>U</ins>
              </strong>
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={inaktivKnapp}
            >
              <ChevronRightDoubleIcon />
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                editor.isActive('bulletList') ? aktivKnapp : inaktivKnapp
              }
            >
              <BulletListIcon />
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive('orderedList') ? aktivKnapp : inaktivKnapp
              }
            >
              <NumberListIcon />
            </button>
            <button
              type='button'
              onClick={setLink}
              className={editor.isActive('link') ? aktivKnapp : inaktivKnapp}
            >
              <LinkIcon />
            </button>
            <button
              type='button'
              onClick={unsetLink}
              disabled={!editor.isActive('link')}
            >
              <LinkBrokenIcon />
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <ArrowUndoIcon />
            </button>
            <button
              type='button'
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <ArrowRedoIcon />
            </button>
          </div>
        )}
      </div>
      <EditorContent
        className='my-2 focus:outline-none focus:ring-0 focus:border-none'
        editor={editor}
      />
      <hr />
      {limitLengde && (
        <div className='mt-2 flex justify-end'>
          <BodyShort size='small' className='text-gray-500'>
            Maks tegn {editor.storage.characterCount.characters()} /{' '}
            {limitLengde}
          </BodyShort>
        </div>
      )}
      {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
    </div>
  );
};

export default RikTekstEditor;
