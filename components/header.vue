<template>
  <div class="topHeaderSectionRow">
   <div class="editThemeOverlay" v-if="showEditTheme">
      <editTheme/>
  </div>
  <div class="editThemeOverlay" v-if="showExpiryPopup">
        <subscriptionExpiryAlert />
  </div>
  <div class="editThemeOverlay" v-if="showGradeChangePopup">
        <gradeChangePopup />
  </div>
  <div class="postPopViewSec" v-if="showPostPopup">
    <div class="popInnner">
      <a class="pclose" @click="closePostPopupMethod"><span><i class="material-icons">&#xE5CD;</i></span> {{$t('settings.close')}}</a>
        <commentPopup :post="postData"/>
       </div>
  </div>
    <header class="header clearfix">
      <div class="headMid clearfix">
        <div class="container">
          <!-- :onConfirm="deletePost" :onCancel="toggleDeletePopup" -->
          <confirmpopup v-if="isConfirmPopupOpen" :deleteObject="deleteObject" :onCancel="toggleConfirmPopup"/>
          <div class="logo pull-left">
            <!-- <a @click="navToMain">{{$t('index.brandLogo')}}</a> -->
            <a @click="navToMain" class="logoNotPrimary"> <img src="~assets/images/logo.svg"> </a>
            <a @click="navToMain" class="logoPrimary"> <img src="~assets/images/logo_primary.svg"> </a>
          </div>


          <ul class="userMenu pull-right">


            <li v-on:mouseenter="mHover3">
              <languageSelectBox/>
            </li>
            <li >
              <a @click="openSearch">
                <i class="icons searchico"></i>
              </a>
            </li>
            <li v-bind:class="onMouseover?'mopen':'mclose'">
              <span class="hcounter" v-if="$store.state.locale.newNotificationCount>0">{{$store.state.locale.newNotificationCount}}</span>
              <a v-on:mouseenter="mHover">

                <i class="icons notiIco"></i>

              </a>
              <div v-on:mouseleave="mOut" >
                <notification  v-if="onMouseover" />
              </div>

            </li>
            <li v-on:mouseenter="mHover4" v-bind:class="onMouseoverSelectChildEff?'mopen':'mclose'" v-if="$store.getters['isParent']()" class="pSelectChildLink" v-on:mouseleave="mOut4" >
              <childSelectBox  />
            </li>
            <li class="stngBnt" style="z-index:9999999;" v-bind:class="onMouseoverEff?'mopen':'mclose'">
              <a v-on:mouseenter="mHover2">
                <i class="icons setIcon"></i>
              </a>
              <div class="dropdown-menu"  v-on:mouseleave="mOut2">
              <div class="uLinksInnerBox" >
                <ul>
                 <li v-if="isTour">
                   <a :href="tourNavUrl + this.$store.state.locale.selectedLocale + '/register'">
                     {{$t(`common.subscription`)}} <span>{{$t('profile.subscription_need')}}</span>
                   </a>
                </li>
                <li class="subscripsn" v-if="!this.$store.getters['isParent']() && !isTour">
                  <!-- {{$t('common.today')}} -->
                  <router-link v-if="$store.state.initialData.expiryDays < 0" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.subscription_expired')}}</span> </router-link>
                  <router-link v-if="$store.state.initialData.expiryDays === 0" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.subscription_expiry_short')}} <i> {{$t('common.today')}}</i></span> </router-link>
                  <router-link v-if="$store.state.initialData.expiryDays === 1" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.subscription_expiry_short')}} <i> {{$t('common.tomorrow')}}</i></span> </router-link>
                  <router-link v-if="$store.state.initialData.expiryDays > 1" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.subscription_expiry')}} <i><i>{{$store.state.initialData.expiryDays }}</i> {{$t('activity.days')}}</i></span> </router-link>
                </li>
                <li class="subscripsn" v-if="this.$store.getters['isParent']() && !isTour">
                  <router-link v-if="$store.state.currentSelectedChild.expiryDays <= 0 && $store.state.currentSelectedChild.isFirstPaymentDone === false" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.child_subscription_pending')}}</span> </router-link>
                  <router-link v-if="$store.state.currentSelectedChild.expiryDays < 0 && $store.state.currentSelectedChild.isFirstPaymentDone === true" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.child_subscription_expired')}}</span> </router-link>
                  <router-link v-if="$store.state.currentSelectedChild.expiryDays === 0" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.child_subscription_expiry_short')}} <i> {{$t('common.today')}}</i></span> </router-link>
                  <router-link v-if="$store.state.currentSelectedChild.expiryDays === 1" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.child_subscription_expiry_short')}} <i> {{$t('common.tomorrow')}}</i></span> </router-link>
                  <router-link v-if="$store.state.currentSelectedChild.expiryDays > 1" :to="$store.getters['locale/getFinalUrl']('/mySubscription')">{{$t(`common.subscription`)}} <span>{{$t('profile.child_subscription_expiry')}} <i><i>{{$store.state.currentSelectedChild.expiryDays }}</i> {{$t('activity.days')}}</i></span> </router-link>
                </li>
                <li v-if="!whatsNew">
                  <router-link :to="$store.getters['locale/getFinalUrl']('/notification?type=FEATURED_CONTENT_UPLOAD')">{{$t(`common.whatsnew`)}}</router-link>
                </li>
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/setting')">{{$t(`common.setting`)}}</router-link>
                </li>
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/editprofile')">{{$t(`profile.editProfile`)}}</router-link>
                </li>
                <li v-if="!$store.getters['isParent']()">
                  <router-link :to="$store.getters['locale/getFinalUrl']('/redeem')">{{$t(`common.redeemcoins`)}}</router-link>
                </li>
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/help')">{{$t('common.help')}}</router-link>
                </li>

                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/faq')">{{$t(`common.faqs`)}}</router-link>
                </li>
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/tnc')">{{$t(`common.termsconditions`)}}</router-link>
                </li>
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/privacypolicy')">{{$t(`common.privacypolicy`)}}</router-link>
                </li>
                <!-- <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/aboutus')">{{$t(`common.aboutus`)}}</router-link>
                </li> -->
                <li>
                  <router-link :to="$store.getters['locale/getFinalUrl']('/feedback')">{{$t(`common.feedback`)}}</router-link>
                </li>


                <li>
                  <a @click="logout">{{$t(`common.logout`)}}</a>
                </li>
              </ul>
              </div>
              </div>
            </li>

          </ul>

          <nav class="nav" >

            <ul class="nav_main">

              <li v-bind:class="{ active: header.active }" v-for="(header,index) in $store.state.header.myHeader">
                <!--  <nuxt-link :to="$store.getters['locale/getFinalUrl'](header.link)"><i class="icons homeIco" v-html="materialIconCode(header)"></i>{{$t(`index.${header.name}`)}}</nuxt-link> -->
                <nuxt-link :to="$store.getters['locale/getFinalUrl']($store.getters['isParent']()&&header.name === 'home'?'/myprogress':header.link)"  v-bind:style="{backgroundColor:  (header.active ? '#'+$store.state.initialData.theme.color : ''), borderColor:  (header.active ? '#'+$store.state.initialData.theme.color : '')}"><i class="icons " :class="materialIconCode(header)"></i>{{$t($store.getters['isTeacher']()|| $store.getters['isParent']()? `teacher.${header.name}`: `index.${header.name}`)}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <btnActionPopup v-if="showActionPopup" :dataParam="dataParam"></btnActionPopup>
      <showGift :giftNotification="giftNotification" v-if="showGift"/>
      <div class="onBoardPop" style="position:fixed;z-index:9999;" v-if="congo">
         <div class="onBoardPopInner">
            <div class="successIco">
              <i class="material-icons">&#xE876;</i>
            </div>
            <h3 class="successTxt">{{$t('onboarding.awesome')}}!</h3>
            <p>{{$t('onboarding.success')}}.</p>
            <span class="closePopBtn" @click="congo = false"><i class="material-icons">close</i></span>
         </div>
       </div>
       <div class="abcOverlay" v-if="registerByParent">
          <div class="parentStuCardSec abcOverlayInner">
           <!-- verification popup box-->
              <div class="parentStuCard">
                <div class="parentStuHeadSec">
                    <!-- <button type="button" @click="registerByParent = false" class="btn btn-link closeBtn">
                    <i class="material-icons">close</i></button> -->
                    <p class="parentStuName">{{$t('parentLog.parentConfirmation')}}</p>
                </div>
                <!-- <div class="parntStuCardInner">
                    <p class="resultStatusPopTxt">
                    {{$t('parentLog.popTxt1')}}<br> {{$t('parentLog.popTxt2')}}
                    </p>
                </div> -->
                <div class="btmActionBtnSec text-right">
                    <!-- <button type="button" @click="registerByParent = false" class="btn btn-link btmActionBtn">
                      {{$t('common.cancel')}}
                    </button> -->
                    <button type="button" @click="goToPlans" class="btn btn-primary btmActionBtn">
                      {{$t('register.subscribe')}}
                    </button>
                </div>
              </div>
		       </div>
      </div>
      <div class="abcOverlay" v-if="removeByParent" style="z-index:9999999;">
          <div class="parentStuCardSec abcOverlayInner">
           <!-- verification popup box-->
              <div class="parentStuCard">
                <div class="parentStuHeadSec">
                    <!-- <button type="button" @click="registerByParent = false" class="btn btn-link closeBtn">
                    <i class="material-icons">close</i></button> -->
                    <p class="parentStuName">{{$t('parentLog.confirmPrompt')}}</p>
                </div>
                 <div class="parntStuCardInner">
                    <p class="resultStatusPopTxt">
                    {{$t('parentLog.confirmPromptText')}}
                    </p>
                </div>
                <div class="btmActionBtnSec text-right">
                     <button type="button" @click="removeByParent = false" class="btn btn-link btmActionBtn">
                      {{$t('common.cancel')}}
                    </button>
                    <button type="button" @click="removeChild" class="btn btn-primary btmActionBtn">
                      {{$t('register.RemoveChild')}}
                    </button>
                </div>
              </div>
		       </div>
      </div>
    </header>

  </div>
</template>

<script>
  import editTheme from '~/components/editTheme'
  import commentPopup from '~/components/view/post/commentPopup'
  import showGift from '~/components/showGift'
  import subscriptionExpiryAlert from '~/components/subscriptionExpiryAlert'
  import gradeChangePopup from '~/components/gradeChangePopup'
  import notification from '~/components/notification'
  import languageSelectBox from '~/components/languageSelectBox'
  import childSelectBox from '~/components/childSelect'
  import btnActionPopup from '~/components/ActionPopup'
  export default {
    data() {
      return {
        onMouseover: false,
        onMouseoverEff: false,
        onMouseoverSelectChildEff:false,
        isConfirmPopupOpen: false,
        showActionPopup: false,
        registerByParent: false,
        removeByParent: false,
        dataParam: {},
        currentId: '',
        deleteObject: {},
        showGift: false,
        isTour: false,
        tourNavUrl: '',
        whatsNew: false,
        forSubscription: false,
        congo: false,
        giftNotification: {},
        showEditTheme: false,
        showExpiryPopup: false,
        showPostPopup: false,
        showGradeChangePopup: false,
        postData: {}
      }
    },
    beforeDestroy () {
            this.$root.$off('openConfirmPopup')
            this.$root.$off('closeOnboardingPopupEmit')
            this.$root.$off('openOnboardingPopupEmit')
            this.$root.$off('showActionPopup')
            this.$root.$off('hideActionPopup')
            this.$root.$off('showGift')
            this.$root.$off('hideGift')
            this.$root.$off('openExpiryPopup')
            this.$root.$off('closeExpiryPopup')
            this.$root.$off('closeGradeChangePopup')
            this.$root.$off('closeEditTheme')
            this.$root.$off('openEditTheme')
            this.$root.$off('closePostPopup')
            this.$root.$off('openPostPopup')
            this.$root.$off('actionToast')
        },
    mounted () {
    if(this.$store.state.initialData.isTourUser) {
      this.isTour = true
      //if(this.$store.initialData)
        this.tourNavUrl = this.$store.state.initialData.navUrl
    }
    let forTourUrl = this.$router.currentRoute.fullPath

    if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays === 0 && this.$store.state.currentSelectedChild.isFirstPaymentDone === false){
      this.registerByParent = true
      this.whatsNew = true
    }else if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays < 0){
      this.registerByParent = true
      this.whatsNew = true
    }
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
      if(this.$store.state.initialData.userId && this.$store.state.auth.tour) {
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: langparam[1]
        }).then(response => {
          this.$store.dispatch('auth/login', {
          email: loginId,
          password: password,
          remember: this.rememberMe,
          context: this,
          langCode: langparam[1]
        })
          .then(response => {
            this.tourNavUrl = response.data.navUrl
              this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: langparam[1]
              })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children[0]
                this.$store.dispatch('updateChildId', {childObj: defaultChild})
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
          langCode: langparam[1]
        })
          .then(response => {
            this.tourNavUrl = response.data.navUrl
              this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: langparam[1]
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
      this.$root.$on('actionToast', (msgKey) => {
        //this.$toast.success(this.$t(msgKey))
      })
      this.$root.$on('openConfirmPopup', (deleteObj) => {
        this.deleteObject = deleteObj
        this.toggleConfirmPopup()
      })
      this.$root.$on('childExpiryPopUp', ({byParent,bySubs}) => {
        let webPathname = bySubs
        let firstPaymentDone = this.$store.state.currentSelectedChild.isFirstPaymentDone
        let webUrl = webPathname.split('/').reverse()
        if(webUrl[0]&&(webUrl[0] === 'mySubscription'||webUrl[0] === 'setting' ||webUrl[0] === 'postLoginAddChild' || webUrl[0] === 'editprofile')) {
          if(byParent === 0 && firstPaymentDone === false) {
          this.registerByParent = false
          }else if(byParent< 0 && firstPaymentDone === true) {
          this.registerByParent = false
          }
        }else{
          if(byParent< 0 && firstPaymentDone === true) {
            this.registerByParent = true
            this.whatsNew = true
            }else if(byParent === 0 && firstPaymentDone === false){
            this.registerByParent = true
            this.whatsNew = true
            }else{
              this.registerByParent = false
              this.whatsNew = false
            }
        }
        // else{
        //   this.registerByParent = false
        // }


      })
      this.$root.$on('closeOnboardingPopupEmit', ({done}) => {
        this.congo = false
      })
      this.$root.$on('removeChildByParent', ({child}) => {
        this.currentId = child.id
        this.removeByParent = true
      })
      this.$root.$on('openOnboardingPopupEmit', ({done}) => {
        if(done === true) {
            this.congo = true
        }
      })
      this.$root.$on('showActionPopup', ({dataParam}) => {
        this.showActionPopup = true;
        this.dataParam = dataParam;
      })
      this.$root.$on('hideActionPopup', ({}) => {
        this.showActionPopup = false;

      })
      this.$root.$on('showGift', ({giftNotification}) => {
        this.showGift = true;
        this.giftNotification = giftNotification;
      })
      this.$root.$on('hideGift', ({}) => {
        this.showGift = false;
        this.giftNotification = {};
      })
      this.$root.$on('openExpiryPopup', ({}) => {
        this.showExpiryPopup = true
      })
      this.$root.$on('openUserGradeChangePopup', ({}) => {
        this.showGradeChangePopup = true
      })

      this.$root.$on('closeExpiryPopup', ({}) => {
        this.showExpiryPopup = false
      })
      this.$root.$on('closeGradeChangePopup', ({}) => {
        this.showGradeChangePopup = false
        setTimeout(() => {
          if(this.$store.state.initialData.expiryDays < 200) {
            this.showExpiryPopup = true
          }
        }, 500)
      })
      this.$root.$on('closeEditTheme', () => {
        this.showEditTheme = false
      })
      this.$root.$on('openEditTheme', () => {
        this.showEditTheme = true
      })
      this.$root.$on('closePostPopup', () => {
        this.showPostPopup = false
      })
      this.$root.$on('openPostPopup', ({postId}) => {
        this.$store.dispatch('postContent/fetchNotificationPost', {postId, authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}).then(response => {
                if (response.code === 'POST_ID_NOT_FOUND') {
                  this.$toast.error(this.$t('post.post_not_found'))
                } else {
                  this.postData = response.post
                  this.showPostPopup = true
                }
            })

      })

    if(!this.$store.getters['isParent']()){
      this.$store.dispatch('fetchUsersGrades', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this}).then(data => {
        if(data.data.status === 'SUCCESS'){
            if (!this.$store.getters['isTeacher']()) {
            if(this.$store.state.userGrades.length !== 0) {
              this.$store.dispatch('content/fetchSubject', {
                curriculumId: this.$store.getters['getCurrentGrade']().curriculumId,
                id: 1,
                childId: this.$store.getters['getCurrentChildId'](),
                authToken: this.$store.state.auth.user.token,
                langCode: this.$store.state.locale.selectedLocale
              })
            }
          }
        }
      })
    }else{
      this.$store.dispatch('fetchUsersGrades', {authToken: this.$store.state.auth.user.token, childId: this.$store.state.currentSelectedChild.id, langCode: this.$store.state.locale.selectedLocale, context: this}).then(response =>{
        if(response.data.status === 'ERROR' && response.data.code === 'CHILDREN_SUBSCRIPTION_EXPIRED') {
          this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`));
        }
      })
    }

    },
    components: {
      notification, languageSelectBox, childSelectBox, gradeChangePopup, btnActionPopup, showGift, editTheme, subscriptionExpiryAlert, commentPopup
    },
    methods: {
      closePostPopupMethod () {
        this.$root.$emit('sharedPopupGotClosed', {})
        this.showPostPopup = false
      },
      removeChild() {
        let payload = [this.currentId]
            this.$store.dispatch('setting/removeChildren', {
                langCode: this.$store.state.locale.selectedLocale,
                payload,
                authToken: this.$store.state.auth.user.token,
                childrenList: []
            }).then(response => {
                if(response.data.status === 'SUCCESS') {
                    this.removeByParent = false
                    //this.$toast.success('child removed successfully')
                    this.logout()
                }else {
                  if(response.data.message) {
                    this.$toast.error(response.data.message)
                  }else{
                    this.$toast.error(response.data.code)
                  }

                }
            })

    },
      logout() {
        // exit zopim
        $zopim(function() {
          $zopim.livechat.hideAll();
          $zopim.livechat.clearAll();
        });
        let userId = this.$store.state.initialData.userId
        let tourUser = this.$store.state.initialData.isTourUser
        let navUrl = this.$store.state.initialData.navUrl
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then((response) => {
        if(tourUser){
          window.location = navUrl+this.$store.state.locale.selectedLocale
        }else{
          if(window.localStorage.getItem('tour')){
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/marketing'))
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
          }
        }

          //location.reload()
        })
      },
      navToMain() {
        if(this.$store.state.auth.user.token) {
          // this.$router.replace({ path: '/' })
          if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays < 0){
            this.registerByParent = true
          }
          if(this.$store.getters['isParent']()) {
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/myprogress'))
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
          }
        }else {
          this.$router.replace({ path: '/login' })
        }
      },
      goToPlans() {
        this.registerByParent = false
        this.$router.push(this.$store.getters['locale/getFinalUrl']('/mySubscription'))
      },
      goToProfile() {
        let userId = this.$store.getters['getUserId']()
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
      },
      materialIconCode(header) {
        return header.icon
      },
      mHover() {
        if(this.$store.state.currentSelectedChild && this.$store.state.currentSelectedChild.expiryDays < 0) {
          this.$toast.error(this.$t('parentLog.parentConfirmation'))
          return false
        }else{
          this.onMouseover = true
          this.onMouseoverEff = false
          this.onMouseoverSelectChildEff = false
          this.$store.dispatch('locale/notificationBellClick', {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale
        })
        }

      },
      mOut() {
        this.onMouseover = false

      },
      mOut4() {
        this.onMouseoverSelectChildEff = false
      },
      mHover2() {
        this.onMouseoverEff = true
        this.onMouseover = false
        this.onMouseoverSelectChildEff = false

      },
      mHover3() {
        this.onMouseoverEff = false
        this.onMouseover = false
        this.onMouseoverSelectChildEff = false

      },
      mHover4() {
        this.onMouseoverSelectChildEff = true
        this.onMouseoverEff = false
        this.onMouseover = false
      },
      mOut2() {
        this.onMouseoverEff = false
        this.onMouseoverSelectChildEff = false

      },
      toggleConfirmPopup () {
        this.isConfirmPopupOpen = !this.isConfirmPopupOpen
      },
      openSearch () {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/search`))
      }
    }
  }
</script>
<style>
  .editThemeOverlay{width:100%;height:100vh; position:absolute; left:0;top:0;z-index:100;background:rgba(0,0,0,0.6);}
</style>
