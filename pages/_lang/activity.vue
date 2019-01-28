<template>
  <div class="full-width">
    <div class="conMidSec recentlyVisited">
      <ol class="breadcrumb">
        <li><a href="#">{{$t('index.study')}}</a></li>
        <li class="active">{{this.$store.state.currentBreadcrumb}}</li>
      </ol>
      <h3 class="smallHeading">{{$t('activity.my_activity')}}</h3>
      <recent type="activity"/>
    </div>
  </div>
</template>

<script>
import recent from "~/components/recent";
export default{
  head () {
			return {
			title: this.title
			}
		},
  middleware: 'authenticated',
  components: {recent},
  mounted() {
      this.$store.dispatch('currentBreadcrumb', {title: this.title});
    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    this.$store.dispatch('sidebarStudyContent/navChange',2)

this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_MY_ACTIVITY"});

  },
  data(){
    return {
      			title: this.$t('activity.my_activity')
    }
  },
  layout: 'study'
}

</script>
