'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import BlockNoteErrorBoundary from './Editor-Error-Boundary';

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

  if (!editor) {
    return (
      <div className='h-[200px] w-full animate-pulse bg-gray-100 rounded-md' />
    );
  }

  return (
    <BlockNoteErrorBoundary>
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
    </BlockNoteErrorBoundary>
  );
};

export default BlockNoteEditor;
