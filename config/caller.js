import axios from '../plugins/axios'
import config from './index'

//axios.defaults.baseURL = config.LMS_HOST
//axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  //Needed for mobile devices epub reader view

  get (url, authToken, langCode='en', acceptType, arrayBuffer, platform) {
    if(authToken === false){
        delete axios.defaults.headers.common['Authorization'];
    } else axios.defaults.headers.common['Authorization'] = authToken;

    axios.defaults.headers.common['Accept-Language'] = langCode

    if(acceptType)
      axios.defaults.headers.common['Accept'] = acceptType

    if(platform)
      axios.defaults.headers.common['platform'] = platform

    if(arrayBuffer)
      return new Promise((resolve, reject) => {
        if(axios.defaults.headers.common['platform'])
          delete axios.defaults.headers.common['platform']
        axios.get(url, {responseType: 'arraybuffer', headers:{}}).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err)
        })
      })
    else {
      return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
          if(platform)
            delete axios.defaults.headers.common['platform']
          resolve(res);
        }).catch(err => {
          if(platform)
            delete axios.defaults.headers.common['platform']
          reject(err)
        })
      })
    }
  },
  getBody (url, authToken, langCode='en', body) {

    if(authToken === false){
      delete axios.defaults.headers.common['Authorization'];
    } else axios.defaults.headers.common['Authorization'] = authToken;
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.get(url,body)
  },
  post (url, authToken, langCode, body, platform) {
    axios.defaults.headers.common['Authorization'] = authToken
    axios.defaults.headers.common['Accept-Language'] = langCode

    if(platform)
      axios.defaults.headers.common['platform'] = platform

    return new Promise((resolve, reject) => {
      axios.post(url, body).then(res => {
        if(platform)
          delete axios.defaults.headers.common['platform']
        resolve(res);
      }).catch(err => {
        if(platform)
          delete axios.defaults.headers.common['platform']
        reject(err)
      })
    })
  },
  put (url, authToken, langCode, body) {
    axios.defaults.headers.common['Authorization'] = authToken
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.put(url, body)
  },
  putS3 (url, file, fileType) {
    axios.defaults.headers.common['Content-Type'] = fileType
    return axios.put(url, file)
  },
  postfile (url,authToken,langCode, file) {
    axios.defaults.headers.common['Authorization'] = authToken
    axios.defaults.headers.common['Accept-Language'] = langCode
    axios.defaults.headers.common['Content-Type'] = false
    return axios.post(url, file)
  },
  getWithoutAuth (url, langCode) {
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.get(url)
  },
  getWithoutAuthArrayBuffer (url, langCode) {
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.get(url, {responseType: 'arraybuffer'})
  },

  getWithoutAuthBody (url, langCode, body) {
    
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.get(url, body)
  },
  postWithoutAuth (url, langCode, body) {
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.post(url, body)
  },
  delete (url, authToken, langCode, body) {
    axios.defaults.headers.common['Authorization'] = authToken
    axios.defaults.headers.common['Accept-Language'] = langCode
    return axios.delete(url, body)
  },
  all (promises) {
    return Promise.all(promises)
  }
}
