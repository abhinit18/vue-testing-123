<template>
  <div class="sideProfileInfo sideLoginRegister">
    <ul>
      <li v-bind:class="{ active: sidebar.active }" v-for="sidebar in $store.state.sidebarregister">
        <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"><span><i class="material-icons" v-html="materialIconCode(sidebar)"></i></span> {{$t(`index.${sidebar.name}`)}}</nuxt-link>
      </li>
      <!-- <li class="active"><span><i class="material-icons">{{sidebar.icon}}</i></span> Basic Details</li> -->
    </ul>

  </div>
</template>
<script>
export default {
  methods: {
    materialIconCode (sidebarBuddy) {
      return sidebarBuddy.icon
    }
  }
}
</script>
<style>
  .sideLoginRegister ul li a{color:#fff !important;}
</style>
