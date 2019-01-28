<template>
    <div class="postTabs">
      

      

      <!-- {{currentTab==='my_profile'? '('+$store.state.postContent.totalPosts+')': ''}} -->
      <!-- {{currentTab==='wall'? '('+$store.state.postContent.totalPosts+')': ''}} -->
      <!-- {{currentTab==='all'? '('+$store.state.postContent.totalPosts+')': ''}}
      {{currentTab==='my'? '('+$store.state.postContent.totalPosts+')': ''}} -->
      <ul class="tbs" v-if="isProfile">
          <li :class="{active: currentTab==='my_profile'}" @click="toggleCurrentTab('my_profile')"><a>{{isMyProfile? $t('index.my_posts') : $t('index.posts')}} </a></li>
          <li v-if="!nowallpost" :class="{active: currentTab==='wall'}" @click="toggleCurrentTab('wall')"><a>{{$t('index.wall_posts')}} </a></li>
      </ul>
      <ul class="tbs" v-else>
          <li :class="{active: currentTab==='all'}" @click="toggleCurrentTab('all')"><a>{{$t('index.all_posts')}} </a></li>
          <li :class="{active: currentTab==='my'}" @click="toggleCurrentTab('my')"><a>{{$t('index.my_posts')}} </a></li>
      </ul>
      <div id="myDIV" class="tabContent tabContentFocus postScrollOuter"   tabindex="0" >
        <div class="postSlider" v-if="this.$store.state.postContent.posts.length>0 && postRefreshToggle">




            <div class="newPostSecListing">
              

 
          <div :key="post.postId" :index="index" v-for="post,index in this.$store.state.postContent.posts">
          <postRow :toggleAddPopup = "toggleAddPopup" :toggleCommentPopup="toggleCommentPopup"  :key="post.postId" :post="post"/>
          </div>
          
            </div>




          <!-- .concat().sort((a,b) => b.created - a.created) -->
         
          <!-- <div v-if="wnWdthCar">
          <carousel-3d :perspective="0" :width="700" :space="40" :inverseScaling="40" :height="290"  :display="5" :loop="true"  :startIndex="currentIndex" :animationSpeed="1000" :autoplayHoverPause="true" :controlsVisible="true" @last-slide="onLastSlide" @before-slide-change="onBeforeSlideChange" @after-slide-change="onAfterSlideChange" :count="this.$store.state.postContent.posts.length">
          <slide :key="post.postId" :index="index" v-for="post,index in this.$store.state.postContent.posts">
          <postRow :toggleAddPopup = "toggleAddPopup" :toggleCommentPopup="toggleCommentPopup"  :key="post.postId" :post="post"/>
          </slide>
          </carousel-3d>
          </div>
          <div v-else>
          <carousel-3d :perspective="0" :width="700" :space="60" :inverseScaling="60" :height="350"  :display="5" :loop="true"  :startIndex="currentIndex" :animationSpeed="1000" :autoplayHoverPause="true" :controlsVisible="true" @last-slide="onLastSlide" @before-slide-change="onBeforeSlideChange" @after-slide-change="onAfterSlideChange" :count="this.$store.state.postContent.posts.length">
          <slide :key="post.postId" :index="index" v-for="post,index in this.$store.state.postContent.posts">
          <postRow :toggleAddPopup = "toggleAddPopup" :toggleCommentPopup="toggleCommentPopup"  :key="post.postId" :post="post"/>
          </slide>
          </carousel-3d>

          </div> -->





        </div>
        <welcomePost v-else/>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import postRow from '~/components/view/post/postRow'
import welcomePost from './welcomePost'
import Vue from 'vue'
import commentlist from '~/components/view/post/commentlist'
Vue.component('commentlist', commentlist)
import likelist from '~/components/view/post/likelist'
Vue.component('likelist', likelist)
import addComment from '~/components/addEdit/post/addComment'
Vue.component('addComment', addComment)
Vue.component('postRow', postRow)

