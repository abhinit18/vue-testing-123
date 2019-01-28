import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
import {  unsetToken } from '~/utils/auth'
export const state = () => (initialState())

function initialState () {
  console.log('initial state called');
  return {
    locales: [{code: 'en',
      name: 'English'},
    {
      code: 'kk',
      name: 'Қазақ тілі'
    },
    {
      code: 'ru',
      name: 'Русский язык'
    }],
    selectedLocale: 'ru',
    notifications: [],
    newNotificationCount: 0,
    pollingStart: false,
    intervalId: '',
    notificationPages: 0,
    sessionTimeOut: 900,
    sessionTimeOutIntervalId: '',
    sessionTimeOutRunStatus: false
  }
}

export const getters = {
  getLocales: (state) => () => {
    return state.locales.filter(myLocale => myLocale.code !== state.selectedLocale)
  },
  getSelectedLocaleName: (state) => () => {
    return state.locales.filter(myLocale => myLocale.code === state.selectedLocale)[0].name
  },
  getLangClass: (state) => () => {
    return `Body${state.selectedLocale.charAt(0).toUpperCase()+state.selectedLocale.substr(1)}`
  },
  getFinalUrl: (state) => (urlToBe) => {
    //debugger
    //console.log('state.selectedLocale', state.selectedLocale);
    //console.log('urlToBe', urlToBe);

    let routeSplit = urlToBe.split('/')
    let localeCheck = routeSplit[1]
    let isLocalePresent = false
    for (let i=0; i<state.locales.length; i++) {
      if(state.locales[i].code === localeCheck) {
        isLocalePresent = true
        break
      }
    }
    let finalPath = ''
    if (isLocalePresent) {
      finalPath = ('/' + state.selectedLocale) + '/' + routeSplit.slice(2).join('/')
    } else {
      finalPath = ('/' + state.selectedLocale) + '/' + routeSplit.slice(1).join('/')
    }

    return finalPath
  },
  getNotificationTitle: (state) => (notification) => {
    let newNotification = []
    let rawNotification = notification.notification
    let re = /(\{.*?\})/g;
    let notificationSplit = rawNotification.split(re).filter(Boolean)
    for (let i=0; i<notificationSplit.length; i++) {
        if (notificationSplit[i].charAt(0)==='{')
        {
            let key = notificationSplit[i].substr(1,notificationSplit[i].length-2)
            let value  = notification.notificationData[key]
            newNotification[i] = value
        } else {
            newNotification[i] = notificationSplit[i]
        }
    }
    return newNotification.join('')
  }
}

export const mutations = {
  SET_TIMEOUT_ON (state) {
    state.sessionTimeOutRunStatus = true
  },
  RESET_TIMEOUT_TIME (state) {
    state.sessionTimeOut = 900
  },
  UPDATE_SESSION_TIMEOUT_TIME (state) {
    let oldSessionTimeOut = state.sessionTimeOut
    state.sessionTimeOut = oldSessionTimeOut - 1
  },
  UPDATE_SESSION_TIMEOUT_INTERVALID (state, {intervalId}) {
    state.sessionTimeOutIntervalId = intervalId
  },
  SET_LANG (state, locale) {
    let found = false
    for (let i = 0; i < state.locales.length; i++) {
      if (locale === state.locales[i].code) {
        found = true
        break
      }
    }
    if (found) {
      state.selectedLocale = locale
    }
  },
  UPDATE_NOTIFICATIONS (state, {response}) {
    let newNotifs = state.notifications
    newNotifs.push.apply(newNotifs, response)
    state.notifications = newNotifs
  },
  UPDATE_NOTIFICATIONS_TO_START (state, {response}) {
    let newNotifs = state.notifications
    newNotifs.unshift.apply(newNotifs, response)
    state.notifications = newNotifs
  },
  UPDATE_NEW_NOTIFICATION_COUNT (state, {count}) {
    state.newNotificationCount = state.newNotificationCount + count
  },
  START_POLLING (state) {
    state.pollingStart = true
  },
  STOP_POLLING (state) {
    state.pollingStart = false
  },
  RESET_STATE(state)
  {
    let previousLocale = state.selectedLocale
    let newState = initialState();
    state = Object.assign(state, newState, {selectedLocale: previousLocale});
  },
  SET_INTERVAL_ID (state, intervalId) {
    state.intervalId = intervalId
  },
  CLEAR_INTERVAL_ID (state) {
    state.intervalId = ''
  },
  MARK_SEEN (state) {
    let currentNotifs = state.notifications
    let newNotifs = []
    for (let i=0;i<currentNotifs.length; i++) {
      let notification = currentNotifs[i]
      if (notification.readStatus === 'NEW') {
        notification.readStatus = 'SEEN'
      }
      newNotifs.push(notification)
    }
    state.notifications = newNotifs
    state.newNotificationCount = 0
  },
  MARK_READ (state, {notificationId}) {
    let currentNotifs = state.notifications
    let newNotifs = []
    for (let i=0;i<currentNotifs.length; i++) {
      let notification = currentNotifs[i]
      if (notification.userNotificationId === notificationId) {
        notification.readStatus = 'READ'
        notification.read = 1
      }
      newNotifs.push(notification)
    }
    state.notifications = newNotifs
  },
  SET_NOTIFICATION_PAGES: function(state, totalPages){
    state.notificationPages = totalPages
  }
}

