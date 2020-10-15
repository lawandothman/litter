import { LOADING_UI } from '../types'

const initialState = {
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
