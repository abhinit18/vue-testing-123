<template>
  <div class="marketingPage marktPgTc" v-bind:class="{ videoOpenBody: isVidActive }">

   






         
      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <header class="mrkHeader" v-show="!isVidActive">
                            <div class="mrkConMid">
                               <div class="headerLeft">
                                  <span class="marktMobMenu closeMobMenu" v-on:click="myFilter" v-bind:class="{ active: isActive }">
                                  <i class="burger_bar"></i>
                                  </span>
                                  <span class="marktLogo" @click="toSlide('0')"><img src="~assets/images/marketing/logo2.png"></span>
                                  <div class="langShowMob">
                                     <languageSelectBox />
                                  </div>
                               </div>
                               <nav v-bind:class="{ active: isActive }">
                                  <ul>
                                     <li class="langShowWeb">
                                        <languageSelectBox />
                                     </li>
                                     <!-- <li><a href="javascript:void(0);" @click="toSlide('2')">{{$t('marketing.features')}}</a></li>
                                     <li><a href="javascript:void(0);" @click="toSlide('11')">{{$t('marketing.contact')}} </a></li>
                                     <li><router-link :to="{ path: $store.getters['locale/getFinalUrl']('/login'), query: $route.query}">{{$t('marketing.login')}}</router-link> </li> -->
                                     <li><a  class="headerCloseBtn"><i class="material-icons">&#xE5CD;</i></a></li>
                                     <!-- <li><router-link class="subscribeBtn" :to="{path: $store.getters['locale/getFinalUrl']('/register'), query: $route.query}">{{$t('marketing.subscribe')}}</router-link></li> -->

                                  </ul>
                               </nav>
                            </div>
                         </header>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition clearfix">
                           <div class="termCondInner">
                             <h2 class="hedingTabfold">Privacy Policy for Budbee App<!-- {{$t('marketing.content_partners')}} --></h2>
                              <ol class="breadcrumb">
                                <li><a href="#">LEGAL</a></li>
                                <li class="active">Privacy Policy for Budbee App</li>
                              </ol>
                              <div class="termConContent">
                                <h3 class="termAConLastUpdate">LAST UPDATED: 20.2.2018</h3>
                                <p class="termConTxt">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                                <p class="termConTxt">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                                <p class="termConTxt">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                                 <p class="termConTxt">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                                 <p class="termConTxt">
                                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                </p>
                            </div>
                         </div>
                         <div class="marktFoldBox foldBox_ContactUs">
                               <div class="marktFoldBoxInner">
                                <div class="foldBoxContactInner clearfix">
                                   <div class="colsBoxFollowUs">
                                      <h3 class="colsHeading">{{$t('marketing.follow_us')}}</h3>




                                        <ul class="socialIcons text-center">

                                                <li>
                                                   <a href="#">&nbsp;
                                                    <span class="iconsImg icon_3"></span>
                                                   </a>
                                                </li>
                                                <li>
                                                  <a href="#">&nbsp;
                                                    <span class="iconsImg"></span>
                                                   </a>
                                                </li>
                                              </ul>

                                   </div>
                                   <div class="colsBoxContact">
                                      <h3 class="colsHeading">{{$t('marketing.contact_us')}}</h3>
                                      <div class="contcTxtBox">{{$t('marketing.Address')}}
                                      </div>
                                      <div class="contcTxtBox">
                                         +235 793-891-7938<br>
                                         <a href="#">contact@budbee.kz</a>
                                      </div>
                                   </div>

                                </div>
                                <div class="footerLinkSec">
                                    <ul class="footerLinks">
                                      <li><a href="#">Media</a></li>
                                      <li><a href="#">Faq</a></li>
                                      <li><a href="#">Partners</a></li>
                                      <li><a href="#">Helpdesk</a></li>
                                      <li><a href="#">Careers</a></li>
                                      <li><a href="#">Legal</a></li>
                                    </ul>
                                </div>
                                <!-- &copy; 2018 Budbee -->
                                 <span v-html="$t('common.footer')"></span>
                                </div>
                                <div class="masKotImg slideUp">
                                   <img src="~assets/images/icon_222.png">
                                </div>
                     </div>
                     </div>
                     
                  </div>
               </div>
            </div>

