import { combineReducers } from 'redux'
import { items, itemsHasErrored, itemsIsLoading } from './items'
import { currentItem } from './currentItem'
import { itemDidScroll } from './item'
import { toolbar } from './toolbar'

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  currentItem,
  itemDidScroll,
  toolbar
})
