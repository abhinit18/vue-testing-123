import apiUrls from '../config/apiUrls'
import config from '../config/index'
import axios from 'axios'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState () {
  return {
    initialData: {},
    currentSelectedChild: {},
    userGrades: [],
    invalidToken: false,
    applicationProperties: [],
    mobile: {},
    currentBreadcrumb: '',
    platFormType:'',
  }
}

export const getters = {
  getCurrentChildId: (state) => () => {
    return state.currentSelectedChild.id
  },
  isGradeChangeAllowed: (state) => () => {
    return state.initialData.gradeChangePending
  },
  getFirstName: (state) => () => {
    return state.initialData.firstName
  },
  getUserId: (state) => () => {
    return state.initialData.userId
  },
  isMyProfile: (state) => (checkUserId) => {
    return (checkUserId === state.initialData.userId)
  },
  getUserCoins: (state) => () => {
    return state.initialData.coins
  },
  getUserMascot: (state) => () => {
    return state.initialData.mascot
  },
  authenticatedUserType: (state) => () => {
    return state.initialData
  },
  checkPrimaryType: (state) => () => {
    let primaryData = false
    if (state.initialData.grades) {
      if((state.initialData.grades[0].name === 'I'
      || state.initialData.grades[0].name === 'II'
      || state.initialData.grades[0].name === 'III'
      || state.initialData.grades[0].name === 'IV') && (state.initialData.roles[0] === 'STUDENT')){
        primaryData = true
      }
    }
    return primaryData
  },
  isTeacher: (state) => () => {
    return (state.initialData.roles && state.initialData.roles[0] === 'TEACHER')
  },
  isParent: (state) => () => {
    return (state.initialData.roles && state.initialData.roles[0] === 'PARENT')
  },
  isNotTeacherParent: (state) => () => {
    return (state.initialData.roles && state.initialData.roles[0] !== 'TEACHER' && state.initialData.roles[0] !== 'PARENT')
  },
  isTeacherOrParent: (state) => () => {
    return (state.initialData.roles && (state.initialData.roles[0] === 'TEACHER' || state.initialData.roles[0] === 'PARENT'))
  },
  getCurrentGrade: (state) => () => {
    let currentGrade = state.userGrades.filter((grade) => grade.tag==='current')
    if (currentGrade.length!==0) {
      return currentGrade[0]
    } else {
      return undefined
    }
  },
  getTeacherGrade: (state) => () => {
    return state.userGrades[0]
  },
  getDefaultChild: (state) => () => {
    return state.initialData.children[0]
  },
  getGradeCsv: (state) => (gradeArray) => {
    if (gradeArray) {
      return gradeArray.map(grade => grade.name).join(',')
    } else {
      let UserGrades = state.initialData.grades?state.initialData.grades.map(grade => grade.name).join(','):''
      return UserGrades
    }
  },
  validateEmail: (state) => (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    } else {
      return false
    }
  },
  validatePassword: (state) => (password) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/.test(password))
    {
      return (true)
    } else {
      return false
    }
  },
  validatePhone: (state) => (phone) => {
    if (phone.length===10)
    {
      return (true)
    } else {
      return false
    }
  },
  mobileProps: (state) => () =>{
    return state.mobile
  },
  getMinPasswordLength: (state) => () =>{
    let minPassArray = state.applicationProperties.filter(prop => {
      return prop.name === 'MIN_PASSWORD_LENGTH'
    })
    if (minPassArray.length === 0) {
      return 6
    } else {
      return minPassArray[0].value
    }
  },
  getAndriodPlayStore: (state) => () =>{
    let playStore = state.applicationProperties.filter(prop => {
      return prop.name === 'PLAY_STORE_URL'
    })
    return playStore[0].value;
  },
  getIosPlayStore: (state) => () =>{
    let playStore = state.applicationProperties.filter(prop => {
      return prop.name === 'APP_STORE_URL'
    })
    return playStore[0].value;
  },
  getAge: (state) => (dob) => {
      let ageDifMs = Date.now() - dob.getTime();
      let ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
 }

