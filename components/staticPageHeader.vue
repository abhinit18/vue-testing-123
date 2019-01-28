<template>
<header class="mrkHeader" v-if="platform==='web'">
  <div class="mrkConMid">
      <div class="headerLeft" >
        <span class="marktMobMenu closeMobMenu">
        <i class="burger_bar"></i>
        </span>
        <span class="marktLogo" style="cursor:default !important" >
          <router-link :to="$store.getters['locale/getFinalUrl']('/marketing')"><img src="~assets/images/marketing/logo2.png"></router-link>
        </span>
        <div class="langShowMob">
            <languageSelectBox />
        </div>
      </div>
      <nav>
        <ul>
            <!-- <li class="langShowWeb">
              <languageSelectBox />
            </li> -->
            <!-- <li><a @click="back" class="headerCloseBtn"><i class="material-icons">&#xE5CD;</i></a></li> -->
        </ul>
      </nav>
  </div>
</header>
</template>

<script>
import languageSelectBox from '~/components/languageSelectBox'
export default {
    components: {
      languageSelectBox
    },
    props: ['back', 'platform']
}
</script>
