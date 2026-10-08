export const MAX_QTY = 10;
export const clamp = (n) => Math.min(MAX_QTY, Math.max(1, n));

/**
 * Pure cart reducer:
 * Maps productId -> quantity. Clamped between 1 and 10.
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        [action.id]: clamp((state[action.id] ?? 0) + (action.qty ?? 1)),
      };
    case 'SET_QTY':
      return {
        ...state,
        [action.id]: clamp(action.qty),
      };
    case 'REMOVE': {
      const { [action.id]: _, ...rest } = state;
      return rest;
    }
    case 'CLEAR':
      return {};
    case 'HYDRATE':
      return action.state || {};
    default:
      return state;
  }
}
