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
                <div class="subscribe_sec loginPage" v-if="!firstLogin">
                    <div class="subscribeInner">
                      <!-- <a href="#" class="logo"> Brand Logo 1</a>
                      <h2 class="brandName">Brand Name</h2> -->
                      <h2 class="welcomeLoginTxt">{{$t('login.welcome_message')}}</h2>
                      <p class="regesterTxt"><!-- {{$t('register.sign_learning')}} -->
                      {{$t('login.welcome_message_description_just_login')}}

                      </p>

                      <form class="regFormElements" @submit="login">
                        <label for="inputEmail" class="sr-only">{{$t('settings.email_placeholder')}}</label>

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

                        <div class="forgetSec clearfix">

                          <label class="control control--checkbox">

                          <input type="checkbox" v-model="rememberMe">
                          <div class="control__indicator"></div> {{$t('login.remember_me')}}
                          </label>

                          <a  @click="toForgot" class="forgetPass">{{$t('register.forgot_password')}}</a>
                        </div>
                        <div class="inputRow">
                          <label class="control control--checkbox terms">
                                    {{$t('register.i_agree')}} <a @click="openTncPopup">{{$t('register.terms_conditions')}}</a>
                                    <input v-model="acceptTerms" type="checkbox">
                                    <div class="control__indicator"></div>
                          </label>
                        </div>
                        <tnc-popup v-if="showTnc" :close="closeTncPopup" :agreeTerms="agreeTerms"/>

                        <div class="row">
                          <div class="col-sm-6">
                            <button class="btn btn-block btn-primary loginSignBtn" type="submit"> {{$t('register.sign_in')}} </button>
                          </div>
                          <div class="col-sm-6">
                          <!-- <p class="orTxt">{{$t('common.or')}}</p> -->
                            <button type="button" @click="toSignUp" class="btn btn-block btnSubscription"> {{$t('marketing.subscribe')}} </button>
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
                <div class="subscribe_sec loginPage" v-if="firstLogin">
                  <a  class="logo"> Brand Logo </a>
                  <h2 class="brandName">Brand Name</h2>
                  <p class="regesterTxt">{{$t('register.change_password')}}</p>
                  <form class="form-signin" @submit="changePassword">
                    <label for="inputEmail" class="sr-only">Principal</label>
                    <div class="linput">
                      <input type="text" v-on:blur="sendOTP()" id="email" v-model="principal" class="formcontrol" :placeholder="$t('register.registered_email_phone')" required="" autofocus="">
                    </div>


                    <label for="inputPassword" class="sr-only">Password</label>
                    <div class="linput">
                      <input type="password" v-model="fpassword" @blur="checkInputPassword(fpassword)" v-show="!showPassword" class="formcontrol" :placeholder="$t('register.password')">
                      <input type="text" v-model="fpassword" @blur="checkInputPassword(fpassword)" v-show="showPassword" class="formcontrol" :placeholder="$t('register.password')">
                      <span @click="showPassword = !showPassword">
                        <i class="material-icons" v-show="!showPassword">remove_red_eye</i>
                        <i class="material-icons" v-show="showPassword">visibility_off</i>
                      </span>
                    </div>
                    <label for="inputPassword" class="sr-only">{{$t('register.confirm_pssword')}}</label>
                    <div class="linput">
                      <input type="password" @blur="checkInputPassword(cpassword)" v-model="cpassword" class="formcontrol" placeholder="Confirm password">
                    </div>
                    <div class="clearfix loginBtn">
                      <button class="btn btnStdnt btnLg" type="submit">{{$t('register.submit')}}</button>
                    </div>
                  </form>
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
import tncPopup from '~/components/tncPopup'
export default {
  head() {
    return {
      title: this.$t('marketing.login'),
      bodyAttrs: {
        class: "hold-transition login-page"
      }
    };
  },
  components: {tncPopup},
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
      showPassword: false,
      showTnc: false,
      source: ''
    };
  },
  mounted() {
    this.checkPhone();
    var url_string = window.location.href;
    var url = new URL(url_string);
    this.source = url.searchParams.get("source");
    // if(source === 'invoice_email'){
    //   this.showTnc = true;
    // }
    let dataParamObj = this.$router.currentRoute.path
    this.$root.$emit('showLangCodeActive', {dataParamObj})
    if((window.localStorage.getItem('userName') !== '')&&(window.localStorage.getItem('password') !== '')) {
      this.email = window.localStorage.getItem('userName')
      this.password = window.localStorage.getItem('password')
      this.rememberMe = true
    }else {
      this.email = ''
      this.password = ''
    }
  },
  asyncData({ req }) {
    return {
      name: req ? "server" : "client"
    };
  },
  methods: {
    checkPhone:function (){
      if(this.$store.state.platFormType == 'android'){
        return window.location = this.$store.getters['getAndriodPlayStore']()
      }else if(this.$store.state.platFormType == 'ios'){
        return window.location = this.$store.getters['getIosPlayStore']()
      }
    },
    login: function(event) {
      event.preventDefault();
      window.localStorage.setItem('userName','');
      window.localStorage.setItem('userName',this.email);
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if(this.email === ""){
               this.$toast.error(this.$t('toastMsg.emailPhone_validation'))
               return false;
           }
           else if(isNaN(this.email)){
            if(!(this.email.match(mailformat))){
                  this.$toast.error(this.$t('toastMsg.email_validation'))
                   return false;
               }
           }
           else{
             if(this.email.length !=10)
             {
                 this.$toast.error(this.$t('toastMsg.phone_validation'))
                 return false;
            }
          }
      if(this.acceptTerms === false) {
        this.$toast.error(this.$t('toastMsg.termsNConditionNotAgreed'))
      }
      else if (!this.password || this.password === "") {
        // this.error = "Password is mandatory";
        this.$toast.error(this.$t('toastMsg.password_required'))
      } else {
        this.error = ''
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
          remember: this.rememberMe,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
          .then(response => {
              localStorage.setItem("userId",response.data.userId);
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children
                this.$store.dispatch('updateChildId', {childObj: response.data.children})
              }
              if(response.data.roles[0]=== 'STUDENT'||response.data.roles[0]=== 'TEACHER' || response.data.roles[0]=== 'PARENT') {
                if (response.data.firstLogin) {
                  this.firstLogin = true
                }
                else{
                  if (response.data.roles[0]=== 'PARENT' && response.data.children.length > 0 && response.data.children[0].isFirstPaymentDone === true) {
                    setTimeout(() => {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/myprogress'))
                    }, 1000)

                  }else if(response.data.roles[0]=== 'PARENT' && response.data.children.length > 0 && response.data.children[0].isFirstPaymentDone === false){
                    setTimeout(() => {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/mySubscription'))
                    }, 1000)
                  }else {
                    if(!response.data.onboarding) {
                      if(this.source === 'invoice_email'){
                        // console.log("here");
                        this.showTnc = true;
                      }
                      // this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
                    }else {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                    }
                  }
                }
              }

              if ((this.$store.state.initialData.gradeChangePending)) {
                setTimeout(() => {
                  this.$root.$emit("openUserGradeChangePopup", {});
                }, 1000)
              } else if(this.$store.state.initialData.expiryDays <= 15) {
                setTimeout(() => {
                  this.$root.$emit("openExpiryPopup", {});
                }, 1000)
              }

              $zopim(function() {
                $zopim.livechat.hideAll();
                $zopim.livechat.clearAll();
              });



          }, (error) => {

            if(error.response.data.code === 'USER_ACCOUNT_DEACTIVATED') {
              let dataObj = {}
              dataObj.payloadDataObj = {
                email: this.email,
                password: this.password,
                context: this
              }
              dataObj.context = this
              dataObj.btnActionName = 'activate'
              let dataParam =  dataObj
              this.$root.$emit('showActivationActionPopup', {dataParam})
            } else if(error.response.data.code === 'USER_PAYMENT_PENDING' || error.response.data.code === 'SUBSCRIPTION_EXPIRED') {
              console.log("DATA ",error.response.data);
              this.$store.dispatch('auth/userCredential',{principal:this.email,password:this.password,userId:error.response.data.userId})
              localStorage.setItem("userId",error.response.data.userId);
              this.$router.push(this.$store.getters['locale/getFinalUrl']('/paymentPending'))
            } else {
              //this.$toast.error(error.response.data.code)
            }
          })
      }
    },
    checkInputPassword(data) {
      if(data.length < this.$store.getters['getMinPasswordLength']()) {
        this.$toast.error(this.$t('toastMsg.password_minlength') +" "+this.$store.getters['getMinPasswordLength']()+" "+ this.$t('toastMsg.password_minlengthCharacter'))
      }
    },
    navTnc() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/tnc`));
    },
    openTncPopup() {
      this.showTnc = true
    },
    closeTncPopup() {
      this.showTnc = false
      this.acceptTerms = false
    },
    agreeTerms() {
      this.showTnc = false
      this.acceptTerms = true
      if(this.source === 'invoice_email'){
          // console.log("here2");
          // this.showTnc = true;
          this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
        }
    },
    toForgot() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/forgot`));
    },
    toSignUp() {
      this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/register`), query: this.$route.query});
    },
    sendOTP: function() {
      if (this.principal !== "") {
        this.$store.dispatch("auth/sendOTP", {
          principal: this.principal,
          taskType: "CHANGE_PASSWORD",
          authToken: this.$store.state.auth.firstTokenInfo.firstToken,
          langCode: this.$store.state.locale.selectedLocale
        });
      }
    },
    logout: function() {
      this.$store
        .dispatch("auth/logout", {
          authToken: this.$store.state.auth.firstTokenInfo.firstToken,
          userId: this.$store.state.auth.firstTokenInfo.userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
        .then(
          response => {
            if (response) {
              this.firstLogin = false;
              this.email = "";
              this.password = "";
            }
          },
          error => {
            this.$toast.error(error.response.data.code)
          }
        );
    },
    changePassword: function(event) {
      event.preventDefault();
      if (!this.principal || this.principal.trim === "") {
        this.$toast.error(this.$t('toastMsg.phoneNeeded'));
        return;
      } else if (!this.fpassword || this.fpassword === "") {
        this.$toast.error(this.$t('toastMsg.passwordRequired'));
        return;
      } else if (this.fpassword !== this.cpassword) {
        this.$toast.error(this.$t('toastMsg.passwordNotMatch'));
        return;
      } else {
        this.$store
          .dispatch("auth/changeOrForgotPassword", {
            principal: this.principal,
            newPassword: this.fpassword,
            taskType: "CHANGE_PASSWORD",
            otp: "1234",
            authToken: this.$store.state.auth.firstTokenInfo.firstToken,
            langCode: this.$store.state.locale.selectedLocale
          })
          .then(
            response => {
              if (response.data.status === "ERROR") {
                //this.$toast.success("Server error occured. Please try again!")
              } else {
                this.logout();
                this.principal = ''
                this.fpassword = ''
                this.cpassword = ''
                //this.$toast.success(this.$t('toastMsg.password_change_success'))
              }
            },
            error => {
              this.$toast.error(error.response.data.code)
            }
          );
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
