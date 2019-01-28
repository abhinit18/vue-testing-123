<template>
    <div class="img" @click="goToProfile(imageObj.userid)">
        <img v-if="imageObj.userpic!=='' && imageObj.userpic!=='NONE'" :src="imageObj.userpic" class="img">
        <div class="picPlaceHolder" v-else>{{imageObj? (imageObj.username? imageObj.username.substr(0,1): '-'): '-'}}</div>
        <!-- <div class="ubadge gold">{{$t('index.gold')}}</div> -->
    </div>
</template>
<script>
export default {
    props: ['imageObj'],
    methods: {
        goToProfile(userId) {
            if (userId) {
                this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
            }
      }
    }
}
</script>