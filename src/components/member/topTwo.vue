<template>
  <div class="content">
    <change-message></change-message>
    <button class="toLogin" @click="centerDialogVisible = true">注销</button>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import changeMessage from "@/components/member/person-message.vue";
import cookie from '@/cookie/cookie.js'
export default {
  data(){
    return{
      centerDialogVisible: false
    }
  },
  components: {
    changeMessage
  },
  methods:{
    toLogin(){
      this.centerDialogVisible = false;
      setTimeout(() => {
        this.$route.matched[0].meta.login = false;
        cookie.removeCookie("memberId");
        this.$router.push('/');
      }, 500);

    }
  }
};
</script>
<style lang="scss">
.content {
  position: relative;
  width: 100%;
  height: 30px;
  background: #303133;
  .btn {
    position: absolute;
    height: 30px;
    width: 100px;
    right: 80px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    span {
    position: absolute;
    display: block;
    margin-top: -14px;
    margin-left: 15px;
    font-size: 16px;
    color: #fff;
    }

  }
  .toLogin {
    position: absolute;
    display: block;
    color: #fff;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    text-decoration: none;
    background: #303133;
    border:none;
    cursor: pointer;
    right: 30px;
  }
}
</style>
