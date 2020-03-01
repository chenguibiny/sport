<template>
  <div>
    <el-button class="btn" type="text" @click="changeMessage">修改信息</el-button>
    <el-drawer
      title="我的个人信息！"
      :before-close="handleClose1"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="账号：" :label-width="formLabelWidth">
            <el-input v-model="form.coachName" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别：" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话：" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生日：" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker style="width:200px;" v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </el-form-item>
        </el-form>

        <div>
          <el-button @click="innerDrawer = true" class="changepassword">修改密码</el-button>
          <el-drawer
            title="修改密码"
            :append-to-body="true"
            :before-close="handleClose2"
            :visible.sync="innerDrawer"
            class="tochangepassword"
          >
            <span class="top">登录账号:</span>
            <span class="top username">{{form.coachName}}</span>
            <!-- 密码表单 -->
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <h5 v-if="error" style="color:red;margin-left:100px;">旧密码错误,若忘记密码,可联系管理员!</h5>
              <el-form-item label="旧的密码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新的密码：" prop="rePass">
                <el-input type="password" v-model="ruleForm.rePass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-drawer>
        </div>

        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          <el-button @click="dialog = false">取 消</el-button>
        </div>
      </div>
    </el-drawer>

  </div>
</template>
<script>
import cookie from '@/cookie/cookie.js'
import axios from 'axios';
import api from '@/api/index.js'
import {deepClone , formatDate} from '@/utils/deepClone.js';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      }else {
        callback();
      }
    };
    return {
      coachId:0,
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      innerDrawer: false,
      error:null,
      ruleForm: {
        pass: "",
        rePass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        rePass: [{ validator: validatePass2, trigger: "blur" }]
      },
      form:{},
      // coach:{
      //       username:"甄子丹",
      //       password:"123",
      //       birthday:"1998-01-23",
      //       sex:"男",
      //       phone:"15218968678",
      // }
    };
  },
  // computed: {
  //   form() {
  //     return this.$store.state.coach;
  //   }
  // },
  methods: {
    async changeMessage(){
      this.error = null;
      let coachId;
      let form;
      await cookie.getCookie("coachId",function (data) {
        coachId = data;
      })
      this.coachId = coachId;
      console.log("coachId",this.coachId)
      // 通过coachId请求接口获取数据赋值给this.form
      api.getCoachInfo({
        params:{
          tid:coachId
        }
      }).then( res => {
        if(res.data.code === 1){
          form = deepClone(res.data.data);
          if(form.sex === 0){
            form.sex = ""
          }else if(form.sex === 1){
            form.sex = "男"
          }else if(form.sex === 2){
            form.sex = "女"
          }
          form.birthday = formatDate(form.birthday);
          this.form = deepClone(form)
          this.dialog = true;
          console.log(this.form)
        }
      }).catch(rej => {
        console.log(rej)
      })
    },
    // 外层提交表单
    handleClose1(done) {
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.error = null;
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            console.log(this.form)
            this.$store.commit("changeCoachMessage", this.form);
            done();
          }, 2000);
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      done();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存修改吗？")
            .then(_ => {
              // this.coachId,this.ruleForm.pass 请求接口
              const params = {
                tid:this.coachId,
                oldPassword:this.ruleForm.pass,
                newPassword:this.ruleForm.rePass
              }
              api.changeCoachPassword({
                tid:this.coachId,
                oldPassword:this.ruleForm.pass,
                newPassword:this.ruleForm.rePass
              }).then( res => {
                if(res.data.code === 1){
                  this.error = null;
                  console.log(res);
                  this.$message({
                    message: "修改密码成功！",
                    type: "success"
                  });
                }else {
                  this.error = 1;
                }
              }).catch( rej => {
                console.log(rej);
              })
              // alert(this.ruleForm.pass+" "+this.ruleForm.rePass+" "+"修改成功!");
              this.ruleForm.pass = "";
              this.ruleForm.rePass = "";
            })
            .catch(_ => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
#el-drawer__title i:hover {
  color: aqua;
}
.el-form-item:last-of-type {
  .el-input {
    width: 150px;
  }
}
.block{
  margin: 0;
}
.changepassword {
  background-color:lightseagreen;
  span {
    color: #fff;
  }
  &:hover {
    background-color: cornflowerblue;
    span {
      color: #fff;
    }
  }
}
.demo-drawer__footer {
  .el-button--primary {
    margin-left: 30%;
  }
  .el-button--default {
    margin-left: 10%;
  }
}
.tochangepassword {
  section {
    position: relative;
    .top {
      position: absolute;
      top: 5%;
      left: 5%;
      &.username {
        margin-left: 20%;
      }
    }
    .el-form{
      position: absolute;
      width: 100%;
      top: 20%;
    }
  }
}

</style>
