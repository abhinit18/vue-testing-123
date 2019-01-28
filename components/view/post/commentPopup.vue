<template>
<!--Comment PopUps-->
<div class="cmntShdow">
    <div class="postItem">
        <postRowSub :post="$store.state.postContent.posts.filter((dbpost)=> dbpost.postId === post.postId)[0]" :toggleLikeNComment="toggleLikeNComment" :key="post.postId"/>
    </div>
        <commentlist :type="'POST'" :mypost="post.userid === $store.getters['getUserId']()" v-if="currentView==='comment'" :comments="$store.state.postContent.comments[post.discussionId]?$store.state.postContent.comments[post.discussionId]:[]"/>
        <addComment v-if="currentView==='comment'" :post = "post"/>
        <likelist v-if="currentView==='like'" :likes="$store.state.postContent.likes[post.discussionId]"/>
</div>
<!--Comment PopUps-->
</template>
<script>
import postRowSub from '~/components/view/post/postRowSub'
import commentlist from '~/components/view/post/commentlist'
import likelist from '~/components/view/post/likelist'
import addComment from '~/components/addEdit/post/addComment'
import { mapState } from 'vuex'
export default {
  mounted () {
      if(this.type==='comment') {
        this.$store.dispatch('postContent/fetchComment', {authToken: this.$store.state.auth.user.token, discussionId: this.post.discussionId, langCode: this.$store.state.locale.selectedLocale})
      } else {
        this.$store.dispatch('postContent/fetchLike', {authToken: this.$store.state.auth.user.token, discussionId: this.post.discussionId, langCode: this.$store.state.locale.selectedLocale})
      }


  },
  data () {
    return {
      currentView: this.type,
      showMore: this.post.postData.length > 100,
      less: false
    }
  },
  props: ['close', 'post', 'type'],
  components: {commentlist, addComment, likelist, postRowSub},
  methods: {
    toggleLikeNComment (view) {
      this.currentView = view
      if (view === 'comment') {
        this.$store.dispatch('postContent/fetchComment', {authToken: this.$store.state.auth.user.token, discussionId: this.post.discussionId, langCode: this.$store.state.locale.selectedLocale})
      } else if (view === 'like') {
        this.$store.dispatch('postContent/fetchLike', {authToken: this.$store.state.auth.user.token, discussionId: this.post.discussionId, langCode: this.$store.state.locale.selectedLocale})
      }
    },
    toggleMore () {
      this.less = !this.less
    }
  }
}
</script>
