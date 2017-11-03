import {createStore} from 'redux'
import combineReducers from '../reducers/index'

export default function configureStore(initialState){
    const store = createStore(combineReducers,initialState,
        window.devToolsExtension ? window.devToolsExtension() : undefined)
return store
}
