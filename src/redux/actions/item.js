import 'whatwg-fetch'

export const ITEM_DID_SCROLL_UP = 'ITEM_DID_SCROLL_UP'
export const ITEM_DID_SCROLL_DOWN = 'ITEM_DID_SCROLL_DOWN'
export const ITEM_HAS_ERRORED = 'ITEM_HAS_ERRORED'
export const ITEM_IS_LOADING = 'ITEM_IS_LOADING'

let scrollPosition = 0

export function itemDidScroll (event) {
  let lastScrollPosition = scrollPosition
  // TODO!
  scrollPosition = document.querySelectorAll('[aria-hidden="false"]')[0].scrollTop
  if (scrollPosition < lastScrollPosition) {
    return {
      type: ITEM_DID_SCROLL_UP
    }
  } else {
    return {
      type: ITEM_DID_SCROLL_DOWN
    }
  }
}
export function itemHasErrored (bool) {
  return {
    type: ITEM_HAS_ERRORED,
    hasErrored: bool
  }
}
export function itemIsLoading (bool) {
  return {
    type: ITEM_IS_LOADING,
    isLoading: bool
  };
}
