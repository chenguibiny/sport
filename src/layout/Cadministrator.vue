<template>
    <div class="wrapper">
        <top />
        <center />
        <router-view />
        <foter />
    </div>
</template>
<script>
import top from '@/components/header/topOne.vue'
import center from '@/components/header/cacenter.vue'
import foter from '@/components/footer.vue'
export default {
    components:{
        top,
        center,
        foter
    }
}
</script>
<style lang="scss">
    
</style>