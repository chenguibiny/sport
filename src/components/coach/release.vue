<template>
  <div class="btn-release">
    <el-button type="text" @click="dialogAddFormVisible = true">发布我的新课程</el-button>

    <el-dialog title="发布课程" :visible.sync="dialogAddFormVisible" width="60%" top="80px" :close-on-click-modal="false">
      <el-form :model="addform">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="addform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报名费用" :label-width="formLabelWidth">
          <el-input v-model="addform.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上课地址" :label-width="formLabelWidth">
          <el-input v-model="addform.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <textarea class="msg" v-model="addform.context" autocomplete="off" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import cookie from '@/cookie/cookie.js'
export default {
  data() {
    return {
      dialogAddFormVisible: false,
      addform: {
        title:"",
        money:"",
        address:"",
        context:""
      },
      formLabelWidth: "120px"
    };
  },
  methods:{
    addCourse(){
      if(this.addform.title && this.addform.money && this.addform.address && this.addform.context){
        this.$confirm("确定添加此课程吗？")
        .then(_ => {
          let coachId;
          cookie.getCookie("coachId",function (data) {
            coachId = data;
          })
          // console.log("coachId",coachId);
          // console.log("form",this.addform)
          // this.addform coachId 请求接口
          this.dialogAddFormVisible = false;
        })
        .catch(_ => {})
      }else{
        this.$alert("请完善所有的信息！", "", {
            confirmButtonText: "确定"
          });
        return;
      }
    }
  }
};
</script>
<style lang="scss">
.btn-release {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .el-button.el-button--text {
    background-color: cornflowerblue;
    color: #fff;
    margin: 5px;
    float: right;
    span {
      padding: 10px;
    }
  }
  .el-dialog__body {
    .el-input {
      width: 50%;
    }
    textarea.msg {
      width: 70%;
      height: 40%;
      text-indent: 1em;
    }
  }
}
</style>
