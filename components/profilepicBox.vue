<template>
    <div class="img">
        <div class="edit" v-if="myProfile" @click="toMyProfile"></div>
        <img v-if="isProfilePic" :src="profilePic">
        <div class="picPlaceHolder" v-else>{{getNameInitial}}</div>
        <!-- <div class="ubadge gold">{{$t('index.gold')}}</div> -->
    </div>
</template>

<script>
    export default {
        props: ['profile'],
        methods: {
            toMyProfile() {
                let user = this.$store.state.initialData.userId
                this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
            }
        },
        computed: {
            isProfilePic() {
                if (this.profile && this.profile.profilePic !== "") {
                    return true
                } else if (this.profile && this.profile.profilePic === "") {
                    return false
                } else if (this.$store.state.initialData.profilePic && this.$store.state.initialData.profilePic !== '') {
                    return true
                } else {
                    return false
                }
            },
            profilePic() {
                if (this.profile && this.profile.profilePic && this.profile.profilePic !== '') {
                    return this.profile.profilePic
                } else {
                    return this.$store.state.initialData.profilePic
                }
            },
            myProfile() {
                if (this.profile && this.profile.userId !== this.$store.state.initialData.userId) {
                    return false
                } else {
                    return true
                }
            },
            getNameInitial () {
                if (this.profile) {
                    return (this.profile.userName? this.profile.userName.substr(0,1): '')
                } else {
                    return this.$store.state.initialData.firstName? this.$store.state.initialData.firstName.substr(0,1) : ''
                }
            }
        }
    }
</script>
