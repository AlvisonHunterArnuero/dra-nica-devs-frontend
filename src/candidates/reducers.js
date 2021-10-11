import {
  CREATE_CANDIDATE,
  RETRIEVE_CANDIDATES,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
} from "./actionTypes";

const initialState = [];

function candidateReducer(candidates = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CANDIDATE:
      return [...candidates, payload];

    case RETRIEVE_CANDIDATES:
      return payload;

    case UPDATE_CANDIDATE:
      return candidates.map((candidate) => {
        if (candidate.id === payload.id) {
          return {
            ...candidate,
            ...payload,
          };
        } else {
          return candidate;
        }
      });

    case DELETE_CANDIDATE:
      return candidates.filter(({ id }) => id !== payload.id);

    default:
      return candidates;
  }
}

export default candidateReducer;
