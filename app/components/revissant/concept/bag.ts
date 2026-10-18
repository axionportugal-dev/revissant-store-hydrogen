import {useSyncExternalStore} from 'react';
import {getConceptProduct, type ConceptProduct} from './catalog';

/**
 * Saco local para os produtos de conceito (não existem na Shopify, por isso
 * não podem ir para o cart real). Persistido em localStorage por visitante.
 */

export type ConceptBagLine = {
  handle: string;
  finish?: string;
  quantity: number;
};

const STORAGE_KEY = 'revissant:concept-bag';
const EMPTY: ConceptBagLine[] = [];

let lines: ConceptBagLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as ConceptBagLine[]) : [];
    lines = Array.isArray(parsed)
      ? parsed.filter((l) => getConceptProduct(l.handle) && l.quantity > 0)
      : [];
  } catch {
    lines = [];
  }
}

function commit(next: ConceptBagLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage indisponível: o saco continua a funcionar nesta sessão
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return lines;
}

export function useConceptBag() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export function addToConceptBag(
  product: ConceptProduct,
  finish?: string,
  quantity = 1,
) {
  hydrate();
  const idx = lines.findIndex(
    (l) => l.handle === product.handle && l.finish === finish,
  );
  if (idx >= 0) {
    const next = [...lines];
    next[idx] = {...next[idx], quantity: next[idx].quantity + quantity};
    commit(next);
  } else {
    commit([...lines, {handle: product.handle, finish, quantity}]);
  }
}

export function updateConceptBagLine(index: number, quantity: number) {
  hydrate();
  if (quantity <= 0) {
    commit(lines.filter((_, i) => i !== index));
    return;
  }
  const next = [...lines];
  next[index] = {...next[index], quantity};
  commit(next);
}

export function getConceptBagTotals(bag: ConceptBagLine[]) {
  let quantity = 0;
  let subtotal = 0;
  for (const line of bag) {
    const product = getConceptProduct(line.handle);
    if (!product) continue;
    quantity += line.quantity;
    subtotal += product.price * line.quantity;
  }
  return {quantity, subtotal};
}
