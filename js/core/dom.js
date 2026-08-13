export const $ = id => document.getElementById(id);
export const $$ = selector => [...document.querySelectorAll(selector)];

export function on(target, event, handler, options) {
  target?.addEventListener(event, handler, options);
}

export function ready(handler) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler, { once: true });
  } else {
    handler();
  }
}
