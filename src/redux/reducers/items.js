export const initialState = {
  items: [
    {
      feed_item_id: 9999999999,
      published_at: 9999999999,
      feed_name: 'rizzle',
      url: '',
      title: 'Oh noes! Nothing else to read.',
      author: '',
      body: '<a href="">Load more</a>',
      _id: '9999999999'
    }
  ],
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
  let items = [], newItems = []
  switch (action.type) {
    case 'UPDATE_ITEM':
      newItems = state.items.map(item =>
        item._id === action.item._id ?
          action.item :
          item
      )
      return {
        ...state,
        items: newItems
      }

    case 'INSERT_ITEM':
      if (action.item._id === '9999999999') {
        return state
      }
      return {
        ...state,
        items: [
          action.item,
          ...state.items
        ]
      }

    case 'ITEMS_FETCH_DATA_SUCCESS':
      const currentItem = state.items[state.index]
      items = interleaveItems(state.items, action.items).filter((item) => !item.readAt)
      const index = items.indexOf(currentItem) === -1 ? 0 : items.indexOf(currentItem)
      return {
        ...state,
        items,
        index
      }

    case 'ITEM_MARK_READ_SUCCESS':
      items = state.items
      items[state.index].readAt = Date.now()
      return Object.assign({}, state, { items })
    case 'ITEMS_UPDATE_CURRENT_INDEX':
      return {
        ...state,
        index: action.index
      }
    case 'ITEMS_KEEP_CURRENT_ITEM_UNREAD':
      newItems = state.items
      newItems[state.index].keepUnread = true
      return {
        ...state,
        items: newItems
      }
    case 'ITEM_LOAD_MERCURY_STUFF_SUCCESS':
      items = state.items.map((item) => {
        if (item._id === action.item._id) {
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
  let items = []
  let keepUnread = oldItems.filter((item) => item.keepUnread)

  // go through new items, replacing new ones with matching old ones (to get Mercury stuff)
  // add any unread old items
  newItems.forEach(function(newItem) {
    let match = false
    oldItems.forEach(function(oldItem) {
      if (newItem.feed_item_id === oldItem.feed_item_id) {
        match = oldItem
      }
    })
    items.push(match || newItem)
  })

  oldItems.forEach(function(oldItem) {
    if (!items.find((item) => item.feed_item_id === oldItem.feed_item_id)) {
      items.push(oldItem)
    }
  })

  return items
}

function interleaveItems(oldItems, newItems) {
  let items = mergeDedupe(oldItems, newItems).map(function(item) {
    return {
      ...item,
      _id: item._id ? item._id : id()
    }
  })
  items.sort((a, b) => a.published_at - b.published_at)
  return items
}

function id() {
  return Math.random().toString(36).substring(7)
}

function removeReadItems(items) {
  const now = Date.now()
  items.filter((item) => {
    return !(item.markRead && item.markRead - now > 1000*60*60*24)
  })
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