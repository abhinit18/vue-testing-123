<template>
<contentPopOver
  :content="$store.state.content.contents[getContent]" v-if="$store.state.content.contents[getContent]">
</contentPopOver>
</template>
<script>
import contentPopOver from '~/components/view/study/contentPopOver'
export default {
  head () {
			return {
			title: this.$t('index.view_content')
			}
		},
  middleware: 'authenticated',
  //layout: 'popupview',
  components: {contentPopOver},
  mounted () {
    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    this.$store.dispatch('content/fetchContent', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, contentId: this.getContent, childId:this.$store.state.currentSelectedChild.id})
  },
//   fetch ({ store, params }) {
//     // calculate how much data has to be fetched
//     let promiseArray = []
//     let contentId = params.contentId
//     promiseArray.push(store.dispatch('content/fetchContent', {authToken: store.state.auth.user.token, langCode: store.state.locale.selectedLocale, contentId}))
//     return Promise.all(promiseArray)
//   },
  computed: {
    getContent () {
      let currentRoute = this.$router.currentRoute.path
      let currentRouteSplit = currentRoute.split('/')
      let contentId = currentRouteSplit[currentRouteSplit.length-1]
      return contentId
    }
  }
}
</script>
