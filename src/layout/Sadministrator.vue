<template>
    <div>
        <top />
        <sacenter />
        <router-view />
        <foter />
    </div>
</template>
<script>
import top from '@/components/header/topOne.vue'
import sacenter from '@/components/header/sacenter.vue'
import foter from '@/components/footer.vue'
export default {
    components:{
        top,
        sacenter,
        foter
    }
}
</script>
<style lang="scss">
    
</style>