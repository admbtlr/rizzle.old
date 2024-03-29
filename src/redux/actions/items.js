import 'whatwg-fetch'

export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED'
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING'
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS'
export const ITEM_MARK_READ_SUCCESS = 'ITEM_MARK_READ_SUCCESS'

const feedWranglerAccessToken = '07de039941196f956e9e86e202574419'
const itemsFetchBatchSize = 100

export function itemsHasErrored (bool) {
  return {
    type: ITEMS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function itemHasErrored (bool) {
  return {
    type: 'ITEM_HAS_ERRORED',
    hasErrored: bool
  }
}

export function itemsIsLoading (bool) {
  return {
    type: ITEMS_IS_LOADING,
    isLoading: bool
  }
}

export function itemsKeepCurrentItemUnread () {
  return {
    type: 'ITEMS_KEEP_CURRENT_ITEM_UNREAD'
  }
}

export function itemsFetchDataSuccess (items) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items
  }
}

export function itemMarkReadSuccess (item) {
  return {
    type: ITEM_MARK_READ_SUCCESS,
    item
  }
}

export function itemsUpdateCurrentIndex (index) {
  return {
    type: 'ITEMS_UPDATE_CURRENT_INDEX',
    index
  }
}

export function itemsFetchData (page) {
  page = page || 0
  const url = getUnreadItemsUrl(page)
  return (dispatch) => {
    dispatch(itemsIsLoading(true))
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          dispatch(itemsIsLoading(false))
          receiveData(dispatch, response, page)
        }
      })
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}

function receiveData (dispatch, response, page) {
  response.json()
    .then((feed) => {
      const items = feed.feed_items
      if (items.length === itemsFetchBatchSize) {
        dispatch(itemsFetchData(page + 1))
      }
      dispatch(itemsFetchDataSuccess(items))
    })
    .catch(() => dispatch(itemsHasErrored(true)))
}

function getUnreadItemsUrl (page) {
  let url = '/api/unread?thing=1'
  if (window.cordova) {
    url = 'https://feedwrangler.net/api/v2/feed_items/list?read=false&access_token=' + feedWranglerAccessToken
  }
  if (page > 0) {
    url += '&offset=' + (page * itemsFetchBatchSize)
  }
  return url
}

export function itemsLoadMercuryStuffSuccess (item, mercuryStuff) {
  return {
    type: 'ITEM_LOAD_MERCURY_STUFF_SUCCESS',
    item,
    mercuryStuff
  }
}

export function itemsLoadMercuryStuff (item) {
  const url = getMercuryUrl(item)
  item.hasLoadedMercuryStuff = true
  return (dispatch) => {
    fetch(url, {
      headers: new Headers({
        'x-api-key': 'vTNatJB4JsgmfnKysiE9cOuJonFib4U9176DRF2z'
      })})
      .then((response) => response.json())
      .then((mercuryStuff) => dispatch(itemsLoadMercuryStuffSuccess(item, mercuryStuff)))
      .catch(() => dispatch(itemHasErrored(true)))
  }
}

function getMercuryUrl (item) {
  let url = '/api/mercury?url=' + encodeURIComponent(item.url)
  if (window.cordova) {
    url = 'https://mercury.postlight.com/parser?url='+encodeURIComponent(item.url)
  }
  return url
}

export function itemMarkRead (item) {
  if (!item.keepUnread) {
    const url = getMarkReadUrl(item)
    return (dispatch) => {
      dispatch(itemsIsLoading(true))
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          dispatch(itemsIsLoading(false))
          return response
        })
        .then((response) => response.json())
        .then((json) => dispatch(itemMarkReadSuccess(json)))
        .catch(() => dispatch(itemsHasErrored(true)));
    }
  }
}

function getMarkReadUrl (item) {
  let url = '/api/markread?'
  if (window.cordova) {
    url = 'https://feedwrangler.net/api/v2/feed_items/update?'
  }
  url += 'access_token=' + feedWranglerAccessToken
  url += '&feed_item_id=' + item.feed_item_id
  url += '&read=true'
  return url
}
