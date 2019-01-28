<template>
<div  class="counterCountOuter">
{{ $t('forgot.OtpResend') }}
<div class="counterCount">
{{currentCount}}
</div>
</div>
</template>

<script>

export default{
  props: ['start', 'onComplete'],
  data() {
    return {
      currentCount : 30,
      intervalId : ''
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.currentCount --
    }, 1000)

  },
  watch: {
    currentCount:function(val) {
        if(this.currentCount == 0){
          window.clearInterval(this.intervalId)
          //onComplete=true
          //this.$root.$emit('timerExpired',{})
          this.$store.dispatch('auth/setOtpTimer', false)
          this.$store.dispatch('register/setOtpTimer', false)
        }
      }
    },
    methods :{}
}

</script>
