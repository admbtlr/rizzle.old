import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import PouchDB from 'pouchdb'
import { persistentStore } from 'redux-pouchdb'

export default function configureStore (initialState) {
  const db = new PouchDB('rizzle')

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      persistentStore(db)
    )
  )
}
