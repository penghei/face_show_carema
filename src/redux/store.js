import {combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import musicLyric from './reducer/musicLyric'
import playingSong from './reducer/playingSong'
import playingList from './reducer/playingList'

const Reducers = combineReducers({
    musicLyric,
    playingSong,
    playingList
})
export default createStore(Reducers,composeWithDevTools())