<template>
  <div class="contentSec pageboxSubscribe">




          <div class="cloud csmall csmallani"></div>
          <div class="cloud csbig csbigani"></div>

          <div class="cloud csmall cleft"></div>
          <div class="cloud csbig cleft cleft2"></div>


          <div class="loginimg"></div>
          <div class="loginimg2"></div>
          <div class="loginimg3"></div>
          <div class="loginimg4"></div>

<div class="forgotBoxOuter">
<div class="forgotBox" v-if="showOtp">
     <div class="forgotBoxInner">
        <div class="forgotBoxInner2">
           <div class="subscribeInner">
              <h2 class="welcomeLoginTxt">{{$t('forgot.forgotHead')}}</h2>
              <p class="regesterTxt">{{$t('forgot.forgotsmallText')}}</p>
              <div class="regFormElements">

                 <div class="inputRow">
                    <label>{{$t('forgot.enterPrincipal')}}</label>
                    <div class="passInput">
                       <input type="text" v-model="userPrincipal" placeholder=""
                          class="formControl ">
                    </div>
                 </div>
                 <div class="btns clearfix">
                   <button class="btn btn-secondry btnSubscription pull-left" @click="cancelForgot">{{$t('forgot.forgotCancel')}}</button>
                   <customloader loaderClass="btn btn-primary pull-right" :loaderClick="principalValidation" :loaderDisabled="step2Forgot" loaderText="forgot.forgotNext"></customloader>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>



  <div class="forgotBox" v-if="showVerifyOtp">
     <div class="forgotBoxInner">
        <div class="forgotBoxInner2">
           <div class="subscribeInner">
              <h2 class="welcomeLoginTxt">{{$t('forgot.enterOtp')}}</h2>
              <p class="regesterTxt">{{$t('forgot.enterOtpStep')}}</p>
              <div class="regFormElements">

                 <div class="inputRow">
                    <label>{{$t('forgot.enterOtpLabel')}}</label>
                    <div class="passInput">
                       <input type="text" maxlength="4" @keypress="isNumber" v-model="enterOtp" placeholder=""
                          class="formControl formLetterSpace">
                    </div>
                 </div>
                 <div class="btns clearfix">
                    <countDown v-if="$store.state.auth.otpTimer == true"></countDown>
                    <a  class="btn btn-link btn-resendPassBtn" v-else @click="sendOTP">{{$t('forgot.OtpResend')}}</a>
                    <customloader loaderClass="btn btn-primary pull-right" :loaderClick="verifyForgotPasswordOtp" :loaderDisabled="step3Forgot" loaderText="forgot.forgotNext"></customloader>
                    <!-- <button class="btn btn-primary pull-right" @click="verifyForgotPasswordOtp">{{$t('forgot.forgotNext')}}</button> -->
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>











    <div class="forgotBox" v-if="showPasswordField">
     <div class="forgotBoxInner">
        <div class="forgotBoxInner2">
           <div class="subscribeInner">
              <h2 class="welcomeLoginTxt">{{$t('forgot.choosePassword')}}</h2>
              <p class="regesterTxt regesterTxtNew">{{$t('forgot.password_must_be')}} {{$store.getters['getMinPasswordLength']()}} {{$t('forgot.digitConstraint')}}</p>
              <div class="regFormElements">
                 <div class="inputRow">
                    <label>{{$t('forgot.typePassword')}} </label>
                    <div class="passInput">
                       <input type="password" @keypress="isValidPassword" v-model="fpassword" placeholder="* * * * * * * * * * *"
                          class="formControl formLetterSpace">
                    </div>
                 </div>

                 <div class="inputRow">
                    <label>{{$t('forgot.retypePassword')}}</label>
                    <div class="passInput" v-if="!showPasswordInput">
                       <input type="password" @keypress="isValidPassword"  v-model="cpassword" placeholder="* * * * * * * * * * *"
                          class="formControl formLetterSpace">
                          <span class="viewPass" @click="showPasswordInput = true">
                             <i class="material-icons">remove_red_eye</i>
                             <!--  <i class="material-icons">visibility_off</i> -->
                          </span>
                    </div>
                    <div class="passInput" v-if="showPasswordInput">
                       <input type="text"  v-model="cpassword" placeholder="* * * * * * * * * * *"
                          class="formControl formLetterSpace">
                          <span class="viewPass" @click="showPasswordInput = false">
                             <i class="material-icons">visibility_off</i>
                             <!--  <i class="material-icons">visibility_off</i> -->
                          </span>
                    </div>
                 </div>
                 <div class="btns clearfix">
                   <customloader loaderClass="btn btn-primary pull-right" :loaderClick="changePassword" :loaderDisabled="step4Forgot" loaderText="forgot.submitPassword"></customloader>
                    <!-- <button class="btn btn-primary pull-right" :disabled="!proceedBtn" @click="changePassword">{{$t('forgot.submitPassword')}}</button> -->
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>









