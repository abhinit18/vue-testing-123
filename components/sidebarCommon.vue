<template>
    <div class="infoTop clearfix" v-on:mouseover="onEntering" v-on:mouseleave="onLeaving">
        <!-- <div class="img">
            <div class="edit" v-if="myProfile" @click="toEditProfile"><i class="material-icons">&#xE254;</i></div>
            <img v-if="isProfilePic" :src="profilePic" class="img">
            <div class="picPlaceHolder" v-else>{{profile? (profile.userName? profile.userName.substr(0,1): ''): this.$store.state.initialData.firstName.substr(0,1)}}</div>
             <div class="ubadge gold">{{$t('index.gold')}}</div>
        </div> -->
       <!--  <div class="ubadge gold">{{$t('index.gold')}}</div>
        <div class="ubadge silver">{{$t('index.gold')}}</div>
        <div class="ubadge bronze">{{$t('index.gold')}}</div>
        -->
         <div class="ubadgeProfile tempMaxWidth" v-if="$store.state.initialData.badge && !profile">
             <img :src="$store.state.initialData.badge">
         </div>


        <profilepicBox :profile="profile" />
        <h3>{{profile? profile.userName: (this.$store.state.initialData.firstName + ' ' + this.$store.state.initialData.lastName)}}</h3>
        <div class="pEditProfileBtn" v-show="(profile && profile.userId === $store.state.initialData.userId )">
           <button class="btn btn-primary submitBtn" @click="toEditProfile">{{$t('profile.editProfile')}}</button>
        </div>
        <div class="pointsCoinsCol" v-if="!$store.getters['isParent']()&& !profile">
            <span>{{getPoints()}} {{$t('index.points')}} </span> |
            <span>{{getCoins()}} {{$t('scoreboard.coins')}}</span>
        </div>
        <div class="pointsCoinsCol" v-if="!$store.getters['isParent']()&& profile">
            <span v-if="profile.role !== 'PARENT'">{{getPoints()}} {{$t('index.points')}} | </span> 
            <span v-if="profile.role !== 'PARENT'">{{getCoins()}} {{$t('scoreboard.coins')}}</span>
        </div>

        <!-- <div v-if="editOn && (!profile || (profile && profile.userId === $store.state.initialData.userId) )">
           <button class="btn btn-primary submitBtn" @click="toEditProfile">Edit Profile</button>
        </div>
        <div v-else>
            <p>{{profile? profile.points: this.$store.state.initialData.points}} {{$t('index.points')}}</p>
            <p>2500 {{$t('scoreboard.coins')}}</p>
        </div> -->


        <div class="addBuddyAcsnBoxProfile"  v-if="!(type !== 'study' && type !== 'profile')">
          <div class="full-width" v-if="profile.userId !== this.$store.state.initialData.userId">
            <button class="btn btn-primary" :disabled="profile.blockedByMe===1||profile.blockedMe===1"
            v-if="(profile.isBuddy === 0)&&(profile.requestSentToMe === 0)&&(profile.requestSentByMe === 0)"
            @click="btnAction(profile, 'send',pageStatus, 'userProfile')">{{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.add_buddy'):  $t('buddy.add_buddy')}}</button>
            <button class="btn btn-primary accpt-buddy-btn" :disabled="profile.blockedByMe===1||profile.blockedMe===1" v-if="(profile.isBuddy === 0) && (profile.requestSentToMe === 1)" @click="btnAction(profile, 'accept',pageStatus, 'userProfile')">{{$store.getters['isTeacher']()? $t('teacher.accept_buddy'):  $t('buddy.accept_buddy')}}</button>
            <button class="btn btn-bordered decline-buddy-btn" :disabled="profile.blockedByMe===1||profile.blockedMe===1" v-if="(profile.isBuddy === 0) && (profile.requestSentToMe === 1)" @click="btnAction(profile, 'decline',pageStatus, 'userProfile')">{{$store.getters['isTeacher']()? $t('teacher.decline_buddy'):  $t('buddy.decline_buddy')}}</button>
            <button class="btn btn-primary" v-if="profile.isBuddy === 1"  @click="btnAction(profile, 'unfriend',pageStatus, 'userProfile')">{{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.remove'):  $t('buddy.remove')}}</button>

                         <button :disabled="profile.blockedByMe===1||profile.blockedMe===1" class="btn btn-remind" @click="btnAction(profile, 'reminder',pageStatus,'userProfile')" v-if="(profile.requestSentByMe === 1)&&(profile.isBuddy === 0)">
                          <i class="material-icons">&#xE7F5;</i></button>
                       <button class="btn btn-remind" :disabled="profile.blockedByMe===1||profile.blockedMe===1"
                        v-if="(profile.requestSentByMe === 1)&&(profile.isBuddy === 0)" @click="btnAction(profile, 'reminder',pageStatus,'userProfile')">
                        {{$t('buddy.remind')}}</button>

                        <button class="btn btn-bordered btn-cancelReq" v-if="(profile.requestSentByMe === 1)&&(profile.isBuddy === 0)" :disabled="profile.blockedByMe===1||profile.blockedMe===1" @click="btnAction(profile, 'cancel',pageStatus, 'userProfile')">{{$t('buddy.cancel_request')}}</button>
                        <!-- <div class="rSent" v-if="(profile.reminderSent === 0)&&(profile.isBuddy !== 0)&&(profile.requestSent !== 0)">Reminder Sent</div> -->
                          <div class="acsnBtn">

                  <button class="btn btn-link dropdown-toggle" type="button" @click="showSidebarBtnToggle">
                    <i class="material-icons">&#xE5D3;</i>
                  </button>
                  <ul class="dropdown-menu" style="display:block;" v-on-click-outside="showSidebarBtnToggle" v-if="showBtnToggle">
                    <li class="action-dropdown-li" v-if="profile.blockedByMe === 0"><a href="#" @click="btnAction(profile, 'block',pageStatus,'userProfile')">{{$store.getters['isTeacher']() || $store.getters['isParent']()?$t('teacher.block'):$t('common.block')}}</a></li>
                    <li class="action-dropdown-li" v-if="profile.blockedByMe !== 0"><a href="#" @click="btnAction(profile, 'unblock',pageStatus,'userProfile')">{{$store.getters['isTeacher']() || $store.getters['isParent']()?$t('teacher.unblock'):$t('common.unblock')}}</a></li>
                     <li role="separator" class="divider"></li>
                    <li class="action-dropdown-li">
                      <a v-if="!profile.blockedByMe" @click="btnAction(profile, 'profileReport',pageStatus)">{{$t('buddy.report_abuse')}}</a>
                    </li>
                  </ul>
            </div>

        </div>
      </div>

        <!-- <div class="addBuddyAcsnBoxProfile"  v-if="!(type !== 'study' && type !== 'profile')">

             <div class="acsnBtn">

                  <button class="btn btn-link dropdown-toggle" type="button" >
                    <i class="material-icons">&#xE5D3;</i>
                  </button>

            </div>

        </div> -->



        <sidebarCommonInfo v-if="(type !== 'study' && type !== 'profile')"/>
        <!-- <div class="otherInfo" v-if="(type && type !== 'study' && type !== 'profile')">
            <p><i class="material-icons">&#xE838;</i> {{$t('index.grade')}} : {{this.$store.state.initialData.grades? this.$store.state.initialData.grades[0].name: ''}}</p>
            <p><i class="material-icons">&#xE0C8;</i> {{$t('index.school')}} : {{this.$store.state.initialData.school? this.$store.state.initialData.school.name: ''}}</p>
            <p><i class="material-icons">&#xE80C;</i> {{$t('index.location')}} : {{this.$store.state.initialData.city? this.$store.state.initialData.city.name: ''}}</p>
        </div> -->

    </div>
</template>

<script>
import sidebarCommonInfo from '~/components/sidebarCommonInfo'
import profilepicBox from '~/components/profilepicBox'
// import buddyProfileimg from '~/components/view/buddyProfileimg'
export default {
    props: ['type', 'profile', 'pageStatus'],
    components: {sidebarCommonInfo, profilepicBox},
    data () {
        return {
            editOn: false,
            actionDataObj: {},
            showBtnToggle: false
        }
    },
    methods: {
        getPoints () {
            if (this.profile) {
                return this.profile.points? this.profile.points : 0 
            } else {
                return this.$store.state.initialData.points? this.$store.state.initialData.points : 0
            }
        },
        getCoins () {
            if (this.profile) {
                return this.profile.coins? this.profile.coins : 0 
            } else {
                return this.$store.state.initialData.coins? this.$store.state.initialData.coins : 0
            }
        },
        toProfile(userId) {
                this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
        },
        onEntering () {
            this.editOn = true
        },
        showSidebarBtnToggle() {
          this.showBtnToggle = !this.showBtnToggle
        },
        onLeaving () {
            this.editOn = false
        },
        toEditProfile () {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/editprofile`))
        },
        btnAction(data,name,pageStatus,userProfile) {
          if(userProfile === 'userProfile') {
            let firstName = data.userName.split(' ')[0]
            let lastName = data.userName.split(' ')[1]
            let actionBtnUsrProfileObj = {
              userId: data.userId,
              firstName: firstName,
              lastName: lastName,
              userPic: data.profilePic
            }
            this.actionDataObj.dataObj = actionBtnUsrProfileObj
          }else{
            this.actionDataObj.dataObj = data
          }

          this.actionDataObj.btnActionName = name
          this.actionDataObj.pageStatus = userProfile
          let dataParam = this.actionDataObj
          this.$root.$emit('showActionPopup', {dataParam})
        },
    },
    computed: {
        isProfilePic () {
            if (this.profile && this.profile.profilePic && this.profile.profilePic!=='') {
                return true
            } else if (this.$store.state.initialData.profilePic && this.$store.state.initialData.profilePic!=='') {
                return true
            } else {
                return false
            }
        },
        profilePic () {
            if (this.profile && this.profile.profilePic && this.profile.profilePic!=='') {
                return this.profile.profilePic
            } else {
                return this.$store.state.initialData.profilePic
            }
        },
        myProfile () {
            if (this.profile && this.profile.userId !== this.$store.state.initialData.userId) {
                return false
            } else {
                return true
            }
        }
    }
}
</script>

<style>
 .tempMaxWidth img {max-width: 35px}
</style>
