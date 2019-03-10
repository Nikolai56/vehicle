// @flow

export type Action =
    | { type: 'FETCHED_SIGNALS' }
    | { type: 'REQUESTED_SIGNALS' }
    | { type: 'REQUESTED_SIGNALS_SUCCEEDED', data: Object }
    | { type: 'REQUESTED_SIGNALS_FAILED', error: string }
    | { type: 'UPDATE_FILTERS', filteredIds: Array<number> }

export const ActionTypes = {
    FETCHED_SIGNALS: 'FETCHED_SIGNALS',
    REQUESTED_SIGNALS: 'REQUESTED_SIGNALS',
    REQUESTED_SIGNALS_SUCCEEDED: 'REQUESTED_SIGNALS_SUCCEEDED',
    REQUESTED_SIGNALS_FAILED: 'REQUESTED_SIGNALS_FAILED',
    UPDATE_FILTERS: 'UPDATE_FILTERS',
};

export const fetchSignals = (): Action  => {
    return { type: ActionTypes.FETCHED_SIGNALS };
};

export const requestSignals = (): Action  => {
    return { type: ActionTypes.REQUESTED_SIGNALS };
};

export const requestSignalsSuccess = (data: Object): Action  => {
    return { type: ActionTypes.REQUESTED_SIGNALS_SUCCEEDED, data };
};

export const requestSignalsError = (error: string): Action => {
    return { type: ActionTypes.REQUESTED_SIGNALS_FAILED, error };
};

export const updateFilters = (filteredIds: Array<number>): Action => {
    return { type: ActionTypes.UPDATE_FILTERS, filteredIds };
};
