import {
  CREATE_CANDIDATE,
  RETRIEVE_CANDIDATES,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
} from "./actionTypes";

import CandidatesService from "./candidatesService";

export const createCandidate =
  (fullname, seniority, email, hired, age, sex) => async (dispatch) => {
    try {
      const res = await CandidatesService.create({
        fullname, seniority, email, hired, age, sex
      });

      dispatch({
        type: CREATE_CANDIDATE,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveCandidates = () => async (dispatch) => {
  try {
    const res = await CandidatesService.getAll();
    dispatch({
      type: RETRIEVE_CANDIDATES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCandidate = (id, data) => async (dispatch) => {
  try {
    const res = await CandidatesService.update(id, data);
    dispatch({
      type: UPDATE_CANDIDATE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCandidate = (id) => async (dispatch) => {
  try {
    await CandidatesService.delete(id);
    dispatch({
      type: DELETE_CANDIDATE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
