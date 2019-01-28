import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
import { lrsPost, formVideoStatement} from '../utils/lrs'
export const state = () => (initialState())

function initialState () {
  return {
    types: [{name: 'ALL', code: 'study.all', searchName: 'ALL'}, {name: 'VIDEO', code: 'study.video', searchName: 'VIDEO'}, {name: 'ARTICLE', code: 'study.article', searchName: 'ARTICLE'}, {name: 'EBOOK', code: 'study.ebooks', searchName: 'EPUB'}],
    typesWithQuiz: [{name: 'ALL', code: 'study.all', searchName: 'ALL'}, {name: 'VIDEO', code: 'study.video', searchName: 'VIDEO'}, {name: 'ARTICLE', code: 'study.article', searchName: 'ARTICLE'}, {name: 'EBOOK', code: 'study.ebooks', searchName: 'EPUB'}, {name: 'QUIZ', code: 'study.quiz', searchName: 'QUIZ'}],
    contents: {},
    subjects: [],
    subjectPoints: {},
    topic: {},
    showBookmarked:false,
    contentSubTopic: {},
    isFullscreenActive: true,
    viewed: [],
    liked: [],
    unfinished: [],
    allEbooks: [],
    currentTotalPages: 0,
    ratingsDialog: false,
    ratingsPoint: 0,
    currentContent:{}
  }
}

export const getters = {
  contentTitle: (state) => (contentId) => {
    if (state.contents[contentId]) {
      return state.contents[contentId].title
    }

    return "";
  },
  subjectById: (state) => (subjectId) => {
    let subjects = state.subjects
    if(subjects.length>0)
    {
      for(let i=0;i<subjects.length;i++) {
        if(subjects[i].id.toString() === subjectId)
        {
          return subjects[i]
        }
      }
    }
    return {};
  },
  subjectPointsById: (state) => (subjectId) => {
    let subjectPoints = state.subjectPoints
    let resultPoints = {}
    if (subjectPoints[subjectId]) {
      resultPoints = subjectPoints[subjectId]
    }
    return resultPoints;
  },
  topicById: (state) => (topicId, subjectId) => {
    let topics = state.topic[subjectId] || []
    if(topics.length>0)
    {
      for(let i=0;i<topics.length;i++) {
        if(topics[i].id.toString() === topicId)
        {
          return topics[i]
        }
      }
    }
    return {};
  },
  topicByCurriculumId: (state) => (topicId, subjectId) => {
    let topics = state.topic[subjectId] || []
    if(topics.length>0)
    {
      for(let i=0;i<topics.length;i++) {
        if(topics[i].curriculumDetailsId.toString() === topicId)
        {
          return topics[i]
        }
      }
    }
    return {};
  },
  subTopicById: (state) => (topicId, subTopicId) => {
    let subTopics = state.topic[topicId] || []
    if(subTopics.length>0)
    {
      for(let i=0;i<subTopics.length;i++) {
        if(subTopics[i].id.toString() == subTopicId)
        {
          return subTopics[i]
        }
      }
    }
    return {};
  },
  subjectBySimilar: (state) => (similar) => {
    let subjects = state.subjects
    let foundSubject = undefined
    if(subjects.length>0)
    {
      for(let i=0;i<subjects.length;i++) {
        if(subjects[i].similar.toString() === similar)
        {
          foundSubject = subjects[i]
        }
      }
    }
    return foundSubject;
  },

}

