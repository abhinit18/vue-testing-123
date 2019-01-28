export const state = () => (initialState())

  function initialState () {
    return {
      myHeader: [
      {
        key: 1,
        name: "index.idea_board",
        active: false,
        link: "/",
        innerClass: "ideaBoardIcon"
      },
      {
        key: 2,
        name: "index.my_progress",
        active: false,
        link: "/myprogress",
        innerClass: "myProgress"
      },
      {
        key: 3,
        name: "index.scoreboard",
        active: false,
        link: "/scoreboard",
        innerClass: "scoreBoard"
      },
      {
          key: 4,
          name: "index.refer_friend",
          active: false,
          link: "/refer",
          innerClass: "referFriends"
        }
    ],
    parentHeader: [
      {
        key: 1,
        name: "index.parent_progress",
        active: false,
        link: "/myprogress",
        innerClass: "myProgress"
      },
      {
        key: 2,
        name: "index.idea_board",
        active: false,
        link: "/",
        innerClass: "ideaBoardIcon"
      },
      {
        key: 3,
        name: "study.parentEbooks",
        active: false,
        link: "/parentEbook",
        innerClass:"eBooks"
        },
          {
          key: 4,
          name: "index.refer_friend",
          active: false,
          link: "/refer",
          innerClass: "referFriends"
        }
    ],
      myHeaderTour: [
      {
        key: 1,
        name: "index.idea_board",
        active: false,
        link: "/",
        innerClass: "ideaBoardIcon"
      },
      {
        key: 2,
        name: "index.my_progress",
        active: false,
        link: "/myprogress",
        innerClass: "myProgress"
      },
      {
        key: 3,
        name: "index.scoreboard",
        active: false,
        link: "/scoreboard",
        innerClass: "scoreBoard"
      }
    
    ],
    parentHeaderTour: [
      {
        key: 1,
        name: "index.parent_progress",
        active: false,
        link: "/myprogress",
        innerClass: "myProgress"
      },
      {
        key: 2,
        name: "index.idea_board",
        active: false,
        link: "/",
        innerClass: "ideaBoardIcon"
      },
      {
        key: 3,
        name: "study.parentEbooks",
        active: false,
        link: "/parentEbook",
        innerClass:"eBooks"
        }
    ]
  }
  }
  
  export const mutations = {
    SET_STUDY_ACTIVE: function (state, key) {
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
    SET_PARENT_HEADER_ACTIVE: function (state, key) {
      // state.forEach(item => {
      //   if (item.key == key) {
      //     item.active = true
      //   } else {
      //     item.active = false
      //   }
      // })
      console.log(key)
      let oldMyHeader = state.parentHeader
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
      state.parentHeader = newMyHeader
    },
    RESET_STATE (state)
    {
      let newState = initialState();
      state = Object.assign(state, newState);
    }
  }
  
  export const actions = {
    navChange ({redirect, commit}, key) {
      commit('SET_STUDY_ACTIVE', key)
    },
    parentNavChange ({redirect, commit}, key) {
      commit('SET_PARENT_HEADER_ACTIVE', key)
    }
  }
  