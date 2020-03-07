<template>
  <div>
    <div class="top"></div>
    <el-table
      :data="currentPage"
      style="width: 90%;margin:0 auto;min-height:500px;"
    >
      <el-table-column
        label="账号"
        width="320"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="320"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.coachName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="密码"
        width="320"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="changePass(scope.$index, scope.row)"
          >修改密码</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改密码弹框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      style="width:1000px;"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item
          label="用户名:"
          :label-width="formLabelWidth"
        >
          <span>{{ form.coachName }}</span>
        </el-form-item>
        <el-form-item
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            style="width:300px;"
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
          @click="submitChange"
        >确 定</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[6,8,10,12]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import cookie from "@/cookie/cookie.js";
import { deepClone } from "@/utils/deepClone.js";
import api from "@/api/index.js";
export default {
  //   beforeRouteEnter(to,from,next){
  //   cookie.getCookie("sadministrator",function (data) {
  //     if(data !== "undefined"){
  //       to.matched[0].meta.login = true;
  //       next();
  //       return
  //     }else {
  //       const answer = confirm('你还没有登陆，要登陆后才能浏览信息，确定登陆吗？');
  //       if(answer) {
  //         next('/')
  //       }else{
  //         next('/')
  //       }
  //     }
  //   })
  // },
  data() {
    return {
      tid: 0,
      //每页多少数据
      n: 8,
      //当前页
      m: 1,
      tableData: [
        // {
        //   tid:1,
        //   coachName:"wangxiaohu",
        //   password:"11111",
        // },
        // {
        //   tid:2,
        //   coachName:"wangxiaohu",
        //   password:"1321",
        // },
        // {
        //   tid:3,
        //   coachName:"wangxiaohu",
        //   password:"1231",
        // },
        // {
        //   tid:4,
        //   coachName:"wangxiaohu",
        //   password:"1341",
        // },
        // {
        //   tid:5,
        //   coachName:"wangxiaohu",
        //   password:"2341",
        // },
        // {
        //   tid:6,
        //   coachName:"wangxiaohu",
        //   password:"151",
        // },
        // {
        //   tid:7,
        //   coachName:"wangxiaohu",
        //   password:"3221",
        // },
        // {
        //   tid:8,
        //   coachName:"wangxiaohu",
        //   password:"1312",
        // },
        // {
        //   tid:9,
        //   coachName:"wangxiaohu",
        //   password:"4124321",
        // },
        // {
        //   tid:10,
        //   coachName:"wangxiaohu",
        //   password:"34124",
        // },
        // {
        //   tid:11,
        //   coachName:"wangxiaohu",
        //   password:"41412",
        // },
        // {
        //   tid:12,
        //   coachName:"wangxiaohu",
        //   password:"123412",
        // },
        // {
        //   tid:13,
        //   coachName:"wangxiaohu",
        //   password:"13421",
        // },
        // {
        //   tid:14,
        //   coachName:"wangxiaohu",
        //   password:"354234",
        // },
        // {
        //   tid:15,
        //   coachName:"wangxiaohu",
        //   password:"3464",
        // }
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {}
    };
  },
  created() {
    this.getData();
  },
  computed: {
    currentPage() {
      return this.tableData.slice(
        (this.m - 1) * this.n,
        (this.m - 1) * this.n + this.n
      );
    }
  },
  methods: {
    getData() {
      api.getCoachList().then(res => {
        if (res.data.code === 1) {
          let list = deepClone(res.data.data.list);
          this.tableData = list;
        }
      });
    },
    // 点击修改密码
    changePass(index, row) {
      console.log(index, row);
      this.tid = row.tid;
      this.form = deepClone(row);
      delete this.form.password;
      this.dialogFormVisible = true;
    },
    // 确认修改密码
    submitChange() {
      this.dialogFormVisible = false;
      // console.log(this.form);
      // this.$confirm 弹框，并且this.form 发送请求
    },
    // 删除
    handleDelete(index, row) {
      this.tid = row.tid;
      console.log(index, row);
    },
    //每页多少条数据  `${val}`
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.n = parseInt(`${val}`);
    },
    //当前页数  parseInt(`${val}`)
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.m = parseInt(`${val}`);
    }
  }
};
</script>
<style lang="scss">
.top {
  margin: 0 auto;
  width: 90%;
  height: 10px;
  border-bottom: 1px solid #ccc;
  background-color: ghostwhite;
  margin-bottom: 10px;
}

.block {
  position: relative;
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  .el-pagination {
    width: 50%;
    margin: 0 auto;
    span {
      font-size: 12px;
    }
  }
}
</style>
