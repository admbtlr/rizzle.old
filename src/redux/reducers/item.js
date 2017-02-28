export function itemDidScroll(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.didScroll
    default:
      return state
  }
}