export const mutations = {
  FETCH_CONTENT: function (state, { contentId, content }) {
    let oldContents = state.contents
    let contentObj = {}
    contentObj[contentId] = content
    let newContents = Object.assign({}, oldContents, contentObj)
    state.contents =  newContents
  },
  FETCH_CURRENT_CONTENT:function (state, {content}){
    state.currentContent = content
  },
  FETCH_SUBJECT: function (state, { response }) {
    state.subjects = response
  },
  FETCH_TOPIC: function (state, { response, subject_id }) {
    let oldTopic = state.topic
    let newObj = {}
    newObj[subject_id] = response
    let newTopic = Object.assign({}, oldTopic, newObj)
    state.topic = newTopic
  },
  SUBJECT_POINTS: function (state, { response, subject_id }) {
    let oldSubjectPoints = state.subjectPoints
    let newObj = {}
    newObj[subject_id] = response
    let newSubjectPoints = Object.assign({}, oldSubjectPoints, newObj)
    state.subjectPoints = newSubjectPoints
  },
  FETCH_SUB_TOPIC: function (state, { response, topic_id }) {
    let oldSubTopic = state.subTopic
    let newObj = {}
    newObj[topic_id] = response
    let newSubTopic = Object.assign({}, oldSubTopic, newObj)
    state.subTopic = newSubTopic
  },
  FETCH_CONTENT_SUB_TOPIC: function(state, {id, response = []}) {
    let oldContentSubTopic = state.contentSubTopic
    let newObj = {}
    newObj[id] = response
    let newContentSubTopic = Object.assign({}, oldContentSubTopic, newObj)
    state.contentSubTopic = newContentSubTopic
  },
  TOGGLE_CONTENT_FULLSCREEN: function (state) {
    state.isFullscreenActive = !state.isFullscreenActive
  },
  SET_CONTENT_TOTAL: function(state, totalPages){
    state.currentTotalPages = totalPages
  },
  MAKE_CONTENT_FULLSCREEN: function (state) {
    state.isFullscreenActive = true
  },
  TOGGLE_CONTENT_DOWNLOADED: function (state, { subTopicId, contentId}) {
    let contents = state.contentSubTopic[subTopicId]
     for(let i=0;i<contents.length;i++) {
       if( contents[i].contentId.toString() === contentId ) {
           if(state.contentSubTopic[subTopicId][i]['downloaded'] != undefined)
            state.contentSubTopic[subTopicId][i]['downloaded'] = !state.contentSubTopic[subTopicId][i]['downloaded'];
            else state.contentSubTopic[subTopicId][i]['downloaded'] = true;
       }
     }
     state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic));
   },
  TOGGLE_CONTENT_LIKED: function (state, { subTopicId, contentId, skipStoreUpdate}) {
   if(skipStoreUpdate) return;
   let contents = state.contentSubTopic[subTopicId]
    for(let i=0;i<contents.length;i++) {
      if( contents[i].contentId.toString() === contentId ) {
          state.contentSubTopic[subTopicId][i]['liked'] = !state.contentSubTopic[subTopicId][i]['liked'];

          if(state.contentSubTopic[subTopicId][i]['liked']){
            state.contentSubTopic[subTopicId][i]['likeCount']++;
          } else state.contentSubTopic[subTopicId][i]['likeCount']--;
      }
    }
    state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic));
  },
  MARK_CONTENT_COMPLETE: function (state, { subTopicId, contentId, topicId, subjectId}) {
   let contents = state.contentSubTopic[subTopicId]
   let points = 0;
    for(let i=0;i<contents.length;i++) {
      if( contents[i].contentId.toString() === contentId ) {
          let foundContent = contents[i]
          foundContent.completed = true
          points = foundContent.points;
      } else {
      }
    }

    // mark the sub topic complete
    let subtopics = state.topic[topicId]
    let firstMarkAsComplete = false
    for(let i=0;i<subtopics.length;i++) {
      if( subtopics[i].curriculumDetailsId.toString() === subTopicId ) {
          let foundSubTopic = subtopics[i]
          if(!foundSubTopic.markAsComplete)
              firstMarkAsComplete = true;
          foundSubTopic.markAsComplete = true
          foundSubTopic.earnedPoints += points;
      } else {
      }
    }

    // increase the completed count of subtopics in topics
    let topics = state.topic[subjectId]
    for(let i=0;i<topics.length;i++) {
      if( topics[i].curriculumDetailsId.toString() === topicId ) {
          let foundTopic = topics[i]

          if(firstMarkAsComplete)
            foundTopic.completedSubTopic = foundTopic.completedSubTopic + 1
          foundTopic.earnedPoints += points;
      } else {
      }
    }

    state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic));
    state.topic = JSON.parse(JSON.stringify(state.topic));

  },
  MARK_INDIVIDUAL_CONTENT_COMPLETE: function (state, {contentId}) {
    let contents = state.contents[contentId]
    let newContent = Object.assign({}, contents, {completed: true})
    state.contents[contentId] = newContent
  },
  MUTATE_EPUB_STATE: function(state, {subTopicId, contentId, cfid}) {
    //debugger;
    let contents = state.contentSubTopic[subTopicId]
    let newContents = []
     for(let i=0;i<contents.length;i++) {
       if( contents[i].contentId.toString() === contentId ) {
           let tempContent = contents[i]
           tempContent["currentState"] = cfid
           newContents.push(tempContent)
       } else {
         newContents.push(contents[i])
       }
     }
     state.contentSubTopic[subTopicId] = newContents
     state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic))

},
MUTATE_EPUB_STATE_INDIVIDUAL: function(state, {contentId, cfid}) {
  let contents = state.contents[contentId]
  let newContent = Object.assign({}, contents, {"currentState": cfid})
  state.contents[contentId] = newContent
  state.contents = JSON.parse(JSON.stringify(state.contents))
},
  BOOKMARK_MY_CONTENT: function(state, {subTopicId, contentId}) {
      let contents = state.contentSubTopic[subTopicId]
      let newContents = []
       for(let i=0;i<contents.length;i++) {
         if( contents[i].contentId.toString() === contentId ) {
             let tempContent = contents[i]
             tempContent["bookmarked"] = true
             newContents.push(tempContent)
         } else {
           newContents.push(contents[i])
         }
       }
       state.contentSubTopic[subTopicId] = newContents
       state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic))

  },
  REMOVE_BOOKMARK_MY_CONTENT: function(state, {subTopicId, contentId}) {
      let contents = state.contentSubTopic[subTopicId]
      let newContents = []
       for(let i=0;i<contents.length;i++) {
         if( contents[i].contentId.toString() === contentId ) {
             let tempContent = contents[i]
             tempContent["bookmarked"] = false
             newContents.push(tempContent)
         } else {
           newContents.push(contents[i])
         }
       }
       state.contentSubTopic[subTopicId] = newContents
       state.contentSubTopic = JSON.parse(JSON.stringify(state.contentSubTopic))

  },
  BOOKMARK_INDIVIDUAL_CONTENT: function(state, {contentId}) {
    let contents = state.contents[contentId]
    let newContent = Object.assign({}, contents, {"bookmarked": !contents.bookmarked})
    state.contents[contentId] = newContent
    state.contents = JSON.parse(JSON.stringify(state.contents))
},
  REMOVE_BOOKMARK_MY_INDIVIDUAL_CONTENT: function(state, {contentId}) {
    debugger
    let contents = state.contents[contentId]
    let newContent = Object.assign({}, contents, {"bookmarked": !contents.bookmarked})
    state.contents[contentId] = newContent
    state.contents = JSON.parse(JSON.stringify(state.contents))
},
TOGGLE_DOWNLOADED_INDIVIDUAL_CONTENT: function(state, {contentId}) {
  let contents = state.contents[contentId]
  let newContent ;

  if(contents["downloaded"] != undefined)
     newContent = Object.assign({}, contents, {"downloaded": true})
  else  newContent = Object.assign({}, contents, !newContent["downloaded"])

  state.contents[contentId] = newContent
},
TOGGLE_LIKE_INDIVIDUAL_CONTENT: function(state, {contentId, skipStoreUpdate}) {
  if(skipStoreUpdate) return;
  let contents = state.contents[contentId]
  let newContent = Object.assign({}, contents, {"liked": !contents.liked})
  state.contents[contentId] = newContent
},
  SET_RECENT_VIEWED: function (state, content = [], concat ) {
    if(concat)
      state.viewed = content.concat(state.viewed)
    else state.viewed = content;
  },
  SET_LIKED_CONTENT: function (state, content = [], concat) {
    if(concat)
      state.liked = content;
    state.liked = content.concat(state.liked)
  },
  SET_UNFINISHED_CONTENT: function (state, content = [], concat) {
    if(concat)
      state.unfinished = content.concat(state.unfinished)
    else state.unfinished = content;
  },
  SET_ALL_EBOOKS: function (state, content = [], concat) {
    if(concat)
      state.allEbooks = content.concat(state.allEbooks)
    else state.allEbooks = content;
  },
  RESET_STATE(state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  },
  TOGGLE_RATINGS_DIALOG: (state) =>  state.ratingsDialog = !state.ratingsDialog,
  CLOSE_RATINGS_DIALOG: (state) =>  state.ratingsDialog = false,
  SET_RATINGS_POINTS: (state, {points}) => state.ratingsPoint = points

}

