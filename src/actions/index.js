export const ActionTypes = {
    FETCHED_SIGNALS: 'FETCHED_SIGNALS',
    REQUESTED_SIGNALS: 'REQUESTED_SIGNALS',
    REQUESTED_SIGNALS_SUCCEEDED: 'REQUESTED_SIGNALS_SUCCEEDED',
    REQUESTED_SIGNALS_FAILED: 'REQUESTED_SIGNALS_FAILED',
};

export const fetchSignals = () => {
    return { type: ActionTypes.FETCHED_SIGNALS };
};

export const requestSignals = () => {
    return { type: ActionTypes.REQUESTED_SIGNALS };
};

export const requestSignalsSuccess = data => {
    return { type: ActionTypes.REQUESTED_SIGNALS_SUCCEEDED, data };
};

export const requestSignalsError = error => {
    return { type: ActionTypes.REQUESTED_SIGNALS_FAILED, error };
};
