<template>
    <div>
        <top />
        <cocenter />
        <router-view />
        <foter />
    </div>
</template>
<script>
import top from '@/components/coach/topTwo.vue'
import cocenter from '@/components/header/cocenter.vue'
import foter from '@/components/footer.vue'
export default {
    components:{
        top,
        cocenter,
        foter
    }
}
</script>
<style lang="scss">
    
</style>