
import { createStore,applyMiddleware,combineReducers}from 'redux'
import thunk from 'redux-thunk'
import { loginReducer } from './Reducer/loginReduer'

const rootReducer=combineReducers({
    loginReducer
})


export const store=createStore(rootReducer,applyMiddleware(thunk))

// console.log(store.getState())
