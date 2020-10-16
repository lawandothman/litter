import { SET_LITTERS, LIKE_LITTER, UNLIKE_LITTER, LOADING_DATA } from '../types'

const initialState = {
  litters: [],
  litter: {},
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_LITTERS:
      return {
        ...state,
        litters: action.payload,
        loading: false,
      }
    case LIKE_LITTER:
    case UNLIKE_LITTER:
      let index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload.litterId
      )
      state.litters[index] = action.payload
      return {
        ...state,
      }
    default:
      return state
  }
}
