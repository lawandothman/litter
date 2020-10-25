import {
  LIKE_LITTER,
  SET_LITTERS,
  UNLIKE_LITTER,
  DELETE_LITTER,
  SET_LITTER,
  SUBMIT_COMMENT,
} from '../types'

export const setLitters = (dispatch) => (litters) => {
  dispatch({ type: SET_LITTERS, payload: litters })
}

export const setLitter = (dispatch) => (litter) => {
  dispatch({ type: SET_LITTER, payload: litter })
}

export const setComment = (dispatch) => (comment) => {
  dispatch({ type: SUBMIT_COMMENT, payload: comment })
}

export const setLike = (dispatch) => (litter) => {
  dispatch({ type: LIKE_LITTER, payload: litter })
}

export const setUnlike = (dispatch) => (litter) => {
  dispatch({ type: UNLIKE_LITTER, payload: litter })
}

export const setDelete = (dispatch) => (litterId) => {
  dispatch({ type: DELETE_LITTER, payload: litterId })
}
