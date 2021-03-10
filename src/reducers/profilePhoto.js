import { GET_PROFILE_PHOTO, GET_ALL_PROFILE_PHOTOS, PHOTO_ERROR } from "../actions/types";

const initialState = {
  profilePhotos: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROFILE_PHOTOS:
      return {
        error: {},
        profilePhotos: payload,
        // photos: [...state.photos, payload],
        loading: false
      }
    case GET_PROFILE_PHOTO:
      return {
        error: {},
        profilePhotos: [...state.profilePhotos, ...payload],
        loading: false
      }
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
