<template>
  <div>
    <el-table
      :data="currentPage"
      style="width: 90%"
      v-if="showcourselist"
    >
      <el-table-column
        label="教练"
        width="250"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.coachName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="250"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报名费用"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button>
          <el-button
            v-if="!scope.row.prohibit"
            size="mini"
            class="danger"
            type="danger"
            @click="prohibit(scope.$index, scope.row)"
          >禁用课程</el-button>
          <el-button
            v-else
            size="mini"
            class="danger"
            type="success"
            @click="prohibit(scope.$index, scope.row)"
          >取消禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      class="course-message"
      v-else
    >
      <button
        class="quit"
        @click="quit"
      >退出</button>
      <div class="course-message-content">
        <div class="top">{{apartList.cname}}</div>
        <div class="name">
          <span>教练：</span>
          {{apartList.coachName}}
        </div>
        <div class="money">
          <span>报名费用：</span>
          {{apartList.cost}}
        </div>
        <div class="adress">
          <span>上课地址：</span>
          {{apartList.location}}
        </div>
        <div class="adress">
          <span>报名人数：</span>
          {{apartList.count}}
        </div>
        <div class="introduce">
          <span>课程介绍：</span>
          <div>{{apartList.description}}</div>
        </div>
      </div>

      <el-button
        type="text"
        @click="showCourseAdress"
      >课程评价</el-button>

      <el-dialog
        title="课程评价"
        :visible.sync="dialogTableVisible"
        :close-on-click-modal="false"
      >
        <el-table :data="gridData">
          <el-table-column
            property="username"
            label="评价人"
            width="150"
          ></el-table-column>
          <el-table-column
            property="context"
            label="评价"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <!-- 弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span v-if="!isprohibit">确定禁用该课程吗？</span>
      <span v-else>确定取消禁用该课程吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="changeProhibit"
        >确 定</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10,15,20,25]"
        :page-size="10"
        layout="total, sizes, prev, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>

  </div>
