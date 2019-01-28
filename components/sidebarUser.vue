<template>
              <div class="sideProfileInfo" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}">
                    <div class="userInfoBox">

                        <!-- <a href="#" class="editTheme"><i class="material-icons">&#xE254;</i></a> -->

                        <sidebarCommon/>

                        <div class="unfinishedBox" v-if="!$store.getters['isParent']() && $store.state.content.unfinished && $store.state.content.unfinished.length>0 && $store.state.content.unfinished.filter(lesson => lesson.body.length>0).length>0">
                            <h4><i class="icons unfnishedicon"></i> {{$t('index.unfinished_lessons')}}</h4>

                            <div class="text">

                                <div class="media" v-for="unfinished in $store.state.content.unfinished.filter(lesson => lesson.body.length>0)" @click="goToContentView(unfinished)">
                                    <div class="media-left">
                                        <div class="thumb"><img :src="unfinished.body[0].thumbnail" class="tempContentSize"><span :class="getIcon(unfinished.type)"></span></div>
                                    </div>
                                    <div class="media-body">
                                      <h5 class="media-heading"><a>{{unfinished.body[0].title}}</a></h5>
                                    </div>
                                </div>
                            </div>
                            <div class="btnSec clearfix" v-if="$store.state.content.unfinished.length"><a class="btn btn-link" @click="goTo('/activity')">{{$t('common.viewall')}}</a></div>
                        </div>
                        <div class="unfinishedBox" v-else-if="!$store.getters['isParent']() &&  recommendation.length>0">
                            <h4><i class="icons unfnishedicon"></i> {{$t('common.recommended')}}</h4>

                            <div class="text">

                                <div class="media"  v-for="recommended in recommendation" @click="goToContentView(recommended)">
                                    <div class="media-left">
                                        <div class="thumb"><img :src="recommended.body[0].thumbnail" class="tempContentSize"><span :class="getIcon(recommended.type)"></span></div>
                                    </div>
                                    <div class="media-body">
                                      <h5 class="media-heading"><a>{{recommended.body[0].title}}</a></h5>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="btnSec clearfix" v-if="$store.state.content.unfinished.length"><a class="btn btn-link" @click="goTo('/activity')">{{$t('common.viewall')}}</a></div> -->
                        </div>
                        <!-- <a href="javascript: $zopim.livechat.bubble.hide();">
<button>Hide</button>
</a>
<a href="javascript: $zopim.livechat.bubble.show();">
<button>Show</button>
</a> -->
                        <div class="mscrt">

                            <div class="mascotHlp">

                                <!--OpT Starts-->
                                <div class="minner">
                                <h3 style="font-size:13px;">{{$t('common.cocoTextHead')}}
                                  <br>
                                  <div class="trailInfo" style="width:auto;height:auto;margin:7px 0 0 0px;">
                                    Welcome to <b>budbeed </b> <br>I am <b>COCO</b> {{$t('common.cocoText')}} <menu>
                                     <ul>
                                       <li><a @click="goTo('/help')">{{$t('common.help')}}</a></li>
                                       <li><a @click="goTo('/faq')">{{$t('common.faqs')}}</a></li>
                                     </ul>

                                    </menu>
                                  </div>
                                </h3>
                                </div>


                          </div>

                          <img :src="$store.getters['getUserMascot']()" @click="cocoView = !cocoView">
                        </div>


                    </div>

                    <div class="leftMenu">
                        <ul>
                            <!-- <li v-for="sidebar in this.$store.state.sidebarStudyContent">
              <nuxt-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"  v-bind:class="{ active: sidebar.active }">{{$t(sidebar.name)}}</nuxt-link>
              <ul v-if="sidebar.submenu">
                <li v-for="submenu in sidebar.submenu"><a :href="$store.getters['locale/getFinalUrl'](submenu.link)">{{$t(submenu.name)}}</a></li>
                 <li><a href="#">{{$t('study.recently_visited')}}</a> </li>
              </ul>
            </li> -->

            <!-- 
              diffrent headers for parent/student vs parent/student with tour 
            -->
                            <li v-if="$store.getters['isParent']() && !$store.state.initialData.isTourUser" v-for="sidebar in $store.state.sidebarHomeContent.parentHeader" :class="{ active: sidebar.active }"><router-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"><span class="icons leftIcons" :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</router-link></li>
    
                        <li v-if="$store.getters['isParent']() && $store.state.initialData.isTourUser" v-for="sidebar in $store.state.sidebarHomeContent.parentHeaderTour" :class="{ active: sidebar.active }"><router-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"><span class="icons leftIcons" :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</router-link></li>




                            <li v-if="!$store.getters['isParent']() && !$store.state.initialData.isTourUser" v-for="sidebar in $store.state.sidebarHomeContent.myHeader" :class="{ active: sidebar.active }"><router-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"><span class="icons leftIcons" :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</router-link></li>

                            <li v-if="!$store.getters['isParent']() && $store.state.initialData.isTourUser" v-for="sidebar in $store.state.sidebarHomeContent.myHeaderTour" :class="{ active: sidebar.active }"><router-link :to="$store.getters['locale/getFinalUrl'](sidebar.link)"><span class="icons leftIcons" :class="sidebar.innerClass"></span>{{$t(sidebar.name)}}</router-link></li>
                            
    






                            <!-- <li :class="{active: selectedSideBar==='activity'}">
                          <router-link :to="$store.getters['locale/getFinalUrl']('/activity')"><span class="icons leftIcons myProgress"></span> {{$t('index.activity')}}</router-link>
                          </li>
                            <li :class="{active: selectedSideBar==='scoreboard'}">
                          <router-link :to="$store.getters['locale/getFinalUrl']('/scoreboard')"><span class="icons leftIcons scoreBoard"></span> {{$t('index.scoreboard')}}</router-link>
                          </li>
                            <li>
                          <router-link :to="$store.getters['locale/getFinalUrl']('/scoreboard')"><span class="icons leftIcons referFriends"></span> {{$t('index.scoreboard')}}</router-link>
                          </li> -->

                        </ul>
                    </div>

                    <div class="copyRight"><span v-html="$t('common.footer')"></span></div>

                </div>
</template>

<script>
import sidebarCommon from '~/components/sidebarCommon'
export default {
    data () {
        return {
            selectedSideBar: 'idea_board',
            cocoView: false,
            recommendation: []

        }
    },
    methods: {
        getIcon(type) {
                if (type === 'ARTICLE') {
                    return 'articleicon'
                } else if (type === 'EPUB') {
                    return 'texticon'
                } else {
                    return 'vidicon'
                }
            },
        changeSelectedSidebar (sidebar) {
            this.selectedSideBar = sidebar
        },
        goTo (toAddress) {
             this.$router.push(this.$store.getters['locale/getFinalUrl'](`${toAddress}`))
        },
        goToContentView (content) {
           this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${content.contentId}`))
        },
        fetchRecommendation () {
        this.$store.dispatch('search/contentSearch', {
        type: 'ALL',
        q: '',
        page: 0,
        size: 2,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        childId:this.$store.getters['getCurrentChildId']()
      }).then((response) => {
        if (response.data.contents) {
          this.recommendation = response.data.contents
        }
      })
      }
    },
    components: {sidebarCommon},
    mounted () {
        this.fetchRecommendation()
    }
}
</script>
