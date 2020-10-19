import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import dataReducer from './reducers/dataReducer'
import userReducer from './reducers/userReducer'
import { loadState } from '../util/localStorage'

const persistedState = loadState()

const middleware = [thunk]

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
})

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