</template>
<script>
import api from "@/api/index.js";
import { deepClone } from "@/utils/deepClone.js";
export default {
  data() {
    return {
      sid: 0,
      cid: 0,
      showcourselist: true,
      buy: false,
      // 课程信息,放置所有数据
      tableData: [
        // {
        //   cid: 1,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 2,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 3,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 4,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 5,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 6,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 7,
        //   cname: "腹肌撕裂者进阶",
        //   coachName: "陈",
        //   location: "肇庆市肇庆学院123",
        //   cost: 2000,
        //   description:
        //     "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 8,
        //   cname: "哑铃手臂塑形",
        //   coachName: "肖",
        //   location: "上海市普陀区金沙江路343243",
        //   cost: 21000,
        //   description: "只要一副小哑铃就可以练出[好看的臂膀]",
        //   count: 12,
        //   prohibit: false
        // },
        // {
        //   cid: 9,
        //   cname: "健身房廋腿训练",
        //   coachName: "林",
        //   location: "上海市普陀区金沙江路132123123",
        //   cost: 1050,
        //   description:
        //     "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 10,
        //   cname: "腹肌撕裂",
        //   coachName: "1234",
        //   location: "上海市普陀区金沙江路 1516 弄",
        //   cost: 2030,
        //   description: "",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 11,
        //   cname: "腹肌撕裂",
        //   coachName: "1234",
        //   location: "上海市普陀区金沙江路 1516 弄",
        //   cost: 2030,
        //   description: "",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 12,
        //   cname: "腹肌撕裂",
        //   coachName: "1234",
        //   location: "上海市普陀区金沙江路 1516 弄",
        //   cost: 2030,
        //   description: "",
        //   count: 12,
        //   prohibit: true
        // },
        // {
        //   cid: 13,
        //   cname: "腹肌撕裂",
        //   coachName: "1234",
        //   location: "上海市普陀区金沙江路 1516 弄",
        //   cost: 2030,
        //   description: "",
        //   count: 12,
        //   prohibit: true
        // }
      ],
      n: 10,
      m: 1,

      // 课程评价内容   放临时数据
      gridData: [
        // {
        //   name: "肖",
        //   context:
        //     "教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评！"
        // },
        // {
        //   name: "林",
        //   context: "教练很走心，好评！"
        // },
        // {
        //   name: "邱",
        //   context: "教练很走心，好评！"
        // },
        // {
        //   name: "钟",
        //   context: "教练很走心，好评！"
        // }
      ],
      // 课程评价弹框
      dialogTableVisible: false,
      // 弹框
      dialogVisible: false,
      // 禁用标志
      isprohibit: false,
      // 课程详情页  放临时数据
      apartList: {}
    };
  },
  async created() {
    await this.getData();
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
    async getData() {
      await api.getUserList().then(res => {
        this.sid = res.data.data.list[0].sid;
      });
      await api
        .getAllCourse({
          params: {
            sid: this.sid
          }
        })
        .then(res => {
          let list = res.data.data.map(v => {
            if (v.prohibit === null) {
              v.prohibit = 0;
            }
            return v;
          });
          this.tableData = list;
        });
    },
    // 查看详情
    handleEdit(index, row) {
      console.log(index, row);
      this.cid = row.cid;
      this.showcourselist = false;
      this.apartList = row;
      this.buy = row.flag;
    },
    // 点击禁用按钮
    prohibit(index, row) {
      this.cid = row.cid;
      this.isprohibit = row.prohibit;
      this.dialogVisible = true;
    },
    // 改变禁用状态
    changeProhibit() {
      const prohibit = this.isprohibit == 1 ? 0 : 1;
      api
        .setProhibit({
          cid: this.cid,
          prohibit: prohibit
        })
        .then(res => {
          this.$message({
            message: `${prohibit == 1 ? "禁用" : "取禁"}课程成功`,
            type: "success"
          });
          this.getData();
        });
      this.dialogVisible = false;
    },
    async showCourseAdress() {
      await api
        .getCourseEvaluate({
          params: {
            cid: this.cid
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.gridData = res.data.data;
          }
        });
      this.dialogTableVisible = true;
    },
    sign() {
      this.$confirm("确定要报名吗？")
        .then(_ => {
          this.buy = true;
        })
        .catch(_ => {});
    },
    quit() {
      this.showcourselist = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //每页多少条数据  `${val}`
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.n = parseInt(`${val}`);
    },
    //当前页数  parseInt`${val}`
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
.el-table.el-table--fit.el-table--enable-row-hover {
  margin: 0 auto;
  min-height: 550px;
  tbody {
    .el-button--mini {
      &.danger {
      }
      span {
        color: #fff;
      }
    }
  }
}
.course-message {
  margin: 0 auto;
  width: 90%;
  overflow: hidden;
  background-color: rgb(223, 223, 248);
  button.quit {
    width: 100px;
    height: 40px;
    border: none;
    background-color: rgb(26, 201, 26);
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  button.ok,
  button.no {
    float: right;
    width: 100px;
    height: 40px;
    right: 0;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    &.no {
      background-color: darkgray;
    }
  }
  .course-message-content {
    margin-top: 5px;
    & div span,
    & div div span {
      font-size: 20px;
      padding-left: 30px;
      font-weight: bold;
    }
    & div,
    &div div {
      font-size: 20px;
    }
    .top {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
      border-bottom: 1px solid #888;
      background-color: rgb(223, 223, 248);
      font-size: 35px;
    }
    .name,
    .money,
    .adress {
      height: 70px;
    }
    .introduce {
      position: relative;
      height: 200px;
      border-bottom: 1px solid #888;
      div {
        position: absolute;
        width: 500px;
        margin-left: 150px;
      }
    }
  }
  .el-button.el-button--text {
    margin-left: 3%;
    width: 100px;
    height: 40px;
    span {
      color: blue;
      font-size: 20px;
    }
  }
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
