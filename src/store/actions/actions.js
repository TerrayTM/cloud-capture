import io from 'socket.io-client';

import * as actionTypes from './actionTypes';
import { apiEndpoint } from '../../config';

let socket = null;

export const connectToServer = () => {
    return async (dispatch, getState) => {
        try {
            socket = io.connect(apiEndpoint, {
                reconnection: false
            });
            socket.on('connect_error', () => dispatch(connectionFailed()));
            socket.on('disconnect', () => dispatch(connectionDisconnected()));
            socket.on('connect', () => dispatch(connectionSuccess())); 
            socket.on('updateOnlineUsers', (data) => {
                updateOnlineUsers(dispatch, data);
            });
            socket.on('updateFile', (fileName, fileType, data) => {
                updateFile(dispatch, getState, fileName, fileType, data);
            });
        } catch (error) {
            dispatch(connectionFailed());
        }
    };
};

export const joinRoom = (room) => {
    if (socket) {
        room = room.toUpperCase();
        socket.emit('joinRoom', room);
    }
    return {
        type: actionTypes.UPDATE_ROOM,
        room
    };
};

export const freeFiles = () => {
    return (dispatch, getState) => {
        getState().files.forEach(element => {
            window.URL.revokeObjectURL(element);
        });
        dispatch(clearFiles());
    };
};

const clearFiles = () => {
    return {
        type: actionTypes.CLEAR_FILES
    };
};

const connectionSuccess = () => {
    return {
        type: actionTypes.CONNECTION_SUCCESS,
    };
};

const connectionFailed = () => {
    return {
        type: actionTypes.CONNECTION_FAILED,
    };
};

const connectionDisconnected = () => {
    return {
        type: actionTypes.CONNECTION_DISCONNECTED,
    };
};

const updateOnlineUsers = (dispatch, data) => {
    dispatch({
        type: actionTypes.UPDATE_USERS,
        data
    });
};

const updateFile = (dispatch, getState, fileName, fileType, data) => {
    const files = getState().files;
    const file = new Blob([data], { type: 'octet/stream' });
    const path = window.URL.createObjectURL(file);
    for (let i = 0; i < files.length; ++i) {
        if (files[i].fileName === fileName && files[i].fileType === fileType) {
            window.URL.revokeObjectURL(files[i].path);
            dispatch({
                type: actionTypes.CHANGE_PATH,
                search: fileName,
                path
            });
            return;
        }
    }
    dispatch({
        type: actionTypes.UPDATE_FILES,
        data: {
            path,
            fileName,
            fileType
        }
    });
};