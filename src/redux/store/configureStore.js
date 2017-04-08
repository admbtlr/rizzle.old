import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import PouchDB from 'pouchdb'
import PouchMiddleware from 'pouch-redux-middleware'
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite'

// is this a good thing to do?
import {itemsFetchDataSuccess} from '../actions/items'

export default function configureStore (initialState) {

  let store
  let db
  if (window.cordova) {
    PouchDB.plugin(cordovaSqlitePlugin)
    db = new PouchDB('rizzle', {adapter: 'cordova-sqlite'})
  } else {
    db = new PouchDB('rizzle')
  }

  window.PouchDB = PouchDB
  window.db = db

  const pouchMiddleware = PouchMiddleware({
    path: '/items/items',
    db,
    actions: {
      remove: doc => { return { type: 'DELETE_ITEM', id: doc._id } },
      insert: doc => { return { type: 'INSERT_ITEM', item: doc } },
      update: doc => { return { type: 'UPDATE_ITEM', item: doc } }
    }
  })

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  db.allDocs({
    include_docs: true
  }).then(function (result) {
    let items = result.rows.map(function (row) {
      return row.doc
    })
    store.dispatch(itemsFetchDataSuccess(items))
  })

  store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      // applyMiddleware(thunk),
      // applyMiddleware(pouchMiddleware)
      applyMiddleware(thunk, pouchMiddleware)
    )
  )

  return store

  // return createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(thunk)
  // )
}
