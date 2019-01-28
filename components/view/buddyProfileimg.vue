<template>
  <div class="" @click="gotoBuddyProfile">
    <div class="buddy-img-box" v-if="profileImg.userPic">
        <img :src="profileImg.userPic" class="img buddyImg">
        <!-- <div class="ubadge gold goldTag"></div> -->
        <!--
        <div class="ubadge silver">SILVER</div>
        <div class="ubadge bronze">BRONZE</div>
        -->
    </div>
    <div class="picPlaceHolder" v-else>{{profileImg.firstName.toUpperCase().substring(0,1)}}</div>
  </div>
</template>

<script>
export default {
  props:['profileImg'],
  methods: {
    gotoBuddyProfile() {
      let user = this.profileImg.userId;
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
    }
  }
}
</script>
 
