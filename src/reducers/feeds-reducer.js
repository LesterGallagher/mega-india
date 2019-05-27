export default (state = {
    feeds: [],
    fetching: false,
    fetched: false,
    error: null
}, action) => {
    switch (action.type) {
        case 'FETCH_FEED': {
            return { ...state, fetching: true };
        }
        case 'FETCH_FEED_REJECTED': {
            return { ...state, fetching: false, error: action.payload };
        }
        case 'FETCH_FEED_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                feeds: [...state.feeds, action.payload]
            };
        }
        default: return state;
    }
};