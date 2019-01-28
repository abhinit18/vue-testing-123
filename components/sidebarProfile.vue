<template>
<div class="sideProfileInfo sideProfileInfoProfile" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}">
  <a @click="openEditThemeMethod" class="editTheme" v-if="$store.getters['isMyProfile'](profile.userId)"><i class="material-icons">&#xE254;</i></a>
      <div class="userInfoBox">
        <sidebarCommon type="profile" :profile="profile"/>

         <div class="unfinishedBox profileInfiSide">
           <!-- <h4>{{$t('common.about')}}</h4> -->
           <div class="text">
                <sidebarCommonInfo :profile="profile"/>
           </div>
          <!--  <div class="btnSec clearfix">&nbsp;</div> -->
        </div>
<div class="copyRight"><span v-html="$t('common.footer')"></span></div>
          <!-- <div class="unfinishedBox profileInfiSide">
           <h4>{{$t('common.bio')}}</h4>
           <div class="text">
               <ul>
                 <li class="bio"><i class="material-icons">&#xE8A3;</i> {{profile? profile.bio: ''}}</li>
               </ul>
           </div>
        </div> -->

      </div>
  </div>
</template>

<script>
import sidebarCommon from '~/components/sidebarCommon'
import sidebarCommonInfo from '~/components/sidebarCommonInfo'
export default {
    components: {sidebarCommon, sidebarCommonInfo},
    props: ['profile'],
    methods: {
      openEditThemeMethod () {
        this.$root.$emit('openEditTheme', {})
      }
    }
}
</script>
