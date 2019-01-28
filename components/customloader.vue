<template>
        <button @click="loaderClick" :class="[loaderClass, {dataloaderBtn: loaderDisabled}]" :disabled="loaderDisabled">
				<div class="dataloader" v-if="loaderDisabled">
				  <div class="bounce1"></div>
				  <div class="bounce2"></div>
				  <div class="bounce3"></div>
				</div>
        <div class="txt">{{$t(loaderText)}}</div></button>
</template>

<script>
export default {
    props: ['loaderClick', 'loaderClass', 'loaderDisabled', 'loaderText'],
}
</script>