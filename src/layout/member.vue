<template>
    <div>
        <top />
        <center />
        <search />
        <router-view />
        <foter />
    </div>
</template>
<script>
import top from '@/components/member/topTwo.vue'
import center from '@/components/header/memcenter.vue'
import search from '@/components/member/search.vue'
import foter from '@/components/footer.vue'
export default {
    components:{
        top,
        center,
        search,
        foter
    }
}
</script>
<style lang="scss">

</style>
