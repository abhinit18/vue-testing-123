<template>
  <div class="conMidSec eBooksPages">
       <!-- <h3 class="smallHeading">{{$t('index.ereader')}}</h3> -->
       <div class="ereaderOuter">
       <iframe :src="getEReaderUrl()" style="width: 100%; height: 100%"/>
       </div>
  </div>
</template>

<script>
/*
 <div class="resFilter">
          <label class="control control--checkbox">
            <input type="checkbox" :checked="contentType === 'allEbooks'" @click="toggleCheckValue('allEbooks')"><span>{{$t('study.all')}}</span>
          </label>
          <label class="control control--checkbox">
            <input type="checkbox" :checked="contentType === 'savedEbooks'" @click="toggleCheckValue('savedEbooks')"><span>{{$t('study.savedBooks')}}</span>
          </label>
        </div>
        <div class="srchBox"><i class="material-icons srchIcon">search</i><input type="text" :placeholder="$t('search.search')" class="form-control"></div>
        <h3 class="smallHeading smallHeading2">{{getContent && Array.isArray(getContent)? getContent.length : 0}} {{$t('study.results')}}</h3>
        <div class="subjectsRow clearfix">
           <div class="  clearfix itemOuterRow">
              <div @click="openContentPopup(content)" class="item" v-for="content in (getContent && Array.isArray(getContent)? getContent : [])">
                  <div class="thumb">
                     <img :src="content.body[0]? content.body[0].thumbnail: ''" class="video_thumbnail">
                     <span :class="{vidicon: (content.type==='VIDEO'), texticon: (content.type!=='VIDEO')}"></span>
                  </div>
                  <h4 v-if="content.body[0]">{{content.body[0].title}}</h4>
                  <!-- <h4>{{content.type}}</h4>
                  <h4>{{content.body[0].description}}</h4> -->
                  <div class="info" style="display: none;">
                     <!-- <p class="liked"><i class="likeIcon"></i> <strong>{{content.likeCount}}</strong> found helpful</p> -->
                     <p class="pointErnd" v-if="content.completed"><i class="material-icons">&#xE86C;</i> <strong>{{content.points}}</strong> Points Earned </p>
                     <p class="pointErnd" v-else> Earn <strong>{{content.points}}</strong> Points </p>
                  </div>
              </div>
           </div>
        </div>*/
          import axios from "~/plugins/axios";
          import dotenv from "~/plugins/dotenv";
          import config from "../../config";
export default {
  head () {
			return {
			title: this.title
			}
		},
  middleware: 'authenticated',
  data() {
    return {
      page: 0,
      contentType: 'allEbooks',
      gradeId: '',
      title: this.$t('study.ebooks')
    };
  },
  layout: "studyEbooks",
  components: {
  },
  methods: {

    getEReaderUrl () {
      let base = dotenv.READER_HOST;
      console.log('getEReaderUrl - dotenv >> ' + JSON.stringify(dotenv));
      if (this.$route.query.content) {
        base = base + `ebook/details/${this.$route.query.content}`
      }
      let result = '';
      if(this.$store.state.currentSelectedChild){
        // alert("1");
        console.log("childObj ",JSON.stringify(this.$store.state.currentSelectedChild.id))
        result = base + `?token=${this.$store.state.auth.user.token}&lang=${this.$store.state.locale.selectedLocale}&childId=${this.$store.state.currentSelectedChild.id}`
      }
      else{
        // alert("2");
        result = base + `?token=${this.$store.state.auth.user.token}&lang=${this.$store.state.locale.selectedLocale}`
      }
      console.log("result" ,result);
      return result
    },
    infiniteHandler: function ($state) {
      let langCode = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token

    },
    toggleCheckValue (value) {
     //this.$store.dispatch('content/fetchByContentType',{ authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale, page: this.page, size: 50,  grade: this.gradeId, type:'EPUB', lrsContent:true })

      //this.contentType = value
    },
    openContentPopup (selectedContent) {
      let content = selectedContent.contentId
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${content}`))
      // this.$router.push({ name: 'study-subject-subtopic-content', params: { content }})
    },
  },
  mounted() {
  //.READER_HOST = dotenv.READER_HOST;
          this.$store.dispatch('currentBreadcrumb', {title: this.title});
    // this.$store.dispatch("header/navChange", {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this});
    if(this.$store.getters['isParent']()) {
      this.$store.dispatch("sidebarStudyContent/parentNavChange", 2);
      this.$store.dispatch("header/navChange", {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this});
    }else{
      this.$store.dispatch("sidebarStudyContent/navChange", 3);
      this.$store.dispatch("header/navChange", {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this});
    }
    // this.$store.dispatch("sidebarStudyContent/navChange", 3);
    this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_E_BOOK"});

    if(this.$store.getters['isTeacher']()){
      this.$store.state.initialData.grades.forEach((element, i) => {
        if(i == 0)
          this.gradeId += element['gradeId'];
        else this.gradeId += '&grade=' + element['gradeId'];
      });
    } else{
        if(!this.$store.getters['isParent']()) {
        this.gradeId = this.$store.state.initialData.grades[0]['gradeId']
      }else{
        this.gradeId = this.$store.state.userGrades?this.$store.state.userGrades.filter(data => {return data.tag === 'current'})[0].gradeId:0
      }
    }



    //this.$store.dispatch('content/fetchByContentType',{ authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale, page: this.page, size: 50,  grade: this.gradeId, type:'EPUB', lrsContent:true })

  },
  computed: {
    getContent(){
      if(this.contentType === 'allEbooks')
        return this.$store.state.content.allEbooks;
      else if(this.contentType === 'savedEbooks')
        return this.$store.state.content.allEbooks.filter( c => c.downloaded)
    }
  }
};
</script>
<style>
  .ereaderOuter {height: 500px}
  .ereaderOuter iframe {border: 0}
  </style>
