import {createStore, combineReducers} from 'redux';
import { compareCar1 } from './reducers/compareCar1';
import { compareCar2 } from './reducers/compareCar2';

const rootReducer = combineReducers({
    compareCar1,
    compareCar2
})

const store = createStore(rootReducer)

export {store}