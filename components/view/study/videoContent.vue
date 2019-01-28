<template>
  <div class="videoBox">
    <ratingPopup :content="content" :ratingsPopup="ratingsPopup"> </ratingPopup>



    <div class="similarContentSec">
      <div class="pcontainer">
        <h3 class="popHeading">Similar Concepts</h3>

        <div class="item">
          <div class="thumb">
            <img src="http://via.placeholder.com/200x150">
            <span class="vidicon"></span>
          </div>
          <h4>Resource Title</h4>
          <div class="info">
            <p class="liked"><i class="likeIcon"></i> <strong>35</strong> found helpful</p>
          </div>
        </div>
        <div class="item">
          <div class="thumb">
            <img src="http://via.placeholder.com/200x150">
            <span class="texticon"></span>
          </div>
          <h4>Resource Title</h4>
          <div class="info">
            <p class="liked"><i class="likeIcon likedIcon"></i> <strong>35</strong> found helpful</p>
          </div>
        </div>
        <div class="item">
          <div class="thumb">
            <img src="http://via.placeholder.com/200x150">
            <span class="audioicon"></span>
          </div>
          <h4>Resource Title</h4>
          <div class="info">
            <p class="liked"><i class="likeIcon"></i> <strong>35</strong> found helpful</p>
          </div>
        </div>
        <div class="item">
          <div class="thumb">
            <img src="http://via.placeholder.com/200x150">
            <span class="vidicon"></span>
          </div>
          <h4>Resource Title</h4>
          <div class="info">
            <p class="liked"><i class="likeIcon"></i> <strong>35</strong> found helpful</p>
          </div>
        </div>




        <div class="markCompleteSec">
          <button class="btn btn-primary btn-lg">Mark as completed</button>

          <p>Win 100 Points by marking this complete</p>
        </div>


      </div>
    </div>
    <div @click="toggleFullscreen" class="videoFullScreenBtn">
      <i class="material-icons fullico">fullscreen</i>
      <i class="material-icons fullicoexit">fullscreen_exit</i>
    </div>
    <!--




    <div @click="toggleFullscreen" class="videoFullScreenBtn"><i class="material-icons">fullscreen</i></div>
    <div class="embed-responsive embed-responsive-100vh">
      <video class="embed-responsive-item"
        src="src" autoplay=""></video>
    </div>
  -->
    <div class="videoContainer">
      <div class="overlay"></div>
    <div class="video-player-box videoPlayerBox" @seek="onPlayerSeeking($event)" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied($event)" @statechanged="playerStateChanged($event)" v-video-player:myVideoPlayer="playerOptions">
    </div>
    </div>

  </div>
</template>

