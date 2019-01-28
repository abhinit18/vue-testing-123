<template>
    <div class="gamebox">
        <baloon-game/>
    </div>
</template>

<script>
    import baloonGame from '~/components/baloonGame'
    export default {
        layout: "marketing",
        components: {
            baloonGame
        }
    }
</script>

<style>
body {min-width: 100px}
</style>
