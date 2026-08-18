const MEMORY = new Map<string, { expires: number; data: unknown }>();
const INFLIGHT = new Map<string, Promise<unknown>>();

export function fetchCachedJson<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = MEMORY.get(key);
  if (hit && hit.expires > now) return Promise.resolve(hit.data as T);

  const inflight = INFLIGHT.get(key);
  if (inflight) return inflight as Promise<T>;

  const promise = fetcher()
    .then((data) => {
      MEMORY.set(key, { expires: Date.now() + ttlMs, data });
      return data;
    })
    .catch((error) => {
      if (hit) return hit.data as T;
      throw error;
    })
    .finally(() => {
      INFLIGHT.delete(key);
    });

  INFLIGHT.set(key, promise);
  return promise;
}

export function clearGalleryCache() {
  MEMORY.delete("gallery");
  MEMORY.delete("projects");
}
