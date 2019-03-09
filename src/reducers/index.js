import { ActionTypes } from '../actions';

const initialState = {
    data: undefined,
    isLoading: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.REQUESTED_SIGNALS:
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    case ActionTypes.REQUESTED_SIGNALS_SUCCEEDED:
        return {
            ...state,
            data: action.data,
            isLoading: false,
        };
    case ActionTypes.REQUESTED_SIGNALS_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    default:
        return state;
    }
};

export default reducer;
