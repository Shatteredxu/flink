import Fetch from './Fetch.js'
const BASE_URL1 = 'http://localhost:6097'
export var POST =  (Url, data = {}, trueF, errorF = e => { }, timeout = 5000) => {
    Fetch(
         fetch(BASE_URL1 + Url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data
      })
        .then(  req => req.json())
        .then( re => {
            trueF(re)
        })
        .catch(e => {
          errorF(e)
        }),
      timeout
    )
  }