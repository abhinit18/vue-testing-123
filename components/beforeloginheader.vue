<template>
  <div>
    <header class="header beforeloginh clearfix">
      <div class="headMid clearfix">
        <div class="container">
          <div class="logo pull-left">
            <!-- <a @click="navToMain">{{$t('index.brandLogo')}}</a> -->
            <router-link :to="$store.getters['locale/getFinalUrl']('/marketing')"><img src="~assets/images/logo.svg"></router-link>
          </div>

          <ul class="userMenu pull-right">
            <li v-if="showLangSwitch">
              <languageSelectBox/>
            </li>
            <li>
              <div class="loginBtn" v-if="showSignIn">
                <router-link :to="$store.getters['locale/getFinalUrl']('/login')">{{$t('register.sign_in')}}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="showActivationActionPopup">
       
       <div class="deletePostPop blockReportPostPop" v-if="(dataParam.btnActionName === 'activate')">
        <div class="deletePostPopInner">
          <div class="full-width" >

            <div class="text">

              <h4>{{$t('activationPopup.activation_text1')}} {{dataParam.btnActionName}} {{$t('activationPopup.activation_text2')}} ?</h4>
            </div>
            <div class="btns">

              <button class="btn btn-primary" @click="hidePopup">{{$t('note.cancel')}}</button>
               <button class="btn btn-bordered" @click="activateAccount(dataParam)">
                 <span>{{$t('common.userOk')}}</span>
               </button>

            </div>
          </div>
         
          <!-- <div class="full-width" v-if="(dataParam.btnActionName === 'payment')">

            <div class="text">
              <h4>{{$t('comment.termsText')}}</h4>
            </div>
            <div class="btns">
              <button class="btn btn-block btn-primary" @click="agreeDummyTerms">{{$t('register.i_agree_this')}}</button>
            </div>
          </div> -->
    </div>
  </div>


 <tnc-popup :agreeTerms="agreeTerms" :close="closeTncPopup" v-if="(dataParam.btnActionName === 'payment')"/>
</div>


    </header>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import apiUrls from '../config/apiUrls'
