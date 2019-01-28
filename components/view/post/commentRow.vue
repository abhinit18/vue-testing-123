<template>
<div class="media" >

  <div class="media-left">

    <a @click="goToProfile(comment.userid)">
      <postImageBox :imageObj="fetchNameAndPic(comment.userid)" />
      <!-- <img class="media-object img-circle tempImgSize" :src="fetchNameAndPic(comment.userid).userpic" alt="..."> -->
    </a>
<!--    <div class="comment_name">{{fetchNameAndPic(comment.userid).username}}</div>-->

  </div>
  <div class="media-body">
    <div class="comment_name" @click="goToProfile(comment.userid)">{{fetchNameAndPic(comment.userid).username}}</div>
    <div class="comnt">
      <div v-if="comment.taggedUser && comment.taggedUser.length>0">
          <div class="textType">
          <div class="buddyAdded" v-for="tguser in comment.taggedUser" @click="goToProfile(tguser)">{{fetchNameAndPic(tguser).username}}
          </div>
        </div>
      </div>

       <div class="dropdown pull-right btnCommentEdit" v-if="mypost || comment.userid === $store.getters['getUserId']()">
        <button @click="toggleEditDelete" class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <i class="material-icons">&#xE5D3;</i>
        </button>
        
        <ul class="dropdown-menu actionPopup" aria-labelledby="dropdownMenu1" style="display:block;" v-on-click-outside="toggleEditDelete" v-if="editDelete">
           <li @click="editComment" v-if="comment.userid === $store.getters['getUserId']()"><a>{{$t('index.edit')}}</a></li>
          <li role="separator" class="divider" v-if="comment.userid === $store.getters['getUserId']()"></li>
          <li @click="deleteComment"><a>{{$t('index.delete')}}</a></li>
           <li role="separator" class="divider"></li>
          <!-- <li class="closePop"><div @click="toggleEditDelete" class="closeBtn" ><i class="material-icons">close</i></div></li> -->
        </ul>
      </div>
    <p>
      <span class="buddyAdded" v-if="comment.repliedToId">{{this.$store.getters["postContent/getUserInfo"](comment.repliedToId).username}}</span> {{comment.postData}}</p>

          <div class="date">{{new Date(comment.updated) | moment("MMM, Do YYYY / HH:mm")}}</div>

      </div>

      <div class="likCommentBar clearfix">
        <div class="likesCol pull-left likeIcons">
          <!-- <a class="btn btn-link" @click="likeToggle(comment.isSelfLiked)" :class="{active: comment.isSelfLiked}"><i class="material-icons">&#xE8DC;</i> {{comment.isSelfLiked? $t('index.liked'): $t('index.like')}}</a>
          <a class="btn btn-link" @click="replyBoxToggle"><i class="material-icons">&#xE0CA;</i> Reply</a> -->

          <a class="btn btn-link" @click="likeToggle(comment.isSelfLiked)" :class="{active: comment.isSelfLiked}"><span class="icons iconLike"></span></a>
          <a class="btn btn-link" @click="replyBoxToggle"><span class="icons iconComment"></span></a>

        </div>
        <div class="likesCol pull-right">
           <span @click="toggleNestedComment(2)">{{comment.likeCount}} {{comment.likeCount === 1? $t('index.like') : $t('index.likes')}}</span>
          <span  v-if="type==='POST'" @click="toggleNestedComment(1)">{{comment.commentCount}} {{comment.commentCount === 1? $t('index.reply') : $t('index.replies')}}</span>
        </div>
      </div>
      <div  v-if="replyBox" class="custom-pos-rel clearfix" style="position:relative;">
          <addComment :post="comment" :parentComment="parentComment" :isComment="true"/>
      </div>
  </div>






<!--  Nested Comment Starts -->
<div class="nestedComments" v-if="nestedOpen===1">
  <commentlist :parentComment="comment" :type="'COMMENT'" :mypost="mypost" :comments="this.$store.state.postContent.comments[comment.commentId]"/>
</div>
<div class="nestedComments" v-if="nestedOpen===2">
  <likelist :likes="this.$store.state.postContent.likes[comment.commentId]"/>


  <!--
  <div class="media">
    <div class="media-left">
        <a href="#"><img src="http://tourwizard.net/blog/wp-content/uploads/2016/06/Eric_Morrison.jpg" alt="..." class="media-object img-circle tempImgSize"></a>
    </div>
    <div class="media-body">
        <div class="comment_name">Sara Ashmeen</div>
        <div class="comnt">
            <div class="dropdown pull-right btnCommentEdit">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="btn btn-link dropdown-toggle"><i class="material-icons">&#xE5D3;</i></button>
            </div>
            <p>In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble. </p>
            <div class="date">Wed Oct 18 2017 12:04:56 GMT+0530 (IST)</div>

        </div>
      <div class="likCommentBar clearfix">
        <div class="likesCol pull-left">
          <a class="btn btn-link active"><i class="material-icons">&#xE8DC;</i> Like</a>
          <a class="btn btn-link active"><i class="material-icons">&#xE0CA;</i> Reply</a>
        </div>
        <div class="likesCol pull-right">
           <span>20 Likes</span>
          <span>45 Replies</span>
        </div>
      </div>
    </div>

    <div class="cmtBox">
        <div class="img"><img src="http://tourwizard.net/blog/wp-content/uploads/2016/06/Eric_Morrison.jpg" alt="..." class="media-object img-circle tempImgSize" width="25px"></div>
        <div class="textBody">
            <div class="textType"></div>
            <div>
                <textarea placeholder="Type Here" value="" class="form-control"></textarea>
            </div>
        </div>
        <div class="statusBtns">
            <div class="addFriendSearch">
            </div><span><i class="material-icons"></i></span><span><i class="material-icons"></i></span>
            <button class="btn btn-link submitBtn"><i class="material-icons"></i></button>
        </div>
    </div>
