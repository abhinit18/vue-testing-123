<template>
    <div>
        
        <div class="postThoughts" v-if="viewDecider===0 && !nowallpost" >

                <profilepicBox/>
                <input type="text" @click="toggleAddPopup" class="form-control" :placeholder="isMyProfile? $t('index.my_wall_post_placeholder') : ($t('index.wall_post_placeholder')+profile.userName)">
                <i class="ico material-icons" @click="toggleAddPopup">&#xE3C9;</i>
        </div>


        <div class="postDetails">
          <div class="profilePostDtlCloseBtn" v-if="viewDecider!==0">
              <p class="backBtn pclosebtn" @click="backToPostList"><i class="material-icons">&#xE5CD;</i></p>
          </div>
            <div class="postDetailsInner clearfix">
                <addPost :isProfile="true" :userId="isMyProfile? undefined: profile.userId" v-if="viewDecider===1" :close = "toggleAddPopup" :post = "editPostData" :sharedPost="sharedPost"/>
                <commentPopup v-if="viewDecider===2" :close = "toggleCommentPopup" :post="popupData" :type="type"/>
                </div>
        </div>
        <div v-show="viewDecider!==2">
        <postWrapper :userId="profile.userId" :isProfile="true" v-if="profile.userId" :nowallpost="nowallpost" :toggleCommentPopup="toggleCommentPopup" :toggleAddPopup="toggleAddPopup"/>
        </div>
    </div>
</template>

<script>
import profilepicBox from '~/components/profilepicBox'
import postWrapper from '~/components/view/post/postWrapper'
import addPost from '~/components/addEdit/post/addPost'
import commentPopup from '~/components/view/post/commentPopup'
export default {
    mounted () {
        this.$store.dispatch('postContent/resetPost')
        this.$root.$on('openAddPopup', (sharedPost) => {
            this.viewDecider = 1
            this.sharedPost = sharedPost
            })
    },
    beforeDestroy () {
    this.$root.$off('openAddPopup')
    },
    props: ['profile', 'nowallpost'],
    components: {postWrapper, profilepicBox, addPost, commentPopup},
    data () {
        return {
            viewDecider: 0, //0-NONE, 1: ADDPOST, 2: COMMENTPOPUP
            popupData: {},
            type: '',
            viewPostData: true,
            editPostData: undefined,
            sharedPost: undefined
        }
    },
    methods: {
    toggleCommentPopup (post, type) {
      if (this.viewDecider===2) {
        this.popupData = {}
      } else {
        this.popupData = post
        this.type = type
      }
      this.viewDecider = this.viewDecider===2? 0: 2
    },
    backToPostList () {
        this.viewDecider = 0
    },
    viewPrimaryPost() {
      this.viewPostData = !this.viewPostData
    },
    toggleAddPopup (post) {
      this.viewDecider = this.viewDecider===1? 0: 1
      if (post && post.postId) {
        this.editPostData = post
        if(post) {
            let done = true
            this.$root.$emit('autoScrollPost', ({done}))
        }
      }
      else {
        this.editPostData = undefined
        this.sharedPost = undefined
      }
    },
    },
    computed: {
        isMyProfile () {
            return (this.profile.userId === this.$store.state.initialData.userId)
        }
    }
}
</script>
