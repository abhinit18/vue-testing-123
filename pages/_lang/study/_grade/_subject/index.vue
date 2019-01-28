<template>
  <div class="conMidSec">
    <ol class="breadcrumb">
      <li><a href="#">{{$t('index.study')}}</a></li>
      <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
    </ol>
    <div class="primarySubjectPage clearfix" style="display: none;">
      <div class="subTopHed clearfix">
        <button class="btnBacktoPrePage" @click="back">
          <i class="material-icons">&#xE314;</i>
        </button> {{$t('index.back_to_subject')}}
      </div>
      <div class="subjectTop clearfix">
        <div class="img">
          <img class="temp_size_subject" :src="getSubject.imageUrl">
        </div>
        <div class="info">
          <h4>{{getSubject.name }}</h4>
          <div class="grd">{{$t('buddy.grade')}}
            <div class="select">
              <span class="icons select__arrow"></span>
              <select @change="navigateTo" v-model="curriculumId">
                <option :value="grade.curriculumId" v-for="grade in $store.state.userGrades" :selected="curriculumId === grade.curriculumId">{{grade.name}}</option>
              </select>
            </div>
            {{!isMyGrade? $t('assessment.switch_to_own_grade'): ''}}
          </div>

          <div class="earnedPoitnsBar">
            <label>{{$t('assessment.completion')}}</label>
            <div class="bar">
              <div class="fill" :style="{ width: getSubjectCompletionPercent + '%' }"></div>
              <span>{{getSubjectCompletionPercent}}%</span>
            </div>
            <p v-if="false">
              <strong>{{getSubjectCompletion? getSubjectCompletion.earned : 0}}</strong> {{$t('activity.points_earned')}}
            </p>
          </div>



          <router-link class="btn btn-primary pull-right" :to="$store.getters['locale/getFinalUrl']('/myprogress')">
            <!-- <i class="myprogressIco"></i>  -->{{$t('index.my_progress')}}</router-link>
        </div>
      </div>

      <div class="subDetailSec">
        <div :class="{topicListStatus: true}">
          <ul class="topicListStatusUl">
            <li v-for="(topic,index) in $store.state.content.topic[subjectId]" :class="{completed: (checkFull(topic.completionPercent)), topicListStatusDetails: (detailOpenFor==topic.id)}">


              <div class="subtopicOuter">
                <div class="c100 small" v-if="!checkFull(topic.completionPercent)" :class="'p'+topic.completionPercent">
                  <!-- <span v-if="topic.completedSubTopic!= 0">{{topic.completedSubTopic}}/{{topic.totalSubTopic}}</span>
                  <span v-else>{{topic.completedSubTopic}}/{{topic.totalSubTopic}}</span> -->
                  <span>{{topic.completionPercent}}%</span>
                  <div class="slice">
                    <div class="bar"></div>
                    <div class="fill"></div>
                  </div>
                </div>

                <h4 @click="toggleDetailOpenFor(topic.id)">
                  <span class="img">
                    <img class="temp_size_topic" :src="topic.imageUrl" width="40px">
                  </span> {{topic.name}}
                  <i class="material-icons pull-right greenColor" v-if="checkFull(topic.completionPercent)">flag</i>
                </h4>
              </div>
              <div class="info">

                <div class="poitstext" v-if="detailOpenFor===topic.id">
                  <div class="col">
                    <span>{{topic.earnedPoints}}</span> {{$t('activity.points_earned')}}</div>
                  <!-- <div class="col" v-if="topic.totalSubTopic!==topic.completedSubTopic">
                    <span>{{topic.totalSubTopic - topic.completedSubTopic}}</span> {{$t('study.remaining_message')}}
                  </div> -->
                </div>

                <div class="topiCheckList">
                  <div class="subListingBox">
                    <div class="coloredtab">
                      <ul class="tabBtn">
                        <li :class="{active: selectedTab === 'learn'}" @click="toggleTab('learn', topic)">
                          <a>{{$t('assessment.learn')}} </a>
                        </li>
                        <li :class="{active: selectedTab === 'take_quiz'}" @click="toggleTab('take_quiz', topic)" v-if="isMyGrade && $store.getters['isNotTeacherParent']()">
                          <a>{{$t('assessment.take_quiz')}}</a>
                        </li>
                      </ul>
                    </div>



                    <div v-if="selectedTab === 'take_quiz'">
                      <div class="flagInfoSec">
                        {{(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))? $t('assessment.earned_flag') : $t('assessment.earn_flag')}}
                        <i class="material-icons" @click="openInfo" v-if="(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))">info_outline</i>
                      </div>

                      <div class="popUpOverlay" v-if="infoOpen">
                        <div class="flagHintPopup">
                          <div class="popUpBox" v-on-click-outside="closeInfo">

                            <i class="material-icons" v-if="(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))">flag</i>
                            <div class="popUpTxt">
                              <p>{{$t('assessment.complete_all_subtopics')}}</p>
                            </div>
                            <!-- <div class="text-center">
                          <button type="button" class="btn btn-link btn-quiz btnSumbit">
                              <i class="material-icons refreshIcon">refresh</i>Try Again</button>
                      </div> -->
                          </div>
                        </div>
                      </div>
                      <div class="bg-warning attemptResult" v-if="showPreviousAttemptBox()">
                        <h4>{{$t('assessment.previous_attempt')}}</h4>
                        <p>{{previousAttemptPoints}} {{$t('activity.points_earned_small')}}
                          <a class="btn btn-link" @click="reviewAssessment(topic)">{{$t('assessment.review')}}</a>
                        </p>
                      </div>


                      <div class="quizInstructions">
                        <h3>{{$t('assessment.instructions')}}</h3>


                        <ul>
                          <li v-for="point in instructionSequence">{{getInstructionPoint(point.instructionBody)}}</li>
                        </ul>
                        <button v-if='' class="btn btn-primary btn-lg" @click="goToAssessment(topic)">
                          <!-- <i class="material-icons refreshIcon">refresh</i>  -->
                          {{getTestState()}}</button>

                      </div>
                    </div>


                    <div v-if="detailOpenFor==topic.id && selectedTab === 'learn'">

                      <!-- <a class="pclose"><i class="material-icons">&#xE5CD;</i></a> -->

                      <!-- <div class="remainingTopicsCart">
                        <label>{{topic.totalSubTopic - topic.completedSubTopic}} {{$t('common.moreFlag')}}</label>

                      </div> -->
                      <div class="trow">



                        <div v-for="subtopic in $store.state.content.topic[topic.id]" @click="toSubTopicDescription(subtopic, topic.id)">
                          <span :class="{completed: subtopic.markAsComplete}"></span>
                          <label>{{subtopic.name}}</label>

                        </div>




                      </div>
                      <strong class="flag">
                        <i class="material-icons" :class="[{greenColor: checkFull(topic.completionPercent)}]">flag</i>
                      </strong>

                      <!--    <div class="flagRemaining">
   {{topic.totalSubTopic - topic.completedSubTopic}}  {{$t('study.remaining_message')}}

  <div><i class="material-icons">&#xE316;</i></div>
                                     </div> -->


                    </div>








                  </div>


                </div>








              </div>

            </li>
          </ul>
        </div>
      </div>





    </div>








    <div class="notprimarySubjectPage">


      <div class="subjectTop clearfix">

        <div class="pull-right">
          <router-link class="btn btn-primary pull-right" :to="$store.getters['locale/getFinalUrl']('/myprogress')">
          {{$store.getters['isNotTeacherParent']()? $t('index.my_progress'): $t('index.parent_progress')}}
            <!-- <i class="myprogressIco"></i> -->
            <!-- {{$t('index.my_progress')}} -->
            </router-link>
        </div>
        <button class="btnBacktoPrePage" @click="back">
          <i class="material-icons">&#xE314;</i>
        </button>

        <div class="img">
          <img class="temp_size_subject" :src="getSubject.imageUrl">
        </div>

        <div class="info">

          <h4>{{getSubject.name }}</h4>
          <div class="grd">{{$t('buddy.grade')}}
            <div class="select">
              <span  v-if="!$store.getters['isParent']()" class="icons select__arrow"></span>
              <select v-if="!$store.getters['isParent']()" @change="navigateTo" v-model="curriculumId">
                <option :value="grade.curriculumId" :selected="curriculumId === grade.curriculumId" v-for="grade in $store.state.userGrades">{{grade.name}}</option>
              </select>
              <select v-if="$store.getters['isParent']()" disabled @change="navigateTo" v-model="curriculumId">
                <option :value="grade.curriculumId" :selected="curriculumId === grade.curriculumId" v-for="grade in $store.state.userGrades">{{grade.name}}</option>
              </select>
            </div>
            {{!isMyGrade && $store.getters['isNotTeacherParent']()? $t('assessment.switch_to_own_grade'): ''}}
          </div>
          <div class="earnedPoitnsBar">
            <label>{{$t('assessment.completion')}}</label>
            <div class="bar">
              <div class="fill" :style="{ width: getSubjectCompletionPercent + '%' }"></div>
              <span>{{getSubjectCompletionPercent}}%</span>
            </div>
            <!-- <p>3450 Points</p> -->
            <p v-if="false">
              <strong>{{getSubjectCompletion.earned? getSubjectCompletion.earned : 0}}</strong> {{$t('activity.points_earned')}}
            </p>

          </div>
        </div>
      </div>
      <div class="subDesc">
        <h5>{{$t('study.description')}}</h5>
        <p>
          {{getSubject.description}}
        </p>
      </div>


      <div :class="{topicListStatus: true}">
        <h5>{{$t('study.topics')}} ({{$store.state.content.topic[subjectId]? $store.state.content.topic[subjectId].length: 0}})
        </h5>
        <ul class="topicListStatusUl">
          <li v-for="(topic,index) in $store.state.content.topic[subjectId]" :class="{completed: checkFull(topic.completionPercent), topicListStatusDetails: (detailOpenFor==topic.id)}">



            <div class="c100 small" v-if="!checkFull(topic.completionPercent)" v-bind:class="'p' + topic.completionPercent">
              <span>{{topic.completionPercent}}%</span>
              <div class="slice">
                <div class="bar"></div>
                <div class="fill"></div>
              </div>
            </div>

            <h4 @click="toggleDetailOpenFor(topic.id)">
              <!--<i class="arrowIco"></i>-->
              <span class="img">
                <img class="temp_size_topic" :src="topic.imageUrl" width="40px">
              </span> {{topic.name}}
              <i class="material-icons pull-right" v-if="checkFull(topic.completionPercent)">flag</i>
            </h4>
            <div class="info">

              <!-- <div class="topiCheckList" v-if="detailOpenFor!==topic.id">
                                      <div class="trow">
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><strong class="flag"><i class="material-icons">flag</i></strong></div>
                                      </div>
                                    </div> -->




              <div class="poitstext" v-if="detailOpenFor==topic.id">
                <div class="col">
                  <span>{{topic.earnedPoints}}</span> {{$t('activity.points_earned')}}</div>
                <!-- <div class="col" v-if="!checkFull(topic.completionPercent)">
                  <span>{{topic.totalSubTopic - topic.completedSubTopic}}</span> {{$t('study.remaining_message')}}
                </div> -->
              </div>


              <div class="topiCheckList">
                <div class="coloredtab">
                  <ul class="tabBtn">
                    <li :class="{active: selectedTab === 'learn'}" @click="toggleTab('learn', topic)">
                      <a>{{$t('assessment.learn')}} </a>
                    </li>
                    <li :class="{active: selectedTab === 'take_quiz'}" @click="toggleTab('take_quiz', topic)" v-if="isMyGrade && $store.getters['isNotTeacherParent']()">
                      <a>{{$t('assessment.take_quiz')}}</a>
                    </li>
                  </ul>
                </div>
                <div v-if="selectedTab === 'take_quiz'">
                  <div class="flagInfoSec">
                    {{(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))? $t('assessment.earned_flag') : $t('assessment.earn_flag')}}
                    <i class="material-icons" @click="openInfo" v-if="!(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))">info_outline</i>
                    <i class="material-icons flagIco" v-if="(checkFull(topic.completionPercent) && checkSubTopicCompletion(topic))">flag</i>
                  </div>

                  <div class="popUpOverlay" v-if="infoOpen">
                    <div class="flagHintPopup">
                      <div class="popUpBox" v-on-click-outside="closeInfo">
                        <i class="material-icons">flag</i>
                        <div class="popUpTxt">
                          <p>{{$t('assessment.complete_all_subtopics')}}</p>
                        </div>
                        <!-- <div class="text-center">
                          <button type="button" class="btn btn-link btn-quiz btnSumbit">
                              <i class="material-icons refreshIcon">refresh</i>Try Again</button>
                      </div> -->
                      </div>
                    </div>
                  </div>

                  <div class="bg-warning attemptResult" v-if="checkSubTopicCompletion(topic)">
                    <p>{{$t('assessment.topic_level_completion')}}</p>
                  </div>

                  <div class="bg-warning attemptResult" v-if="showPreviousAttemptBox()">
                    <h4>{{$t('assessment.previous_attempt')}}</h4>
                    <p>{{previousAttemptPoints}} {{$t('activity.points_earned_small')}}
                      <a class="btn btn-link" @click="reviewAssessment(topic)">{{$t('assessment.review')}}</a>
                    </p>
                  </div>


                  <div class="quizInstructions">
                    <h3>{{$t('assessment.instructions')}}</h3>

                    <ul>
                      <li v-for="point in instructionSequence">{{getInstructionPoint(point.instructionBody)}}</li>
                    </ul>

                    <button v-if="isAssessmentAvailable()" class="btn btn-primary btn-lg" @click="goToAssessment(topic)">
                      <!-- <i class="material-icons refreshIcon">refresh</i>  -->
                      {{getTestState()}}</button>

                      <button disabled v-if="!isAssessmentAvailable()" class="btn btn-primary btn-lg" @click="goToAssessment">
                        <!-- <i class="material-icons refreshIcon">refresh</i>  -->
                        No Assessments Available</button>
                  </div>
                </div>

                <div v-if="detailOpenFor==topic.id && selectedTab == 'learn'">
                  <div class="trow">
                    <div v-for="subtopic in $store.state.content.topic[topic.id]" @click="toSubTopicDescription(subtopic, topic.id)">
                      <span :class="{completed: subtopic.markAsComplete}"></span>
                      <label>{{subtopic.name}}</label>
                      <!--<small>{{subtopic.earnedPoints}}/{{subtopic.totalPoints}} Points Earned</small>-->
                    </div>

                    <!-- <strong class="flag"><i class="material-icons" :class="[{greenColor: (topic.totalSubTopic===topic.completedSubTopic)}]">flag</i></strong> -->
                  </div>
                  <!-- <div class="flagRemaining">
                  {{topic.totalSubTopic - topic.completedSubTopic}} {{$t('study.remaining_message')}}

                  <div><i class="material-icons">&#xE316;</i></div>
                </div> -->
                </div>






              </div>


            </div>
            <!-- <p v-else>You have reached the flag</p> -->
          </li>
        </ul>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.$t('index.study')
      }
    },
    middleware: 'authenticated',
    validate({
      params,
      query,
      store
    }) {
      let subjectId = params.subject
      let subjectIdNumber = Number(subjectId)
      if (Number.isInteger(subjectIdNumber)) {
        return true
      } else {
        return false
      }
    },
    data() {
      return {
        defaultId: 1,
        detailOpenFor: '',
        subjectId: '',
        curriculumId: '',
        similarId: '',
        selectedTab: 'learn',
        infoOpen: false,
        previousAttempt: '',
        previousAttemptPoints: '',
        assessmentAvailable:'',
        instructionsText: '',
        previousAttemptTestId: '',
        instructionSequence: '',
        selectedLocale: this.$store.state.locale.selectedLocale
      }
    },
    mounted() {
      this.subjectId = this.$router.currentRoute.params.subject
      this.curriculumId = this.$router.currentRoute.params.grade
      this.similarId = this.getSubject.similar
      this.fetchInitialData()

      if (this.$store.getters['isParent']()) {
        this.$store.dispatch('header/navChange', {
          key: 1,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          context: this
        })
      } else {
        this.$store.dispatch('header/navChange', {
          key: 2,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          context: this
        })
      }

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
        loader: true,
        context: this
      }).then(response => { console.log(response) }, (err) => { console.log(err) }))
      return Promise.all(promiseArray)
    },
    components: {},
    layout: 'study',
    methods: {

      getInstructionPoint(pointArray) {

        let quesArray = pointArray.filter(temp => (temp.lang === this.selectedLocale))
        if (quesArray.length > 0) {
          return quesArray[0]["text"]
        }
        return ''
      },
      checkSubTopicCompletion(topic) {
        if (topic.completedSubTopic == topic.totalSubTopic) {
          return true
        } else {
          return false
        }
      },
      checkFull(value) {
        if (value === 100 || value === '100') {
          return true
        } else {
          return false
        }
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
      goToAssessment(topic) {
        this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessment`), query: { type: 1, name: topic.name, subjId: this.subjectId, topicId: topic.id, curriculumId: this.curriculumId } })
      },
      reviewAssessment(topic) {
        this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessmentReview`), query: { testId: this.previousAttemptTestId, type: 1, name: topic.name, subjId: this.subjectId, topicId: topic.id, curriculumId: this.curriculumId } })
      },
      openInfo() {
        this.infoOpen = true
      },
      closeInfo() {
        this.infoOpen = false
      },
      toggleTab(value, topic) {
        if (value === 'take_quiz') {
          let payload = { topicCurrIds: { id: topic.id, curriculumId: this.curriculumId } }
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
              this.instructionSequence = resp.resp[0].instructionMetaData            }
            this.selectedTab = value
          }, error => {

          })
        } else {
          this.selectedTab = value
        }
      },
      fetchInitialData() {
        let payload = {
          id: this.subjectId,
          level: 'SUBJECT',
          childId: this.$store.getters['getCurrentChildId'](),
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: true
        }
        if (!this.isMyGrade) {
          payload["similar"] = this.similarId
        }
        this.$store.dispatch('content/fetchTopic', payload)
      },
      clearQuizData() {
        this.selectedTab = 'learn'
        this.previousAttempt = '',
          this.previousAttemptPoints = '',
          this.instructionsText = '',
          this.previousAttemptTestId = '',
          this.instructionSequence = ''
          this.assessmentAvailable = '';
      },
      showPreviousAttemptBox() {
        //return this.previousAttempt ==='REATTEMPT' || this.previousAttempt === 'RESUME'
        return this.previousAttempt === 'REATTEMPT'
      },
      isAssessmentAvailable(){
        if(this.assessmentAvailable || this.assessmentAvailable == 'true')
          return true;

        return false;
      },
      toggleDetailOpenFor(topicId) {
        this.clearQuizData()
        if (topicId === this.detailOpenFor) {
          this.detailOpenFor = ''
          return
        }

        this.$store.dispatch('content/fetchTopic', {
          curriculumId: this.curriculumId,
          level: 'TOPIC',
          childId: this.$store.getters['getCurrentChildId'](),
          id: topicId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: true
        }).then(response => {
          this.detailOpenFor = topicId
        })
      },
      back() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study`))
      },
      toSubTopicDescription(selectedSubTopic, topicId) {
        let subtopic = topicId + '-' + selectedSubTopic.id
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjectId}/${subtopic}`))
      },
      navigateTo(event) {
        let curriculumId = event.target.value
        let payload = {
          id: this.defaultId,
          curriculumId: event.target.value,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale
        }
        if (this.$store.getters['getCurrentChildId']()) {
          payload["childId"] = this.$store.getters['getCurrentChildId']()
        }
        this.$store.dispatch('content/checkSubjectExistence', payload).then(response => {
          if (response) {
            let similarFoundArray = response.filter(temp => temp.similar === this.similarId)
            if (similarFoundArray.length > 0) {
              let newSubjectId = similarFoundArray[0].id
              this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${curriculumId}/${newSubjectId}`) })
            } else {
              this.curriculumId = this.$router.currentRoute.params.grade
              this.$toast.error(this.$t('toastMsg.subject_not_found'))
            }
          } else {
            this.curriculumId = this.$router.currentRoute.params.grade
            this.$toast.error(this.$t('toastMsg.subject_not_found'))
          }
        })
      }
    },
    computed: {
      //TODO should not this be present on mount
      getSubject() {
        let returnedSubject = this.$store.getters['content/subjectById'](this.subjectId)
        return returnedSubject ? returnedSubject : {}
      },
      checkForSimilarSubject() {
        let returnedSubject = this.$store.getters['content/subjectBySimilar'](this.similarId)
        return returnedSubject ? true : false
      },
      getSubjectCompletion() {
        return this.$store.getters['content/subjectPointsById'](this.subjectId)
      },
      getSubjectCompletionPercent() {
        let completion = this.$store.getters['content/subjectPointsById'](this.subjectId)
        if (completion.completionPercent) {
          return completion.completionPercent
        }
        return 0
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
      }
    }
  }
</script>

<style>
  .temp_size_subject {
    max-width: 73px
  }

  .temp_size_topic {
    width: 40px
  }

  .greenColor {
    color: #64d28a!important
  }
</style>
