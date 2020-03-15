<template>
  <div>
    <!-- 添加课程 -->
    <div class="btn-release">
      <el-button
        type="text"
        @click="dialogAddFormVisible = true"
      >发布我的新课程</el-button>

      <el-dialog
        title="发布课程"
        :visible.sync="dialogAddFormVisible"
        width="60%"
        top="80px"
        :close-on-click-modal="false"
      >
        <el-form :model="addform">
          <el-form-item
            label="课程名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.cname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="报名费用"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.cost"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上课地址"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.location"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="课程介绍"
            :label-width="formLabelWidth"
          >
            <textarea
              class="msg"
              v-model="addform.description"
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
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addCourse"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 课程列表 -->
    <el-table
      :data="currentPage"
      style="width: 90%; min-height:500px;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="课程名称"
        width="250"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报名人数"
        width="250"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上课地址"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="assess"
            type="info"
            size="small"
            v-show="!scope.row.prohibit"
            @click="showEvaluation(scope.$index, scope.row)"
          >我的课程评价</el-button>
          <el-button
            class="edit"
            type="primary"
            size="small"
            v-show="!scope.row.prohibit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="small"
            type="danger"
            v-show="!scope.row.prohibit"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>

          <el-button
            class="assess"
            size="small"
            v-show="scope.row.prohibit"
            style="color:oldlace;background-color:oldlace;border:none;outline:none;"
          >我的课程评</el-button>
          <el-button
            class="edit"
            size="small"
            v-show="scope.row.prohibit"
            style="color:oldlace;background-color:oldlace;border:none;outline:none;"
          >编辑</el-button>
          <el-button
            size="small"
            type="info"
            disabled
            v-show="scope.row.prohibit"
          >被禁用</el-button>

          <!-- 我的课程评价 -->
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
          <!-- 编辑课程 -->
          <el-dialog
            title="编辑课程"
            :visible.sync="dialogFormVisible"
            width="60%"
            top="80px"
            :close-on-click-modal="false"
          >
            <el-form :model="changeform">
              <el-form-item
                label="课程名称"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="changeform.cname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="报名费用"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="changeform.cost"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="上课地址"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="changeform.location"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="课程介绍"
                :label-width="formLabelWidth"
              >
                <textarea
                  class="msg"
                  v-model="changeform.description"
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
                @click="changeCourseMessage"
              >确 定</el-button>
            </div>
          </el-dialog>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[6, 8, 10, 12]"
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
import { deepClone } from "@/utils/deepClone.js";
export default {
  data() {
    return {
      dialogAddFormVisible: false,
      addform: {
        cname: "",
        cost: "",
        location: "",
        description: ""
      },

      coachId: 0,
      cid: 0,
      index: 0,
      // 编辑信息的show
      dialogFormVisible: false,
      // 编辑课程内容
      changeform: {},
      formLabelWidth: "120px",

      flag: false,
      //存放所有数据
      tableData: [
        {
          cid: 1,
          cname: "腹肌撕裂者初级",
          name: "陈桂槟",
          location: "肇庆市肇庆学院",
          cost: 2030,
          description:
            "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
          count: 12,
          prohibit: 1
        },
        {
          cid: 2,
          cname: "腹肌撕裂者进阶",
          name: "陈",
          location: "肇庆市肇庆学院123",
          cost: 2000,
          description:
            "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
          count: 12,
          prohibit: 0
        },
        {
          cid: 3,
          cname: "哑铃手臂塑形",
          name: "肖",
          location: "上海市普陀区金沙江路343243",
          cost: 21000,
          description: "只要一副小哑铃就可以练出[好看的臂膀]",
          count: 12,
          prohibit: 0
        },
        {
          cid: 4,
          cname: "健身房廋腿训练",
          name: "林",
          location: "上海市普陀区金沙江路132123123",
          cost: 1050,
          description:
            "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
          count: 12,
          prohibit: 1
        },
        {
          cid: 5,
          cname: "腹肌撕裂",
          name: "1234",
          location: "上海市普陀区金沙江路 1516 弄",
          cost: 2030,
          description: "",
          count: 12,
          prohibit: 1
        },
        {
          cid: 6,
          cname: "腹肌撕裂",
          name: "1234",
          location: "上海市普陀区金沙江路 1516 弄",
          cost: 2030,
          description: "",
          count: 12,
          prohibit: 0
        },
        {
          cid: 7,
          cname: "腹肌撕裂",
          name: "1234",
          location: "上海市普陀区金沙江路 1516 弄",
          cost: 2030,
          description: "",
          count: 12,
          prohibit: 0
        },
        {
          cid: 8,
          cname: "腹肌撕裂",
          name: "1234",
          location: "上海市普陀区金沙江路 1516 弄",
          cost: 2030,
          description: "",
          count: 12,
          prohibit: 0
        },
        {
          cid: 9,
          cname: "腹肌撕裂者初级",
          name: "陈桂槟",
          location: "肇庆市肇庆学院",
          cost: 2030,
          description:
            "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
          count: 12,
          prohibit: 0
        },
        {
          cid: 10,
          cname: "腹肌撕裂者进阶",
          name: "陈",
          location: "肇庆市肇庆学院123",
          cost: 2000,
          description:
            "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
          count: 12,
          prohibit: 0
        },
        {
          cid: 11,
          cname: "哑铃手臂塑形",
          name: "肖",
          location: "上海市普陀区金沙江路343243",
          cost: 21000,
          description: "只要一副小哑铃就可以练出[好看的臂膀]",
          count: 12,
          prohibit: 0
        },
        {
          cid: 12,
          cname: "健身房廋腿训练",
          name: "林",
          location: "上海市普陀区金沙江路132123123",
          cost: 1050,
          description:
            "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
          count: 12,
          prohibit: 0
        },
        {
          cid: 13,
          cname: "腹肌撕裂者初级",
          name: "陈桂槟",
          location: "肇庆市肇庆学院",
          cost: 2030,
          description:
            "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
          count: 12,
          prohibit: 0
        },
        {
          cid: 14,
          cname: "腹肌撕裂者进阶",
          name: "陈",
          location: "肇庆市肇庆学院123",
          cost: 2000,
          description:
            "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
          count: 12,
          prohibit: 0
        },
        {
          cid: 15,
          cname: "哑铃手臂塑形",
          name: "肖",
          location: "上海市普陀区金沙江路343243",
          cost: 21000,
          description: "只要一副小哑铃就可以练出[好看的臂膀]",
          count: 12,
          prohibit: 0
        },
        {
          cid: 16,
          cname: "健身房廋腿训练",
          name: "林",
          location: "上海市普陀区金沙江路132123123",
          cost: 1050,
          description:
            "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
          count: 12,
          prohibit: 0
        }
      ],
      //每页多少数据
      n: 8,
      //当前页
      m: 1,
      // 课程评价 为临时数据
      gridData: [
        {
          username: "肖",
          context:
            "教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评"
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
      // 课程评价的show
      dialogTableVisible: false
    };
  },
  async created() {
    let coachId;
    await cookie.getCookie("coachId", function(data) {
      coachId = data;
    });
    this.coachId = coachId;
    console.log("coachId", this.coachId);
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
    listSort() {
      this.tableData.sort((a, b) => {
        return a.prohibit - b.prohibit;
      });
    },
    getData() {
      api
        .getCoachCourseList({
          params: {
            tid: this.coachId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            let list = deepClone(res.data.data);
            console.log("mycourse", list);
            list.map(e => {
              if (e.count === null) {
                e.count = 0;
              }
              if (e.prohibit === null) {
                e.prohibit = 0;
              }
              return e;
            });
            this.tableData = list;
            this.listSort();
          }
        });
    },
    // 表格highlight 显示
    tableRowClassName({ row, rowIndex }) {
      if (row.prohibit) {
        return "warning-row";
      }
      return "";
    },
    addCourse() {
      if (
        this.addform.cname &&
        this.addform.cost &&
        this.addform.location &&
        this.addform.description
      ) {
        this.$confirm("确定添加此课程吗？")
          .then(_ => {
            api
              .saveCourse({
                tid: this.coachId,
                cname: this.addform.cname,
                cost: this.addform.cost,
                location: this.addform.location,
                description: this.addform.description
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    message: "添加成功！",
                    type: "success"
                  });
                  this.getData();
                }
                this.addform.cname = "";
                this.addform.cost = "";
                this.addform.location = "";
                this.addform.description = "";
              });
            this.dialogAddFormVisible = false;
          })
          .catch(_ => {});
      } else {
        this.$alert("请完善所有的信息！", "", {
          confirmButtonText: "确定"
        });
        return;
      }
    },
    // 查看课程评价
    showEvaluation(index, row) {
      console.log(index, row);
      this.index = index;
      this.cid = row.cid;
      api
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
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.cid = row.cid;
      this.changeform = deepClone(row);
      this.dialogFormVisible = true;
    },
    // 确认修改
    changeCourseMessage() {
      let change = deepClone(this.changeform);
      if (
        change.cname &&
        change.cost &&
        change.description &&
        change.location
      ) {
        api
          .saveCourse({
            cid: change.cid,
            cname: change.cname,
            cost: change.cost,
            count: change.count,
            description: change.description,
            location: change.location,
            tid: change.tid
          })
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
            }
            this.getData();
          });
      } else {
        this.$alert("请完善所有的信息！", "", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.dialogFormVisible = false;
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.cid = row.cid;
      this.$confirm("确定要删除吗？")
        .then(_ => {
          api
            .deleteCourse({
              cid: this.cid,
              tid: this.coachId
            })
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.getData();
              } else {
                console.log(res);
              }
            })
            .catch(rej => {
              console.log(rej);
            });
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
.btn-release {
  width: 90%;
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
.el-table.el-table--fit.el-table--enable-row-hover {
  margin: 0 auto;
  min-height: 390px;
}
.block {
  position: relative;
  width: 90%;
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
.el-table .warning-row {
  background: oldlace;
}
</style>
