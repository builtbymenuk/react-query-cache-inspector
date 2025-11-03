export interface QuerySummary {
  key: string[];
  status: 'success' | 'error' | 'loading' | 'idle';
  dataUpdatedAt?: number;
}

export interface CacheSnapshot {
  type: 'CACHE_SNAPSHOT';
  origin: string;
  queries: QuerySummary[];
}
