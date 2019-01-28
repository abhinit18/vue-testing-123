<template>
  <div class="sideProfileInfo sideProfileInfoStudy sideProfileInfoBuddy" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}">

     <!--  <div class="userInfoBox">

      <a href="#" class="editTheme"><i class="material-icons">&#xE254;</i></a>

      <sidebarCommon/>
      <div class="linksBox linkedBoxes">
        <ul>
          <li v-for="sidebar in $store.state.sidebarBuddyContent">
            <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)" v-bind:class="{ active: sidebar.active }"><i class="material-icons mg-top col-gray" v-html="materialIconCode(sidebar)"></i> {{$t(`buddy.${sidebar.name}`)}}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>  -->

  <div class="leftMenu">
        <ul>

          <li v-for="sidebar in $store.state.sidebarBuddyContent.myHeader" v-bind:class="{ active: sidebar.active }">
            <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)" >
              <!-- <i class="material-icons mg-top col-gray" v-html="materialIconCode(sidebar)"></i> -->
              <span class="icons" :class="sidebar.iconClass"></span> {{$t($store.getters['isTeacher']() || $store.getters['isParent']()? `teacher.${sidebar.name}` : `buddy.${sidebar.name}`)}}</nuxt-link>
          </li>


          </ul>
      </div>



  </div>
</template>

<script>
import sidebarCommon from '~/components/sidebarCommon'
  export default {
    components: {sidebarCommon},
    methods: {
      changeLanguage(event) {
        if (event.target.value !== -1) {
          this.$store.dispatch('locale/setlanguage', {
            context: this,
            locale: event.target.value
          })
        }
      },
      materialIconCode(sidebarBuddy) {
        return sidebarBuddy.icon
      }
    }
  }
</script>

<style>
  .linkedBoxes {
    position: relative;
  }

  .linkedBoxes a i {
    color: #aaaaaa;
  }

  .linkedBoxes a.active i {
    color: #e54d8c;
  }

  i.material-icons.mg-top {
    position: absolute;
    top: 16%;
    left: 15px;
  }

  .linkedBoxes ul li {
    padding-left: 25px;
  }
</style>
