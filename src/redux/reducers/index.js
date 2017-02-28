import { combineReducers } from 'redux'
import { items, itemsHasErrored, itemsIsLoading } from './items'
import { itemDidScroll } from './item'
import { toolbar } from './toolbar'

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  itemDidScroll,
  toolbar
})