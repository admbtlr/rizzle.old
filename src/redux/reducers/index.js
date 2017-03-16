import { combineReducers } from 'redux'
import { persistentReducer } from 'redux-pouchdb'
import { items, itemsHasErrored, itemsIsLoading } from './items'
import { currentItem } from './currentItem'
import { itemDidScroll } from './item'
import { toolbar } from './toolbar'

export default persistentReducer(combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  currentItem,
  itemDidScroll,
  toolbar
}))
