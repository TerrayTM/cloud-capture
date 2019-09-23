import * as actionTypes from '../actions/actionTypes';

const apply = (state, newState) => {
    return {
        ...state,
        ...newState
    };
};

const initalState = {
    connected: false,
    error: false,
    onlineUsers: 0,
    files: [],
    roomCode: null
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.CONNECTION_SUCCESS: return state.error ? state : apply(state, { connected: true });
        case actionTypes.CONNECTION_DISCONNECTED: return apply(state, { connected: false, error: true });
        case actionTypes.CONNECTION_FAILED: return apply(state, { connected: false, error: true });
        case actionTypes.UPDATE_USERS: return apply(state, { onlineUsers: action.data });
        case actionTypes.UPDATE_FILES: return apply(state, { files: state.files.concat([action.data]) });
        case actionTypes.UPDATE_ROOM: return apply(state, { roomCode: action.room });
        case actionTypes.CLEAR_FILES: return apply(state, { files: [] });
        case actionTypes.CHANGE_PATH:
            const copy = state.files.map((i) => {
                return {
                    path: action.search === i.fileName ? action.path : i.path,
                    fileName: i.fileName,
                    fileType: i.fileType
                };
            });
            return apply(state, { files: copy });
        default: return state;
    }
};

export default reducer;