<script>
  import {
    lrsPost,
    formVideoStatement
  } from '../../../utils/lrs'
  import ratingPopup from './ratingPopup';

  export default {
    props: ['content', 'ratingsPopup', 'isIndependentContentView'],
    components:{
      ratingPopup
    },
    data() {
    this.locale = this.$store.state.locale.selectedLocale;

    let contentBody = ''
    if(this.content.body.length > 1){
    contentBody = this.content.body.find((aBody) => {
      return (aBody.lang == this.locale) ? true : false
    })['value']
    }else{
      contentBody = this.content.body[0]["value"]
    }
    console.log('contentBody >> ', contentBody);

    let type = (contentBody.indexOf('m3u8') > -1) ? "application/x-mpegURL" : "video/mp4"

      return {
        playerOptions: {
          // videojs options
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
           type: type,
            src: this.content.body[0].value
          }],
          poster: "",
          autoplay: true
        },
        playedOnce: false,
        lastSendTime: 0,
        intervalId: '',
        isSeeking: false
      }
    },
    mounted(){
    },
    methods: {
      toggleFullscreen(e) {
        this.$store.dispatch("content/toggleContentFullscreen")
      },
      // listen event
      onPlayerPlay(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player play!', player)
        let contentId = this.content.contentId;
        let currenttime = player.cache_.currentTime;
        let verb = '';
        let object = 'video';
        let objectDetails;
        currenttime = currenttime ? currenttime.toString(): "0";

        if (this.playedOnce) {
          verb = "resumed";
          objectDetails = {
            id: contentId,
            currenttime
          }
        } else{
          verb = 'played'
          objectDetails = {
            id: contentId,
            currenttime
          }
        }

        let contentType = this.$store.state.locale.selectedLocale;
        let authToken = this.$store.state.auth.user.token

        lrsPost(authToken, {
          verb,
          object,
          objectDetails
        }, contentType).then(response => {
               if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
        })

        //Subtitle on play video
        if (this.content.body[0].subtitle) {
          let label = ''
          if (this.content.body[0].lang === "en")
            label = 'English'
          if (this.content.body[0].lang === "ru")
            label = 'Russian'
          if (this.content.body[0].lang === "kz")
            label = 'Kazakh'
          let track = {
            kind: 'subtitles',
            src: this.content.body[0].value,
            srclang: this.content.body[0].lang,
            label: label,
            default: 'default'
          };
          player.nativeTextTracks = false;
          player.addRemoteTextTrack(track, false);
        }
      },
      onPlayerPause(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player pause!', player)
        //console.log("Player time Update => " + performance.now() + "  " + player.currentTime() +  " " + this.isSeeking +  "      \n");
        this.playedOnce = true;
        let currenttime = player.cache_.currentTime
        let missedPlayTime = Math.abs(currenttime - this.lastSendTime).toString()
        let verb = "paused";
        let contentId = this.content.contentId;
        let object = 'video';
        currenttime = currenttime.toString();

        let contentType = this.$store.state.locale.selectedLocale;
        let authToken = this.$store.state.auth.user.token
        let objectDetails = {
          id: contentId,
          currenttime,
          missedPlayTime
        }

        lrsPost(authToken, {
          verb,
          object,
          objectDetails
        }, contentType).then(response => {
             if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
        })

        this.lastSendTime = parseFloat(currenttime);
      },
      onPlayerEnded(player) {
      //debugger
        //console.log( Math.floor(Date.now() / 1000), 'player ended!', player)
        if(this.content.completed){
          if(!this.content.rated){
            this.$store.dispatch('content/showRatingDialog').then(() => {
          })
          }
          return
        }

        let contentType = this.content.type;
        let contentId = this.content.contentId;
        let subTopicId = this.content.subTopicId;
        let langCode = this.$store.state.locale.selectedLocale;
        let authToken = this.$store.state.auth.user.token
        let topicId = this.content.topicId
        let subjectId = this.content.subjectId
        this.$store.dispatch('content/markContentComplete', {
          authToken,
          langCode,
          contentType,
          subTopicId,
          contentId,
          topicId,
          subjectId,
          isIndependentContentView: this.isIndependentContentView
        }).then(() => {
        })

        this.lastSendTime = 0;

      },
      onPlayerLoadeddata(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player Waiting!', player)
      },
      onPlayerPlaying(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('full screen check',player.isFullscreen(), player.supportsFullScreen())
      //  console.log("Player time Update => " + performance.now() + "  " + player.currentTime() +  " " + this.isSeeking +  "  " + this.lastSendTime +  "     \n");
        let currenttime = player.currentTime()
        if (Math.abs(currenttime - this.lastSendTime) >= 10 && this.isSeeking == false) {
          this.lastSendTime = currenttime
          let verb = "playing";
          let contentId = this.content.contentId;
          let object = 'video';

          let contentType = this.$store.state.locale.selectedLocale;
          let authToken = this.$store.state.auth.user.token
          currenttime = currenttime.toString();
          let objectDetails = {
            id: contentId,
            currenttime
          };

          lrsPost(authToken, {
            verb,
            object,
            objectDetails
          }, contentType).then(response => {
                if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
          })
        }
      },
      onPlayerCanplay(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        //console.log( Math.floor(Date.now() / 1000), 'player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log( Math.floor(Date.now() / 1000), 'player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
         var currentTime = this.content.currentState? this.content.currentState : 0
         var maxTime = this.content.maxCurrentTime? this.content.maxCurrentTime : 0
        //  var currentTime = "0"
        //  var maxTime = "20"

    //This example allows users to seek backwards but not forwards.
    //To disable all seeking replace the if statements from the next
    //two functions with myPlayer.currentTime(currentTime);

    player.on("seeking", (event) => {
      this.isSeeking = true;
   //   console.log("Player time seeking => " + performance.now() + "  " + player.currentTime() +  " " + this.isSeeking +  "      \n");
      this.lastSendTime = player.currentTime()
      if(player.currentTime() > maxTime) {
        player.currentTime(currentTime)
      }
      // if (currentTime < player.currentTime()) {
      //   player.currentTime(currentTime);
      // }
    });

    player.on("seeked", (event) => {
      this.isSeeking = false;
   //   console.log("Player time seeked => " + performance.now() + "  " + player.currentTime() +  " " + this.isSeeking +  "  " + this.lastSendTime + "       \n");
      this.lastSendTime = player.currentTime()
      if(player.currentTime() > maxTime) {
        player.currentTime(currentTime)
      }
    });

    let intervalId = setInterval(function() {
      if (player && !player.paused()) {
        currentTime = player.currentTime()
        if (currentTime>maxTime) {
          maxTime = currentTime
        }
      }
    }, 1000);
    this.intervalId = intervalId
        //console.log( Math.floor(Date.now() / 1000), 'example 01: the player is readied', player)
        let initialCurrenttime = this.content.currentState? this.content.currentState : 0
        player.currentTime(initialCurrenttime)
        // player.isFullscreen(true)
        let contentId = this.content.contentId;
        let verb = 'initialised';
        let object = 'video';

        initialCurrenttime = initialCurrenttime.toString();

        let contentType = this.$store.state.locale.selectedLocale;
        let authToken = this.$store.state.auth.user.token
        let objectDetails = {
          id: contentId,
          currenttime: initialCurrenttime
        };

        lrsPost(authToken, {
          verb,
          object,
          objectDetails
        }, contentType).then(response => {
            if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
        })

        if (this.content.body[0].subtitle) {
          let label = ''
          if (this.content.body[0].lang === "en")
            label = 'English'
          if (this.content.body[0].lang === "ru")
            label = 'Russian'
          if (this.content.body[0].lang === "kk")
            label = 'Kazakh'

          let track = {
            kind: 'subtitles',
            src: this.content.body[0].subtitle,
            srclang: this.content.body[0].lang,
            label: label,
            default: 'default'
          };
          player.nativeTextTracks = false;
          player.addRemoteTextTrack(track, false);
        }
      }
    },
    destroyed() {
      window.clearInterval(this.intervalId);
      this.$store.dispatch("content/makeContentFullscreen")
    }
  }
</script>

<style>
/*
.videoContainer {
    position: relative;
    width: 100%;
    height: 100%;
    //padding: 20px;
    border-radius: 5px;
    background-attachment: scroll;
    overflow: hidden;
}
.videoContainer .videoPlayerBox {
    min-width: 100%;
    min-height: 100%;
    position: relative;
    z-index: 1;
}
.videoContainer .overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    background: white;
    opacity: 0.5;
}
*/
</style>
