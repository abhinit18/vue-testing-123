<template>
  <div class="registerStepsPages">
   <ul class="scubscrpSteps">
      <li v-for="tab in registrationTabs" v-bind:class="{active: (tab.index===selectedTab)}" @click="changeTab(tab.index)">
        <span class="stepNum"> {{tab.index}} </span> {{$t(tab.name)}}
      </li>
    </ul>

  <div class="registerStepsPagesInner">
  <div class="registerStepsPagesInner2">
  <div class="registerStepsPagesInner3">


<!--   <div class="cloud csmall csmallani"></div>
  <div class="cloud csbig csbigani"></div>
  <div class="cloud csmall cleft"></div>
  <div class="cloud csbig cleft cleft2"></div>
  <div class="loginimg"></div>
  <div class="loginimg2"></div>
  <div class="loginimg3"></div>
  <div class="loginimg4"></div> -->

      <!--   </slide>
      </carousel> -->



    <div class="regFormElements regForm">




      <div class="regFormBox">
        <div class="regFormBoxInner">
          <div v-if="selectedTab === 1">

               <div class="loginimgShadow"></div>

      <div class="loginimg7"></div>
      <div class="loginimg8"></div>


            <!-- Email And Phone -->
            <!-- <h2>{{$t('register.email_phone')}}</h2> -->
            <!-- <div class="selectedPlan">
              <p>{{getSelectedPlan.duration}}
                <span v-if="getSelectedPlan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'D'">{{$t('register.days')}}</span> - {{arrivedRole}} {{$t('register.plan')}}</p>
               <h4>{{getSelectedPlan.cost}} {{getSelectedPlan.currency}}</h4> -->
            <!--</div> -->

            <div class="text" v-if="tab2View===1">
              <!-- <p>{{$t('register.emailVerifyText')}}</p> -->
            </div>
            <div class="inputRow" v-if="tab2View===1">
              <label>{{$t('register.email')}}  <span class="req"></span></label>
              <div class="formControlOuter">
                <span class="verifiedIco" v-if="emailValid"></span>
                <input type="email" placeholder="example@email.com" @change="verifyPrincipal('email')" v-model="emailId" class="formControl">
              </div>
            </div>
            <div class="inputRow" v-if="tab2View===1">
              <label>{{$t('register.phone')}}  <span class="req">*</span></label>

              <div class="contrySelect">
                <span class="verifiedIco" v-if="phoneValid"></span>
                <div class="selectCtry">
                  <select v-model="selectedCountryCodeIndex" disabled>
                      <option v-for="(countryCode,index) in $store.state.register.countryList" :value="countryCode.countryId">{{countryCode.code}}</option>
                  </select>
                </div>
                <div class="contryCode" style="left:85px;">{{getCountryCode}}</div>
                <input type="text" :placeholder="$t('register.enter_phone_no')" @keypress="isNumber" @input="verifyPrincipal('phone')" v-model="phone" maxlength="10" class="formControl">
              </div>
            </div>
            <p v-if="tab2View===2" class="otpSentTxt">{{emailOrPhone}}</p>
            <div class="optInput">
              <button class="btn btn-primary btn-block" :disabled="!phoneValid" @click="sendOtpToMobileNumer" v-if="tab2View===1">{{$t('register.submit')}}</button>
              <div class="inputRow" v-if="tab2View===2">
                <label>{{$t('register.enter_otp')}}   <span class="req">*</span></label>
                <div class="formControlOuter">
                  <input type="text" @keypress="isNumber" maxlength="4" v-model="otpInput" placeholder="xxxx" class="formControl">
                </div>
                <br>
                <div class="formControlOuter clearfix">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                    <a class="btn btn-link" @click="sendOtpToMobileNumer">{{$t('register.resend_otp')}}</a>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                    <customloader loaderClass="btn btn-primary btn-block" :loaderClick="verifyOtpForMobileNumer" :loaderDisabled="step3userBulkregister" loaderText="register.verify_otp"></customloader>
                    <!-- <button class="btn btn-primary btn-block" @click="verifyOtpForMobileNumer">{{$t('register.verify_otp')}}</button> -->
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div  v-if="selectedTab===2">


      <div class="loginimg9"></div>
      <div class="loginimg10"></div>
      <div class="loginimg11"></div>
      <div class="loginimg12"></div>
      <div class="loginimg13"></div>
      <div class="loginimg14"></div>

            <!-- Registration -->
            <!-- <h2>{{$t('register.registration')}}</h2> -->
            <div class="registerFormBox">
            <!-- <div class="selectedPlan">
              <p>{{getSelectedPlan.duration}}
                <span v-if="getSelectedPlan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'D'">{{$t('register.days')}}</span> - {{arrivedRole}} {{$t('register.plan')}}</p>
               <h4>{{getSelectedPlan.cost}} {{getSelectedPlan.currency}}</h4> -->
          <!--  </div> -->

            <div class="inputRow">
              <label v-if="arrivedRole === 'STUDENT'">{{$t('register.sFirst_name')}}  <span class="req">*</span></label>
              <label v-if="arrivedRole !== 'STUDENT'">{{$t('register.first_name')}}  <span class="req">*</span></label>
              <input type="text" placeholder="" v-model="firstName" class="formControl">
            </div>
            <div class="inputRow">
              <label v-if="arrivedRole === 'STUDENT'">{{$t('register.sLast_name')}}  <span class="req">*</span></label>
              <label v-if="arrivedRole !== 'STUDENT'">{{$t('register.last_name')}}  <span class="req">*</span></label>
              <input type="text" placeholder="" v-model="lastName" class="formControl">
            </div>
            <div class="inputRow">
              <label class="finline">{{$t('register.gender')}}  <span class="req">*</span></label>
              <div class="radioCustom"><label>
                       <input type="radio" name="sex" v-model="gender" value="Male"><span></span> {{$t('register.male')}} </label></div>
              <div class="radioCustom"><label>
                       <input type="radio" name="sex" v-model="gender" value="Female"><span></span> {{$t('register.female')}} </label></div>
              <div class="radioCustom"><label>
                       <input type="radio" name="sex" v-model="gender" value="Others"><span></span> {{$t('register.others')}} </label></div>
            </div>
            <div class="inputRow">
              <label>{{$t('register.dob')}}<span class="req">*</span></label>
              <div class="">
                <Datepicker v-model="dob" :disabled="disabled" class="custSelect customDate formControl"></Datepicker>
              </div>
            </div>

            <div v-if="isParent">
              <div class="inputRow">
                <label> {{$t('register.pfirst_name')}} <span class="req">*</span></label>
                <input type="text" placeholder="" v-model="parentsFirstName" class="formControl">
              </div>
              <div class="inputRow">
                <label> {{$t('register.plast_name')}} <span class="req">*</span></label>
                <input type="text" placeholder="" v-model="parentsLastName" class="formControl">
              </div>
              <div class="inputRow">
                <label>{{$t('register.pRelation')}} <span class="req">*</span></label>
                <div class="select">
                  <!-- <span class="icons select__arrow"></span> -->
                  <select v-model="selectedRelation">
                              <option v-for="relate in relation" :value="relate">{{relate}}</option>
                    </select>
                </div>

              </div>
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
                <select v-model="selectedCity">
                              <option v-for="city in $store.state.register.cityList" :value="city.cityId">{{city.name}}</option>
                    </select>
              </div>
            </div>
            <!-- <div class="inputRow">
              <label>{{$t('register.school_name')}} <span class="req">*</span></label>
              <div class="select"> -->
                <!-- <span class="icons select__arrow"></span> -->
                <!-- <input class="formControl" @keyup="usersTagInput" maxlength="50" @blur="onBlurTaggedChipsShow" disabled v-model="schoolFilter">
                <ul class="filterListOpt" v-if="schoolFilter && schoolListoff">
                 <li v-for="listedSchool in filterInputSearchSchoolData" @click="selectedUserSchool(listedSchool)">
                   {{listedSchool.name}}
                 </li>
                </ul> -->
                <!-- <select v-model="selectedSchool" disabled>
                              <option v-for="school in $store.state.register.schoolList" :value="school.schoolId">{{school.name}}</option>
                    </select> -->
              <!-- </div>

            </div> -->
            <div class="inputRow">
              <label>{{$t('register.grade')}} <span class="req">*</span></label>
              <div class="select" v-if="arrivedRole === 'STUDENT' || arrivedRole === 'PARENT'">
                <!-- <span class="icons select__arrow"></span> -->
                <select v-model="selectedGrade">
                              <option v-for="grade in $store.state.register.grades" :value="grade.gradeId">{{grade.name}}</option>
                    </select>
              </div>
            </div>
            <div class="inputGrades" v-if="arrivedRole === 'TEACHER'">
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
            </div>
            <div class="inputRow">
              <label>{{$t('register.set_password')}} <span class="req">*</span></label>
              <div class="passInput">
                <input type="password" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="!showPassword" class="formControl formLetterSpace">
                <input type="text" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="showPassword" class="formControl formLetterSpace">
                <!-- <span class="viewPass" @click="showPassword = !showPassword">
                          <i class="material-icons" v-show="!showPassword">remove_red_eye</i>
                          <i class="material-icons" v-show="showPassword">visibility_off</i>
                  </span> -->
              </div>
            </div>
            <div class="inputRow">
              <label>{{$t('register.repeat_password')}} <span class="req">*</span></label>
              <div class="passInput">
                <input type="password" @change="matchPassword" v-model="Cpassword" v-show="!showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
                <input type="text" @change="matchPassword" v-model="Cpassword" v-show="showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
                <span class="viewPass" @click="showCPassword = !showCPassword">
                          <i class="material-icons" v-show="!showCPassword">remove_red_eye</i>
                          <i class="material-icons" v-show="showCPassword">visibility_off</i>
                  </span>
              </div>
            </div>
            <div class="inputRow">
              <label class="control control--checkbox terms">
                        {{$t('register.i_agree')}} <a>{{$t('register.terms_conditions')}}</a>
                        <input :checked="termsNCondition" type="checkbox" @change="openTermsPopup">
                        <div class="control__indicator"></div>
                     </label>
            </div>
            <div class="btns clearfix">
              <!-- <button class="btn btn-border pull-left" @click="clickBack">{{$t('register.back')}}</button> -->
              <!-- <button class="btn btn-primary pull-right" @click="submitUser">{{$t('register.next')}}</button> -->
              <customloader loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="register.next"></customloader></div>
            </div>
          </div>
        </div>
        </div>
        <div class="footer">
          <footer><span v-html="$t('common.footer')"></span></footer>
         </div>
      </div>






      <tnc-popup :agreeTerms="agreeTerms" v-if="showTerms"/>


    </div>
  </div>