import languageSelectBox from '~/components/languageSelectBox'
import tncPopup from '~/components/tncPopup'
  export default {
    data() {
      return {
        onMouseover: false,
        showLangSwitch: false,
        showSignIn: true,
        showActivationActionPopup: false,
        dataParam: {},
      }
    },
    components: {languageSelectBox, tncPopup},
    beforeDestroy () {
            this.$root.$off('showActivationActionPopup')
            this.$root.$off('hideActivationActionPopup')
        },
    mounted() {
    let forTourUrl = this.$router.currentRoute.fullPath
    let tourUrl = forTourUrl.split('?')
    let checkTourUrl = tourUrl[tourUrl.length - 1]
    let splitTourUrl = checkTourUrl.split('&')
    if(splitTourUrl[0] === 'tour=true') {
        let langparam = splitTourUrl[1].split('=')
        // let urlParam = splitTourUrl[2].split('&')
        let forNavtoMain = splitTourUrl[2].split('%40')
        let domainUrl = forNavtoMain[1].split('=')
        let loginId = forNavtoMain[0]+'@'+domainUrl[0]
        let password = 'Password@123'
      if(this.$store.state.initialData.userId) {
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
          this.$store.dispatch('auth/login', {
          email: loginId,
          password: password,
          remember: this.rememberMe,
          context: this,
          langCode: langparam[1]
        })
          .then(response => {
            this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: this.$store.state.locale.locales
              })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children[0]
                this.$store.dispatch('updateChildId', {childObj: response.data.children[0]})
              }
              if(response.data.roles[0]=== 'STUDENT'||response.data.roles[0]=== 'TEACHER' || response.data.roles[0]=== 'PARENT') {
                if (response.data.firstLogin) {
                  this.firstLogin = true
                }
                else{
                  if (response.data.roles[0]=== 'PARENT') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                  }else {
                    if(!response.data.onboarding) {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
                    }else {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                    }
                  }
                }
              }
          }, (error) => {
              console.log(error)
          })
        })
      }else{
          this.$store.dispatch('auth/login', {
          email: loginId,
          password: password,
          remember: this.rememberMe,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
          .then(response => {
              this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: this.$store.state.locale.locales
              })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children[0]
                this.$store.dispatch('updateChildId', {childObj: response.data.children[0]})
              }
              if(response.data.roles[0]=== 'STUDENT'||response.data.roles[0]=== 'TEACHER' || response.data.roles[0]=== 'PARENT') {
                if (response.data.firstLogin) {
                  this.firstLogin = true
                }
                else{
                  if (response.data.roles[0]=== 'PARENT') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                  }else {
                    if(!response.data.onboarding) {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
                    }else {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                    }
                  }
                }
              }
          }, (error) => {
              console.log(error)
          })
      }

    }
      this.$root.$on('showActivationActionPopup', ({dataParam}) => {
        this.showActivationActionPopup = true;
        this.dataParam = dataParam;
      })
      this.$root.$on('showLangCodeActive', ({dataParamObj}) => {
        let webPathname = dataParamObj
        let webUrl = webPathname.split('/').reverse()
        if(webUrl[0] === 'login' || webUrl[0] === 'userLogin') {
          this.showLangSwitch = true;
        }else {
          this.showLangSwitch = false;
        }
        if(webUrl[0] === 'onboarding'||webUrl[0] === 'login'||webUrl[0] === 'userLogin'||webUrl[1] === 'register') {
          this.showSignIn = false
        }else{
          this.showSignIn = true
        }
      })
      this.$root.$on('hideActivationActionPopup', ({}) => {
        this.showActivationActionPopup = false;
      })
    },
    methods: {
      changeLanguage(event) {
        if (event.target.value !== '-1') {
          this.$store.dispatch('locale/setlanguage', {
            context: this,
            locale: event.target.value,
            locales: this.$store.state.locale.locales
          })
          if (this.i18n) {
            this.i18n.locale = event.target.value
          }
        }
      },
      agreeDummyTerms() {
        //this.$toast.success(this.$t('toastMsg.registerSuccess'));
        // this.$root.$emit('hideActivationActionPopup', {})

        this.showActivationActionPopup = false
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`))
        // setTimeout(() => {
        //   this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`));
        // }, 400)
      },
      activateAccount(value) {
        this.$store.dispatch('auth/activateUserDecativatedAccount', {
          email: value.payloadDataObj.email,
          password: value.payloadDataObj.password,
          context: value.context,
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
          if(response.data.status === 'SUCCESS') {
            //this.$root.$emit('hideActivationActionPopup', {})
            this.showActivationActionPopup = false
              this.$store.dispatch('auth/login', {
                email: value.payloadDataObj.email,
                password: value.payloadDataObj.password,
                context: value.context
              }).then(response => {
                if(response.data) {
                  if(response.data.roles[0] === 'PARENT'){
                    this.$router.push(this.$store.getters['locale/getFinalUrl']('/myprogress'))
                    if(response.data.children) {
                      let defaultChild = response.data.children
                      this.$store.dispatch('updateChildId', {childObj: response.data.children})
                    }

                  }else{
                  this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                  }
                }
              })

          }
        })
      },
      whitelistLogout(value) {
        let userId = value.payloadDataObj.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
          if(response.data.status === 'SUCCESS') {
            //this.$root.$emit('hideActivationActionPopup', {})
            this.showActivationActionPopup = false
          }
        })
      },
      hidePopup() {
        this.showActivationActionPopup = false
        // this.$root.$emit('hideActivationActionPopup', {})
      },
      // makeLink (link) {
      //   let l = '/' + this.$store.state.locale.selectedLocale
      //   if (link.match(/^\//) === null) {
      //     l += '/'
      //   }
      //   l += link
      //   return l
      // },
      logout() {
        this.$store.dispatch('auth/logout', {
          authToken: this.$store.state.auth.user.token,
          userId: this.$store.state.auth.user.userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        })
      },
      materialIconCode(header) {
        return header.icon
      },
      mHover() {
        this.onMouseover = true
      },
      mOut() {
        this.onMouseover = false
      },
      closeTncPopup() {
        this.dataParam.btnActionName = '';
      },
      agreeTerms() {
        this.showActivationActionPopup = false
        console.log(localStorage.getItem('isParent'))
          if(localStorage.getItem('isParent')){
            let userId = this.$store.state.initialData.userId
                    this.$store.dispatch('auth/logout', {
                      deviceId: 'WEB',
                      userId: userId,
                      context: this,
                      langCode: this.selectedLang
                    }).then(response => {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/ParentReg'))
                      localStorage.removeItem('isParent')
                    })
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`))
          }
      }
    }
  }
</script>

<style>

</style>
