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
                    <button class="btn btn-link btn-quiz btnSumbit" @click="navigateTo">{{$t('assessment.resume')}}</button>
                    
                </div>
            </div>
        </header>
        <div class="studyPopUpInnerRevise">
            <div class="container">
                <div class="quesType">{{$t('assessment.revise')}}</div>

                <div class="studyPopUpInner">
                    <div class="pcontainer">
                        <div class="resFilter">
                            <label class="control control--checkbox" v-for="type in $store.state.content.types">
                                <input type="radio" :checked="selectedCheck===type.name" @change="toggleCheck(type.name)">
                                <span>{{$t(type.code)}}</span>
                            </label>
                        </div>
                    </div>

                    <div class="resourcesList">
                        <div class="pcontainer">

                            <div class="resourcesListInner">
                                    <contentBox :content="content" :cornerElement="index" v-for="(content, index) in reviseContent" :key="content.contentId" :isSearch="true"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import contentBox from '~/components/contentBox'
    export default {
        head() {
			return {
				title: this.$t('assessment.revise')
			}
		},
        layout: 'blank',
        middleware: 'authenticated',
        components: {contentBox},
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
            let subtopicsRaw = query.subtopics
            subtopicsRaw = subtopicsRaw.split(',')
            this.subtopics = subtopicsRaw
            this.fetchData()
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
                page: 0,
                size: 1500,
                query: '',
                reviseContent: [],
                selectedCheck: 'ALL'
            }
        },
        methods: {
            fetchData() {
                let payload = {
                    curriculumId: this.curriculumId,
                    type: this.selectedCheck==='ALL'? '' : this.selectedCheck,
                    page: this.page,
                    size: this.size,
                    query: this.query,
                    subtopic: this.subtopics
                }
                this.$store.dispatch(`assessment/revise`, { payload, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale }).then(response => {
                    if (response && response.status === 200 && response.data) {
                        this.reviseContent = response.data.content
                    } else {
                        this.$toast.error(this.$t('assessment.no_content'))
                    }
                })
            },
            openContentPopup(selectedContent) {
                let content = selectedContent.contentId
                this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjectId}/${this.topicSubtopicId}/${content}`))
            },
            toggleCheck(value) {
                this.selectedCheck = value
                this.fetchData()
            },
            closeAssessment() {
                if (this.type == 1) {
                    // go to topics
                    this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}`) })
                } else {
                    this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/study/${this.curriculumId}/${this.subjId}/${this.topicIdNav}-${this.subTopicIdNav}`) })
                }
            },
            navigateTo() {
                this.$router.push({ path: this.$store.getters['locale/getFinalUrl'](`/assessment`), query: { testId: this.testId, name: this.name, type: this.type, subjId: this.subjId, topicIdNav: this.topicIdNav, subTopicIdNav: this.subTopicIdNav, topicId: this.topicId, subTopicId: this.subTopicId, curriculumId: this.curriculumId } })
            },

        }
    }

</script>