<template>
  <div class="conMidSec recentlyVisited">
     	<h3 class="smallHeading">{{$t('study.unfinished')}}</h3>
      <recent contentType="unfinished" />
  </div>
</template>

<script>
import recent from '~/components/recent'

export default {
    middleware: 'authenticated',
  data () {
    return {
    }
  },
  layout: 'study',
  components: {
    recent
  },
  mounted() {
    let langCode = this.$store.state.locale.selectedLocale;
    let authToken = this.$store.state.auth.user.token
    let type = 'unfinished'

      let childId = this.$store.state.currentSelectedChild?this.$store.state.currentSelectedChild.id:''

    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    this.$store.dispatch('sidebarStudyContent/navChange',2)
    this.$store.dispatch('content/fetchRecent', {authToken, langCode,childId, type} ).then(res => {
    this.$store.dispatch('snowPlowPageView',{pageName: "UNFINISHED_CONTENT"});

    });
  }
}
</script>
