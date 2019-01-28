import config from './index'
import { loadavg } from 'os';
export default {
    loginApi: '/v1/api/login',
    bulkLoginApi: '/v1/public/bulkLogin',
    demoRequest: '/v1/public/requestDemo',
    // changeOrForgotPassword: '/v1/api/changeOrForgotPassword',
    changeOrForgotPassword: '/v1/api/changePassword',
    ForgotPassword: '/v1/api/forgotPassword',
    sendOTP: '/v1/api/sendOtp',
    signUp: '/v1/public/register',
    takeTour: '/v1/public/takeATour',
    ParentsignUp: '/v1/api/parent/register',
    initiateUserPayment: '/v1/public/initiatePayment',
    gradeChange: '/v1/api/gradeChange',
    addMultipleChild: '/v1/api/parent/addChildren',
    removeMultipleChild: '/v1/api/parent/removeChildren',
    initiateUserPaymentConfirmation: '/v1/public/paymentConfirmation',
    logout(userId,deviceId){return `/v1/api/logout?userId=${userId}&deviceId=${deviceId}`},
    userDetails: `/v1/api/user/details/`,
    getCountries(){return  `/v1/api/getCountries?active=true`},
    getCities(){return  `/v1/api/cities`},
    getSchools(city,country){return  `/v1/api/schools?city=${city}&country=${country}`},
    getSubscriptionPlan({lang, country='Kazakhstan', promocode, selectedUser}){
        return  `/v1/public/subscriptionPlans?lang=${lang}&country=${country}&promoCode=${promocode}&role=${selectedUser}`
    },
    fetchPostColor() {
        return `/v2/api/cardColors`
    },
    getPromoCodeInfo(promocode){return  `/v1/api/getCouponDetails?code=${promocode}`},
    validateReferralCode(referral_code){return  `/v1/public/validateReferralCode?code=${referral_code}`},
    getCurriculum(gradeId) { return `/v1/api/content/curriculum?gradeId=${gradeId}` },
    getCurriculumStructure(id) { return `/v1/api/content/nextLevel?id=${id}` },
    linkContent: '/v1/api/content/linkContent',
    getLinkedContent({id, page = 0, size=100, curriculumId, loader, childId}) {
        let result = `/v2/api/content/linkedContentNew?id=${id}&curriculumId=${curriculumId}&size=${size}&page=${page}`
        if (loader) {
            result = result + '&showloader=true'
        }
        if (childId) {
            result = result+`&childId=${childId}`
        }
        return result
    },
    contentUpload: `/v1/api/content/upsert`,
    userDeactivation: `/v1/api/deactivate`,
    userActivation: `/v1/api/activate`,
    fetchContent: `/v1/api/content/get?size=1000`,
    fetchContentByType : (page, size, grade, type, lrsContent = false) => `/v1/api/content/contentByGradeAndType?page=${page}&size=${size}&grade=${grade}&type=${type}&lrsContent=${lrsContent}&showloader=true`,
    grades: `/v1/api/content/grades`,
    languages(){return `/v1/api/getLanguages`} ,
    updateBio(){return `/v1/api/updateLanguageAndBio`},
    getThemes(){return `/v1/api/theme?showloader=true`},
    validatePromoCode(promoCode, email, number){return `/v1/public/validatePromoCode?promoCode=${promoCode}&email=${email}&phone=${number}`},
    updateTheme: `/v1/api/theme`,
    urlToGetSignedUrl(language = 'en', filename = 'myFile') {
        filename = filename + (new Date().getTime())
        return `/v1/api/content/getContentUploadUrl?lang=${language}&name=${filename}`
    },
    // POST COMMENT LIKE
    addPost (isProfile) {
        if (isProfile) {
            return `v2/api/userWallPost`
        } else {
            return `/v2/api/userPost`
        }

    } ,
    userReportAbuse: `v2/api/abuse/report`,
    onboardingProfilePic: `/v1/api/updateProfilePic `,
    sharePost: `/v2/api/share`,
    fetchPost(offset = 0, page = 10, userId, isWallPost) {
        if (isWallPost) {
            return `/v2/api/getWallPosts?offset=${offset}&userId=${userId}`
        } else if (userId) {
            return `/v2/api/userMyPosts?offset=${offset}&userId=${userId}`
        } else {
            return `/v2/api/userPost?offset=${offset}`
        }
    },
    fetchNotificationPost (postId) {
        return `/v2/api/notificationPost/${postId}`
    },
    updatePost(postId) {
        return `/v2/api/userPostData/${postId}`
    },
    deletePost(postId) {
        return `/v2/api/userPost/${postId}`
    },
    addComment: `/v2/api/comment`,
    fetchComment(discussionId, type = 'POST', page = 0, size = 100) {
        return `/v2/api/comment/${discussionId}?type=${type}&page=${page}&size=${size}`
    },
    updateComment(commentId) {
        return `/v2/api/comment/${commentId}`
    },
    deleteComment(commentId) {
        return `/v2/api/comment/${commentId}`
    },
    likePost: `/v2/api/likes`,
    fetchLike(likeTypeId, type = 'POST', page = 0, size = 100) {
        return `/v2/api/likes/${likeTypeId}?type=${type}&page=${page}&size=${size}`
    },
    getContent(contentId,childId = '') {
        return `/v1/api/content/get/${contentId}?childId=${childId}`
    },
    deleteLike(postId, type = "POST") {
        return `/v2/api/likes/${postId}/${type}`
    },
    getUsers(query) {
        return `/v1/api/search/searchBuddies/?q=${query}&page=0&size=10`
    },
    ParentsWard(query) {
        return `/v1/api/search/searchStudentUsers?q=${query}`
    },
    getTaggedUsers(query) {
        return `/v1/api/search/searchTagBuddies/?q=${query}&page=0&size=10`
    },
    setRatings: `/v1/api/rateContent`,
    sendChildOtp: `/v1/api/childOtp`,
    verifyChildOtp: `/v1/api/validateChildOtp`,
    // e reader
    getBookmarks: (contentId, lang = "en") => `/v1/api/bookmark/${contentId}/${lang}`,
    getLikedContents(childId){
         return `/v1/api/contentlist?page=0&size=100&childId=${childId}&showloader=true`
    },
    addBookmark: '/v1/api/bookmark/add',
    deleteBookmark: `/v1/api/bookmark/delete`,

    // study api's
    getCurriculumLevels({id, curriculumId, level, similar, childId, loader}) {
        let resultUrl = `/v2/api/content/getCurriculumForParent/?id=${id}&curriculumId=${curriculumId}&level=${level}`
            if (similar) {
                resultUrl = resultUrl+`&similar=${similar}`
            }
            if (childId) {
                resultUrl = resultUrl+`&childId=${childId}`
            }
        if (loader) {
            resultUrl = resultUrl + '&showloader=true'
        }
        return resultUrl
    },
    userConnection: `/v1/api/search/searchBuddies?showloader=true`,
    fetchConnections(page = 0, size = 100) {
        return `/v1/api/search/searchBuddies?page=${page}&size=${size}&showloader=true`
    },
    userSentConnection: `/v1/api/search/searchBuddyReqSent?showloader=true`,
    fetchSentConnections(page = 0, size = 100) {
        return `/v1/api/search/searchBuddyReqSent?page=${page}&size=${size}&showloader=true`
    },
    userReceivedConnection: `/v1/api/search/searchBuddyReqReceived?showloader=true`,
    fetchReceivedConnections(page = 0, size = 100) {
        return `/v1/api/search/searchBuddyReqReceived?page=${page}&size=${size}&showloader=true`
    },
    userSearchedConnection: `/v1/api/search/searchUsers?`,
    fetchSearchedConnections(page = 0, size = 100, searchParam ,gradeParam, schoolParam) {
        return `/v1/api/search/searchUsers?q=${searchParam}&gradeFilter=${gradeParam}&schoolFilter=${schoolParam}&page=${page}&size=${size}`
    },
    userMybuddySearchedConnection: `/v1/api/search/searchBuddies?`,
    fetchMybuddySearchedConnections(page = 0, size = 100, searchParam) {
        return `/v1/api/search/searchBuddies?q=${searchParam}&page=${page}&size=${size}`
    },
    fetchMyBlockedBuddyConnections() {
        return `/v1/api/connection/getAllBlockUsers?showloader=true`
    },
    userConnectionAccept: `/v1/api/connection/approve`,
    userConnectionSend: `/v1/api/connection/send`,
    userConnectionSendReminder: `/v1/api/connection/sendReminder`,
    userConnectionDecline: `/v1/api/connection/reject`,
    userConnectionCancel: `/v1/api/connection/withdraw`,
    unfrienUser: `/v1/api/connection/unfriend`,
    unblockUser(userparam){
      return `/v1/api/connection/unblockUser?userId=${userparam}`
    },
    blockUser(userparam){
      return `/v1/api/connection/blockUser?userId=${userparam}`
    },
    getAnnotations: (contentId) => `/v1/api/annotations/search?contentId=${contentId}`,

    // Note apis
    fetchSavedNotes (page = 0, size = 100, loader) {
        let result = `/v1/api/note/saved/?page=${page}&size=${size}`
        if (loader) {
            result = result + '&showloader=true'
        }
      return result
    },
    fetchSavedNoteTags:`/v1/api/userTags`,
    filterNotesByTags () {
        return `/v1/api/note/savedwithtags?showloader=true`
    },
    usersSubjectTags (tagParams) {
      return `/v1/api/tags?query=${tagParams}`
    },
    createNote: `/v1/api/note`,
    inviteFriend: `/v1/api/referFriend`,
    feedback: `/v1/api/feedback`,
    deleteNote: `/v1/api/note/delete`,
    contentBookmarks: `/v1/api/addToLibrary`,
    phoneVerification: `/v1/api/sendOtp`,
    principalVerification(principal) {
      return `/v1/public/exist/${principal}`
    },
    otpVerification: `/v1/api/validateOtp`,
    userProfileUpdateurl: `/v1/api/updateProfileInfo`,
    deleteBookmarks() {
      return `/v1/api/removeFromLibrary`
    },
    getBookmarkedData(page = 0, size = 100, type = '', loader) {
        let result = `/v1/api/getUserLibrary?page=${page}&size=${size}&type=${type}`
        if (loader) {
            result =  result + '&showloader=true'
        }
        return result
    },
    postLMS: `/v1/api/lrs`,
    dislike: `/v1/api/dislike`,
    getRecentContent(page = 0, size = 100, childId){
      if(childId){
        return `/v1/api/contentlist?page=${page}&size=${size}&childId=${childId}`
      }
      else {
        return `/v1/api/contentlist?page=${page}&size=${size}`
      }

    },
    notificationPolling({page=0, size=10, query, type=''}) {
        if(query) {
            return `/v1/notification/get/?page=${page}&size=${size}&query=LATEST&type=${type}`
        } else {
            return `/v1/notification/get/?page=${page}&size=${size}&type=${type}`
        }
    },
    notificationBellClick: `/v1/notification/bellIcon`,
    markNotificationRead: `/v1/notification/mark`,
    updatePrivacy: `/v1/api/privacy`,
    getProfileSetting(userId){
      if(userId !== undefined){
        return `/v1/api/getProfileSettings?userId=${userId}`
      }else{
        return `/v1/api/getProfileSettings`
      }
    },
    // getProfileSetting:`/v1/api/getProfileSettings`,
    getProfileBuddies (userId) {
        return `/v1/api/search/searchUserBuddies?userIdInProfile=${userId}`
    },
    getMySubscription (childId,parentIn) {
        if(parentIn) {
            return `/v1/api/mySubscriptions?childId=${childId}&showloader=true`
        }else{
            return `/v1/api/mySubscriptions?showloader=true`
        }

    },
    getUserPlans:`/v1/public/viewPlans`,
    getProfileSettingFullUrl:`/v1/api/getProfileSettings`,
    getUserProfile (userId) {
        return `/v2/api/getUserProfile?userId=${userId}`
    },
    updateProfile: `/v1/api/updateProfileSettings`,
    updateProfilePic (url) {
        return url? `/v1/api/updateProfilePic?url=${url}` : `/v1/api/updateProfilePic`
    } ,
    getLastPics: `/v1/api/lastPics`,
    urlToGetSignedUrl (language = 'en', filename = 'myFile') {
        filename = filename + (new Date().getTime())
        return `/v1/api/content/getContentUploadUrl?lang=${language}&name=${filename}`
    },
    contentSearch (type, q, page, size, childId='') {
        return `/v1/api/search/searchContent?type=${type}&q=${q}&page=${page}&size=${size}&childId=${childId}`
    },
    contentAutoComplete (q, page, size, childId='') {
        return `/v1/api/search/searchAutoCompleteContent?q=${q}&page=${page}&size=${size}&childId=${childId}`
    },

    //My progress
    lrsGetTotalPointsAndCoinsURL(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalPointsAndCoins?durationType=${p.duration}&pageNo=${p.page}&size=${p.size}&currentProfileUserId=${p.childId}&subjectId=${p.subjectId}&showloader=true`
        }else{
            return `/v1/api/lrsGetTotalPointsAndCoins?durationType=${p.duration}&pageNo=${p.page}&size=${p.size}&subjectId=${p.subjectId}&showloader=true`
        }

    },
    lrsGetTotalTimeSpentURL(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalTimeSpent?durationType=${p.duration}&pageNo=${p.page}&size=${p.size}&subjectId=${p.subjectId}&currentProfileUserId=${p.childId}&showloader=true`
        }else{
            return `/v1/api/lrsGetTotalTimeSpent?durationType=${p.duration}&pageNo=${p.page}&size=${p.size}&subjectId=${p.subjectId}&showloader=true`
        }

    },
    getScoreBoard(p){

        if(p.childId) {
            return `/v1/api/lrsGetUserRankForTimePeriod?durationType=${p.duration}&subjectId=${p.subjectId}&role=${p.role}&currentProfileUserId=${p.childId}&showloader=true`
        }
        else{
            return `/v1/api/lrsGetUserRankForTimePeriod?durationType=${p.duration}&subjectId=${p.subjectId}&role=${p.role}&currentProfileUserId=${p.userId}&showloader=true`
        }
    },
    getScoreBoardSubjects(p) {
        if(p.childId) {
            return `/v1/api/getUserAchievementPerSubject?durationType=${p.duration}&role=${p.role}&currentProfileUserId=${p.childId}&showloader=true`
        }else{
            return `/v1/api/getUserAchievementPerSubject?durationType=${p.duration}&role=${p.role}&currentProfileUserId=${p.userId}&showloader=true`
        }

    },
    getAchievements(p) {
        if(p.childId) {
        return `v1/api/lrsGetUserAchievements?currentProfileUserId=${p.childId}&showloader=true`
        }else{
        return `v1/api/lrsGetUserAchievements?currentProfileUserId=${p.userId}&showloader=true`
        }

    },
    getScoreBoardLastThreeTenure(p){
        if (p.type === 'earned') {
            if(p.childId){
                return `/v1/api/lrsGetPointsAndCoinsLastThreeTenure?durationType=${p.duration}&currentProfileUserId=${p.childId}`
            }else{
                return `/v1/api/lrsGetPointsAndCoinsLastThreeTenure?durationType=${p.duration}`
            }

        } else {
            if(p.childId) {
                return `/v1/api/lrsGetPointsAndCoinsSpentLastThreeTenure?durationType=${p.duration}&currentProfileUserId=${p.childId}`
            }else{
                return `/v1/api/lrsGetPointsAndCoinsSpentLastThreeTenure?durationType=${p.duration}`
            }

        }
    },
    getScoreBoardUserCoins(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalPointsAndCoinsOfUser?currentProfileUserId=${p.childId}`
        }else{
            return `/v1/api/lrsGetTotalPointsAndCoinsOfUser`
        }

    },
    getUserGrades(childId){
        if(childId){
            return `/v1/api/content/userGrades?childId=${childId}`
        }else{
            return `/v1/api/content/userGrades`
            }
        },

    //redemption apis
    viewRedemptions ({type, subType}) {
        if (subType) {
            return `/v1/api/viewAllRedemption?type=${type}&subtype=${subType}`
        } else {
            return `/v1/api/viewAllRedemption?type=${type}`
        }
    },
    redeem: `/v1/api/redeem`,
    useAccessory: `/v1/api/useAccessory`,
    removeAccessory: `/v1/api/removeAccessory`,
    viewGift ({giftId}) {
        return `/v1/api/viewGift?giftId=${giftId}`
    },
    previewMascot (id) {
        return `/v1/api/viewMascot?id=${id}`
    },
    applicationProperties: `/v1/public`,
    purgeDownload: `/v1/api/purgeDownload`,
    similarContentUrl (requestObj, loader) {
        let result = `v1/api/analytics/similar/${requestObj.id}/${requestObj.level}/${requestObj.type}?childId=${requestObj.childId ? requestObj.childId : ''} `
        if (loader) {
            result = result + '?showloader=true'
        }
        return result
    },
    getInvoice (id) {
        return `/v1/public/findInvoice/${id}?showloader=true`
    },
    getStaticPagesList (name) {
        // return `v1/admin/getStaticPagesList?name=${name}&showloader=true`
        return `v1/admin/getStaticPagesList?name=${name}`
    },
    startTest: `/v1/api/ASUser/userTest`,
    resumeTest (id) {
        return `/v1/api/ASUser/userTest/${id}`
    },
    getQuestion (testId, userId) {
        //return `/v1/api/ASUser/userASQues/${testId}/${userId}/5b3c6bb801b8b70292b8bf2b/TFQ`
        //return `/v1/api/ASUser/userASQues/${testId}/${userId}/5b39ef1968b38e38d475e9bd/MCQ`
        //return `/v1/api/ASUser/userASQues/${testId}/${userId}/5b3b55e0ec60bc7ac5ac5289/ATQ`
        return `/v1/api/ASUser/userASQuetionsDummy/${testId}`
    },
    getInstruction : `v1/api/ASUser/getASInstruction`,
    verifyQuestion : `/v1/api/ASUser/verifyUserASQuesAns`,
    skipQuestion (testId, questionId, type) {
        return `/v1/api/ASUser/skipQuestion/${testId}/${questionId}/${type}`
    },
    reviseQuestion : `v1/api/ASUser/getRevisionContent`,
    reviewAssessment (testId) {
        return `v1/api/ASUser/getUserTestScore/${testId}`
    },
    getPlanPriceSummary (requestObj) {
        return `v1/public/planPriceSummary?subscriptionId=${requestObj.subscriptionId}&userId=${requestObj.userId}&payeeUserId=${requestObj.payeeUserId}&promoCode=${requestObj.promoCode}&discountCodeId=${requestObj.discountCodeId}&email=${requestObj.email}&phone=${requestObj.phone}`
    },
    getPaymentInvoice (invoiceId) {
        return `v1/public/downloadInvoice?invoiceId=${invoiceId}`
    },
    getPaymentInvoiceDetails (invoiceId) {
        return `v1/public/invoiceDetails?invoiceId=${invoiceId}`
    },
    getUserPaymentParam (transactionId, userId) {
        return `v1/public/userPaymentParam?transactionId=${transactionId}&userId=${userId}`
    },
    getUserExpiry: `/v1/api/expiry`,
    activateFreePlan(p){
        return `/v1/public/activateFreePlan?subscriptionId=${p.subscriptionId}&userId=${p.userId}&payeeUserId=${p.payeeUserId}&promoCode=${p.promoCode}&discountCodeId=${p.discountCodeId}&email=${p.email}&phone=${p.phone}`
    },
    lrsGetTotalTimeSpentInPercentage(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalTimeSpentInPercentage?durationInDays=${p.durationInDays}&pageNo=${p.page}&size=${p.size}&subjectId=${p.subjectId}&currentProfileUserId=${p.childId}&showloader=true`
        }else{
            return `/v1/api/lrsGetTotalTimeSpentInPercentage?durationInDays=${p.durationInDays}&pageNo=${p.page}&size=${p.size}&subjectId=${p.subjectId}&showloader=true`
        }

    },
    getDataForAssessmentGraph(p){
        if(p.childId) {
            return `/v1/api/ASUser/getDataForAssessmentGraph?curriculumId=${p.curriculumId}&size=${p.size}&subjectId=${p.subjectId}&childId=${p.childId}&showloader=true`
        }else{
            return `/v1/api/ASUser/getDataForAssessmentGraph?curriculumId=${p.curriculumId}&size=${p.size}&subjectId=${p.subjectId}&showloader=true`
        }

    },
    getDataForAssessmentGraphAll(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalPointsAndCoinsInPercentageAssessment?pageNo=${p.page}&size=${p.size}&childId=${p.childId}&durationInDays=${p.durationInDays}&showloader=true`
        }else{
            return `/v1/api/lrsGetTotalPointsAndCoinsInPercentageAssessment?pageNo=${p.page}&size=${p.size}&durationInDays=${p.durationInDays}&showloader=true`
        }

    },
    lrsGetTotalPointsAndCoinsInPercentage(p){
        if(p.childId) {
            return `/v1/api/lrsGetTotalPointsAndCoinsInPercentage?durationInDays=${p.durationInDays}&pageNo=${p.page}&size=${p.size}&currentProfileUserId=${p.childId}&showloader=true`
        }else{
            return `/v1/api/lrsGetTotalPointsAndCoinsInPercentage?durationInDays=${p.durationInDays}&pageNo=${p.page}&size=${p.size}&showloader=true`
        }

    }
}
