<template>
  <div class="conMidSec">
    <ol class="breadcrumb">
      <li><a href="#">{{$t('index.study')}}</a></li>
      <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
    </ol>
    <div class="subjectsRow clearfix">
      <h3 class="smallHeading"  v-if="$store.getters['isTeacher']()">{{$t('index.pick_a_grade')}}</h3>
      <div class="subjectsList  clearfix" v-if="$store.getters['isTeacher']()">
        <ul class="gradeChecks teacherGrade">
           <li v-for="grade in $store.state.userGrades">
             <label :class="{teacherGradeChecked: grade.curriculumId === getCurriculumId}">
               <input type="radio"
                 @change="gradeChange(grade.curriculumId)"
                :value="grade.curriculumId" :checked="grade.curriculumId === getCurriculumId">
               <span>{{grade.name}}</span>
             </label>
            </li>
        </ul>
      </div>
    </div>

    <div class="subjectsRow clearfix">
      <h3 class="smallHeading">{{$t('study.pick_subject')}}</h3>


      <div class="subjectsList primarySubjectsList clearfix" v-if="$store.getters['checkPrimaryType']()">
        <div v-if="$store.state.content.subjects.length>=4">
        <div v-swiper:mySwiper="swiperOption" >
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="subject in $store.state.content.subjects.filter((obj, index) => { if(moreClicked) {return true} else {return (index<subjectBeforeMore)}})">
              <span class="subImg"><img class="temp_size" :src="subject.imageUrl" @click="showTopics(subject)"></span> {{subject.name}}
            </li>


          </ul>

        </div>
         <div class="swiper-button-prev" slot="button-prev"><i class="material-icons">&#xE314;</i></div>
        <div class="swiper-button-next" slot="button-next"><i class="material-icons">&#xE315;</i></div>
      </div>

        <div v-else>
          <ul>
            <li v-for="subject in $store.state.content.subjects.filter((obj, index) => { if(moreClicked) {return true} else {return (index<subjectBeforeMore)}})">
              <span class="subImg"><img class="temp_size" :src="subject.imageUrl" @click="showTopics(subject)"></span> {{subject.name}}
            </li>


          </ul>

        </div>




      </div>



      <div class="subjectsList primarySubjectsList clearfix" v-if="!$store.getters['checkPrimaryType']()">
          <ul>
            <li v-for="subject in $store.state.content.subjects.filter((obj, index) => { if(moreClicked) {return true} else {return (index<subjectBeforeMore)}})">
              <span class="subImg"><img class="temp_size" :src="subject.imageUrl" @click="showTopics(subject)"></span> {{subject.name}}
            </li>
          </ul>
       </div>





    </div>
    <div class="expandSec clearfix" >
      <a class="expandBtn" @click="toggleMore" v-if="$store.state.content.subjects.length >= subjectBeforeMore">{{moreClicked? $t('common.less'): $t('common.more')}} <i class="material-icons expandIcon">{{moreClicked? 'expand_less': 'expand_more'}}</i></a>

    </div>
    <div class="subjectsRow recommendedSec2 clearfix" v-if="recommended.length>0">
      <h3 class="smallHeading">{{$t('common.recommended')}}</h3>
      <div class=" clearfix itemOuterRow">
        <!-- <carousel :navigationEnabled=true :paginationEnabled=true :scrollPerPage=true :perPage=4 @pageChange="onPageChange">
          <slide v-for="content in recommended" :key="content.contentId">-->
            <content-box  :cornerElement="index" :isSearch="true" :content="content"  v-for="(content, index) in recommended" :key="content.contentId" />
           <!--   </slide>
     </carousel> -->
      </div>
    </div>
    <noResource v-else/>
  </div>
</template>

<script>
  import contentBox from '~/components/contentBox'
  import noResource from "~/components/placeholders/noResource";
  // import { Carousel, Slide } from 'vue-carousel'
  export default {
    head () {
			return {
			title: this.$t('index.study')
			}
		},
    middleware: 'authenticated',
    data() {
      return {
        moreClicked: false,
        subjectBeforeMore: 6,
        recommended: [],
        saveUserGrades: '',
        currentRecommPage: 0,
        swiperOption: {
           slidesPerView: 4,
            spaceBetween: 0,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
         }
      }
    },
    layout: 'study',
    components: {
      contentBox,
      noResource
      // Carousel,
      // Slide
    },
    mounted() {
      this.$store.dispatch('header/navChange', {
        key: 2,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
      })
      this.$store.dispatch('sidebarStudyContent/navChange', 1)
      this.fetchRecommendation ()
    },
    fetch({
      store,
      params
    }) {
      // calculate how much data has to be fetched
      let promiseArray = []
        promiseArray.push(store.dispatch('content/fetchSubject', {
          curriculumId: params.grade,
          id: 1,
          childId: store.getters['getCurrentChildId'](),
          authToken: store.state.auth.user.token,
          langCode: store.state.locale.selectedLocale,
          loader: true
        }))
      return Promise.all(promiseArray)
    },
    methods: {
      onPageChange(currentPage) {
        if (currentPage > this.currentRecommPage && currentPage%2!==0) {
          this.currentRecommPage = this.currentRecommPage + 1
          this.fetchRecommendation ()
        }
      },
      gradeChange(curriculumId) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/${curriculumId}`))
      },
      fetchRecommendation () {
        this.$store.dispatch('search/contentSearch', {
        type: 'ALL',
        q: '',
        page: this.currentRecommPage,
        size: 8,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        childId:this.$store.getters['getCurrentChildId']()
      }).then((response) => {
        if (response.data.contents) {
          let a = this.recommended
          let b = response.data.contents
          let newArray = a.concat(b)
          this.recommended = newArray
        }
      })
      },
      showTopics(selectedSubject) {
        let subjectId = selectedSubject.id
        this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.getCurriculumId}/${subjectId}`)})
      },
      toggleMore() {
        this.moreClicked = !this.moreClicked
      }
    },
    computed: {
      //TODO should not this be present on mount
      getCurriculumId() {
        let currentRoute = this.$router.currentRoute.path
        let currentRouteSplit = currentRoute.split('/')
        return currentRouteSplit[currentRouteSplit.length - 1]
      }
    }
  }
</script>