export const mutations = {
  SET_MOBILE_DATA: function (state, {data}) {
    state.mobile = data
  },
  SET_PLATFORM_TYPE : function (state, {platFormType}){
    state.platFormType = platFormType
  },
  SET_INITIAL_DATA: function (state, {initialData}) {
    state.initialData = initialData
  },
  SET_INVALID_TOKEN: function (state, {invalidToken}) {
    state.invalidToken = invalidToken
  },
  SET_USER_GRADES: function (state, {userGrades}) {
    state.userGrades = userGrades
  },
  SET_BREADCRUMB: function(state, {title}){
    state.currentBreadcrumb = title
  },
  SET_CURRENT_CHILD: function (state, {childObj}) {
    let childrenObj = {childObj}
    if(Array.isArray(childrenObj.childObj)) {
      let currentChildObj = childrenObj.childObj.filter(data => {
      return data.expiryDays >0
    })[0]
    if(currentChildObj) {
      state.currentSelectedChild = currentChildObj
    }else{
      state.currentSelectedChild = childrenObj.childObj[0]
    }
    }else{
      state.currentSelectedChild = childrenObj.childObj
    }


  },
  SET_PIC: function (state, {pic}) {
    let oldInitialData = state.initialData
    let newInitialData = Object.assign({}, oldInitialData, {profilePic : pic})
    state.initialData = newInitialData
  },
  SET_INITIAL_PIC: function (state, {initialData}) {
    let currentInitialData = state.initialData
    let currentinitialPic = currentInitialData.profilePic
    let newInitialDataProfileImage = Object.assign({}, currentInitialData, {profilePic:initialData.url})
    state.initialData = newInitialDataProfileImage
  },
  SET_CHANGED_PHONE: function (state, {initialData}) {

    let currentInitialData = state.initialData
    let currentinitialPhone = currentInitialData.phone
    let newInitialDataPhone = Object.assign({}, currentInitialData, {phone:initialData})
    state.initialData = newInitialDataPhone
  },
  SET_CHANGED_ALTPHONE: function (state, {initialData}) {
    let currentInitialData = state.initialData
    let currentinitialPhone = currentInitialData.alternateContact
    let newInitialDataAltPhone = Object.assign({}, currentInitialData, {alternateContact:initialData})
    state.initialData = newInitialDataAltPhone
  },
  SET_CHANGED_EMAIL: function (state, {initialData}) {
    let currentInitialData = state.initialData
    let currentinitialEmail = currentInitialData.email
    let newInitialDataEmail = Object.assign({}, currentInitialData, {email:initialData})
    state.initialData = newInitialDataEmail
  },
  SET_INITIAL_BIODATA: function (state, {initialData}) {
    let oldInitialData = state.initialData
    let newInitialData = Object.assign({}, oldInitialData, {onboarding: true}, {bio: initialData.bio})
    state.initialData = newInitialData
  },
  SET_CHANGED_PROFILE_DATA: function (state, {initialData}) {
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {
      city:initialData.city,
      school:initialData.school,
      bio: initialData.bio,
      firstName: initialData.firstName,
      lastName: initialData.lastName
    })
    state.initialData = newInitialData
  },
  SET_PROFILE_THEME: function (state, {initialData}) {
    let colorAbs = initialData.color.substr(1)
    let newTheme = Object.assign({}, initialData, {color: colorAbs})
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {theme: newTheme})
    state.initialData = newInitialData
  },
  INCREASE_POINTS: function (state, {points}) {
    let currentInitialData = state.initialData
    let currentPoint = currentInitialData.points
    currentPoint = (currentPoint? Number(currentPoint) : 0) + (points? Number(points) : 0)
    let newInitialData = Object.assign({}, currentInitialData, {points: currentPoint})
    state.initialData = newInitialData
  },
  CHANGE_PRIVACY: function (state, {payload}) {
    let currentInitialData = state.initialData
    let privacyCopy = []
    privacyCopy.push(Object.assign({}, payload.privacy[0]))
    privacyCopy.push(Object.assign({}, payload.privacy[1]))
    let newInitialDataPrivacy = Object.assign({}, currentInitialData.privacy, {discoverable: payload.discoverable, privacy: privacyCopy})
    let newInitialData = Object.assign({}, currentInitialData, {privacy: newInitialDataPrivacy})
    state.initialData = newInitialData
  },
  ADD_CHILDREN: function(state, {childrenList}) {
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {
      children: childrenList
    })
    state.initialData = newInitialData
  },
  RESET_STATE(state)
  {
    let newState = initialState();
    newState.applicationProperties = state.applicationProperties
    state = Object.assign(state, newState);
  },
  UPDATE_POINTS(state, {points, coins})
  {
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {points, coins})
    state.initialData = newInitialData
  },
  UPDATE_COINS(state, {points, coins})
  {
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {coins})
    state.initialData = newInitialData
  },
  UPDATE_PROPS(state, {feature, value}){
    state.initialData.readerPreference[feature] = value;
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData)
    state.initialData = newInitialData
  },
  UPDATE_MASCOT(state, {url})
  {
    let currentInitialData = state.initialData
    let newInitialData = Object.assign({}, currentInitialData, {mascot: url})
    state.initialData = newInitialData
  },
  SET_APPLICATION_PROPERTIES(state, data){
    state.applicationProperties = data;
  }
}
export const actions = {
  setMobileData ({redirect, commit}, {data}) {
    commit('SET_MOBILE_DATA', {data})
  },
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req, res,redirect,store }) {

    //console.log('res >> ', res);
    let serverCookie = req.headers.cookie || req.headers.authorization
    let promises = []
    promises.push(caller.getWithoutAuth(apiUrls.applicationProperties, 'kk').then((response) => {
      if (response && response.data.status === 'SUCCESS') {
        commit('SET_APPLICATION_PROPERTIES', response.data.properties)
                if(req.headers['user-agent']){
                  console.log('user agent >>>>>>>>>>' , req.headers['user-agent'].toLowerCase());
                  let platFormType = ''
                  if(req.headers['user-agent'].toLowerCase().indexOf('android') > -1){
                     platFormType = 'android'
                   }else if((req.headers['user-agent'].toLowerCase().indexOf('iphone') > -1)
                          || (req.headers['user-agent'].toLowerCase().indexOf('ipad') > -1)){
                     platFormType = 'ios'
                   }else{
                     platFormType = 'web'
                   }
                   commit('SET_PLATFORM_TYPE', {platFormType})
                   if(req.originalUrl.indexOf('login')> -1
                   || req.originalUrl.indexOf('tour') > -1
                   || req.originalUrl.indexOf('register') > -1){
                     if(store.state.platFormType === 'android'){
                       return redirect(store.getters['getAndriodPlayStore']())
                     }else if(store.state.platFormType === 'ios'){
                       return redirect(store.getters['getIosPlayStore']())
                     }
                   }
                }
      }
    }))
    if (serverCookie) {
      let cookieSplit = serverCookie.split(';')
      let token = ''
      let platform;
      for (let i=0;i<cookieSplit.length;i++) {
          let cookieInnerSplit = cookieSplit[i].split('=')
          if(cookieInnerSplit[0].trim() === 'token') {
              token = cookieInnerSplit[1].trim()
          }
      }

      // Check for post request with token for mobreader

      if(!token && req.headers.authorization){
        token = req.headers.authorization;
      }

      if(req.headers.platform)
        platform = req.headers.platform

      if (token !== '') {
          promises.push(caller.get(apiUrls.userDetails, token, undefined, undefined, undefined, platform).then((response) => {
              if (response && response.status === 200 && response.data) {
              //  console.log('response.data >> initial data', response.data);
              commit('SET_INITIAL_DATA', { initialData : response.data })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let childObj = response.data.children
                console.log('childObj', childObj)

                commit('SET_CURRENT_CHILD', {childObj})
              }
              }
          }))
          // console.log(this.$store.state.initialData.roles[0] === 'PARENT');

      }
    }
    return caller.all(promises).then((response)=>{
    }, (error) => {
      commit('SET_INVALID_TOKEN', { invalidToken : true })
      return
    })
  },
  refetchInitialData ({redirect, commit}, {authToken, langCode}) {
    return new Promise ((resolve, reject) => {
      caller.get(apiUrls.userDetails, authToken, langCode).then((response) => {
        if (response && response.status === 200 && response.data) {
        commit('SET_INITIAL_DATA', { initialData : response.data })
        if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let childObj = response.data.children
                commit('SET_CURRENT_CHILD', {childObj})
              }

        resolve(response)
        }
    }, error => {
      reject (error)
    })
    })
  },
  fetchUsersGrades ({redirect, commit}, {authToken, langCode,childId}) {
    return new Promise ((resolve, reject) => {
      caller.get(apiUrls.getUserGrades(childId), authToken, langCode).then((response) => {
          if (response && response.status === 200 && response.data) {
          commit('SET_USER_GRADES', { userGrades : response.data.gradeCurriculum })
          resolve(response)
          }
        }, error => {
          reject (error)
        })

    })
  },
  increasePoints ({redirect, commit}, {points}) {
    commit('INCREASE_POINTS', {points})
  },
  updateCoins ({redirect, commit}, {coins}) {
    commit('UPDATE_COINS', {coins})
  },
  updateCoinsPoints ({redirect, commit}, {coins, points}) {
    commit('UPDATE_POINTS', {coins, points})
  },
  updateAppProps({redirect, commit}, {feature, value}){
    commit('UPDATE_PROPS', {feature, value})
  },
  updateMascot ({redirect, commit}, {url}) {
    commit('UPDATE_MASCOT', {url})
  },
  updateChildId ({redirect, commit}, {childObj}) {
    commit('SET_CURRENT_CHILD', {childObj})
  },
  currentBreadcrumb({commit}, {title}){
    commit('SET_BREADCRUMB', {title})
  },
  snowPlowPageView ({redirect, commit, state}, {pageName}) {
    window.kplmssnowplow('setUserId', state.initialData.email);
    window.kplmssnowplow('trackPageView', pageName);
  },
  snowPlowEvent({redirect, commit, state}, {category, action,label, property, value}) {
    window.kplmssnowplow('setUserId', state.initialData.email);
    window.kplmssnowplow('trackStructEvent', category,action,label,property,value);
  },

  // getApplicationProperties({redirect, commit}){
  //   caller.getWithoutAuth(apiUrls.applicationProperties).then(response => {
  //     if (response && response.data.status === "SUCCESS") {
  //      commit('SET_APPLICATION_PROPERTIES', response.data.properties)
  //     }
  //   })
  // }
}
