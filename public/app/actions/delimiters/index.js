import qs from 'qs';
import {
  SENT_REQUEST_PENDING,
  SENT_REQUEST_FULFILLED,
  PROPERTY_RELATION_INFO_FULFILLED,
  SHOW_SELECTED_DELIMITER_INFO,
  DELIMITER_CREATION_FULLFILLED
} from './types';
import { sendGetRequest, sendPostRequest, sendDeleteRequest } from '../../services/api';

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

export const getDelimiters = () => {
  return (dispatch) => {
    dispatch(sendRequest())
    sendGetRequest(`delimiter`)
    .then(response => response.json())
    .then(json => dispatch(receiveRequest(json.delimiters)))
  }
}

export const receivePropertyRelationInfo = (json,property) => {
  const propertyRelationInfo = json.delimiters
  return {
      type: PROPERTY_RELATION_INFO_FULFILLED,
      propertyRelationInfo,
      property: property
  }
}

export const getPropertyRelationInfo = (property) => {
  const query = qs.stringify({property: property.value})

  return (dispatch) => {
    dispatch(sendRequest())
    sendGetRequest(`delimiter?${query}`)
    .then(response => response.json())
    .then(json => dispatch(receivePropertyRelationInfo(json,property)))
  }
}

export const toggleShowRelationalTabs = (selectedDelimiter) => {
  return {
    type: SHOW_SELECTED_DELIMITER_INFO,
    selectedDelimiter
  }
}

export const getSingleDelimiterInfo = (delimiterId) => {
  return (dispatch) => {
    dispatch(sendRequest())
    sendGetRequest(`delimiter/${delimiterId}/`)
    .then(response => response.json())
    .then(json => dispatch(toggleShowRelationalTabs(json)))
  }
}

export const receiveNewDelimiter = (createdDelimiter) => {
  return {
    type: DELIMITER_CREATION_FULLFILLED,
    createdDelimiter
  }
}

export const createNewDelimiter = (delimiterInfo) => {
  return (dispatch) => {
    dispatch(sendRequest())
    sendPostRequest('delimiter' ,delimiterInfo)
    .then(response => response.json())
    .then(json => dispatch(receiveNewDelimiter(json)))
  }
}

export const deleteDelimiter = (property) => {
  return (dispatch) => {
    dispatch(sendRequest())
    sendDeleteRequest(`delimiter/${property}`)
    .then(response => response.json())
    .then((json)=>console.log(json))
    //.then(json => dispatch(receiveNewDelimiter(json)))
  }
}
