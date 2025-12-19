'use client';

import Image from 'next/image';
import AddCoverImage from './AddCoverImage';
import { X } from 'lucide-react';
import { useEdgeStore } from '@/lib/edgestore';

interface CoverImageProps {
  setUploadedCover: (cover: string) => void;
  url: string;
  isEditor?: boolean;
}

const CoverImage = ({ url, isEditor, setUploadedCover }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const handleRemoveCover = async (url: string) => {
    try {
      await edgestore.publicFiles.delete({ url });
      setUploadedCover(undefined as unknown as string);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={parentDivStyles}>
      <Image
        src={url}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        alt='Cover Image'
        className='object-cover'
        priority
      />
      {isEditor && (
        <div className={isEditorStyles}>
          <AddCoverImage
            setUploadedCoverImage={setUploadedCover}
            replaceUrl={url}
          />
          <button
            className={buttonStyles}
            type='button'
            onClick={() => {
              handleRemoveCover(url);
            }}
          >
            <X size={20} />
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;

const parentDivStyles = 'relative w-full h-[35vh] group';
const isEditorStyles =
  'absolute top-8 right-5 opacity-0 group-hover:opacity-100 flex items-center gap-x-2';
const buttonStyles = 'flex items-center gap-2 ml-4 hover:text-red-500';
