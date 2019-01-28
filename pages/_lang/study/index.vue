<template>
</template>
<script>
export default {
middleware: 'authenticated',
mounted() {
      this.$store.dispatch('currentBreadcrumb', {title: this.$t('study.my_subjects')});
  this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
  if(this.$store.getters['isTeacher']()) {
    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/`+this.$store.getters['getTeacherGrade']().curriculumId))
  } else {
    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study/`+this.$store.getters['getCurrentGrade']().curriculumId))
  }
    if(this.$store.getters['isParent']()) {
      this.$store.dispatch('sidebarStudyContent/parentNavChange', 1)
    }else{
      this.$store.dispatch('sidebarStudyContent/navChange', 1)
    }
    this.$store.dispatch('snowPlowPageView',{pageName: "STUDY_MY_SUBJECT"});

}
}
</script>
