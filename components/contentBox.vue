<template>
    <div class="item" :class="idArray.indexOf(cornerElement) > -1 ? 'lmsLastItem': (prevIdArray.indexOf(cornerElement) > -1 ? 'lmsSecondLastItem' : '')">
        <div class="newItemLabel" v-if="content.isNew">
            {{$t('common.new')}}
        </div>

        <div class="delBtnOuter" v-if="contentType && (contentType === 'bookmark' || contentType === 'liked')">
          <span style="position:relative;">
            <a class="delBtn" @click="removeContent(content)" ><span><i class="material-icons">&#xE872;</i></span></a>
          </span>
        </div>


        <div class="thumb" @click="goToContent(content)">

            <img :src="content.body[0].thumbnail" ><span :class="getIcon(content.type)"></span>
        <div class="imgHover" v-if="content.type==='VIDEO'" style="z-index:9;">
                        <span class="iconStudy videoIconStudy"></span>
                        <span>{{$t('study.play')}}</span>
                    </div>
        </div>
        <h4>{{content.body[0].title}}</h4>
        <div class="overSec" v-if="!isSearch">

            <like v-if="!$store.getters['isParent']()" :content="content" :subTopicId="subTopicId"/>
            <bookmark v-if="!$store.getters['isParent']()" :content="content" :subTopicId="subTopicId"/>

        </div>
        <div class="quickInfo" v-if="content.type!=='VIDEO'">

            <div class="clearfix">
                <div class="img">
                    <img :src="content.body[0].thumbnail" class="img-responsive">
                </div>
                <div class="infos">
                    <ul>
                        <li v-if="content.author">
                            <h5>{{content.author}}</h5>
                            <!-- <p>Fundamentals of shapes, sizes and figures</p> -->
                        </li>
                        <li>
                            <h5>{{content.body[0].title }}</h5>
                            <!-- <p>Fundamentals of shapes, sizes and figures</p> -->
                        </li>
                        <li v-if="!isSearch">
                            <like v-if="!$store.getters['isParent']()" :content="content" :subTopicId="subTopicId"/>
                            <bookmark v-if="!$store.getters['isParent']()" :content="content" :subTopicId="subTopicId"/>

                        </li>
                    </ul>

                    <a class="btn btn-primary btn-read pull-right" @click="goToContent(content)">{{$t('study.read')}}</a>

                </div>
            </div>

            <div class="dis">
                <h5>{{$t('study.description')}}</h5>
                <p>{{content.body[0].description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import like from '~/components/atoms/like'
    import bookmark from '~/components/atoms/bookmark'
    export default {
        data() {
          return {
            deleteBookmarkData: {},
      repId: -1,
      idArray: [],
      prevIdArray: []                  
          }
        },
        mounted(){
            //setInterval( () => this.$nextTick(() =>this.fixLastElement()) , 3000);
            this.fixLastElement()
        },
        props: ['content', 'isSearch', 'goToContentView','contentType', 'subTopicId', 'cornerElement'],
        components: {like, bookmark},
        methods: {
    fixLastElement(){
      let items = document.getElementsByClassName('item');

      let prevItem = items[0];
      let rows = 1;
      let totalRows = -1;

      for(let i = 1; i < items.length; i++){
        rows++;

        if(totalRows > -1) {
          if(totalRows == rows){
            this.idArray.push(i);
            rows = 0;
          }

          if(totalRows -1 == rows)
            this.prevIdArray.push(i);              
        } else {

          let item = items[i];

          if(item.offsetTop > prevItem.offsetTop){
            totalRows = rows - 1;
            rows = 1;
            this.prevIdArray.push(i - 2);
            this.idArray.push(i - 1);
          }
          prevItem = item;
        }
      }

      if(totalRows == -1 && items.length > 0){

        let item = items[items.length - 1];
        let len = items.length - 1;

        item.parentElement.appendChild(item.cloneNode());

           let newItems = document.getElementsByClassName('item');
           let cItem = newItems[newItems.length -1];

        if(cItem.offsetTop > item.offsetTop){
          this.idArray.push(len);
        }
      
        item.parentElement.removeChild(cItem)

        clearInterval(this.repId);
      }
                },
            getIcon(type) {
                if (type === 'ARTICLE') {
                    return 'articleicon'
                } else if (type === 'EPUB') {
                    return 'texticon'
                } else {
                    return 'vidicon'
                }
            },
            removeContent(data) {
              if (this.contentType === 'liked') {
                    let dataContent = {}
                    dataContent.id = data.contentId
                    dataContent.type = data.type
                    this.$root.$emit('removeLikedContent',dataContent)
              } else {
                    let dataContent = {}
                    dataContent.showDeleteBookmarkPopup = true;
                    dataContent.Id = data.contentId
                    dataContent.type = data.type
                    this.$root.$emit('removeCreatedBookmarkContent',{dataContent})
              }
              // this.$store.dispatch('study/deleteContentBookmarks',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, contentId:data}).then(response => {
              //   this.$toast.success('Bookmark deleted succesfully');
              // })
            },
            goToContent(content) {
                if (this.isSearch) {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${content.contentId}`))
                } else {
                    this.goToContentView(content)
                }
            }
        }
    }
</script>
