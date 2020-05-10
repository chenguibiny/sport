<template>
  <div>
    <el-table
      v-loading="tableLoading"
      :data="currentPage"
      style="width: 90%;min-height:600px;"
      v-if="showcourselist"
    >
      <el-table-column
        label="教练"
        width="400"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.coachName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="400"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button>
          <!-- 细节操作 -->
          <template v-if="scope.row.punch == 0">
            <el-button
              size="small"
              type="success"
              @click="clock(scope.$index, scope.row)"
            >评价</el-button>
          </template>
          <template v-else>
            <el-button
              size="small"
              type="info"
              v-if="scope.row.setTime == false"
              @click="appointago(scope.$index, scope.row)"
            >教练未设置</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == false"
              @click="appointsuccess(scope.$index, scope.row)"
            >预约上课</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 2"
              @click="appointfail(scope.$index, scope.row)"
            >预约失败，重新预约</el-button>
            <el-button
              size="small"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 1 && scope.row.clockin == false"
              class="success"
              disabled
            >预约成功</el-button>
            <el-button
              size="small"
              type="success"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 1 && scope.row.clockin == true && scope.row.punch == 0"
              @click="clock(scope.$index, scope.row)"
            >评价</el-button>
            <el-button
              size="small"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true "
              class="success"
              disabled
            >已经预约</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 课程详情 -->
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

    <!-- 评价课程 -->
    <el-dialog
      title="评价课程"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item
          label="评价内容"
          :label-width="formLabelWidth"
        >
          <textarea
            v-model="context"
            autocomplete="off"
            cols="30"
            rows="10"
          ></textarea>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEvaluate"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
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
import api from "@/api/index.js";
import { deepClone, formatDate } from "@/utils/deepClone.js";
import moment from "moment";
export default {
  data() {
    return {
      memberId: 0,
      cid: 0,
      // 切换展示
      showcourselist: true,
      cloneMessage: {},
      flag: false,
      // 课程信息
      tableData: [
        // {
        //   ctime: "1991-01-01",
        //   setTime: false,
        //   appointment: false,
        //   appointok: 0,
        //   clockin: false,
        //   punch: 2,
        //   cid: 1,
        //   cname: "腹肌撕裂者初级",
        //   coachName: "陈桂槟",
        //   location: "肇庆市肇庆学院",
        //   cost: 2030,
        //   description:
        //     "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        //   count: 12,
        //   context: "好评"
        // },
      ],
      n: 8,
      m: 1,
      // 评价内容  为临时数据
      gridData: [
        {
          username: "肖",
          context:
            "教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评！"
        },
        {
          username: "林",
          context: "教练很走心，好评！"
        },
        {
          username: "邱",
          context: "教练很走心，好评！"
        },
        {
          username: "钟",
          context: "教练很走心，好评！"
        }
      ],
      // 课程详情页  放临时数据
      apartList: {
        cname: "腹肌撕裂者初级",
        coachName: "陈桂槟",
        cost: 2030,
        location: "广东省肇庆市端州区黄冈街道肇庆学院主校区",
        description:
          "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        count: 12
      },
      dialogTableVisible: false,
      centerDialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 我对某课程的课程评价
      context: "",
      tableLoading: true
    };
  },
  async created() {
    let memberId;
    await cookie.getCookie("memberId", function(data) {
      memberId = data;
    });
    this.memberId = memberId;
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
      api
        .getMemberCourseList({
          params: {
            sid: this.memberId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            let list = res.data.data.map(v => {
              if (v.setTime === null) {
                v.setTime = 0;
              }
              if (v.appointment === null) {
                v.appointment = 0;
              }
              if (v.appointok === null) {
                v.appointok = 0;
              }
              if (v.clockin === null) {
                v.clockin = 0;
              }
              if (v.prohibit === null) {
                v.prohibit = 0;
              }
              return v;
            });
            this.tableData = list;
            this.tableLoading = false;
          }
        });
    },
    resetForm(form) {
      let cloneForm = deepClone(form);
      cloneForm.ctime = moment(cloneForm.ctime).format("YYYY-MM-DD");
      let {
        tid,
        cid,
        ctime,
        setTime,
        appointment,
        appointok,
        clockin,
        punch
      } = cloneForm;
      api
        .changeTable({
          sid: this.memberId,
          tid,
          cid,
          ctime,
          setTime,
          appointment,
          appointok,
          clockin,
          punch
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "预约成功！",
              type: "success"
            });
            this.getData();
          }
        });
    },
    // 克隆报名信息
    cloneCourseMessage(row) {
      this.cloneMessage = deepClone(row);
    },
    // 查看详情
    handleEdit(index, row) {
      console.log(index, row);
      this.showcourselist = false;
      this.apartList = row;
      this.cid = row.cid;
    },
    // 查看课程评价
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
    // 退出查看详情
    quit() {
      this.showcourselist = true;
    },
    // 预约上课
    appointsuccess(index, row) {
      this.cloneCourseMessage(row);
      this.cid = row.cid;
      this.$confirm("上课时间为" + formatDate(row.ctime))
        .then(_ => {
          this.cloneMessage.appointment = 1;
          this.resetForm(this.cloneMessage);
        })
        .catch(_ => {});
    },
    // 预约失败，再次预约上课
    appointfail(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.cid = row.cid;
      this.$confirm("上课时间为" + formatDate(row.ctime))
        .then(_ => {
          this.cloneMessage.appointment = 1;
          this.cloneMessage.appointok = 0;
          this.resetForm(this.cloneMessage);
        })
        .catch(_ => {});
    },
    // 教练还未设置上课时间
    appointago(index, row) {
      console.log(index, row);
      this.$confirm("教练还未设置上课时间，请等待！")
        .then(_ => {})
        .catch(_ => {});
    },
    // 评价
    async clock(index, row) {
      console.log(index, row);
      await this.cloneCourseMessage(row);
      this.cid = row.cid;
      this.context = row.context;
      this.dialogFormVisible = true;
    },
    // 提交评价
    submitEvaluate() {
      api
        .toEvaluate({
          cid: this.cid,
          sid: this.memberId,
          context: this.context
        })
        .then(res => {
          this.$message({
            message: "评价成功！",
            type: "success"
          });
          this.getData();
        });
      this.dialogFormVisible = false;
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
.el-table.el-table--fit.el-table--enable-row-hover {
  margin: 0 auto;
  min-height: 390px;
  tbody {
    .el-button--mini {
      span {
        color: #fff;
      }
    }
    .el-button--small {
      span {
        color: #fff;
      }
      &.success {
        background-color: #ccc;
      }
    }
    .el-buttom--medium {
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
    right: 0;
    background-color: rgb(26, 201, 26);
    color: #fff;
    font-size: 20px;
    cursor: pointer;
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
