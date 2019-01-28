<template>
<div class="invoiceCenter">
    <h1>{{$t('index.invoice')}}</h1>
    <p>{{$t('payment.auto_download')}}. . . . .</p>
    <p>{{$t('payment.or')}}</p>
    <p>{{$t('payment.also_download')}}</p>
    <p><b><a href="#" target="_self" v-on:click="downloadInvoice">{{$t('payment.download')}}</a></b></p>
</div>
</template>

<script>
export default {
    layout: "blank",
    // middleware: "anonymous",
    head () {
        return {
            title:  this.$t('index.invoice')
        }
    },
    mounted: function () {
      this.downloadInvoice()
    },
    methods: {
        downloadInvoice(){
            let id = this.$route.query.id
            if (id) {
                this.$store.dispatch('common/fetchInvoice', {id: id, langCode: this.$store.state.locale.selectedLocale}).then (response => {
                    let blob = new Blob([response.data], { type:   'application/pdf' } )
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'Report.pdf'
                    link.click()
                }, error => {

                })
            }
        }
    }
}
</script>

<style>
.invoiceCenter {text-align: center}
a:link, a:visited {
    background-color: #9999ff;
    color: white;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
}


a:hover, a:active {
    background-color: #6666ff;
    }
</style>