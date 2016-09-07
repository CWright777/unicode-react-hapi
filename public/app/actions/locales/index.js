import {
  SENT_REQUEST_PENDING,
  SENT_REQUEST_FULFILLED
} from './types';
import { sendGetRequest } from '../../services/api';
import qs from 'qs';

export const sendRequest = () => {
  return {
    type: SENT_REQUEST_PENDING,
  }
}

export const receiveRequest = (json) => {
  return {
    type: SENT_REQUEST_FULFILLED,
    delimiters: json
  }
}

export const getLocaleByDelimiterName = (delimiterName) => {
  return (dispatch) => {
    dispatch(sendRequest())

    const queryObj = {
      delimiters: {
        name: delimiterName
      }
    }

    const query = qs.stringify(queryObj);

    sendGetRequest(`locale/${query}`)
    .then(response => response.json())
    .then(json => dispatch(receiveRequest(json.locales)))
  }
}
