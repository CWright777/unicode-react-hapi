import fetch from 'isomorphic-fetch';

const url = 'http://localhost:3000/'

export const sendGetRequest = (uri) => {
  return (
    fetch(`${url}${uri}`, {
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    })
    .catch( err => {
      //TODO: Handle no network connection
      console.log(err)
    })
  )
}

export const sendPostRequest = (uri,payload) => {
  return (
    fetch(`${url}${uri}`, {
      mode: 'cors',
      method: 'post',
      body: JSON.stringify(payload),
      dataType: 'json',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .catch( err => {
      //TODO: Handle no network connection
      console.log(err)
    })
  )
}

export const sendDeleteRequest = (uri) => {
  return (
    fetch(`${url}${uri}`, {
      mode: 'cors',
      method: 'delete',
      //body: JSON.stringify(payload),
      dataType: 'json',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .catch( err => {
      //TODO: Handle no network connection
      console.log(err)
    })
  )
}