</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import languageSelectBox from '~/components/languageSelectBox'
export default {
  middleware: 'anonymous',
  layout: 'marketing',
  data(){
    return {
         isActive: false,
         pageClassName:'b1',
         isVidActive: false,
         videoContainer:null,
         videoClipper:null,
         clippedVideo: null,
         divisor: null,
         requestademopop:false,
         slider: null,
         showCarousel: false,
         phoneValid: false,
         emailValid: false,
         selectedCountryCode: '',
         firstName: '',
         lastName: '',
         job: '',
         hear: '',
         phone: '',
         email: '',
         city: '',
         opts: {
            start: 0,
            dir: 'v',
            duration: 500,
            beforeChange: function (prev, next) { },
            afterChange: function (prev, next) { },
         },
         selectedCountryCodeIndex:'',
         //ftabs: [true, false, false, false],
           swiperOption: {
             direction: 'vertical',
             slidesPerView: 1,
             effect: 'fade',
             spaceBetween: 0,
             speed:100,
             keyboard: true,
             mousewheel: true,
             initialSlide: 0,
             allowTouchMove: true,
             pagination: {
               el: '.swiper-pagination',
               clickable: true
             },
              breakpoints: {
                1110: {
                  allowTouchMove: true
                }
              }
           },
           hearAbout: [
             'Newspaper',
             'Article',
             'Friend',
             'Email',
             'Social Network'
           ],
           jobProfile: [
             'Student',
             'Teacher',
             'Driver',
             'Player',
             'Social Worker'
           ],
           choice: 'homeActive' // Home is chosen by default
      }
    },
  methods: {
    onSlideChange(event) {
        this.slider.value = 50;
        this.divisor.style.width = this.slider.value+"%";
        this.isVidActive = false;
    },
    moveToSignUp() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register`))
    },
    moveDivisor: function(event) {
      //alert('aakas');
      this.divisor.style.width = this.slider.value+"%";
    },
    makeActive: function(val) {
         this.choice = val;
     },
    changeClass: function(val) {
       this.pageClassName = val;
   },
     isActiveTab: function(val) {
       return this.pageClassName === val;
     },
     requestDemoPop(a){
      //alert('');
      this.requestademopop = a
     },
   // toggleTab(val){
   //    for(i = 0; i < this.ftabs.length; i++){
   //       if(i == val){
   //          this.ftabs[i] = true;
   //       }
   //       else {
   //          this.ftabs = false;
   //       }
   //    }
   // },
   // isTabs(val){
   //    return this.ftabs[val];
   // },
    // trackLocation(e) {
    //   var rect = this.videoContainer.getBoundingClientRect(),
    //   position = ((e.pageX - rect.left) / this.videoContainer.offsetWidth)*100;
    //   if (position <= 100) {
    //     this.videoClipper.style.width = position + 2 +"%";
    //     this.clippedVideo.style.width = ((100/position)*100)+"%";
    //     this.clippedVideo.style.zIndex = 3;
    //   }
    // },
     moveNext(){
      this.$refs.example.$fullpage.moveNext(); //Move to the next page
    },
    myFilter: function(){
         this.isActive = !this.isActive;
    },
    videoView: function(){
         this.isVidActive = !this.isVidActive;
    },
    toSlide(i) {
     //this.$refs.mySwiper.swiper.slideTo(i, 0)
     this.mySwiper.slideTo(i)
   },
   verifyPrincipal(value) {
     let principal = ''
     let validations = false
     if (value === 'email') {
       principal = this.email
       validations = this.$store.getters['validateEmail'](principal)
       if (!validations) {
         this.$toast.error(this.$t('toastMsg.email_validation'))
         this.emailValid = false
       }else {
         this.emailValid = true
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
         }else {
           this.phoneValid = true
         }
       }
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
   submitRequest() {
     if(this.firstName === '' || this.firstName === undefined) {
       this.$toast.error(this.$t('toastMsg.first_name_required'))
     }else if(this.lastName === '' || this.lastName === undefined) {
       this.$toast.error(this.$t('toastMsg.last_name_required'))
     }else if (this.phone === '' || this.phone === undefined) {
       this.$toast.error(this.$t('toastMsg.user_Phone'))
     }
     else if (this.email === '' || this.email === undefined) {
       this.$toast.error(this.$t('toastMsg.user_Email'))
     }
     else if((this.phone !== '' || this.phone !== undefined)&& (!this.phoneValid)) {
       this.$toast.error(this.$t('toastMsg.phone_validation'))
     }
     else if((this.email !== '' || this.email !== undefined)&& (!this.emailValid)) {
       this.$toast.error(this.$t('toastMsg.email_validation'))
     }
     else if (this.job === '' || this.job === undefined) {
       this.$toast.error(this.$t('toastMsg.job_validation'))
     }
     else if (this.city === '' || this.city === undefined) {
       this.$toast.error(this.$t('toastMsg.user_City'))
     }
     else {
       let payloadData = {}
       payloadData.firstName = this.firstName
       payloadData.lastName = this.lastName
       payloadData.phone = this.phone
       payloadData.email = this.email
       payloadData.jobTitle = this.job
       payloadData.city = this.city
       payloadData.lang = this.$store.state.locale.selectedLocale
       this.$store.dispatch('common/RequestDemo', {
         langCode:this.$store.state.locale.selectedLocale,
         payloadData
       }).then(response => {
         if(response.data.status === 'SUCCESS') {
           this.requestDemoPop(false)
           this.firstName = ''
           this.lastName = ''
           this.phone = ''
           this.email = ''
           this.job = ''
           this.city = ''
           this.$toast.success(this.$t('toastMsg.demoSuccess'))
         }
       })
     }

   },
   akash() {
      document.getElementById("slider").blur();
      //alert('aaa');
    }
  },
  asyncData({context, route}) {
	  return {query: route.query}
  },
  mounted() {
    let webHostname = window.location.hostname
    let webUrl = webHostname.split('.').reverse()
    let webDomain = webUrl[0]

    this.$store.dispatch('register/fetchCities', {
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
      // this.selectedCountry = this.selectedCountryCodeIndex
    })

    this.showCarousel = true
    // this.videoContainer = document.getElementById("video-compare-container"),
    // this.videoClipper = document.getElementById("video-clipper"),
    // this.clippedVideo = this.videoClipper.getElementsByTagName("video")[0];
    // this.videoContainer.addEventListener( "mousemove", this.trackLocation, false);
    // this.videoContainer.addEventListener("touchstart",this.trackLocation,false);
    // this.videoContainer.addEventListener("touchmove",this.trackLocation,false);


    this.divisor = document.getElementById("divisor");
    this.slider = document.getElementById("slider");


    //Swiper
    setTimeout(() => {
      if (this.banners) {
        this.banners.push('/5.jpg')
      }
    }, 3000)
     //this.mySwiper.slideTo(3)
  },
  components: {
     Carousel, Slide, languageSelectBox
  },
  head: {
   bodyAttrs: {
     //class: this.checkIfPrimary()? 'primaryClassBody': ''
     class: 'marketingBody'
   }
 },
 computed: {
   getCountryCode() {
    //  return this.$store.state.register.countryList[this.selectedCountryCodeIndex]
    let listedCountryResult = this.$store.state.register.countryList.filter(countryResult =>{
      return countryResult.countryId === this.selectedCountryCodeIndex
    })
    return listedCountryResult.length !== 0? listedCountryResult[0].dialCode : {}
   }
 }

}
</script>
<style>
select::-ms-expand {
    display: none;
}

</style>
