<template>
    <div>
        <header class="quizHeaderSec">
            <a @click="closeAssessment" class="btn btn-link quizCloseBtn">
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
                    <div class="quizTimer">
                        <i class="material-icons timerIcon">av_timer</i> {{getTime()}}s
                    </div>
                </div>
            </div>
            <div class="progressbar">
                <div class="progress-div" :style="{ width: percentageProgress + '%' }"></div>
            </div>

            <div class="skipBox" v-if="showSkipBox && checkSkipCondition()">
                <span class="skipStep">{{skipData}}</span> {{$t('assessment.used')}}
            </div>
        </header>

        <div class="quizContentSec">
            <div class="quizContentInner">
                <div class="container" v-if="questionLoaded">
                    <div v-if="ques.type === 'MCQ' || ques.type === 'SCQ' || ques.type === 'TFQ'">
                        <div class="quesTxtSec">
                            <h3 class="quesType">{{getQuestionType()}}</h3>
                            <p class="quesTxt" v-html="getQuestionValue('text')"></p>
                        </div>
                        <div class="quesOptSec">
                            <ul class="quesOptList">
                                <li class="quesOptBox" v-for="option,index in getOptions()">
                                    <button type="button" class="btn btn-link quesBoxBtn" :class="{selected: (selectedOption.indexOf(option.id)!==-1), correctAns: getCorrectTick(option.id), wrongAns: getWrongTick(option.id)}"
                                        :id="option.id" @click="selectOption">
                                        <span class="questNo">{{1+index}}.</span><div v-html="getOptionValue(option.choiceBody, 'text')"> </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="pickQuestSecOuter" v-if="ques.type === 'ATQ'">
                        <!--button type="button" class="btn btn-link audioBtn" @click="playAudio">
                            <i class="material-icons ">volume_up</i>
                        </button -->

                        <audio id="audioPlayer" controls :src="getQuestionValue('resourceUrl')" preload="auto" autoplay></audio>
                        <div class="quesTxtSec">
                            <p class="quesTxt" v-html="getQuestionValue('text')"></p>
                        </div>
                        <div class="pickQuestSec">

                            <ul class="pickOptList">
                                <li class="pickOptBox" v-for="option in getOptions()">
                                    <button type="button" class="btn btn-link pickOptBtn" :class="{selected: (selectedOption.indexOf(option.id)!==-1), correctAns: getCorrectTick(option.id), wrongAns: getWrongTick(option.id)}"
                                        :id="option.id" @click="selectOption">
                                        <img :src="getOptionValue(option.choiceBody, 'resourceUrl')">
                                    </button>
                                    <div v-html ="getOptionValue(option.choiceBody, 'text')"></div>

                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- <div class="quesOptSec qesFillBlankSec">
                        Material is an
                        <div class="fillBlankselect selected">
                            <span class="dropBtn">
                                <i class="material-icons">arrow_drop_down</i>
                            </span>
                            <div class="selectTxt">
                                Adaptable
                            </div>
                             <div class="filblnkSlctDrop">
                        <ul class="fibSlctDropList">
                            <li>Adaptable</li>
                            <li>Adaptable</li>
                            <li>Adaptable</li>
                            <li>Adaptable</li>
                        </ul>
                      </div>
                        </div>
                        <br> system of guidelines, components, and tools that support the user interface design. Backed by open-source
                        code, Material streamlines collaboration between designers and
                        <div class="fillBlankselect correctAns">
                            <span class="dropBtn">
                                <i class="material-icons">arrow_drop_down</i>
                            </span>
                            <div class="selectTxt">
                                Adaptable
                            </div>
                            <div class="filblnkSlctDrop">
                                <ul class="fibSlctDropList">
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                </ul>
                            </div>
                        </div>
                        <br> helps teams quickly build beautiful products.
                        <div class="fillBlankselect wrongAns">
                            <span class="dropBtn">
                                <i class="material-icons">arrow_drop_down</i>
                            </span>
                            <div class="selectTxt">
                                Adaptable
                            </div>
                            <div class="filblnkSlctDrop">
                                <ul class="fibSlctDropList">
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                    <li>Adaptable</li>
                                </ul>
                            </div>
                        </div>
                    </div> -->
                    <!-- fill in balanks end -->
                </div>


                <div class="aboutAnsSec" v-if=" questionState===4 || questionState===7">
                    <div class="container">
                        <div v-html="getFromQuestionBody(responseBodyAll.questionBody, 'textOnWrongAns')"> </div>
                        <div class="aboutAnsInner">
                            <button type="button" class="btn btn-link btn-quiz btnSumbit" @click="revise">{{$t('assessment.revise')}}</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="quizActionSec">
            <div class="container">
                <div class="quizActionInner">
                    <div>
                        <span v-html="getResponseText('positiveRes')" class="quesFeebBack" v-if="questionState===1 || questionState===6"></span>
                        <span v-html="getResponseText('negativeRes')" class="quesFeebBack bad" v-if="questionState===2 || questionState===4 || questionState===7"></span>
                    </div>
                    <div class="quizActRightBtnSec">
                        <button type="button" class="btn btn-link btn-quiz useHintBtn" v-if="questionState===2 || questionState===3" @click="openHintPopup">
                            <i class="material-icons refreshIcon">refresh</i>
                            <span class="tryTxt">{{$t('assessment.try_again')}}</span>
                            {{$t('assessment.use_hint')}}</button>
                        <customloader v-if="showNextButton()" loaderClass="btn btn-link btn-quiz" :loaderClick="nextAction" :loaderDisabled="nextButtonLoading"
                            :loaderText="$t('register.next')"></customloader>
                        <customloader v-if="showSkipButton()" loaderClass="btn btn-link btn-quiz" :loaderClick="skipAction" :loaderDisabled="skipButtonLoading"
                            :loaderText="$t('register.skip')"></customloader>
                        <customloader v-if="showSubmitButton()" loaderClass="btn btn-link btn-quiz btnSumbit" :loaderClick="submitAction" :loaderDisabled="submitButtonLoading"
                            :loaderText="$t('register.submit')"></customloader>
                            <customloader v-if="showReviewButton()" loaderClass="btn btn-link btn-quiz btnSumbit" :loaderClick="reviewAction" :loaderDisabled="reviewButtonLoading"
                                :loaderText="$t('assessment.review')"></customloader>
                      <button v-if="showDisabledSubmitButton()" disabled='disabled' type="button">{{$t('register.submit')}}</button>

                    </div>
                </div>
            </div>
        </div>
        <!-- pop up sec -->
        <div class="popUpOverlay assmHintPopUp" v-if="hintPopupOpen">
            <div class="popUpBox" v-on-click-outside="closeHintPopup">
                <h2 class="popUpHeadeTxt">{{$t('assessment.hint')}}</h2>
                <div class="popUpTxt" v-html="getResponseText('hint')"></div>
                <div class="text-center">
                    <button type="button" class="btn btn-link btn-quiz btnSumbit" @click="tryAgain">
                        <i class="material-icons refreshIcon blackIcon">refresh</i>{{$t('assessment.try_again')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        head() {
			return {
				title: this.$t('assessment.assessment')
			}
		},
        layout: 'blank',
        middleware: 'authenticated',
        mounted() {
            let query = this.$route.query
            let queryTestId = query.testId
            this.name = query.name
            this.type = query.type
            this.subjId = query.subjId
            this.topicId = query.topicId
            this.subTopicId = query.subTopicId
            this.topicIdNav = query.topicIdNav
            this.subTopicIdNav = query.subTopicIdNav
            this.curriculumId = query.curriculumId
            //start test case
            let payload = {}
            if (queryTestId) {
                payload["testId"] = queryTestId
            } else {
                if (query.type == 0) {
                    payload["subCurrIds"] = { id: query.subjId, curriculumId: query.curriculumId }
                } else if (query.type == 1) {
                    payload["topicCurrIds"] = { id: query.topicId, curriculumId: query.curriculumId }
                } else {
                    payload["subTopicCurrIds"] = { id: query.subTopicId, curriculumId: query.curriculumId }
                }
            }

            //let apiDecider = queryTestId ? 'resumeTest' : 'startTest'
            let apiDecider = 'startTest'
            if (queryTestId) {
                this.fetchQuestion()
            } else {
                this.$store.dispatch(`assessment/${apiDecider}`, { payload, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    if (response && response.status === 200 && response.data && response.data.data) {
                        this.testId = response.data.data.id
                        this.fetchQuestion()
                    } else {
                        //this.$toast.error(this.$t('assessment.test_id_not_generated'))
                    }
                })
            }
        },
        data() {
            return {
                name: '',
                testId: '',
                type: '',
                subjId: '',
                topicId: '',
                subTopicId: '',
                topicIdNav: '',
                subTopicIdNav: '',
                curriculumId: '',
                ques: {},
                quesSubmited:{},
                questionLoaded: false,
                selectedLocale: this.$store.state.locale.selectedLocale,
                selectedOption: [],
                questionState: 0, //0-not attempted, 1-correct response, 2-wrong response, 3-second attempt, 4-wrong second attempt, 6 - ended with correct, 7 ended with wrong
                timer: 0,
                intervalId: '',
                skipButtonLoading: false,
                nextButtonLoading: false,
                submitButtonLoading: false,
                reviewButtonLoading:false,
                percentageProgress: 0,
                responseBody: [],
                responseBodyAll : {},
                hintPopupOpen: false,
                skipData: '',
                showSkipBox: false,
                skipBoxTime: 2000,
                isTestEnded:false,
                isAttemptExhausted:false
            }
        },
        methods: {
            closeAssessment() {
                if (this.type == 1) {
                    // go to topics
                    this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}`) })
                } else {
                    this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}/${this.topicIdNav}-${this.subTopicIdNav}`) })
                }
            },
            checkSkipCondition() {
                let skipData = this.skipData
                let skipUsedArray = skipData.split('/')
                if (skipUsedArray.length > 0) {
                    let skipUsed = skipUsedArray[0]
                    if (skipUsed >= 3) {
                        return true
                    }
                }
                return false
            },
            noSkipAllowed() {
                let skipData = this.skipData
                let skipUsedArray = skipData.split('/')
                if (skipUsedArray.length > 0) {

                    if (skipUsedArray[0]  == skipUsedArray[1]) {
                        return true
                    }
                }
                return false
            },

            playAudio() {
                let audioPlayer = document.getElementById("audioPlayer")
                if(audioPlayer){
                  audioPlayer.currentTime=0;
                  audioPlayer.play()
                }
            },
            showNextButton() {
                return (this.questionState === 1 || (this.questionState === 2 && !this.isTestEnded) || this.questionState === 4 || (this.questionState === 3 && !this.isOptionSelected()))
            },
            showSkipButton() {
                return (this.questionState === 0 && !this.isOptionSelected() && !this.noSkipAllowed())
            },
            showSubmitButton() {
                return ((this.questionState === 0 || this.questionState === 3) && this.isOptionSelected())
            },
            showReviewButton(){
              return (this.questionState === 6 || this.questionState === 7)
            },
            showDisabledSubmitButton(){
              return ( this.noSkipAllowed() && !this.isOptionSelected())
            },
            getCorrectTick(id) {
                return ((((this.questionState === 1) && this.selectedOption.indexOf(id) !== -1))
                      ||( (this.questionState === 4|| this.questionState === 7) && this.responseBodyAll.ansIds.indexOf(id) !== -1))
            },
            getWrongTick(id) {
                return ((this.questionState === 7 || this.questionState === 2 || this.questionState === 4) && this.selectedOption.indexOf(id) !== -1)
            },
            tryAgain() {
                this.moveQuestionState(false, false, true, false)
                this.closeHintPopup()
                this.resetTimer()
                this.playAudio();
            },
            openHintPopup() {
                this.hintPopupOpen = true
            },
            closeHintPopup() {
                this.hintPopupOpen = false
            },
            nextAction() {
                //this.resetTimer()
                this.resetQuestion()
                this.fetchNextQuestion()
            },
            submitAction() {
                this.stopTimer()
                this.submitButtonLoading = true
                let payload = {
                    testId: this.testId,
                    type: this.ques.type,
                    questionId: this.ques.id,
                    ansIds: this.selectedOption,
                    questionAsked: {
                        questionId: this.ques.id,
                        timeTaken: this.timer,
                        quesPoints: this.ques.points ? this.ques.points : 200,
                        usedHint: this.questionState === 3 ? true : false
                    }
                }
                this.$store.dispatch(`assessment/verifyQuestion`, { payload, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    this.submitButtonLoading = false


                    this.isTestEnded = response.data.data.isTestEnded;
                    this.percentageProgress = response.data.data.percentageProgress
                    this.responseBody = response.data.data.questionBody
                    this.responseBodyAll = response.data.data
                    this.isAttemptExhausted = response.data.data.isAttemptExhausted

                    if (this.goToReview(response)) {
                        this.moveQuestionState(response.data.data.isCorrect, false, false, true)
                    } else {
                      this.moveQuestionState(response.data.data.isCorrect, false, false, false)
                    }
                }, error => {
                    this.submitButtonLoading = false
                })
            },
            goToReview(response){
             return ((response.data.data.isTestEnded && response.data.data.isCorrect) || (response.data.data.isTestEnded && response.data.data.isAttemptExhausted	) )
            },
            reviewAction(){
              this.reviewAssessment()
            },
            skipAction() {
                this.stopTimer()
                this.skipButtonLoading = true
                this.$store.dispatch(`assessment/skipQuestion`, { testId: this.testId, questionId: this.ques.id, type: this.ques.type, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    this.skipButtonLoading = false
                    if (response.data.data.isTestEnded || response.data.data.status === 'ERROR') {
                        this.reviewAssessment()
                    } else {
                        let resp = response.data.data.nxtQues
                        this.ques = resp.respATQ || resp.respMCQ || resp.respSCQ || resp.respTFQT
                        this.questionLoaded = true
                        this.resetTimer()
                        this.skipData = resp.skipCount ? resp.skipCount : ''
                        this.showSkipBox = true
                        setTimeout(() => {
                            this.showSkipBox = false
                        }, this.skipBoxTime)
                    }
                }, error => {
                    this.skipButtonLoading = false
                    //this.$toast.error(this.$t('assessment.skip_error'))
                })
            },
            getResponseText(type) {
                let hintArray = this.responseBody.filter(temp => (temp.lang === this.selectedLocale))
                if (hintArray.length > 0) {
                    return hintArray[0][type]
                }
                return ''
            },
            getFromQuestionBody(obj, type) {
                let hintArray = obj.filter(temp => (temp.lang === this.selectedLocale))
                if (hintArray.length > 0) {
                    return hintArray[0][type]
                }
                return ''
            },
            getCommaSeparatedSubTopics () {
                return this.ques.subTopicCurrIds.map(temp => temp.id)
            },
            getTime() {
                let minutes = (Math.floor(this.timer / 60)).toString()
                minutes = (minutes.length === 1 ? '0' : '') + minutes
                let seconds = (this.timer % 60).toString()
                seconds = (seconds.length === 1 ? '0' : '') + seconds
                return `${minutes}:${seconds}`
            },
            reviewAssessment() {
                this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessmentReview`), query: { testId: this.testId, name: this.name, type: this.type, subjId: this.subjId, topicIdNav: this.topicIdNav, subTopicIdNav: this.subTopicIdNav, topicId: this.topicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId } })
            },
            revise() {
                this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/revise`), query: { testId: this.testId, name: this.name, type: this.type, subjId: this.subjId, topicIdNav: this.topicIdNav, subTopicIdNav: this.subTopicIdNav, topicId: this.topicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId, subtopics: this.getCommaSeparatedSubTopics().toString() } })
            },
            fetchQuestion() {
                this.$store.dispatch(`assessment/getQuestion`, { testId: this.testId, userId: this.$store.state.initialData.userId, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    let resp = response.data.data
                    if (resp) {
                        if (resp.code === 'ERROR') {
                            this.$router.back()
                            //this.$toast.error(resp.message)
                        } else if (resp.isTestEnded) {
                            this.reviewAssessment()
                        } else {
                            this.ques = resp.respATQ || resp.respMCQ || resp.respSCQ || resp.respTFQT
                            this.questionLoaded = true
                            this.resetTimer()
                            this.skipData = resp.skipCount ? resp.skipCount : ''

                            if(this.noSkipAllowed()){
                            this.showSkipBox = false
                            }else{
                              this.showSkipBox = true
                              setTimeout(() => {
                                  this.showSkipBox = false
                              }, this.skipBoxTime)
                            }
                        }
                    }
                })
            },
            fetchNextQuestion() {
                this.nextButtonLoading = true
                this.$store.dispatch(`assessment/getQuestion`, { testId: this.testId, userId: this.$store.state.initialData.userId, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    this.nextButtonLoading = false
                    let resp = response.data.data
                    if (resp) {
                        if (resp.code === 'ERROR') {
                            this.$router.back()
                            //this.$toast.error(resp.message)
                        } else if (resp.isTestEnded) {
                            this.reviewAssessment()
                        } else {
                            this.ques = resp.respATQ || resp.respMCQ || resp.respSCQ || resp.respTFQT
                            this.questionLoaded = true
                            this.resetTimer()
                            this.skipData = resp.skipCount ? resp.skipCount : ''
                            if(this.noSkipAllowed()){
                            this.showSkipBox = false
                            }else{
                              this.showSkipBox = true
                              setTimeout(() => {
                                  this.showSkipBox = false
                              }, this.skipBoxTime)
                            }
                        }
                    }
                }, error => {
                    this.nextButtonLoading = false
                })
            },
            resetQuestion() {
                this.responseBody = {}
                this.questionState = 0
                this.selectedOption = []
                this.ques = {}
                this.responseBodyAll = {};
            },
            resetTimer() {
                this.timer = 0
                this.stopTimer()
                this.startTimer()
            },
            stopTimer() {
                if (this.intervalId !== '') {
                    window.clearInterval(this.intervalId)
                }
            },
            startTimer() {
                let intervalId = setInterval(() => {
                    this.timer++
                }, 1000)
                this.intervalId = intervalId
            },
            getQuestionValue(type) {
                let quesArray = this.ques.questionBody.filter(temp => (temp.lang === this.selectedLocale))
                if (quesArray.length > 0) {
                    return quesArray[0][type]
                }
                return ''
            },
            getOptions() {
                return this.ques.choiceMetaData
            },
            getOptionValue(optionArray, type) {
                let optionFinalArray = optionArray.filter(temp => (temp.lang === this.selectedLocale))
                if (optionFinalArray.length > 0) {
                    return optionFinalArray[0][type]
                }
                return ''
            },
            isOptionSelected() {
                return (this.selectedOption.length > 0)
            },
            moveQuestionState(isCorrect, next, reattempt, end) {

                if(end && isCorrect){
                  this.questionState = 6
                } else if (end){
                  this.questionState = 7
                }else if (next) {
                    this.questionState = 0
                } else if (reattempt) {
                    this.questionState = 3
                } else {
                    if (isCorrect) {
                        this.questionState = 1
                    } else {
                        if (this.questionState === 0 && !this.isAttemptExhausted) {
                            this.questionState = 2
                        } else {
                            this.questionState = 4
                        }
                    }
                }
            },
            selectOption(event) {
                // if the state is 0 or 3, then only allow the option to be clicked
                if ((this.questionState === 0 || this.questionState === 3) && !this.submitButtonLoading && !this.skipButtonLoading && !this.nextButtonLoading) {
                    let newSelectedOption = []
                    let found = false
                    for (let i = 0; i < this.selectedOption.length; i++) {
                        if (this.selectedOption[i] === event.target.id) {
                            found = true
                        } else {
                            if (this.ques.type !== 'TFQ' && this.ques.type !== 'SCQ') {
                                newSelectedOption.push(this.selectedOption[i])
                            }
                        }
                    }
                    if (!found) {
                        newSelectedOption.push(event.target.id)
                    }
                    this.selectedOption = newSelectedOption
                }
            },
            getQuestionType() {
                if (this.ques.type === 'TFQ') {
                    return this.$t('assessment.tfq_heading')
                } else if (this.ques.type === 'MCQ') {
                    return this.$t('assessment.mcq_heading')
                } else if (this.ques.type === 'SCQ') {
                    return this.$t('assessment.scq_heading')
                } else if (this.ques.type === 'ATQ') {
                    return this.$t('assessment.atq_heading')
                }
            }
        }
    }

</script>
