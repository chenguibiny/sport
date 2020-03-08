<template>
  <div class="container">
    <img
      src="@/assets/img/img1.png"
      alt
      style="width:100%;height:100%;"
    />
    <div class="center">
      <div class="header">欢迎登录</div>

      <div class="demo-input-suffix">
        <div class="inp">
          <span class="sp">用户名:</span>
          <el-input
            v-model="userName"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </div>
        <div class="inp">
          <span class="sp">密码:</span>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </div>
        <el-radio-group
          class="btn"
          v-model="radio"
        >
          <el-radio :label="3">会员</el-radio>
          <el-radio :label="6">教练</el-radio>
          <el-radio :label="9">课程管理员</el-radio>
          <el-radio :label="12">系统管理员</el-radio>
        </el-radio-group>
        <el-button
          class="btn-login"
          type="primary"
          @click="click"
        >登录</el-button>
        <h4
          v-if="error"
          class="tips"
        >{{error}}</h4>
      </div>
      <el-button
        class="register"
        type="primary"
        @click="toRegister"
      >没有账号？去注册</el-button>
    </div>
  </div>
</template>
<script>
import cookie from "@/cookie/cookie.js";
import api from "@/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      userName: "",
      password: "",
      radio: 3,
      error: null
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ name: "register" });
    },
    click() {
      // console.log(this.userName,this.password,this.radio);
      if (!this.userName) {
        this.error = "请输入用户名";
        return false;
      }
      if (!this.password) {
        this.error = "请输入密码";
        return false;
      }
      if (this.radio === 9) {
        this.error = null;
        if (
          this.userName === "cadministrator" &&
          this.password === "cadministrator"
        ) {
          cookie.setCookie("cadministrator", "cadministrator", 5000);
          this.$router.push({ name: "cadministrator" });
        } else {
          this.$message.error("账号或密码错误！");
        }
      }
      if (this.radio === 12) {
        this.error = null;
        if (
          this.userName === "sadministrator" &&
          this.password === "sadministrator"
        ) {
          cookie.setCookie("sadministrator", "sadministrator", 5000);
          this.$router.push({ name: "sadministrator" });
        } else {
          this.$message.error("账号或密码错误！");
        }
      }
      if (this.radio === 3) {
        var params = {
          id: String(this.userName),
          password: String(this.password)
        };
        api
          .memberLogin({
            username: this.userName,
            password: this.password
          })
          .then(res => {
            if (res.data.code === 1) {
              this.error = null;
              const sid = res.data.data.user.sid;
              cookie.removeCookie("memberId");
              cookie.setCookie("memberId", sid, 10000);
              cookie.getCookie("memberId", function(data) {
                console.log(data);
              });
              this.$router.push({ name: "main" });
            } else {
              this.$message.error("账号或密码错误！");
            }
          })
          .catch(rej => {
            console.log(rej);
          });
        this.error = null;
      }
      if (this.radio === 6) {
        var params = {
          id: String(this.userName),
          password: String(this.password)
        };
        console.log(params);
        api
          .coachLogin({
            coachName: this.userName,
            password: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.error = null;
              const tid = res.data.data.coach.tid;
              cookie.removeCookie("coachId");
              cookie.setCookie("coachId", tid, 10000);
              cookie.getCookie("coachId", function(data) {
                console.log(data);
              });
              this.$router.push({ name: "homepage" });
            } else {
              this.$message.error("账号或密码错误！");
            }
          })
          .catch(rej => {
            console.log(rej);
          });
        this.error = null;
      }
    }
  }
};
</script>
<style lang="scss" >
.container {
  width: 100%;
  height: 650px;
  .center {
    position: absolute;
    width: 500px;
    height: 350px;
    border: 1px solid #888;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -175px;
    .header {
      height: 50px;
      width: 100%;
      font-size: 35px;
      color: blue;
      text-align: center;
      line-height: 50px;
    }
    .demo-input-suffix {
      display: flex;
      flex-wrap: wrap;
      height: 270px;
      .inp {
        display: flex;
        width: 80%;
        margin: 30px auto;
        span.sp {
          display: inline-block;
          width: 80px;
          height: 40px;
          color: cyan;
          line-height: 40px;
          font-size: 20px;
          text-align: center;
        }
      }
    }
    .btn {
      width: 100%;
      margin: auto;
      height: 20px;
      display: block;
      el-radio {
        display: inline-block;
        padding-left: 10px;
      }
    }
    .btn-login {
      display: block;
      width: 150px;
      margin: 10px auto;
      font-size: 16px;
    }
    .tips {
      position: absolute;
      display: block;
      color: red;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      right: 0;
      margin-right: 40px;
    }
  }
  .register {
    position: absolute;
    height: 29px;
    right: 0;
    color: #fff;
    line-height: 29px;
    line-height: 10px;
    background: orange;
    border-radius: 10px;
    border: none;
  }
}
</style>
