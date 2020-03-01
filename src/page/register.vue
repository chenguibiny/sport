<template>
  <div class="container">
    <img src="@/assets/img/img1.png" alt style="width:100%;height:100%;" />
    <div class="center">
      <div class="msg">
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="demo-registerForm"
        >
          <el-form-item label="用户名：" prop="username">
            <el-input
              type="text"
              v-model="registerForm.username"
              placeholder="请输入用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="创建密码：" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="repassword">
            <el-input
              type="password"
              v-model="registerForm.repassword"
              placeholder="再次输入密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-radio-group v-model="radio">
            <el-radio :label="3">会员</el-radio>
            <el-radio :label="6">教练</el-radio>
          </el-radio-group>

          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-button class="login" type="primary" @click="toLogin">已有账号？去登录</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/api/index.js';
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else{
        if (this.registerForm.repassword !== "") {
          this.$refs.registerForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        repassword: ""
      },
      radio: 3,
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    clearInput(){
      this.registerForm.username = "";
      this.registerForm.password = "";
      this.registerForm.repassword = "";
    },
    outAlert(){
      this.$alert("用户名已经存在！", "", {
        confirmButtonText: "确定"
      });
      return;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const {username,password} = this.registerForm;
          var params = {
            radio:Number(this.radio),
            id:username,
            password:String(password)
          }
          console.log(params)
          if(this.radio == 3){
            api.memberRegister({
              username:String(username),
              password:String(password)
            }).then( res =>{
              if( res.data.code === 1){
                this.$message({
                  message: '恭喜你，注册成功！',
                  type: 'success'
                });
                this.clearInput();
                console.log(res);
              }else if(res.data.code === 500100) {
                this.outAlert();
              }
            }).catch( rej => {
              console.log(rej);
            })
          }else if(this.radio == 6 ){
            api.coachRegister({
              coachName:String(username),
              password:String(password)
            }).then( res => {
              if(res.data.code === 1) {
                this.$message({
                  message: '恭喜你，注册成功！',
                  type: 'success'
                });
                this.clearInput();
                console.log(res);
              }else if(res.data.code === 500100) {
                this.outAlert();
              }
            }).catch( rej => {
              console.log(rej);
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 650px;
  // background-image: url('@/assets/img/img1.png');
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
    .msg {
      position: relative;
      height: 320px;
      .el-form-item {
        margin: 25px auto;
        .el-form-item__label {
          display: inline-block;
          width: 80px;
          font-size: 16px;
          color: cyan;
        }
        .el-form-item__content {
          width: 330px;
        }
      }
      .el-radio-group {
        position: absolute;
        display: inline-block;
        margin-top: 10px;
        margin-left: 100px;
        width: 80%;
      }
      .btn {
        position: absolute;
        width: 80%;
        height: 50px;
        margin-top: 50px;
        margin-left: 60px;
        .el-button {
          margin-top: -10px;
          width: 150px;
          height: 40px;
          font-size: 16px;
        }
      }
    }
    .login {
      position: absolute;
      height: 29px;
      right: 0;
      bottom: 0;
      color: #fff;
      line-height: 29px;
      line-height: 10px;
      background: orange;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
