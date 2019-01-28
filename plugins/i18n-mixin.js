import Vue from 'vue';

Vue.mixin({
  methods: {
    getLocalizedPath (path, locale) {
      // Handle case where path is passed as route params
      if (typeof path === 'object') {
        const resolved = this.$router.resolve(path);
        path = resolved.href;
      }
      // locale = locale || this.$i18n.locale;
      return `/${locale}/${path}`
    },
    switchLocale (locale) {
      const regexp = new RegExp(`^/${this.$i18n.locale}`);
      const path = this.$route.path.replace(regexp, '');
      this.$nuxt.$router.push(this.getLocalizedPath(path, locale));
    },
  },
});
