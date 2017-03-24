import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import PouchDB from 'pouchdb'
import { persistentStore } from 'redux-pouchdb'

export default function configureStore (initialState) {

  let db
  if (window.cordova) {
    PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'))
    db = new PouchDB('rizzle', {adapter: 'cordova-sqlite'})
  } else {
    db = new PouchDB('rizzle')
  }


  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      persistentStore(db)
    )
  )
}
