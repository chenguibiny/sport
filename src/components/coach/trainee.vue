<template>
  <div>
    <el-table
      class="traineelist"
      :data="currentPage"
      style="width: 90%; min-height:550px;"
    >
      <el-table-column
        label="课程名称"
        width="280"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="学员"
        width="280"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上课时间"
        width="280"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ctime === "Invalid date" ? "--" : scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="message"
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >学员信息</el-button>
          <!-- 细节操作 -->
          <template v-if="scope.row.punch == 0">
            <el-button
              size="small"
              type="info"
              disabled
            >打卡结束</el-button>
          </template>
          <template v-else>
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.setTime == false"
              @click="setTimeFirst(scope.$index, scope.row)"
            >设置上课时间</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == false"
              @click="setTimeAgain(scope.$index, scope.row)"
            >设置上课时间</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 2"
              @click="setTimeAgainAgain(scope.$index, scope.row)"
            >重设上课时间</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 1 && scope.row.clockin == false"
              @click="toClock(scope.$index, scope.row)"
            >打卡</el-button>
            <el-button
              size="small"
              type="info"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 1 && scope.row.clockin == true && scope.row.punch == 0"
              disabled
            >打卡成功</el-button>
            <el-button
              size="small"
              type="danger"
              v-else-if="scope.row.setTime == true && scope.row.appointment == true "
              @click="appointment(scope.$index, scope.row)"
            >新的预约</el-button>
          </template>

          <!-- 学员信息 -->
          <el-dialog
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
          >
            <el-form :model="form">
              <el-form-item
                label="姓名"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.username"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.sex"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="电话"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.phone"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="生日"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.birthday"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button
                type="primary"
                @click="dialogFormVisible = false"
              >确 定</el-button>
            </div>
          </el-dialog>
          <!-- 设置上课时间 -->
          <el-dialog
            title="设置上课时间"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            :close-on-click-modal="false"
          >
            <div class="block">
              <p>剩余上课次数：{{punch}}</p>
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="ok()"
              >确 定</el-button>
            </span>
          </el-dialog>
          <!-- 确认 、 拒绝预约 -->
          <el-dialog
            title="预约课程"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
          >
            <span>预约时间为{{time}}<br />确认学员的预约上课吗？</span>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <!-- 拒绝或者确定之后如何传递值 -->
              <el-button @click="refuse">拒绝</el-button>
              <el-button
                type="primary"
                @click="agree"
              >确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>

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
import { deepClone, formatDate } from "@/utils/deepClone.js";
import api from "@/api/index.js";
import moment from "moment";
export default {
  data() {
    return {
      coachId: 0,
      cid: 0,
      sid: 0,
      // 学员预约的上课时间
      time: "",
      // 保存当前操作课程的报名信息
      cloneMessage: {},
      //列表信息
      tableData: [
        // {
        //   sid: 1,
        //   username: "陈桂槟",
        //   sex: "男",
        //   phone: "15218968678",
        //   birthday: "1998-01-23",
        //   cid: 1,
        //   title: "手臂爆炸训练",
        //   ctime: "2020-01-01",
        //   setTime: false,
        //   appointment: false,
        //   appointok: 0,
        //   clockin: false,
        //   punch: 1
        // },
      ],

      //每页多少数据
      n: 8,
      //当前页
      m: 1,
      //学员信息 show
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      //设置的日期
      date: "",
      //上课时间 show
      centerDialogVisible: false,
      // 确认预约 show
      dialogVisible: false,
      punch: 0
    };
  },
  async created() {
    let coachId;
    await cookie.getCookie("coachId", function(data) {
      coachId = data;
    });
    this.coachId = coachId;
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
        .getTraineeList({
          params: {
            tid: this.coachId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            let list = deepClone(res.data.data);
            let newList = list.map(v => {
              v.birthday = formatDate(v.birthday);
              v.ctime = moment(v.ctime).format("YYYY-MM-DD");
              if (v.sex === 1) {
                v.sex = "男";
              } else if (v.sex === 2) {
                v.sex = "女";
              } else {
                v.sex = "未知";
              }
              if (v.setTime === null || v.setTime === false) {
                v.setTime = 0;
              } else if (v.setTime === true) {
                v.setTime = 1;
              }
              if (v.appointment === null || v.appointment === false) {
                v.appointment = 0;
              } else if (v.appointment === true) {
                v.appointment = 1;
              }
              if (v.appointok === null || v.appointok === false) {
                v.appointok = 0;
              } else if (v.appointok === true) {
                v.appointok = 1;
              }
              if (v.clockin === null || v.clockin === false) {
                v.clockin = 0;
              } else if (v.clockin === true) {
                v.clockin = 1;
              }
              if (v.prohibit === null || v.prohibit === false) {
                v.prohibit = 0;
              }
              return v;
            });
            this.tableData = newList;
          }
        });
    },
    resetTable(form) {
      console.log("resetTable", form);
      let {
        sid,
        cid,
        ctime,
        setTime,
        appointment,
        appointok,
        clockin,
        punch
      } = form;
      api
        .changeTable({
          sid,
          tid: this.coachId,
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
              message: "成功！",
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
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 第一次设置时间
    setTimeFirst(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.punch = row.punch;
      this.sid = row.sid;
      this.cid = row.cid;
      this.centerDialogVisible = true;
      this.date = moment().format("YYYY-MM-DD");
    },
    // 重复设置时间
    setTimeAgain(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.punch = row.punch;
      this.sid = row.sid;
      this.cid = row.cid;
      this.centerDialogVisible = true;
      this.date = moment().format("YYYY-MM-DD");
    },
    // 再次设置时间
    setTimeAgainAgain(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.punch = row.punch;
      this.sid = row.sid;
      this.cid = row.cid;
      this.centerDialogVisible = true;
      this.date = moment().format("YYYY-MM-DD");
    },
    // 确认设置上课时间
    async ok() {
      let today = moment().format("YYYY-MM-DD");
      if (new Date(today) > new Date(this.date)) {
        this.$alert("上课时间不能设置今天之前的日期！", "", {
          confirmButtonText: "确定"
        });
      } else {
        this.cloneMessage.ctime = this.date;
        this.cloneMessage.setTime = 1;
        await this.resetTable(this.cloneMessage);
        this.centerDialogVisible = false;
      }
    },
    toClock(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.sid = row.sid;
      this.cid = row.cid;
      this.$confirm("剩余打卡次数：" + row.punch + ",确定打卡此课程吗")
        .then(_ => {
          if (this.cloneMessage.punch == 1) {
            // 打卡之后显示打卡结束
            this.cloneMessage.punch -= 1;
            this.cloneMessage.clockin = 1;
            this.resetTable(this.cloneMessage);
          } else {
            // 打卡之后显示设置上课时间
            this.cloneMessage.punch -= 1;
            this.cloneMessage.setTime = 0;
            this.cloneMessage.appointment = 0;
            this.cloneMessage.appointok = 0;
            this.cloneMessage.clockin = 0;
            this.cloneMessage.ctime = null;
            this.resetTable(this.cloneMessage);
          }
        })
        .catch(_ => {});
    },
    // 新的预约
    appointment(index, row) {
      console.log(index, row);
      this.cloneCourseMessage(row);
      this.sid = row.sid;
      this.cid = row.cid;
      this.time = row.ctime;
      this.dialogVisible = true;
    },
    // 拒绝预约
    async refuse() {
      this.cloneMessage.ctime = this.time;
      this.cloneMessage.appointok = 2;
      await this.resetTable(this.cloneMessage);
      this.dialogVisible = false;
    },
    // 同意预约
    async agree() {
      this.cloneMessage.ctime = this.time;
      this.cloneMessage.appointok = 1;
      this.cloneMessage.clockin = 0;
      await this.resetTable(this.cloneMessage);
      this.dialogVisible = false;
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
<style type="text/scss" lang="scss" scoped>
.traineelist {
  margin: 0 auto;
  min-height: 390px;
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
