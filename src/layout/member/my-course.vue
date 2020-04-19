<template>
  <div>
    <tap :List="course" />
    <m-course />
  </div>
</template>
<script>
import tap from "@/components/member/img.vue";
import mCourse from "@/components/member/my-course/mycourse.vue";
import cookie from "@/cookie/cookie.js";
export default {
  beforeRouteEnter(to, from, next) {
    cookie.getCookie("memberId", function(data) {
      if (data !== "undefined") {
        // to.matched[0].meta.login = true;
        next();
        return;
      } else {
        const answer = confirm(
          "你还没有登陆，要登陆后才能浏览信息，确定登陆吗？"
        );
        if (answer) {
          next("/");
        } else {
          next("/");
        }
      }
    });
  },
  data() {
    return {
      course: ["坚持就是胜利", "耐得住寂寞方能不寂寞"]
    };
  },
  components: {
    tap,
    mCourse,
  }
};
</script>
<style lang="scss">
</style>
