<template>
      <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <static-page-header :back="back" :platform="platform"/>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition  clearfix">

                        <div class="partnersPage foldZoomIn">
                            <h2 class="hedingTabfold">{{$t('marketing.content_partners')}}</h2>
                            <div class="mrktCleintSec slideInUp">
                               <img src="~assets/images/marketing/client_1.png" class="clientImg">
                               <img src="~assets/images/marketing/client_2.png" class="clientImg">
                               <img src="~assets/images/marketing/client_3.png" class="clientImg">
                               <img src="~assets/images/marketing/client_4.png" class="clientImg">
                            </div>
                          </div>

                        <contact-us-footer :platform="platform"/>
                     </div>
                     
                  </div>
               </div>
            </div>
</div>
      
</template>
<script>
import contactUsFooter from '~/components/contactUsFooter'
import staticPageHeader from '~/components/staticPageHeader'
export default {
	components: {
      staticPageHeader, contactUsFooter
    },
	head () {
			return {
			title: this.$t('common.partnerstitle'),
       bodyAttrs: {
         class: 'staticBody'
       }
			}
		},
  layout: 'static',
  data () {
	  return {
		  selectedId: 0,
		  faqs: [{
			  ques: 'common.faq1',
			  ans: 'common.faqText'
		  }, 
		  {
			  ques: 'common.faq2',
			  ans: 'common.faqText'
		  },
		  {
			  ques: 'common.faq3',
			  ans: 'common.faqText'
		  },
		  {
			  ques: 'common.faq4',
			  ans: 'common.faqText'
		  }]
	  }
  },
  methods: {
	  back () {
		  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
	  },
	  toggleSelectedId (id) {
		  this.selectedId = id
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
  }
}
</script>
