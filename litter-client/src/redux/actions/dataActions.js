import {
  LIKE_LITTER,
  LOADING_DATA,
  SET_LITTERS,
  UNLIKE_LITTER,
  DELETE_LITTER,
} from '../types'

export const setLitters = (dispatch) => (litters) => {
  dispatch({ type: SET_LITTERS, payload: litters })
}

export const loadData = (dispatch) => () => {
  dispatch({ type: LOADING_DATA })
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
