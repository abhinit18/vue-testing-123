<template>
  <div class="content-wrapper">
    <div class="contentwrapperInner">
      <div class="bodyCon clearfix">
        <section class="container">
          <div class="pagebox clearfix">
            <div class="pageboxOver"></div>
            <sidebarProfile :profile="profile" v-if="dataloaded"></sidebarProfile>
            <div class="contentSec">
              <div class="scrollSec">
                <div class="profilePage" v-if="profile.blockedByMe || profile.blockedMe">
                  <h1 class="text-center" v-if="profile.blockedByMe" style="font-weight:lighter;">{{$t('settings.blockText')}}</h1>
                  <h1 class="text-center" v-else style="font-weight:lighter;">{{$t('settings.blockMeText')}}</h1>
                </div>
  
                <div class="prfilePage" v-else>
                  <a class="pclose" @click="closePopup"><span>&times;</span> {{$t('settings.close')}}</a>
                  <div class="conMidSec">
                    <ol class="breadcrumb">
                        <li><a href="#">{{$t('index.home')}}</a></li>
                        <li class="active">{{$t('common.profile')}}</li>
                      </ol>
                    <!-- <h2 class="welcomText"><span>{{$t('index.hey')}} {{profile.userName}} !</span> {{$t('profile.headline')}}</h2> -->
                    <div class="whiteTab clearfix">
                      <ul>
                        <li :class="{active: tab.key === activeTabKey}" v-for="tab in tabs" @click="tabChange(tab.key)"><a>{{$store.getters['isTeacher']()? $t('teacher.'+tab.name): $t('profile.'+tab.name)}}</a></li>
                      </ul>
                    </div>
                    <div v-if="loadTabs && tabs.length>0">
                      <post v-if="activeTabKey === 1" :profile='profile' :nowallpost='nowallpost' />
                      <favourites v-if="activeTabKey === 2" :userId='getUserId' />
                      <buddy v-if="activeTabKey === 3" :userId='getUserId' />
                      <scoreboard v-if="activeTabKey === 4" :userId='getUserId' :profile='profile'/>
                    </div>
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import post from '~/components/profile/post'
  import favourites from '~/components/profile/favourites'
  import buddy from '~/components/profile/buddy'
  import scoreboard from '~/components/profile/scoreboard'
  import sidebarProfile from '~/components/sidebarProfile'
  export default {
    head () {
			return {
			title: this.$t('common.profile')
			}
		},
    layout: 'profile',
    middleware: 'authenticated',
    data() {
      return {
        dataloaded: false,
        profile: {},
        profileData: {},
        loadTabs: false,
        activeTabKey: '',
        nowallpost: false,
        tabs: [{
          name: 'posts',
          key: 1
        }, {
          name: 'favourites',
          key: 2
        }, {
          name: 'buddies',
          key: 3
        }, {
          name: 'scoreBoard',
          key: 4
        }],
        ParentTabs: [{
          name: 'posts',
          key: 1
        }, {
          name: 'buddies',
          key: 3
        }]
      }
    },
    beforeDestroy() {
      this.$root.$off('buddyActionByUser')
    },
    mounted() {
      this.activeTabKey = this.getFirstActiveTab ? this.getFirstActiveTab.key : ''
      this.$store.dispatch('header/navChange', {
        key: 1,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
      })
      this.$store.dispatch('profile/fetchUserProfile', {
        userId: this.getUserId,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale
      }).then((response) => {
        if (response && response.status === 200 && response.data) {
          this.profile = response.data
          this.dataloaded = true
          this.setFirstTabActive()
        }
      })
  
      this.$root.$on('buddyActionByUser', (dataUser) => {
          this.$store.dispatch('profile/fetchUserProfile', {
            userId: this.getUserId,
            authToken: this.$store.state.auth.user.token,
            langCode: this.$store.state.locale.selectedLocale
          }).then((response) => {
            if (response && response.status === 200 && response.data) {
              this.profile = response.data
              this.dataloaded = true
              this.setFirstTabActive()
  
            }
          })
      })
  
    },
    methods: {
      setFirstTabActive() {
        if (this.$store.getters['isMyProfile'](this.getUserId)) {
          this.activeTabKey = 1
          this.loadTabs = true
          if(this.profile.role === 'PARENT'){
            this.tabs = this.ParentTabs;
          }
          return
        }
        let privacy = this.profile.privacy
        let tabbs = [{
          name: 'posts',
          key: 1
        }, {
          name: 'favourites',
          key: 2
        }, {
          name: 'buddies',
          key: 3
        }, {
          name: 'scoreBoard',
          key: 4
        }]
        let tabsArray = this.profile.role === 'PARENT'?this.ParentTabs:tabbs
        // console.log("tabsArray ",tabsArray);
        let newArray = []
        if (privacy.posts) {
          this.activeTabKey = 1
        } else if (privacy.favourites && this.profile.role !== 'PARENT') {
          this.activeTabKey = 2
        } else if (privacy.buddies) {
          this.activeTabKey = 3
        } else if (privacy.scoreBoard && this.profile.role !== 'PARENT') {
          this.activeTabKey = 4
        }
        if (privacy.posts) {
          if (!privacy.wallPosts) {
            this.nowallpost = true
          }
          let tempObj = tabsArray[0]
          let newObj = Object.assign({}, tempObj)
          newArray.push(newObj)
          // console.log("1 ",newArray)
        }
        if (privacy.favourites && this.profile.role !== 'PARENT') {
          let tempObj = tabsArray[1]
          let newObj = Object.assign({}, tempObj)
          newArray.push(newObj)
          // console.log("2 ",newArray)
        }
        if (privacy.buddies) {
          console.log('parent profile buddy',privacy.buddies)
          let tempObj = this.profile.role === 'PARENT'?tabsArray[1]:tabsArray[2]
          let newObj = Object.assign({}, tempObj)
          newArray.push(newObj)
          // console.log("3 ",newArray)
        }
        if (privacy.scoreBoard && this.profile.role !== 'PARENT') {
          let tempObj = tabsArray[3]
          let newObj = Object.assign({}, tempObj)
          newArray.push(newObj)
          // console.log("4 ",newArray)
        }
        // console.log("5 ",newArray)
        this.tabs = newArray
        setTimeout(() => {
          this.loadTabs = true
        }, 1)
      },
      closePopup() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
      },
      tabChange(key) {
        this.activeTabKey = key
      }
  
    },
    components: {
      post,
      favourites,
      buddy,
      scoreboard,
      sidebarProfile
    },
    computed: {
      getUserId() {
        let currentRoute = this.$router.currentRoute.path
        let currentRouteSplit = currentRoute.split('/')
        return currentRouteSplit[currentRouteSplit.length - 1]
      }
    }
  }
</script>

<style>
  .studyPopUpPage {
    top: 20px;
    position: fixed;
  }
</style>
