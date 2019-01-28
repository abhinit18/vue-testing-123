<template>
 
    <div class="select langSelect">
        <!-- <span class="icons select__arrow"></span> -->

        <!-- <select class="" @change="changeLanguage" :value="this.$store.state.locale.selectedLocale">
                      <option v-for="locale in this.$store.state.locale.locales"
                      :key="locale.code" :value="locale.code">{{locale.name}}</option>
                    </select> -->
    <div class="dropdownSel">
      <div class="seleLangcbtn">
        {{$store.getters['locale/getSelectedLocaleName']()}}
        <span class="icons select__arrow"></span>
      </div>
      <ul>
         <li v-for="locale in $store.getters['locale/getLocales']()" @click="changeLanguage(locale.code)"
                          :key="locale.code" :value="locale.code">{{locale.name}}</li>
      </ul>
    </div>
</div>
</template>

<script>
    export default {
        methods: {
            changeLanguage(value) {
                    this.$store.dispatch('locale/setlanguage', {
                        context: this,
                        locale: value,
                        locales: this.$store.state.locale.locales
                    })
                    if (this.i18n) {
                        this.i18n.locale = value
                    }
                    $zopim(function() {
                        $zopim.livechat.setLanguage(value);
                    });
            }
        }
    }
</script>
