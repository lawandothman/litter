import {
  SET_LITTERS,
  LIKE_LITTER,
  UNLIKE_LITTER,
  LOADING_DATA,
  DELETE_LITTER,
  SET_LITTER,
} from '../types'

const initialState = {
  litters: [],
  litter: {},
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA: {
      return {
        ...state,
        loading: true,
      }
    }
    case SET_LITTERS: {
      return {
        ...state,
        litters: action.payload,
        loading: false,
      }
    }
    case SET_LITTER: {
      return {
        ...state,
        litter: action.payload,
      }
    }
    case LIKE_LITTER:
    case UNLIKE_LITTER: {
      let index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload.litterId
      )
      state.litters[index] = action.payload
      if (state.litter.litterId === action.payload.litterId) {
        state.litter = action.payload
      }
      return {
        ...state,
      }
    }
    case DELETE_LITTER: {
      let index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload
      )
      state.litters.splice(index, 1)
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
