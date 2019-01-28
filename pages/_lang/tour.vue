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
              <div class=" loginPageOuter">


              <div class="subjectsRow clearfix">

                <div class="subscribe_sec loginPage">
                    <div class="subscribeInner">
                      <!-- <a href="#" class="logo"> Brand Logo 1</a>
                      <h2 class="brandName">Brand Name</h2> -->

                      <h2 class="welcomeLoginTxt">{{$t('login.welcome_message')}}</h2>
                      <p class="regesterTxt"><!-- {{$t('register.sign_learning')}} -->
                      {{$t('login.welcome_message_description')}}

                      </p>

                      <div class="regFormElements tourForm">
                        <div class="registerFormBox">
                            <div class="inputRow">
                            <label >{{$t('register.full_name')}}  <span class="req">*</span></label>
                            <input type="text" placeholder="" v-model="fullName" class="formControl">
                            </div>
                            <div class="inputRow">
                            <label>{{$t('register.email_address')}}  </label>
                            <input type="email" placeholder="" @blur="validateEmail" v-model="email" class="formControl">
                            </div>
                            <div class="inputRow">
                            <label>{{$t('register.phone')}}  </label>
                            <input type="text" placeholder="" @keypress="isNumber" maxlength="10" v-model="phone" class="formControl">
                            </div>
                            <div class="inputRow">
                            <label>{{$t('register.country')}} <span class="req">*</span></label>
                            <div class="select">
                                <!-- <span class="icons select__arrow"></span> -->
                                <select v-model="selectedCountry" disabled>
                                    <option v-for="country in $store.state.register.countryList" :value="country.countryId">{{country.name}}</option>
                                </select>
                            </div>
                            </div>
                            <div class="inputRow">
                            <label>{{$t('register.city')}} <span class="req">*</span></label>
                            <div class="select">
                                <!-- <span class="icons select__arrow"></span> -->
                                <select v-model="selectedCity" >
                                    <option v-for="city in $store.state.register.cityList"  :value="city.cityId">{{city.name}}</option>
                                </select>
                            </div>
                            </div>
                            <div class="inputRow">
                            <label>{{$t('register.role')}} <span class="req">*</span></label>
                            <div class="select">
                                <!-- <span class="icons select__arrow"></span> -->
                                <select v-model="selectedRole">
                                    <option v-for="role in $store.state.register.roles"  :value="role">{{role}}</option>
                                </select>
                            </div>
                            </div>
                            <div class="inputRow">
                            <!-- <label v-if="selectedRole === 'STUDENT' || selectedRole === 'TEACHER'">{{$t('register.grade')}} <span class="req">*</span></label> -->
                            <label v-if="selectedRole === 'STUDENT'">{{$t('register.grade')}} <span class="req">*</span></label>
                            <div class="select" v-if="selectedRole === 'STUDENT'">
                                <!-- <span class="icons select__arrow"></span> -->
                                <select v-model="selectedGrade">
                                <option v-for="grade in $store.state.register.grades" :value="grade.gradeId">{{grade.name}}</option>
                                </select>
                            </div>
                            </div>
                            <!-- <div class="inputGrades" v-if="selectedRole === 'TEACHER'">
                            <ul class="gradeChecks">
                                <li v-for="grade in this.$store.state.register.grades">
                                <label>
                                <input type="checkbox" :checked="saveUserGrades.indexOf(grade.gradeId)!==-1"
                                    @change="gradeChange(grade.gradeId)"
                                    :value="grade.gradeId">
                                <span>{{grade.name}}</span>
                                </label>
                                </li>
                            </ul>
                            </div> -->
                            <div class="btns clearfix">
                            <!-- <button class="btn btn-border pull-left" @click="clickBack">{{$t('register.back')}}</button> -->
                            <div class="btns clearfix">
                                <customloader loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="parentLog.tour"></customloader>
                            </div>
                            <!-- <button class="btn btn-primary pull-right" @click="submitUser">{{$t('register.next')}}</button> -->
                            </div>
                        </div>
                      </div>
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
      title: this.$t('marketing.tour'),
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
      error: "",
      showPassword: false,
      showCPassword: false,
      rememberMe: false,
      acceptTerms: false,
      emailValid: false,
      firstLogin: false,
      termsNCondition: false,
      phone: '',
      selectedCountryCodeIndex: '',
      selectedCountry: '',
      selectedCity: '',
      fullName: '',
      email: '',
      saveButtonLoading: false,
      selectedRole: 'STUDENT',
      selectedGrade: '',
      showTerms: false,
      saveUserGrades: [],
      error: '',
      dataObj: {},
      showPassword: false
    };
  },
  mounted() {
    this.checkPhone();
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

      let webHostname = window.location.hostname
      let webUrl = webHostname.split('.').reverse()
      let webDomain = webUrl[0]
      this.$store.dispatch('register/fetchCities', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchGrades', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchCountries', {
        langCode: this.$store.state.locale.selectedLocale
      }).then(resp =>{
        let filteredResult = resp.data.countries.filter(result=>{
          return result.code === webDomain.toUpperCase()
        })
        if (filteredResult.length!==0) {
          this.selectedCountryCodeIndex = filteredResult[0].countryId
        } else {
          this.selectedCountryCodeIndex = resp.data.countries.filter(result=>{
            return result.code === 'KZ'
          })[0].countryId
        }
        this.selectedCountry = this.selectedCountryCodeIndex
      })
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
    validateForm() {
        let validate = true
        // debugger
         if ((this.fullName === '') || (this.fullName === undefined)) {
          this.$toast.error(this.$t('toastMsg.full_name_required'))
          return false
        } else if (this.fullName.trim().length<2 ) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.first_name'))
          return false
        } else if (((this.email === '') || (this.email === undefined)) && ((this.phone === '') || (this.phone === undefined))) {
          this.$toast.error(this.$t('forgot.principalRequired'))
          return false
        }
        else if(!this.emailValid && this.email){
          this.$toast.error(this.$t('toastMsg.email_validation'))
          return false
        }
        /*else if ((this.phone === '') || (this.phone === undefined)) {
          this.$toast.error(this.$t('toastMsg.phone_required'))
          return false
        }*/
        else if (this.phone && (this.phone.length < 10)) {
          this.$toast.error(this.$t('toastMsg.phone_validation'))
          return false
        }else if ((this.selectedCountry === '') || (this.selectedCountry === undefined)) {
          this.$toast.error(this.$t('toastMsg.country_required'))
          return false
        } else if ((this.selectedCity === '') || (this.selectedCity === undefined)) {
          this.$toast.error(this.$t('toastMsg.city_required'))
          return false
        }
         else if (this.selectedRole !== 'TEACHER' && this.selectedRole !== 'PARENT' && ((this.selectedGrade === '') || (this.selectedGrade === undefined))) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false
        /*} else if (this.selectedRole === 'TEACHER' && (this.saveUserGrades.length === 0)) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false*/
        } else {
          return true
        }
      },
    submitUser() {

        let payloadData = {}

        if (this.validateForm()) {
          //Now set the form
          this.saveButtonLoading = true
          if (this.selectedRole !== 'TEACHER') {
            payloadData['grade'] = [this.selectedGrade]
          } else {
            payloadData['grade'] = this.saveUserGrades
          }
          // else {
            // payloadData['school'] = this.selectedSchool
            // this.$toast.error(this.$t('toastMsg.dropDownSchoolName'))
          // }

          payloadData['fullName'] = this.fullName
          payloadData['country'] = this.selectedCountry
          payloadData['city'] = this.selectedCity
          payloadData['language'] = this.$store.state.locale.selectedLocale
          payloadData['role'] = this.selectedRole
          payloadData['phone'] = this.phone
          payloadData['email'] = this.email


          //call the service
          this.$store.dispatch('auth/userTour', {
            payloadData,
            langCode: this.$store.state.locale.selectedLocale
          }).then(responseData => {
            if (responseData.data.status === 'ERROR') {
              if(responseData.data.message) {
              this.$toast.error(responseData.data.message);
              }else {
              this.$toast.error(responseData.data.code);
              }
            } else {
                if(responseData.data.status) {
                  window.localStorage.setItem('isItTour',true);
                let dataValue = ""+this.$store.state.locale.selectedLocale+"/?tour="+true+"&"+'lang='+this.$store.state.locale.selectedLocale+'&'+responseData.data.loginId+"&"+responseData.data.password;
                //  var win = window.open(responseData.data.webview+"?"+dataValue, '_blank');
                //   win.focus();
                (function(){
                  // window.open('http://localhost:4000/'+dataValue);
                  window.location  = responseData.data.webview+dataValue;
                  return false
                })()
                }
            //   let dataObj = {}
            //   dataObj.context = this
            //   dataObj.btnActionName = 'payment'
            //   let dataParam = dataObj
            //   let tempUserId = responseData.data.userId
            //   if (responseData.data.paymentRequired) {
            //     if (this.arrivedPromo) {
            //       if(this.byParent === 'byParent') {
            //         this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}`))
            //       }else{
            //         this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}`))
            //       }
            //     } else {
            //       if(this.byParent === 'byParent') {
            //         this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=`))
            //       }else{
            //         this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=`))
            //       }

            //     }
            //   }
              // refetch initial Data
              // this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`));

              // this.dummyPaymentRequest(responseData.data.userId)
            }
            this.saveButtonLoading = false
          }, error => {
            this.saveButtonLoading = false
          })
        }

      },
    agreeTerms() {
        this.termsNCondition = true
        this.showTerms = false
      },
    openTermsPopup() {
        if (this.termsNCondition) {
          this.termsNCondition = false
        } else {
          this.showTerms = true
        }
      },
    gradeChange(value) {
        if (this.saveUserGrades.indexOf(value) === -1) {
          this.saveUserGrades.push(value)
        } else {
          this.saveUserGrades.splice(this.saveUserGrades.indexOf(value), 1)
        }
      },
      matchPassword() {
        if (this.password !== '' && this.Cpassword !== '' && this.password !== this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
        }
      },
      /*isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
        } else {
          return true;
        }
      },*/
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
          evt.preventDefault()
        }
        // else {
          return true;
        // }
      },
      validateEmail: function(email) {
        this.emailValid = this.$store.getters['validateEmail'](this.email)
      }
  },
  computed:{
     getCountryCode() {
        let listedCountryResult = this.$store.state.register.countryList.filter(countryResult =>{
          return countryResult.countryId === this.selectedCountry
        })
        return listedCountryResult.length !== 0? listedCountryResult[0].dialCode : {}
      },
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
