import { useReducer } from 'react';

/*
 * React's setState calls do not seem to be batched, which means,
 * each call to setState for multiple state values will trigger
 * a re-render of associated components (which is often not ideal).
 * Hence, we made this so we can update multiple state values
 * in one batch (just like the good ole this.setState).
 */

const reducer = (state, nextState) => ({
	...state,
	...nextState
});

export default function useBatchState(initialState) {
	return useReducer(reducer, initialState);
}
