<template>
	<div class="bodyCon clearfix">
		<section class="container">
			<div class="pagebox clearfix">
				<div class="pageboxOver" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}"></div>

				<sidebarUser v-if="!$store.getters['isParent']()"></sidebarUser>
				<sidebarUserStudy v-if="$store.getters['isParent']()"></sidebarUserStudy>
				<div class="contentSec ">
					<div class="scrollSec">

					<div class="conMidSec">
						 <ol class="breadcrumb">
                              <li><a href="#">{{$t('index.home')}}</a></li>
                              <li class="active">{{title}}</li>
                            </ol>
                            </div>
 						<div class="primaryContentSec clearfix">

                    <div class="primaryContentSecInner clearfix">

						<div class="scoreCardSec clearfix">
							<div class="conMidSec">
								<div class="whiteTab clearfix">
									<ul>

										<!-- <li><a href="#"> {{$t('scoreboard.overall_points')}} </a></li> -->
										 <li :class="{active: selectedTab==='achievements'}"><a @click="changeTab('achievements')"> {{$t('scoreboard.achievements')}} </a></li>
										 <li :class="{active: selectedTab==='weekly_points'}"><a @click="changeTab('weekly_points')"> {{$t('scoreboard.weekly_points')}} </a></li>
										<li :class="{active: selectedTab==='coins'}"><a @click="changeTab('coins')"> {{$t('scoreboard.coins')}} </a></li>
									</ul>
								</div>
							</div>
							<scoreboard  v-if="selectedTab==='weekly_points'" :userId="$store.getters['getUserId']()"/>


						</div>










							<coins v-if="selectedTab==='coins'"/>
						<div class="conMidSec"  v-if="selectedTab==='achievements'">
						<achievements v-if="selectedTab==='achievements'" :userId="$store.getters['getUserId']()"/>
						</div>
						<!-- Themes -->
						<!-- <div class="scoreCardSec clearfix">

							<div class="tabContent">

								<div class="conMidSec">
									<div class="whiteTabBorderd clearfix coinswhiteTabBorderd">
										<ul class=" ">
											<li><a href="#"> {{$t('scoreboard.all')}} </a></li>
											<li><a href="#"> {{$t('scoreboard.earned')}} </a></li>
											<li><a href="#"> {{$t('scoreboard.spent')}} </a></li>
											<li class="active"><a href="#"> {{$t('scoreboard.themes')}} </a></li>
											<li class="mascot">
												<a href="#">
													 <span class="mascotIcon"></span> <i class="material-icons">&#xE91D;</i> Pet</a>
											</li>
										</ul>
									</div>

									<div class="innerTabContent innerTabScroll">
										<ul class="coinsListing themeListing">
											<li class="unLockTheme">
												<div class="rightInfo">
													<h4 class="coinsStatus"> 100 <span>Coins</span></h4>
													<a href="#" class="buyBtn"> Buy </a>
												</div>
												<div class="leftInfo">
													<div class="unlockThemeImg">
														<img src="~/assets/images/theme_1.png">
													</div>
													<div class="earnedSpentInfo">
														<h4 class="earnedSpentHeading">Unlock theme</h4>
														<p class="aboutPost">Grasslands</p>
														<p class="postStaus">Brittanica</p>
													</div>
												</div>
											</li>
											<li class="unLockTheme">
												<div class="rightInfo">
													<h4 class="coinsStatus"> 100 <span>Coins</span></h4>
													<a href="#" class="buyBtn"> {{$t('scoreboard.buy')}} </a>
												</div>
												<div class="leftInfo">
													<div class="unlockThemeImg">
														<img src="~/assets/images/theme_1.png">
													</div>
													<div class="earnedSpentInfo">
														<h4 class="earnedSpentHeading">Unlock theme</h4>
														<p class="aboutPost">Grasslands</p>
														<p class="postStaus">Brittanica</p>
													</div>
												</div>
											</li>
											<li class="unLockTheme">
												<div class="rightInfo">
													<h4 class="coinsStatus"> 100 <span>Coins</span></h4>
													<a href="#" class="buyBtn"> {{$t('scoreboard.buy')}} </a>
												</div>
												<div class="leftInfo">
													<div class="unlockThemeImg">
														<img src="~/assets/images/theme_1.png">
													</div>
													<div class="earnedSpentInfo">
														<h4 class="earnedSpentHeading">Unlock theme</h4>
														<p class="aboutPost">Grasslands</p>
														<p class="postStaus">Brittanica</p>
													</div>
												</div>
											</li>

										</ul>

									</div>
								</div>
							</div>

						</div> -->



							</div>
						</div>









					</div>


				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import sidebarUser from '~/components/sidebarUser'
	import sidebarUserStudy from '~/components/sidebarUserStudy'
	import scoreboard from '~/components/profile/scoreboard'
	import coins from '~/components/scoreboard/coins'
	import achievements from '~/components/scoreboard/achievements'
	export default {
		head () {
			return {
			title: this.title
			}
		},
		middleware: 'authenticated',
		data() {
			return {
				timeFilter: [{
						code: 'D',
						name: 'activity.daily'
					},
					{
						code: 'W',
						name: 'activity.weekly'
					},
					{
						code: 'M',
						name: 'activity.monthly'
					},
				],
				selectedFilter: 'D',
				rankData: [],
				selectedTab: 'achievements',
				title: this.$t('index.scoreboard')
			}
		},
		methods: {
			changeTimeFilter(code) {
				this.selectedFilter = code
				this.fetchData()
			},
			changeTab (tab) {
				this.selectedTab = tab
			}
		},
		components: {
			sidebarUser, scoreboard, coins, achievements,sidebarUserStudy
		},
		mounted() {
			if(this.$store.getters['isParent']()) {
				this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
				this.$store.dispatch('sidebarStudyContent/parentNavChange', 3)
			}else{
				this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
				this.$store.dispatch('sidebarHomeContent/navChange', 3)
			}
			this.$store.dispatch('snowPlowPageView',{pageName: "HOME_SCOREBOARD"});

		}
	}
</script>
