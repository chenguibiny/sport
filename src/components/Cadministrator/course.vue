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
          <span style="margin-left: 10px">{{ scope.row.content.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="250"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报名费用"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content.money }}</span>
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
            type="danger"
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
        <div class="top">{{apartList.title}}</div>
        <div class="name">
          <span>教练：</span>
          {{apartList.name}}
        </div>
        <div class="money">
          <span>报名费用：</span>
          {{apartList.money}}
        </div>
        <div class="adress">
          <span>上课地址：</span>
          {{apartList.address}}
        </div>
        <div class="adress">
          <span>报名人数：</span>
          {{apartList.selectNum}}
        </div>
        <div class="introduce">
          <span>课程介绍：</span>
          <div>{{apartList.context}}</div>
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
            property="name"
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
      cid: 0,
      showcourselist: true,
      buy: false,
      // 课程信息,放置所有数据
      tableData: [
        {
          content: {
            cid: 1,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 2,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 3,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 4,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 5,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 6,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 7,
            title: "腹肌撕裂者进阶",
            name: "陈",
            address: "肇庆市肇庆学院123",
            money: 2000,
            context:
              "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 8,
            title: "哑铃手臂塑形",
            name: "肖",
            address: "上海市普陀区金沙江路343243",
            money: 21000,
            context: "只要一副小哑铃就可以练出[好看的臂膀]",
            selectNum: 12
          },
          prohibit: false
        },
        {
          content: {
            cid: 9,
            title: "健身房廋腿训练",
            name: "林",
            address: "上海市普陀区金沙江路132123123",
            money: 1050,
            context:
              "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 10,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 11,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 12,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12
          },
          prohibit: true
        },
        {
          content: {
            cid: 13,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12
          },
          prohibit: true
        }
      ],
      n: 10,
      m: 1,

      // 课程评价内容   放临时数据
      gridData: [
        {
          name: "肖",
          context:
            "教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评！"
        },
        {
          name: "林",
          context: "教练很走心，好评！"
        },
        {
          name: "邱",
          context: "教练很走心，好评！"
        },
        {
          name: "钟",
          context: "教练很走心，好评！"
        }
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
      // api.getAllCourse().then(res => {
      //   console.log(res);
      // });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.cid = row.content.cid;
      this.showcourselist = false;
      this.apartList = row.content;
      this.buy = row.flag;
    },
    prohibit(index, row) {
      this.cid = row.content.cid;
      this.isprohibit = row.prohibit;
      // row.prohibit = !row.prohibit;
      this.dialogVisible = true;
    },
    changeProhibit() {
      this.dialogVisible = false;
    },
    showCourseAdress() {
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
  background-color: #ccc;
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
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
      border-bottom: 1px solid #888;
      background-color: #ccc;
      font-size: 35px;
      font-weight: bolder;
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
