<template>
  <div class="full-width pos-rel">
    <!-- <button @click="toggleEditDelete" class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
     <i class="material-icons">&#xE5D3;</i>
    </button> -->
    <ul class="dropdown-menu dp-menu" aria-labelledby="dropdownMenu1" v-if="showMenu" v-on-click-outside="dropdown">
      <li class="action-dropdown-li" @click="btnAction(buddy,pagestatus,'unfriend')"><button style="padding:6px 10px;" class="btn btn-link" :disabled="buddy.isBlocked || buddy.isBlocker">
        <!-- <i class="material-icons icon-pos">clear</i> -->
        <span v-if="this.$store.getters['isTeacher']() || this.$store.getters['isParent']()">{{$t('teacher.remove')}}</span>
        <span v-else="this.$store.getters['isTeacher']()">{{$t('buddy.remove')}}</span>
      </button></li>
      <li role="separator" class="divider"></li>
      <li class="action-dropdown-li" v-if="buddy.isBlocked === false" @click="btnAction(buddy,pagestatus,'block')"><a href="#">
        <!-- <i class="material-icons icon-pos">not_interested</i> -->
        <span v-if="this.$store.getters['isTeacher']() || this.$store.getters['isParent']()">{{$t('teacher.block')}}</span>
        <span v-else="this.$store.getters['isTeacher']()">{{$t('buddy.block')}}</span>
      </a></li>
      <li class="action-dropdown-li" v-if="buddy.isBlocked === true && pagestatus === 'find'" @click="btnAction(buddy,pagestatus,'unblock')"><a href="#">
        <!-- <i class="material-icons icon-pos">not_interested</i> -->
        <span v-if="this.$store.getters['isTeacher']() || this.$store.getters['isParent']()">{{$t('teacher.unblock')}}</span>
        <span v-else="this.$store.getters['isTeacher']()">{{$t('buddy.unblock')}}</span>
      </a></li>
      <li role="separator" class="divider"></li>
      <!-- <li class="text-center"><a href="#" @click="hideMenu"><i class="material-icons">clear</i></a><span class="caret caret-pos"></span></li> -->
    </ul>
      <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="dropdown">
              <i class="material-icons">&#xE5D3;</i>
      </button>
  </div>
</template>
<script>
export default {
  data() {
    return{
      showMenu: false,
      actionDataObj: {}
    }
  },
  props: ['buddy','pagestatus'],
  methods: {
    dropdown(event) {
      let templt = this.showMenu
      this.showMenu = !templt
    },
    hideMenu() {this.showMenu = false},
    unfriendBuddy(data) {
      this.showMenu= false
      this.$store.dispatch('newBuddyRequest/unfriendMyBuddy',{authToken:this.$store.state.auth.user.token, connectionId: data.userId, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
    },
    btnAction(data,pagestatus,name) {
      this.showMenu= false
      this.actionDataObj.dataObj = data
      this.actionDataObj.btnActionName = name
      this.actionDataObj.pagestatus = pagestatus
      let dataParam = this.actionDataObj
      this.$root.$emit('showActionPopup', {dataParam})
    },
    blockUser(data,pagestatus) {
      this.showMenu= false
      let vm = this
      this.$store.dispatch('newBuddyRequest/blockBuddy',{authToken:this.$store.state.auth.user.token, connectionId: data.userId, langCode: this.$store.state.locale.selectedLocale, pageStatus: pagestatus})
      .then((response) => {
        //this.$toast.success(vm.$store.getters['isTeacher']() ? vm.$t('teacher.block_success') : vm.$t('buddy.block_success'))
      },(error) => {
        // this.$toast.error(this.$t('post.delete_error'), error)
      })
    }
  }
}
</script>
<style>/*
.dp-menu{
  display: block;
  top: -142px;
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
