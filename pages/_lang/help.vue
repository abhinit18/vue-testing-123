<template>
   <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
         <div class="mrktSlider marktFoldSec">
            <static-page-header :back="back" :platform="platform"/>
            <div class="mrkConMid">
               <div class="marktFoldBox termCondition clearfix">
                  <div class="termCondInner">
                     <div>
                        <div class="stataticPageOuter">
                           <div class="conMidSec">
                              <div class="stataticPageInner HelpPage">
                                 <h2 class="smallHeading">{{$t('common.help')}}</h2>
                                 <div class=" clearfix itemOuterRow helpItemsOuter ">
                                    <div v-swiper:mySwiper="swiperOption">
                                       <div class="swiper-wrapper">

                                          <div class="swiper-slide ">
                                             <div class="embed-responsive embed-responsive-16by9">
                                                <video class="embed-responsive-item" width="100%" controls>
                                                   <source src="https://s3.ap-south-1.amazonaws.com/kplms-content/kplms-content/en-content/.mp4%20test%20video1513621511465" type="video/mp4">
                                                   {{$t('common.videoSupport')}}
                                                </video>
                                             </div>
                                             <h4>{{$t('common.tile2')}}</h4>
                                          </div>
                                          <div class="swiper-slide ">
                                             <div class="embed-responsive embed-responsive-16by9">
                                                <video class="embed-responsive-item" width="100%" controls>
                                                   <source src="https://s3.ap-south-1.amazonaws.com/kplms-content/kplms-content/en-content/.mp4%20test%20video1513621511465" type="video/mp4">
                                                   {{$t('common.videoSupport')}}
                                                </video>
                                             </div>
                                             <h4>{{$t('common.tile3')}}</h4>
                                          </div>
                                          <div class="swiper-slide ">
                                             <div class="embed-responsive embed-responsive-16by9">
                                                <video class="embed-responsive-item" width="100%" controls>
                                                   <source src="https://s3.ap-south-1.amazonaws.com/kplms-content/kplms-content/en-content/.mp4%20test%20video1513621511465" type="video/mp4">
                                                   {{$t('common.videoSupport')}}
                                                </video>
                                             </div>
                                             <h4>{{$t('common.tile4')}}</h4>
                                          </div>
                                          <div class="swiper-slide ">
                                             <div class="embed-responsive embed-responsive-16by9">
                                                <video class="embed-responsive-item" width="100%" controls>
                                                   <source src="https://s3.ap-south-1.amazonaws.com/kplms-content/kplms-content/en-content/.mp4%20test%20video1513621511465" type="video/mp4">
                                                   Your browser does not support HTML5 video.
                                                </video>
                                             </div>
                                             <h4>How to use this platform ?</h4>
                                          </div>
                                          <div class="swiper-slide ">
                                             <div class="embed-responsive embed-responsive-16by9">
                                                <video class="embed-responsive-item" width="100%" controls>
                                                   <source src="https://s3.ap-south-1.amazonaws.com/kplms-content/kplms-content/en-content/.mp4%20test%20video1513621511465" type="video/mp4">
                                                   Your browser does not support HTML5 video.
                                                </video>
                                             </div>
                                             <h4>How to use this platform ?</h4>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="swiper-button-prev" slot="button-prev"><i class="material-icons">&#xE314;</i></div>
                                    <div class="swiper-button-next" slot="button-next"><i class="material-icons">&#xE315;</i></div>
                                 </div>
                                 <h4 class="smallHeading">{{$t('common.chatWithUs')}}</h4>
                                 <p class="innerTxt">{{$t('common.helpText')}}</p>
                                 <p>+235 793-891-7938 <br>
                                    contact@budbee.kz
                                 </p>
                                 <br><br>
                                 <!--
                                    <br><br>
                                    <h2 class="smallHeading">About us</h2>
                                    <p class="innerTxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled imake a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of </p> -->
                                 <div class="clearFix">
                                    <a href="javascript:$zopim.livechat.window.show();" v-if="chatPop" @click="chatPop = true">
                                       <!-- <img src="yourbutton.png" alt="Chat with Us" /> -->
                                       <button class="btn btn-primary chatBtn" alt="Chat with Us">{{$t('common.chatWithUs')}}</button>
                                    </a>
                                    <a href="javascript:$zopim.livechat.hideAll();"  v-if="!chatPop" @click="chatPop = true">
                                       <!-- <img src="yourbutton.png" alt="Close this Chat" /> -->
                                       <button class="btn btn-primary chatBtn">{{$t('common.chatWithUs')}}</button>
                                    </a>
                                 </div>
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
