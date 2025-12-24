'use client';

import dynamic from 'next/dynamic';
import { EditorSkeleton } from './EditorSkeleton';

// We move the dynamic logic here, inside a 'use client' file
const BlockNoteEditor = dynamic(() => import('./BlockNoteEditor'), {
  ssr: false,
  loading: () => <EditorSkeleton />
});

interface WrapperProps {
  initialContent?: string;
  editable?: boolean;
}

export default function BlockNoteViewWrapper({
  initialContent,
  editable
}: WrapperProps) {
  return (
    <BlockNoteEditor initialContent={initialContent} editable={editable} />
  );
}