<div class="forgotBox" v-if="showSuccessField">
     <div class="forgotBoxInner">
        <div class="forgotBoxInner2">
           <div class="subscribeInner">

             <span class="successIco"><i class="material-icons">&#xE5CA;</i></span>


              <h2 class="welcomeLoginTxt">{{$t('forgot.popupHead')}} !</h2>
              <p class="regesterTxt">{{$t('forgot.popupHeadMsg')}}</p>
              <div class="regFormElements">

                 <div class="btns clearfix">
                    <button class="btn btn-primary pull-right" @click="toLogin">{{$t('forgot.forgotLogin')}}</button>
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
import countDown from '~/components/countDown'
export default {
   head() {
    return {
      title: this.$t('index.forgot_password'),
      bodyAttrs: {
        class: 'hold-transition login-page'
      }
    }
  },
  middleware: 'anonymous',
  layout: 'login',
  components: {countDown},
  data() {
    return {
      email: '',
      password: '',
      error: '',
      showPasswordInput: false,
      showPassword: false,
      showVerifyOtp: false,
      step2Forgot: false,
      step3Forgot: false,
      step4Forgot: false,
      showOtp: true,
      proceedBtn: false,
      showPasswordField: false,
      showSuccessField: false,
      validations: false,
      firstLogin: false,
      principal: '',
      enterOtp: '',
      userPrincipal: '',
      fpassword: '',
      cpassword: '',
      error: '',
      showPassword: false
    }
  },
  mounted() {
    let dataParamObj = this.$router.currentRoute.path
    this.$root.$emit('showLangCodeActive', {dataParamObj})
  },
  asyncData({
      req
    }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  methods: {
    showPssword() {
      this.showPasswordInput = !this.showPasswordInput
    },
    cancelForgot() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/marketing`));
    },
    login: function(event) {
      event.preventDefault()
      if (!this.email || this.email.trim === '') {
        this.error = 'Email Id is mandatory'
      } else if (!this.validateEmail(this.email)) {
        this.error = 'Email Id is not valid'
      } else if (!this.password || this.password === '') {
        this.error = 'Password is mandatory'
      } else {
        this.error = ''
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
          .then((response) => {
            if (response) {
              if (this.$store.state.auth.firstTokenInfo) {
                this.firstLogin = true
              }
            }
          }, (error) => {
          })
      }
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true;
      }
    },
    principalValidation() {
      this.step2Forgot = true
      // if(this.userPrincipal === '') {
      //   this.$toast.error(this.$t('forgot.principalRequired'))
      // }
      // else if(this.userPrincipal.length === 10 && (typeof JSON.parse(this.userPrincipal) === 'number')) {
      //   if(this.$store.getters['validatePhone'](this.userPrincipal)){
      //     this.validations = true
      //     this.existingPrincipalVerify()
      //   }else{
      //     this.$toast.error(this.$t('toastMsg.email_validation'))
      //   }
      // }else{
      //   if(this.$store.getters['validateEmail'](this.userPrincipal)){
      //     this.validations = true
      //     this.existingPrincipalVerify()
      //   }else{
      //     this.$toast.error(this.$t('toastMsg.phone_validation'))
      //   }
      // }
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if(this.userPrincipal === "")
           {
              this.step2Forgot = false
               this.$toast.error(this.$t('toastMsg.emailPhone_validation'))
               return false;
           }
           else if(isNaN(this.userPrincipal)){

        if(!(this.userPrincipal.match(mailformat))){
              this.step2Forgot = false
              this.$toast.error(this.$t('toastMsg.email_validation'))
               return false;
           }else{
             this.existingPrincipalVerify()
           }
           }
           else{
             if(this.userPrincipal.length !=10)
             {
                this.step2Forgot = false
                 this.$toast.error(this.$t('toastMsg.phone_validation'))
                 return false;
            }else{
              this.existingPrincipalVerify()
            }
           }

    },
    existingPrincipalVerify() {
      this.$store.dispatch('auth/principalVerify', {
        principal: this.userPrincipal
      }).then(response => {
        if (response.data.status === 'SUCCESS') {
          if(response.data.isExist) {
            this.sendOTP()
            this.step2Forgot = false
          }else{
            this.step2Forgot = false
            this.$toast.error(this.$t('toastMsg.isExist'))
          }
        } else {

          this.$toast.error(response.data.code)
        }
      },(error) => {
        console.log(error);
        this.step2Forgot = false
      })
    },
    sendOTP: function() {
      // authToken: this.$store.state.auth.firstTokenInfo.firstToken,
      // langCode: this.$store.state.locale.selectedLocale
      if (this.userPrincipal !== '') {
        this.$store.dispatch('auth/sendForgotPasswordOTP', {
          principal: this.userPrincipal,
          taskType: "FORGOT_PASSWORD",
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
          if(response.data.status === 'SUCCESS') {
              this.validations = false
              this.showVerifyOtp = true
              this.showOtp = false
              //this.$toast.success(this.$t('toastMsg.otp_success'))
          }else {
            //this.$toast.success(response.data.code)
          }

        })
      }
    },
    toLogin() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/login`));
    },
    verifyForgotPasswordOtp() {
      this.step3Forgot = true
      if(this.enterOtp === '') {
        this.step3Forgot = false
        this.$toast.error(this.$t('register.enter_otp'))
      }else{
        this.$store.dispatch('auth/otpForgotPasswordVerification', {
          principal: this.userPrincipal,
          taskType: "FORGOT_PASSWORD",
          otp: this.enterOtp,
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
          if(response.data.status === 'SUCCESS') {
            //this.$toast.success(this.$t('toastMsg.otp_validated'))
            this.showVerifyOtp = false
            this.step3Forgot = false
            this.showPasswordField = true
          }else{
            this.step3Forgot = false
            if(response.data.message) {
              this.$toast.error(response.data.message)
            }else {
              this.$toast.error(response.data.code)
            }

          }
        })
      }
    },
    changePassword: function(event) {
      this.step4Forgot = true
      event.preventDefault()
      if (!this.fpassword || this.fpassword === '') {
        this.$toast.error(this.$t('toastMsg.passwordRequired'))
        this.step4Forgot = false
        return
      }
      // else if (this.fpassword.length < this.$store.getters['getMinPasswordLength']() || this.cpassword.length < this.$store.getters['getMinPasswordLength']()) {
      //   this.$toast.error(this.$t('toastMsg.password_minlength') +" "+this.$store.getters['getMinPasswordLength']()+" "+ this.$t('toastMsg.password_minlengthCharacter'))
      //   this.step4Forgot=false
      //   return
      // }
      else if (!this.cpassword || this.cpassword === '') {
        this.step4Forgot = false
        this.$toast.error(this.$t('toastMsg.CpasswordRequired'))
        return
      } else if (this.fpassword !== this.cpassword) {
        this.step4Forgot = false
        this.$toast.error(this.$t('toastMsg.passwordNotMatch'))
        return
      } else {
        this.$store.dispatch('auth/ForgotPassword', {
          principal: this.userPrincipal,
          newPassword: this.fpassword,
          taskType: "FORGOT_PASSWORD",
          otp: this.enterOtp,
          langCode: this.$store.state.locale.selectedLocale
        })
          .then((response) => {
            if (response.data.status === "ERROR") {
              this.step4Forgot = false
              this.$toast.error(response.data.message)
            } else {
              this.showSuccessField = true
              this.showPasswordField = false
              this.step4Forgot = false
              this.$toast.success(this.$t('toastMsg.password_change_success'))
            }
          }, (error) => {
            this.step4Forgot = false
            console.log('Password not updated');
          })
      }
    },
    validateEmail: function(email) {
      // TODO add validation here
      // var re = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
      // return re.test(email)
      return true
    },
    isValidPassword: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        if (charCode == 32) {
          evt.preventDefault()
        }
        // else {
          return true;
        // }
      },
  }
}
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.subscribeInner .regesterTxtNew {margin : 0 0 20px}
</style>
