import { useEffect } from 'react';

/**
 * Custom hook to listen for keyboard shortcuts (e.g., 'k' with Cmd/Ctrl or 'Escape').
 *
 * @param {string} key - Target key, e.g. 'k', 'Escape'
 * @param {Function} callback - Callback to invoke
 * @param {Object} [options]
 * @param {boolean} [options.withCtrlOrCmd=false] - Whether Ctrl or Meta must be pressed
 * @param {boolean} [options.preventDefault=true] - Whether to call event.preventDefault()
 */
export function useHotkey(key, callback, { withCtrlOrCmd = false, preventDefault = true } = {}) {
  useEffect(() => {
    const handler = (e) => {
      const isKeyMatch = e.key.toLowerCase() === key.toLowerCase();
      const isModifierMatch = withCtrlOrCmd ? (e.metaKey || e.ctrlKey) : true;

      if (isKeyMatch && isModifierMatch) {
        if (preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, withCtrlOrCmd, preventDefault]);
}