</div>
  <div class="media">
    <div class="media-left">
        <a href="#"><img src="http://tourwizard.net/blog/wp-content/uploads/2016/06/Eric_Morrison.jpg" alt="..." class="media-object img-circle tempImgSize"></a>
    </div>
    <div class="media-body">
        <div class="comment_name">Sara Ashmeen</div>
        <div class="comnt">
            <div class="dropdown pull-right btnCommentEdit">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="btn btn-link dropdown-toggle"><i class="material-icons"></i></button>
            </div>
            <p>In the history of modern astronomy, there is probably no one greater leap forward than the building and launch of the space telescope known as the Hubble. </p>
            <div class="date">Wed Oct 18 2017 12:04:56 GMT+0530 (IST)</div>

        </div>
      <div class="likCommentBar clearfix">
        <div class="likesCol pull-left">
          <a class="btn btn-link active"><i class="material-icons">&#xE8DC;</i> Like</a>
          <a class="btn btn-link active"><i class="material-icons">&#xE0CA;</i> Reply</a>
        </div>
        <div class="likesCol pull-right">
           <span>20 Likes</span>
          <span>45 Replies</span>
        </div>
      </div>
    </div>

</div>

-->


</div>
<!--  Nested Comment Ends -->




</div>
</template>
<script>
import postImageBox from '~/components/postImageBox'
export default {
  mounted () {
    this.$root.$on('closeAddCommentPopup', () => {
      this.replyBox = false
    })
  },
  beforeDestroy () {
  this.$root.$off('closeAddCommentPopup')
  },
  data () {
    return {
      editDelete: false,
      nestedOpen: 0,
      replyBox: false
    }
  },
  props: ['comment', 'mypost', 'type', 'parentComment'],
  components: {postImageBox},
  // components: {commentlist, likelist, addComment},
  methods: {
    fetchNameAndPic (userId) {
      let userInfoArr = this.$store.state.postContent.userInfo
      let userInfoObj = {username: 'name', userpic: 'pic' }
      for(let i=0; i<userInfoArr.length;i++)
      {
        if(userId === userInfoArr[i].userid)
        {
          userInfoObj['username'] = userInfoArr[i].username
          userInfoObj['userpic'] = userInfoArr[i].userpic
          userInfoObj['userid'] = userId
        }
      }
      return userInfoObj
    },
    toggleEditDelete (event) {
      let temp = this.editDelete
      this.editDelete = !temp
    },
    deleteComment () {
      let payload = {commentId: this.comment.commentId, postId: this.comment.discussionId, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}
      if (this.parentComment && this.parentComment.discussionId)  
      {
        payload["superParentId"] = this.parentComment.discussionId
      }
      this.$store.dispatch('postContent/deleteComment', payload).then((response) => {
        this.$root.$emit('comment-dltText', '')
        this.$root.$emit('actionToast', 'comment.delete_success')
      }, (error) => {
        this.$root.$emit('actionToast', 'comment.delete_error')
      })
    },
    editComment() {
      this.$root.$emit('comment-edit', {comment: this.comment})
      this.toggleEditDelete()
    },
    toggleNestedComment(type) {
      if(type === this.nestedOpen) {
        // close the nestedness
        this.nestedOpen = 0
      } else {
        this.nestedOpen = type
        if (type === 1) {
          this.$store.dispatch('postContent/fetchComment', {authToken: this.$store.state.auth.user.token, discussionId: this.comment.commentId, langCode: this.$store.state.locale.selectedLocale, type: 'COMMENT'})
        } else {
          this.$store.dispatch('postContent/fetchLike', {authToken: this.$store.state.auth.user.token, discussionId: this.comment.commentId, langCode: this.$store.state.locale.selectedLocale, type: 'COMMENT'})
        }
      }
    },
    likeToggle (selfLiked) {
      if (selfLiked) {
        this.$store.dispatch('postContent/deleteLike', {payload: {type: 'COMMENT', likeTypeId: this.comment.commentId}, postId: this.comment.discussionId, authToken: this.$store.state.auth.user.token, userId: this.$store.state.auth.user.userId, langCode: this.$store.state.locale.selectedLocale})
      } else {
        this.$store.dispatch('postContent/likePost', {payload: {type: 'COMMENT', likeTypeId: this.comment.commentId}, postId: this.comment.discussionId, authToken: this.$store.state.auth.user.token, userId: this.$store.state.auth.user.userId, langCode: this.$store.state.locale.selectedLocale})
      }
    },
    replyBoxToggle () {
      this.replyBox = !this.replyBox
    },
    goToProfile (userId) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
    }
  }
}
</script>
