<template>
  <div class="WrapperSubscribe">
  <div class="pageboxSubscribeOuter">
   <div class="contentSec pageboxSubscribe">
       <div class="scrollSec ">
         <div class="conMidSec">
          <div class="subjectsRow clearfix">
                  <div class="subscribe_sec">
                     <a href="#" class="logo"> Brand Logo </a>
                     <h2 class="brandName">Brand Name</h2>
                     <p class="regesterTxt">Register and enjoy learning</p>
                     <h3 class="subscribeAs">Subscribe as</h3>
                     <div class="actionBtnsec clearfix">
	                      <button class="btn btnStdnt btnLg"> Student </button>
	                      <button class="btn add_notesBtn btnLg btnTecher"> Teacher </button>
	                  </div>
	                  <div class="subsSignInSec">
	                    <a href="#" class="subsSignIn">Sign In </a> |  <a href="#" class="subsSignIn"> Free Trial</a>
	                    <div class="trailInfo">
	                      <i class="material-icons">info_outline</i>
                          <div class="infoContent">
                            Access Free Trial with Promocode from Knowledge Partners.
                            <br>
                            <a href="#" class="knowMore">Know more</a>
                          </div>
	                    </div>
	                  </div>
                  </div>
              </div>
            </div>

   </div>

   </div>
 </div>
 </div>
</template>
<script>
export default {
  middleware: 'anonymous',
  layout: 'blank',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `Login`,
      bodyAttrs: {
        class: 'hold-transition login-page'
      }
    }
  },
  methods: {
    login: function (event) {
      event.preventDefault()
      if (!this.email || this.email.trim === '') {
        this.error = 'Email Id is mandatory'
      } else if (!this.validateEmail(this.email)) {
        this.error = 'Email Id is not valid'
      } else if (!this.password || this.password === '') {
        this.error = 'Password is mandatory'
      } else {
        this.error = ''
        // login now
        // this.$toast.show('starting to log in')
        this.$store.dispatch('auth/login', {email: this.email, password: this.password, context: this,
        langCode: this.$store.state.locale.selectedLocale})
        /* .then(() => {
          this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
        }) */
      }
      
    },
    validateEmail: function (email) {
      // TODO add validation here
      // var re = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
      // return re.test(email)
      return true
    }
  }
}
</script>
