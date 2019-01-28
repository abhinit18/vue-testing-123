<template>
    <div v-show="ratedone">
      <div class="pointRate_box" v-show="ratingsPopup">
        <a class="pclose" @click="hide()" ><span><i class="material-icons">&#xE5CD;</i></span></a>
        {{$t('rating.congratulations')}} {{this.$store.state.auth.user.firstName}}!<br>
        <span v-if="content.type != 'ARTICLE'" class="earnedPoint_txt">{{$t('rating.youEarned')}} <span class="pink_txt">{{this.$store.state.content.ratingsPoint}}</span> {{$t('index.points')}} </span>
        <div class="congrate_box">
          <div class="congrate_box_txt"> {{$t('rating.ratingHow1')}}<br> {{$t('rating.ratingHow2')}}
          </div>
          <div class="rating_box">
            <star-rating v-model="rating" :star-size="50" active-color="#ffcc4b" :show-rating="false" @rating-selected="setRatings"></star-rating>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['content', 'ratingsPopup'],
    data() {
      return {
        rating: 0,
        ratedone: true
      }
    },
    methods: {
      hide (){
        this.$store.dispatch('content/hideRatingDialog').then(() => {
        })
      },
      setRatings() {
        let payload = {
          "contentId": this.content.contentId,
          "rating": this.rating,
          "review": ""
        }
        this.$store.dispatch(`postContent/setRatings`, {
          authToken: this.$store.state.auth.user.token,
          payload,
          langCode: this.$store.state.locale.selectedLocale
        }).then((response) => {
          //this.$toast.success(this.$t('toastMsg.rated_successfully'));
          this.ratedone = false;
        }, (error) => {
        })
      },
    }
  }
</script>
