import Vue from 'vue'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
 Vue.component('VueGoogleAutocomplete',VueGoogleAutocomplete)
// Vue.use(VueGoogleAutocomplete)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU',
//     libraries: 'places', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)
 
//     //// If you want to set the version, you can do so:
//     // v: '3.26',
//   },
 
//   //// If you intend to programmatically custom event listener code
//   //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
//   //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
//   //// you might need to turn this on.
//   // autobindAllEvents: false,
 
//   //// If you want to manually install components, e.g.
//   //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
//   //// Vue.component('GmapMarker', GmapMarker)
//   //// then disable the following:
//   // installComponents: true,
//})