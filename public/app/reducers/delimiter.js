import {
  SENT_REQUEST_PENDING,
  SENT_REQUEST_FULFILLED,
  PROPERTY_RELATION_INFO_FULFILLED,
} from '../actions/delimiters/types';

const defaultState = {
  delimiters: [],
  properties: [],
  propertyRelationInfo: [],
  property: {}
}

export default function delimiter(state = defaultState, action) {
  switch (action.type) {
    case SENT_REQUEST_PENDING:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case SENT_REQUEST_FULFILLED:
      const { delimiters } = action;

      //TODO: Clean up reducer especially chanined function
      const properties = delimiters
      .map((delimiter)=>delimiter.property)
      .filter((val,id,array) => array.indexOf(val) == id)
      .map((property)=>{
        return {
          label:property.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }),
          value:property
        }
      })

      return Object.assign({}, state, {
        isFetching: false,
        delimiters,
        properties,
      })
    case PROPERTY_RELATION_INFO_FULFILLED:
      const { propertyRelationInfo, property } = action

      return Object.assign({}, state, {
        propertyRelationInfo,
        property
      })
    default:
      return state;
  }
}
