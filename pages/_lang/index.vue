<template>

    <div class="bodyCon clearfix" id="scrollParam">

       <!-- select theme pop starts -->
                                <!-- select theme pop ends -->
      <!-- COMMENTS POPUP COMES HERE-->

        <section class="container">
            <div class="pagebox clearfix">
                <div class="pageboxOver" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}"></div>
                <sidebarUser></sidebarUser>

                      <div class="contentSec">



                          <div class="scrollSec scrollSecHome">


                              <div class="conMidSec">

                              <ol class="breadcrumb">
                              <li><a href="#">{{$t('index.home')}}</a></li>
                              <li class="active">{{$t('index.idea_board')}}</li>
                            </ol>

                                <div class="primaryContentSec homeGamgeSec clearfix">
                                <div class="clearfix">

                                    <button class="btn btn-white pull-right" v-if="$store.getters['checkPrimaryType']()" @click="viewPrimaryPost">{{viewPostData? $t('index.view_game') : $t('index.view_posts') }}</button>
                                  </div>
                                    <div class="primaryContentSecInner clearfix" v-if="!viewPostData">
                                      <div class="welcomText"  v-if="viewDecider!=2">
                                        <!-- <p class="backBtn pclosebtn" v-if="viewDecider===1" @click="backToPostList(2)"><i class="material-icons">&#xE5CD;</i></p> -->
                                          <span>{{$t('index.hey') + ' ' + (this.$store.state.initialData.firstName)}}  !</span> {{$t('index.welcome_message')}}
                                      </div>



                                      <div class="gamebox">
                                        <baloon-game/>
                                        <!-- <div id="main-wrapper">
                                          <div id="canvas">
                                          </div>
                                          <div id="score-label">
                                            Score: <span id="score-count">0</span>
                                          </div>
                                          <div id="start-btn">
                                            <span>Play</span>
                                          </div>
                                          <div id="pause-btn">
                                          </div>
                                        </div> -->
                                      </div>



                                      <div class="playBtn">  {{$t('index.pin_all')}} <span> {{$t('index.baloons')}} </span>    <img src="~assets/images/dog.png">
                                       </div>




                                    </div>









 </div>
 <div :class="[{'full-width': true, primaryViewPosts: true, primaryViewPostsFull: (viewDecider==2)}]" v-if="viewPostData">
 <div class="postDetails">


 <div class="welcomText"  v-if="viewDecider!=2">

   <p class="backBtn pclosebtn" v-if="viewDecider==1" @click="backToPostList(2)"><i class="material-icons">&#xE5CD;</i></p>
     <span>{{$t('index.hey') + ' ' + ($store.state.initialData.firstName)}}  !</span> {{$t('index.welcome_message')}}
 </div>

   <a class="pclose" v-if="viewDecider==2" @click="backToPostList(1)"><span><i class="material-icons">&#xE5CD;</i></span> </a>

 <div v-show="viewDecider==0">
 <div class="postThoughts">

    <img :src="$store.getters['getUserMascot']()" @click="cocoView = !cocoView" width="58" class="imgMsct">
     <profilepicBox/>
     <input type="text" @click="toggleAddPopup" class="form-control" :placeholder="$t('index.add_post_placeholder')">
     <i class="ico material-icons" @click="toggleAddPopup">&#xE3C9;</i>
 </div>
</div>
 <div class="postDetailsInner clearfix">
   <addPost v-if="viewDecider==1" :close = "toggleAddPopup" :post = "editPostData" :sharedPost="sharedPost"/>

   <commentPopup v-if="viewDecider==2" :close = "toggleCommentPopup" :post="popupData" :type="type"/>
 </div>
</div>
<div v-if="viewDecider!=2 && resetterVariable == 0">

<postWrapper :toggleCommentPopup="toggleCommentPopup" :toggleAddPopup="toggleAddPopup"/>
</div>
</div>


                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
