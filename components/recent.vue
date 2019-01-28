<template>
  <div>
        <div class="resFilter" v-if="type === 'activity'">
          <label class="control control--checkbox">
            <input type="radio" :checked="tabType === 'unfinished'" @change="toggleTab('unfinished')"><span>{{$t('study.unfinished')}}</span>
          </label>
          <label class="control control--checkbox">
            <input type="radio" :checked="tabType === 'viewed'" @change="toggleTab('viewed')"><span>{{$t('study.recently_visited')}}</span>
          </label>
        </div>

        <div class="resFilter" v-else-if="type === 'bookmark'">
           <label class="control control--checkbox" v-for="typeStore in $store.state.content.types">

               <input type="radio" :checked="selectedCheck===typeStore.name" @change="toggleCheck(typeStore.name)">
               <!-- <span>{{typeStore.name.substring(0,1).toUpperCase()+typeStore.name.substring(1).toLowerCase()}}</span> -->
               <span>{{$t(typeStore.code)}}</span>
               <!-- <div class="control__indicator"></div> -->
            </label>
        </div>

        <div class="subjectsRow clearfix">
           <div class="  clearfix itemOuterRow LikeConPage">
             <!-- (getContent && Array.isArray(getContent)? getContent.filter((content) => { return filterForContent(content)}): []) -->
             <content-box :isSearch="true" :cornerElement="index" :content="content" :contentType="type" v-for="(content, index) in getContent" :key="content.contentId" />

              <nounfinished v-if="isUnfinished && data.length===0"/>
              <novisit v-if="isRecentVisit && data.length===0"/>
              <nobookmark v-if="isBookmark && $store.state.study.myBookmarks.length === 0"/>
              <nolike v-if="isLiked && $store.state.liked.likedContent.length === 0"/>
           </div>
        </div>
  </div>
</template>
<script>
import contentBox from "~/components/contentBox"
import nolike from "~/components/placeholders/nolike"
import novisit from "~/components/placeholders/novisit"
import nounfinished from "~/components/placeholders/nounfinished"
import nobookmark from "~/components/placeholders/nobookmark"
export default {
  data () {
    return {
      tabType: 'unfinished',
      selectedCheck: 'ALL',
      data: [],
      unfinishedBlank: true,
      visitedBlank: true,
      bookmarkBlank: false,
      likedBlank: false,
    }
  },
  props: ['type'],
  components: {
    contentBox,
    novisit,
    nounfinished,
    nobookmark,
    nolike
  },
  mounted() {
    let langCode = this.$store.state.locale.selectedLocale;
    let authToken = this.$store.state.auth.user.token;
    this.fetchData ()
  },
  methods: {
    toggleCheck (value) {
      this.selectedCheck = value
      this.fetchData()
    },
    toggleTab (value) {
      this.tabType = value
      this.fetchData()
    },
    fetchData () {
      if ( this.type === 'activity') {
        let childId = this.$store.state.currentSelectedChild?this.$store.state.currentSelectedChild.id:''
          this.$store.dispatch('content/fetchRecent',{ authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale,childId:childId, type: this.tabType}).then(response => {
          if (response.data && response.data.content) {
            this.data = response.data.content.filter((data) => {
              return data.body.length!==0
            })
          } else {
            this.data = []
          }

        })
      } else if (this.type === 'liked') {
        let childId = this.$store.state.currentSelectedChild?this.$store.state.currentSelectedChild.id:''
        this.$store.dispatch("liked/getLikedContents", { authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale,childId, type: this.type }).then(response => {
        if (response && response.data && response.data.content) {
            this.data = response.data.content.filter((data) => {
              return data.body.length!==0
            })
          } else {
            this.data = []
          }

        });
      } else {
        this.$store.dispatch('study/getBookmarkedContent', {authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale, page: 0, size: 1000, type: this.getCorrectContentType, loader: true})
      }
    },
    openContentPopup (selectedContent) {
      let content = selectedContent.contentId
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${content}`))
    }
  },
  computed: {
    getCorrectContentType () {
      let type = this.selectedCheck
      if (type === 'ALL') {
        return ''
      } else if (type === 'EBOOK') {
        return 'EPUB'
      } else {
        return type
      }
    },
    getContent () {
      if (this.type === 'bookmark') {
        return this.$store.state.study.myBookmarks.filter(data => {
          return data.body.length!==0
        })
      } else if (this.type === 'liked') {
        return this.$store.state.liked.likedContent.filter(data => {
          return data.body.length!==0
        })
      } else {
        return this.data
      }
    },
    isUnfinished () {
      return this.type==='activity' && this.tabType ==='unfinished'
    },
    isRecentVisit () {
      return this.type==='activity' && this.tabType ==='viewed'
    },
    isLiked () {
      return this.type==='liked'
    },
    isBookmark () {
      return this.type==='bookmark'
    }
  }
}
</script>
