<template>

						<!-- Coins -->
	
	
						<div class="scoreCardSec clearfix scoreboardPg" >
							<div class="conMidSec">
								<!-- <div class="whiteTab clearfix">
									<ul>
										<li><a href="#"> {{$t('scoreboard.weekly_points')}} </a></li>
										<li><a href="#"> {{$t('scoreboard.overall_points')}} </a></li>
										<li><a href="#"> {{$t('scoreboard.achievements')}} </a></li>
										<li class="active"><a href="#"> {{$t('scoreboard.coins')}} </a></li>
									</ul>
								</div> -->
	
								
								<div class="tabContent">
									<p class="welcomText" v-if="!$store.getters['isParent']()">{{$t('scoreboard.manage_coins')}}</p>
									<p class="welcomText" v-else>{{$t('scoreboard.manageParent_coins')}}</p>
									<div class="coinBalanceSec">
	
										<div class="totalBalancesec">
											<button v-if="!$store.getters['isParent']()" class="btn btn-primary pull-right" @click="goToRedeem">{{$t('redeem.redeem')}}</button>
											<div class="coinsIcon"></div>
											<h4 v-if="!$store.getters['isParent']()">{{$t('scoreboard.your_balance')}} <strong>{{userCoins}}</strong> {{$t('scoreboard.coins')}}</h4>
											<h4 v-else>{{$t('scoreboard.your_child_balance')}} <strong>{{userCoins}}</strong> {{$t('scoreboard.coins')}}</h4>
											 <!-- <div class="coinsIcon">
				                               </div> -->
											   
											
											<!-- <h3 class="tatoalCoins">2500 <span>{{$t('scoreboard.coins')}}</span></h3>
						                        <p class="totalBalTxt">{{$t('scoreboard.total_balance')}}</p> -->
										</div>
	
									</div>
								
	
								<div class="whiteTabBorderd clearfix coinswhiteTabBorderd">
									<ul>
										<!-- <li class="active"><a href="#"> {{$t('scoreboard.all')}} </a></li> -->
										<li :class="{active: (activeTab===tab.code)}" v-for="tab in availableTabs"><a @click="changeCoinTab(tab.code)"> {{$t('scoreboard.'+tab.code)}} </a></li>
										<!-- <li><a href="#"> {{$t('scoreboard.themes')}} </a></li>
										<li class="mascot">
											<a href="#">
												 <span class="mascotIcon"></span><i class="material-icons">&#xE91D;</i> Pet</a>
										</li> -->
									</ul>
								</div>
	
								<div class="innerTabContent innerTabScroll">
									
									<div class="timeSelectSec coinsSec">
										<div class="timeSelect">
											<div class="timeDropIcon"> <i class="material-icons">expand_more</i> </div>
											<span class="selectedTime"> {{$t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].name)}} </span>
											<ul class="timeSelectList">
												<li @click="changeTimeFilter(time.code)" v-for="time in timeFilter"> {{$t(time.name)}} </li>
											</ul>
										</div>
										<h3 class="leftTimeInfo">{{$t('scoreboard.last_3')}} {{$t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].name)}} {{$t(availableTabs.filter(tab => tab.code===activeTab)[0].name1)}}</h3>
									</div>
									<div class="coinSecPeriodSec">
										<div class="coinSecPeriod">
											<div class="coinPeriodBox" v-for="tenure in lastTenures">
												<div class="roundPeriodBox">
													<h4 class="coinsNum">{{tenure.totalCoins}}</h4>
													{{$t('scoreboard.coins')}}
												</div>
												{{tenure.label}}
											</div>
										</div>
									</div>
									<!-- <ul class="coinsListing">
										<li class="earnedListng">
											<div class="rightInfo">
												<h4 class="coinsStatus"> + 50 Coins</h4>
												<p class="smText">30 Oct 2017</p>
											</div>
											<div class="leftInfo">
												<div class="earnedCoinsIcon byPost">
												</div>
												<div class="earnedSpentInfo">
													<h4 class="earnedSpentHeading"><span class="earnedIcon"></span>Earned by post activities</h4>
													<p class="aboutPost">Home posts</p>
													<p class="postStaus">Liked, Commented</p>
												</div>
											</div>
										</li>
										<li class="spentListng">
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
										</li>
	
									</ul> -->
	
								</div>
								</div>
							</div>
	
	
						</div>
</template>

<script>
export default {
	data () {
		return {
            userCoins: 0,
            lastTenures: [],
             timeFilter: [{
            code: 'D',
            name: 'activity.days'
          },
          {
            code: 'W',
            name: 'activity.weeks'
          },
          {
            code: 'M',
            name: 'activity.months'
          },
        ],
        selectedFilter: 'M',
		selectedSubjectId: 0,
		activeTab: 'earned',
		availableTabs: [{code: 'earned', name: 'Earned', name1: 'scoreboard.earning'},
		{code: 'spent', name: 'Spent', name1: 'scoreboard.spending'}]
		}
	},
	mounted () {
		this.fetchData()
	},
	methods: {
		fetchData () {
			
			let payload = {
          'duration': this.selectedFilter,
          'role': this.$store.state.initialData.roles[0],
		  'subjectId': this.selectedSubjectId,
		  'type': this.activeTab
		}
		if(this.$store.getters['isParent']()) {
			payload.childId = this.$store.state.currentSelectedChild.id
		}
		this.$store.dispatch(`scoreboard/scoreBoardUserCoins`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
            this.userCoins = response.totalCoins
        })
        this.$store.dispatch(`scoreboard/scoreBoardLastThreeTenure`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
            this.lastTenures = response.progressGraphPointData
        })
		},
		changeTimeFilter(code) {
        this.selectedFilter = code
        this.fetchData()
	  },
	  changeCoinTab (value) {
		  this.activeTab = value
		  this.fetchData()
	  },
	  goToRedeem () {
		  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/redeem`))
	  }
	}
}
</script>