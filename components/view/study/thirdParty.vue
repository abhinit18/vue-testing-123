<template>
<div class="thirdPartyPage">
<div class="videoFullScreenBtn" @click="toggleFullscreen"><i class="material-icons fullico">fullscreen</i><i class="material-icons fullicoexit">fullscreen_exit</i></div>
  <iframe width="100%" class="maxHeight"
    :src="content.body[0].value" id="frame1"/>
</div>
</template>
// :src="'http://'+content.body[0].value"
// "http://demo.fortunapix.com/Russian/c121309_laboratory_preparation_of_chlorine_Russian/Script/index.html"
<script>
export default {
  props: ['content'],
  mounted () {
    document.getElementById('frame1').contentWindow.addEventListener("initLog", initLog, false);
    document.getElementById('frame1').contentWindow.addEventListener("recordLogs", recordLogs, false);
    document.getElementById('frame1').contentWindow.addEventListener("submitLog", submitLog, false);
    /* 
        initLog method outputs
        1. In Quiz number of questions will be the initial data received in the initLog method and number of options will be null here
        2. In Activity number of questions and number of options will be the initial data received
        3. In Keywords number of keywords will be received as the initial data
    */
    function initLog(event)
    {
        console.log(event.detail.message);
        /*
            {noOfQuestions: 8, noOfOptions: 8}//Activity
            {noOfKeywords: 5}//ConceptMap
            {noOfKeywords: 5}//Keywords
            {noOfQuestions: 10, noOfOptions: null}//Quiz
        */
    }
    
    /*
        recordLogs Methods outputs
        1. In Quiz when ever an option is chosen for a question it will log its question number and option chosen for it.
        

        2. In Activity when ever an option is chosen for a question it will log its question number and option chosen for it     3. If the dragged clip is dropped out rather than in the drops then it sends '0' as the dropped drop.

        4. In Keywords we receive the keyowrd text.
    */
    function recordLogs(event)
    {
        console.log(event.detail.message);
        /*
            {question: 1, option: 1, isCorrect: true}//Activity
            {clickedKeyword: "Соляная кислота (HCl)"}//ConceptMap
            {clickedKeyword: "Диоксид марганца"}//Keywords
            {question: 1, option: 2, isCorrect: true}//Quiz
        */
    }
    
    /*
        submitLog method outputs
        1. In Quiz when submit button is clicked it gives score, number of questions attempted and the array of corrected questions.
        2. Time spent on the quiz is also received in seconds

        3. In Activity submit will be null as there is no submit button on Activity
        
        4. No Submit log for the Keywords
    */
    function submitLog(event)
    {
        console.log(event.detail.message);
    
        /*
            {score: "1/10", attemptedQuestions: 1, questionsAnsweredCorrect: [1], timeSpent: 43}//Quiz
        */

    } 
  },
  methods: {
    toggleFullscreen (e) {
      this.$store.dispatch("content/toggleContentFullscreen")
    }
  }
}
</script>

<style>
.maxHeight {
  height: 100%;
  min-height: calc(100vh - 50px);
}
.fullscreenmode .maxHeight{    min-height: calc(100vh - 90px);}
</style>
