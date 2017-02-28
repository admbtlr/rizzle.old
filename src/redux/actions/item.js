export const ITEM_DID_SCROLL = 'ITEM_DID_SCROLL'

export function itemDidScroll(bool) {
  return {
    type: ITEM_DID_SCROLL,
    didScroll: bool
  };
}