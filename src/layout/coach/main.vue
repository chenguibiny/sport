<template>
  <carousel />
</template>
<script>
import carousel from "@/components/carousel.vue";
import cookie from "@/cookie/cookie.js";
export default {
  beforeRouteEnter(to, from, next) {
    cookie.getCookie("coachId", function(data) {
      if (data !== "undefined") {
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
  components: {
    carousel
  }
};
</script>
