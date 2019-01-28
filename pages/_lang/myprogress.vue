<template>
  <div class="bodyCon clearfix">
    <section class="container">
      <div class="pagebox clearfix">
       <div class="pageboxOver" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}"></div>
        <sidebarUser ></sidebarUser>
        <!-- <sidebarUserStudy v-if="$store.getters['isParent']()"></sidebarUserStudy> -->
        <div class="contentSec ">
          <div class="scrollSec">
          <div class="conMidSec">
            <ol class="breadcrumb">
                              <li><a href="#">{{$t('index.home')}}</a></li>
                              <li class="active">{{$store.getters['isParent']()? $t('parentLog.progress') : title}}</li>
                            </ol>
            <div class="primaryContentSec clearfix">
              <div class="primaryContentSecInner clearfix">
              <div class="activityGrphSec clearfix">
                <!-- pravin changes teacher signup starts-->
                <div class="coloredtab">
                  <!-- <a class="activityMoreBtn moreLeft">
                    <i class="material-icons">chevron_left</i>
                  </a> -->
                  <ul class="tabBtn">
                    <li :class="{active: selectedSubjectId===0}">
                      <a @click="changeSubject(0)"> {{$t('activity.all_subjects')}} </a>
                    </li>
                    <li v-for="subject in $store.state.content.subjects" :class="{active: selectedSubjectId===subject.id}" v-if="!$store.getters['isTeacher']()">
                      <a @click="changeSubject(subject.id)"> {{subject.name}} </a>
                    </li>
                  </ul>
                  <!-- <a href="#" class="activityMoreBtn">
                    <i class="material-icons">chevron_right</i>
                  </a> -->
                </div>
                <div class="tabContent">
                  <!-- <div class="subTitleSec">
                                                                                       <div class="subTitle"><i class="material-icons">arrow_drop_up</i> Maths</div>
                                                                                    </div> -->
                  <div class="whiteTabBorderd clearfix">
                    <ul>
                      <li :class="{active: (activeTab === 'time')}">
                        <a @click="changeGraph('time')"> {{$t('activity.time_spent')}} </a>
                      </li>
                      <li :class="{active: (activeTab === 'point')}">
                        <a @click="changeGraph('point')"> {{$t('activity.points_earned')}} </a>
                      </li>
                      <!-- <li v-if='selectedSubjectId' :class="{active: (activeTab === 'assessment')}"> -->
                      <li v-if="!$store.getters['isTeacher']()" :class="{active: (activeTab === 'assessment')}">
                        <a @click="changeGraph('assessment')"> {{$t('assessment.assessment')}} </a>
                      </li>
                    </ul>
                  </div>
                  <div class="innerTabContent">
                    <div class="timeSelectSec clearfix">
                      <div v-if='!showDoughnut && !forAssessment' class="timeSelect">
                        <div class="timeDropIcon">
                          <i class="material-icons">expand_more</i>
                        </div>
                        <span class="selectedTime"> {{$t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].name)}} </span>
                        <ul class="timeSelectList">
                          <li @click="changeTimeFilter(time.code)" v-for="time in timeFilter"> {{$t(time.name)}} </li>
                        </ul>
                      </div>

                      <div v-else-if='showDoughnut && !forAssessment' class="timeSelect">
                        <div class="timeDropIcon">
                          <i class="material-icons">expand_more</i>
                        </div>
                        <span class="selectedTime"> {{$t(timeFilterAll.filter((timeF) => (timeF.code === selectedFilterAll))[0].name)}} </span>
                        <ul class="timeSelectList">
                          <li @click="changeTimeFilterAll(time.code)" v-for="time in timeFilterAll"> {{$t(time.name)}} </li>
                        </ul>
                      </div>

                      <h3 v-if='!forAssessment' class="leftTimeInfo"> {{timeTab? $t('activity.time_spent'): $t('activity.total_points_earned')}}
                        <span class="highLightTxt"> {{timeTab? secondsToDays(totalEarned) : totalEarned}} </span>
                      </h3>
                      <p v-if='!forAssessment' class="timeSpent">( {{$t('activity.graph_representating')}} {{timeTab? $t('activity.time_spent_small'): $t('activity.points_earned_small')}} )</p>
                      <p v-if='forAssessment && !allAssess'>{{$t('activity.learning_curve')}}</p>
                    </div>

                    <div class="ActivityGraphArea clearfix" style="position: relative">
                       <!-- <span class="prevMyProgress"  @click="next"><i class="material-icons">&#xE314;</i></span>
                       <span class="nextMyProgress" v-if="currentPage!==1" @click="previous"><i class="material-icons">&#xE315;</i></span> -->
                      <Doughnut v-if='showDoughnut' :chartData="graphDataAll" :options="options2" />
                      <linechart v-else-if='forAssessment && !allAssess' :chartData="graphDataAssesemt" :options="options3" />
                      <Chart v-else :chartData="graphData" :options="options" />
                    </div>



                      <div v-if='forAssessment && selectedSubjectId' class="finlaReportBoxMypro ">
                        <!-- Percentage {{percentage}}
                        Topics {{topicss}}/{{totalTopics}} -->




                      <div class="topicsColHead">

                          <div class="c100 small p50"><span>{{percentage}}</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div>

                        <div class="topicsCol">
                            <label>Topics</label>
                            <strong>{{topicss}}/{{totalTopics}}</strong>
                          </div>
                       </div>

                       <div class="finlaReportBoxHead">
                         Questions Answered <strong>20/95</strong>
                        </div>
                                             
                        <!-- Correct {{correctAns}}
                        Wrong {{wrongAns}}
                        Skipped {{skippedQues}} -->

                            <div class="finlaReportBox ">
                                <div class="finlaReportCols">
                                    <div class="finlaRprtAtmptIcon">
                                        <img src="~/assets/images/assessment/correct.svg">
                                    </div>
                                    <div class="finlaReportAttempt">{{$t('assessment.correct')}}</div>
                                    <div class="finlaRprtAtmptBox correctAttempt">
                                        {{correctAns}} 
                                    </div>
                                </div>
                                <div class="finlaReportCols">
                                    <div class="finlaRprtAtmptIcon">
                                        <img src="~/assets/images/assessment/wrong.svg">
                                    </div>
                                    <div class="finlaReportAttempt">{{$t('assessment.wrong')}}</div>
                                    <div class="finlaRprtAtmptBox wrongAttempt">
                                        {{wrongAns}} 
                                    </div>
                                </div>
                                <div class="finlaReportCols">
                                    <div class="finlaRprtAtmptIcon">
                                        <img src="~/assets/images/assessment/skipped.svg">
                                    </div>
                                    <div class="finlaReportAttempt">{{$t('assessment.skipped')}}</div>
                                    <div class="finlaRprtAtmptBox">
                                        {{skippedQues}} 
                                    </div>
                                </div>
                            </div>

                      </div>


                    <div class="clearfix timeSpentOuter">


                      <!-- <p class="timeSpent">{{$t('activity.graph_representating')}} {{timeTab? $t('activity.time_spent_small'): $t('activity.points_earned_small')}} {{$t('activity.in_study')}}</p> -->
                      <div v-if='!forAssessment' class="graphResultInfo ">
                        <h3 class="graphInfoHeading">{{$t('activity.pointers')}}</h3>
                        <ul class="graphInfoListing">
                          <li>
                            <span class="resultInfoIcon">
                                <i class="material-icons color1">{{timeTab? 'history': 'sentiment_very_satisfied'}}</i>
                              </span> {{timeTab? $t('activity.highest_time') : $t('activity.best_week') +' '+ $t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].nameS)}}:
                            <span class="highLightTxt">{{data.bestScore}} {{timeTab? $t('activity.seconds'): $t('index.points')}} ({{data.bestScoreTime}}) </span>
                          </li>
                          <li v-if="!timeTab">
                            <span class="resultInfoIcon" >
                                <i class="material-icons color2">sentiment_very_dissatisfied</i>
                              </span> {{$t('activity.lowest_week')}} {{$t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].nameS)}}:
                            <span class="highLightTxt">{{data.lowestScore}} {{timeTab? $t('activity.seconds'): $t('index.points')}} ({{data.lowestScoreTime}})</span>
                          </li>
                          <li>
                              <span class="resultInfoIcon">
                                <i class="material-icons color3">{{timeTab? 'hourglass_empty' : 'call_made'}}</i>
                              </span>
                              {{timeTab? $t('activity.most_time_spent') : $t('activity.highest_topic')}}:
                              <span class="highLightTxt">{{data.bestSubject}} - {{data.bestSubjectScore}} {{timeTab? $t('activity.seconds'): $t('index.points')}}</span>
                            </li>
                            <li>
                              <span class="resultInfoIcon">
                                <i class="material-icons color4">{{timeTab? 'hourglass_full' : 'call_received'}}</i>
                              </span>
                              {{timeTab? $t('activity.least_time_spent') : $t('activity.lowest_topic')}}:
                              <span class="highLightTxt">{{data.lowestSubject}} - {{data.lowestSubjectScore}} {{timeTab? $t('activity.seconds'): $t('index.points')}}</span>
                            </li>
                        </ul>
                      </div>
                      <div v-if='!forAssessment' class="graphResultInfo">
                        <h3 class="graphInfoHeading">{{$t('activity.goals')}}</h3>

                        <ul class="graphInfoListing">
                          <!-- <li>
                              <span class="resultInfoIcon">
                                <i class="material-icons color5">verified_user</i>
                              </span>
                              {{$t('activity.next_medal')}}:
                              <span class="highLightTxt">Need 50 Points</span>
                            </li>
                            <li>
                              <span class="resultInfoIcon">
                                <i class="material-icons color6">stars</i>
                              </span>
                              {{$t('activity.rank_update')}}:
                              <span class="highLightTxt">Need 120 Points</span>
                            </li> -->
                          <li>
                            <a @click="goTo('/study')">
                              <span class="resultInfoIcon">
                                  <i class="material-icons">play_arrow</i>
                                </span> {{$t('activity.increase_points')}}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="resFilter">
                      <label class="control control--checkbox" ><input :checked="activeUnderTab==='last'" type="checkbox" @change="changeUnderTab('last')">
                          <span v-if="$store.getters['isParent']()">{{$t('activity.childlast_activities')}}</span>
                          <span v-else>{{$t('activity.last_activities')}}</span>
                        </label>
                      <label class="control control--checkbox" ><input :checked="activeUnderTab==='recommended'" type="checkbox" @change="changeUnderTab('recommended')">
                          <span v-if="$store.getters['isParent']()">{{$t('activity.childrecommended_for_you')}}</span>
                          <span v-else >{{$t('activity.recommended_for_you')}}</span>
                        </label>
                    </div>

                    <div class="subjectsRow clearfix" v-if="activeUnderTab==='last'">
                      <!--  <h3 class="smallHeading">{{$t('activity.requires_attention')}}</h3> -->
                      <div class="  clearfix itemOuterRow">
                        <content-box :isSearch="true" :content="content" :cornerElement="index" v-for="(content, index) in $store.state.content.viewed" :key="content.contentId" />
                      </div>
                    </div>

                    <div class="subjectsRow clearfix" v-else>
                      <!-- <h3 class="smallHeading">{{$t('activity.last_activities')}}</h3> -->
                      <div class="  clearfix itemOuterRow">
                        <!-- <carousel :navigationEnabled=true :paginationEnabled=true :scrollPerPage=true :perPage=3 @pageChange="onPageChange"> -->

                            <content-box v-for="(content, index) in recommended" :cornerElement="index" :key="content.contentId" :isSearch="true" :content="content" />

                        <!-- </carousel> -->
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import sidebarUser from '~/components/sidebarUser'
  import sidebarUserStudy from '~/components/sidebarUserStudy'
  import Chart from '~/components/barChart'
  import contentBox from '~/components/contentBox'
  import { Carousel, Slide } from 'vue-carousel'
  import Doughnut from '~/components/doughnutChart'
  import linechart from '~/components/chart'
  export default {
    head () {
      return {
        title: this.title
      }
    },
    middleware: 'authenticated',
    data() {
      return {
                title: this.$t('index.my_progress'),
        graphData: {},
        graphDataAssesemt: {},
        graphDataAll: {},
        options: {
          animation: {
            animateScale: true,
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        },
        options3: {
          animation: {
            animateScale: true,
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: this.$t('activity.correct_answers'),
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: this.$t('activity.total_questions'),
              }
            }]
          }
        },
        options2: {
          animation: {
            animateScale: true,
          },
          responsive: true,
          maintainAspectRatio: false,
          
        },
        timeFilter: [{
            code: 'D',
            name: 'activity.days',
            nameS: 'activity.daysS'
          },
          {
            code: 'W',
            name: 'activity.weeks',
            nameS: 'activity.weeksS'
          },
          {
            code: 'M',
            name: 'activity.months',
            nameS: 'activity.monthsS'
          },
        ],
        timeFilterAll: [{
            code: 7,
            name: 'activity.last7days',
            nameS: 'activity.daysS'
          },
          {
            code: 30,
            name: 'activity.last30days',
            nameS: 'activity.weeksS'
          },
          {
            code: '',
            name: 'activity.tillDate',
            nameS: 'activity.monthsS'
          },
        ],
        selectedFilter: 'M',
        activeTab: 'time',
        data: {},
        totalEarned: 0,
        recommended: [],
        currentRecommPage: 0,
        last: [],
        activeUnderTab: 'last',
        selectedSubjectId: 0,
        currentPage: 1,
        showDoughnut: false,
        showBar: false,
        showLine: false,
        forAssessment: false,
        percentage: '',
        topicss: '',
        totalTopics: '',
        correctAns: '',
        wrongAns: '',
        skippedQues: '',
        durationInDays: 7,
        selectedFilterAll: 7,
        allAssess: false
      }
    },
    components: {
      sidebarUser,
      sidebarUserStudy,
      Chart,
      contentBox,
      Carousel,
      Slide,
      Doughnut,
      linechart
    },
    mounted() {
      if(this.$store.getters['isParent']()) {
        this.$store.dispatch('header/navChange', {
        key: 1,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
        })
        this.$store.dispatch('sidebarHomeContent/parentNavChange', 1)

      }else{
        this.$store.dispatch('header/navChange', {
        key: 1,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
        })
        this.$store.dispatch('sidebarHomeContent/navChange', 2)
      }

      this.initialUserProgressData()

      this.$root.$on('childProgressUpdatedData', ({data}) => {
        console.log(data)
       if(data){
        this.selectedSubjectId=0;
        this.initialUserProgressData()
        this.fetchData()
        this.fetchLast()
       }
      })
      this.fetchData()
      this.fetchLast()
      this.$store.dispatch('snowPlowPageView',{pageName: "HOME_MYPROGRESS"});
    },
    methods: {
      initialUserProgressData() {

        if (!this.$store.getters['isTeacher']()) {
          this.$store.dispatch('fetchUsersGrades', {authToken: this.$store.state.auth.user.token, childId: this.$store.state.currentSelectedChild.id, langCode: this.$store.state.locale.selectedLocale, context: this}).then(response =>{
                if(response.data.status === 'SUCCESS'){
                    console.log(this.$store.getters['getCurrentGrade']().curriculumId)
                    this.$store.dispatch('content/fetchSubject', {
                      curriculumId: this.$store.getters['getCurrentGrade']().curriculumId,
                      id: 1,
                      childId: this.$store.getters['getCurrentChildId'](),
                      authToken: this.$store.state.auth.user.token,
                      langCode: this.$store.state.locale.selectedLocale
                    }).then(resp => {
                      if(resp.response && resp.response.data && resp.response.data.code && resp.response.data.code === 'CHILDREN_SUBSCRIPTION_EXPIRED') {
                      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`));
                      }
                    })
                }
                else if(response.data.status === 'ERROR' && response.data.code === 'CHILDREN_SUBSCRIPTION_EXPIRED') {
                  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`));
                }
            })

      }
      },
      onPageChange(currentPage) {
        if (currentPage > this.currentRecommPage && currentPage%2!==0) {
          this.currentRecommPage = this.currentRecommPage + 1
          this.fetchRecommendation ()
        }
      },
      changeGraph(type) {
        this.currentPage = 1
        this.activeTab = type
        if(this.activeTab === 'assessment' && this.selectedSubjectId){
          this.forAssessment = true;
          this.allAssess = false;
          this.fetchDataForAssessment()
        }
        else if(this.activeTab === 'assessment' && this.selectedSubjectId === 0){
          this.forAssessment = true;
          this.allAssess = true;
          this.fetchDataForAssessmentAll()
        }else{
          this.forAssessment = false;
          this.allAssess = false;
          this.fetchData()
        }
      },
      changeSubject(subjectId) {
        // if(subjectId === 0)
        //   this.showDoughnut = true;
        this.currentPage = 1
        this.selectedSubjectId = subjectId
        // this.fetchData()
        if(this.activeTab === 'assessment' && this.selectedSubjectId){
          this.forAssessment = true;
          this.allAssess = false;
          this.fetchDataForAssessment()
        }else if(this.activeTab === 'assessment' && this.selectedSubjectId === 0){
          this.forAssessment = true;
          this.allAssess = true;
          this.fetchDataForAssessmentAll()
        }else{
          this.activeTab = 'time';
          this.forAssessment = false;
          this.allAssess = false;
          this.fetchData()
        }
      },
      changeUnderTab(type) {
        this.activeUnderTab = type
        if (type === 'last') {
          this.fetchLast()
        } else {
          this.fetchRecommendation()
        }
      },
      changeTimeFilter(code) {
        this.currentPage = 1
        this.selectedFilter = code
        this.fetchData()
      },
      changeTimeFilterAll(code) {
        this.currentPage = 1
        this.selectedFilterAll = code
        this.fetchData()
      },
      fetchRecommendation () {
        this.$store.dispatch('search/contentSearch', {
        type: 'ALL',
        q: '',
        page: this.currentRecommPage,
        size: 10,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        childId:this.$store.getters['getCurrentChildId']()
      }).then((response) => {
        // let a = this.recommended
        // let b = response.data.contents
        // let newArray = a.concat(b)
        // this.recommended = newArray
        this.recommended = response.data.contents
      })
      },
      fetchLast () {
        if (this.$store.state.content.viewed.length===0) {
          let childId = this.$store.state.currentSelectedChild?this.$store.state.currentSelectedChild.id:''
          this.$store.dispatch('content/fetchRecent',{ authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale,childId:childId, type: 'viewed'})
        }
      },
      fetchData() {
        let payload = {
          // 'duration': this.selectedFilter,
          'page': this.currentPage,
          'size': 6,
          'subjectId': this.selectedSubjectId
        }
        let vm = this
        let storeVerb = ''
        if(this.selectedSubjectId === 0 && (this.activeTab === 'time' ||  this.activeTab === 'point')){
          if(this.$store.getters['isTeacher']()) {
            this.showDoughnut = false;
            payload.duration = this.selectedFilter
            storeVerb = this.activeTab === 'time' ? 'lrsGetTotalTimeSpent' : 'lrsGetTotalPointsAndCoins'
          }
          else{
            this.showDoughnut = true;
            payload.durationInDays = this.selectedFilterAll
            if(this.activeTab === 'time'){
              storeVerb = 'lrsGetTotalTimeSpentInPercentage'
            }
            else{
              storeVerb = 'lrsGetTotalPointsAndCoinsInPercentage'
            }
          }
        }
        else{
          this.showDoughnut = false;
          payload.duration = this.selectedFilter
          storeVerb = this.activeTab === 'time' ? 'lrsGetTotalTimeSpent' : 'lrsGetTotalPointsAndCoins'
        }
        if(this.$store.getters['isParent']()) {
          payload.childId = this.$store.state.currentSelectedChild.id
        }
        this.$store.dispatch(`myprogress/${storeVerb}`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
          this.data = response
          // this.graphData = {
            if(this.selectedSubjectId === 0 && this.activeTab === 'time' && !this.$store.getters['isTeacher']()){
              this.graphDataAll = {
                labels: response.progressGraphPointPercentage.map(res => res.label),
                datasets: [{
                  label: vm.activeTab === 'time'? vm.$t('common.seconds') : vm.$t('index.points'),
                  backgroundColor: response.progressGraphPointPercentage.map(res => res.colorCode),
                  data: response.progressGraphPointPercentage.map(res => (res.totalTimeSpentInPercentage ? res.totalTimeSpentInPercentage : res.totalTimeSpent))
                }]
              }
            }
            else if(this.selectedSubjectId === 0 && this.activeTab === 'point' && !this.$store.getters['isTeacher']()){
              this.graphDataAll = {
                labels: response.progressGraphPointPercentage.map(res => res.label),
                datasets: [{
                  label: vm.activeTab === 'time'? vm.$t('common.seconds') : vm.$t('index.points'),
                  backgroundColor: response.progressGraphPointPercentage.map(res => res.colorCode),
                  data: response.progressGraphPointPercentage.map(res => (res.totalPointsInPercentage ? res.totalPointsInPercentage : res.totalPoints))
                }]
              }
            }
            else{
              this.graphData = {
                labels: response.progressGraphPointData.map(res => res.label),
                datasets: [{
                  label: vm.activeTab === 'time'? vm.$t('common.seconds') : vm.$t('index.points'),
                  backgroundColor: '#ffcc4b',
                  data: response.progressGraphPointData.map(res => (res.totalTimeSpent ? res.totalTimeSpent : res.totalPoints))
                }]
              }
            }
          // }
          this.totalEarned = 0
          let tempEarn = 0
          for (let j = 0; j < this.data.progressGraphPointData.length; j++) {
            let points = this.data.progressGraphPointData[j].totalTimeSpent ? this.data.progressGraphPointData[j].totalTimeSpent : this.data.progressGraphPointData[j].totalPoints
            tempEarn = tempEarn + parseInt(points)
          }
          this.totalEarned = tempEarn

        })
      },
      fetchDataForAssessment() {
        this.showDoughnut = false;
        let payload = {
          'curriculumId': this.$store.getters['getCurrentGrade']().curriculumId,
          'size': 6,
          'subjectId': this.selectedSubjectId
        }
        if(this.$store.getters['isParent']()) {
          payload.childId = this.$store.state.currentSelectedChild.id
        }
        let vm = this
        let storeVerb = 'getDataForAssessmentGraph'
        this.$store.dispatch(`myprogress/${storeVerb}`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
          // if(response.graphData){
          if(JSON.stringify(response.graphData) !== '{}'){
            this.data = response
            if("topicData" in response.graphData){
              this.percentage = response.graphData.topicData.percentageCompletion
              this.topicss = response.graphData.topicData.completedTopics
              this.totalTopics = response.graphData.topicData.totalTopics
            }
            else{
              // alert("else1")
            }
            // this.graphDataAssesemt = {}
            // if(response.graphData.dataPoints){
            if("dataPoints" in response.graphData){
              this.correctAns = response.graphData.correct
              this.wrongAns = response.graphData.wrong
              this.skippedQues = response.graphData.skipped
            // if(response.graphData.hasOwnProperty('dataPoints')){
            //if("dataPoints" in response.graphData){
              this.graphDataAssesemt = {
                labels: response.graphData.dataPoints.map(res => res.total),
                datasets: [{
                  label: this.$t('assessment.correct_answer'),
                  // backgroundColor: '#ffcc4b',
                  data: response.graphData.dataPoints.map(res => res.correct)
                }]
              }
            }
            else{
              // alert("else2")
              this.graphDataAssesemt = {
                labels: [],
                datasets: [{
                  label: '',
                  // backgroundColor: '#ffcc4b',
                  data: []
                }]
              }
            }
          }
          else{
            // alert("else")
            this.graphDataAssesemt = {
                labels: [],
                datasets: [{
                  label: '',
                  // backgroundColor: '#ffcc4b',
                  data: []
                }]
              }
          }

        })
      },
      fetchDataForAssessmentAll() {
        let payload = {
          'page': this.currentPage,
          'size': 6
        }
        let vm = this
        let storeVerb = ''
        this.showDoughnut = true;
        payload.durationInDays = this.selectedFilterAll
        storeVerb = 'getDataForAssessmentGraphAll'
        if(this.$store.getters['isParent']()) {
          payload.childId = this.$store.state.currentSelectedChild.id
        }
        this.$store.dispatch(`myprogress/${storeVerb}`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
          this.data = response
          this.graphDataAll = {
            labels: response.progressGraphPointPercentage.map(res => res.label),
            datasets: [{
              label: vm.activeTab === 'time'? vm.$t('common.seconds') : vm.$t('index.points'),
              backgroundColor: response.progressGraphPointPercentage.map(res => res.colorCode),
              data: response.progressGraphPointPercentage.map(res => (res.totalPointsInPercentage ? res.totalPointsInPercentage : res.totalPoints))
            }]
          }
        })
      },
      goTo(toAddress) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`${toAddress}`))
      },
      next () {
        this.currentPage = this.currentPage + 1
        this.fetchData ()
      },
      previous () {
        this.currentPage = this.currentPage - 1
        this.fetchData ()
      },
      secondsToDays (timeInSecs) {
        let result = ''

        //days calculation
        let days = Math.floor(timeInSecs/(24*3600))
        if (days!==0) {
          if (days === 1) {
            result = result + days +' ' + this.$t('common.days_s')
          } else {
            result = result + days +' ' + this.$t('common.days')
          }
        }

        //hours calculation
        let hours = Math.floor(timeInSecs%(24*3600)/(3600))
        if (hours!==0) {
          if (hours === 1) {
            result = result + ' ' + hours + ' ' + this.$t('common.hours_s')
          } else {
            result = result + ' ' + hours + ' ' + this.$t('common.hours')
          }
        }

        //minutes calculation
        let minutes = Math.floor(((timeInSecs%(24*3600))%(3600))/ 60)
        if (minutes!==0) {
          if (minutes === 1) {
            result = result + ' ' + minutes + ' ' + this.$t('common.minutes_s')
          } else {
            result = result + ' ' + minutes + ' ' + this.$t('common.minutes')
          }
        }

        //seconds calculation
        let seconds = Math.floor((((timeInSecs%(24*3600))%(3600))% 60))
        if (seconds!==0) {
          if (seconds === 1) {
            result = result + ' ' + seconds + ' ' + this.$t('common.seconds_s')
          } else {
            result = result + ' ' + seconds + ' ' + this.$t('common.seconds')
          }
        }

        return result
      }
    },
    computed: {
      timeTab() {
        return this.activeTab === 'time' ? true : false
      }
    }
  }
</script>

<style>
  .whiteTab li {
    cursor: pointer;
  }

  .ActivityGraphArea canvas {
    height: 300px !important;
  }

  .prevMyProgress{position:absolute;left:-30px;top:40%;cursor:pointer;}
  .nextMyProgress{position:absolute;right:-30px;top:40%;cursor:pointer;}
  .prevMyProgress .material-icons, .nextMyProgress .material-icons{font-size: 35px; color: #424956}
  .timeSelectSec {float: none; width: auto;position: relative;z-index: 10;}
</style>
