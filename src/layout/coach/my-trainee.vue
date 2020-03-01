<template>
    <div>
        <tap :List="show"/>
        <trainee />
    </div>
</template>
<script>
import tap from '@/components/coach/img.vue'
import trainee from '@/components/coach/trainee.vue'
import cookie from '@/cookie/cookie.js'
export default {
  // beforeRouteEnter(to,from,next){
  //   cookie.getCookie("coachId",function (data) {
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
            show:["你的学员就是你的孩子","请善待他们！"]
        }
    },
    components:{
        tap,
        trainee
    }
}
</script>
<style lang="scss">

</style>
