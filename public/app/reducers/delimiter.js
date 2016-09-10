import {
  SENT_REQUEST_PENDING,
  SENT_REQUEST_FULFILLED,
  PROPERTY_RELATION_INFO_FULFILLED,
  SHOW_SELECTED_DELIMITER_INFO,
  DELIMITER_CREATION_FULLFILLED
} from '../actions/delimiters/types';
import CountryLanguage from 'country-language';

const defaultState = {
  delimiters: [],
  properties: [],
  propertyRelationInfo: [],
  property: {},
  isRelationalTabsHidden: true
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
      .filter((val,id,arr) => arr.indexOf(val) == id)
      .map((property)=>{
        return {
          label:property.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
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
    case SHOW_SELECTED_DELIMITER_INFO:
      const { selectedDelimiter } = action

      const languages = selectedDelimiter.delimiter.locales.map((locale, i) => {
        const langNamesArr = CountryLanguage.getLanguage(locale.language.name).name
        return langNamesArr ? langNamesArr[0] : undefined
      })
      .filter((val,id,arr) => (arr.indexOf(val) == id && val != undefined))

      const territories = selectedDelimiter.delimiter.locales.map((locale, i) => {
        const terrCode = locale.territory ? locale.territory.name : ""
        const terrNamesArr = CountryLanguage.getCountry(terrCode).name
        return terrNamesArr
      })
      .filter((val,id,arr) => (arr.indexOf(val) == id && val != undefined))

      const scripts = selectedDelimiter.delimiter.locales.map((locale, i) => {
        const scriptName = locale.script ? locale.script.name : undefined;
        return scriptName
      })
      .filter((val,id,arr) => (arr.indexOf(val) == id && val != undefined))

      return Object.assign({}, state, {
        isRelationalTabsHidden: false,
        selectedDelimiter: selectedDelimiter.delimiter,
        languages,
        territories,
        scripts
      })
    case DELIMITER_CREATION_FULLFILLED:
      //console.log(action)


    default:
      return state;
  }
}
