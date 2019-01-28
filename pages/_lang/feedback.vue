<template>
  <div class="feedbackFormOuter">
      <a class="pclose" @click="hideFeedbackPopup" ><span><i class="material-icons">&#xE5CD;</i></span></a>

  <div class="referForm feedbackForm">
        <h3>{{$t('feedback.feedbackHead')}}</h3>
     <!-- <p>{{$t('refer.refer_text')}} <strong>500</strong> {{$t('refer.coins')}}  ! {{$t('refer.refer_code')}} <strong>{{this.$store.state.initialData.referralCode}}</strong></p> -->
     <div class="regFormElements">

      <!-- <b @click="checkFb">my Fb</b> -->
     <div  class="formGroup">
        <input type="text" class="form-control" v-model="suggestionTitle" :placeholder="$t('feedback.fTitle')">
     </div>

     <div class="formGroup">
        <textarea class="formControl form-control" v-model="suggestionMsg" :placeholder="$t('feedback.fSuggestion')"></textarea>
    </div>

   </div>
    <button @click="submitReview" class="btn btn-primary btn-invite">{{$t('feedback.feedbackSubmit')}}</button>
  </div>
</div>
</template>
<script>
  export default {
    head () {
			return {
			title: this.$t('common.feedback')
			}
		},
    data () {
      return {
        suggestionMsg: '',
        suggestionTitle: ''
      }
    },
    layout: 'default',
    mounted() {
      this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    },
    methods:{
      submitReview() {
        debugger
        if(this.suggestionTitle === '' || this.suggestionTitle === undefined) {
          this.$toast.error(this.$t('feedback.feedbackTitle'))
        }
        else if(this.suggestionMsg === '' || this.suggestionMsg === undefined) {
          this.$toast.error(this.$t('feedback.feedbackMsg'))
        }else {
          let payload = {
            feedback:this.suggestionTitle,
            suggestions: this.suggestionMsg,
            contact:true
          }
          this.$store.dispatch('common/userFeedback', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, payload: payload}).then(response => {
              if(response.data.status === 'SUCCESS') {
                //this.$toast.success(this.$t('feedback.feedbackSuccess'))
                this.suggestionTitle = ''
                this.suggestionMsg = ''
              }
          })
        }

      },
      hideFeedbackPopup() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
      }
    }
  }
</script>
<style>
.feedbackFormOuter{ position: relative; display:flex;justify-content:center;align-items:center;}
.feedbackForm{position: relative;width:500px;}
</style>
