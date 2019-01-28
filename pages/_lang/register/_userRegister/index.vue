<template>
  <div>
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


    <div class="cardSec plansOuterContainer subsrbPlanOuter clearfix" v-if="selectedTab===1">
      <!-- <div class="cloud csmall csmallani"></div>
      <div class="cloud csbig csbigani"></div>
      <div class="cloud csmall cleft"></div>
      <div class="cloud csbig cleft cleft2"></div> -->


<div class="geometryBgLeft"></div>
         <div class="geometryBgRight"></div>

      <div class="loginimg5"></div>
      <div class="loginimg6"></div>




      <!-- <carousel :navigationEnabled=true :paginationEnabled=false :scrollPerPage=true :perPage=3 v-if="startCarouselLoading">
        <slide v-for="(plan, index) in subscriptionPlans" :key="plan.subscriptionId"> -->
<div class="mainPlansListingOuterMain">
<div class="mainPlansListing">


<div v-if="subscriptionPlans.length>=4">


   <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">


          <div class="swiper-slide" :class="{active: plan.subscriptionId===getSelectedPlan.subscriptionId}" v-for="(plan, index) in subscriptionPlans" :key="plan.subscriptionId">
          <div class="subsrbPlan plan_1" v-bind:class="{plan_1: plan.durationTypeString === 'M', plan_2: plan.durationTypeString === 'W', plan_3: plan.durationTypeString === 'D'}" @click="changePlan(plan.subscriptionId)">
            <div class="planHead">
              <div class="mostPopularSec">{{plan.name}} </div>
              <h3 class="planDays">{{plan.duration}}
                <span class="daysTxt" v-if="plan.durationTypeString === 'M'">{{plan.duration === 1? $t('register.month') : $t('register.months')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'W'">{{plan.duration === 1? $t('register.week') : $t('register.weeks')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'D'">{{plan.duration === 1? $t('register.day') : $t('register.days')}}</span>
                {{$t('register.plan')}}
              </h3>
              <div class="planOfferSec">
                <!-- <div class="popularPlan">
                  {{plan.name}}
                </div> -->
                 <h2 class="planPrice" >{{plan.cost-(plan.cost*((plan.discount? plan.discount: 0)/100)) | floatDecimal}}<span class="planCurrecncy">{{plan.currency}}</span></h2>
                <div class="planOldPrice" v-if="plan.discount">{{plan.cost}}{{plan.currency}} </div>

              </div>
              <div  class="planOffer">{{plan.discountMessage}}</div>

            </div>
            <ul class="planInfo">
              <li v-for="description in plan.descriptions">{{description}}</li>
            </ul>
            <div class="planSelectBtn">
              <div class="pos-rel-btn">
                <label class="radio">
               <input type="radio"  :value="plan.subscriptionId" v-model="selectedSubscriptionId" name="plan" class="customCheck">
               <div class="planSelect">
                 <span v-if="selectedSubscriptionId === plan.subscriptionId"><span class="checkedIcon"></span> {{$t('register.selected')}}</span>
                 <span v-else>{{$t('register.select')}}</span>
               </div>
             </label>
              </div>
            </div>
          </div>
        </div>
        </div>




      </div>
         <div class="swiper-button-prev" slot="button-prev"><i class="material-icons">&#xE314;</i></div>
        <div class="swiper-button-next" slot="button-next"><i class="material-icons">&#xE315;</i></div>
</div>


<div class="noSliderPlan" v-else>
<div class="planItem" :class="{active: plan.subscriptionId===getSelectedPlan.subscriptionId}" v-for="(plan, index) in subscriptionPlans" :key="plan.subscriptionId">
          <div class="subsrbPlan plan_1" @click="changePlan(plan.subscriptionId)" v-bind:class="{plan_1: plan.durationTypeString === 'M', plan_2: plan.durationTypeString === 'W', plan_3: plan.durationTypeString === 'D'}">
            <div class="planHead">
              <div class="mostPopularSec"><span class="likeIcon"></span>{{plan.name}} </div>
              <h3 class="planDays">{{plan.duration}}
                <span class="daysTxt" v-if="plan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'D'">{{$t('register.days')}}</span>
                {{$t('register.plan')}}
              </h3>
              <div class="planOfferSec">
                <!-- <div class="popularPlan">
                  {{plan.name}}
                </div> -->
                <h2 class="planPrice">{{plan.cost-(plan.cost*(plan.discount/100)) | floatDecimal}}<span class="planCurrecncy">{{plan.currency}}</span></h2>
               <div class="planOldPrice" v-if="plan.discount">{{plan.cost}}{{plan.currency}} </div>
              </div>
                <div  class="planOffer">{{plan.discountMessage}}</div>

            </div>
            <ul class="planInfo">
              <li v-for="description in plan.descriptions">{{description}}</li>
            </ul>
            <div class="planSelectBtn">
              <div class="pos-rel-btn">
                <label class="radio">
               <input type="radio"  :value="plan.subscriptionId" v-model="selectedSubscriptionId" name="plan" class="customCheck">
               <div class="planSelect">
                 <span v-if="selectedSubscriptionId === plan.subscriptionId"><span class="checkedIcon"></span> {{$t('register.selected')}}</span>
                 <span v-else>{{$t('register.select')}}</span>
               </div>
             </label>
              </div>
            </div>
          </div>
        </div>
        </div>


</div>
</div>

     <!-- <div class="btns subscNextBtnSec clearfix">

        <button class="btn nextBtnNew" @click="goTo(2)">{{$t('register.next')}}</button>
      </div> -->

    </div>
      <!--   </slide>
      </carousel> -->



    <div class="regFormElements regForm" v-if="selectedTab !== 1">




      <div class="regFormBox">
        <div class="regFormBoxInner">
          <div v-if="selectedTab === 2">

               <div class="loginimgShadow"></div>

      <div class="loginimg7"></div>
      <div class="loginimg8"></div>


            <!-- Email And Phone -->
            <!-- <h2>{{$t('register.email_phone')}}</h2> -->
            <div class="selectedPlan">

              <p><i class="material-icons doneIcon">&#xE5CA;</i> {{getSelectedPlan.duration}}
                <span v-if="getSelectedPlan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'D'">{{$t('register.days')}}</span> - {{arrivedRole}} {{$t('register.plan')}}</p>
              <!-- <h4>{{getSelectedPlan.cost}} {{getSelectedPlan.currency}}</h4> -->
            </div>

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
              <label>{{$t('register.phone')}} </label>

              <div class="contrySelect">
                <span class="verifiedIco" v-if="phoneValid"></span>
                <div class="selectCtry">
                  <select v-model="selectedCountryCodeIndex" disabled>
                        <option v-for="(countryCode,index) in $store.state.register.countryList" :value="countryCode.countryId">{{countryCode.code}}</option>
                  </select>
                </div>
                <div class="contryCode" style="left:85px;">{{getCountryCode}}</div>
                <input type="text" :placeholder="$t('register.enter_phone_no')" @keypress="isNumber" @paste="onPaste" @input="verifyPrincipal('phone')" v-model="phone" maxlength="10" class="formControl">
              </div>
            </div>
            <p v-if="tab2View===2" class="otpSentTxt">{{emailOrPhone}}</p>
            <div class="optInput">
              <button class="btn btn-primary btn-block" :disabled="!otpBtnDisable()" @click="sendOtpToMobileNumer" v-if="tab2View===1">{{$t('register.submit')}}</button>
              <div class="inputRow" v-if="tab2View===2">
                <label>{{$t('register.enter_otp')}}   <span class="req">*</span></label>
                <div class="formControlOuter">
                  <input type="text" @keypress="isNumber" maxlength="4" v-model="otpInput" placeholder="xxxx" class="formControl">
                </div>
                <br>
                <div class="formControlOuter clearfix">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                    <countDown v-if="$store.state.auth.otpTimer == true"></countDown>
                    <a class="btn btn-link" v-else @click="sendOtpToMobileNumer">{{$t('register.resend_otp')}}</a>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                    <customloader loaderClass="btn btn-primary btn-block" :loaderClick="verifyOtpForMobileNumer" :loaderDisabled="verifyOtpButtonLoading" loaderText="register.verify_otp"></customloader>
                    <!-- <button class="btn btn-primary btn-block" @click="verifyOtpForMobileNumer">{{$t('register.verify_otp')}}</button> -->
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div  v-if="selectedTab===3">


      <div class="loginimg9"></div>
      <div class="loginimg10"></div>
      <div class="loginimg11"></div>
      <div class="loginimg12"></div>
      <div class="loginimg13"></div>
      <div class="loginimg14"></div>

            <!-- Registration -->
            <!-- <h2>{{$t('register.registration')}}</h2> -->
            <div class="registerFormBox">
            <div class="selectedPlan">
              <p>{{getSelectedPlan.duration}}
                <span v-if="getSelectedPlan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span v-if="getSelectedPlan.durationTypeString === 'D'">{{$t('register.days')}}</span> - <!-- {{arrivedRole}} --> {{$t('register.plan')}}</p>
             <!--  <h4>{{getSelectedPlan.cost}} {{getSelectedPlan.currency}}</h4> -->
            </div>
            <div class="promocodePop inputRow">
            <div class="minner">
            <h6>{{$t('register.got_referral_code')}}?
              <div class="trailInfo"><i class="material-icons">info_outline</i>
                <div class="infoContent">
                  <h6>{{$t('register.referral_code')}}</h6>
                  {{$t('register.referralTooltip')}}
                </div>
              </div>
            </h6>
            <div class="regFormElements">
              <div class="formControlOuter">
                <div class="proCodeInput">
                  <span class="verifiedIco" v-if="appliedReferral"></span>
                  <input type="text" @change="changeReferralCode" v-model="enteredReferralcode" :placeholder="$t('register.add_referCode')" class="formControl">
                  <!-- <input type="text" :placeholder="$t('register.enter_referral_code')" @input="changeReferralCode" class="formControl">
                  <button class="btn btn-default" @click="applyReferralcode">{{$t('common.apply')}}</button> -->

                </div>
              </div>
            </div>
            </div>
          </div>
            <div class="inputRow">
              <label v-if="arrivedRole === 'STUDENT'">{{$t('register.sFirst_name')}}  <span class="req">*</span></label>
              <label v-if="arrivedRole !== 'STUDENT'">{{$t('register.first_name')}}  <span class="req">*</span></label>
              <input type="text" placeholder="" maxlength="250" v-model="firstName" class="formControl">
            </div>
            <div class="inputRow">
              <label v-if="arrivedRole === 'STUDENT'">{{$t('register.sLast_name')}}  <span class="req">*</span></label>
              <label v-if="arrivedRole !== 'STUDENT'">{{$t('register.last_name')}}  <span class="req">*</span></label>
              <input type="text" placeholder="" maxlength="250" v-model="lastName" class="formControl">
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

            <div v-if="showParentFields()">
              <div class="inputRow">
                <label> {{$t('register.pfirst_name')}} <span class="req">*</span></label>
                <input type="text" placeholder="" maxlength="250" v-model="parentsFirstName" class="formControl">
              </div>
              <div class="inputRow">
                <label> {{$t('register.plast_name')}} <span class="req">*</span></label>
                <input type="text" placeholder="" maxlength="250" v-model="parentsLastName" class="formControl">
              </div>
              <div class="inputRow">
                <label>{{$t('register.pRelation')}} <span class="req">*</span></label>
                <div class="select">
                  <!-- <span class="icons select__arrow"></span> -->
                  <select v-model="selectedRelation">
                              <option v-for="relate in relation" :value="relate">{{$t('common.'+relate)}}</option>
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
                <select  v-model="selectedCity" @change="selectSchoolByCity">
                    <option v-for="city in $store.state.register.cityList"  :value="city.cityId">{{city.name}}</option>
                </select>
              </div>
            </div>
            <div class="inputRow" :title="schoolTitle">
              <label>{{$t('register.school_name')}} <span class="req">*</span></label>
              <div class="select">
                    <select  v-model="selectedSchool" :disabled="selectedCity == ''">
                      <option v-for="school in $store.state.register.schoolList" :value="school.schoolId">{{school.name}}</option>
                    </select>
              </div>
            </div>
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
                <input type="password" @keypress="isValidPassword" minlength="6" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="!showPassword" class="formControl formLetterSpace">
                <input type="text" @keypress="isValidPassword" minlength="6" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="showPassword" class="formControl formLetterSpace">
                <!-- <span class="viewPass" @click="showPassword = !showPassword">
                          <i class="material-icons" v-show="!showPassword">remove_red_eye</i>
                          <i class="material-icons" v-show="showPassword">visibility_off</i>
                  </span> -->
              </div>
            </div>
            <div class="inputRow">
              <label>{{$t('register.repeat_password')}} <span class="req">*</span></label>
              <div class="passInput">
                <input type="password" @keypress="isValidPassword" minlength="6" @change="matchPassword" v-model="Cpassword" v-show="!showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
                <input type="text"  @keypress="isValidPassword" minlength="6" @change="matchPassword" v-model="Cpassword" v-show="showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
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
              <div class="btns clearfix">
                <customloader v-if="registerBtnName" loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="register.paidNext"></customloader>
                <customloader v-if="!registerBtnName" loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="register.freeNext"></customloader>
              </div>
              <!-- <button class="btn btn-primary pull-right" @click="submitUser">{{$t('register.next')}}</button> -->
            </div>
          </div>
        </div>
        </div>
      </div>






      <tnc-popup :agreeTerms="agreeTerms" :close="closeTncPopup" v-if="showTerms"/>

      <div class="footer">
        <footer><span v-html="$t('common.footer')"></span></footer>
      </div>
    </div>
  </div>
  <div class="btns subscNextBtnSec clearfix" v-if="selectedTab==1">
        <button class="btn nextBtnNew" @click="goTo(2)">{{$t('register.next')}}</button>
      </div>
</div>
  </div>
</div>

</div>
</template>

<script>
 import tncPopup from '~/components/tncPopup'
 import countDown from '~/components/countDown'
  export default {
    head () {
      return {
        title: this.$t('index.register')
      }
    },
    components: {tncPopup, countDown},
    data() {
      return {
        //onTimerComplete:false,
        startCarouselLoading: false,
        saveButtonLoading: false,
        verifyOtpButtonLoading: false,
        selectedTab: 1,
        schoolFilter: '',
        tab2View: 1,
        promoWithPrincipalValid: false,
        emailValid: false,
        phoneValid: false,
        showTerms: false,
        dummyTerms: false,
        showCPassword: false,
        showPassword: false,
        registrationTabs: [{
            index: 1,
            name: 'register.subscription_plan'
          },
          {
            index: 2,
            name: 'register.phone_email'
          },
          {
            index: 3,
            name: 'register.registration'
          },
          {
            index: 4,
            name: 'register.payment'
          }
        ],
        relation: ['FATHER', 'MOTHER', 'GUARDIAN'],


        subscriptionPlans: [],
        selectedSubscriptionId: '',
        arrivedPromo: '',
        arrivedRole: '',
        roleType: 0,

        appliedReferral: false,
        schoolListoff: false,
        registerBtnName: false,
        enteredReferralcode: '',
        emailId: '',
        wardInput: false,
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
        selectedGrade: '',
        byParent: '',
        saveUserGrades: [],
        termsNCondition: false,
        disableSchoolInput: true,
        //showTimer:false,
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
        isClicked: false,

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
      let dataParamObj = this.$router.currentRoute.path
      this.$root.$emit('showLangCodeActive', {
        dataParamObj
      })

      /*
      this.$root.$on('timerExpired', ({data}) => {
        this.showTimer=false
       }

      )*/



      let webHostname = window.location.hostname
      let webUrl = webHostname.split('.').reverse()
      let webDomain = webUrl[0]

      this.startCarouselLoading = true
      this.$store.dispatch('register/fetchCities', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchSchools', {
        langCode: this.$store.state.locale.selectedLocale,

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

      // Get user type and promo code
      let currentRoute = this.$router.currentRoute.path
      let currentRouteSplit = currentRoute.split('/')
      let userPromoInfo = currentRouteSplit[currentRouteSplit.length - 1]
      let userPromoInfoSplit = userPromoInfo.split('-')
      console.log(userPromoInfoSplit)
      let selectedUser
      let promoCode
      if(userPromoInfoSplit[0] === 'byParent'){
        this.byParent = userPromoInfoSplit[0]
        selectedUser = 'STUDENT'
        promoCode =  userPromoInfoSplit[2]
      }else{
        selectedUser = userPromoInfoSplit[0]
        promoCode =  userPromoInfoSplit[1]
      }
       if(this.byParent === 'byParent') {
            let ward = JSON.parse(localStorage.getItem('tempWard'))
            this.wardInput = ward.inputType
          if(ward.inputType) {
            this.emailId = ward.principal


          }else{
            this.phone = ward.principal

          }
        }

      this.arrivedPromo = promoCode
      this.arrivedRole = selectedUser
      this.$store.dispatch('auth/subscription', {
        promocode: promoCode,
        selectedUser: selectedUser !== 'TEACHER' ? 'STUDENT' : 'TEACHER',
        langCode: this.$store.state.locale.selectedLocale
      }).then(response => {
        this.subscriptionPlans = response.data.SubscriptionMaster
        this.selectedSubscriptionId = this.subscriptionPlans[0] ? this.subscriptionPlans[0].subscriptionId : ''
      })

      if (this.arrivedRole === 'PARENT') {
        this.roleType = 0
        this.registrationOwner = 'PARENT'
        this.registrationType = 'STUDENT'
      } else if (this.arrivedRole === 'STUDENT') {
        this.registrationOwner = 'SELF'
        this.registrationType = 'STUDENT'
        this.roleType = 1
      } else {
        this.registrationOwner = 'SELF'
        this.registrationType = 'TEACHER'
        this.roleType = 2
      }
    },
    filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    },
    methods: {
      changePlan(subscriptionId) {
        this.selectedSubscriptionId = subscriptionId
      },
      checkForRefferalCode() {
        if (this.selectedTab === 3) {
          if (this.$route.query.referralCode && !this.appliedReferral) {
            this.changeReferralCode({
              myvalue: this.$route.query.referralCode
            })
          }
        }
      },
      checkBlankForDataShow() {
        if(this.schoolFilter === '') {
          if(this.isClicked){
            this.schoolListoff = false
          }
          else{
            this.schoolFilter = ' '
            this.schoolListoff = true
          }
        }
        else if(this.schoolFilter === ' ') {
          // this.schoolFilter = ' '
          if(this.isClicked){
            this.schoolListoff = false
          }
          else{
            this.schoolListoff = true
          }
        }
        else if(this.isClicked){
          this.schoolListoff = true
        }
        else{
          this.schoolListoff = false
        }
        this.isClicked =!this.isClicked;
      },
      selectSchoolByCity() {
        this.selectedSchool = '';
        console.log("selectedSchool ", this.selectedSchool);
        if(this.selectedCity) {
          this.disableSchoolInput = false
          this.$store.dispatch('register/fetchSchools', {
            langCode: this.$store.state.locale.selectedLocale,
            city:this.selectedCity,
            country: this.selectedCountry
          })
          if((this.schoolFilter)&&(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1)) {
            // alert("1");
            this.disableSchoolInput = true
            this.schoolFilter = ''
            this.selectedSchool = ''
          }
        }else {
          this.disableSchoolInput = true
        }
      },
      usersTagInput() {
        this.selectedSchool = ''
        this.schoolListoff = true
      },
      onBlurTaggedChipsShow() {

        // this.$store.dispatch('register/fetchSchools', {langCode: this.$store.state.locale.selectedLocale}).then(response => {
          // let taggedDataList = this.$store.state.note.userTagList.tags;
          if(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1){
            this.selectedSchool = this.schoolFilter;
          }
      },
      changeTab(tabIndex) {
        //validations for different tabs
        //if tab is less than the selected tab, then no need to validate

        if (tabIndex < this.selectedTab) {
          this.selectedTab = tabIndex
        }
        this.tab2View = 1
      },
      goTo(tabIndex) {
        //  to toggle button name according to plan whether free or paymentId
        let regBtnName = this.subscriptionPlans.filter(data => {
          return this.selectedSubscriptionId === data.subscriptionId
        })[0].subscriptionSubType
        if(regBtnName === 'PAID') {
          this.registerBtnName = true
        }else {
          this.registerBtnName = false
        }
        if(this.byParent === 'byParent') {
            if(this.wardInput) {
              this.verifyPrincipal('email')
            }else{
              this.verifyPrincipal('phone')
            }

        }
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
        this.otpInput = '';
        // else if (!this.getCountryCode) {
        //   this.$toast.error(this.$t('toastMsg.countrycode_validation'))
        // }
        // else if (!this.emailValid && this.emailId !== '') {
        //   this.$toast.error(this.$t('toastMsg.email_validation'))
        // }
        // console.log(this.phone === ''&& this.emailId === '')
        if (this.phone === ''&& this.emailId === '') {
          this.$toast.error(this.$t('toastMsg.userPrincipalNeeded'))
          return false
        }  else {
          this.$store.dispatch('auth/phoneVerify', {
            principal: this.phone?this.phone:this.emailId,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_success'))
              if (this.tab2View === 1) {
                this.tab2View = 2
                this.emailOrPhone = this.phone?this.$t('index.otp_sent_phone'):this.$t('index.otp_sent_mail')
                //this.onTimerComplete=false
              }
              //this.showTimer = true;
              localStorage.removeItem('tempWard')
            } else {
              this.$toast.error(this.$t('toastMsg.otp_fail'))
            }
          })
        }
      },
      otpBtnDisable() {
        if(this.emailValid && this.phoneValid){
          return true
        }else if(this.emailValid && this.emailId && !this.phoneValid && this.phone) {
          return false
        }else if(this.emailValid && this.emailId && !this.phone) {
          return true
        }else if(!this.emailId && this.phoneValid  && this.phone) {
          return true
        }else if(!this.emailValid && this.emailId && this.phoneValid  && this.phone) {
          return false
        }else{
          return false
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
          if (principal.length !== 10) {
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
                if (this.phoneValid && this.arrivedPromo !== '') {
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
      matchPassword() {
        if (this.password !== '' && this.Cpassword !== '' && this.password !== this.Cpassword) {
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
      dummyPaymentRequest(userId) {
        let paymentPayload = {}
        paymentPayload.amount = this.getSelectedPlan.cost, //Mandatory
          paymentPayload.bankName = "HDFC Bank", //Mandatory
          paymentPayload.userId = userId, //Mandatory
          paymentPayload.subscriptionId = this.getSelectedPlan.subscriptionId, //Mandatory
          paymentPayload.paymentMethod = "CREDIT_CARD", //Mandatory CREDIT_CARD,DEBIT_CARD, NET_BANKING
          paymentPayload.paymentCurrency = this.getSelectedPlan.currency, //Mandatory
          paymentPayload.promoCode = this.arrivedPromo,
          paymentPayload.discountCodeId = "1",
          paymentPayload.cardNumber = "XXXX-YYYY-ZZZZ-3612",
          paymentPayload.cardExpiryDate = "09/2021",
          paymentPayload.paymentGatewayName = "PayU",
          paymentPayload.discount = 300
        this.$store.dispatch('auth/initiatePayment', {
          langCode: this.$store.state.locale.selectedLocale,
          paymentPayload
        }).then(resp => {
          if (resp.data.status === 'ERROR') {

          } else {
            let payloadConfirmData = {}
            payloadConfirmData.paymentId = resp.data.paymentId,
              payloadConfirmData.paymentTransactionId = "Returned from payment gateway",
              payloadConfirmData.paymentComplete = true,
              payloadConfirmData.orderId = resp.data.orderId
            this.$store.dispatch('auth/paymentConfirmation', {
              authToken: this.$store.state.auth.user.token,
              langCode: this.$store.state.locale.selectedLocale,
              payloadConfirmData
            }).then(response => {

            })
          }
        })
      },
      showParentFields() {
        return this.roleType === 0 || this.roleType === 1
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
          let schoolData = ''
          if(this.selectedSchool) {
            payloadData['school'] = this.selectedSchool
          }
          // else {
            // payloadData['school'] = this.selectedSchool
            // this.$toast.error(this.$t('toastMsg.dropDownSchoolName'))
          // }
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
          if (this.appliedReferral) {
            payloadData['referralCode'] = this.enteredReferralcode
          }
          if (this.showParentFields()) {
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
            } else {
              let dataObj = {}
              dataObj.context = this
              dataObj.btnActionName = 'payment'
              let dataParam = dataObj
              let tempUserId = responseData.data.userId
              if (responseData.data.paymentRequired) {
                if (this.arrivedPromo) {
                  if(this.byParent === 'byParent') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}&planName=${this.getSelectedPlan.name}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                  }else{
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}&planName=${this.getSelectedPlan.name}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                  }
                } else {
                  if(this.byParent === 'byParent') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=&planName=${this.getSelectedPlan.name}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                  }else{
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=&planName=${this.getSelectedPlan.name}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                  }

                }
                let subName = this.subscriptionPlans.filter(data => {
                  return data.subscriptionId === this.getSelectedPlan.subscriptionId
                })[0].name
                console.log(subName)
                if(this.byParent === 'byParent') {
                  let fnlGrade = responseData.data.grades.map(data =>{
                      return data.name
                  })
                  let mailId = responseData.data.email
                  let maskid = mailId.replace(/^(.)(.*)(.@.*)$/,
                      (_, a, b, c) => a + b.replace(/./g, '*') + c
                  );
                  // this.maskingPhone(responseData.data.phone)
                  let tempChildObj = {
                      "country":this.selectedCountry,
                      "phone":this.maskingPhone(responseData.data.phone),
                      "city":responseData.data.city.name,
                      "school":responseData.data.school.name,
                      "profilePic":"",
                      "grade":fnlGrade,
                      "httpStatus":200,
                      "userName":responseData.data.firstName+' '+responseData.data.lastName,
                      "userId":responseData.data.userId,
                      "email":maskid,
                      "status":"SUCCESS"
                    }
                    let childArray = []
                    childArray.push(tempChildObj)
                    localStorage.setItem('childObj',JSON.stringify(childArray))

                    // this.$store.dispatch('parentStore/parentsWardList', {
                    //   parentsWardList: childArray
                    // })
                    if(this.arrivedPromo) {
                      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}&planName=${subName}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                    }else{
                      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/byParent=${this.byParent}&subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=''&planName=${subName}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                    }
                }
                else{
                  if (this.arrivedPromo) {
                  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=${this.arrivedPromo}&planName=${subName}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))
                } else {
                  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register/payment/subscriptionId=${this.getSelectedPlan.subscriptionId}&subscriptionCost=${this.getSelectedPlan.cost}&currency=${this.getSelectedPlan.currency}&userId=${tempUserId}&promoCode=''&planName=${subName}&planDiscount=${this.getSelectedPlan.discount}&email=${this.emailId}&phone=${this.phone}`))

                }
                }


              } else {
                // alert("oho");
                let fnlGrade = responseData.data.grades.map(data =>{
                    return data.name
                })
                let mailId = responseData.data.email
                let maskid = mailId.replace(/^(.)(.*)(.@.*)$/,
                    (_, a, b, c) => a + b.replace(/./g, '*') + c
                );
                let tempChildObj = {
                  "country":this.selectedCountry,
                  "phone":this.maskingPhone(responseData.data.phone),
                  "city":responseData.data.city.name,
                  "school":responseData.data.school.name,
                  "profilePic":"",
                  "grade":fnlGrade,
                  "httpStatus":200,
                  "userName":responseData.data.firstName+' '+responseData.data.lastName,
                  "userId":responseData.data.userId,
                  "email":maskid,
                  "status":"SUCCESS"
                }
                let childArray = []
                childArray.push(tempChildObj)
                localStorage.setItem('childObj',JSON.stringify(childArray))
                this.$root.$emit('showActivationActionPopup', {
                  dataParam
                })
              }
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
      maskingPhone(data) {
        let forPhone = data.substr(data.length-3)
        let maskingPhone = data.substr(0,data-3)
        let convertingPhone = maskingPhone.split('')
        let maskedPhoneNumber = convertingPhone.map(value =>{
            return value.replace(value,'*')
        }).join('')+forPhone
        console.log(maskedPhoneNumber)
        return maskedPhoneNumber
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
          // this.arrivedRole !== 'TEACHER' &&
        } else if (this.$store.getters['getAge'](this.dob)<5) {
          this.$toast.error(this.$t('toastMsg.dob_check_student'))
          return false
        } else if (this.showParentFields() && ((this.parentsFirstName === '') || (this.parentsFirstName === undefined))) {
          this.$toast.error(this.$t('toastMsg.parentFirstName_required'))
          return false
        } else if (this.showParentFields() && (this.parentsFirstName.trim().length<2)) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.pfirst_name'))
          return false
        } else if (this.showParentFields() && ((this.parentsLastName === '') || (this.parentsLastName === undefined))) {
          this.$toast.error(this.$t('toastMsg.parentLastName_required'))
          return false
        } else if (this.showParentFields() && (this.parentsLastName.trim().length<2)) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.plast_name'))
          return false
        } else if (this.showParentFields() && ((this.selectedRelation === '') || (this.selectedRelation === undefined))) {
          this.$toast.error(this.$t('toastMsg.parentRelation_required'))
          return false
        } else if ((this.selectedCountry === '') || (this.selectedCountry === undefined)) {
          this.$toast.error(this.$t('toastMsg.country_required'))
          return false
        } else if ((this.selectedCity === '') || (this.selectedCity === undefined)) {
          this.$toast.error(this.$t('toastMsg.city_required'))
          return false
        } else if ((this.selectedSchool === '') || (this.selectedSchool === undefined)) {
          this.$toast.error(this.$t('toastMsg.school_required'))
          return false
        }
        else if(!this.selectedSchool) {
          this.$toast.error(this.$t('toastMsg.dropDownSchoolName'))
        }
         else if (this.arrivedRole !== 'TEACHER' && ((this.selectedGrade === '') || (this.selectedGrade === undefined))) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false
        } else if (this.arrivedRole === 'TEACHER' && (this.saveUserGrades.length === 0)) {
          this.$toast.error(this.$t('toastMsg.grade_required'))
          return false
        } else if ((this.password === '') || (this.password === undefined)) {
          this.$toast.error(this.$t('toastMsg.password_required'))
          return false
        }
        // else if ((this.password.length < this.$store.getters['getMinPasswordLength']()) || (this.Cpassword.length < this.$store.getters['getMinPasswordLength']())) {
        //   this.$toast.error(this.$t('toastMsg.password_minlength') +" "+this.$store.getters['getMinPasswordLength']()+" "+ this.$t('toastMsg.password_minlengthCharacter'))
        //   return false
        // }
        else if (this.password !== this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
          return false
        } else {
          return true
        }
      },
      verifyOtpForMobileNumer() {
        this.verifyOtpButtonLoading = true
        if ((this.otpInput === '') || (this.otpInput === undefined)) {
          this.$toast.error(this.$t('toastMsg.otp_validation'))
          this.verifyOtpButtonLoading = false
        } else {
          this.$store.dispatch('auth/otpVerify', {
            principal: this.phone?this.phone:this.emailId,
            otp: this.otpInput,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_validated'))
              this.selectedTab = 3
              this.checkForRefferalCode()
              this.tab2View = 1
            } else {
              this.$toast.error(this.$t(response.data.message))
            }
            this.verifyOtpButtonLoading = false
          }, error => {
            this.verifyOtpButtonLoading = false
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
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
          evt.preventDefault()
        }
        // else {
          return true;
        // }
      },
      openTermsPopup() {
        if (this.termsNCondition) {
          this.termsNCondition = false
        } else {
          this.showTerms = true
        }
      },
      closeTncPopup() {
        this.showTerms = false
      },
      agreeTerms() {
        this.termsNCondition = true
        this.showTerms = false
      },
      changeReferralCode(event) {
        this.enteredReferralcode = event.myvalue ? event.myvalue : event.target.value
        this.appliedReferral = false

        if (this.enteredReferralcode) {
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
        }

        // else {
        //   this.$toast.error(this.$t('toastMsg.referralcodeRequired'))
        // }
      },
      selectedUserSchool(data) {
        this.schoolListoff = false
        this.selectedSchool = data
        this.schoolFilter = data.name
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
      onPaste: function(evt) {
        // console.log('on paste', evt)
        // return false;
        evt.preventDefault();
      }
    },
    computed: {
      schoolTitle(){
        return this.selectedCity ? '' : this.$t('toastMsg.user_City')
      },
      getSelectedPlan() {
        if (this.subscriptionPlans.length > 0) {
          return this.subscriptionPlans.filter((plan) => (this.selectedSubscriptionId === plan.subscriptionId))[0]
        } else {
          return {}
        }
      },
      getCountryCode() {
        let listedCountryResult = this.$store.state.register.countryList.filter(countryResult =>{
          return countryResult.countryId === this.selectedCountry
        })
        return listedCountryResult.length !== 0? listedCountryResult[0].dialCode : {}
      },
      filterInputSearchSchoolData() {
        return this.$store.state.register.schoolList.filter(school => {
          return school.name.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) !== -1
      })
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

  .filterListOpt{
  	box-shadow: 0 0 6px lightgray;position: absolute;width: 100%;z-index: 9;background: #fff;
  }
  .filterListOpt li{padding: 5px;}
  .filterListOpt li:hover{
  	background: lightgray;
  }
  .customDate input{
    width:100%;height: 37px;
  }
  .customDate{padding:0px !important;}
  .otpSentTxt{margin: 0 0 20px;text-align: center;}
</style>
