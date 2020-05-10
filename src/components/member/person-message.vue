<template>
  <div>
    <el-button
      class="btn"
      type="text"
      @click="changeMessage"
    >修改信息</el-button>
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
          <el-form-item
            label="姓名："
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="性别："
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.sex"
              placeholder="请选择性别"
            >
              <el-option
                label="男"
                value="male"
              ></el-option>
              <el-option
                label="女"
                value="female"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="电话："
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="生日："
            :label-width="formLabelWidth"
          >
            <div>
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item
            label="余额："
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.money"
              autocomplete="off"
              disabled
            ></el-input>
            <el-button
              type="text"
              @click="addChaopiao"
              style="background:lightseagreen;color:#fff;text-align:center;width:60px;"
            >充值</el-button>
          </el-form-item>
        </el-form>

        <!-- 修改密码 -->
        <div>
          <el-button
            @click="innerDrawer = true"
            class="changepassword"
          >修改密码</el-button>
          <el-drawer
            title="修改密码"
            :append-to-body="true"
            :before-close="handleClose2"
            :visible.sync="innerDrawer"
            class="tochangepassword"
          >
            <span class="top">登录账号:</span>
            <span class="top username">{{form.username}}</span>
            <!-- 密码表单 -->
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <h5
                v-if="error"
                style="color:red;margin-left:100px;"
              >{{error}}</h5>
              <el-form-item
                label="旧的密码："
                prop="pass"
              >
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="新的密码："
                prop="rePass"
              >
                <el-input
                  type="password"
                  v-model="ruleForm.rePass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </el-drawer>
        </div>

        <!-- 充值 -->
        <el-dialog
          :append-to-body="true"
          title=""
          :visible.sync="dialogFormVisible"
        >
          <el-form :model="form">
            <el-form-item
              label="充值金额"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="addNum"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addMoney"
            >确 定</el-button>
          </div>
        </el-dialog>

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
import cookie from "@/cookie/cookie.js";
import api from "@/api/index.js";
import { deepClone, formatDate } from "@/utils/deepClone.js";
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
      } else {
        callback();
      }
    };
    return {
      memberId: 0,
      // 暂存的 生日，性别，手机号
      temporalForm: {},
      // 充值
      dialogFormVisible: false,
      addNum: '',
      dialog: false,
      loading: false,
      formLabelWidth: "80px",
      innerDrawer: false,
      error: null,
      ruleForm: {
        pass: "",
        rePass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        rePass: [{ validator: validatePass2, trigger: "blur" }]
      },
      // 存放个人信息
      form: {}
    };
  },
  methods: {
    async changeMessage() {
      this.error = null;
      let memberId;
      let form;
      await cookie.getCookie("memberId", function(data) {
        memberId = data;
      });
      this.memberId = memberId;
      api
        .getUserInfo({
          params: {
            sid: memberId
          }
        })
        .then(async res => {
          if (res.data.code === 1) {
            form = deepClone(res.data.data);
            if (form.sex === 0) {
              form.sex = "";
            } else if (form.sex === 1) {
              form.sex = "male";
            } else if (form.sex === 2) {
              form.sex = "female";
            }
            if (form.money === null) {
              form.money = 0;
            }
            form.birthday = formatDate(form.birthday);
            this.form = deepClone(form);
            this.temporalForm = deepClone(form);
            this.dialog = true;
          }
        });
    },
    // 外层提交表单
    handleClose1(done) {
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.error = null;
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let {birthday,money,phone,sex,username} = deepClone(this.form);
            api
              .saveUserInfo({
                sid: this.memberId,
                birthday,
                money,
                phone,
                sex: sex ? (sex === "male" ? 1 : 2) : 0,
                username
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                }
              });
            done();
          }, 2000);
        })
        .catch(_ => {});
    },
    // 修改密码框退出前回调
    handleClose2(done) {
      this.error = null;
      done();
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定要保存修改吗？")
            .then(_ => {
              api
                .changeUserPassword({
                  sid: this.memberId,
                  oldPassword: this.ruleForm.pass,
                  newPassword: this.ruleForm.rePass
                })
                .then(res => {
                  if (res.data.code === 1) {
                    this.error = null;
                    this.$message({
                      message: "修改密码成功！",
                      type: "success"
                    });
                  } else {
                    this.error = res.data.msg;
                  }
                })
              this.ruleForm.pass = "";
              this.ruleForm.rePass = "";
            })
            .catch(_ => {});
        } else {
          return false;
        }
      });
    },
    addChaopiao() {
      this.dialogFormVisible = true;
    },
    addMoney() {
      this.$confirm("确定要充值吗？")
        .then(_ => {
          this.addNum = Number(this.addNum);
          let arr = [];
          arr.push(this.addNum);
          if (arr.includes(NaN)) {
            this.$alert("请输入充值的正常金额数目", "", {
              confirmButtonText: "确定"
            });
            return;
          } else {
            this.form.money = Number(this.form.money) + Number(this.addNum);
            let form = deepClone(this.form);
            // 拿到暂存的值，防止充值前修改了 性别、电话、生日，充值后一并修改了。
            let temporalForm = deepClone(this.temporalForm);
            let {birthday,phone,sex,username} = temporalForm;
            api
              .saveUserInfo({
                sid: this.memberId,
                birthday,
                money: form.money,
                phone,
                sex: sex
                  ? sex === "male"
                    ? 1
                    : 2
                  : 0,
                username
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    message: "充值成功！",
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                }
              });
            this.addNum = '';
          }
        })
        .catch(_ => {});
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
.changepassword {
  background-color: lightseagreen;
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
    .el-form {
      position: absolute;
      width: 100%;
      top: 20%;
    }
  }
}
</style>
