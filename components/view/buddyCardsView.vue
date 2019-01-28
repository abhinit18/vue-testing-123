<template>
<div class="full-width">
    <!-- v-for="buddy in this.$store.state.newBuddyRequest.connections" -->

      <div class="buddy-img-box">
          <!-- <img :src="buddy.userPic" v-if="buddy.userPic !== ''"class="img buddyImg"> -->
          <!-- <div class="ubadge gold goldTag"></div> -->
          <!--
          <div class="ubadge silver">SILVER</div>
          <div class="ubadge bronze">BRONZE</div>
          -->
          <buddyProfileimg :profileImg="buddy" @click="gotoBuddyProfile(buddy)"></buddyProfileimg>
      </div>
   <div class="info">
    <div class="buddyName" @click="gotoBuddyProfile(buddy)">
        <!-- {{buddy.firstName}} {{buddy.lastName}} -->
        <span v-if="$store.getters['isMyProfile'](buddy.userId)">
            {{$t('common.me')}}
        </span>
        <span v-else-if="buddy.firstName !== '' || buddy.lastName !== ''">
            {{buddy.firstName}} {{buddy.lastName}}
        </span>
        <span v-else-if="buddy.firstName === '' && buddy.lastName === ''">
            -
        </span>
    </div>
       <p class="infoTxt" v-if="buddy.schoolProto && buddy.schoolProto.name">{{buddy.schoolProto.name}}</p>
       <p class="infoTxt">{{$t('buddy.grade')}}
          <span v-if="buddy.grades">{{$store.getters['getGradeCsv'](buddy.grades)}}</span>
        </p>
        <!-- <li>{{buddy.commonBuddy}} 23 {{$t('buddy.commonBuddies')}}</li> -->

        <div class="acsnBtn useracsnBtn">
                <div class="full-width mg-top-15" v-if="buddy.friendStatus === 'NONE' && !$store.getters['isMyProfile'](buddy.userId)">
                    <button class="btn addBuddyBtn" @click="btnAction(buddy,'send',pageStatus)">{{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.add_buddy') : $t('buddy.add_buddy')}}</button>
                </div>
                <!-- <div class="full-width mg-top-15 pos-rel" v-if="buddy.friendStatus === 'FRIEND' || buddy.friendStatus === 'ACTIVE'">
                    <btnDropdown :buddy="buddy" :pagestatus="pageStatus"></btnDropdown>
                </div> -->
                <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_RECEIVED'">
                  <button class="btn accpt-buddy-btn" @click="btnAction(buddy,'accept',pageStatus)">{{$t('buddy.accept')}}</button>
                  <button class="btn decline-buddy-btn" @click="btnAction(buddy,'decline',pageStatus)">{{$t('buddy.decline')}}</button>
                </div>
                <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_SENT'">
                    <button class="btn cancelBuddyBtn" @click="btnAction(buddy,'cancel',pageStatus)">{{$store.getters['isTeacher']() ? $t('teacher.cancel_request') : $t('buddy.cancel_request')}}</button>
                </div>
              </div>
    <div class="acsnBtn" v-if="buddy.friendStatus === 'FRIEND' || buddy.friendStatus === 'ACTIVE'">
      <button @click="dropdown" class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <i class="material-icons">&#xE5D3;</i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" v-if="showMenu" v-on-click-outside="dropdown">
        <li class="action-dropdown-li" @click="btnAction(buddy, 'unfriend',pageStatus)"><button class="btn btn-link" style="padding:6px 10px;">
          <!-- <i class="material-icons icon-pos">clear</i> --> {{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.remove') : $t('buddy.remove')}}</button></li>
        <li role="separator" class="divider"></li>
        <li class="action-dropdown-li" v-if="!buddy.isBlocked"@click="btnAction(buddy, 'block',pageStatus)">
          <a>{{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.block') : $t('buddy.block')}}</a>
        </li>
        <li class="action-dropdown-li" v-if="buddy.isBlocked" @click="btnAction(buddy, 'unblock',pageStatus)">
          <a>
            <!-- <i class="material-icons icon-pos">not_interested</i> -->
          {{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.unblock') : $t('buddy.unblock')}}
          </a>
        </li>
        <li role="separator" class="divider"></li>
        <!-- <li class="text-center"><a href="#" @click="hideMenu"><i class="material-icons">clear</i></a><span class="caret caret-pos"></span></li> -->
      </ul>

        <!-- <button class="btn addBuddyBtn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="dropdown">
          Buddy
        </button> -->

    </div>

</div>
<!-- <profilePopOver :buddy="buddy" class="popHover"></profilePopOver> -->
</div>
</template>
<script>
import buddyProfileimg from '~/components/view/buddyProfileimg'
import profilePopOver from '~/components/view/profilePopOver'
export default {
  data () {
    return {
      showMenu: false,
      profileStatus: 'otherProfile',
      actionDataObj: {}
    }
  },
  components:{buddyProfileimg,profilePopOver},
  props: ['buddy','pageStatus'],
  methods: {
    dropdown(event) {
      let temp = this.showMenu
      this.showMenu = !temp
    },
    gotoBuddyProfile(data) {
      let user = data.userId;
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
    },
    hideMenu() {
      this.showMenu= false
    },
    // btnAction(data,name) {
    //
    //   this.actionDataObj.dataObj = data
    //   this.actionDataObj.btnActionName = name
    //
    //   let dataParam = this.actionDataObj
    //   this.$root.$emit('showActionPopup', {dataParam})
    // },
    unfriendBuddy(data) {
      this.showMenu= false
      let vm = this
      this.$store.dispatch('newBuddyRequest/unfriendMyBuddy',{authToken:this.$store.state.auth.user.token, connectionId: data.userId, langCode: this.$store.state.locale.selectedLocale})
      .then((response) => {
        //this.$toast.success(vm.$store.getters['isTeacher']() ? vm.$t('teacher.unfriend_success') :  vm.$t('buddy.unfriend_success'))
      },(error) => {
        console.log(error);
        // this.$toast.error(this.$t('post.delete_error'), error)
      })
    },
    blockUser(data) {
      this.showMenu= false
      let vm = this
      this.$store.dispatch('newBuddyRequest/blockBuddy',{authToken:this.$store.state.auth.user.token, connectionId: data.userId, langCode: this.$store.state.locale.selectedLocale})
      .then((response) => {
        //this.$toast.success(vm.$store.getters['isTeacher']? vm.$t('teacher.block_success') : vm.$t('buddy.block_success'))
      },(error) => {
        console.log(error);
        // this.$toast.error(this.$t('post.delete_error'), error)
      })
    },
      btnAction(data,name,pageStatus) {
        this.actionDataObj.dataObj = data
        this.actionDataObj.btnActionName = name
        this.actionDataObj.pageStatus = this.pageStatus
        let dataParam = this.actionDataObj
        this.$root.$emit('showActionPopup', {dataParam})
      }
  }
}
</script>
<style>
/*.dropdown-menu{
  display: block;
  top: -145px;
  left: 45px
}
.action-dropdown-li {
  position: relative;padding-left: 20px;
}
.pos-rel{position: relative;}
.caret-pos{position: absolute;bottom:-10px;    border-top: 10px dashed;
    border-top: 4px solid\9;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;left:30px;color:#fff;}
    .icon-pos{position: absolute;top:3%;left:10px;}
    .addBuddyBtn{
      border-bottom-right-radius: 4px !important;
      border-bottom-left-radius: 4px !important;
    }*/
</style>
