<template>
 <div class="marktFoldBox foldBox_ContactUs" v-if="platform==='web'">
    <div class="marktFoldBoxInner">
    <div class="foldBoxContactInner clearfix">
        <div class="colsBoxFollowUs">
          <h3 class="colsHeading">{{$t('marketing.follow_us')}}</h3>
          <ul class="socialIcons text-center">
              <li>
                <a href="https://www.facebook.com/budbeed/" target="_blank">&nbsp;
                  <span class="iconsImg icon_3"></span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/budbeed/" target="_blank">&nbsp;
                  <span class="iconsImg icon_4"></span>
                </a>
              </li>
            </ul>
        </div>
        <div class="colsBoxContact">
          <h3 class="colsHeading">{{$t('marketing.contact_us')}}</h3>
          <div class="contcTxtBox" v-html="$t('marketing.Address')"></div>
          <div class="contcTxtBox">
              +7 7273110413<br>
              <a href="#">contact@budbee.kz</a>
          </div>
        </div>
    </div>
      <div class="footerLinkSec">
        <ul class="footerLinks">
          <!-- <li><router-link :to="$store.getters['locale/getFinalUrl']('/media')">{{$t('marketing.flinkMedia')}}</router-link></li> -->
          <!-- <li><router-link :to="$store.getters['locale/getFinalUrl']('/faq')">{{$t('marketing.flinkFaq')}}</router-link></li> -->
          <li><router-link :to="$store.getters['locale/getFinalUrl']('/partners')">{{$t('marketing.flinkPartners')}}</router-link></li>
          <li><router-link :to="$store.getters['locale/getFinalUrl']('/helpdesk')">{{$t('marketing.flinkHelpdesk')}}</router-link></li>
          <li><router-link :to="$store.getters['locale/getFinalUrl']('/career')">{{$t('marketing.flinkCareers')}}</router-link></li>
          <li><router-link :to="$store.getters['locale/getFinalUrl']('/legal')">{{$t('marketing.flinkLegal')}}</router-link></li>
        </ul>
    </div>
    <!-- &copy; 2018 Budbee --> 
     <span v-html="$t('common.footer')"></span>
    </div>
    <div class="masKotImg slideUp">
        <img src="~assets/images/icon_222.png">
    </div>
</div>
</template>

<script>
export default {
  props: ['platform']
}
</script>