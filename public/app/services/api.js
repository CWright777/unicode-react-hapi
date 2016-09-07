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
