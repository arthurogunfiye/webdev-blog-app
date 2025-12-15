import { initEdgeStoreClient } from '@edgestore/server/core';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 10 * 1024 * 1024,
      accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
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
