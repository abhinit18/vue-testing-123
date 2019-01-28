<template>
  <div class="likeList">


      <!-- <h3><i class="shareIco"></i> {{$t('post.people_shared')}}</h3> -->
      <h3><i class="heartIco"></i> {{$t('post.people_like')}}</h3>

      <div class="media clearfix" v-for="like in likes">
          <div class="media-left">
              <a @click="goToProfile(like)">
                  <!-- <img class="media-object" :src="fetchNameAndPic(like).userpic" alt="..."> -->
                  <postImageBox :imageObj="fetchNameAndPic(like)"/>
                  <div class="ubadge gold"></div>
              </a>
          </div>
          <div class="media-body">
              <a class="btn btn-secondry pull-right" v-if="fetchNameAndPic(like).buddystatus">{{fetchNameAndPic(like).buddystatus}}</a>
              <a class="name" @click="goToProfile(like)">{{fetchNameAndPic(like).username}}</a>
          </div>
      </div>
  </div>
</template>
<script>
import postImageBox from '~/components/postImageBox'
export default {
  name: 'likelist',
  props: ['likes'],
  components: {postImageBox},
  methods: {
    fetchNameAndPic (userId) {
      let userInfoArr = this.$store.state.postContent.userInfo
      let userInfoObj = {username: 'name', userpic: '' }
      for(let i=0; i<userInfoArr.length;i++)
      {
        if(userId === userInfoArr[i].userid)
        {
          userInfoObj['username'] = userInfoArr[i].username?userInfoArr[i].username:''
          userInfoObj['userpic'] = userInfoArr[i].userpic
          userInfoObj['userid'] = userId
            if( userInfoArr[i].buddystatus === ''){
                userInfoObj['buddystatus'] = "";
            }
            if( userInfoArr[i].buddystatus === 'FRIEND'){
                userInfoObj['buddystatus']= "Buddy";
            }
            if( userInfoArr[i].buddystatus === 'REQUEST_SENT'){
                userInfoObj['buddystatus'] = "Cancel Request";
            }
            if( userInfoArr[i].buddystatus === 'REQUEST_RECEIVE'){
                userInfoObj['buddystatus'] = "Accept Request";
            }
        }
      }
      return userInfoObj
    },
    goToProfile (userId) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
    }
  }
}
</script>
