const initialState = {
  toolbar: {}
}

export function toolbar(state = initialState, action) {
  switch (action.type) {
    case 'ITEM_DID_SCROLL':
      return {
        ...toolbar,
        isVisible: true
      }
    default:
      return state
  }
}

