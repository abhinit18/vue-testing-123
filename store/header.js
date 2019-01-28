export const state = () => (initialState())

function initialState () {
  return {
    myHeader: [
      {
        key: 1,
        name: "home",
        active: false,
        link: "/",
        icon: "homeIco"
      },
      {
        key: 2,
        name: "study",
        active: false,
        link: "/study",
        icon: "studyIco"
      },
      {
        key: 3,
        name: "buddies",
        active: false,
        link: "/buddy",
        icon: "buddyIco"
      }
      // },
      // {
      //   key: 4,
      //   name: "games",
      //   active: false,
      //   link: "/games",
      //   icon: "&#xE31F;"
      // }
    ]
  }
}

export const mutations = {
  SET_HEADER_ACTIVE: function (state, key) {
    let oldMyHeader = state.myHeader
    let newMyHeader= []
    for (let i=0; i<oldMyHeader.length; i++) {
      let newObj = {}
      let oldObj = oldMyHeader[i]
      if (oldMyHeader[i].key === key) {
        newObj = Object.assign({}, oldObj, {active: true})
      } else {
        newObj = Object.assign({}, oldObj, {active: false})
      }
      newMyHeader.push(newObj)
    }
    state.myHeader = newMyHeader


    // state.forEach(item => {
    //   // let newObj = {}
    //   // let oldObj = item
    //   if (item.key === key) {
    //     //item = Object.assign({}, oldObj, {active: true})
    //     item.active = true
    //   } else {
    //     // item = Object.assign({}, oldObj, {active: false})
    //     item.active = false
    //   }
    // })
  },
  RESET_STATE(state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  navChange ({redirect, commit, dispatch}, {key, authToken, langCode, context}) {
    dispatch('locale/startNotificationPolling', {authToken, langCode, context}, {root:true})
    commit('SET_HEADER_ACTIVE', key)
  }
}
