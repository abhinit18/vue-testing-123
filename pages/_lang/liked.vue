<template>
  <div class="conMidSec recentlyVisited">
       <ol class="breadcrumb">
        <li><a href="#">{{$t('index.study')}}</a></li>
        <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
      </ol>
     	<h3 class="smallHeading">{{$t('index.liked')}}</h3>
        <recent type="liked" />
        <div class="notePopUpBoxDelete" v-if="showDeletePopup" >
       <div class="deletePostPop" >
             <div class="deletePostPopInner" v-on-click-outside="closeDeletePopup">
                 <!-- <h3><i class="material-icons">&#xE872;</i> Delete Post</h3> -->
                 <p>{{$t('toastMsg.like_delete_confirmation')}}</p>
                 <div class="btns">
                     <!-- <a class="btn btn-bordered" @click="proceedDelete">{{$t('settings.yes')}}</a> -->
                     <customloader loaderClass="btn btn-bordered" :loaderClick="proceedDelete" :loaderDisabled="deleteButtonLoading" loaderText="settings.yes"></customloader>
                   <a class="btn btn-primary" @click="cancelDelete">{{$t('common.no')}}</a>
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
  middleware: 'authenticated',
  layout: "study",
  components: {
    recent
  },
  mounted() {
    this.$store.dispatch('currentBreadcrumb', {title: this.title});
    this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_LIKED_RESOURCES"});

    this.$store.dispatch("header/navChange", {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this});
    this.$store.dispatch("sidebarStudyContent/navChange", 6);
    this.$root.$on('removeLikedContent', (content) => {
      this.showDeletePopup = true
      this.contentId = content.id
      this.type = content.type
    })
  },
  beforeDestroy () {
            this.$root.$off('removeLikedContent')
        },
  data () {
    return {
      showDeletePopup : false,
      contentId: '',
      type: '',
      deleteButtonLoading: false,
			title: this.$t('study.liked_content')

    }
  },
  methods: {
    proceedDelete () {
      this.deleteLikedContent()
    },
    cancelDelete () {
      this.showDeletePopup = false
    },
    deleteLikedContent() {
      this.deleteButtonLoading = true
      this.$store.dispatch('liked/deleteLikedContent',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, contentId: this.contentId, type: this.type}).then(response => {
        this.deleteButtonLoading = false
        this.showDeletePopup = false
        //this.$toast.success(this.$t('toastMsg.like_delete_success'));
    }, error => {
      this.deleteButtonLoading = false
    })
  },
  closeDeletePopup () {
    this.showDeletePopup = false
  }
  }
};
</script>
