export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED'
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING'
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS'
export const ITEM_MARK_READ_SUCCESS = 'ITEM_MARK_READ_SUCCESS'

let feedWranglerAccessToken = '07de039941196f956e9e86e202574419'

export function itemsHasErrored(bool) {
  return {
    type: ITEMS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
    type: ITEMS_IS_LOADING,
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items
  };
}
export function itemMarkReadSuccess(item) {
  return {
    type: ITEM_MARK_READ_SUCCESS,
    item
  };
}

export function itemsFetchData() {
  const url = getUnreadItemsUrl()
  return (dispatch) => {
    dispatch(itemsIsLoading(true))
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((feed) => dispatch(itemsFetchDataSuccess(feed.feed_items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

function getUnreadItemsUrl () {
  let url = '/api/unread'
  if (window.cordova) {
    url = 'https://feedwrangler.net/api/v2/feed_items/list?read=false&access_token=' + feedWranglerAccessToken
  }
  return url
}

export function itemMarkRead (item) {
  const url = getMarkReadUrl(item)
  return (dispatch) => {
    dispatch(itemsIsLoading(true))
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((json) => dispatch(itemMarkReadSuccess(json)))
      .catch(() => dispatch(itemsHasErrored(true)));
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