<template>
  <div>

  <div class="media" v-bind:style="{backgroundColor: post.color? post.color: '#fff'}">

    <div class="media-left" @click="goToProfile(post.userid)">
        <a>
            <postImageBox :imageObj="fetchNameAndPic(post.userid)" />
            <!-- <img class="" :src="fetchNameAndPic(post.userid).userpic" width="47" height="47" alt="..."> -->
        </a>
    </div>
    <div class="media-body">
        <h4 class="media-heading" @click="goToProfile(post.userid)">{{fetchNameAndPic(post.userid).username}}</h4>
        <!-- <p class="datime">{{timeDifference(time, post.updated)}}</p> -->
        <div class="datime">
          <div class="dcol">
          {{new Date(post.updated) | moment("MMM, Do YYYY")}} <span class="postdateTimeDot"></span> {{new Date(post.updated) | moment("HH:mm")}}</div>
          <div class="dcol" v-if="post.location && post.location.name">
            <a :href="directionUrl+post.location.name" target="_blank"><i class="material-icons">location_on</i>{{post.location.name}}</a>
          </div>
           <div class="dcol">
          <!-- <span class="viesCount"><i class="material-icons">&#xE417;</i>{{post.viewsOnPost}} Views</span>  -->
        </div>

        </div>
        <div v-if="post.totalTaggedUser>0">
          <div class="textType">
          <div class="buddyAdded" v-for="tguser in post.taggedUser" @click="goToProfile(tguser)">{{fetchNameAndPic(tguser).username}}
          </div>
        </div>
        </div>
        <div class="info" v-html="getReplacedPostData(post.postData)" v-if="less">

        </div>
        <!-- <a v-if="less" @click="toggleMore" class="cursor">{{$t('common.less')}}</a>  -->
        <div class="info" v-else> {{post.postData.substr(0, 100)}}
          <a v-if="showMore" @click="toggleMore" class="cursor">{{$t('common.more')}}</a>
        </div>








        <div class="potImagesSec">



              <!-- <div class="col-xs-6" v-for="img in post.images" v-if="post.images.length === 2"><img :src="img"> </div> -->
              <div v-if="showLightBox">
      <lightBox :startAt="startingIndex" v-on:onOpened="onOpen" :showLightBox="showLightBox" :images="imagesPost"></lightBox>
     </div>
                <ul v-if="post.images && post.images.length > 0" v-bind:class="{imgOnly2: post.images.length===2,imgOnly3: post.images.length===3,imgOnly1: post.images.length===1}" >
                  <li v-for="(img, index) in post.images" ><div @click="showImages(post.images, index)" v-bind:style="{ backgroundImage: 'url(' + img + ')' }" ><img style="opacity: 0;" src="~assets/images/placeholder.png"></div> </li>
                </ul>

              <!--    <ul class="imgOnly2">
                  <li v-for="img in post.images"><div v-bind:style="{ backgroundImage: 'url(' + img + ')' }" ><img style="opacity: 0;" src="~assets/images/placeholder.png"></div> </li>
                </ul>


                 <ul class="imgOnly3">
                  <li v-for="img in post.images"><div v-bind:style="{ backgroundImage: 'url(' + img + ')' }" ><img style="opacity: 0;" src="~assets/images/placeholder.png"></div> </li>
                </ul>
                -->





              <!-- <div class="col-xs-12" v-if="post.location && (post.images && post.postData)">

                 <a :href="directionUrl+post.location.name"><img :src="staticImgUrl1+post.location.name+staticImgUrl2" alt="Google Map of Albany, NY"></a>

              </div> -->



        </div>





        <div class="postItemSharedBox" v-if="post.postShareId && !post.contentId">
          <postRow :post="post.sharedPostResponse" :share="true"/>
        </div>
        <div class="postItemSharedBox" v-else-if="post.contentId">
          <contentShareBox :content="post.SharedContentResponse" v-if="post.SharedContentResponse"/>
        </div>

    </div>



</div>

