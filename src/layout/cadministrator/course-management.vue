<template>
  <course />
</template>
<script>
import course from "@/components/Cadministrator/course.vue";
import cookie from '@/cookie/cookie.js'
export default {
  beforeRouteEnter(to, from, next) {
    cookie.getCookie("cadministrator", function(data) {
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
  created() {
    // console.log(this.$route)
  },
  components: {
    course
  }
};
</script>
