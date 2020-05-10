<template>
  <div>
    <tap :List="show" />
    <release-list />
  </div>
</template>
<script>
import tap from "@/components/coach/img.vue";
import releaseList from "@/components/coach/release-list.vue";
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
  data() {
    return {
      show: ["发挥你的魅力？", "展示最好的你！"]
    };
  },
  components: {
    tap,
    releaseList
  }
};
</script>
<style lang="scss">
</style>
