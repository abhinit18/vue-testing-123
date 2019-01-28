<template>
  <contentPopOver :content="getContent" v-if="getContent">
  </contentPopOver>
</template>
<script>
  import contentPopOver from '~/components/view/study/contentPopOver'
  export default {
    head() {
      return {
        title: this.$t('index.study')
      }
    },
    middleware: 'authenticated',
    components: { contentPopOver },
    data () {
      return {
        subjectId: '',
        curriculumId: '',
        topicId: '',
        subTopicId: '',
        topicSubtopicId: '',
        content:{}
      }
    },
    mounted() {
      this.subjectId = this.$router.currentRoute.params.subject
      this.curriculumId = this.$router.currentRoute.params.grade
      let subTopicRaw = this.$router.currentRoute.params.subtopic
      this.topicSubtopicId = subTopicRaw
      let subTopicRawArr = subTopicRaw.split('-')
      this.topicId = subTopicRawArr[0]
      this.subTopicId = subTopicRawArr[1]
      this.$store.dispatch('header/navChange', { key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this })
      this.fetchInitialData()
    },
    fetch({
      store,
      params
    }) {
    console.log('params >>' , params)
    let subjectId = params.subject
    let contentId = params.content
    let curriculumId = params.grade
    let subTopicRaw = params.subtopic
    let topicSubtopicId = subTopicRaw
    let subTopicRawArr = subTopicRaw.split('-')
    let topicId = subTopicRawArr[0]
    let subTopicId = subTopicRawArr[1]


      let promiseArray = []
      promiseArray.push(store.dispatch('content/fetchSubject', {
        id: 1,
        curriculumId: params.grade,
        childId: store.getters['getCurrentChildId'](),
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale,
        loader: false
      }))

      promiseArray.push(store.dispatch('content/fetchTopic', {
        id: subjectId,
        level: 'SUBJECT',
        childId: store.getters['getCurrentChildId'](),
        curriculumId: params.grade,
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale,
        loader: false
      }))

      promiseArray.push(store.dispatch('content/fetchTopic', {
        id: topicId,
        level: 'TOPIC',
        childId: store.getters['getCurrentChildId'](),
        curriculumId: params.grade,
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale,
        loader: false
      }))


      promiseArray.push(store.dispatch('content/fetchContentForSubTopic', {
        id: subTopicId,
        curriculumId: params.grade,
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale,
        loader: true,
        page: 0,
        size: 1000,
        childId: store.getters['getCurrentChildId']()
      }))


      promiseArray.push(store.dispatch('content/fetchContentProm', {
        contentId: params.content,
        childId: store.getters['getCurrentChildId'](),
        authToken: store.state.auth.user.token,
        langCode: store.state.locale.selectedLocale
      }))


      return Promise.all(promiseArray)
    },
    methods: {
      fetchInitialData() {
      /*  this.$store.dispatch('content/fetchTopic', {
          id: this.subjectId,
          level: 'SUBJECT',
          childId: this.$store.getters['getCurrentChildId'](),
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: false
        })
        this.$store.dispatch('content/fetchTopic', {
          id: this.topicId,
          level: 'TOPIC',
          childId: this.$store.getters['getCurrentChildId'](),
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: false
        })
        this.$store.dispatch('content/fetchContentForSubTopic', {
          id: this.subTopicId,
          curriculumId: this.curriculumId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: false,
          page: 0,
          size: 1000,
          childId: this.$store.getters['getCurrentChildId']()
        })*/



        this.$store.dispatch('note/fetchSavedList', { authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, loader: false })
      },
      getSimilarId() {
        let currentRoute = this.$router.currentRoute.path
        let currentRouteSplit = currentRoute.split('/')
        return currentRouteSplit[currentRouteSplit.length - 3]
      }
    },
    computed: {
      getContent() {

        let contentId = this.$router.currentRoute.params.content
        // now finding content in the store
        let content = this.$store.state.content.currentContent
        console.log('content', content);
        //let content = {};
        if (content) {
        content['subTopicId'] = this.subTopicId;
          return { ...content, subjectId: this.subjectId, topicId: this.topicId }

        } else {
          return null
        }
      }
    }
  }
</script>
