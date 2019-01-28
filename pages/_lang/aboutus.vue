<template>
  <div>
   <div class="stataticPageOuter">
		   <div class="conMidSec">
		      <div class="stataticPageInner">
                  <a class="pclose" @click="back" v-if="platform==='web'"><span><i class="material-icons">&#xE5CD;</i></span></a>
			       <h2 class="smallHeading">About Us</h2>
                   
                     

			       
			        <p class="innerTxt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled imake a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of </p>

 
          
			    </div>
		   </div>
   </div>
  </div>
</template>
<script>
export default {
	layout: 'blank',
  data() {
    return {
    chatPop: true
    }
  },
	methods: {
	  back () {
		  this.$router.back()
	  }
	},
  asyncData(context) {
	  const platform = context && context.req && context.req.headers["platform"]? context.req.headers["platform"] : 'web'

	  return {platform}
  }
}
</script>
