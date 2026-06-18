function hasExtensionStorage() {
  try {
    return typeof chrome !== "undefined" && Boolean(chrome.runtime?.id) && Boolean(chrome.storage?.local);
  } catch {
    return false;
  }
}

function getLocalStorageValue<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalStorageValue<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in invalidated or restricted contexts.
  }
}

export function safeStorageGet<T>(key: string, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    if (!hasExtensionStorage()) {
      resolve(getLocalStorageValue(key, fallback));
      return;
    }

    try {
      chrome.storage.local.get(key, (result) => {
        try {
          if (chrome.runtime.lastError) {
            resolve(getLocalStorageValue(key, fallback));
            return;
          }

          resolve((result[key] as T | undefined) ?? fallback);
        } catch {
          resolve(getLocalStorageValue(key, fallback));
        }
      });
    } catch {
      resolve(getLocalStorageValue(key, fallback));
    }
  });
}

export function safeStorageSet<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve) => {
    if (!hasExtensionStorage()) {
      setLocalStorageValue(key, value);
      resolve();
      return;
    }

    try {
      chrome.storage.local.set({ [key]: value }, () => {
        try {
          if (chrome.runtime.lastError) {
            setLocalStorageValue(key, value);
          }
        } catch {
          setLocalStorageValue(key, value);
        }

        resolve();
      });
    } catch {
      setLocalStorageValue(key, value);
      resolve();
    }
  });
}
