const initialState = {
  items: []
}

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored
    default:
      return state
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading
    default:
      return state
  }
}

export function items(state = initialState, action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items
    case 'ITEM_MARK_READ_SUCCESS':
      // TODO actually we need to mark the item as read...
      return state
    case 'ITEM_LOAD_MERCURY_STUFF_SUCCESS':
      return state.map((item) => {
        if (item === action.item) {
          return addMercuryStuffToItem(item, action.mercuryStuff)
        } else {
          return item
        }
      })
    default:
      return state
  }
}

function addMercuryStuffToItem (item, mercury) {
  let content = mercury.content.length && mercury.content.length > item.body.length
    ? mercury.content
    : item.body
  return {
    ...item,
    leadImg: mercury.lead_image_url,
    body: content
  }
}