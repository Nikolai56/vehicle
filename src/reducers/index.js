// @flow
import { type Action, ActionTypes } from '../actions';

type State = {
    filteredIds: Array<number>,
    signals: Object,
    isLoading: boolean,
    error: string,
};

const initialState: State = {
    filteredIds: [],
    signals: undefined,
    isLoading: true,
    error: '',
};

const reducer = (state: State = initialState, action: Action) => {
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
            signals: action.data,
            isLoading: false,
        };
    case ActionTypes.REQUESTED_SIGNALS_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    case ActionTypes.UPDATE_FILTERS:
        return {
            ...state,
            filteredIds: action.filteredIds,
        };
    default:
        return state;
    }
};

export default reducer;
