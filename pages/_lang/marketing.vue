<template>
  <div class="marketingPage " v-bind:class="{ videoOpenBody: isVidActive }">

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
               <li class="featuresLink">
                  <div class="select langSelect">
                        <div class="dropdownSel">
                          <div class="seleLangcbtn">
                            <a href="javascript:void(0);" @click="toSlide('2')">{{$t('marketing.features')}}</a>
                            <span class="icons select__arrow"></span>
                          </div>
                          <ul>
                            <li><a href="javascript:void(0);" @click="toSlide('2')">{{$t('marketing.gamified_learning')}}</a></li>
                            <li><a href="javascript:void(0);" @click="toSlide('3')">{{$t('marketing.peer_interaction')}}</a></li>
                            <li><a href="javascript:void(0);" @click="toSlide('4')">{{$t('marketing.track_progress')}}</a></li>
                            <li><a href="javascript:void(0);" @click="toSlide('5')">{{$t('marketing.personalised_theme')}}</a></li>
                          </ul>
                        </div>
                  </div>
                </li>
               <!-- <li v-on:click="myFilter" ><a href="javascript:void(0);" @click="toSlide('2')">{{$t('marketing.features')}}</a></li> -->
               <!-- <li v-on:click="myFilter" ><a href="javascript:void(0);" @click="requestDemoPop(true)">{{$t('marketing.demo')}} </a></li> -->                           
               <li><router-link :to="{ path: $store.getters['locale/getFinalUrl']('/curriculum'), query: $route.query}">{{$t('marketing.curriculum')}}</router-link> </li>
               <li v-on:click="myFilter" ><a href="javascript:void(0);" @click="toSlide('11')">{{$t('marketing.contact')}} </a></li>               
               <li><router-link :to="{ path: $store.getters['locale/getFinalUrl']('/login'), query: $route.query}">{{$t('marketing.login')}}</router-link> </li>
               <li><router-link class="subscribeBtn" :to="{path: $store.getters['locale/getFinalUrl']('/register'), query: $route.query}">{{$t('marketing.subscribe')}}</router-link></li>
               <li class="langShowWeb">
                  <languageSelectBox />
               </li>
            </ul>
         </nav>
      </div>
   </header>

 
