<template>
<div class="postItem active" :class="{postItemShared: post.sharedPostResponse|| post.contentId}">
<div class="dropdown pull-right btnEdit">
  <button @click="toggleEditDelete" class="btn btn-link dropdown-toggle thr-dot" v-if="!share" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    <i class="material-icons">&#xE5D3;</i>
  </button>
  <ul class="dropdown-menu actionPopup" style="display:block;" aria-labelledby="dropdownMenu1" v-on-click-outside="toggleEditDelete" v-if="editDelete">
    <li class="reportThis" v-if="$store.getters['getUserId']() && (post.userid !== $store.getters['getUserId']()) && !share"><a @click="btnAction(post, 'postReport',pageStatus)">{{$t('buddy.report_abuse')}}</a></li>
    <li @click="toggleAddPopup(post)" v-if="$store.getters['getUserId']() && (post.userid === $store.getters['getUserId']()) && !share"><a @click="postScrollTopFunc()">{{$t('post.edit_post')}}</a></li>
    <li role="separator" class="divider" v-if="$store.getters['getUserId']() && (post.userid === $store.getters['getUserId']()) && !share"></li>
    <li @click="toggleDeletePopup" v-if="$store.getters['getUserId']() && (post.userid === $store.getters['getUserId']()) && !share"><a>{{$t('post.delete_post')}}</a></li>
    <!-- <li role="separator" class="divider"></li>
    <li class="closePop"> <div @cliPAPARENT-RENT-ck="toggleEditDelete" class="closeBtn" ><i class="material-icons">close</i></div></li> -->
  </ul>


  <!-- <div class="nOfVies">25 views</div> -->

</div>
<postRowSub v-if="!post.defaultCard" :post="post" :toggleCommentPopup="toggleCommentPopup" :share="share"/>

<div class="full-width card-pos" v-if="post.defaultCard">
  <card1 v-if="post.templateType === 'WELCOME'" :post="post"></card1>
  <card2 v-if="post.templateType === 'BUDDIES'" :post="post"></card2>
  <card3 v-if="post.templateType === 'INVITE'" :post="post"></card3>
  <card4 v-if="post.templateType === 'HELP'" :post="post"></card4>
</div>
</div>
</template>

<script>
import postRowSub from '~/components/view/post/postRowSub'
import card1 from '~/components/view/post/staticPostCard1'
import card2 from '~/components/view/post/staticPostCard2'
import card3 from '~/components/view/post/staticPostCard3'
import card4 from '~/components/view/post/staticPostCard4'
export default {
  components: {postRowSub, card1, card2, card3, card4},
  props: ['post', 'toggleCommentPopup', 'toggleAddPopup', 'share'],
  data () {
    return {
      editDelete: false,
      isDeletePopupOpen: false,
      actionDataObj: {}
    }
  },
  methods: {
    postScrollTopFunc(){
      setTimeout(function(){
         // alert();
        //console.log(document.querySelector('.contentSec').offsetTop);
        document.querySelector('.contentSec').scrollTo(0, 0);
        document.querySelector('.scrollSec').scrollTo(0, 0);

      },200);

    },
    deletePost () {
      this.$store.dispatch('postContent/deletePost', {postId: this.post.postId, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}).then((response, context) => {
        let delete_message = this.$t('post.delete_success')
        //this.$toast.success(delete_message)
        this.postData = ''
        this.close()
      }, (error, context) => {
        this.$toast.error(context.$t('post.delete_error'), error)
      })
    },
    btnAction(data,name) {

      this.actionDataObj.dataObj = data
      this.actionDataObj.btnActionName = name
      let dataParam = this.actionDataObj
      this.$root.$emit('showActionPopup', {dataParam})
    },
    toggleEditDelete (event) {
      let temp = this.editDelete
      this.editDelete = !temp
    },
    toggleDeletePopup () {
      if (this.editDelete) {
        this.toggleEditDelete()
      }
      this.$root.$emit('openConfirmPopup', {
        header: "Delete Post",
        message: "Are you sure you want to Delete this Post ?",
        onConfirm: this.deletePost
      })
    }
}
}
</script>
<style>
.thr-dot i{color:#333 !important;}
</style>
