import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { nodesSamplesReducer } from './reducers'

const reduxStore = {
  nodesSamplesReducer
}
const reducer = combineReducers(reduxStore)
const middlewares = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))

export type GlobalState = typeof reduxStore
export default store