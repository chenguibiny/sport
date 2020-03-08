<template>
  <div>
    <el-table
      :data="currentPage"
      style="width: 90%"
      v-if="showcourselist"
    >
      <el-table-column
        label="教练"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.coachName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cname }}</span>
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
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      class="course-message"
      style="width:90%;"
      v-else
    >
      <button
        class="quit"
        @click="quit"
      >退出</button>
      <button
        class="no"
        v-if="havePaid"
        disabled
      >已经报名</button>
      <button
        class="ok"
        v-else
        @click="sign"
      >我要报名</button>
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
export default {
  data() {
    return {
      memberId: 0,
      cid: 0,
      showcourselist: true,
      // 索引
      index: 0,
      //该会员是否该买了该课程
      havePaid: false,
      // 当前详情的教练的id
      tid: 0,
      myselfform: {},
      obj: {
        cid: 1,
        cname: "背部健美",
        cost: 800,
        coachName: "晓梦",
        location: "xx广场一楼108室",
        description: "啦啦",
        count: "36",
        havePaid: 1
      },
      // 课程信息,放置所有数据
      tableData: [],
      n: 8,
      m: 1,

      // 课程评价内容   放临时数据
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
      dialogTableVisible: false,
      // 课程详情页  放临时数据
      apartList: {
        cname: "腹肌撕裂者初级",
        coachName: "陈桂槟",
        cost: 2030,
        location: "广东省肇庆市端州区黄冈街道肇庆学院主校区",
        description:
          "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        count: 12
      }
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
        .getAllCourseList({
          params: {
            sid: this.memberId
          }
        })
        .then(res => {
          // console.log("pro",res.data.data)
          if (res.data.code === 1) {
            let form = deepClone(res.data.data);
            let newList = form.map (v => {
              if(v.prohibit === null) {
                v.prohibit = 0;
              }
              return v;
            })
            this.tableData = newList.filter( v => {
              if(v.prohibit) {
                return false;
              }
              return true;
            })
            // console.log("tableData",this.tableData);
          }
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.index = index;
      this.tid = row.tid;
      this.showcourselist = false;
      this.apartList = row;
      this.havePaid = row.havePaid === 1 ? true : false;
      this.cid = row.cid;
    },
    showCourseAdress() {
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
    async sign() {
      await api
        .getUserInfo({
          params: {
            sid: this.memberId
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            let form = deepClone(res.data.data);
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
            delete form.password;
            this.myselfform = deepClone(form);
            console.log("myselfform", this.myselfform);
          }
        });
      this.$confirm("确定要报名吗？")
        .then(_ => {
          if (this.myselfform.money >= this.apartList.cost) {
            let count = this.apartList.count;
            api
              .apply({
                tid: this.tid,
                sid: this.memberId,
                cid: this.cid,
                count: count,
                punch: 2
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    message: "报名成功！",
                    type: "success"
                  });
                  this.havePaid = true;
                  let form = deepClone(this.myselfform);
                  form.money = form.money - this.apartList.cost;
                  api.saveUserInfo({
                    sid: this.memberId,
                    birthday: form.birthday,
                    money: form.money,
                    phone: form.phone,
                    sex: form.sex ? (form.sex === "male" ? 1 : 2) : 0,
                    username: form.username
                  });
                  this.getData();
                } else {
                  console.log(res);
                }
              })
              .catch(rej => {
                console.log(rej);
              });
          } else {
            this.$confirm("余额不足以购买该课程，请先充值！")
              .then(_ => {})
              .catch(_ => {});
          }
        })
        .catch(_ => {
          let count = this.apartList.count;
          console.log("count", count);
        });
    },
    quit() {
      this.showcourselist = true;
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
  }
}
.course-message {
  margin: 0 auto;
  width: 90%;
  overflow: hidden;
  background-color: rgb(207, 219, 231);
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
    background-color: rgb(119, 119, 241);
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
