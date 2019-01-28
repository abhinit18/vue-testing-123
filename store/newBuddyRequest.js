import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    fetchConnection: [],
    fetchMyBuddyConnection: [],
    fetchSearchedConnection: {},
    fetchBlockedConnection: []
  }
}

export const mutations = {
  FETCH_MYBUDDY_CONNECTION: function (state, {response}) {
    state.fetchMyBuddyConnection = response.connections? response.connections: []
  },
  FETCH_SENT_BUDDY_CONNECTION: function (state, {response}) {
    state.fetchConnection = response
  },
  FETCH_RECEIVED_BUDDY_CONNECTION: function (state, {response}) {
    state.fetchConnection = response
  },
  FETCH_BLOCKED_BUDDY_CONNECTION: function (state, {response}) {
    state.fetchBlockedConnection = response.connections
  },
  FETCH_SEARCHED_BUDDY_CONNECTION: function (state, {response}) {
    state.fetchSearchedConnection = response
  },
  FETCH_SEARCHED_MYBUDDY_CONNECTION: function (state, {response}) {
    let newArr  = [];
    if(response.connections) {
      for(let i=0;i<response.connections.length;i++) {
        if(response.connections[i].friendStatus == 'FRIEND'){
          newArr.push(response.connections[i])
        }
      }
      state.fetchMyBuddyConnection = newArr
    }
    else
      state.fetchMyBuddyConnection = []
  },
  APPROVE_BUDDY: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = ''
    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else{
      existingConnection = state.fetchConnection.connections
    }
    let newConnection = []
    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId !== connectionId) {
        newConnection.push(existingConnection[i])
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = newConnection
    }else{
      state.fetchConnection.connections = newConnection
      state.fetchConnection.totalElements = newConnection.length;
    }
  },
  DECLINE_BUDDY: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = ''
    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else{
      existingConnection = state.fetchConnection.connections
    }
    let newConnection = []
    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId !== connectionId) {
        newConnection.push(existingConnection[i])
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = newConnection
    }else{
      state.fetchConnection.connections = newConnection
      state.fetchConnection.totalElements = newConnection.length;
    }
  },
  CANCEL_BUDDY_REQUEST: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = '';
    if(pageStatus === 'find'){
       existingConnection = state.fetchSearchedConnection.connections
    }else{
       existingConnection = state.fetchConnection.connections
    }
    let newConnection = []
    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId !== connectionId) {
        newConnection.push(existingConnection[i])
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = newConnection
    }else{
      state.fetchConnection.connections = newConnection
      state.fetchConnection.totalElements = newConnection.length;
    }
  },
  UNFRIEND_BUDDY: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = ''
    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else{
      existingConnection = state.fetchMyBuddyConnection
    }
    let newConnection = []

    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId !== connectionId) {
        newConnection.push(existingConnection[i])
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = newConnection
    }else{
      state.fetchMyBuddyConnection = newConnection
      state.fetchMyBuddyConnection.totalElements = newConnection.length;
    }

  },
  BLOCK_BUDDY: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = ''
    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else{
      existingConnection = state.fetchMyBuddyConnection
    }
    let newConnection = []
    //
    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId.toString() === connectionId) {
        newConnection.push(Object.assign({}, existingConnection[i], {isBlocked: true}))
        //existingConnection[i].isBlocked = true
      } else {
        newConnection.push(Object.assign({},existingConnection[i]))
      }
    }
    if(pageStatus === 'find'){
      let newObj = state.fetchSearchedConnection
      state.fetchSearchedConnection = Object.assign({}, newObj, {connections : newConnection})
    }else{
      state.fetchMyBuddyConnection = newConnection
    }

  },
  UNBLOCK_BUDDY: function (state, {response,connectionId,pageStatus}) {
    let existingConnection = ''

    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else if (pageStatus === 'Buddy') {
      existingConnection = state.fetchMyBuddyConnection
    }else{
      existingConnection = state.fetchBlockedConnection
    }
    let newConnection = []
    if(pageStatus === 'find') {
      for (let i=0;i< existingConnection.length;i++) {
        if(existingConnection[i].userId.toString() === connectionId) {
          // newConnection.push(existingConnection[i])
          existingConnection[i].isBlocked = false
        }
      }
    }
    else if(pageStatus === 'Buddy') {
      for (let i=0;i< existingConnection.length;i++) {
        if(existingConnection[i].userId.toString() === connectionId) {
          // newConnection.push(existingConnection[i])
          existingConnection[i].isBlocked = false
        }
      }
    }else {
      for (let i=0;i< existingConnection.length;i++) {
        if(existingConnection[i].userId.toString() !== connectionId) {
          newConnection.push(existingConnection[i])
        }
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = existingConnection
    }else if (pageStatus === 'Buddy') {
      state.fetchMyBuddyConnection = existingConnection
    }else{
      state.fetchBlockedConnection = newConnection
      state.fetchBlockedConnection.totalElements = newConnection.length;
    }

  },
  SEND_BUDDY_REQUEST: function (state, {response,connectionId,pageStatus}) {

    let existingConnection=''
    if(pageStatus === 'find'){
      existingConnection = state.fetchSearchedConnection.connections
    }else{
      existingConnection = state.fetchConnection.connections
    }
    let newConnection = []

    for (let i=0;i< existingConnection.length;i++) {
      if(existingConnection[i].userId !== connectionId) {
        newConnection.push(existingConnection[i])
      }
    }
    if(pageStatus === 'find'){
      state.fetchSearchedConnection.connections = newConnection
    }else{
      state.fetchConnection.connections = newConnection
      state.fetchConnection.totalElements = newConnection.length;
    }
  },
  SEND_BUDDY_REMINDER: function (state, {response,connectionId,pageStatus}) {

    // let existingConnection=''
    // if(pageStatus === 'find'){
    //   existingConnection = state.fetchSearchedConnection.connections
    // }else{
    //   existingConnection = state.fetchConnection.connections
    // }
    // let newConnection = []
    //
    // for (let i=0;i< existingConnection.length;i++) {
    //   if(existingConnection[i].userId !== connectionId) {
    //     newConnection.push(existingConnection[i])
    //   }
    // }
    // if(pageStatus === 'find'){
    //   state.fetchSearchedConnection.connections = newConnection
    // }else{
    //   state.fetchConnection.connections = newConnection
    // }
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}
export const actions = {
  fetchConnections ({redirect, commit}, {authToken, page, size, langCode}) {
    caller.get(apiUrls.fetchConnections(page, size), authToken, langCode).then((response) => {

      if (response && response.status === 200 && response.data) {
        commit('FETCH_MYBUDDY_CONNECTION', {response: response.data})
      }
    }
    )
      .catch((error) => {
      }
      )
  },
  fetchBlockedBuddyConnections ({redirect, commit}, {authToken, page, size, langCode}) {
    caller.get(apiUrls.fetchMyBlockedBuddyConnections(), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('FETCH_BLOCKED_BUDDY_CONNECTION', {response: response.data})
      }
    }
    )
      .catch((error) => {
      }
      )
  },
  fetchSentConnections ({redirect, commit}, {authToken, page, size, langCode}) {
    caller.get(apiUrls.fetchSentConnections(page, size), authToken, langCode).then((response) => {

      if (response && response.status === 200 && response.data) {
        commit('FETCH_SENT_BUDDY_CONNECTION', {response: response.data})
      }
    }
    )
      .catch((error) => {
      }
      )
  },
  fetchReceivedConnections ({redirect, commit}, {authToken, page, size, langCode}) {
    caller.get(apiUrls.fetchReceivedConnections(page, size), authToken, langCode).then((response) => {

      if (response && response.status === 200 && response.data) {
        commit('FETCH_RECEIVED_BUDDY_CONNECTION', {response: response.data})
      }
    }
    )
      .catch((error) => {
      }
      )
  },
  fetchSearchedConnections ({redirect, commit}, {authToken, page, size,searchParam,gradeParam,schoolParam, langCode}) {
    caller.get(apiUrls.fetchSearchedConnections(page, size, searchParam,gradeParam,schoolParam), authToken, langCode).then((response) => {

      if(searchParam){
//        console.log('response length >>' , response.data.connections ? response.data.connections.length : 0);
//        commit('FETCH_SEARCHED_BUDDY_CONNECTION', {response: response.data, searchParam:searchParam}, {root: true})
      }
      if (response && response.status === 200 && response.data) {
        commit('FETCH_SEARCHED_BUDDY_CONNECTION', {response: response.data})
      }
      })
      .catch((error) => {
      })
  },
  fetchSearchedMybuddyConnections ({redirect, commit}, {authToken, page, size,searchParam, langCode}) {
    caller.get(apiUrls.fetchMybuddySearchedConnections(page, size, searchParam), authToken, langCode).then((response) => {

      if (response && response.status === 200 && response.data) {
        commit('FETCH_SEARCHED_MYBUDDY_CONNECTION', {response: response.data})
      }
    }
    )
      .catch((error) => {
      }
      )
  },
  approveBuddyRequest ({commit}, {authToken, connectionId,pageStatus, langCode}) {

    return new Promise((resolve, reject) => {
      caller.post(apiUrls.userConnectionAccept, authToken, langCode, {connectionId}).then((response) => {
        if (response && response.status === 200) {
          if(response.data.userTotalPoints && response.data.userTotalCoins ){
            let points = response.data.userTotalPoints;
            let coins = response.data.userTotalCoins;
            commit('UPDATE_POINTS', {points, coins}, {root: true})
          }
          if(pageStatus === 'profile' || pageStatus === 'userProfile') {
            //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
          }else{
            commit('APPROVE_BUDDY', {response: response.data, connectionId,pageStatus})
          }

          resolve(response)
        }
      }
      )
        .catch((error) => {
          reject(error)
        }
        )
    })
  },
  declineBuddyRequest ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.userConnectionDecline, authToken, langCode, {connectionId}).then((response) =>{
          if(response && response.status === 200) {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }
            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('DECLINE_BUDDY', {response:response.data, connectionId,pageStatus})
            }

            resolve(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  sendBuddyRequest ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.userConnectionSend, authToken, langCode, {connectionId}).then((response) =>{
          if(response && response.data.status === 'SUCCESS') {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }

            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('SEND_BUDDY_REQUEST', {response:response.data, connectionId,pageStatus})
            }

            resolve(response)
          }else{
            reject()
            this.$toast.error(response.data.code)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  sendBuddyReminder ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.userConnectionSendReminder, authToken, langCode, {connectionId}).then((response) =>{
          if(response && response.data.status === 'SUCCESS') {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }

            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('SEND_BUDDY_REMINDER', {response:response.data, connectionId,pageStatus})
            }

            resolve(response)
          }else{
            reject(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  unfriendMyBuddy ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.unfrienUser, authToken, langCode, {connectionId}).then((response) =>{
          if(response && response.status === 200) {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }
            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('UNFRIEND_BUDDY', {response:response.data, connectionId,pageStatus})
            }
            resolve(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  unblockBuddy ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.unblockUser(connectionId), authToken, langCode).then((response) =>{
          if(response && response.status === 200) {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }
            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('UNBLOCK_BUDDY', {response:response.data, connectionId,pageStatus})
            }

            resolve(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  blockBuddy ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.blockUser(connectionId), authToken, langCode).then((response) =>{
          if(response && response.status === 200) {

            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }
            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('BLOCK_BUDDY', {response:response.data, connectionId,pageStatus})
            }
            resolve(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // userConnectionSend
  cancelBuddyRequest ({commit}, {authToken, connectionId, pageStatus, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.userConnectionCancel, authToken, langCode, {connectionId}).then((response) =>{
          if(response && response.status === 200) {
            if(response.data.userTotalPoints && response.data.userTotalCoins ){
              let points = response.data.userTotalPoints;
              let coins = response.data.userTotalCoins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }

            if(pageStatus === 'profile' || pageStatus === 'userProfile') {
              //this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'))
            }else{
              commit('CANCEL_BUDDY_REQUEST', {response:response.data, connectionId,pageStatus})
            }
            resolve(response)
          }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
