<template>
    <div>
        <!-- <search/> -->
        <tap :List="course"/>
        <c-course />
    </div>
</template>
<script>
import tap from '@/components/member/img.vue'
import cCourse from '@/components/member/coaching-course/course.vue'
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
            course:["精英课堂来袭","快选择你喜欢的课程吧！"]
        }
    },
    components:{
        tap,
        cCourse,
        search
    }
}
</script>
<style lang="scss">

</style>
