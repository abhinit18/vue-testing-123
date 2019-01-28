<template>
  <div class="subjectsRow clearfix mg-auto bookMarkPage">
     <!-- <h3 class="smallHeading">{{$t('common.recommended')}}</h3> -->


     <div class="conMidSec recentlyVisited" style="padding:0px;">
         <ol class="breadcrumb">
          <li><a href="#">{{$t('index.study')}}</a></li>
          <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
        </ol>
       <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 pad0">
        	<h3 class="smallHeading">{{$t('study.bookmarks')}}</h3>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 pad0">
          <div class="actionBtn sortBtn" style="float:right;"> <div @click="openSort">{{$t('note.sort')}} <i class="material-icons">filter_list</i></div>
                <div class="dropShow sorting bookmarkSort" v-on-click-outside="openSort" v-if="viewSortingBlock">
                  <ul class="sortList">
                    <li>{{$t('scoreboard.all')}}</li>
                    <li @click="sortByNewDate">{{$t('note.NEWEST')}}</li>
                    <li @click="sortByOldDate">{{$t('note.OLDEST')}}</li>
                  </ul>
              </div>
          </div>
        </div>
        <div class="full-width">
          <recent type="bookmark" />
        </div>
     </div>

     <div class="clearfix itemOuterRow" >
     </div>
     <div class="notePopUpBoxDelete" v-if="showDeleteBookmarkPopup">
       <div class="deletePostPop">
             <div class="deletePostPopInner">
                 <!-- <h3><i class="material-icons">&#xE872;</i> Delete Post</h3> -->
                 <p>{{$t('toastMsg.bookmark_prompt')}} ?</p>
                 <div class="btns">
                   <customloader loaderClass="btn btn-bordered" :loaderClick="removeCreatedBookmark" :loaderDisabled="deleteButtonLoading" loaderText="toastMsg.bookmark_action_yes"></customloader>
                     <!-- <a class="btn btn-bordered" @click="removeCreatedBookmark()">{{$t('toastMsg.bookmark_action_yes')}}</a> -->
                   <a class="btn btn-primary" @click="showDeleteBookmarkPopup = false">{{$t('toastMsg.bookmark_action_no')}}</a>
                 </div>
             </div>
         </div>
     </div>
  </div>

</template>
<script>
import recent from "~/components/recent";
export default {
  head () {
			return {
			title: this.title
			}
		},
  beforeDestroy () {
            this.$root.$off('removeCreatedBookmarkContent')
        },
  data() {
    return {
      showDeleteBookmarkPopup: false,
      viewSortingBlock: false,
      dataContentid:'',
      dataContentType:'',
      deleteButtonLoading: false,
      			title: this.$t('study.bookmarks')
    }
  },
  middleware: 'authenticated',
  mounted(){
        this.$store.dispatch('currentBreadcrumb', {title: this.title});
    //this.$store.dispatch('study/getBookmarkedContent', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, loader: true})
    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    this.$store.dispatch('sidebarStudyContent/navChange',5)
    this.$root.$on('removeCreatedBookmarkContent', (dataContent) => {
      this.showDeleteBookmarkPopup = dataContent.dataContent.showDeleteBookmarkPopup
      this.dataContentid = dataContent.dataContent.Id
      this.dataContentType = dataContent.dataContent.type

    })

    this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_BOOKMARKS"});


  },
  layout: 'study',
  components: {
    recent
  },
  methods: {
    openSort() {
      this.viewSortingBlock = !this.viewSortingBlock;
      // this.$store.dispatch('note/fetchUserSavedNoteTags',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
    },
    removeCreatedBookmark() {
      this.deleteButtonLoading = true
      this.$store.dispatch('study/deleteContentBookmarks',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, contentId:this.dataContentid,type:this.dataContentType}).then(response => {
        this.showDeleteBookmarkPopup = false;
        this.deleteButtonLoading = false
        //this.$toast.success(this.$t('toastMsg.bookmark_delete_success'));
        this.$store.dispatch('study/getBookmarkedContent', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
    }, error => {
        this.showDeleteBookmarkPopup = false
    })

  },
  sortByOldDate() {
    this.$store.dispatch('study/toggleDataOldFilter')
  },
  sortByNewDate() {
    this.$store.dispatch('study/toggleDataNewFilter')
  },
  contentNavigation(data) {
    let contenIdData = data.contentId;
    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${contenIdData}`))
  }
}
}
</script>
<style>
.mg-auto{margin:0 auto; padding: 0 50px}
.pad0{padding:0px;}
.pos-clear-set{position:absolute;top:-4px;right:-4px;z-index: 9;}
.col-gray{color:gray;font-weight: lighter;}
.bookmarkSort{top:20px !important;left:-25px !important;}
</style>
