<template>
      <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <static-page-header :back="back" :platform="platform"/>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition clearfix">
                           <div class="termCondInner">
                             <h2 class="hedingTabfold">{{$t('career.career_heading')}}</h2>
                             <div class="row">
                                  <div class="col-sm-6 carerProfileCols">
                                  <a href="#" class="carerProfileName">{{$t('career.designerProfile')}}</a>
                                    <p class="carerProfileDes">{{$t('career.careerDecDesigner')}}</p>
                                    <p class="carerProfileLoc">{{$t('career.careerLocation')}}</p>
                                </div>
                                <div class="col-sm-6 carerProfileCols">
                                  <a href="#" class="carerProfileName">{{$t('career.managerProfile')}}</a>
                                    <p class="carerProfileDes">{{$t('career.careerDecManager')}}</p>
                                    <p class="carerProfileLoc">{{$t('career.careerLocation')}}</p>
                                </div>
                            </div>
                             <div class="row">
                                <div class="col-sm-6 carerProfileCols">
                                  <a href="#" class="carerProfileName">{{$t('career.researcherProfile')}}</a>
                                    <p class="carerProfileDes">{{$t('career.careerDecDesigner')}}</p>
                                    <p class="carerProfileLoc">{{$t('career.careerLocation')}}</p>
                                </div>
                                <div class="col-sm-6 carerProfileCols">
                                  <a href="#" class="carerProfileName">{{$t('career.engineerprofile')}}</a>
                                    <p class="carerProfileDes">{{$t('career.careerDecDesigner')}}</p>
                                    <p class="carerProfileLoc">{{$t('career.careerLocation')}}</p>
                                </div>
                             </div>
                              <div class="row carerContTxtSec">
                                <div class="col-sm-6 carerContTxt">
                                   <h3 class="carerContTxtHeading">{{$t('career.carerApproch')}}</h3>
                                   <p>{{$t('career.carerApprochTxt')}}</p>
                                </div>
                                <div class="col-sm-6">
                                  <img class="img-responsive" src="~assets/images/static/careerApproch.jpg">
                                </div>
                              </div>
                               <div class="row carerContTxtSec">
                                <div class="col-sm-6 carerContTxt">
                                   <h3 class="carerContTxtHeading">{{$t('career.carerCollaborate')}}</h3>
                                   <p>{{$t('career.carerApprochTxt')}}</p>
                                </div>
                                <div class="col-sm-6">
                                  <img class="img-responsive" src="~assets/images/static/careerCollabrt.jpg">
                                </div>
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
			title: this.$t('common.careertitle'),
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
      let panel = 1
      this.$root.$emit('panelBack', (panel))
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
