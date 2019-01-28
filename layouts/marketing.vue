<template>
  <div @contextmenu.prevent="()=>{return false}" :class="$store.getters['locale/getLangClass']()">
     <nuxt/>
  </div>
</template>
<script>
export default {
  head () {
    return {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ]
    }
  },
  mounted () {
    this.$i18n.locale = this.$store.state.locale.selectedLocale
    let forTourUrl = this.$router.currentRoute.fullPath
    let tourUrl = forTourUrl.split('?')
    let checkTourUrl = tourUrl[tourUrl.length - 1]
    let splitTourUrl = checkTourUrl.split('&')

    $zopim(function() {
      $zopim.livechat.window.hide();
      $zopim.livechat.bubble.show();
    });



    if(splitTourUrl[0] === 'tour=true') {
        let langparam = splitTourUrl[1].split('=')
        // let urlParam = splitTourUrl[2].split('&')
        let forNavtoMain = splitTourUrl[2].split('%40')
        let domainUrl = forNavtoMain[1].split('=')
        let loginId = forNavtoMain[0]+'@'+domainUrl[0]
        let password = 'Password@123'
      if(this.$store.state.initialData.userId && this.$store.state.auth.tour) {
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: langparam[1]
        }).then(response => {
          this.$store.dispatch('auth/login', {
          email: loginId,
          password: password,
          remember: this.rememberMe,
          context: this,
          langCode: langparam[1]
        })
          .then(response => {
              this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: this.$store.state.locale.locales
              })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children[0]
                this.$store.dispatch('updateChildId', {childObj: response.data.children[0]})
              }
              if(response.data.roles[0]=== 'STUDENT'||response.data.roles[0]=== 'TEACHER' || response.data.roles[0]=== 'PARENT') {
                if (response.data.firstLogin) {
                  this.firstLogin = true
                }
                else{
                  if (response.data.roles[0]=== 'PARENT') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                  }else {
                    if(!response.data.onboarding) {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
                    }else {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                    }
                  }
                }
              }
          }, (error) => {
              console.log(error)
          })
        })
      }else{
          this.$store.dispatch('auth/login', {
          email: loginId,
          password: password,
          remember: this.rememberMe,
          context: this,
          langCode: langparam[1]
        })
          .then(response => {
            this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: langparam[1],
              locales: this.$store.state.locale.locales
              })
              if(response.data.roles[0] === 'PARENT' && response.data.children) {
                let defaultChild = response.data.children[0]
                this.$store.dispatch('updateChildId', {childObj: response.data.children[0]})
              }
              if(response.data.roles[0]=== 'STUDENT'||response.data.roles[0]=== 'TEACHER' || response.data.roles[0]=== 'PARENT') {
                if (response.data.firstLogin) {
                  this.firstLogin = true
                }
                else{
                  if (response.data.roles[0]=== 'PARENT') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                  }else {
                    if(!response.data.onboarding) {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/onboarding'))
                    }else {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
                    }
                  }
                }
              }
          }, (error) => {
              console.log(error)
          })
      }

    }
  }
}
</script>
