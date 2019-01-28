<template>
    <!-- <div class="bodyCon clearfix">
        <section class="container">
            <div class="pagebox clearfix">
                <div class="pageboxOver"></div>

              <sidebarUserStudy></sidebarUserStudy>

              <div class="contentSec">
                    <div class="scrollSec">
                        <div class="conMidSec">

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> -->
    <div class="conMidSec">
      <ol class="breadcrumb">
        <li><a href="#">{{$t('index.study')}}</a></li>
        <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
      </ol>
    <div class="welcomeTxt clearfix" v-if="!$store.state.note.fetchednotes || $store.state.note.fetchednotes.length === 0">
         <!-- <h2 class="heading">{{$t('index.hey')}} {{$store.state.auth.user.firstName}}</h2>
         <P>
          {{$t('study.start_adding_notes')}}  <a href="#">{{$t('study.how_it_works')}}</a>
         </P> -->
         <div class="placeholderSec">
             <div class="placeHoldConMid zoomIn">
                 <div class="placeHolderImg">
                   <img src="~assets/images/placeholder/plcHold_noNotes.png">
                 </div>
                 <h2 class="placeholderHeading">{{$t('blankPlaceholder.noteBlank')}}</h2>
                 <p class="placeHoldTxt">{{$t('blankPlaceholder.noteBlankText')}}</p>
             </div>
         </div>
         <button class="btn add_notesBtn" @click="addNotesToggle">{{$t('study.add_notes')}}</button>
     </div>
     <div class="full-width" v-else-if="$store.state.note.fetchednotes || $store.state.note.fetchednotes.length !== 0">
         <noteLists :actionButtons='true'></noteLists/>
     </div>
   </div>
</template>
<script>
import noteLists from '~/components/noteComponents/viewNoteList'
export default {
  head () {
			return {
                title: this.title
			}
		},
  middleware: 'authenticated',
  data() {
    return {
    addparam: 'Add',

			title: this.$t('index.note')
    }
  },
  layout: 'study',
  fetch ({store, params}) {
    // return store.dispatch('note/fetchSavedList', {authToken: store.state.auth.user.token, langCode: store.state.locale.selectedLocale})
  },
  mounted() {
    this.$store.dispatch('currentBreadcrumb', {title: this.title});
    this.$store.dispatch('note/fetchDataByTags', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    this.$store.dispatch('sidebarStudyContent/navChange',4)
    this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_NOTES"});
  },
  components: {noteLists},
  methods: {
    addNotesToggle() {
      this.$root.$emit('openAddPopupEmit',{})
    }
  }
}
</script>
