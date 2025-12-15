import { initEdgeStoreClient } from '@edgestore/server/core';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => true)
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter
});

export type EdgeStoreRouter = typeof edgeStoreRouter;
