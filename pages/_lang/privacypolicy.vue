<template>
      <div class="marketingPage marktPgTc">
      <div class="marktFoldOuter" >
               <div class="mrktSlider marktFoldSec">
                        <static-page-header :back="back" :platform="platform"/>
                  <div class="mrkConMid">
                     <div class="marktFoldBox termCondition clearfix">
                           <div class="termCondInner">
                             <h2 class="hedingTabfold">{{page.title}}<!-- {{$t('marketing.content_partners')}} --></h2>
                              <!-- <ol class="breadcrumb">
                                <li><a href="#">LEGAL</a></li>
                                <li class="active">Privacy Policy for Budbee App</li>
                              </ol> -->
                              <div class="termConContent">
                                <div ref="mountingDiv"></div>
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
    mounted() {
      this.$store.dispatch('common/fetchStaticPage', {
        name: 'PRIVACYPOLICY',
        langCode: this.locale? this.locale : this.$store.state.locale.selectedLocale
      }).then(response => {
        if (response.data && response.data.status === 'SUCCESS') {
          if (response.data.staticPages && response.data.staticPages.length>0) {
            this.page = response.data.staticPages[0]
            this.readHtmlFromUrlAndSet(this.page.url)
          }
        }
      })
    },
    head() {
      return {
        title: this.$t('common.privacypolicy'),
        bodyAttrs: {
         class: 'staticBody'
       }
      }
    },
    layout: 'static',
    data() {
      return {
        page: {}
      }
    },
    methods: {
      back() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
      },
      readHtmlFromUrlAndSet(url) {
        //reading file from s3 server
        var xhr = new XMLHttpRequest();
        let vm = this
        xhr.onload = function() {
          let rawData = new XMLSerializer().serializeToString(this.responseXML.body)
          let mountingDiv = vm.$refs["mountingDiv"]
          mountingDiv.innerHTML += rawData
        };
        xhr.open('GET', url + '?_=' + new Date().getTime());
        xhr.responseType = 'document';
        xhr.send();
      },
    closePopup() {
        this.$router.back();
      }
    },
    asyncData(context) {
      const platform = context && context.req && context.req.headers["platform"] ? context.req.headers["platform"] : 'web'
      let locale = undefined
      if (context && context.req && context.req.headers["accept-language"] ) {
        locale = context.req.headers["accept-language"]
        if (locale && locale.length>2) {
          locale = undefined
        }
      }
      return {
        platform, locale
      }
    }
  }
</script>
