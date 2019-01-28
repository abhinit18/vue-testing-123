<template>
  <div>
    <div class="WrapperSubscribe">
      <div class="pageboxSubscribeOuter">
        <div class="contentSec pageboxSubscribe">

         <div class="geometryBgLeft"></div>
         <div class="geometryBgRight"></div>
          <!-- <div class="cloud csmall csmallani"></div>
          <div class="cloud csbig csbigani"></div>
          <div class="cloud csmall cleft"></div>
          <div class="cloud csbig cleft cleft2"></div> -->

          <div class="loginimg"></div>
          <div class="loginimg2"></div>
          <div class="loginimg3"></div>
          <div class="loginimg4"></div>


          <div class="scrollSec ">
            <div class="conMidSec ">
              <div class="loginPageOuter">
              <div class="subjectsRow clearfix">
                <div class="subscribe_sec loginPage">
                    <div class="subscribeInner">
                      <!-- <a href="#" class="logo"> Brand Logo 1</a>
                      <h2 class="brandName">Brand Name</h2> -->
                      <h2 class="welcomeLoginTxt">{{$t('login.welcome_message')}}</h2>
                      <p class="regesterTxt"><!-- {{$t('register.sign_learning')}} -->
                      {{$t('login.welcome_message_description')}}

                      </p>

                      <form class="regFormElements" @submit="login">
                        <label for="inputEmail" class="sr-only">Email address</label>

                        <div class="loginInput" style="position:relative;">
                           <label for="email">{{$t('login.username')}}</label>
                           <span class="verifiedIco" style="top:30px;" v-if="emailValid"></span>
                          <input type="text" id="email" v-model="email" class="form-control" :placeholder="$t('login.username_placeholder')" required="" autofocus="">
                        </div>
                        <div class="loginInput passwordInput">
                        <label for="inputPassword">{{$t('register.password')}}</label>
                          <!-- <input type="password" id="password" class="formcontrol" placeholder="Password" v-model="password"> -->

                          <input type="password" v-model="password" v-show="!showPassword" class="form-control" :placeholder="$t('register.password')">
                          <input type="text" v-model="password" v-show="showPassword" class="formControl" :placeholder="$t('register.password')">
                          <!-- <span @click="showPassword = !showPassword">
                            <i class="material-icons" v-show="!showPassword">remove_red_eye</i>
                            <i class="material-icons" v-show="showPassword">visibility_off</i>
                          </span> -->
                        </div>
                        <br>
                        <div class="row">
                          <div class="col-sm-6">
                            <button class="btn btn-block btn-primary loginSignBtn" type="submit"> {{$t('register.sign_in')}} </button>
                          </div>
                        </div>
                      </form>
                      <!-- <div class="subsSignInSec clearfix">
                        <a href="/register" class="subsSignIn">{{$t('register.buy_subscription')}} </a> |
                        <a href="#" class="subsSignIn">{{$t('register.free_trial')}}</a>
                        <div class="trailInfo">
                          <i class="material-icons">info_outline</i>
                          <div class="infoContent">
                            {{$t('register.access_free_trial')}}
                            <br>
                            <a href="#" class="knowMore">{{$t('register.know_more')}}</a>
                          </div>
                        </div>
                      </div> -->
                   </div>
                </div>
                <div class="footer">
                <footer><span v-html="$t('common.footer')"></span></footer>
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
  head() {
    return {
      title: this.$t('marketing.login'),
      bodyAttrs: {
        class: "hold-transition login-page"
      }
    };
  },
  middleware: "anonymous",
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showPassword: false,
      rememberMe: false,
      acceptTerms: false,
      emailValid: false,
      firstLogin: false,
      principal: '',
      fpassword: '',
      cpassword: '',
      error: '',
      dataObj: {},
      showPassword: false
    };
  },
  mounted() {
    if((window.localStorage.getItem('userName') !== '')&&(window.localStorage.getItem('password') !== '')) {
      this.email = window.localStorage.getItem('userName')
      this.password = window.localStorage.getItem('password')
      this.rememberMe = true
    }else {
      this.email = ''
      this.password = ''
    }
    let dataParamObj = this.$router.currentRoute.path
    this.$root.$emit('showLangCodeActive', {dataParamObj})
  },
  asyncData({ req }) {
    return {
      name: req ? "server" : "client"
    };
  },
  methods: {
    login: function(event) {
      event.preventDefault();

      if (!this.password || this.password === "") {
        // this.error = "Password is mandatory";
        this.$toast.error(this.$t('toastMsg.password_required'))
      } else if (!this.email || this.email === ""){
        this.$toast.error(this.$t('toastMsg.loginID'))
      }else {
        let userBulkData = {}
        // userBulkData.role = 'STUDENT'
        // userBulkData.SubscriptionId = 47
        // userBulkData.inviteId = 31538
        // userBulkData.firstName = 'Abhinit'
        // userBulkData.lastName = 'Roy'
        // this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/userRegister?=${userBulkData.role}-${userBulkData.SubscriptionId}-${userBulkData.inviteId}-${userBulkData.firstName}-${userBulkData.lastName}`),  query: this.$route.query} )
        this.error = ''
        this.$store.dispatch('auth/bulkLogin', {
          email: this.email,
          password: this.password,
          remember: this.rememberMe,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
          .then(response => {

            if(response.data.status === 'SUCCESS') {
              this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/userRegister?role=${response.data.user.role}&SubscriptionId=${response.data.user.SubscriptionId}&inviteId=${response.data.user.inviteId}&firstName=${response.data.user.firstName}&lastName=${response.data.user.lastName}&orgId=${response.data.user.organizationId}&orgType=${response.data.user.organizationType}`),  query: this.$route.query} )
            }else {
              if(response.data.message){
                this.$toast.error(response.data.message)
              }else{
                this.$toast.error(response.data.code)
              }
            }

          }, (error) => {
            this.$toast.error(response.data.message)
          })
      }
    },
    validateEmail: function(email) {
      // TODO add validation here
      // var re = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
      // return re.test(email)
      return true;
    }
  }
};
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
