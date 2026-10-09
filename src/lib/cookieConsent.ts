import { useSyncExternalStore } from 'react';

export type CookieChoice = 'accepted' | 'rejected';
const STORAGE_KEY = 'dana-cookie-consent';
const CHANGE_EVENT = 'cookie-consent-change';
let sessionChoice: CookieChoice | null = null;

export function readCookieChoice(): CookieChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'accepted' || saved === 'rejected' ? saved : null;
  } catch { return sessionChoice; }
}

export function saveCookieChoice(value: CookieChoice) {
  sessionChoice = value;
  try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* Keep this session's choice when storage is blocked. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

export function useMapsConsent() {
  return useSyncExternalStore(subscribe, () => readCookieChoice() === 'accepted', () => false);
}
