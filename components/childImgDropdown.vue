<template>
    <div class="img">
        <img v-if="imageObj.userpic!=='' && imageObj.userpic!=='NONE'" :src="imageObj.userpic" class="img childImg">
        <div class="picPlaceHolder picplace" v-else>{{imageObj? (imageObj.username? imageObj.username.substr(0,1): '-'): '-'}}</div>
        <!-- <div class="ubadge gold">{{$t('index.gold')}}</div> -->
    </div>
</template>
<script>
export default {
    props: ['imageObj']
}
</script>
<style>
    .childImg{
        background: hsla(0,0%,100%,.5);
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        cursor: pointer;
        opacity: 1;
    }
    .picplace{
        width: 30px;
        height: 30px;
        background: #f5f5f5;
        border-radius: 4px;
        margin: 0 auto;
        line-height: 30px;
        font-size: 23px;
        color: #3f51b5;
        font-weight: 300;
    }
</style>