<div v-if="!share">

        <!-- <div class="hwoLikes">
            <a>
            <img class="media-object" v-for="topliker in post.topliker" :src="fetchNameAndPic(topliker).userpic" alt="...">
            </a>
            <a @click="toggleCommentPopup? toggleCommentPopup(post, 'like'): toggleLikeNComment('like')">{{post.likeCount + ' ' + (post.likeCount<=1? $t('index.like'): $t('index.likes'))}}</a>
            <a @click="toggleCommentPopup? toggleCommentPopup(post, 'comment'): toggleLikeNComment('comment')">{{post.commentCount  + ' ' + (post.commentCount<=1? $t('index.comment'): $t('index.comments'))}}</a>
        </div> -->

        <div class="btnSec clearfix likeIcons"  v-if="!share">
          <div>
            <a @click="likeToggle(post.isSelfLiked)" :class="{active: post.isSelfLiked}"> <span class="icons iconLike"></span></a>
            <a  class="btn btn-link" @click="toggleCommentPopup? toggleCommentPopup(post, 'like'): toggleLikeNComment('like')">{{post.likeCount + ' ' + (post.likeCount===1? $t('index.like'): $t('index.likes'))}}</a>
          </div>
          <div>
            <a class="" @click="toggleCommentPopup? toggleCommentPopup(post, 'comment'): toggleLikeNComment('comment')"><span class="icons iconComment"></span></a>
            <a class="btn btn-link" @click="toggleCommentPopup? toggleCommentPopup(post, 'comment'): toggleLikeNComment('comment')"> {{post.commentCount + ' ' + (post.commentCount===1? $t('index.comment'): $t('index.comments'))}}</a>
          </div>
          <div class="lmsShareLinkPost">
            <a @click="openAddPopup"><span class="icons iconShare"></span></a>
            <a class="btn btn-link" @click="openAddPopup"> {{$t('index.share')}}</a>
          </div>
        </div>

      </div>

</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import contentShareBox from '~/components/view/post/contentShareBox'
import postImageBox from '~/components/postImageBox'

export default {
  mounted () {

  },
  components: {contentShareBox, postImageBox},
  props: ['post','toggleCommentPopup', 'toggleLikeNComment', 'share'],
  data () {
    let imagesPost = [];
    return {
      showMore: (this.post && this.post.postData && this.post.postData.length > 100),
      directionUrl: "https://www.google.com/maps/dir//",
      less: this.toggleLikeNComment? true : false,
      imagesPost: imagesPost,
      showLightBox: false,
      startingIndex: 0
    }
  },
  methods: {

    onOpen(val){
      if(!val){
        this.showLightBox = false;
        this.imagesPost = [];
      let m = document.getElementsByClassName('pagebox');

      if(m.length > 0){
        m[0].classList.remove('lightBoxzIndex')
      }
      }
    },
  showImages(images, index){
    if(images.length && images.length > 0){
      images.forEach(element => {
        this.imagesPost.push({
          src: element,
          thumb: element
        })
      });
      this.showLightBox = true;
      this.startingIndex = index;
            let m = document.getElementsByClassName('pagebox');

      if(!this.$store.state.postContent.fromNotification){
        if(m.length > 0){
          m[0].classList.add('lightBoxzIndex')
        }
      }
    }
  },
  getReplacedPostData (postData) {
    return postData.replace(/\n/g, "<br />")
  },
  goToProfile(userId) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
    },
  toggleMore () {
    // this.less = !this.less
    this.toggleCommentPopup(this.post, 'comment')
  },
  viewImg(index) {

    this.lightbox = true
    this.mySwiper.slideTo(index+1)
    this.chosenImg = index
  },
  likeToggle (selfLiked) {
    if (selfLiked) {
      this.$store.dispatch('postContent/deleteLike', {payload: {type: 'POST', likeTypeId: this.post.postId}, postId: this.post.postId, authToken: this.$store.state.auth.user.token, userId: this.$store.getters['getUserId'](), langCode: this.$store.state.locale.selectedLocale})
    } else {
      this.$store.dispatch('postContent/likePost', {payload: {type: 'POST', likeTypeId: this.post.postId}, postId: this.post.postId, authToken: this.$store.state.auth.user.token, userId: this.$store.getters['getUserId'](), langCode: this.$store.state.locale.selectedLocale})
    }
  },
  timeDifference (current, previous) {
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = current - previous

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago'
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago'
    } else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago'
    }
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
        userInfoObj['userid'] = userId
      }
    }
    return userInfoObj
  },
  openAddPopup () {
  let content = {}
  if(this.post.contentId){
    content = this.post.SharedContentResponse
  }else if(this.post.postShareId){
    content = this.post.sharedPostResponse
  }else{
    content = this.post
  }

    this.$root.$emit('openAddPopup', content)
  }
},
computed: mapState({
  time: state => state.locale.now
})
}
</script>
<style>
  .cursor{
    cursor: pointer;
  }
  .mgAuto{
    margin:0 auto;max-width:300px;width:100%;
  }
  .dcol{color:#333 !important;}
  .dcol a{color:#333 !important;}
  .dcol i{color:#333 !important;}
</style>
