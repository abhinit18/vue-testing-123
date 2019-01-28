<template>
     <div class="achivementPage">
     <!-- <ul class="coinsListing">
          <li class="earnedListng" v-for="data in subjects">
            <div class="rightInfo">
                <h4 class="coinsStatus">{{data.points}} {{$t('index.points')}}</h4>
                 <p class="smText">{{data.rank}}</p>
            </div>
             <div :class="{badgeIcon: data.badge!=='NONE', yellow: data.badge==='GOLD', voilet: data.badge==='SILVER'}">
			</div>
            <div class="ubadgeProfile" v-if="data.badge">
                 <img src="~assets/images/Silver_Badge.png" v-if="data.badge==='SILVER'">
                 <img src="~assets/images/Bronze_Badge.png" v-if="data.badge==='BRONZE'">
                 <img src="~assets/images/Gold_Badge.png" v-if="data.badge==='GOLD'">
             </div>

            <div class="leftInfo">
                <div class="earnedCoinsIcon byPost">
                </div>
                <div class="ubadgeProfile" v-if="data.badge">
                     <img src="~assets/images/Silver_Badge.png" v-if="data.badge==='SILVER'">
                     <img src="~assets/images/Bronze_Badge.png" v-if="data.badge==='BRONZE'">
                     <img src="~assets/images/Gold_Badge.png" v-if="data.badge==='GOLD'">
                 </div>

                <div class="earnedSpentInfo">
                    <h4 class="earnedSpentHeading"> <span class="earnedIcon"></span> {{data.rank}} {{$t('common.in')}} {{data.subjectName}}</h4>
                </div>
            </div>
        </li>
        </ul> -->
        <ul class="coinsListing ">
          <li class="earnedListng">
                <div class="earnedSpentInfo">
                    <img :src ='userBadge.currentBadgePicPath' />
                    <h4><!-- <span class="earnedIcon"></span> --> <span v-if="!$store.getters['isParent']()">{{$t('common.youHaveEarned')}}</span><span v-else>{{$t('common.childHaveEarned')}}</span> <label>{{userBadge.userCurrentBadge!==''? (userBadge.userCurrentBadge) : $t('common.no')}} {{$t('common.badge')}}</label></h4>
                </div>

            </li>
        </ul>
            <h3>{{$t('scoreboard.available_achievements')}} </h3>
           <ul class="coinsListing">
            <li class="" v-for="badge in allBadges">
                <img :src="badge.picPath">
                <span> {{getBadgeName(badge)}}</span>
                <span class="pointsRequired">( {{$t('scoreboard.points_required')}} : <label>{{badge.pointsRequired}}</label> )</span>
            </li>

        </ul>




         </div>
        <!-- <li class="spentListng">
            <div class="rightInfo">
                <h4 class="coinsStatus"> - 100 Coins</h4>
                <p class="smText">30 Oct 2017</p>
            </div>
            <div class="leftInfo">
                <div class="earnedCoinsIcon spentOnTheme">
                </div>
                <div class="earnedSpentInfo">
                    <h4 class="earnedSpentHeading"><span class="earnedIcon"></span>Spent on theme unlock</h4>
                    <p class="aboutPost">Azure theme</p>
                    <p class="postStaus">Brittanica</p>
                </div>
            </div>
        </li>
        <li class="earnedListng">
            <div class="rightInfo">
                <h4 class="coinsStatus"> + 25 Coins</h4>
                <p class="smText">30 Oct 2017</p>
            </div>
            <div class="leftInfo">
                <div class="earnedCoinsIcon byPost">
                </div>
                <div class="earnedSpentInfo">
                    <h4 class="earnedSpentHeading"><span class="earnedIcon"></span>Earned by post activities</h4>
                    <p class="aboutPost">Home posts</p>
                    <p class="postStaus">Liked, Commented, Shared</p>
                </div>
            </div>
        </li>
        <li class="spentListng">
            <div class="rightInfo">
                <h4 class="coinsStatus"> - 25 Coins</h4>
                <p class="smText">30 Oct 2017</p>
            </div>
            <div class="leftInfo">
                <div class="earnedCoinsIcon spentByPlay">
                </div>
                <div class="earnedSpentInfo">
                    <h4 class="earnedSpentHeading"><span class="earnedIcon"></span>Spent by playing game</h4>
                    <p class="aboutPost">Puzzle ludo</p>
                    <p class="postStaus">Tatra Games</p>
                </div>
            </div>
        </li> -->


</template>

<script>
    export default {
        data () {
            return {
                userBadge: {},
                allBadges: []
            }
        },
        props: ['userId'],
        mounted() {
            this.fetchData()
        },
        methods: {
            getBadgeName(badge){
            return badge[this.$store.state.locale.selectedLocale + 'BadgeName']
            }
            ,fetchData() {
                let userDataId = ''
                if(this.$store.getters['isParent']()){
                    userDataId = this.$store.state.currentSelectedChild.id
                }else{
                    userDataId = this.userId
                }
                let payload = {
                    // 'duration': 'W',
                    // 'role': this.$store.state.initialData.roles[0],
                    'userId': userDataId
                }
                this.$store.dispatch(`scoreboard/userAchievements`, {
                    authToken: this.$store.state.auth.user.token,
                    langCode: this.$store.state.locale.selectedLocale,
                    payload
                }).then((response) => {
                    this.userBadge = response
                    let role = this.$store.state.initialData.roles[0]
                    if(role === 'PARENT'){
                      role = 'STUDENT'
                    }
                    this.allBadges = response.badgeAll.filter( badge => badge.idealFor == (role) )
                })
            }
        }
    }
</script>
