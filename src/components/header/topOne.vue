<template>
    <div class="content">
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
import cookie from '@/cookie/cookie.js'
export default {
  data(){
    return{
      centerDialogVisible: false
    }
  },
  methods:{
    toLogin(){
      this.centerDialogVisible = false;
      setTimeout(() => {
        cookie.removeCookie("cadministrator")
        cookie.removeCookie("sadministrator")
        this.$router.push('/')
      }, 500);

    }
  }
}
</script>
<style lang="scss">
    .content{
        position: relative;
        width: 100%;
        height: 30px;
        background: #303133;
        .toLogin{
            position: absolute;
            display: block;
            color: #fff;
            height: 30px;
            line-height: 30px;
            background: #303133;
            border:none;
            text-decoration: none;
            cursor: pointer;
            right: 0;
            margin-right: 30px;
        }
    }
</style>