export const actions = {
  fetchContent ({redirect, commit}, {contentId,childId, authToken, langCode}) {
    caller.get(apiUrls.getContent(contentId,childId), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data && response.data.content) {
        commit('FETCH_CONTENT', { contentId, content: response.data.content[0] })

      }
    })
  },
  fetchContentProm ({redirect, commit}, {contentId,childId, authToken, langCode}) {
    return new Promise((resolve, reject) => {caller.get(apiUrls.getContent(contentId,childId), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data && response.data.content) {
        //console.log('response.data >> ',response.data);
        //commit('FETCH_CONTENT', { contentId, content: response.data.content[0] })
        commit('FETCH_CURRENT_CONTENT', {content : response.data.content[0]})

        resolve(response.data.content[0])

      }
    })} )
  },
  fetchSubject ({redirect, commit}, {childId, curriculumId, authToken, langCode, id, loader,context}) {
    return new Promise((resolve, reject) => {caller.get(apiUrls.getCurriculumLevels({childId, id, curriculumId, level: 'CURRICULUM', loader}), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('FETCH_SUBJECT', { response: response.data.curriculum? response.data.curriculum: [] })
        resolve(response.data.curriculum)
      }
    },(err) =>{
        resolve(err)
    })} )
  },
  checkSubjectExistence ({redirect, commit}, {childId, curriculumId, authToken, langCode, id, loader}) {
    return new Promise((resolve, reject) => {caller.get(apiUrls.getCurriculumLevels({childId, id, curriculumId, level: 'CURRICULUM', loader}), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        resolve(response.data.curriculum)
      }
    })} )
  },
  fetchTopic ({redirect, commit}, {childId, id, authToken, langCode, topic, curriculumId, level, similar, loader}) {
    return new Promise ((resolve, reject) => {
    caller.get(apiUrls.getCurriculumLevels({childId, id, topic, curriculumId, level, similar, loader}), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('FETCH_TOPIC', { subject_id: id, response: response.data.curriculum })
        commit('SUBJECT_POINTS', { subject_id: id, response: response.data.points })
        resolve()
      }
    })} )
  },
  mutateEpubState ({redirect, commit}, {authToken, langCode, subTopicId, contentId, cfid, isIndependentContentView}) {
    return new Promise((resolve, reject) => {
          if (!isIndependentContentView) {
            commit('MUTATE_EPUB_STATE', {subTopicId, contentId, cfid})
          } else {
            commit('MUTATE_EPUB_STATE_INDIVIDUAL', {contentId, cfid})
          }
          resolve({})
    })
  },
  contentBookmarking ({redirect, commit}, {authToken, langCode, subTopicId, contentId, type, isIndependentContentView}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.contentBookmarks, authToken, langCode, {contentId, type}).then((response) => {
        if (response && response.status === 200) {
          if (!isIndependentContentView) {
            commit('BOOKMARK_MY_CONTENT', {subTopicId, contentId})
          } else {
            commit('BOOKMARK_INDIVIDUAL_CONTENT', {contentId})
          }
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  deleteContentBookmarks({redirect, commit}, {authToken, contentId,type,subTopicId,isIndependentContentView,langCode}) {
    return new Promise((resolve, reject) => {
      caller.delete(apiUrls.deleteBookmarks(), authToken, langCode, {data:{contentId,type}}).then((response) => {
        if (response && response.status === 200) {
          console.log(isIndependentContentView);
          if(isIndependentContentView) {
            commit('REMOVE_BOOKMARK_MY_INDIVIDUAL_CONTENT', {contentId})
          }else {
            commit('REMOVE_BOOKMARK_MY_CONTENT', {subTopicId, contentId})
          }
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  fetchContentForSubTopic ({redirect, commit}, {id, curriculumId, size, authToken, langCode, page, loader, childId}) {
    return new Promise ((resolve, reject) => {
    caller.get(apiUrls.getLinkedContent({id, page, size, loader, curriculumId, childId}), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
       // response.data.content[0]['type'] = 'ARTICLE'
        commit('SET_CONTENT_TOTAL', response.data.total)
        commit('FETCH_CONTENT_SUB_TOPIC', { id, response: response.data.content })
        resolve()
      }
    })} )
  },
  toggleContentFullscreen ({redirect, commit}) {
    commit('TOGGLE_CONTENT_FULLSCREEN')
  },
  makeContentFullscreen  ({redirect, commit}) {
    commit('MAKE_CONTENT_FULLSCREEN')
  },
  toggleContentDownloaded ({redirect, commit}, { authToken, contentType, langCode, subTopicId, contentId, downloaded, isIndependentContentView}) {
          if (!isIndependentContentView) {
            commit('TOGGLE_CONTENT_DOWNLOADED', { subTopicId, contentId })
          } else {
            commit('TOGGLE_DOWNLOADED_INDIVIDUAL_CONTENT', {contentId })
          }
  },
  toggleContentLiked ({redirect, commit}, { authToken, contentType, langCode, subTopicId, contentId, type, like, isIndependentContentView, skipStoreUpdate, platform}) {
    if (like) {
      caller.post(apiUrls.dislike, authToken, langCode, { contentId, contentType }, platform).then((response) => {
        if (response && response.status === 200) {
          if (!isIndependentContentView) {
            commit('TOGGLE_CONTENT_LIKED', { subTopicId, contentId, skipStoreUpdate} )
          } else {
            commit('TOGGLE_LIKE_INDIVIDUAL_CONTENT', {contentId , skipStoreUpdate} )
          }
        }
      })
    } else {
      let verb = 'like';
      let object = contentType;

      lrsPost(authToken, {objectDetails: {id :contentId}, verb, object}, langCode, platform).then(response => {
        if (response && response.data && response.data.httpStatus == '200'){
            if(response.data.points && response.data.coins ){
              let points = response.data.points;
              let coins = response.data.coins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }
        if (!isIndependentContentView) {
          commit('TOGGLE_CONTENT_LIKED', { subTopicId, contentId, skipStoreUpdate } )
        } else {
          commit('TOGGLE_LIKE_INDIVIDUAL_CONTENT', {contentId, skipStoreUpdate } )
        }
      }
      })
    }
  },
  markContentComplete ({redirect, commit, state}, { authToken, contentType, langCode, subTopicId, contentId, topicId, subjectId, isIndependentContentView, platform }) {
    let verb = 'completed';
    let object = contentType;

    return new Promise( (resolve, reject) => {
        lrsPost(authToken, {verb, object, objectDetails: {id: contentId} }, langCode, platform).then(response => {

        if (response && response.data && response.data.httpStatus.toString() == '200') {
            if(response.data.points && response.data.coins ){
              let points = response.data.points;
              let coins = response.data.coins;
              commit('UPDATE_POINTS', {points, coins}, {root: true})
            }

          let contents = state.contentSubTopic[subTopicId]
          let points = response.data.pointsCompleted; // Data variables holds points earned while completing this content
          if (isIndependentContentView) {
            commit('MARK_INDIVIDUAL_CONTENT_COMPLETE', {contentId})
          } else {
            for(let i=0;i<contents.length;i++) {
              if( contents[i].contentId.toString() === contentId ) {
                  let foundContent = contents[i]
              }
            }
            commit('MARK_CONTENT_COMPLETE', { subTopicId, contentId, topicId, subjectId })
          }
          //commit('INCREASE_POINTS', {points} ,{root: true})
          commit('SET_RATINGS_POINTS', {points})
        }

        commit('TOGGLE_RATINGS_DIALOG')
        resolve();
      })
    })
  },
  showRatingDialog({redirect, commit}){
    commit('TOGGLE_RATINGS_DIALOG')
  },
  hideRatingDialog({redirect, commit}){
    commit('CLOSE_RATINGS_DIALOG')
  },

  fetchRecent ({redirect, commit}, { authToken, langCode,childId, type, page, size}) {
    return new Promise ((resolve, reject) => {
      caller.post(apiUrls.getRecentContent(page, size,childId), authToken, langCode, { type }).then((response) => {
        if (response && response.status === 200) {

          commit('SET_CONTENT_TOTAL', response.data.total);

          if(type == 'viewed')
            commit('SET_RECENT_VIEWED', response.data.content, page)
          else if(type == 'liked') commit('SET_LIKED_CONTENT', response.data.content, page)
          else commit('SET_UNFINISHED_CONTENT', response.data.content, page)

          resolve(response)
        }
      })
    })
  },

  fetchByContentType ({redirect, commit}, { authToken, langCode, page, size, grade, type, lrsContent}) {
    return new Promise ((resolve, reject) => {
      caller.get(apiUrls.fetchContentByType( page, size, grade, type, lrsContent), authToken, langCode).then((response) => {
        if (response && response.status === 200) {
          commit('SET_ALL_EBOOKS', response.data.content);
          resolve()
        }
      })
    })
  },

  purgeDownload ({redirect, commit}, { authToken, langCode, contentId, platform}) {
      caller.post(apiUrls.purgeDownload, authToken, langCode, {contentId}, platform).then((response) => {
        if (response && response.status === 200) {
        }
      })

  }

}
