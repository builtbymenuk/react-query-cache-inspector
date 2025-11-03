(function () {
  function findQueryClient() {
    for (const key of Object.keys(window)) {
      try {
        const val = window[key];
        if (val && typeof val.getQueryCache === "function") return val;
      } catch (_) {}
    }
    return null;
  }

  const queryClient = findQueryClient();
  if (!queryClient) {
    console.warn("[RQ Inspector] QueryClient not found");
    return;
  }

  function snapshot() {
    const queries = queryClient
      .getQueryCache()
      .getAll()
      .map((q) => ({
        key: q.queryKey,
        status: q.state.status,
        data: q.state.data,
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
  }

  snapshot();
  setInterval(snapshot, 2000);
})();
