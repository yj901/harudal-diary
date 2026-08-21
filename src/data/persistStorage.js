export const requestPersistentStorage = async () => {
  try {
    if (!navigator.storage?.persist) return;
    const persisted = await navigator.storage.persisted();
    if (!persisted) {
      await navigator.storage.persist();
    }
  } catch {
    // persist is best-effort
  }
};
