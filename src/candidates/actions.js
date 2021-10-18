import {
  CREATE_CANDIDATE,
  RETRIEVE_CANDIDATES,
  UPDATE_CANDIDATE,
  DELETE_CANDIDATE,
} from "./actionTypes";

import CandidatesService from "./candidatesService";

export const createCandidate =
  (fullname, seniority, email, hired, phone, sex) => async (dispatch) => {
    try {
      console.log('TESt');
      const res = await CandidatesService.create({
        fullname, seniority, email, hired, phone, sex
      });
      await dispatch({
        type: CREATE_CANDIDATE,
        payload: res.data,
      });
      console.log('==>', res.data);
      return await Promise.resolve(res.data);
    } catch (err) {
      console.log(err)
      return Promise.reject(err);
    }
  };

export const retrieveCandidates = () => async (dispatch) => {
  try {
    const res = await CandidatesService.getAll();
    await dispatch({
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
    await dispatch({
      type: UPDATE_CANDIDATE,
      payload: data,
    });

    return await Promise.resolve(res.data);
  } catch (err) {
    console.log(err)
    return Promise.reject(err);
  }
};

export const deleteCandidate = (id) => async (dispatch) => {
  try {
    await CandidatesService.delete(id);
    await dispatch({
      type: DELETE_CANDIDATE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
