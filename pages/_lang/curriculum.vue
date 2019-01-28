<template>
   <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
         <div class="mrktSlider marktFoldSec">
            <static-page-header :back="back" :platform="platform"/>
            <div class="mrkConMid">
               <div class="marktFoldBox termCondition clearfix">
                                 <a class="pclose" @click="back"><span><i class="material-icons">&#xE5CD;</i></span></a>

                  <div class="termCondInner">
                     <div>
                        <div class="stataticPageOuter">
                           <div class="conMidSec">
                              <div class="stataticPageInner HelpPage">
                                 <h2 class="smallHeading">{{$t('common.curriculmHeading')}}</h2>
                                 
                                  Coming Soon
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <contactUsFooter :platform="platform"/>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import {Carousel, Slide } from 'vue-carousel'
	import staticPageHeader from '~/components/staticPageHeader'
   import contactUsFooter from '~/components/contactUsFooter'  
   export default {
       components: {
         Carousel,
         Slide,
      	 staticPageHeader, 
      	 contactUsFooter
       },
   mounted () {
   let uname = this.$store.state.initialData.firstName+' '+this.$store.state.initialData.lastName;
     $zopim(function() {
       $zopim.livechat.setName(uname);
     });
   },
   beforeDestroy() {
     $zopim(function() {
       $zopim.livechat.hideAll();
     });
   },
   	layout: 'static',
     data() {
       return {
       chatPop: true,
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
         },
         breakpoints: {
         	1024: {
                 slidesPerView: 3 
           },
         	768: {
             slidesPerView:2 
           },
           400: {
             slidesPerView:1
           },
   
         }
      }
       }
     },
   	methods: {
   	  back () {
   		  this.$router.back()
         $zopim(function() {
           $zopim.livechat.hideAll();
         });
   	  }
   	},
   	asyncData(context) {
	  const platform = context && context.req && context.req.headers["platform"]? context.req.headers["platform"] : 'web'
	  let locale = undefined
      if (context && context.req && context.req.headers["accept-language"] ) {
        locale = context.req.headers["accept-language"]
        if (locale && locale.length>2) {
          locale = undefined
        }
      }
	  return { platform, locale}
  },
     head () {
     return {
     	title: this.$t('common.help'),
      bodyAttrs: {
        class: 'staticBody'
      }
     } 
    }
   }
</script>