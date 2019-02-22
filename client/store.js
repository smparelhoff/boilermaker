import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducer'

const logger = createLogger()

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

export default store