import sidebarUser from '~/components/sidebarUser'
import commentPopup from '~/components/view/post/commentPopup'
import postWrapper from '~/components/view/post/postWrapper'
import addPost from '~/components/addEdit/post/addPost'
import profilepicBox from '~/components/profilepicBox'
import baloonGame from '~/components/baloonGame'
import axios from '~/plugins/axios'
export default {
  head () {
    return {
      title: this.$t('index.home')
    }
  },
  beforeDestroy () {
            this.$root.$off('openAddPopup')
            this.$root.$off('sharedPopupGotClosed')
        },
  mounted () {
    if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
          this.$root.$emit('childExpiryPopUp', {
          byParent: this.$store.state.currentSelectedChild.expiryDays,
          bySubs: this.$router.currentRoute.path
      })
      }
    // this.$store.dispatch('getApplicationProperties')
    this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    if(this.$store.getters['isParent']()) {
      this.$store.dispatch('sidebarHomeContent/parentNavChange', 2)
    }else{
      this.$store.dispatch('sidebarHomeContent/navChange', 1)
    }

    this.$store.dispatch('content/fetchRecent',{ authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale, childId:this.$store.state.currentSelectedChild.id,type: 'unfinished', size: 2})
    this.$root.$on('openAddPopup', (sharedPost) => {
      this.$root.$emit('closePostPopup', {})
      this.resetterVariable = -1
      setTimeout (()=> {
        this.resetterVariable = 0
      }, 0)
      this.viewDecider = 1
      this.sharedPost = sharedPost
    })
    this.$root.$on('sharedPopupGotClosed', () => {
      this.resetterVariable = -1
      setTimeout (()=> {
        this.resetterVariable = 0
      }, 0)
    })
    if(this.$store.getters['checkPrimaryType']()) {
      this.viewPostData = false
    } else {
      this.viewPostData = true
    }

    this.$store.dispatch('snowPlowPageView',{pageName: "HOME_IDEABOARD"});

  },
  data () {

    return {
      viewDecider: 0, //0-NONE, 1: ADDPOST, 2: COMMENTPOPUP
      popupData: {},
      resetterVariable: 0,
      type: '',
      viewPostData: true,
      editPostData: undefined,
      sharedPost: undefined,
      chekPrimary: false,
      subtitle: this.$t("index.ideaboard")
    }
  },
  components: {
    sidebarUser, commentPopup, postWrapper, addPost, profilepicBox, baloonGame
  },
  methods: {
    toggleCommentPopup (post, type) {
      if (this.viewDecider==2) {
        this.popupData = {}
      } else {
        this.popupData = post
        this.type = type
      }
      this.viewDecider = this.viewDecider==2? 0: 2
    },
    viewPrimaryPost() {
      this.viewPostData = !this.viewPostData
    },
    toggleAddPopup (post) {
      // this.postIndComment = !this.postIndComment;
      this.viewDecider = this.viewDecider==1? 0: 1
      if (post && post.postId) {
        this.editPostData = post
        //this.sharedContent = post.SharedContentResponse
      }
      else {
        this.editPostData = undefined
        this.sharedPost = undefined
      }
    },
    backToPostList (flag) {
      this.viewDecider = 0
    },
    checkIfPrimary () {
      // TODO check for user role and grade should be less than 5 (1-4)
      if(this.$store.state.initialData.grades[0].gradeId < 6) {
      this.chekPrimary = true
    }else{
      this.chekPrimary = false
    }

    }
  },
  middleware: 'authenticated'
}
</script>

<style>
  .backBtn{
      font-size: 12px;
      cursor: pointer;
      font-weight: 600;
  }
  @import url('https://fonts.googleapis.com/css?family=Contrail+One');
#main-wrapper{
  position:relative;
  margin: 0 auto;
  width:100%;
  height:300px;
  /*-webkit-box-shadow: 0 0 20px rgba(0,0,0,0.7);*/
}
#canvas{
  position:absolute;
  top:0;
  left:0;
  width:50vw;
  height:300px;
  background:#fff;
  overflow:hidden;
}
#score-label{
  position:absolute;
  top:10px;
  left:10px;
  font-family: 'Contrail One', cursive;
  font-size:30px;
  color:#fff;
  text-shadow:1px 1px 0 #000;
}
#start-btn{
  position:absolute;
  background:#D5A21A;
  color:#fff;
  font-family: 'Contrail One', cursive;
  font-size:30px;
  padding:3px 10px;
  border-radius:10px;
  text-shadow:1px 1px 0 #A35906;
  border:4px solid #fff;
  cursor:pointer;
  top:200px;
  left:50%;
  margin-left:-40px;
  display:nonea;
  box-shadow:0 0 20px rgba(0, 0, 0, 0.5);
}
#pause-btn{

}
.balloon.green{
  position:absolute;
  width:40px;
  height:53px;
  background-image: url('data:image/png;base64,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');

}
</style>
