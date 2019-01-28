<template>
<div>


<div class="tabContent" >
								<div class="conMidSec">
									<div class="coloredtab">
										<!-- <a href="#" class="activityMoreBtn moreLeft"><i class="material-icons">chevron_right</i></a> -->
										<ul class="tabBtn">
											<!-- <li :class="{active: selectedSubjectId===0}">
                      <a @click="changeSubject(0)"> {{$t('activity.all_subjects')}} </a>
                    </li>
                    <li v-if="!$store.getters['isTeacher']()" v-for="subject in $store.state.content.subjects" :class="{active: selectedSubjectId===subject.id}">
                      <a @click="changeSubject(subject.id)"> {{subject.name}} </a>
                    </li> -->
											<li v-if="!$store.getters['isTeacher']()" v-for="subject in subjects" :class="{active: selectedSubjectId===subject.subjectId}">
                      	<a @click="changeSubject(subject.subjectId)"> {{subject.subjectName}} </a>
                    	</li>
											<li :class="{active: selectedSubjectId==='0'}" v-if="$store.getters['isTeacher']()">
                      <a @click="changeSubject(0)"> {{$t('activity.all_subjects')}} </a>
                    </li>
										</ul>
										<!-- <a href="#" class="activityMoreBtn"><i class="material-icons">chevron_right</i></a> -->
									</div>

									<div class="innerTabContent innerTabScroll">
										<!-- <div class="subTitleSec">
							                <div class="rightTilte">11 - 17 Sept 2017</div>
							                <div class="subTitle"><i class="material-icons">arrow_drop_up</i> Maths</div>
						                </div> -->
										<ul class="testimonialListing">
											<li v-if="userRank.userName">
												<img :src="$store.getters['getUserMascot']()" @click="cocoView = !cocoView" width="58" class="imgMsct">
												<div class="pointSec piontBadgeSec">
														<img class="currentBadgePic" style="width: 30px;" :src="userRank.currentBadgePicPath" v-if="userRank.currentBadgePicPath!=='' && userRank.currentBadgePicPath!=='NONE'"/>
													<h4 class="pointTxt">{{userRank.totalPoints}} {{$t('index.points')}}</h4>
													<!-- <p class="smText">11 - 17 Sept 2017</p> -->
													<div class="select">
														<!-- <span class="icons select__arrow"></span>
														<select>
						                   	    	<option @click="changeTimeFilter(time.code)" v-for="time in timeFilter"> {{$t(time.name)}} </option>
						                  </select> -->
															<div class="timeSelect">
											<div class="timeDropIcon"> <i class="material-icons">expand_more</i> </div>
											<span class="selectedTime"> {{$t(timeFilter.filter((timeF) => (timeF.code === selectedFilter))[0].name)}} </span>
											<ul class="timeSelectList">
												<li @click="changeTimeFilter(time.code)" v-for="time in timeFilter"> {{$t(time.name)}} </li>
											</ul>
										</div>
													</div>
												</div>
												<div class="tetimonialInfo self">
													<div class="rankBox">
														<div class="rankPoint">{{userRank.rank}}</div>
														<p class="rankTxt">{{$t('common.rank')}}</p>
													</div>
													<postImageBox :imageObj="{username: userRank.userName, userpic: userRank.pic, userid: userRank.userId}"/>
													<div class="commentSec">
														<p class="comments"><a @click="goToProfile(userRank.userId)">{{userRank.userName}}</a></p>
													</div>
													

												</div>
											</li>
											<li v-for="rank in rankData" :key="rank.rank">
												<div class="pointSec">
													<h4 class="pointTxt">{{rank.totalPoints}}</h4>
												</div>
												<div class="tetimonialInfo">

													<!-- <div :class="{badgeIcon: rank.badge!=='NONE', yellow: rank.badge==='GOLD', voilet: rank.badge==='SILVER'}">
													</div> -->
													<div class="ubadgeProfile" v-if="rank.currentBadgePicPath!=='' && rank.currentBadgePicPath!=='NONE'">
										                 <img :src="rank.currentBadgePicPath" style="width: 30px;">
										             </div>


													<div class="testimonialNum">
														{{rank.rank}}
													</div>
													<postImageBox :imageObj="{username: rank.userName, userpic: rank.pic, userid: rank.userId}"/>
													<div class="commentSec">
														<p class="testmonialName" @click="goToProfile(rank.userId)">{{rank.userName}}</p>
														<!-- <p>{{rank.schoolName}}</p> -->
													</div>
													 <div class="rankedIcon" v-if="rank.rank==='1'">1
						                   	       </div>
						                   	       <div class="rankedIcon" v-if="rank.rank==='2'">2
						                   	       </div>
						                   	       <div class="rankedIcon" v-if="rank.rank==='3'">3
						                   	       </div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
            </div>
</template>

<script>
import postImageBox from '~/components/postImageBox'
export default {
		props: ['userId', 'profile'],
    data () {
        return {
            selectedFilter: 'M',
						selectedSubjectId: "0",
						subjects: [],
            userRank: {},
            rankData: [],
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
        ]
        }
    },
    components: {postImageBox},
    mounted() {
			// TODO temporary arrangement
			//  if (this.$store.state.content.subjects.length === 0 && !this.$store.getters['isTeacher']()) {
      //   this.$store.dispatch('content/fetchSubject', {
      //     curriculumId: this.$store.getters['getCurrentGrade']().curriculumId,
      //     id: 1,
      //     authToken: this.$store.state.auth.user.token,
      //     langCode: this.$store.state.locale.selectedLocale
      //   })
			// }
				this.fetchSubjects()
				this.fetchData()

    },
    methods: {
        changeSubject(subjectId) {
        this.selectedSubjectId = subjectId
        this.fetchData()
      },
      changeTimeFilter(code) {
        this.selectedFilter = code
        this.fetchData()
      },
      fetchData() {
				let role = this.profile? this.profile.role : this.$store.state.initialData.roles[0]
        let payload = {
          'duration': this.selectedFilter,
          'role': role,
          'subjectId': this.selectedSubjectId,
					'userId': this.userId
				}
				if(this.$store.getters['isParent']()) {
					payload.childId = this.$store.state.currentSelectedChild.id
					payload.role = 'STUDENT'
				}
        this.$store.dispatch(`scoreboard/scoreboard`, {
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          payload
        }).then((response) => {
          this.userRank = response.currentUserRankData? response.currentUserRankData : {}
          this.rankData = response.userRankDta
				})
			},
			fetchSubjects () {
				let role = this.profile? this.profile.role : this.$store.state.initialData.roles[0]
				if (role === 'STUDENT' || role === 'PARENT') {
					let payload = {
						'duration': this.selectedFilter,
						'role': role,
						'userId': this.userId
					}
					if(this.$store.getters['isParent']()) {
						payload.childId = this.$store.state.currentSelectedChild.id
						payload.role = 'STUDENT'
					}
					this.$store.dispatch(`scoreboard/scoreboardSubjects`, {
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale,
						payload
					}).then((response) => {
						this.subjects = response.userSubjectRankDataList
					})
			}
			},
			goToProfile(userId) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
      }
    }
}
</script>
