<template>
	<div>
		<header class="quizHeaderSec">
			<a class="btn btn-link quizCloseBtn" @click="back">
				<i class="material-icons">
					close
				</i>
			</a>
			<div class="container">
				<div class="quizHeader">
					<div class="quixTxtSec">
						<h2 class="quizTxt">{{$t('assessment.quiz')}}</h2>
						<p class="quizTopicName">{{name}}</p>
					</div>
				</div>

			</div>

		</header>
		<div class="assmentContSec">
			<div class="assmentContInner">
				<div class="container">
					<ul class="assmentReviewTab">
						<li :class="{active: selectedTab === 'report'}" @click="toggleTab('report')">
							<a>{{$t('assessment.report')}}</a>
						</li>
						<li :class="{active: selectedTab === 'review'}" @click="toggleTab('review')">
							<a>{{$t('assessment.review_big')}}</a>
						</li>
					</ul>
					<div class="asmtReiwTabContSec">
						<!-- assessment result starts -->
						<div v-if="selectedTab === 'review'">
							<div class="asmtReiwQuestBox" v-for="ques in quesAnsList">
								<div class="asmtReiwQuestBoxInner" v-if="ques.quesType === 'MCQ' || ques.quesType === 'SCQ' || ques.quesType === 'TFQ'">
									<h3>{{getStatusText(ques)}}</h3>
									<div class="quesTxtSec">
										<p class="quesTxt" v-html ="getQuestionValue(ques , 'text')" ></p>
									</div>
									<div class="quesOptSec assmentReviewSec">
										<ul class="quesOptList">
											<li class="quesOptBox" v-for="choice,index in getOptions(ques)">
												<button type="button" class="btn btn-link quesBoxBtn" :class="getClassObject(choice.id, ques.quesAns, ques.userClickLastQuesAns)">
													<span class="questNo">{{1+index}}.</span><div v-html="getOptionValue(choice.choiceBody, 'text')"> </div>
													<span class="miss" v-if="checkMissCondition(choice.id, ques.quesAns, ques.userClickLastQuesAns)">{{$t('assessment.missed_it')}}</span>
												</button>
											</li>
										</ul>
									</div>
								</div>

								<div class="asmtReiwQuestBoxInner" v-if="ques.quesType === 'ATQ'">
									<h3>{{getStatusText(ques)}}</h3>
									<!-- button type="button" class="btn btn-link audioBtn" @click="playAudio">
										<i class="material-icons ">volume_up</i>
									</button -->
									<audio id="audioPlayer" controls :src="getQuestionValue(ques, 'resourceUrl')" preload="auto"></audio>
									<div class="quesTxtSec">
										<p class="quesTxt" v-html ="getQuestionValue(ques, 'text')" ></p>
									</div>
									<div class="pickQuestSec">

										<ul class="pickOptList">
											<li class="pickOptBox" v-for="choice in getOptions(ques)">
												<button type="button" class="btn btn-link pickOptBtn" :class="getClassObject(choice.id, ques.quesAns, ques.userClickLastQuesAns)"
												 :id="choice.id">
													<img :src="getOptionValue(choice.choiceBody, 'resourceUrl')">
												</button>
												<span class="miss" v-if="checkMissCondition(choice.id, ques.quesAns, ques.userClickLastQuesAns)">{{$t('assessment.missed_it')}}</span>
												<div v-html="getOptionValue(choice.choiceBody, 'text')" ></div>
											</li>
										</ul>
									</div>
								</div>

								<div class="aboutAnsSec" v-if="!ques.isCorrect && false">
									<div class="aboutAnsInner">
										<h3 class="aboutAnsHeading">{{$t('assessment.correct_answer')}}</h3>
										<p v-html="getQuestionValue(ques, 'positiveRes')" >
										</p>
										<button type="button" class="btn btn-link btn-quiz btnSumbit" @click="revise(ques)">{{$t('assessment.revise')}}</button>

									</div>
								</div>



							</div>
						</div>
						<!-- assessment result ends -->
						<!-- assessment review starts -->
						<div class="earnedPoints_Ans" v-if="selectedTab === 'report'">
							<div class="earnedAnsSec">
								<div class="earnedAnsCol">
									<p class="totalQ_A">{{$t('assessment.questions_answered')}}</p>
									<P class="finalPoints">{{correctAnsCount + wrongAnsCount}}/{{totalQuestions}}</P>
								</div>
								<div class="earnedAnsCol">
									<p class="totalQ_A">{{$t('assessment.points_earned')}}</p>
									<P class="finalPoints">{{earnedPoints}}</P>
								</div>
							</div>
							<div class="finlaReportBox">
								<div class="finlaReportCols">
									<div class="finlaRprtAtmptIcon">
										<img src="~/assets/images/assessment/correct.svg">
									</div>
									<div class="finlaReportAttempt">{{$t('assessment.correct')}}</div>
									<div class="finlaRprtAtmptBox correctAttempt">
										{{correctAnsCount}}
									</div>
								</div>
								<div class="finlaReportCols">
									<div class="finlaRprtAtmptIcon">
										<img src="~/assets/images/assessment/wrong.svg">
									</div>
									<div class="finlaReportAttempt">{{$t('assessment.wrong')}}</div>
									<div class="finlaRprtAtmptBox wrongAttempt">
										{{wrongAnsCount}}
									</div>
								</div>
								<div class="finlaReportCols">
									<div class="finlaRprtAtmptIcon">
										<img src="~/assets/images/assessment/skipped.svg">
									</div>
									<div class="finlaReportAttempt">{{$t('assessment.skipped')}}</div>
									<div class="finlaRprtAtmptBox">
										{{skipAnsCount}}
									</div>
								</div>
							</div>
						</div>
						<h3 class="attempAgainTxt">{{$t('assessment.more_points_review_message')}}</h3>
						<button type="button" class="btn btn-link btn-quiz btnSumbit" @click="reattempt">
							<i class="material-icons refreshIcon blackIcon">refresh</i>{{$t('assessment.attempt')}}</button>
						<!-- assessment review ends -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		head() {
			return {
				title: this.$t('assessment.review')
			}
		},
		layout: 'blank',
		middleware: 'authenticated',
		data() {
			return {
				selectedTab: 'report',
				name: '',
				testId: '',
				type: '',
				subjId: '',
				topicId: '',
				subTopicId: '',
				topicIdNav: '',
				subTopicIdNav: '',
				curriculumId: '',
				correctAnsCount: '',
				wrongAnsCount: '',
				skipAnsCount: '',
				earnedPoints: '',
				totalQuestions: '',
				quesAnsList: [],
				selectedLocale: this.$store.state.locale.selectedLocale
			}
		},
		mounted() {
			let query = this.$route.query
			let queryTestId = query.testId
			this.name = query.name
			this.testId = queryTestId
			this.type = query.type
			this.subjId = query.subjId
			this.topicId = query.topicId
			this.subTopicId = query.subTopicId
			this.topicIdNav = query.topicIdNav
			this.subTopicIdNav = query.subTopicIdNav
			this.curriculumId = query.curriculumId
			this.$store.dispatch('assessment/getAssessmentReview', {
				authToken: this.$store.state.auth.user.token,
				langCode: this.$store.state.locale.selectedLocale,
				testId: queryTestId
			}).then(response => {
				let resp = response.data.data
				this.correctAnsCount = resp.correctAnsNum
				this.wrongAnsCount = resp.wrongAnsNum
				this.skipAnsCount = resp.skippedAnsNum
				this.totalQuestions = this.correctAnsCount + this.wrongAnsCount + this.skipAnsCount
				this.earnedPoints = resp.earnedPoints
				this.quesAnsList = resp.quesAnsList
			}, error => {

			})
		},
		methods: {
			checkMissCondition(id, answers, userResponse) {
				if (userResponse) {
					// case 1 id present in answers
					if (answers.indexOf(id) !== -1 && userResponse.indexOf(id) === -1) {
						return true
					}
				}
				return false
			},
			getClassObject(id, answers, userResponse) {
				if (userResponse) {
					// case 1 id present in answers
					if (answers.indexOf(id) !== -1) {
						if (userResponse.indexOf(id) !== -1) {
							//correct marked response
							return { correctAns: true }
						} else {
							//you missed it
							return { correctAns2: true }
						}
					} else if (answers.indexOf(id) === -1 && userResponse.indexOf(id) !== -1) {
						//wrong marked
						return { wrongAns: true }
					}
				}
			},
			revise(ques) {

				this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/revise`), query: { testId: this.testId, name: this.name, type: this.type, subjId: this.subjId, topicIdNav: this.topicId, subTopicIdNav: this.subTopicIdNav, topicId: this.topicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId, subtopics: this.getCommaSeparatedSubTopics(ques).toString() } })
			},
			getCommaSeparatedSubTopics(ques) {
				return ques.subTopicCurrIds.map(temp => temp.id)
			},
			getStatusText(ques) {
				if (ques.isSkipped) {
					return this.$t('assessment.skipped')
				} else if (ques.isCorrect) {
					return this.$t('assessment.correct')
				} else {
					return this.$t('assessment.incorrect')
				}
			},
			checkIfCorrect(id, ansArray) {
				if (ansArray.indexOf(id) !== -1) {
					return true
				} else {
					return false
				}
			},
			getOptions(ques) {
				return ques.choiceMetaData
			},
			playAudio() {
				let audioPlayer = document.getElementById("audioPlayer")
				audioPlayer.play()
			},
			toggleTab(value) {
				this.selectedTab = value
			},
			back() {
				if (this.type == 1) {
					// go to topics
					this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}`) })
				} else {
					this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}/${this.topicIdNav}-${this.subTopicIdNav}`) })
				}
			},
			reattempt() {
				this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessment`), query: { name: this.name, type: this.type, subjId: this.subjId, topicId: this.topicId, subTopicId: this.subTopicId, topicIdNav: this.topicIdNav, subTopicIdNav: this.subTopicIdNav, curriculumId: this.curriculumId } })
			},
			getQuestionValue(ques, type) {
				let quesArray = ques.questionBody.filter(temp => (temp.lang === this.selectedLocale))
				if (quesArray.length > 0) {
					return quesArray[0][type]
				}
				return ''
			},
			getOptionValue(optionArray, type) {
				let optionFinalArray = optionArray.filter(temp => (temp.lang === this.selectedLocale))
				if (optionFinalArray.length > 0) {
					return optionFinalArray[0][type]
				}
				return ''
			}
		}
	}
</script>
