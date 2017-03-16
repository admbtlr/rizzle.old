import { itemsLoadMercuryStuff }  from '../actions/items.js'

const initialState = {
  items: [],
  index: 1
}

export function itemsHasErrored (state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored
    default:
      return state
  }
}

export function itemsIsLoading (state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading
    default:
      return state
  }
}

export function items (state = initialState, action) {
  let items = []
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      // TODO implement state.currentItem and state.currentIndex
      const currentItem = state.items[state.index]
      items = interleaveItems(state.items, action.items).filter((item) => !item.readAt)
      const index = items.indexOf(currentItem) === -1 ? 0 : items.indexOf(currentItem)
      return {
        ...state,
        items,
        index
      }
    case 'ITEM_MARK_READ_SUCCESS':
      // TODO actually we need to mark the item as read...
      let items = state.items
      items[state.index].readAt = Date.now()
      return {
        ...state,
        items
      }
    case 'ITEMS_UPDATE_CURRENT_INDEX':
      return {
        ...state,
        index: action.index
      }
    case 'ITEMS_KEEP_CURRENT_ITEM_UNREAD':
      let newItems = state.items
      newItems[state.index].keepUnread = true
      return {
        ...state,
        items: newItems
      }
    case 'ITEM_LOAD_MERCURY_STUFF_SUCCESS':
      items = state.items.map((item) => {
        if (item === action.item) {
          return addMercuryStuffToItem(item, action.mercuryStuff)
        } else {
          return item
        }
      })
      return {
        ...state,
        items
      }
    default:
      return state
  }
}

function mergeDedupe (oldItems, newItems) {
  let items = [...oldItems]
  newItems.forEach(function(item) {
    let exists = false
      oldItems.forEach(function(oldItem) {
      if (item.feed_item_id === oldItem.feed_item_id) {
        exists = true
          }
      })
    if (!exists) {
      items.push(item)
      }
  })
  return items
}

function prepareItems (items) {
  window.setTimeout(() => {
    items.forEach((item) => {
      if (!item.leadImg) {
        dispatch(itemsLoadMercuryStuff(item))
      }
    })
  }, 0)
  return items
}

function interleaveItems(oldItems, newItems, currentItem, currentIndex) {
  // TODO reset the currentIndex to wherever the currentItem now is
  let items = mergeDedupe(oldItems, newItems)
  items.sort((a, b) => a.published_at - b.published_at)
  return items
  // return mergeDedupe(oldItems, newItems)
  // return newItems
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