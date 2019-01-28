import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
import { lrsPost } from '../utils/lrs'
// import { resolve } from 'dns';
export const state = () => (initialState())

function initialState () {
    return {
        posts: [],
        color: [],
        comments: {},
        likes: {},
        tagNameList: [],
        userInfo: [],
        userList: [],
        offset: 0,
        requestPost: true,
        totalPosts: 0,
        isWallPost: 0,
        fromNotification:false
    }
  }

export const getters = {
    getUserInfo: (state) => (userId) => {
        let userInfoArr = state.userInfo
        let userInfoObj = { username: 'name', userpic: 'pic' }
        for (let i = 0; i < userInfoArr.length; i++) {
            if (userId === userInfoArr[i].userid) {
                userInfoObj['username'] = userInfoArr[i].username
                userInfoObj['userpic'] = userInfoArr[i].userpic
            }
        }
        return userInfoObj
    }
}



export const mutations = {
    RESET_POST: function(state) {
      let newState = initialState()
      state = Object.assign(state, newState)
    },
    FROM_NOTIFICATION : function (state, {flag}){
      state.fromNotification = flag;
    },
    FETCH_POST: function(state, { response, userInfoResponse, offset, totalPosts }) {
        state.offset = offset
        if(state.offset && state.offset !== 0) {
            state.requestPost = true
        }else{
            state.requestPost = false
        }
        if (totalPosts) {
            state.totalPosts = totalPosts
        }
        let old_posts = state.posts
        let new_posts = old_posts.concat(response)
        state.posts = new_posts
        if (userInfoResponse) {
            for (let i = 0; i < userInfoResponse.length; i++) {
                if (state.userInfo.filter(temp => (temp.userid === userInfoResponse[i].userid)).length === 0) {
                    state.userInfo.push(userInfoResponse[i])
                }
            }
        }
    },
    FETCH_POST_COLOR: function(state, { response }) {
        state.color = response.colors
    },
    ADD_POST: function(state, { response, userInfoResponse, isProfile, sharePost = true }) {
       // debugger
        if(!isProfile || (isProfile && state.isWallPost===1 && sharePost)) {
            state.posts.unshift(response)
            if (userInfoResponse) {
              for (let i = 0; i < userInfoResponse.length; i++) {
                  if (state.userInfo.filter(temp => (temp.userid === userInfoResponse[i].userid)).length === 0) {
                      state.userInfo.push(userInfoResponse[i])
                  }
              }
          }
        }
    },
    EDIT_POST: function(state, { response }) {
        let posts = state.posts
        let newPosts = []
        newPosts.push(response)
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].postId !== response.postId) {
                newPosts.push(posts[i])
            }
        }
        state.posts = newPosts
    },
    DELETE_POST: function(state, { postId }) {
        let posts = state.posts
        let newPosts = []
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].postId !== postId) {
                newPosts.push(posts[i])
            }
        }
        state.posts = newPosts
    },
    LIKE_POST: function(state, { postId, userId, response, type }) {
        if (state.likes[postId]) {
            state.likes[postId].push(userId)
        } else {
            let likeObj = {}
            likeObj[postId] = []
            likeObj[postId].push(userId)
            state.likes = likeObj
        }
        if (type === 'POST') {
          let postArr = state.posts
          let newArr = []
          for (let i = 0; i < postArr.length; i++) {
              if (postArr[i].postId === postId) {
                  let likeCount = postArr[i].likeCount
                  let newLikeObj = { likeCount: likeCount + 1, isSelfLiked: true, topliker: response.topliker ? response.topliker : [] }
                  newArr.push({...postArr[i], ...newLikeObj })
              } else {
                  newArr.push(postArr[i])
              }
              state.posts = newArr
          }
        } else {
          let commentArr = state.comments[postId]
          let newArr = []
          for (let i = 0; i < commentArr.length; i++) {
              if (commentArr[i].commentId === response.likesTypeId) {
                  let likeCount = commentArr[i].likeCount
                  let newLikeObj = { likeCount: likeCount + 1, isSelfLiked: true, topliker: response.topliker ? response.topliker : [] }
                  newArr.push({...commentArr[i], ...newLikeObj })
              } else {
                  newArr.push(commentArr[i])
              }
              state.comments[postId] = newArr
          }
        }
    },
    FETCH_COMMENT: function(state, { discussionId, response, userInfoResponse }) {
        let newObj = {}
        newObj[discussionId] = response
        state.comments = {...state.comments, ...newObj }
        for (let i = 0; i < userInfoResponse.length; i++) {
            if (state.userInfo.filter(temp => (temp.userid === userInfoResponse[i].userid)).length === 0) {
                state.userInfo.push(userInfoResponse[i])
            }
        }
    },
    ADD_COMMENT: function(state, { response, userInfoResponse, discussionId }) {
        if (state.comments[response.discussionId]) {
            state.comments[response.discussionId].push(response)
        } else {
            // let commentObj = {}
            // commentObj[response.discussionId] = []
            // commentObj[response.discussionId].push(response)
            let myArr = []
            myArr.push(response)
            state.comments[response.discussionId] = myArr
        }

        // update count in post data
        if (discussionId) {
          let commentArr = state.comments[discussionId]
          let newArr = []
          for (let i = 0; i < commentArr.length; i++) {
              if (commentArr[i].commentId === response.discussionId) {
                  let commentCount = commentArr[i].commentCount
                  newArr.push({...commentArr[i], commentCount: commentCount + 1 })
              } else {
                  newArr.push(commentArr[i])
              }
              state.comments[discussionId] = newArr
          }
        } else {
          let postArr = state.posts
          let newArr = []
          for (let i = 0; i < postArr.length; i++) {
              if (postArr[i].postId === response.discussionId) {
                  let commentCount = postArr[i].commentCount
                  newArr.push({...postArr[i], commentCount: commentCount + 1 })
              } else {
                  newArr.push(postArr[i])
              }
              state.posts = newArr
          }
        }

        for (let i = 0; i < userInfoResponse.length; i++) {
            if (state.userInfo.filter(temp => (temp.userid === userInfoResponse[i].userid)).length === 0) {
                state.userInfo.push(userInfoResponse[i])
            }
        }
    },
    EDIT_COMMENT: function(state, { response, commentId, userInfoResponse }) {

        let comments = state.comments[response.discussionId]
        let newComments = []
        newComments.push(response)
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].commentId !== commentId) {
                newComments.push(comments[i])
            }
        }
        state.comments[response.discussionId] = newComments


        for (let i = 0; i < userInfoResponse.length; i++) {
            if (state.userInfo.filter(temp => (temp.userid === userInfoResponse[i].userid)).length === 0) {
                state.userInfo.push(userInfoResponse[i])
            }
        }
    },
    DELETE_COMMENT: function(state, { postId, commentId, superParentId }) {
        let comments = state.comments[postId]
        let newComments = []
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].commentId !== commentId) {
                newComments.push(comments[i])
            }
        }
        state.comments[postId] = newComments


        // update count in post data
        let postArr = state.posts
        let newArr = []
        for (let i = 0; i < postArr.length; i++) {
            if (postArr[i].postId == postId) {
                let commentCount = postArr[i].commentCount
                newArr.push({...postArr[i], commentCount: commentCount - 1 })
            } else {
                newArr.push(postArr[i])
            }
        }
        state.posts = newArr

        // update count in nested comment data
        if (superParentId) {
            let nestedCommentArr = state.comments[superParentId]
            let newArrForNested = []
            for (let i = 0; i < nestedCommentArr.length; i++) {
                if (nestedCommentArr[i].commentId == postId) {
                    let commentCount = nestedCommentArr[i].commentCount
                    newArrForNested.push({...nestedCommentArr[i], commentCount: commentCount - 1 })
                } else {
                    newArrForNested.push(nestedCommentArr[i])
                }
            }
            state.comments[superParentId] = newArrForNested
        }


    },
    FETCH_LIKE: function(state, { discussionId, userInfo, response }) {
        let newObj = {}
        newObj[discussionId] = response
        state.likes = {...state.likes, ...newObj }

        for (let i = 0; i < userInfo.length; i++) {
            if (state.userInfo.filter(temp => (temp.userid === userInfo[i].userid)).length === 0) {
                state.userInfo.push(userInfo[i])
            }
        }
    },
    DELETE_LIKE: function(state, { postId, userId, response, type }) {
        let oldLikeObj = state.likes[postId]
        if (oldLikeObj) {
            oldLikeObj.splice(oldLikeObj.indexOf(userId), 1)
            let newObj = {}
            newObj[postId] = oldLikeObj
            state.likes = {...state.likes, ...newObj }
        }

        if (type === 'POST') {
        let postArr = state.posts
        let newArr = []
        for (let i = 0; i < postArr.length; i++) {
            if (postArr[i].postId === postId) {
                let likeCount = postArr[i].likeCount
                let newLikeObj = { likeCount: likeCount - 1, isSelfLiked: false, topliker: response.topliker ? response.topliker : [] }
                newArr.push({...postArr[i], ...newLikeObj })
            } else {
                newArr.push(postArr[i])
            }
            state.posts = newArr
        }
      } else {
        let commentArr = state.comments[postId]
        let newArr = []
        for (let i = 0; i < commentArr.length; i++) {
            if (commentArr[i].commentId === response.likesTypeId) {
                let likeCount = commentArr[i].likeCount
                let newLikeObj = { likeCount: likeCount - 1, isSelfLiked: false, topliker: response.topliker ? response.topliker : [] }
                newArr.push({...commentArr[i], ...newLikeObj })
            } else {
                newArr.push(commentArr[i])
            }
            state.comments[postId] = newArr
        }
      }
    },
    GET_USERS_LIST: function(state, { response }) {
        state.userList = []
        state.userList = response;
    },
    UPDATE_IS_WALL_POST: function(state, { isWallPost }) {
        state.isWallPost = isWallPost? 1: 0
    },
    RESET_STATE (state)
    {
      let newState = initialState();
      state = Object.assign(state, newState);
    }
}
export const actions = {
    resetPost ({ redirect, commit }) {
        commit('RESET_POST')
    },
    fetchPost({ redirect, commit }, { authToken, offset, page, langCode, userId, isWallPost }) {
        caller.get(apiUrls.fetchPost(offset, page, userId, isWallPost), authToken, langCode).then((response) => {
                if (response && response.status === 200 && response.data && response.data.userPostList) {
                    commit('FETCH_POST', { response: response.data.userPostList, userInfoResponse: response.data.userInfo, offset: response.data.offset, totalPosts: response.data.totalElements })
                    commit('FROM_NOTIFICATION', {flag:false })
                }
            })
            .catch((error) => {
            })
    },
    getPostColor({ redirect, commit }, { authToken,langCode}) {
        return new Promise ((resolve, reject) => {
        caller.get(apiUrls.fetchPostColor(), authToken, langCode).then((response) => {
            if(response && response.status === 200) {
                    commit('FETCH_POST_COLOR',{response})
                }
                resolve(response)
            })
            .catch((error) => {
                reject(response)
            })
        })
    },
    fetchNotificationPost({ redirect, commit }, { authToken, langCode, postId }) {
        return new Promise ((resolve, reject) => {
            caller.get(apiUrls.fetchNotificationPost(postId), authToken, langCode).then((response) => {
                if (response && response.status === 200 && response.data && response.data.post && response.data.code !== 'POST_ID_NOT_FOUND') {
                    commit('FETCH_POST', { response: [response.data.post], userInfoResponse: response.data.userInfo, offset: response.data.offset })
                    commit('FROM_NOTIFICATION', {flag:true })
                }
                resolve(response.data)
            }, error => {
                reject (error)
            })
        })
    },
    addPost({ redirect, commit }, { authToken, payload, langCode, isProfile }) {
        return new Promise((resolve, reject) => {
            caller.postfile(apiUrls.addPost (isProfile), authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('ADD_POST', {  isProfile, response: response.data.userPostList[0], userInfoResponse: response.data.userInfo })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    editPost({ redirect, commit }, { authToken, postId, payload, langCode }) {
        return new Promise((resolve, reject) => {
            caller.post(apiUrls.updatePost(postId), authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('EDIT_POST', { response: response.data.userPostList[0] })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    sharePost({ redirect, commit }, { authToken, payload, langCode, isProfile }) {
        return new Promise((resolve, reject) => {
            caller.post(apiUrls.sharePost, authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('ADD_POST', {sharePost: false,isProfile, response: response.data.userPostList[0], userInfoResponse: response.data.userInfo })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    deletePost({ redirect, commit }, { authToken, postId, langCode }) {
        return new Promise((resolve, reject) => {
            caller.delete(apiUrls.deletePost(postId), authToken, langCode).then((response) => {
                    if (response && response.status === 200) {
                        commit('DELETE_POST', { postId })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    fetchComment({ redirect, commit }, { authToken, page, size, discussionId, langCode, type = 'POST' }) {
        caller.get(apiUrls.fetchComment(discussionId, type, page, size), authToken, langCode).then((response) => {
                if (response && response.status === 200 && response.data) {
                    commit('FETCH_COMMENT', { discussionId, response: response.data.commentListResponse ? response.data.commentListResponse : [], userInfoResponse: response.data.userInfo ? response.data.userInfo : [] })
                }
            })
            .catch((error) => {
            })
    },
    addComment({ redirect, commit }, { authToken, payload, langCode, discussionId }) {
        return new Promise((resolve, reject) => {
            caller.post(apiUrls.addComment, authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('ADD_COMMENT', { discussionId: discussionId, response: response.data.commentListResponse[0], userInfoResponse: response.data.userInfo })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    editComment({ redirect, commit }, { authToken, payload, commentId, langCode }) {
        return new Promise((resolve, reject) => {
            caller.put(apiUrls.updateComment(commentId), authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        if(response.data.commentListResponse){
                            commit('EDIT_COMMENT', { commentId: commentId, response: response.data.commentListResponse[0], userInfoResponse: response.data.userInfo })
                        }
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    deleteComment({ redirect, commit }, { authToken, postId, commentId, langCode, superParentId }) {
        return new Promise((resolve, reject) => {
            caller.delete(apiUrls.deleteComment(commentId), authToken, langCode).then((response) => {
                    if (response && response.status === 200) {
                        commit('DELETE_COMMENT', { postId, commentId, superParentId })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    fetchLike({ redirect, commit }, { authToken, page, size, discussionId, langCode, type='POST' }) {
        caller.get(apiUrls.fetchLike(discussionId, type, page, size), authToken, langCode).then((response) => {
                if (response && response.status === 200 && response.data && response.data.authorrId) {
                    commit('FETCH_LIKE', { discussionId, userInfo: response.data.userInfo, response: response.data.authorrId ? response.data.authorrId : [] })
                }
            })
            .catch((error) => {
            })
    },
    likePost({ redirect, commit }, { authToken, postId, userId, payload, langCode }) {
        return new Promise((resolve, reject) => {
            caller.post(apiUrls.likePost, authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('LIKE_POST', { response: response.data, postId, userId, type: payload.type })
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    deleteLike({ redirect, commit }, { authToken, postId, userId, payload, langCode }) {
        return new Promise((resolve, reject) => {
            caller.delete(apiUrls.deleteLike(payload.likeTypeId, payload.type), authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        commit('DELETE_LIKE', { response: response.data, postId, userId, type: payload.type})
                        if (response.data.userTotalPoints) {
                            commit('UPDATE_POINTS', { points: response.data.userTotalPoints, coins: response.data.userTotalCoins }, {root: true})
                        }
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    tagUsersList({ redirect, commit }, { authToken, payload, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getTaggedUsers(payload), authToken, langCode).then((response) => {
                    if (response && response.status === 200) {
                        commit('GET_USERS_LIST', { response: response.data.connections })
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    setRatings({ redirect, commit }, { authToken, payload, langCode }) {
        return new Promise((resolve, reject) => {
            caller.post(apiUrls.setRatings, authToken, langCode, payload).then((response) => {
                    if (response && response.status === 200) {
                        if(response.data.userTotalPoints && response.data.userTotalCoins ){
                            let points = response.data.userTotalPoints;
                            let coins = response.data.userTotalCoins;
                            commit('UPDATE_POINTS', {points, coins}, {root: true})
                          }
                        // console.log(response);
                        // commit('LIKE_POST', { response: response.data.topliker, postId, userId, })
                        resolve(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    viewPost({ redirect, commit }, { authToken, postId, langCode }) {
        let verb = 'VIEWED';
        let object = 'POST';

        lrsPost(authToken, {objectDetails: {id :postId}, verb, object}, langCode).then(response => {
            if (response && response.data && response.data.httpStatus == 200) {
                if(response.data.userTotalPoints && response.data.userTotalCoins ){
                    let points = response.data.userTotalPoints;
                    let coins = response.data.userTotalCoins;
                    commit('UPDATE_POINTS', {points, coins}, {root: true})
                  }
              }
        })
    },
    updateIsWallPost({ redirect, commit }, { isWallPost }) {
       commit('UPDATE_IS_WALL_POST', {isWallPost})
    },
}