export const actions = {
  setlanguage ({redirect, commit, dispatch}, {locale, context, locales}) {
    commit('SET_LANG', locale)
    let path = context.$route.path
    let queryString = '';
    if(context.$route.query){
      queryString = '?'+Object.keys(context.$route.query).map(key => key + '=' + context.$route.query[key]).join('&');
    }

    console.log(context.$route);
    let routeSplit = path.split('/')
    let localeCheck = routeSplit[1]
    let isLocalePresent = false
    for (let i=0; i<locales.length; i++) {
      if(locales[i].code === localeCheck) {
        isLocalePresent = true
        break
      }
    }
    let finalPath = '/'
    if (isLocalePresent) {
      finalPath = finalPath + locale + '/' + routeSplit.slice(2).join('/')
    } else {
      finalPath = finalPath + locale + '/' + routeSplit.slice(1).join('/')
    }
    context.$router.push({ path: finalPath+queryString })
  },
  start ({ commit, state, getters }, {context}) {
    if (!state.sessionTimeOutRunStatus) {
    var intervalId = setInterval(() => {
      commit('UPDATE_SESSION_TIMEOUT_TIME')
      if (state.sessionTimeOut<=0) {
        commit('auth/SET_USER', {}, { root: true })
        unsetToken()
        commit('SET_INITIAL_DATA', {initialData: {}}, { root: true })
        window.clearInterval(state.sessionTimeOutIntervalId)
        window.clearInterval(state.intervalId)
        commit('STOP_POLLING', {})

        // resetting state
        commit('bookmark/RESET_STATE', {}, {root: true})
        commit('common/RESET_STATE', {}, {root: true})
        commit('content/RESET_STATE', {}, {root: true})
        commit('header/RESET_STATE', {}, {root: true})
        commit('liked/RESET_STATE', {}, {root: true})
        commit('locale/RESET_STATE', {}, {root: true})
        commit('newBuddyRequest/RESET_STATE', {}, {root: true})
        commit('note/RESET_STATE', {}, {root: true})
        commit('postContent/RESET_STATE', {}, {root: true})
        commit('profile/RESET_STATE', {}, {root: true})
        commit('register/RESET_STATE', {}, {root: true})
        commit('sidebarBuddyContent/RESET_STATE', {}, {root: true})
        commit('sidebarHomeContent/RESET_STATE', {}, {root: true})
        commit('sidebarregister/RESET_STATE', {}, {root: true})
        commit('sidebarStudyContent/RESET_STATE', {}, {root: true})
        commit('study/RESET_STATE', {}, {root: true})
        commit('RESET_STATE', {}, {root: true})
        commit('auth/RESET_STATE', {}, {root: true})
        //localContext.$toast.error(freshContext.$t('toastMsg.logged_out_invalid_session'))
        context.$toast.error('You have logged out because of inactivity')
        context.$router.push(getters.getFinalUrl('/login'))
      }
    }, 1000)
    commit('UPDATE_SESSION_TIMEOUT_INTERVALID', {intervalId})
    commit('SET_TIMEOUT_ON')
    }
  },
  resetSessionTimeoutTime ({ commit }) {
    commit('RESET_TIMEOUT_TIME')
  },
  startNotificationPolling ({ commit, state, getters }, {authToken, langCode, context}) {
    let localContext = context
    if (!state.pollingStart) {
      commit('START_POLLING')
      caller.get(apiUrls.notificationPolling({}), authToken, langCode).then((response) => {
        if (response && response.status === 200) {
            if (response.data && response.data.notification) {
              //commit('UPDATE_NOTIFICATIONS', {response: response.data.notification})
              commit('UPDATE_NEW_NOTIFICATION_COUNT', {count: (response.data.count? response.data.count: 0)})
            }
        }
        else{
          commit('SET_INVALID_TOKEN', { invalidToken : true }, {root: true})
          commit('auth/SET_USER', {}, {root: true})
          localContext.$router.push({ path: "/login" })
        }
    })
    .catch((error) => {
    })
      var intervalId = setInterval(() => {
        caller.get(apiUrls.notificationPolling({query: 'LATEST'}), authToken, langCode).then((response) => {
          if (response && response.status === 200) {
              if (response.data && response.data.notification) {
                commit('UPDATE_NOTIFICATIONS_TO_START', {response: response.data.notification})
                commit('UPDATE_NEW_NOTIFICATION_COUNT', {count: response.data.totalElements})
              }
          }
      })
      .catch((error) => {

          if (error.response && error.response.data && (error.response.data.code==='INVALID_SESSION' || error.response.data.code==='SUBSCRIPTION_EXPIRED')) {
              commit('auth/SET_USER', {}, { root: true })
              commit('SET_INITIAL_DATA', {initialData: {}}, { root: true })
              window.clearInterval(state.intervalId)
              window.clearInterval(state.sessionTimeOutIntervalId)
              unsetToken()
              commit('STOP_POLLING', {})

              // resetting state
              commit('bookmark/RESET_STATE', {}, {root: true})
              commit('common/RESET_STATE', {}, {root: true})
              commit('content/RESET_STATE', {}, {root: true})
              commit('header/RESET_STATE', {}, {root: true})
              commit('liked/RESET_STATE', {}, {root: true})
              commit('locale/RESET_STATE', {}, {root: true})
              commit('newBuddyRequest/RESET_STATE', {}, {root: true})
              commit('note/RESET_STATE', {}, {root: true})
              commit('postContent/RESET_STATE', {}, {root: true})
              commit('profile/RESET_STATE', {}, {root: true})
              commit('register/RESET_STATE', {}, {root: true})
              commit('sidebarBuddyContent/RESET_STATE', {}, {root: true})
              commit('sidebarHomeContent/RESET_STATE', {}, {root: true})
              commit('sidebarregister/RESET_STATE', {}, {root: true})
              commit('sidebarStudyContent/RESET_STATE', {}, {root: true})
              commit('study/RESET_STATE', {}, {root: true})
              commit('RESET_STATE', {}, {root: true})
              commit('auth/RESET_STATE', {}, {root: true})
              //localContext.$toast.error(localContext.$t('toastMsg.logged_out_invalid_session'))
              //context.$toast.error('Your session has been terminated')
              localContext.$router.push(getters.getFinalUrl('/login'))
          }
      })
      }, 1000 * 10)
      commit('SET_INTERVAL_ID', intervalId)
    }
  },
  fetchNotification ({ commit, state }, {authToken, langCode, page, size, type}) {
      return new Promise ( (resolve, reject) => {
        caller.get(apiUrls.notificationPolling({page, size, type}), authToken, langCode).then((response) => {
        resolve (response)
    })
    .catch((error) => {
        reject (error)
    }) })
  },
  notificationBellClick ({ commit }, {authToken, langCode}) {
      caller.post(apiUrls.notificationBellClick, authToken, langCode).then((response) => {
        if (response && response.status === 200) {
            commit('MARK_SEEN')
        }
    })
    .catch((error) => {
    })
  },
  markNotificationRead ({ commit }, {authToken, langCode, notificationId}) {
    caller.post(apiUrls.markNotificationRead, authToken, langCode, {id: notificationId}).then((response) => {
      if (response && response.status === 200) {
          commit('MARK_READ', {notificationId})
      }
  })
  .catch((error) =>{
  })
}
}
