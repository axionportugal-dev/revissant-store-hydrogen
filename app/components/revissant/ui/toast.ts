export type RevissantToastType = 'success' | 'info' | 'error';

export type RevissantToastPayload = {
  message: string;
  type?: RevissantToastType;
  durationMs?: number;
};

const EVENT_NAME = 'revissant:toast';

export function pushToast(payload: RevissantToastPayload) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, {detail: payload}));
}

export function onToast(handler: (payload: RevissantToastPayload) => void) {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => handler((e as CustomEvent).detail as RevissantToastPayload);
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
