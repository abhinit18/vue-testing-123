<template>
  <div class="resourcesPageSec">
    <a class="pclose" @click="closePopup">
      <span>
        <i class="material-icons">&#xE5CD;</i>
      </span>{{$t('settings.close')}}</a>
    <div class="studyPopUpInner">
      <div class="pcontainer">
        <h3 class="popHeading">{{$store.getters['content/subTopicById'](topicId, subTopicId).name}}</h3>
        <div class="resFilter">
          <label class="control control--checkbox" v-for="type in getTypes">
            <input type="radio" :checked="selectedCheck===type.name" @change="toggleCheck(type.name)">
            <span>{{$t(type.code)}}</span>
          </label>
        </div>
      </div>

      <div class="resourcesList clearfix">
        <div class="pcontainer">



          <div class="quizTabContent" v-if="selectedCheck==='QUIZ'">

            <div class="bg-warning attemptResult" v-if="showPreviousAttemptBox()">
              <h4>{{$t('assessment.previous_attempt')}}</h4>
              <p>{{previousAttemptPoints}} {{$t('activity.points_earned_small')}}
                <a class="btn btn-link" @click="reviewAssessment">{{$t('assessment.review')}}</a>
              </p>
            </div>

            <div class="quizInstructions">
              <h3>{{$t('assessment.instructions')}}</h3>

              <ul>
                <li v-for="point in instructionSequence">{{getInstructionPoint(point.instructionBody)}}</li>
              </ul>

              <button v-if="isAssessmentAvailable()" class="btn btn-primary btn-lg" @click="goToAssessment">
                <!-- <i class="material-icons refreshIcon">refresh</i>  -->
                {{getTestState()}}</button>

                <button disabled v-if="!isAssessmentAvailable()" class="btn btn-primary btn-lg" @click="goToAssessment">
                  <!-- <i class="material-icons refreshIcon">refresh</i>  -->
                  No Assessments Available</button>
              </div>
          </div>

          <div class="resourcesListInner" v-if="selectedCheck!=='QUIZ'">
            <contentBox :key="content.contentId" :cornerElement="index" :goToContentView="openContentPopup" :subTopicId="subTopicId"
              :content="content" v-for="(content, index) in ($store.state.content.contentSubTopic[subTopicId]? $store.state.content.contentSubTopic[subTopicId].filter((content) => { return filterForContent(content)}): [])"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bottomSec" v-if="selectedCheck!=='QUIZ'">
      <div class="pcontainer">
        <div class="col-sm-6">
          <a @click="changePage(false)" v-if="getPreviousSubTopic" :class="{onlyOneLink: getPreviousSubTopic && (getNextSubTopic === null), whenOnlyLeft: getPreviousSubTopic && (getNextSubTopic === null)}">
            <span>{{$t('study.previous')}}</span>
            <i class="material-icons">&#xE314;</i> <label class="linkName">{{getPreviousSubTopic.name}}</label></a>
        </div>
        <div class="col-sm-6">
          <a @click="changePage(true)" v-if="getNextSubTopic" :class="{onlyOneLink: getNextSubTopic && (getPreviousSubTopic === null)}">
            <span>{{$t('study.next')}}</span>
            <i class="material-icons">&#xE315;</i> <label class="linkName">{{getNextSubTopic.name}}</label></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contentBox from '~/components/contentBox'
  export default {
    head() {
      return {
        title: this.$t('index.study')
      }
    },
    middleware: 'authenticated',
    validate({ params, query, store }) {
      let subTopicIdRaw = params.subtopic
      let subTopicSplit = subTopicIdRaw.split('-')
      if (subTopicSplit.length !== 2) {
        return false
      } else {
        let subTopicString = subTopicSplit[1]
        let topicString = subTopicSplit[0]
        let subTopicId = Number(subTopicString)
        let topicId = Number(topicString)
        if (Number.isInteger(topicId) && Number.isInteger(subTopicId)) {
          return true
        } else {
          return false
        }
      }
    },
    data() {
      return {
        subjectId: '',
        curriculumId: '',
        topicId: '',
        subTopicId: '',
        topicSubtopicId: '',
        selectedCheck: 'ALL',
        page: 0,
        previousAttempt: '',
        previousAttemptPoints: '',
        assessmentAvailable:'',
        instructionsText: '',
        instructionSequence: '',
        previousAttemptTestId: '',
        selectedLocale: this.$store.state.locale.selectedLocale
      }
    },
    components: {
      contentBox
    },
    mounted() {
      this.subjectId = this.$router.currentRoute.params.subject
      this.curriculumId = this.$router.currentRoute.params.grade
      let subTopicRaw = this.$router.currentRoute.params.subtopic
      this.topicSubtopicId = subTopicRaw
      let subTopicRawArr = subTopicRaw.split('-')
      this.topicId = subTopicRawArr[0]
      this.subTopicId = subTopicRawArr[1]
      this.$store.dispatch('header/navChange', { key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this })
      this.fetchInitialData()
    },
    fetch({
      store,
      params
    }) {
      let promiseArray = []
      promiseArray.push(store.dispatch('content/fetchSubject', {
        id: 1,
        curriculumId: params.grade,
        childId: store.getters['getCurrentChildId'](),
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale,
        loader: true
      }))
      return Promise.all(promiseArray)
    },
    methods: {
      getInstructionPoint(pointArray) {
        let quesArray = pointArray.filter(temp => (temp.lang === this.selectedLocale))
        if (quesArray.length > 0) {
          return quesArray[0]["text"]
        }
        return ''
      },
      showPreviousAttemptBox() {
        //return this.previousAttempt ==='REATTEMPT' || this.previousAttempt === 'RESUME'
        return (this.previousAttempt === 'REATTEMPT')
      },
      getTestState() {
        if (this.previousAttempt === 'RESUME') {
          return this.$t('assessment.resume')
        } else if (this.previousAttempt === 'REATTEMPT') {
          return this.$t('assessment.reattempt')
        } else {
          return this.$t('assessment.attempt')
        }
      },
      fetchInitialData() {
        this.$store.dispatch('content/fetchTopic', {
          id: this.subjectId,
          level: 'SUBJECT',
          childId: this.$store.getters['getCurrentChildId'](),
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: false
        })
        this.$store.dispatch('content/fetchTopic', {
          id: this.topicId,
          level: 'TOPIC',
          childId: this.$store.getters['getCurrentChildId'](),
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: false
        })
        this.$store.dispatch('content/fetchContentForSubTopic', {
          id: this.subTopicId,
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: true,
          page: 0,
          size: 1000,
          childId: this.$store.getters['getCurrentChildId']()
        })
      },
      toggleCheck(value) {
        if (value === 'QUIZ') {
          let payload = { subTopicCurrIds: { id: this.subTopicId, curriculumId: this.curriculumId } }
          this.$store.dispatch('assessment/getInstruction', {
            payload,
            authToken: this.$store.state.auth.user.token,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.data) {
              let resp = response.data.data
              if (resp.previousAttemptedTestStatus) {
                this.previousAttempt = resp.previousAttemptedTestStatus.action
                this.previousAttemptPoints = resp.previousAttemptedTestStatus.earnPointsLastFinished
                this.previousAttemptTestId = resp.previousAttemptedTestStatus.previousTestId
              }
              this.assessmentAvailable = resp.assessmentAvailable

              // other response types and further actions
              this.instructionsText = resp.resp[0].text
              this.instructionSequence = resp.resp[0].instructionMetaData
            }
            this.selectedCheck = value
          }, error => {

          })
        } else {
          this.selectedCheck = value
        }
      },
      closePopup() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjectId}`))
      },
      openContentPopup(selectedContent) {
        let content = selectedContent.contentId
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjectId}/${this.topicSubtopicId}/${content}`))
      },
      isAssessmentAvailable(){
        if(this.assessmentAvailable || this.assessmentAvailable == 'true')
          return true;

        return false;
      },
      changePage(next) {
        let currentRoute = this.$router.currentRoute.path
        let currentRouteSplit = currentRoute.split('/')
        let subTopicRaw = currentRouteSplit[currentRouteSplit.length - 1]
        let topic = subTopicRaw.split('-')[0]
        currentRouteSplit.splice(currentRouteSplit.length - 1, 1)
        let tillSubtopic = currentRouteSplit.join('/')
        this.$router.push(this.$store.getters['locale/getFinalUrl'](tillSubtopic + '/' + topic + '-' + (next ? this.getNextSubTopic.id : this.getPreviousSubTopic.id)))

      },
      filterForContent(content) {
        if (this.selectedCheck === 'ALL') {
          return true
        } else {
          if (this.selectedCheck === 'VIDEO' && content.type === 'VIDEO') {
            return true
          } else if (this.selectedCheck === 'EBOOK' && content.type === 'EPUB') {
            return true
          } else if (this.selectedCheck === 'ARTICLE' && (content.type === 'ARTICLE' || content.type === 'THIRDPARTY')) {
            return true
          } else {
            return false
          }
        }
      },
      goToAssessment() {
        let tempSubTopic = this.$store.getters['content/subTopicById'](this.topicId, this.subTopicId)
        this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessment`), query: { type: 2, name: tempSubTopic.name, subjId: this.subjectId, topicId: this.topicId, topicIdNav: this.topicId, subTopicIdNav: this.subTopicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId } })
      },
      reviewAssessment() {
        let tempSubTopic = this.$store.getters['content/subTopicById'](this.topicId, this.subTopicId)
        this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessmentReview`), query: { testId: this.previousAttemptTestId, type: 2, name: tempSubTopic.name, subjId: this.subjectId, topicId: this.topicId, topicIdNav: this.topicId, subTopicIdNav: this.subTopicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId } })
      }
    },
    computed: {
      getSubject() {
        let returnedSubject = this.$store.getters['content/subjectById'](this.subjectId)
        return returnedSubject ? returnedSubject : {}
      },
      getTypes() {
        let filterGrade = this.$store.state.userGrades.filter(temp => temp.curriculumId === this.curriculumId)
        if (filterGrade.length > 0) {
          if (filterGrade[0].tag === 'current' && this.$store.getters['isNotTeacherParent']()) {
            return this.$store.state.content.typesWithQuiz
          }
        }
        return this.$store.state.content.types
      },
      isMyGrade() {
        let filterGrade = this.$store.state.userGrades.filter(temp => temp.curriculumId === this.curriculumId)
        if (filterGrade.length > 0) {
          if (filterGrade[0].tag === 'current') {
            return true
          }
        } else if (this.$store.state.userGrades.length == 0) {
          return true
        }
        return false
      },
      getNextSubTopic() {
        let subTopics = this.$store.state.content.topic[this.topicId]
        let index = -1
        if (subTopics) {
          for (let i = 0; i < subTopics.length; i++) {
            if (subTopics[i].id.toString() == this.subTopicId) {
              index = i
            }
          }
          if (index === -1 || index === subTopics.length - 1) {
            return null
          }
          else {
            return subTopics[index + 1]
          }
        } else {
          return null
        }
      },
      getPreviousSubTopic() {
        let subTopics = this.$store.state.content.topic[this.topicId]
        let index = -1
        if (subTopics) {
          for (let i = 0; i < subTopics.length; i++) {
            if (subTopics[i].id.toString() === this.subTopicId) {
              index = i
            }
          }
          if (index === -1 || index === 0) {
            return null
          }
          else {
            return subTopics[index - 1]
          }
        } else {
          return null
        }
      }
    }
  }
</script>
<style>
  .studyPopUpPage {
    top: 20px;
    position: fixed;
  }

  .onlyOneLink {
    width: 100%
  }

  .whenOnlyLeft {
    text-align: left!important;
  }

  .whenOnlyLeft .material-icons {
    float: left!important;
    margin: 0 0 0 -30px!important;
  }

  .video_thumbnail {
    max-height: 133px
  }
</style>
