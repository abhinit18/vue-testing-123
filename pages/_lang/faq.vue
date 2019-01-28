<template>
      <div class="stataticPageOuter marketingPage marktPgTc">

      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <staticPageHeader :back="back" :platform="platform"/>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition clearfix">
                           <div class="termCondInner">
                             <h2 class="hedingTabfold">{{$t('common.faqs')}}</h2>
                              <div class="termConContent">
                                <ul class="queAnsSec">
									<li :class="{active: selectedId === index}" @click="toggleSelectedId(index)" v-bind:id="index" v-for="(faq, index) in faqs">
										<h3 class="queRow"> {{$t(faq.ques)}}  <span class="qusArrow"><i class="material-icons ico1">&#xE148;</i><i class="material-icons ico2">&#xE15D;</i></span></h3>
										<div class="ansSec" v-html="$t(faq.ans)"> </div>
									</li>
								</ul>
                            </div>
                         </div>
                       <contactUsFooter :platform="platform"/>
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
			title: this.$t('common.faqs'),
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
			  ans: 'common.faqText1'
		  },
		  {
			  ques: 'common.faq2',
			  ans: 'common.faqText2'
		  },
		  {
			  ques: 'common.faq3',
			  ans: 'common.faqText3'
		  },
		  {
			  ques: 'common.faq4',
			  ans: 'common.faqText4'
		  }]
	  }
  },
  methods: {
	  back () {
		  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
	  },
	  toggleSelectedId (id) {
	  	  if (this.selectedId === id) {
	  	  		this.selectedId = ''
	  	  }  else {
	  	  		this.selectedId = id
	  	  }
	  },
	  closePopup() {
	      this.$router.back();
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

<style>
	.termCondInner .pclose{ right: 10px }
</style>
