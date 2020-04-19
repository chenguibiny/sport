<template>
  <div>
    <messagetap :List="messageList" />
    <message />
  </div>
</template>
<script>
import messagetap from "@/components/member/img.vue";
import message from "@/components/message.vue";
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
      messageList: ["看过来咯", "这里将会有最新的消息哦！"]
    };
  },
  components: {
    messagetap,
    message
  }
};
</script>
<style lang="scss">
</style>
