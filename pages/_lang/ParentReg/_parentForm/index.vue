<template>
  <div>
   
</div>
</template>

<script>
 import tncPopup from '~/components/tncPopup'
  export default {
    head () {
      return {
        title: this.$t('index.register')
      }
    },
    components: {tncPopup},
    data() {
      return {
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
        roleType: 0,

        appliedReferral: false,
        schoolListoff: false,
        registerBtnName: false,
        enteredReferralcode: '',
        emailId: '',
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
        saveUserGrades: [],
        termsNCondition: false,
        disableSchoolInput: true,
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
        }
      }
    },
    layout: 'login',
    mounted() {
      
    },
    filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    },
    methods: {
     
    }
    
  }
</script>

<style>
  
</style>
