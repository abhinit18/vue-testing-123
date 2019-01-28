import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
  }
}



export const actions = {
    viewRedemptions ({redirect, commit}, {type, subType, authToken, langCode}) {
        return new Promise ((resolve, reject) => {
            caller.get(apiUrls.viewRedemptions ({type, subType}), authToken, langCode).then(response => {
                resolve(response)
            }, error => {
                reject (error)
            })
        })
  },
  viewGift ({redirect, commit}, {giftId, authToken, langCode}) {
    return new Promise ((resolve, reject) => {
        caller.get(apiUrls.viewGift ({giftId}), authToken, langCode).then(response => {
            resolve(response)
        }, error => {
            reject (error)
        })
    })
},
previewMascot ({redirect, commit}, {id, authToken, langCode}) {
    return new Promise ((resolve, reject) => {
        caller.get(apiUrls.previewMascot (id), authToken, langCode).then(response => {
            resolve(response)
        }, error => {
            reject (error)
        })
    })
},
  buy ({redirect, commit}, {payload, authToken, langCode}) {
    return new Promise ((resolve, reject) => {
        caller.post(apiUrls.redeem, authToken, langCode, payload).then(response => {
            resolve(response)
        }, error => {
            reject (error)
        })
    })
},
use ({redirect, commit}, {payload, authToken, langCode}) {
    return new Promise ((resolve, reject) => {
        caller.post(apiUrls.useAccessory, authToken, langCode, payload).then(response => {
            resolve(response)
        }, error => {
            reject (error)
        })
    })
},
remove ({redirect, commit}, {payload, authToken, langCode}) {
    return new Promise ((resolve, reject) => {
        caller.post(apiUrls.removeAccessory, authToken, langCode, payload).then(response => {
            resolve(response)
        }, error => {
            reject (error)
        })
    })
}
}
