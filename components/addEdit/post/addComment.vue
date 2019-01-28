<template>
<div class="cmtBox" v-bind:class="tagOn?'buddyTagOpen':''">
      <!--
      <a>
          <img class="img-circle tempImgSize" :src="fetchNameAndPic(post.userid).userpic" alt="...">
      </a>
      <div class="comment_name">{{fetchNameAndPic(post.userid).username}}</div>-->
  <div class="allCommentElemOuterSec">


    <!-- <img :src="this.$store.state.initialData.profilePic===''? 'img/images/user_image.png': this.$store.state.initialData.profilePic" class="img"> -->
    <profilepicBox />
  <div class="textBody" id="app" ref="app">
  <div class="textType">
    <div class="buddyAdded" v-for="nm in taggedUserName">{{nm.name}}
        <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
    </div>
  </div>
  <div @click="onFocusComment" style="display: flex;">
<!--      <textarea class="form-control" :placeholder="$t('post.add_comment_type_here')" value="" v-model="commentText"></textarea>-->
      <div v-if="post.commentId && parentComment">
      <span class="buddyAdded" >{{this.$store.getters["postContent/getUserInfo"](post.userid).username}}</span></div>
    <div class="textarea-container">
     <textarea class="form-control" :placeholder="$t('post.add_comment_type_here')" value="" v-model="commentText" style="overflow:hidden" v-on:input="commentTextChange" v-on:keyup="textAreaAdjust" autofocus></textarea>
     <div class="textarea-size" v-html="commentTextDiv" id="appa" ref="appa"></div>
   </div>
  </div>
  </div>
  <div class="emoj" v-if="emojBox" v-on-click-outside="openEmojBox">
      <!-- :perLine="6" :native="false" :skin="6" :emoji-size="20" :include="['people']" set="facebook"  -->
      <picker :showCategories="false" :include="['people']" :backgroundImageFn="((set, sheetSize) => '/img/emoji_16.png')" :custom="customEmojis" @click="addEmoji" :emojiSize="16" :sheetSize="16"></picker>

  </div>
  <span class="emojiIco"><i @click="openEmojBox" class="material-icons">&#xE24E;</i></span>



  <div class="statusBtns">
    <div class="addFriendSearch">
        <button class="btn btn-link" v-bind:class="{active: tagOn}" @click="toggleTagOn">
          <i class="material-icons">perm_identity</i>
        </button>
        <div class="feedAddLocDrop" v-on-click-outside="toggleTagOn"  style="padding:0px;"  v-if='tagOn'>
                <div class="addLocTopSec">
                  <p class="addLocText">{{$t('parentLog.tagFrnd')}}</p>
                    <div class="regFormElements locSrchBox">
                      <div class="formControlOuter">


                      <input class="formControl" v-if="tagOn" v-model="tagData" @input="getUserList" :placeholder="$store.getters['isTeacher']? $t('teacher.tagging_description') : $t('post.tagging_description')">

                      </div>
                    </div>
                </div>
                <div class="feedAddLocDropInner">
                  <!-- tagData !== '' &&  -->
                  <tagSuggestions v-if="showTagList" @selected="handleSelectedIds" :taggedUsers="taggedUserName"/>
                </div>
            </div>
          <!-- <tagSuggestions v-if="showTagList" @selected="handleSelectedIds" :taggedUsers="taggedUserName"/> -->
          <!-- <input v-if="tagOn" v-model="tagData" @input="getUserList" class="form-control" :placeholder="$store.getters['isTeacher']? $t('teacher.tagging_description') : $t('post.tagging_description')"> -->
    </div>
    <!-- <span><i  @click="toggleTagOn" class="material-icons">&#xE7FE;</i></span> -->
    <customloader loaderClass="btn btn-primary submitBtn" :loaderClick="addComment" :loaderDisabled="commentButtonLoading" loaderText="index.comment"></customloader>
  </div>

  </div>
  <!-- <div class="textarea-container">
  <textarea v-model="textAreaText"></textarea>
  <div class="textarea-size" v-html="textAreaText"></div>
