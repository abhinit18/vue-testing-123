import Axios from 'axios'
import { eventHub } from './eventhub'
let globalCounter = 0
const axios = Axios.create({ baseURL: process.env.baseUrl,
  headers:{'Content-Type':'application/json'} });
axios.interceptors.request.use(
    conf => {
        if (conf.url.indexOf('query=LATEST')===-1 && conf.url.indexOf('showloader')!==-1) {
          globalCounter++
          eventHub.$emit('before-request');
        }
        return conf;
    },
    error => {
      eventHub.$emit('request-error');
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
      if (response.request && response.request.responseURL && response.request.responseURL.indexOf('query=LATEST')===-1 && response.request.responseURL.indexOf('showloader')!==-1) {
        if (globalCounter!==0) {
          globalCounter--
        }
        if (globalCounter===0) {
          eventHub.$emit('after-response');
        }
      }
        return response;
    },
    error => {
      // if (response.request.responseURL.indexOf('query=LATEST')===-1 && response.request.responseURL.indexOf('showloader')!==-1) {
      //   globalCounter--
      //   if (globalCounter===0) {
      //     eventHub.$emit('response-error');
      //   }
      // }
      if (globalCounter!==0) {
        globalCounter--
      }
      if (globalCounter===0) {
        eventHub.$emit('response-error');
      }
      eventHub.$emit('response-error-logging', error);
        return Promise.reject(error);
    }
);
// export default axios.create({
//   baseURL: process.env.baseUrl,
//   headers:{'Content-Type':'application/json'}
// })
export default axios
