const initialState = {
  toolbar: {}
}

export function toolbar(state = initialState, action) {
  switch (action.type) {
    case 'ITEM_DID_SCROLL_UP':
      return {
        ...toolbar,
        isVisible: true
      }
    case 'ITEM_DID_SCROLL_DOWN':
      return {
        ...toolbar,
        isVisible: false
      }
    default:
      return state
  }
}

