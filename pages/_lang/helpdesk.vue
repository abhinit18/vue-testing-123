<template>
      <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <static-page-header :back="back" :platform="platform"/>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition clearfix">
                           <div class="termCondInner">
                             <h2 class="hedingTabfold">{{$t('helpdesk.help_desk_heading')}}</h2>
                             <div class="staticPgContentSec">
                               <p class="helpDeskContTxt">
                               {{$t('helpdesk.phoneNum')}}
                               </p>
                               <p class="helpDeskContTxt">
                                {{$t('helpdesk.email')}}
                               </p>
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
			title: this.$t('common.helpdesktitle'),
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
