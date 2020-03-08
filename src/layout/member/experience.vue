<template>
    <div>
        <tap :List="course"/>
        <experience />
    </div>
</template>
<script>
import tap from '@/components/member/img.vue'
import Experience from '@/components/member/experience/index.vue'
import search from '@/components/member/search.vue'
import cookie from '@/cookie/cookie.js'
export default {
  // beforeRouteEnter(to,from,next){
  //   cookie.getCookie("memberId",function (data) {
  //     if(data !== "undefined"){
  //       to.matched[0].meta.login = true;
  //       next();
  //       return
  //     }else {
  //       const answer = confirm('你还没有登陆，要登陆后才能浏览信息，确定登陆吗？');
  //       if(answer) {
  //         next('/')
  //       }else{
  //         next('/')
  //       }
  //     }
  //   })
  // },
    data(){
        return {
            course:["想吐槽？还是要分享？","这里是属于会员的专属地区！"]
        }
    },
    components:{
        tap,
        Experience,
        search
    }
}
</script>
<style lang="scss">

</style>
