"use client";

export function syncAuthToCookie() {
  try {
    const raw = localStorage.getItem("bt.auth");
    if (!raw) {
      document.cookie = `bt.auth=; path=/; max-age=0`;
      return;
    }
    // set session cookie with minimal info (no token for security); not used currently by server
    document.cookie = `bt.auth=1; path=/; max-age=3600`;
  } catch {
    // ignore
  }
}
