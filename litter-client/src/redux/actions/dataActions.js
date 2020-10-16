import { LIKE_LITTER, LOADING_DATA, SET_LITTERS } from '../types'

export const setLitters = (dispatch) => (litters) => {
  dispatch({ type: SET_LITTERS, payload: litters })
}

export const loadData = (dispatch) => () => {
  dispatch({ type: LOADING_DATA })
}
