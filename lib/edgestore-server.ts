import { initEdgeStoreClient } from '@edgestore/server/core';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { auth } from '@/auth';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 10 * 1024 * 1024,
      accept: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/avif'
      ]
    })

    .beforeUpload(async () => {
      const session = await auth();
      if (!session) {
        throw new Error('Unauthorized'); // EdgeStore handles this as a 401
      }
      return true;
    })
    .beforeDelete(() => true)
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter
});

export type EdgeStoreRouter = typeof edgeStoreRouter;
