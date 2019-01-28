<template>
  <div class="full-width pos-rel">
    <button type="button" v-if="$store.state.initialData.children.length >1" @click="hideMenu" class="btn btn-link">
        <i class="material-icons">more_vert</i>
    </button>
    <ul class="headerProRgEditDrop" v-on-click-outside="hideMenu" v-if="toggleMenuOpt">
        <li role="presentation"><a @click="removeChildDialog(child)">Remove</a></li>
    </ul>
    
  </div>
</template>
<script>
export default {
  data() {
    return{
      toggleMenuOpt: false,
      registerByParent: false,
      childObj:''
    }
  },
  props: ['child'],
  methods: {
    dropdown(event) {
      let templt = this.showMenu
      this.showMenu = !templt
    },
    logout() {
        // exit zopim
        $zopim(function() {
          $zopim.livechat.hideAll();
          $zopim.livechat.clearAll();
        });
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then((response) => {
          if(window.localStorage.getItem('tour')){
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/marketing'))
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
          }
          
          //location.reload()
        })
      },
    hideMenu() {this.toggleMenuOpt = !this.toggleMenuOpt},
    removeChildDialog(child) {
      this.registerByParent = true
      this.$root.$emit('removeChildByParent', {child})
      this.childObj = child
      this.hideMenu()
    },
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