export default {
  data () {
    return {
      currentTab: 'all',
      currentPage: 1,
      currentIndex: 0,
      scrollPosition: 0,
      wnWdthCar: true,
      busy:false,
      postRefreshToggle: true
    }
  },
  beforeDestroy () {
  this.$root.$off('post-added')
  },
  mounted () {
    this.$root.$on('post-added', () => {
      this.currentIndex = 0
      this.postRefreshToggle = false
      setTimeout (() => {
        this.postRefreshToggle = true
      }, 1)
    })
    this.currentTab = this.isProfile? 'my_profile' : 'all'
    this.$store.dispatch('postContent/resetPost')
    this.$store.dispatch('postContent/updateIsWallPost', {isWallPost: false})
    this.fetchData()
    var timer;

      var scrollTimer = false;
      var count = 0;
       
      document.getElementById("myDIV").addEventListener('wheel', e => {
          if(count > 0){
            return false;
          }
         count = ++count;
            // parseScroll(e);
            // if(e.deltaY > 0) {
                let elm = document.getElementById('myDIV')
                let scrollHeight = elm.scrollHeight;
                let scrollTop = elm.scrollTop;
                let clientHeight = elm.clientHeight;
                if(scrollHeight-scrollTop == clientHeight) {
                  if(this.$store.state.postContent.requestPost) {
                  this.fetchData()
                  }
                }
            //   let payLoadObj = {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, offset: this.$store.state.postContent.offset}
            //   if (this.isProfile) {
            //     // inside posts of profile page
            //     if (this.currentTab==='wall') {
            //       payLoadObj["isWallPost"]=true
            //     }
            //     payLoadObj["userId"]=this.userId
            //   } else {
            //     // inside posts of index page
            //     if(this.currentTab==='my') {
            //       payLoadObj['userId']=this.$store.getters['getUserId']()
            //     }
            //   }
            // this.$store.dispatch('postContent/fetchPost', payLoadObj)
            // }
            window.clearInterval(scrollTimer);
           scrollTimer = window.setTimeout(function() {
            count = 0;
          },1200);
           
      });
    let vm = this
    if (window.innerWidth <= 1700) {
       vm.wnWdthCar = true
    }
    else{
       vm.wnWdthCar = false
    }
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 1700) {
         vm.wnWdthCar = true
      }
      else{
         vm.wnWdthCar = false
      }
       
    })
  },
  components: {postRow, welcomePost},
  props: ['toggleCommentPopup', 'toggleAddPopup', 'userId', 'isProfile', 'nowallpost'],
  methods: {
    fetchData () {
      let payLoadObj = {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, offset: this.$store.state.postContent.offset}
      if (this.isProfile) {
        // inside posts of profile page
        if (this.currentTab==='wall') {
          payLoadObj["isWallPost"]=true
        }
        payLoadObj["userId"]=this.userId
      } else {
        // inside posts of index page
        if(this.currentTab==='my') {
          payLoadObj['userId']=this.$store.getters['getUserId']()
        }
      }
      this.$store.dispatch('postContent/fetchPost', payLoadObj)
    },
    toggleCurrentTab (value) {
      this.currentTab = value
      this.$store.dispatch('postContent/resetPost')
      if(value==='wall') {
        this.$store.dispatch('postContent/updateIsWallPost', {isWallPost: true})
      } else {
        this.$store.dispatch('postContent/updateIsWallPost', {isWallPost: false})
      }
      this.fetchData()
    },
    onLastSlide (event) {
      // this.currentPage = this.currentPage + 1
    },
    onAfterSlideChange (event) {
      if (this.currentIndex === event) {
        this.currentIndex = event + 1
      } else {
        this.currentIndex = event
      }

      // fetching data from api
      if (this.currentIndex + 3 > this.$store.state.postContent.posts.length ) {
        let offset = 0
        if (this.$store.state.postContent.posts.length>0) {
          offset = this.$store.state.postContent.offset
        }
        if (!(offset === 0 && this.$store.state.postContent.posts.length!==0)) {
          this.fetchData()
        }
        this.currentPage = this.currentPage + 1
      }

    },
    postViewed (index) {
      let nextPost = this.$store.state.postContent.posts[index]
      this.$store.dispatch('postContent/viewPost', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, postId: nextPost.postId})
    }
	},

    //myFunction(e) {

      //alert('akash');
      //document.querySelector('.tabContentFocus').focus();
      

        //e = e || window.event;
        //if (e.keyCode == '38') {
          // document.querySelector('.carousel-3d-controls .next').click();
        //}
        //else if (e.keyCode == '40') {
         //  document.querySelector('.carousel-3d-controls .prev').click();
        //}
        // else if (e.keyCode == '37') {
        //     alert('left')
        // }
        // else if (e.keyCode == '39') {
        //     alert('right')
        // }
    //},
    // myFunctionScroll(this) {
    //   if (this.deltaY < 0) {
    //     document.querySelector('.carousel-3d-controls .next').click();
    //   }
    //   if (this.deltaY > 0) {
    //      document.querySelector('.carousel-3d-controls .prev').click();
    //   }
    // }
  
  
  computed: {
    ...mapState({
      userid: state => state.auth.user.userId
    }),
    getPostLength() {
      this.$store.state.postContent.posts.length
    },
    isMyProfile () {
            return ((this.userId === this.$store.state.initialData.userId) && this.isProfile )
        }
  }
}
</script>
<style>
.postItem {min-height: 100%;}
.carousel-3d-container{  margin: 20px 0 0 }
</style>
