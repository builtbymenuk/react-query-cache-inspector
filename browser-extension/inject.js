(function () {
  function findQueryClient() {
    for (const key of Object.keys(window)) {
      const val = window[key];
      if (val && typeof val.getQueryCache === "function") return val;
    }
    return null;
  }

  const queryClient = findQueryClient();
  if (!queryClient) return;

  function snapshot() {
    try {
      const queries = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => ({
          key: q.queryKey,
          status: q.state.status,
          dataUpdatedAt: q.state.dataUpdatedAt,
        }));

      window.postMessage(
        {
          __RQ_INSPECTOR__: true,
          type: "CACHE_SNAPSHOT",
          origin: location.origin,
          queries,
        },
        "*"
      );
    } catch (e) {}
  }

  snapshot();
  setInterval(snapshot, 1500);
})();
