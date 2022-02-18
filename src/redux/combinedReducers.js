import {createStore, combineReducers} from 'redux';
import {searchInput} from './reducers/KeyReducer'

const rootReducer = combineReducers({
    searchInput,
})

const store = createStore(rootReducer)

export {store}