</div>
  </div>
</div>
</template>

<script>
  import tncPopup from '~/components/tncPopup'
  import {
    Carousel,
    Slide
  } from 'vue-carousel'
  export default {
    head () {
      return {
        title: this.$t('index.register')
      }
    },
    components: {
      Carousel,
      Slide,
      tncPopup
    },
    data() {
      return {
        startCarouselLoading: false,
        selectedTab: 1,
        tab2View: 1,
        promoWithPrincipalValid: false,
        emailValid: false,
        phoneValid: false,
        showTerms: false,
        dummyTerms: false,
        showCPassword: false,
        showPassword: false,
        registrationTabs: [
          {
            index: 1,
            name: 'register.phone_email'
          },
          {
            index: 2,
            name: 'register.registration'
          }
        ],
        relation: ['FATHER', 'MOTHER', 'GUARDIAN'],


        subscriptionPlans: [],
        selectedSubscriptionId: '',
        arrivedPromo: '',
        arrivedRole: '',
        isParent: false,

        appliedReferral: false,
        enteredReferralcode: '',
        emailId: '',
        inviteId: '',
        organizationId: '',
        organizationType: '',
        phone: '',
        selectedCountryCodeIndex: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        parentsFirstName: '',
        parentsLastName: '',
        registrationOwner: '',
        registrationType: '',
        otpInput: '',
        password: '',
        Cpassword: '',
        selectedCity: '',
        selectedCountry: '',
        selectedSchool: '',
        selectedRelation: '',
        schoolFilter: '',
        selectedGrade: '',
        saveUserGrades: [],
        termsNCondition: false,
        saveButtonLoading: false,
        step3userBulkregister: false,
        schoolListoff: false,
        swiperOption: {
         slidesPerView: 3,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
       },

        disabled: {
          customPredictor: function(date) {
            // disables the date if it is a multiple of 5
            let dateBlock = new Date();
            if (date > dateBlock) {
              return true
            }
          }
        },
        emailOrPhone: ''
      }
    },
    layout: 'login',
    mounted() {
      this.goTo(1)
      let webHostname = window.location.hostname
      let webUrl = webHostname.split('.').reverse()
      let webDomain = webUrl[0]
      this.startCarouselLoading = true
      this.$store.dispatch('register/fetchCities', {
        langCode: this.$store.state.locale.selectedLocale
      })

      this.$store.dispatch('register/fetchGrades', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchCountries', {
        langCode: this.$store.state.locale.selectedLocale
      }).then(resp => {
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
      // Get user type and promo code
      let currentRoute = window.location.href
      let currentRouteSplit = currentRoute.split('&')
      // console.log(currentRouteSplit);
      let newParams = []
      for(let i=0;i<currentRouteSplit.length;i++) {
        let splitParam = currentRouteSplit[i].split('=')
        newParams.push(splitParam[1])
      }


      let selectedUser = newParams[0]
      let promoCode = ''
      let subscriptionId = newParams[1]
      let inviteId = newParams[2]
      let userFirstName = newParams[3]
      let userLastName = newParams[4]
      let organizationId = newParams[5]
      this.organizationId = organizationId
      let organizationType = newParams[6]
      this.selectedSchool = newParams[5]
      this.arrivedPromo = promoCode
      this.arrivedRole = selectedUser
      this.firstName = userFirstName
      this.lastName = userLastName
      this.inviteId = inviteId
      this.getSelectedPlan.subscriptionId = subscriptionId
      // this.$store.dispatch('register/fetchSchools', {
      //   langCode: this.$store.state.locale.selectedLocale,
      //   city:'27',
      //   country: 'e9e517cd-1f20-4a03-9e96-33dae14cc22d'
      // }).then(response => {
      //   this.schoolFilter = response.data.schools.filter(resp =>{
      //     return this.organizationId == resp.schoolId
      //   })[0].name

      // })

      if (this.arrivedRole === 'PARENT') {
        this.isParent = true;
        this.registrationOwner = 'PARENT'
        this.registrationType = 'STUDENT'
      } else if (this.arrivedRole === 'STUDENT') {
        this.registrationOwner = 'SELF'
        this.registrationType = 'STUDENT'
        this.isParent = false
      } else {
        this.registrationOwner = 'SELF'
        this.registrationType = 'TEACHER'
        this.isParent = false
      }
    },
    filters: {
      floatDecimal: function (value){
          return parseFloat(value).toFixed(2);
      }
    },
    methods: {
      checkForRefferalCode () {
        if (this.selectedTab === 3) {
          if (this.$route.query.referralCode && !this.appliedReferral) {
            this.changeReferralCode ({myvalue: this.$route.query.referralCode})
          }
        }
      },
      changeTab(tabIndex) {
        //validations for different tabs

        //if tab is less than the selected tab, then no need to validate
        if (tabIndex < this.selectedTab) {
          this.selectedTab = tabIndex
        }
      },
      goTo(tabIndex) {
        this.selectedTab = tabIndex
      },
      gradeChange(value) {
        if (this.saveUserGrades.indexOf(value) === -1) {
          this.saveUserGrades.push(value)
        } else {
          this.saveUserGrades.splice(this.saveUserGrades.indexOf(value), 1)
        }
      },
      sendOtpToMobileNumer() {
        // else if (!this.getCountryCode) {
        //   this.$toast.error(this.$t('toastMsg.countrycode_validation'))
        // }
        if (!this.phoneValid) {
          this.$toast.error(this.$t('toastMsg.phone_validation'))
        } else if (!this.emailValid && this.emailId!=='') {
          this.$toast.error(this.$t('toastMsg.email_validation'))
        }  else {
          this.$store.dispatch('auth/phoneVerify', {
            principal: this.phone,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_success'))
              if (this.tab2View === 1) {
                this.tab2View = 2
                this.emailOrPhone = this.phone?this.$t('index.otp_sent_phone'):this.$t('index.otp_sent_mail')
              }
            } else {
              this.$toast.error(this.$t('toastMsg.otp_fail'))
            }
          })
        }
      },
      verifyPrincipal(value) {
        let principal = ''
        let validations = false
        if (value === 'email') {
          principal = this.emailId
          validations = this.$store.getters['validateEmail'](principal)
          if (!validations) {
            this.$toast.error(this.$t('toastMsg.email_validation'))
            this.emailValid = false
          }
        } else {
          principal = this.phone
          if (principal.length!==10) {
            this.phoneValid = false
          } else {
             validations = this.$store.getters['validatePhone'](principal)
            if (!validations) {
              this.$toast.error(this.$t('toastMsg.phone_validation'))
              this.phoneValid = false
            }
          }
        }
        if (validations) {
          this.$store.dispatch('auth/principalVerify', {
            principal: principal
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              if (response.data.isExist === false) {
                if (value === 'email') {
                  this.emailValid = true
                }
                if (value === 'phone') {
                  this.phoneValid = true
                }
                if (this.emailValid && this.phoneValid && this.arrivedPromo !== '') {
                  this.validatePromoWithPrincipal()
                }
              } else {
                if (value === 'email') {
                  this.$toast.error(this.$t('toastMsg.email_preexists'))
                  this.emailValid = false
                } else {
                  this.$toast.error(this.$t('toastMsg.phone_preexists'))
                  this.phoneValid = false
                }
              }
            } else {
              this.allowUsertoSendOtp = true;
              this.$toast.error('Something went wrong')
            }
          })
        }
      },
      matchPassword () {
        if(this.password!=='' && this.Cpassword!=='' && this.password!==this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
        }
      },
      validatePromoWithPrincipal() {
        this.$store.dispatch('auth/getPromoCodeValidation', {
          promocode: this.arrivedPromo,
          email: this.emailId,
          phone: this.phone
        }).then(resp => {
          if (resp.data.status === 'SUCCESS') {
            this.promoWithPrincipalValid = true
          } else {
            this.$toast.error(resp.data.code);
            this.promoWithPrincipalValid = false
          }
        })
      },
      usersTagInput() {
        this.selectedSchool = ''
        this.schoolListoff = true
      },
      onBlurTaggedChipsShow() {

        // this.$store.dispatch('register/fetchSchools', {langCode: this.$store.state.locale.selectedLocale}).then(response => {
          // let taggedDataList = this.$store.state.note.userTagList.tags;
          // if(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1){
          //   this.selectedSchool = this.schoolFilter;
          // }
      },
      selectedUserSchool(data) {
        // this.schoolListoff = false
        // this.selectedSchool = data
        // this.schoolFilter = data.name
      },
      submitUser() {
        let payloadData = {}
        if (this.validateForm()) {
          //Now set the form
          this.saveButtonLoading = true
          if (this.arrivedRole !== 'TEACHER') {
            payloadData['grade'] = [this.selectedGrade]
          } else {
            payloadData['grade'] = this.saveUserGrades
          }
          if(this.organizationId) {
            payloadData['school'] = this.organizationId
          }else{
            payloadData['school'] = this.selectedSchool
          }
          payloadData['dob'] = this.dob.getFullYear().toString() + "-" + (this.dob.getMonth() + 1).toString() + "-" + this.dob.getDate().toString();
          payloadData['firstName'] = this.firstName
          payloadData['lastName'] = this.lastName
          payloadData['password'] = this.password
          payloadData['country'] = this.selectedCountry
          payloadData['city'] = this.selectedCity
          payloadData['subscriptionId'] = this.getSelectedPlan.subscriptionId
          payloadData['promoId'] = this.arrivedPromo
          payloadData['language'] = this.$store.state.locale.selectedLocale
          payloadData['registrationType'] = this.registrationType
          payloadData['registrationOwner'] = this.registrationOwner

          payloadData['gender'] = this.gender
          payloadData['phone'] = this.phone
          payloadData['email'] = this.emailId
          payloadData['inviteId'] = this.inviteId
          if (this.appliedReferral) {
            payloadData['referralCode'] = this.enteredReferralcode
          }
          if (this.arrivedRole === 'PARENT') {
            payloadData['parentsFirstName'] = this.parentsFirstName
            payloadData['parentsLastName'] = this.parentsLastName
            payloadData['relation'] = this.selectedRelation
          }
          //call the service
          this.$store.dispatch('auth/userSignUp', {
            payloadData,
            langCode: this.$store.state.locale.selectedLocale
          }).then(responseData => {
            if (responseData.data.status === 'ERROR') {
              if(responseData.data.message) {
              this.$toast.error(responseData.data.message);
              }else {
              this.$toast.error(responseData.data.code);
              }
              this.saveButtonLoading = false
            } else {
              let dataObj = {}
              dataObj.context = this
              dataObj.bulkLoginAction = true
              dataObj.btnActionName = 'payment'
              let dataParam =  dataObj
              // if(responseData.data.paymentRequired) {
              //   if(this.arrivedPromo) {
              //   this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding/payment/${this.getSelectedPlan.subscriptionId}-${this.getSelectedPlan.cost}-${this.getSelectedPlan.currency}-${this.arrivedPromo}`))
              //   }else {
              //     this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/${this.getSelectedPlan.subscriptionId}-${this.getSelectedPlan.cost}-${this.getSelectedPlan.currency}-`))
              //   }
              //
              // }else{
                this.$root.$emit('showActivationActionPopup', {dataParam})
              // }
              // this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`))
              // this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`));

              // this.dummyPaymentRequest(responseData.data.userId)
            }
            this.saveButtonLoading = false
          },(error) => {
            this.saveButtonLoading = false
          })
        }
      },
      validateForm() {
        let validate = true
        if (!this.termsNCondition) {
          this.$toast.error(this.$t('toastMsg.termsNConditionNotAgreed'))
          return false
        } else if ((this.firstName === '') || (this.firstName === undefined)) {
          this.$toast.error(this.$t('toastMsg.first_name_required'))
          return false
        } else if (this.firstName.trim().length<2 ) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.first_name'))
          return false
        } else if ((this.lastName === '') || (this.lastName === undefined)) {
          this.$toast.error(this.$t('toastMsg.last_name_required'))
          return false
        } else if (this.lastName.trim().length<2 ) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.last_name'))
          return false
        } else if ((this.gender === '') || (this.gender === undefined)) {
          this.$toast.error(this.$t('toastMsg.gender_required'))
          return false
        } else if ((this.dob === '') || (this.dob === undefined)) {
          this.$toast.error(this.$t('toastMsg.dob_required'))
          return false
        } else if (this.arrivedRole === 'TEACHER' && this.$store.getters['getAge'](this.dob)>100) {
          this.$toast.error(this.$t('toastMsg.dob_check_teacher'))
          return false
        } else if (this.arrivedRole !== 'TEACHER' && this.$store.getters['getAge'](this.dob)<5) {
          this.$toast.error(this.$t('toastMsg.dob_check_student'))
          return false
        // } else if (this.arrivedRole==='PARENT' && ((this.parentsFirstName === '') || (this.parentsFirstName === undefined))) {
        //   this.$toast.error(this.$t('toastMsg.parentFirstName_required'))
        //   return false
        // } else if (this.showParentFields() && (this.parentsFirstName.trim().length<2)) {
        //   this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('toastMsg.pfirst_name'))
        //   return false
        // } else if (this.arrivedRole==='PARENT' && ((this.parentsLastName === '') || (this.parentsLastName === undefined))) {
        //   this.$toast.error(this.$t('toastMsg.parentLastName_required'))
        //   return false
        // } else if (this.showParentFields() && (this.parentsLastName.trim().length<2)) {
        //   this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('toastMsg.plast_name'))
        //   return false
        // } else if (this.arrivedRole==='PARENT' && ((this.selectedRelation === '') || (this.selectedRelation === undefined))) {
        //   this.$toast.error(this.$t('toastMsg.parentRelation_required'))
        //   return false
        } else if ((this.selectedCountry === '') || (this.selectedCountry === undefined)) {
          this.$toast.error(this.$t('toastMsg.country_required'))
          return false
        } else if ((this.selectedCity === '') || (this.selectedCity === undefined)) {
          this.$toast.error(this.$t('toastMsg.city_required'))
          return false
        }
        /*else if ((this.selectedSchool === '') || (this.selectedSchool === undefined)) {
          this.$toast.error(this.$t('toastMsg.school_required'))
          return false
        }*/
         else if (this.arrivedRole !== 'TEACHER' && ((this.selectedGrade === '') || (this.selectedGrade === undefined))) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false
        } else if (this.arrivedRole === 'TEACHER' && (this.saveUserGrades.length === 0)) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false
        } else if ((this.password === '') || (this.password === undefined)) {
          this.$toast.error(this.$t('toastMsg.password_required'))
          return false
        } else if (this.password !== this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
          return false
        } else {
          return true
        }
      },
      verifyOtpForMobileNumer() {
        this.step3userBulkregister = true
        if ((this.otpInput === '') || (this.otpInput === undefined)) {
          this.$toast.error(this.$t('toastMsg.otp_validation'))
          this.step3userBulkregister = false
        } else {
          this.$store.dispatch('auth/otpVerify', {
            principal: this.phone,
            otp: this.otpInput,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_validated'))
              this.selectedTab = 2
              this.checkForRefferalCode()
              this.tab2View = 1
            } else {
              this.$toast.error(this.$t(toastMsg.otp_invalid))
            }
            this.step3userBulkregister = false
          }, error => {
            this.step3userBulkregister = false
          })
        }
      },
      // selectedDate() {
      //   let difference = Math.floor((new Date().getTime() - new Date(this.dob).getTime()) / 31557600000);
      //   if (difference < 13) {
      //     this.showParentsId = true;
      //   } else {
      //     this.showParentsId = false;
      //   }
      // },
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
        } else {
          return true;
        }
      },
      openTermsPopup() {
        if (this.termsNCondition) {
          this.termsNCondition = false
        } else {
          this.showTerms = true
        }
      },
      agreeTerms() {
        this.termsNCondition = true
        this.showTerms = false
      },
      changeReferralCode(event) {
        this.enteredReferralcode = event.myvalue? event.myvalue: event.target.value
        this.appliedReferral = false


        this.$store.dispatch('auth/validateReferralCode', {
            referralCode: this.enteredReferralcode
          }).then(response => {
            if (response.data.status === 'ERROR') {
              this.$toast.error(response.data.code)
              this.appliedReferral = false
            } else if (response.data.status === 'SUCCESS') {
              if (response.data.isValid) {
                this.appliedReferral = true
              } else {
                this.$toast.error(this.$t('toastMsg.referralCodeInvalid'))
                this.appliedReferral = false
              }
            }
          })

        // else {
        //   this.$toast.error(this.$t('toastMsg.referralcodeRequired'))
        // }
      }
    },
    computed: {
      getSelectedPlan() {
        if (this.subscriptionPlans.length > 0) {
          return this.subscriptionPlans.filter((plan) => (this.selectedSubscriptionId === plan.subscriptionId))[0]
        } else {
          return {}
        }
      },
      filterInputSearchSchoolData() {
        return this.$store.state.register.schoolList.filter(school => {
          return school.name.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) !== -1
      })
    },
    getCountryCode() {
      let listedCountryResult = this.$store.state.register.countryList.filter(countryResult =>{
        return countryResult.countryId === this.selectedCountry
      })
      return listedCountryResult.length !== 0? listedCountryResult[0].dialCode : {}
      }
    }
  }
</script>

<style>
  .rotateArrow {
    transform: rotate(180deg);
  }

  .customDate input {
    border-color: transparent;
  }

  .planSelect {
    z-index: -1;
  }

  .radio {
    margin: 0px;
  }

  .radio input {
    visibility: hidden;
  }

  .pos-rel-btn {
    position: relative;
    float: left;
    width: 100%;
  }

  .padding0 {
    padding: 0px;
  }

  .termsScroll {
    height: 220px;
    overflow-y: auto; padding:0 30px 0 0
  }
</style>
