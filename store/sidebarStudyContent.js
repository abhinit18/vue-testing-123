export const state = () => (initialState())

function initialState () {
  return {
    myHeader: [
    {
      key: 1,
      name: "study.my_subjects",
      active: false,
      link: "/study",
      innerClass:"mySubj"
    },
    {
      key: 2,
      name: "index.activity",
      active: false,
      link: "/activity",
      innerClass:"myActivity",
      submenu:[
        {name:"index.unfinished_lessons", link: "/unfinished"},
        {name: "study.recently_visited",link: "/recentlyVisited"}
      ]
    },
    {
      key: 3,
      name: "study.ebooks",
      active: false,
      link: "/ebooks",
      innerClass:"eBooks"
    },
    {
      key: 4,
      name: "study.notes",
      active: false,
      link: "/note",
      innerClass:"notes"
    },
    {
      key: 5,
      name: "study.bookmarks",
      active: false,
      link: "/bookmarks",
      innerClass:"bookmarks"
    },
    {
      key: 6,
      name: "study.liked_content",
      active: false,
      link: "/liked",
      innerClass:"likedResource"
    }
  
  //  {
  //    key: 4,
  //    name: "Library",
  //    active: false,
  //    link: "/library",
  //    submenu:[
  //      {name:"Bookmarks",link:"/bookmark"},
  //      {name:"Liked Content",link:"/liked"}
  //    ]
  //  },
  
    // {
    //   key: 6,
    //   name: "study.ebooks",
    //   active: false,
    //   link: "/ebooks"
    // }
  ],
  parentHeader: [
    {
     key: 1,
     name: "study.parent_subjects",
     active: false,
     link: "/study",
     innerClass:"mySubj"
    },
    {
        key: 2,
        name: "study.ebooks",
        active: false,
        link: "/ebooks",
        innerClass:"eBooks"
      },
      {
        key: 3,
        name: "index.scoreboard",
        active: false,
        link: "/scoreboard",
        innerClass: "scoreBoard"
      }
    //{
    //  key: 2,
    //  name: "index.activity",
    //  active: false,
    //  link: "/activity",
    //  innerClass:"myActivity",
    //  submenu:[
    //    {name:"index.unfinished_lessons", link: "/unfinished"},
    //    {name: "study.recently_visited",link: "/recentlyVisited"}
    //  ]
    //},
    //{
    //  key: 2,
    //  name: "study.ebooks",
    //  active: false,
    //  link: "/ebooks",
    //  innerClass:"eBooks"
    //}
    //{
    //  key: 4,
    //  name: "study.notes",
    //  active: false,
    //  link: "/note",
    //  innerClass:"notes"
    //},
    //{
    //  key: 5,
    //  name: "study.bookmarks",
    //  active: false,
    //  link: "/bookmarks",
    //  innerClass:"bookmarks"
    //},
    //{
    //  key: 6,
    //  name: "study.liked_content",
    //  active: false,
    //  link: "/liked",
    //  innerClass:"likedResource"
    //}
  
  //  {
  //    key: 4,
  //    name: "Library",
  //    active: false,
  //    link: "/library",
  //    submenu:[
  //      {name:"Bookmarks",link:"/bookmark"},
  //      {name:"Liked Content",link:"/liked"}
  //    ]
  //  },
  
    // {
    //   key: 6,
    //   name: "study.ebooks",
    //   active: false,
    //   link: "/ebooks"
    // }
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
   SET_PARENT_STUDY_ACTIVE: function (state, key) {
    // state.forEach(item => {
    //   if (item.key == key) {
    //     item.active = true
    //   } else {
    //     item.active = false
    //   }
    // })
    
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
    commit('SET_PARENT_STUDY_ACTIVE', key)
  }
}
