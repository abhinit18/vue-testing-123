<template>
    <div class="contentSec rightSideBuddyList">
        <div class="scrollSec">
            <div class="conMidSec">
        
           <ol class="breadcrumb">
                              <li><a href="#">{{$store.getters['isTeacherOrParent']()? $t('teacher.buddies') : $t('index.buddies')}}</a></li>
                              <li class="active">{{title}}</li>
                            </ol>
                 <div class="full-width buddySec">
                 <h3 class="smallHeading borBot">{{$t('buddy.new_request')}} ({{($store.state.newBuddyRequest.fetchConnection ) ?  $store.state.newBuddyRequest.fetchConnection.totalElements : ''}})</h3>

                  <div class="frmsg" v-if="showAddSuccess">
                   <img :src="$store.getters['getUserMascot']()" @click="cocoView = !cocoView" width="58">
                   <p>{{$t('buddy.friend_make_msg')}}  <strong>{{successAddedUserName}} !</strong></p>
                  </div>
                  <ul class="buddylistinline">
                      <li class="buddycustom-box mg-btm"  v-for="buddy in $store.state.newBuddyRequest.fetchConnection.connections">
                        <div class="full-width">
                            <!-- v-for="buddy in this.$store.state.newBuddyRequest.connections" -->

                              <div class="buddy-img-box">
                                  <buddyProfileimg :profileImg="buddy"></buddyProfileimg>
                                  <div class="ubadge gold goldTag"></div>
                                  <!--
                                  <div class="ubadge silver">SILVER</div>
                                  <div class="ubadge bronze">BRONZE</div>
                                  -->
                              </div>

                             <div class="info">
                            <div class="buddyName" @click="gotoBuddyProfile(buddy)">
                                {{buddy.firstName}} {{buddy.lastName}}
                            </div>

                                <ul>
                                  <li><p class="infoTxt" v-if="buddy.schoolProto&&buddy.schoolProto.name">{{buddy.schoolProto.name}}</p></li>
                                  <li>
                                    <p class="infoTxt" v-if="buddy.grades">
                                    {{$t('buddy.grade')}}
                                    <!-- {{$store.getters['getGradeCsv'](buddy.grades)}} -->
                                    <span>{{$store.getters['getGradeCsv'](buddy.grades)}}</span>
                                    </p>
                                  </li>
                                  <!-- <li><p class="infoTxt">{{$t('buddy.school')}} {{buddy.schoolProto.name}}</p></li> -->
                                   <!-- <li>Common <span>Buddies  {{buddy.commonBuddy}} </span> </li> -->
                                </ul>

                           <!--  <div class="full-width grade-list mg-top-15">
                              {{buddy.commonBuddy}}
                                35 Common Buddies
                            </div> -->

                             <div class="acsnBtn useracsnBtn">
                                <div class="btn-friendReq" role="group" aria-label="...">
                                <button class="btn decline-buddy-btn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'decline')">{{$t('buddy.decline')}}</button>
                                <button class="btn accpt-buddy-btn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'accept')">{{$t('buddy.accept')}}</button>
                              </div>
                            </div>
                          </div>
                          <!-- <profilePopOver :buddy="buddy" class="popHover"></profilePopOver> -->
                        </div>
                      </li>
                      <li v-if="!this.$store.state.newBuddyRequest.fetchConnection.connections">
                          <no-new-request :findBuddy = "findBuddy" />
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import noNewRequest from '~/components/placeholders/noNewRequest'
import buddyProfileimg from '~/components/view/buddyProfileimg'
import profilePopOver from '~/components/view/profilePopOver'
export default {
  head () {
			return {
			title: this.title
			}
		},
    beforeDestroy () {
            this.$root.$off('showAddedBuddySuccess')
            this.$root.$off('hideAddedBuddySuccess')
        },
    middleware: 'authenticated',
    mounted () {
      this.$store.dispatch('header/navChange', {key: 3, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
      this.$store.dispatch('sidebarBuddyContent/navChange',2)
      this.$store.dispatch('newBuddyRequest/fetchReceivedConnections', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      this.$root.$on('showAddedBuddySuccess', (data) => {
        this.successAddedUserName = data.data
        this.showAddSuccess = true
      })
      this.$root.$on('hideAddedBuddySuccess', () => {
        this.showAddSuccess = false
      })
      this.$store.dispatch('snowPlowPageView',{pageName: "BUDDIES_NEW_REQUEST"});

    },
    data() {
      return{
        actionDataObj: {},
        successAddedUserName: '',
        showAddSuccess: false,
        			title: this.$t(this.$store.getters['isTeacher']()|| this.$store.getters['isParent']()? 'teacher.new_request': 'buddy.new_request')
      }
    },
    components:{buddyProfileimg, profilePopOver, noNewRequest},
    layout: 'buddyContent',
    methods: {
      btnAction(data,name) {

        this.actionDataObj.dataObj = data
        this.actionDataObj.btnActionName = name
        // this.actionDataObj.pagestatus = pagestatus
        let dataParam = this.actionDataObj
        this.$root.$emit('showActionPopup', {dataParam})
      },
      findBuddy() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/findBuddy`))
      },
      gotoBuddyProfile(data) {
        let user = data.userId;
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
      }
      // acceptBuddy(data) {
      //     this.$store.dispatch('newBuddyRequest/approveBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: data.userId, langCode: this.$store.state.locale.selectedLocale})
      //     .then((response) => {
      //       this.$toast.success( this.$t('buddy.add_success'))
      //       // this.postData = ''
      //       // this.close()
      //     }, (error) => {
      //       console.log(error);
      //       // this.$toast.error(this.$t('post.delete_error'), error)
      //     })
      // },
      // declineBuddy(data) {
      //   this.$store.dispatch('newBuddyRequest/approveBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: data.userId, langCode: this.$store.state.locale.selectedLocale})
      //   .then((response) => {
      //     this.$toast.success( this.$t('buddy.decline_success'))
      //     // this.postData = ''
      //     // this.close()
      //   }, (error) => {
      //     console.log(error);
      //     // this.$toast.error(this.$t('post.delete_error'), error)
      //   })
      // }
    }
}
</script>
<style>/*
.Line-3-Copy {
  width: 112px;
  height: 1px;
  border: solid 1px #efefef;
  margin:0 auto;
}

.mg-btm{
  margin-bottom:15px;
}

.full-width{float:left;width:100%;}
.customInput{max-width:300px;height:40px;border-color:#ffe45f;border-radius:4px;padding-right:40px;}
.pos-set{position: absolute;top:8px;right:10px;color:#e9b53d;}
.buddycustom-box{max-width: 180px;padding-left:0px !important;padding-right:0px !important;margin-right:25px;text-align: center;min-height:220px;padding-top:24px;border:1px solid #dfdfdf;float: left;width: 100%;background: #fff;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;}
.buddy-img-box{
  position: relative;
    width: 62px;margin: 0 auto;
}
.buddyImg{
  width:62px;
}
.goldTag{
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AwLCAtMTk0LjI1MDAwMCkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat 10% 0;
    display: inline-block;
    width: 52px;
    line-height: 20px;
    height: 42px;
    color: #fff;
    font-size: 14px;
    background-size: 52px;
    position: absolute;
    padding: 19px 0 0;
    z-index: 2;
    top: 48px;
    left: 5px;
}
.buddyName {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #2b2b2b;
  margin-top: 15px;
}

.grade-list{font-family: Roboto;font-size: 12px;text-align: center;color: #737373;}
.mg-top-30{margin-top:30px;}
.mg-top-15{margin-top:15px;}
.accpt-buddy-btn{
  font-size:12px;
  padding:6px 23.6px;
  min-height: 20px;
  color: #fff;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 4px !important;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #e54d8c;
}
.decline-buddy-btn{
  // max-width: 77px;
  font-size:12px;
  padding:6px 23.6px;
  min-height: 20px;
  color:#e54d8c;
  border-bottom-right-radius: 4px !important;
  border-bottom-left-radius: 0px !important;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-color: #e54d8c;
  background-color: #fff;

}
.rightSideBuddyList{max-height: calc(100vh - 10px)}*/
</style>
