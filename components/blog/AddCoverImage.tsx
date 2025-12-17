'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { ImageIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AddCoverImageProps {
  setUploadedCoverImage: (cover: string) => void;
  replaceUrl?: string;
}

const AddCoverImage = ({
  setUploadedCoverImage,
  replaceUrl
}: AddCoverImageProps) => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    let isMounted = true;
    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);

      try {
        const response = await edgestore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined
        });
        if (isMounted) {
          setUploadedCoverImage(response.url);
        }
      } catch (error) {
        console.log('Image upload failed!', error);
      } finally {
        if (isMounted) {
          setIsUploading(false);
        }
      }
    };

    uploadImage();

    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    imgInputRef.current?.click();
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={event => setFile(event.target.files?.[0] || null)}
        ref={imgInputRef}
        className='hidden'
      />
      <button
        type='button'
        onClick={handleButtonClick}
        className='flex items-center gap-2'
      >
        <ImageIcon size={20} />
        <span className='hover:text-red-500'>
          {!!replaceUrl ? 'Replace Cover Image' : 'Add Cover Image'}
        </span>
      </button>
      {isUploading && <p className='text-green-500'>Uploading image...</p>}
    </div>
  );
};

export default AddCoverImage;
