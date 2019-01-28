<template>
    <div class="selectThemePop" v-on-click-outside="closeEditTheme">
        <div class="topHead"><i class="material-icons">&#xE3C9;</i>{{$t('profile.selectTheme')}}</div>
        <!-- <div class="profileThemeBtnSec">
            '#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}
            <button @click="selectTheme(theme)" type="button"  class="profileThemeBtn PrTmOpt1 " :class="{active: theme.themeId===selectedTheme.themeId}" v-bind:style="{backgroundColor: theme.color}" v-for="theme in themes">
                <i class="material-icons selctedTheme">&#xE91D;</i>
                </button>
        </div> -->
        <div class="boardThemeOptSec text-center">
			    <div class="conMidSec">
			        <button type="button" @click="selectTheme(theme)" v-for="theme in themes" v-bind:style="{background:theme.color}" :class="[{themeOptBtn: true, active: selectedColor === theme.color}]">
			        	<i class="material-icons selctedTheme">&#xE91D;</i>
			        </button>
                </div>
        </div>
        <div class="bottomFooter clearfix"><button class="btn btn-primary submitBtn" @click="applyTheme">{{$t('common.apply')}}</button></div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.$store.dispatch('auth/getUserProfileThemes',{ authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale}).then(response => {
            this.themes = response.data.themes
        })
    },
    data () {
        return {
            themes: [],
            selectedTheme: {},
            selectedColor: '#'+this.$store.state.initialData.theme.color
        }
    },
    methods: {
        applyTheme () {
            if (this.selectedTheme.name) {
                this.$store.dispatch('auth/themeSelection', { id: this.selectedTheme.themeId, theme: this.selectedTheme, authToken:this.$store.state.auth.user.token, langCode:this.$store.state.locale.selectedLocale}).then(response => {
                    //this.$toast.success(this.$t('profile.theme_update_success'))
                    this.closeEditTheme()
                }, (error) => {
                    this.$toast.error(error.response.data)
                } )
            } else {
                this.$toast.error(this.$t('profile.select_theme'))
            }
        },
        closeEditTheme () {
            this.$root.$emit('closeEditTheme')
        },
        selectTheme (selectedTheme) {
            this.selectedTheme = selectedTheme
            this.selectedColor = selectedTheme.color
        }
    }
}
</script>
