<template>
  <div>
    <messagetop :List="messageList" />
    <message />
  </div>
</template>
<script>
import messagetop from "@/components/coach/img.vue";
import message from "@/components/message.vue";
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
      messageList: ["这里将会发布最新的消息", "注意查看哦！"]
    };
  },
  components: {
    messagetop,
    message
  }
};
</script>
<style lang="scss">
</style>
