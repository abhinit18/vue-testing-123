export const state = () => (initialState())

function initialState () {
  return {
    myHeader: [
    {
      key: 1,
      name: "my_buddies",
      active: false,
      link: "/buddy",
      icon: "&#xE7FB",
      iconClass: "myBuddies"
    },
    {
      key: 2,
      name: "new_request",
      active: false,
      link: "/newRequest",
      icon: "&#xE7FD",
      iconClass: "newRequests"
    },
    {
      key: 3,
      name: "sent_request",
      active: false,
      link: "/sentRequest",
      icon: "&#xE7FE",
      iconClass: "sentRequests"
    },
    {
      key: 4,
      name: "find_buddy",
      active: false,
      link: "/findBuddy",
      icon: "&#xE8B6",
      iconClass: "addBuddy"
    },
    {
      key: 5,
      name: "blocked_buddy",
      active: false,
      link: "/blockedBuddies",
      icon: "&#xE611",
      iconClass: "blockedList"
    }
  ]
}
}

export const mutations = {
  SET_BUDDY_ACTIVE: function (state, key) {
    // state.forEach(item => {
    //   if (item.key == key) {
    //     item.active = true
    //   } else {
    //     item.active = false
    //   }
    // })
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
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  navChange ({redirect, commit}, key) {
    commit('SET_BUDDY_ACTIVE', key)
  }
}
