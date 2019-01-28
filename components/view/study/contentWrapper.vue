<template>
  <ereader v-if='content.type==="EPUB" || content.type==="READING"'  :ratingsPopup="ratingsPopup" :content="content"></ereader>
  <videoContent :isIndependentContentView="isIndependentContentView" v-else-if="content.type==='VIDEO'" :ratingsPopup="ratingsPopup" :content="content"></videoContent>
  <thirdParty v-else-if="content.type==='THIRDPARTY'"  :ratingsPopup="ratingsPopup" :content="content"></thirdParty>
  <articleContent :ratingsPopup="ratingsPopup" v-else-if="content.type==='ARTICLE'" :content="content" > </articleContent>
</template>

<script>
import videoContent from '~/components/view/study/videoContent'
import thirdParty from '~/components/view/study/thirdParty'
import articleContent from '~/components/view/study/article'
import { lrsPost } from "../../../utils/lrs";

export default {
  components: {
    videoContent,
    thirdParty,
    articleContent
  },
  props: ['content', 'ratingsPopup', 'isIndependentContentView', 'markCompleted'],
  computed: {
  },
  mounted() {

    //console.log('window.ga', window.ga);

    try{
      window.ga('send', 'event', 'CONTENT',this.content.type, this.content.contentId , this.content.body[0].title);
    }catch(e){}
  }
}

</script>
