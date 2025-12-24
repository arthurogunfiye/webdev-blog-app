export const EditorSkeleton = () => {
  return (
    <div className='w-full space-y-6 animate-pulse mt-4'>
      {/* Mimic a Heading block */}
      <div className='h-10 bg-gray-200 rounded-md w-3/4 mb-8' />

      {/* Mimic Paragraph blocks */}
      <div className='space-y-3'>
        <div className='h-4 bg-gray-200 rounded w-full' />
        <div className='h-4 bg-gray-200 rounded w-full' />
        <div className='h-4 bg-gray-200 rounded w-5/6' />
      </div>

      {/* Mimic an Image or Large Block */}
      <div className='h-64 bg-gray-200 rounded-lg w-full' />

      {/* Mimic more text */}
      <div className='space-y-3'>
        <div className='h-4 bg-gray-200 rounded w-full' />
        <div className='h-4 bg-gray-200 rounded w-4/5' />
      </div>
    </div>
  );
};