</div> -->
</div>
</template>
<script>
import tagSuggestions from '~/components/view/tagSuggestions'
import profilepicBox from '~/components/profilepicBox'
export default {
  name: 'addComment',
  props: ['post', 'isComment', 'parentComment'],
  mounted () {
    // let payload = {type: 'STICKERS', authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}
    //         this.$store.dispatch('redemption/viewRedemptions', payload).then(response => {
    //             let stickers = response.data.redemptions
    //             let emojis = []
    //             for (let i=0;i<stickers.length;i++) {
    //               let emojiObject = {
    //                 name: stickers[i].redemptionId+'a',
    //                 short_names: [('sticker'+stickers[i].redemptionId)],
    //                 text: '',
    //                 emoticons: [],
    //                 keywords: [('sticker'+stickers[i].redemptionId)],
    //                 imageUrl: stickers[i].imageUrl
    //               }
    //               emojis.push(emojiObject)
    //             }
    //             this.customEmojis = emojis
    //         })

/*
    if(this.post && this.post.taggedUser){
      for(let val of this.post.taggedUser){
          this.taggedUserName.push({
              "id": val,
              "name": this.$store.getters["postContent/getUserInfo"](val).username
          })
      }
    }
*/
  },
  created () {
    let vm = this
    this.$root.$on('comment-dltText', function(){
      vm.commentText = '';
    })
    this.$root.$on('comment-edit', function({comment})
    {
      vm.commentText = comment.postData
      vm.commentId = comment.commentId
      if (comment.taggedUser && comment.taggedUser.length>0) {
        let tempUserName = comment.taggedUser.map( source => {
        let userInfoObj = this.$store.state.postContent.userInfo.filter(target => (target.userid === source))[0]
        return {id: userInfoObj.userid, name: userInfoObj.username}
      })
      vm.taggedUserName = tempUserName
      vm.taggedUserIds = []
      }
    })
  },
  beforeDestroy () {
    //this.$root.$off('comment-edit')
  },
  data () {
    return {
      textAreaText: "",
      textAreaTextDiv: this.post ? this.post.commentText : '',
      commentText: '',
      tagData: '',
      tagOn: false,
      taggedUserIds: [],
      taggedUserName: [],
      emojBox: false,
      commentTextDiv: '',
      customEmojis: [],
      commentButtonLoading: false
    }
  },
  components: {
    tagSuggestions, profilepicBox
  },
  methods: {
    commentTextChange () {
      this.commentTextDiv = this.commentText + "\n"
    },
    addComment () {
      if(this.commentText.length === 0) {
        this.$toast.error(this.$t('toastMsg.commentEmpty'))
      } else {
        for(let obj of this.taggedUserName){
            this.taggedUserIds.push(obj.id);
        }
        let payload = {
          postData: this.commentText,
          discussionId: this.isComment? (this.parentComment? this.parentComment.commentId: this.post.commentId) : this.post.discussionId,
          //type: 'COMMENT',
          type: this.isComment? 'COMMENT':'POST',
          repliedToId: (this.post && this.post.commentId && this.parentComment)?  this.post.userid : '',
          taggedUser: this.taggedUserIds
        }
        this.commentButtonLoading = true
        // Sending discussionId in case of nestedComment to update the count of count post
        if (this.commentId) {
          //edit a comment
          this.$store.dispatch('postContent/editComment', {discussionId: this.isComment? (this.parentComment? this.parentComment.discussionId: this.post.discussionId): undefined, authToken: this.$store.state.auth.user.token, payload, commentId: this.commentId, langCode: this.$store.state.locale.selectedLocale}).then(response => {
            this.commentButtonLoading = false
            //this.$toast.success(this.$t('toastMsg.commentAddSuccess'))
            this.$root.$emit('closeAddCommentPopup', {})
            this.commentText = '';
            this.taggedUserName = [];
            this.taggedUserIds = []
            this.commentId = ''
          })
        }
        else {
          //add a comment
          this.$store.dispatch('postContent/addComment', {discussionId: (this.isComment? (this.parentComment? this.parentComment.discussionId: this.post.discussionId): undefined), authToken: this.$store.state.auth.user.token, payload, langCode: this.$store.state.locale.selectedLocale}).then(response => {
            this.commentButtonLoading = false
            this.$toast.success(this.$t('toastMsg.commentAddSuccess'))
            this.$root.$emit('closeAddCommentPopup', {})
            this.commentText = ''
            this.taggedUserName = []
            this.taggedUserIds = []
            this.commentId = ''
          })
        }
      }
      this.$refs.app.style.height = 120+'px';
    },
    onFocusComment (){
        this.tagOn = false;
    },
    fetchNameAndPic (userId) {
      let userInfoArr = this.$store.state.postContent.userInfo
      let userInfoObj = {username: 'name', userpic: '' }
      for(let i=0; i<userInfoArr.length;i++)
      {
        if(userId === userInfoArr[i].userid)
        {
          userInfoObj['username'] = userInfoArr[i].username
          userInfoObj['userpic'] = userInfoArr[i].userpic
        }
      }
      return userInfoObj
    },
    getUserList () {
        let postId = this.post? this.post.postId : undefined
        let tagUser = "tagUsersList";
        let payload = this.tagData
        this.$store.dispatch(`postContent/${tagUser}`, {authToken: this.$store.state.auth.user.token, payload, langCode: this.$store.state.locale.selectedLocale}).then((response) => {})
    },
    handleSelectedIds(obj) {
      if(this.taggedUserName.indexOf(obj[0])) {
        this.taggedUserName.push(obj[0])
      }
      this.tagData = '';
      this.tagOn = false;
    },
    toggleTagOn(){
      this.tagOn = !this.tagOn
      this.getUserList();
    },
    openEmojBox(){
        this.emojBox = !this.emojBox;
    },
    removeTag(id){
        for(let i = 0; i< this.taggedUserName.length; i++){
            if(this.taggedUserName[i].id === id){
                this.taggedUserName.splice(i, 1);
            }
        }
    },
    textAreaAdjust(el) {
     let aa = this.$refs.appa.offsetHeight
     this.$refs.app.style.height = aa+'px';
    },
    addEmoji(e){
        this.commentText = (this.commentText?this.commentText:'')+' '+e.native;
        this.emojBox = false;
    },
    userIsThere(user){
        for(let i=0;i<this.taggedUserName.length;i++){
            if(this.taggedUserName[i].id === user.userId){
              return false;
            }
        }
        return true;
      }
  },
  computed: {
    showTagList () {
      return (this.$store.state.postContent.userList )
    }
  }
}
</script>

<style>
.tempImgSize {width: 62px; height: 62px;}
.emoji-mart-scroll {
      border-bottom: 0;
      margin-bottom: 6px;
    }

    .emoji-mart-scroll + .emoji-mart-bar {
      display: none;
    }
    .emoji-mart{
        width: 253px;
        position: absolute;
        left: 65%;
        bottom: 100%;
    }
  .emoji-mart .emoji-mart-scroll{max-height: 114px;}

  .textarea-container{ position: relative;  transition: all 0.5s; margin:0; width: 100%}
 .cmtBox .textBody{ transition: all 0.2s }


  .textarea-container textarea, .textarea-container .textarea-size {
  min-height: 27px;
  font-family: sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  padding: 4px;
  border: 0;
  overflow: hidden;
 width: 100%;
  overflow: auto!important;
}

.textarea-container textarea {
  height: 100%;
  position: absolute;
  resize:none;
  white-space: normal; width: 100%; outline: none; box-shadow: none!important;
}

.textarea-container .textarea-size {
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.cmtBox .textBody{ overflow: hidden; }
.cmtBox {border: 1px solid #fcca26 !important;}

</style>
