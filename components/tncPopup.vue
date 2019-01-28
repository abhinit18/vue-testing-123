<template>
<div style="display: block" >
        <div class="modal fade in selectUserTypePopup showTermsPopUp" >
          <div class="modal-dialog" role="document" v-on-click-outside="close">
            <div class="modal-content" >
              <a class="pclose" @click="close" ><span><i class="material-icons">&#xE5CD;</i></span></a>
              <h3>{{$t('register.terms_conditions')}}</h3>
              <br>
              <div class="termsScrollOuter" v-on:scroll="akash">
                <div class="termsScroll text-left" ref="mountingDiv">
                
                </div>
              </div>

              <div class="regFormElements">
                <div class="btns">
                  <button class="btn btn-block btn-primary" :disabled="afterRead" @click="agreeTerms">{{$t('register.i_agree_this')}}</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="modal-backdrop fade in"></div>
</div>
</template>

<script>
 export default {
     props: ['agreeTerms', 'close', 'selectedLang'],
     mounted () {
         this.$store.dispatch('common/fetchStaticPage', {
        name: 'TNC',
        langCode: this.selectedLang?this.selectedLang:(this.locale? this.locale : this.$store.state.locale.selectedLocale)
      }).then(response => {
        console.log("selectedLang ",this.selectedLang);
        if (response.data && response.data.status === 'SUCCESS') {
          if (response.data.staticPages && response.data.staticPages.length>0) {
            this.page = response.data.staticPages[0]
            this.readHtmlFromUrlAndSet(this.page.url)
          }
        }
      })
     },
    data() {
      return {
        page: {},
        afterRead: true
      }
    },
    methods: {
        akash(){
          var el = document.querySelector('.termsScrollOuter').scrollTop;
          var el2 = document.querySelector('.termsScroll').clientHeight - 300;
          //console.log(el);
          //console.log(el2);      
          //  alert('aaksh');

          if(el >= el2){
            this.afterRead = false
          }

          //console.log(el.innerHeight());      
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
      }
    }
 }
</script>
<style>
.termsScroll table{ max-width: 100%!important}
.termsScroll div{ max-width: 100%!important}
/* .showTermsPopUp .modal-content { 
    max-height: 400px;
    overflow: auto;} */
    .termsScrollOuter {
    height: 220px;
    overflow-y: auto;
    padding: 0 30px 0 0;
}

    .termsScrollOuter  .termsScroll{ height: auto; overflow: visible; }

</style>