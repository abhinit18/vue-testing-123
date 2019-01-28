<template>
<div class="deletePostPop">
    <div class="deletePostPopInner">

      <h3><i class="material-icons">{{deleteObject.icon? icon: '&#xE872;'}}</i> {{deleteObject.header}}</h3>
      <p>{{deleteObject.message}}</p>
      <div class="btns">
        <button class="btn btn-bordered" @click="deleteObject.onConfirm() + onCancel()">{{$t('common.confirm')}}</button>
        <button class="btn btn-primary" @click="onCancel">{{$t('common.cancel')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
     props: ['deleteObject', 'onCancel']
 }
</script>

<style>
.deletePostPop{ position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 999999}
</style>
