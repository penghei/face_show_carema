import {combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import musicLyric from './reducer/musicLyric'
import playingSong from './reducer/playingSong'
import playingList from './reducer/playingList'
import emotions from './reducer/emotions'

const Reducers = combineReducers({
    musicLyric,
    playingSong,
    playingList,
    emotions
})
export default createStore(Reducers,composeWithDevTools())