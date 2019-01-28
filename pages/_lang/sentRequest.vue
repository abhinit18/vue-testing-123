<template>
    <div class="contentSec rightSideBuddyList sentReqPage">
        <div class="scrollSec">
            <div class="conMidSec">
        
          <ol class="breadcrumb">
                              <li><a href="#"> {{$store.getters['isTeacherOrParent']()? $t('teacher.buddies') : $t('index.buddies')}}</a></li>
                              <li class="active">{{title}}</li>
                            </ol>
             <div class="full-width buddySec">

                <h3 class="smallHeading borBot">{{$t('buddy.sent_request')}} ({{( $store.state.newBuddyRequest.fetchConnection)? $store.state.newBuddyRequest.fetchConnection.totalElements : ''}})</h3>

                  <ul class="buddylistinline">
                    <li class="buddycustom-box mg-btm" v-for="buddy in $store.state.newBuddyRequest.fetchConnection.connections">
                     <div class="full-width buddySec">
                          <!-- v-for="buddy in this.$store.state.newBuddyRequest.connections" -->

                            <div class="buddy-img-box">
                              <buddyProfileimg :profileImg="buddy"></buddyProfileimg>
                                <!-- <img :src="buddy.userPic" class="img buddyImg">
                                <div class="ubadge gold goldTag"></div> -->
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

                                <li v-if="buddy.schoolProto && buddy.schoolProto.name"><p class="infoTxt">{{buddy.schoolProto.name}}</p></li>
                                <li v-if="buddy.grades"><p class="infoTxt">{{$t('buddy.grade')}} <span v-for="gradeName in buddy.grades">{{gradeName.name}}<span v-if="buddy.grades.length != 1">,</span></span></p></li>
                                <!-- <li><p class="infoTxt">School {{buddy.schoolProto.name}}</p></li> -->
                                   <!-- <li>Common <span>Buddies  {{buddy.commonBuddy}} </span> </li> -->
                              </ul>
                      <!-- <div class="acsnBtn ">

                      <span class="reminderSent">
                        <i class="material-icons">&#xE7F5;</i> Reminder Sent</span>
                      </div> -->

                          <div class="acsnBtn useracsnBtn">
                              <button :disabled="buddy.isBlocked" class="btn btn-link btn-remind" @click="btnAction(buddy, 'reminder')">{{$t('buddy.remind')}}</button>
                              <button :disabled="buddy.isBlocked" class="btn cancelBuddyBtn" @click="btnAction(buddy, 'cancel')">{{$t('buddy.cancel_request')}}</button>
                          </div>
                        </div>
                        <!-- <profilePopOver :buddy="buddy" class="popHover"></profilePopOver> -->
                      </div>
                    </li>
                    <li v-if="!this.$store.state.newBuddyRequest.fetchConnection.connections">
                        <no-send-request :findBuddy = "findBuddy" />
                    </li>
                  </ul>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import noSendRequest from '~/components/placeholders/noSendRequest'
import buddyProfileimg from '~/components/view/buddyProfileimg'
import profilePopOver from '~/components/view/profilePopOver'
export default {
  head () {
			return {
        title: this.title
			}
		},
    middleware: 'authenticated',
    mounted () {
      this.$store.dispatch('header/navChange', {key: 3, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
      this.$store.dispatch('sidebarBuddyContent/navChange',3)
      this.$store.dispatch('newBuddyRequest/fetchSentConnections', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      this.$store.dispatch('snowPlowPageView',{pageName: "BUDDIES_REQUEST_SENT"});

    },
    data() {
      return {
        actionDataObj: {},
        title: this.$t(this.$store.getters['isTeacher']()|| this.$store.getters['isParent']()? 'teacher.sent_request': 'buddy.sent_request')
      }
    },
    components:{buddyProfileimg, profilePopOver, noSendRequest},
    layout: 'buddyContent',
    methods: {
      btnAction(data,name) {

        this.actionDataObj.dataObj = data
        this.actionDataObj.btnActionName = name

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
      // cancelBuddyRequest (value) {
      //   this.$store.dispatch('newBuddyRequest/cancelBuddyRequest',{authToken:this.$store.state.auth.user.token, connectionId: value.userId, langCode: this.$store.state.locale.selectedLocale})
      //   .then((response) => {
      //     this.$toast.success( this.$t('buddy.withdraw_success'))
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
<style>
/*.Line-3-Copy {
  width: 112px;
  height: 1px;
  border: solid 1px #efefef;
  margin:0 auto;
}
.mg-btm{
  margin-bottom: 15px;
}
.cancelBuddyBtn{
  font-size:12px;margin-right:3px;width:100%;min-height: 20px;background-color: #fff;border-color:#e54d8c;color:#e54d8c;border-bottom-left-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 0px;
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
.accpt-buddy-btn{font-size:12px;padding:6px 23.6px;min-height: 20px;border-radius: 0px;background-color: #e54d8c;color:#fff;}
.decline-buddy-btn{
  // max-width: 77px;
  font-size:12px;
  padding:6px 23.6px;
  min-height: 20px;
  color:#e54d8c;
  border-radius: 0px;
  background-color: #fff;

}
.rightSideBuddyList{max-height: calc(100vh - 10px)}*/
</style>
