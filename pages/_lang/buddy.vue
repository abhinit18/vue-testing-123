<template>
    <div class="contentSec rightSideBuddyList">



        <div class="scrollSec">

            <div class="conMidSec buddySec">

            <ol class="breadcrumb">
                              <li><a href="#">{{$store.getters['isTeacherOrParent']()? $t('teacher.buddies') : $t('index.buddies')}}</a></li>
                              <li class="active">{{$store.getters['isTeacherOrParent']()? $t('teacher.my_buddies') : title}}</li>
                            </ol>



                <div class="full-width mg-btm ">
                     <h3 class="smallHeading" v-if="this.$store.state.newBuddyRequest.fetchMyBuddyConnection && this.$store.state.newBuddyRequest.fetchMyBuddyConnection.length !== 0">
                       {{$store.getters['isTeacher']()||$store.getters['isParent']()? $t('teacher.my_buddies') : $t('buddy.my_buddies')}} ({{this.$store.state.newBuddyRequest.fetchMyBuddyConnection.length}})
                     </h3>

                   <div class="srchBox" v-if="this.$store.state.newBuddyRequest.fetchMyBuddyConnection">
                     <i class="material-icons srchIcon">search</i>
                      <input type="text" class="form-control" @input="searchBuddies" v-model="searchUser" :placeholder="$t('search.search')">
                    </div>
                    <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padd-0">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 padd-0">
                          <input class="form-control customInput" @input="searchBuddies" v-model="searchUser" :placeholder="$t('search.search')">
                          <span class="material-icons pos-set">search</span>
                        </div>
                        <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12" v-if="this.$store.state.newBuddyRequest.fetchMyBuddyConnection && this.$store.state.newBuddyRequest.fetchMyBuddyConnection.length !== 0">
                          <h6 class="col-lg-12 col-md-12 col-xs-12 text-right pad-right-25">
                            {{this.$store.state.newBuddyRequest.fetchMyBuddyConnection.length}} Buddies
                          </h6>
                        </div>
                    </div> -->
                </div>
                <div class="buddyListSec clearfix">
                    <ul v-if="this.$store.state.newBuddyRequest.fetchMyBuddyConnection.length>0" class="buddylistinline">
                      <li class="buddycustom-box" v-for="buddy in this.$store.state.newBuddyRequest.fetchMyBuddyConnection">
                          <btnDropdownMenu :buddy="buddy" :pageStatus="pageStatus"></btnDropdownMenu>
                      </li>
                      <li v-if="!$store.state.newBuddyRequest.fetchMyBuddyConnection">
                        <nobuddy/>
                      </li>
                    </ul>
                   


                    <div v-else class="placeholderSec">
                      <div class="placeHoldConMid zoomIn">
                          <div class="placeHolderImg">
                              <img src="~assets/images/placeholder/plcHold_empty.png">
                          </div>
                          <h2 class="placeholderHeading">{{$t('parentLog.noResult')}}</h2>
                      </div>
                  </div>




                </div>
            </div>
        </div>
        <div class="loader" v-if="loading"></div>
    </div>
</template>

<script>
import nobuddy from '~/components/placeholders/nobuddy'
import btnDropdownMenu from '~/components/view/buddyCardsView'

export default {
  head () {
			return {
			title: this.title
			}
		},
    middleware: 'authenticated',
    data () {
      return {
        showMenu: false,
        searchUser:'',
        pageStatus: 'Buddy',
        loading: false,
        			title: this.$t(this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.buddies': 'buddy.my_buddies')
      }
    },
    components: { btnDropdownMenu, nobuddy },
    mounted () {
      this.$store.dispatch('header/navChange', {key: 3, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
      this.$store.dispatch('sidebarBuddyContent/navChange',1)
      this.$store.dispatch('newBuddyRequest/fetchConnections', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      this.$store.dispatch('snowPlowPageView',{pageName: "BUDDIES_MY_BUDDIES"});
    },
    layout: 'buddyContent',
    methods: {
      dropdown(event) {
        let temp = this.showMenu
        this.showMenu = !temp
      },
      searchBuddies(value) {
        this.$store.dispatch('newBuddyRequest/fetchSearchedMybuddyConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser, pageStatus: this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      }
    }
}

</script>
<style>/*
.addBuddyBtn{
  font-size:12px;margin-right:3px;width:100%;min-height: 20px;border-radius: 0px;background-color: #e54d8c;color:#fff;
}
.padd-0{
  padding:0px;
}
.mg-btm{
  margin-bottom: 15px;
}
.bg-pink{
  background: #e54d8c;
}
.Line-3-Copy {
  width: 112px;
  height: 1px;
  border: solid 1px #efefef;
  margin:0 auto;
}
.pos-rel{position:relative;}
.dropdown-container{
    position: relative;
    display: block;
    float: left;
    max-width: 160px;
    width:100%;
    margin: 0px;
}
.custom-dropdown{
  width:100%;
}
.main-dropdown{
  position: absolute;
  top:0px;
  width: 150px;
  background: #fff;
  box-shadow: 0 0 6px #dfdfdf;
}
.custom-caret-placement{
  position: absolute;
}

.full-width{float:left;width:100%;}
.customInput{max-width:300px;height:40px;border-color:#ffe45f;border-radius:4px;padding-right:40px;}
.pos-set{position: absolute;top:8px;right:10px;color:#e9b53d;}
.buddycustom-box{max-width: 180px;padding-left:0px !important;padding-right:0px !important;margin-right:25px;text-align: center;min-height:220px;padding-top:24px;border:1px solid #dfdfdf;float: left;width: 100%;background: #fff;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;}
.buddy-img-box{
  position: relative;
    width: 62px;margin: 0 auto;
}
.buddyImg{
  width:62px;
}
.goldTag{
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AwLCAtMTk0LjI1MDAwMCkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat 10% 0;
    display: inline-block;
    width: 52px;
    line-height: 20px;
    height: 42px;
    color: #fff;
    font-size: 14px;
    background-size: 52px;
    position: absolute;
    padding: 19px 0 0;
    z-index: 2;
    top: 48px;
    left: 5px;
}


.grade-list{font-family: Roboto;font-size: 12px;text-align: center;color: #737373;}
.mg-top-30{margin-top:30px;}
.mg-top-15{margin-top:15px;}
.accpt-buddy-btn{font-size:12px;padding:6px 23.6px;min-height: 20px;border-radius: 0px;background-color: #e54d8c;color:#fff;}
.decline-buddy-btn{
  // max-width: 77px;
  font-size:12px;
  padding:6px 23.6px;
  min-height: 20px;
  color:#e54d8c;
  border-radius: 0px;
  background-color: #fff;

}
.rightSideBuddyList{max-height: calc(100vh - 10px)}
.pad-right-25{padding-right:25px;color:gray;}*/
</style>