<div id="marketingPageScrolling">
   <div v-swiper:mySwiper="swiperOption"  @slideChange="onSlideChange">
      <div class="swiper-wrapper">
         <div class="swiper-slide" v-bind:class="{ videoOpen: isVidActive }">
            <div class="scroll-downs">
              <div class="mouse"></div>
              <p>Scroll</p>
            </div>
            <!-- marketing welcome fold starts -->
            <div class="videoBg" v-bind:class="{ videoOpen: isVidActive }">
              <video autoplay muted loop id="marktVideo" class="marktVideo">
                <source src="~assets/images/marketing/marketing2.mp4" type="video/mp4">
              </video>
              <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
               <!-- <button class="videoBtn" v-on:click="videoView"><i class="material-icons">&#xE5CD;</i></button> -->
                
               <div class="videoCaption">
                  <div class="mrkConMid">
                     <div class="mrktFoldWelcome">
                        <div class="mrkFoldInner">
                           <h2 class="foldBuddyTxt">
                              <!-- With Budbee  -->{{$t('marketing.With_budbee')}}
                           </h2>
                           <h1 class="foldPunchLine">
                              {{$t('marketing.learning_is')}}
                              <div class="fadeInPunch">
                                 <span class="">{{$t('marketing.fun')}}</span>
                                 <span class="">{{$t('marketing.collaborative')}}</span>
                                 <span class="">{{$t('marketing.engaging')}}</span>
                              </div>
                           </h1>
                           <!-- <button class="btn btnVideo" v-on:click="videoView"><i class="material-icons">&#xE038;</i>  {{$t('marketing.watch_video')}}</button> -->
                           <a  class="subsBtnMob" @click="moveToSignUp">{{$t('marketing.subscribe')}}</a>
                       
                            <h2 class="mrktCleintSecHeading">{{$t('marketing.content_partners')}}</h2>

                           <div class="mrktCleintSec">
                               <img src="~assets/images/marketing/bbc.png" class="clientImg">
                               <img src="~assets/images/marketing/cnn.png" class="clientImg">
                               <img src="~assets/images/marketing/boclips.png" class="clientImg">
                               <!-- <img src="~assets/images/marketing/Britannica.png" class="clientImg"> -->
                               <img src="~assets/images/marketing/Rosen.png" class="clientImg">
                               <img src="~assets/images/marketing/SterlingPixels.png" class="clientImg">
                               <img src="~assets/images/marketing/TCM.png" class="clientImg">
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- marketing welcome fold ends  -->
         </div>



 <div class="swiper-slide">


 <div id="comparison">
  <input type="range" max="95" min="5" value="50" id="slider" v-on:input="moveDivisor" v-on:mouseout="akash" >
               <div class="mrktSlider">
                  <div class="mrkConMid">
                     <div class="marktSliderInner">
                        <div class="leftInfo">
                           <h1 class="heading">{{$t('marketing.no_boring_lessons')}}</h1>
                           <p>
                             {{$t('marketing.no_boring_lessons_txt')}}

                           </p>
                        </div>
                        <div class="marktStudntIcon">
                           <img src="~assets/images/marketing/sad_1.png">
                        </div>

                     </div>
                  </div>
               </div>
               <div id="divisor" style="width: 50%">
                  <span class="slideHandle"></span>
                  <div style="margin:0;overflow:hidden;">
                     <div class="mrktSlider addColorSlide">
                        <div class="mrkConMid">
                           <div class="marktSliderInner">
                              <div class="leftInfo">
                                 <h1 class="heading">{{$t('marketing.add_color_learning')}}</h1>
                                 <p>
                                   {{$t('marketing.add_color_learning_txt')}}

                                 </p>
                              </div>
                              <div class="marktStudntIcon">
                                 <img src="~assets/images/marketing/marktStudtSmile_1.svg">
                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
      </div>


        <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
             <div class="marktFoldOuter">
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_2 clearfix">
                           <div class="foldActionBtnSec">
                              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                           </div>
                         <div class="marktFoldBoxInner">

                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent content_2">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.gamified_learning')}}</h2>
                                     <p class="tabInfoTxt">{{$t('marketing.gamified_learning_txt_1')}}</p>
                                     <p class="tabInfoTxt">{{$t('marketing.gamified_learning_txt_2')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">
                                     <img src="~assets/images/marketing/gamified_learning.svg">
                                  </div>
                               </div>
                            </div>
                          </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
         <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter">
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_3 clearfix">
                           <div class="foldActionBtnSec">
                             <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                           </div>
                        <div class="marktFoldBoxInner">
                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent clearfix content_3">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.peer_interaction')}}</h2>
                                     <p class="tabInfoTxt">{{$t('marketing.peer_interaction_txt')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">
                                       <p class="peerProfileNametop">{{$t('marketing.peerImgTxtUser1')}}</p>
                                     <div class="peerDynImgTxtTop">
                                       <p class="peerTxtTime">{{$t('marketing.peerImgTxtTime')}}</p>
                                       <p class="peerDynImgTxtComment">{{$t('marketing.peerImgTxtComment')}}</p>
                                       <p class="peerDynResrceTxt">{{$t('marketing.peerImgTxtResource')}}</p>
                                     </div>
                                       <p class="peerProfileNameBot">{{$t('marketing.peerImgTxtUser2')}}</p>
                                     <div class="peerDynImgTxtBottom">
                                       <p class="peerTxtTime">{{$t('marketing.peerImgTxtTime')}}</p>
                                       <p class="peerDynImgTxtComment">{{$t('marketing.peerImgTxtThanks')}} <strong>Salim</strong>
                                       <span class="chatIcon">:)</span></p>
                                     </div>
                                     <img src="~assets/images/marketing/peer_interaction.png">
                                  </div>
                               </div>
                            </div>
                          </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
         <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter">

               <div class="mrktSlider marktFoldSec foldBg_Blue">

                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_1 clearfix">
                         <div class="foldActionBtnSec">
                            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                         </div>
                        <div class="marktFoldBoxInner">
                          <div class="foldBoxContentSec">
                             <div class="foldFeatureTabContent content_1">
                                <div class="tabInfo slideInUp">
                                   <h2 class="hedingTabfold">{{$t('marketing.track_progress')}}</h2>
                                   <p class="tabInfoTxt"> {{$t('marketing.track_progress_txt_1')}}</p>
                                   <p class="tabInfoTxt"> {{$t('marketing.track_progress_txt_2')}}</p>
                                </div>
                                <div class="tabImg slideInUp animationFold_2">
                                   <img src="~assets/images/marketing/track_progress.svg">
                                </div>
                             </div>
                          </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
         <div class="swiper-slide">
            <div class="peekMaskot rubberBand">
                <img src="~assets/images/icon_22.png">
            </div>
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue" :class="pageClassName">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_4 clearfix">
                            <div class="foldActionBtnSec">
                              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                            </div>
                         <div class="marktFoldBoxInner colorOuterFoldSec">
                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent content_4 personalised_theme">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.personalised_theme')}}</h2>
                                     <p class="tabInfoTxt"> {{$t('marketing.personalised_theme_txt')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">

                                   <img v-if="pageClassName === 'b1'" src="~assets/images/marketing/theme_blue.svg">

                                   <img v-if="pageClassName === 'b2'" src="~assets/images/marketing/theme_red.svg">
                                   <img v-if="pageClassName === 'b3'" src="~assets/images/marketing/theme_violet.svg">
                                    <img v-if="pageClassName === 'b4'" src="~assets/images/marketing/theme_green.svg">

                                  </div>
                               </div>
                            </div>
                        </div>
                        <div class="foldThemeBtn">
                           <ul class="foldThemeBtnList">
                              <li class="theme_1" v-bind:class="{active: isActiveTab('b1')}"><a  class="bullet" v-on:click="changeClass('b1')"></a></li>
                              <li class="theme_2" v-bind:class="{active: isActiveTab('b2')}"><a  class="bullet" v-on:click="changeClass('b2')"></a></li>
                              <li class="theme_3" v-bind:class="{active: isActiveTab('b3')}"><a  class="bullet" v-on:click="changeClass('b3')"></a></li>
                              <li class="theme_4" v-bind:class="{active: isActiveTab('b4')}"><a  class="bullet" v-on:click="changeClass('b4')"></a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>

 












        

         <!-- <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_teachers clearfix">
                          <div class="marktFoldBoxInner">
                            <h2 class="hedingTabfold">{{$t('marketing.teachers')}}</h2>
                            <div class="foldSlider foldTeacherSlider" v-if="showCarousel">
                               <carousel :navigationEnabled=false :paginationEnabled=true :scrollPerPage=true :perPage=2  :perPageCustom="[[300, 1], [768, 2]]">
                                  <slide>
                                     <div class="foldTestmBox">
                                        <h3 class="boxHeding">{{$t('marketing.teachers_slideHeading_1')}}</h3>
                                        {{$t('marketing.teachers_slide_txt_1')}}
                                     </div>
                                  </slide>
                                  <slide>
                                     <div class="foldTestmBox">
                                        <h3 class="boxHeding">{{$t('marketing.teachers_slideHeading_2')}}</h3>
                                        {{$t('marketing.teachers_slide_txt_2')}}
                                     </div>
                                  </slide>
                                  <slide>
                                     <div class="foldTestmBox">
                                        <h3 class="boxHeding">{{$t('marketing.teachers_slideHeading_3')}}</h3>
                                        {{$t('marketing.teachers_slide_txt_3')}}
                                     </div>
                                  </slide>
                                  <slide>
                                     <div class="foldTestmBox">
                                        <h3 class="boxHeding">{{$t('marketing.teachers_slideHeading_4')}}</h3>
                                        {{$t('marketing.teachers_slide_txt_4')}}
                                     </div>
                                  </slide>
                                  <slide>
                                     <div class="foldTestmBox">
                                        <h3 class="boxHeding">{{$t('marketing.teachers_slideHeading_5')}}</h3>
                                        {{$t('marketing.teachers_slide_txt_5')}}
                                     </div>
                                  </slide>
                               </carousel>
                            </div>
                          </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="swiper-slide">

            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_testimonial clearfix">
                         <div class="marktFoldBoxInner">
                            <div class="testimonial_quote">
                            <i class="material-icons quote_icon">&#xE244;</i>
                            <h3 class="testimonial_quote_txt">{{$t('marketing.testomonialStudent')}}</h3>
                            <i class="material-icons quote_icon quoteRignt">&#xE244;</i>
                            </div>
                            <div class="testimonialImg fadeInTestimon_img">
                              <img src="~assets/images/marketing/student3.png">
                            </div>

                          </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
          <div class="swiper-slide">

            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_testimonial clearfix">
                         <div class="marktFoldBoxInner">

                            <div class="testimonial_quote testimonial_quoteRight">
                            <i class="material-icons quote_icon">&#xE244;</i>
                            <h3 class="testimonial_quote_txt">{{$t('marketing.testomonialTeacher')}}</h3>
                            <i class="material-icons quote_icon quoteRignt">&#xE244;</i>
                            </div>
                            <div class="testimonialImg fadeInTestimon_img testimonialImgRight fadeInTestimon_imgLeft">
                              <img src="https://s3-eu-west-1.amazonaws.com/fuse-public-assets/Website3/images/rhys giles.png">
                            </div>

                          </div>
                     </div>
                  </div>
               </div>
            </div>
         </div> -->
         <!-- <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_contPartner clearfix">
                       <div class="marktFoldBoxInner">
                            <h2 class="hedingTabfold">{{$t('marketing.content_partners')}}</h2>
                            <div class="mrktCleintSec slideInUp">
                               <img src="~assets/images/marketing/client_1.png" class="clientImg">
                               <img src="~assets/images/marketing/client_2.png" class="clientImg">
                               <img src="~assets/images/marketing/client_3.png" class="clientImg">
                               <img src="~assets/images/marketing/client_4.png" class="clientImg">
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div> -->
         <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_Subscribe clearfix">
                        <div class="foldBoxSubsContent">
                           <h2 class="hedingTabfold">{{$t('marketing.join_playground')}}</h2>
                           <p class="foldSubscTxt">{{$t('marketing.join_playground_txt')}}</p>
                          <div class="subsBtnSec">
                            <button type="button" class="btn subsBtn slideInUp" @click="requestTrialPop(true)">{{$t('marketing.free_trial')}}</button>
                            <button type="button" class="btn subsBtn slideInUp" @click="moveToSignUp">{{$t('marketing.subscribe')}}</button>
                          </div>
                           <div class="appLinkSec slideInUp animationFold_2">
                              <a href="#" class="appBtn" id="appStoreUrl"><img src="~assets/images/marketing/appstore.png"></a>
                              <a href="#" class="appBtn" id="playStoreUrl"><img src="~assets/images/marketing/playstore.png"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="swiper-slide">
           <!-- <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div> -->
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <contact-us-footer platform="web"/>
                  </div>
               </div>
            </div>
         </div>
         <!-- marketing  fold starts  -->
      </div>
      <div class="customPaging swiper-pagination swiper-pagination-bullets" ref="mySwiper"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>



</div>


    <!-- Feature slider starts -->


<!-- <div id="marketingPageScrolling2">

    <div v-swiper:mySwiperw="swiperOption2">
      <div class="swiper-wrapper">
    <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
             <div class="marktFoldOuter">
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_2 clearfix">
                           <div class="foldActionBtnSec">
                              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                           </div>
                         <div class="marktFoldBoxInner">

                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent content_2">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.gamified_learning')}}</h2>
                                     <p class="tabInfoTxt">{{$t('marketing.gamified_learning_txt_1')}}</p>
                                     <p class="tabInfoTxt">{{$t('marketing.gamified_learning_txt_2')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">
                                     <img src="~assets/images/marketing/gamified_learning.svg">
                                  </div>
                               </div>
                            </div>
                          </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
         <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter">
               <div class="mrktSlider marktFoldSec foldBg_Blue">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_3 clearfix">
                           <div class="foldActionBtnSec">
                             <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                           </div>
                        <div class="marktFoldBoxInner">
                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent clearfix content_3">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.peer_interaction')}}</h2>
                                     <p class="tabInfoTxt">{{$t('marketing.peer_interaction_txt')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">
                                       <p class="peerProfileNametop">{{$t('marketing.peerImgTxtUser1')}}</p>
                                     <div class="peerDynImgTxtTop">
                                       <p class="peerTxtTime">{{$t('marketing.peerImgTxtTime')}}</p>
                                       <p class="peerDynImgTxtComment">{{$t('marketing.peerImgTxtComment')}}</p>
                                       <p class="peerDynResrceTxt">{{$t('marketing.peerImgTxtResource')}}</p>
                                     </div>
                                       <p class="peerProfileNameBot">{{$t('marketing.peerImgTxtUser2')}}</p>
                                     <div class="peerDynImgTxtBottom">
                                       <p class="peerTxtTime">{{$t('marketing.peerImgTxtTime')}}</p>
                                       <p class="peerDynImgTxtComment">{{$t('marketing.peerImgTxtThanks')}} <strong>Salim</strong>
                                       <span class="chatIcon">:)</span></p>
                                     </div>
                                     <img src="~assets/images/marketing/peer_interaction.png">
                                  </div>
                               </div>
                            </div>
                          </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
         <div class="swiper-slide">
           <div class="peekMaskot rubberBand">
                     <img src="~assets/images/icon_22.png">
                  </div>
            <div class="marktFoldOuter">

               <div class="mrktSlider marktFoldSec foldBg_Blue">

                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_1 clearfix">
                         <div class="foldActionBtnSec">
                            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                         </div>
                        <div class="marktFoldBoxInner">
                          <div class="foldBoxContentSec">
                             <div class="foldFeatureTabContent content_1">
                                <div class="tabInfo slideInUp">
                                   <h2 class="hedingTabfold">{{$t('marketing.track_progress')}}</h2>
                                   <p class="tabInfoTxt"> {{$t('marketing.track_progress_txt_1')}}</p>
                                   <p class="tabInfoTxt"> {{$t('marketing.track_progress_txt_2')}}</p>
                                </div>
                                <div class="tabImg slideInUp animationFold_2">
                                   <img src="~assets/images/marketing/track_progress.svg">
                                </div>
                             </div>
                          </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
         <div class="swiper-slide">
            <div class="peekMaskot rubberBand">
                <img src="~assets/images/icon_22.png">
            </div>
            <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec foldBg_Blue" :class="pageClassName">
                  <div class="mrkConMid">
                     <div class="marktFoldBox foldBox_4 clearfix">
                            <div class="foldActionBtnSec">
                              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
                            </div>
                         <div class="marktFoldBoxInner colorOuterFoldSec">
                            <div class="foldBoxContentSec">
                               <div class="foldFeatureTabContent content_4">
                                  <div class="tabInfo slideInUp">
                                     <h2 class="hedingTabfold">{{$t('marketing.personalised_theme')}}</h2>
                                     <p class="tabInfoTxt"> {{$t('marketing.personalised_theme_txt')}}</p>
                                  </div>
                                  <div class="tabImg slideInUp animationFold_2">

                                   <img v-if="pageClassName === 'b1'" src="~assets/images/marketing/theme_blue.svg">

                                   <img v-if="pageClassName === 'b2'" src="~assets/images/marketing/theme_red.svg">
                                   <img v-if="pageClassName === 'b3'" src="~assets/images/marketing/theme_violet.svg">
                                    <img v-if="pageClassName === 'b4'" src="~assets/images/marketing/theme_green.svg">

                                  </div>
                               </div>
                            </div>
                        </div>
                        <div class="foldThemeBtn">
                           <ul class="foldThemeBtnList">
                              <li class="theme_1" v-bind:class="{active: isActiveTab('b1')}"><a  class="bullet" v-on:click="changeClass('b1')"></a></li>
                              <li class="theme_2" v-bind:class="{active: isActiveTab('b2')}"><a  class="bullet" v-on:click="changeClass('b2')"></a></li>
                              <li class="theme_3" v-bind:class="{active: isActiveTab('b3')}"><a  class="bullet" v-on:click="changeClass('b3')"></a></li>
                              <li class="theme_4" v-bind:class="{active: isActiveTab('b4')}"><a  class="bullet" v-on:click="changeClass('b4')"></a></li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
 </div>



      <div class="swiper-button-prev2" slot="button-prev"></div>
      <div class="swiper-button-next2" slot="button-next"></div>
      
      </div>


   </div> -->
  <!-- marketing popup starts -->


















    <div class="introBuddyPopOverlay" style="display:none;" v-show="requestademopop">
      <div class="introBuddyPop">
        <span class="closePopBtn" @click="requestDemoPop(false)"><i class="material-icons">close</i></span>
        <h2 class="introByddyHeading">{{$t('marketing.introduce_budbee')}}</h2>
        <p class="introByddyTxt"> {{$t('marketing.tell_us')}}</p>
        <div class="regFormElements clearfix">
          <div class="inputRow clearfix">
              <div class="inputGroup">
                <label>{{$t('marketing.first_name')}} <span class="req">*</span></label>
                <input type="text" class="formControl" v-model="firstName">
              </div>
              <div class="inputGroup">
                <label>{{$t('marketing.last_name')}} <span class="req">*</span></label>
                <input type="text" class="formControl" v-model="lastName">
              </div>
          </div>
          <div class="inputRow clearfix">
              <div class="inputGroup">
                <label> {{$t('marketing.phone_number')}} <span class="req">*</span></label>
                <div class="contrySelect">
                   <div class="selectCtry">
                      <span class="icons select__arrow"></span>
                      <select v-model="selectedCountryCodeIndex" disabled>
                         <option :value="countryCode.countryId" v-for="(countryCode,index) in $store.state.register.countryList">{{countryCode.code}}</option>
                      </select>
                    </div>
                    <div class="contryCode" >{{getCountryCode}}</div>
                <input type="text" placeholder="" maxlength="10" @keypress="isNumber" v-model="phone" @change="verifyPrincipal('phone')" class="formControl"></div>
              </div>
              <div class="inputGroup">
                <label>{{$t('marketing.email_address')}} <span class="req">*</span></label>
                <input type="text" class="formControl" v-model="email" @change="verifyPrincipal('email')">
              </div>
          </div>
          <div class="inputRow clearfix">
              <div class="inputGroup">
                <label>{{$t('marketing.job_title')}} <span class="req">*</span></label>
                <select class="select_bg" v-model="job">
                         <option :value="job.name" v-for="job in this.$store.state.common.userJobTitle">{{$t(job.value)}}</option>
                </select>
              </div>
              <div class="inputGroup">
                <label>{{$t('register.city')}} <span class="req">*</span></label>
                <select class="select_bg" v-model="city">
                         <option :value="city.name" v-for="city in $store.state.register.cityList">{{city.name}}</option>
                </select>
              </div>
            </div>
            <div class="inputRow clearfix">
              <div class="inputGroup">
                <label>{{$t('marketing.hear_about_us')}}</label>
                <select class="select_bg" v-model="hear">
                  <option :value="hear.name" v-for="hear in this.$store.state.common.userhearAboutTitle">{{$t(hear.value)}}</option>
                </select>
              </div>
            </div>
          <div class="inputRow clearfix">
          <button class="btn btn-primary btnRequestDemo"  @click="submitRequest()">{{$t('marketing.request_demo')}}</button>
          </div>
        </div>
      </div>
   </div>
   <!-- marketing popup ends -->

   <!-- free trial popup starts -->

   <div class="introBuddyPopOverlay" style="display:none;" v-show="requesttrialpop">
     <div class="introBuddyPop">
       <span class="closePopBtn" @click="requestTrialPop(false)"><i class="material-icons">close</i></span>
       <h2 class="introByddyHeading">{{$t('marketing.introduce_budbee')}}</h2>
       <p class="introByddyTxt"> {{$t('marketing.freeTrialWarn')}}</p>
       <div class="regFormElements clearfix">
         <div class="inputRow clearfix">
         <button class="btn btn-primary btnRequestDemo"  @click="tour">{{$t('marketing.free_trial')}}</button>
         </div>
       </div>
     </div>
  </div>
    <!-- free trail popup ends -->




</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import languageSelectBox from '~/components/languageSelectBox'
import contactUsFooter from '~/components/contactUsFooter'
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
         requesttrialpop:false,
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
             mousewheel: false,
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
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
           },
           swiperOption2: {
             direction: 'vertical',
             slidesPerView: 1,
             effect: 'fade',
             spaceBetween: 0,
             speed:100,
             keyboard: true,
             mousewheel: false,
             initialSlide: 0,
             allowTouchMove: true,
             pagination: {
               el: '.swiper-pagination2',
               clickable: true
             },
              breakpoints: {
                1110: {
                  allowTouchMove: true
                }
              },
              navigation: {
                nextEl: '.swiper-button-next2',
                prevEl: '.swiper-button-prev2',
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
    tour() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/tour`))
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
     requestTrialPop(a){
      //alert('');
      this.requesttrialpop = a
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

     var akashVid = document.getElementById("marktVideo")
 
     
      this.$store.state.applicationProperties.forEach((item, index) => {
        if (item.name == "APP_STORE_URL") {
          document.getElementById("appStoreUrl").href = item.value;
        }
        if (item.name == "PLAY_STORE_URL") {
          document.getElementById("playStoreUrl").href = item.value;
        }
      });
      //Scroll - Touchpad Slide
      var timer;
      var scrollTimer = false;
      var count = 0;
      document.getElementById("marketingPageScrolling").addEventListener('wheel', function(e) {
          if(count > 0){
            return false;
          }
         count = ++count;
            parseScroll(e);
            window.clearInterval(scrollTimer);
           scrollTimer = window.setTimeout(function() {
            count = 0;
          },1200);
      });
      function parseScroll(e) {
        if (e.deltaY > 0) {
           document.querySelector('#marketingPageScrolling .swiper-button-next').click();
        }
        if (e.deltaY < 0) {
          document.querySelector('#marketingPageScrolling .swiper-button-prev').click();
        }
      }
      //Scroll - Touchpad Slide


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
     this.$root.$on('panelBack', (panel) => {
      if(panel) {
        this.toSlide('11')
      }
     })
  },
  components: {
     Carousel, Slide, languageSelectBox, contactUsFooter
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
