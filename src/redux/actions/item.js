import 'whatwg-fetch'

export const ITEM_DID_SCROLL = 'ITEM_DID_SCROLL'
export const ITEM_HAS_ERRORED = 'ITEM_HAS_ERRORED'
export const ITEM_IS_LOADING = 'ITEM_IS_LOADING'
export const ITEM_LOAD_MERCURY_STUFF_SUCCESS = 'ITEM_LOAD_MERCURY_STUFF_SUCCESS'

export function itemDidScroll(bool) {
  return {
    type: ITEM_DID_SCROLL,
    didScroll: bool
  };
}
export function itemHasErrored(bool) {
  return {
    type: ITEM_HAS_ERRORED,
    hasErrored: bool
  };
}
export function itemIsLoading(bool) {
  return {
    type: ITEM_IS_LOADING,
    isLoading: bool
  };
}
export function itemLoadMercuryStuffSuccess(item, mercuryStuff) {
  return {
    type: ITEM_LOAD_MERCURY_STUFF_SUCCESS,
    item,
    mercuryStuff
  };
}

export function itemLoadMercuryStuff(item) {
  const url = getMercuryUrl(item)
  return (dispatch) => {
    fetch(url, {
      headers: new Headers({
        'x-api-key': 'vTNatJB4JsgmfnKysiE9cOuJonFib4U9176DRF2z'
      })})
      .then((response) => response.json())
      .then((mercuryStuff) => dispatch(itemLoadMercuryStuffSuccess(item, mercuryStuff)))
      .catch(() => dispatch(itemsHasErrored(true)))
  }
}

function getMercuryUrl (item) {
  let url = '/api/mercury?url=' + encodeURIComponent(item.url)
  if (window.cordova) {
    url = 'https://mercury.postlight.com/parser?url='+encodeURIComponent(item.url)
  }
  return url
}
