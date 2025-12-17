'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';

import '@blocknote/mantine/style.css';
import './editor.css';

interface BlockNoteEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const BlockNoteEditor = ({
  onChange,
  initialContent,
  editable
}: BlockNoteEditorProps) => {
  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  const handleImgUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleImgUpload
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={
        onChange
          ? () => {
              onChange(JSON.stringify(editor.document));
            }
          : () => {}
      }
      editable={editable}
    />
  );
};

export default BlockNoteEditor;
