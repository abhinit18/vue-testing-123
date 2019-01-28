<template>
<div class="sideProfileInfo sideProfileInfoStudy" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}">
      <div class="leftMenu">
              <ul>
                <li v-if="$store.getters['isParent']()" v-for="sidebar in $store.state.sidebarStudyContent.parentHeader" v-bind:class="{ active: sidebar.active }">
                   <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"  ><span class="icons " :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</nuxt-link></li>
                <li v-if="!$store.getters['isParent']()" v-for="sidebar in $store.state.sidebarStudyContent.myHeader" v-bind:class="{ active: sidebar.active }">
                   <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"  ><span class="icons " :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</nuxt-link></li>



                  <!-- <li class="active">
                      <a href="#"><span class="icons mySubj"></span>
                      My Subject
                      </a>
                  </li>
                  <li>
                    <a href="#"><span class="icons myActivity"></span>
                    My Activity
                    </a>
                </li>
                <li>
                   <a href="#">
                   <span class="icons eBooks"></span>
                   E-Books
                  </a>
                </li>
                <li>
                    <a href="#">
                    <span class="icons eBooks"></span>
                    Notes
                    </a>
                </li>
                <li>
                    <a href="#">
                    <span class="icons bookmarks"></span>
                    Bookmarks
                    </a>
                </li>
                <li>
                    <a href="#">
                    <span class="icons likedResource"></span>
                    Liked Resources
                    </a>
                </li> -->

            </ul>
      </div>


      <!-- <div class="userInfoBox">
          <a href="#" class="editTheme"><i class="material-icons">&#xE254;</i></a> -->
          <!-- <sidebarCommon :sidebarUserStudy="true"/> -->


          <!-- <div class="linksBox"> -->

          <!-- <ul>
            <li><a class="active" href="#">{{$t('study.my_subjects')}}</a></li>
            <li><a href="#">{{$t('index.activity')}}</a>
              <ul>
                <li><a href="#">{{$t('index.unfinished_lessons')}}</a> </li>
                <li><a href="#">{{$t('study.recently_visited')}}</a> </li>
              </ul>
            </li>
            <li><a href="/note">{{$t('study.notes')}}</a> </li>
            <li><a href="#">{{$t('study.library')}}</a>
              <ul>
                <li><a href="#">{{$t('study.bookmarks')}}</a> </li>
                <li><a href="#">{{$t('study.liked_content')}}</a></li>
              </ul>
            </li>
            <li><a href="#">{{$t('study.ebooks')}}</a> </li>
          </ul> -->
          <!-- New sidebar of user study material -->
           <!-- <ul>
            <li v-for="sidebar in this.$store.state.sidebarStudyContent">
              <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"  v-bind:class="{ active: sidebar.active }">{{$t(sidebar.name)}}</nuxt-link> -->
              <!-- <ul v-if="sidebar.submenu">

                <li v-for="submenu in sidebar.submenu"><a :href="$store.getters['locale/getFinalUrl'](submenu.link)">{{$t(submenu.name)}}</a></li>

                <li v-for="submenu in sidebar.submenu"><a :href="submenu.link">{{$t(submenu.name)}}</a></li>

                <li><a href="#">{{$t('study.recently_visited')}}</a> </li>
             </ul> -->
             <!-- </li>
           </ul>

        </div>  -->

  </div>
</template>

<script>
import sidebarCommon from '~/components/sidebarCommon'
export default {
  components: {sidebarCommon},
  data(){
    return {

    }
  }
}
</script>
