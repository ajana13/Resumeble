import { SET_UPLOAD_RESUME } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    documents: {},
    loading: false,
    text: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_UPLOAD_RESUME:
        return {
            ...state,
            documents: action.payload,
            loading: true
        };
    default:
      return state;
  }
}
