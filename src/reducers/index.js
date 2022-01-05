import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ui from './ui';
import player from './player';
import playlist from './playlist';

export default (history) => combineReducers({
    router: connectRouter(history),
    player, ui, playlist
});