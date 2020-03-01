<template>
  <div>
    <el-table :data="currentPage" style="width: 80%" v-if="showcourselist">
      <el-table-column label="教练" width="400">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="400">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.content.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
          <!-- 细节操作 -->
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
            v-else-if="scope.row.setTime == true && scope.row.appointment == true && scope.row.appointok == 1 && scope.row.clockin == true"
            @click="clock(scope.$index, scope.row)"
          >评价</el-button>
          <el-button
            size="small"
            v-else-if="scope.row.setTime == true && scope.row.appointment == true "
            class="success"
            disabled
          >已经预约</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 课程详情 -->
    <div class="course-message" v-else>
      <button class="quit" @click="quit">退出</button>
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

      <el-button type="text" @click="showCourseAdress">课程评价</el-button>

      <el-dialog title="课程评价" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
        <el-table :data="gridData">
          <el-table-column property="date" label="评价人" width="150"></el-table-column>
          <el-table-column property="name" label="评价"></el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <!-- 评价课程 -->
    <el-dialog title="评价课程" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form >
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <textarea v-model="evaluate" autocomplete="off" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEvaluate">确 定</el-button>
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
import cookie from '@/cookie/cookie.js'
export default {
  data() {
    return {
      memberId:0,
      cid:0,
      index:0,
      // 切换展示
      showcourselist: true,

      flag: false,
      // 课程信息
      tableData: [
        // 教练未设置
        {
          time: "1991-01-01",
          setTime: false,
          appointment: false,
          appointok: 0,
          clockin: false,
          content: {
            cid:1,
            title: "腹肌撕裂者初级",
            name: "陈桂槟",
            address: "肇庆市肇庆学院",
            money: 2030,
            context:
              "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
            selectNum: 12,
            evaluate:"好评"
          }
        },
        // 预约上课
        {
          time: "1991-01-01",
          setTime: true,
          appointment: false,
          appointok: 0,
          clockin: false,
          content: {
            cid:2,
            title: "腹肌撕裂者进阶",
            name: "陈",
            address: "肇庆市肇庆学院123",
            money: 2000,
            context:
              "全球[最流行]的腹部动作，全方位打造腹肌线条！建议隔天练习，坚持2-4周后腹肌会越发清晰。",
            selectNum: 12,
            evaluate:"好评"
          }
        },
        // 已经预约 bug
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 0,
          clockin: false,
          content: {
            cid:3,
            title: "哑铃手臂塑形",
            name: "肖",
            address: "上海市普陀区金沙江路343243",
            money: 21000,
            context: "只要一副小哑铃就可以练出[好看的臂膀]",
            selectNum: 12,
            evaluate:"好评"
          }
        },
        // 预约失败
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 2,
          clockin: false,
          content: {
            cid:4,
            title: "健身房廋腿训练",
            name: "林",
            address: "上海市普陀区金沙江路132123123",
            money: 1050,
            context:
              "学生党的[廋腿]秘籍！动作简单有效，在床上也能轻松练习，帮你快速打造修长双腿！",
            selectNum: 12,
            evaluate:"好评"
          }
        },
        // 预约成功
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 1,
          clockin: false,
          content: {
            cid:5,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12,
            evaluate:"好评"
          }
        },
        // 评价
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 1,
          clockin: true,
          content: {
            cid:6,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12,
            evaluate:"好评,赶紧报名吧！"
          }
        },
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 1,
          clockin: true,
          content: {
            cid:7,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12,
            evaluate:""
          }
        },
        {
          time: "1991-01-01",
          setTime: true,
          appointment: true,
          appointok: 1,
          clockin: true,
          content: {
            cid:8,
            title: "腹肌撕裂",
            name: "1234",
            address: "上海市普陀区金沙江路 1516 弄",
            money: 2030,
            context: "",
            selectNum: 12,
            evaluate:"好评，教练很帅"
          }
        }
      ],
      n:8,
      m:1,
      // 评价内容  为临时数据
      gridData: [
        {
          date: "肖",
          name:
            "教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评教练很走心，好评！"
        },
        {
          date: "林",
          name: "教练很走心，好评！"
        },
        {
          date: "邱",
          name: "教练很走心，好评！"
        },
        {
          date: "钟",
          name: "教练很走心，好评！"
        }
      ],
      // 课程详情页  放临时数据
      apartList: {
        title: "腹肌撕裂者初级",
        name: "陈桂槟",
        money: 2030,
        address: "广东省肇庆市端州区黄冈街道肇庆学院主校区",
        context:
          "全球流行的腹部动作，锻炼你的腹肌。建议每周练习3-5次，训练中出现气喘和腹部[撕裂]、[酸胀]感属于正常现象，坚持2-4周后腹肌感觉会逐渐减弱，可进入进阶课程。",
        selectNum: 12
      },
      dialogTableVisible: false,
      centerDialogVisible: false,
      dialogFormVisible:false,
      formLabelWidth: '120px',
      evaluate:""
    };
  },
  async created(){
    let memberId;
    await cookie.getCookie("memberId", function (data) {
      memberId = data;
    })
    this.memberId = memberId;
    // this.getData();
  },
  computed:{
    currentPage(){
      return this.tableData.slice((this.m-1)*this.n,(this.m-1)*this.n + this.n);
    }
  },
  methods: {
    getData(){
      // 根据this.memberId 获取数据赋值给this.tableData
    },
    // 查看详情
    handleEdit(index, row) {
      console.log(index, row);
      this.showcourselist = false;
      this.apartList = row.content;
      this.cid = row.content.cid;
      this.index = index;
    },
    // 查看课程评价
    showCourseAdress(){
      this.dialogTableVisible = true;
       // 根据this.cid获取课程评价 赋值给this.girdData
    },
    // 退出查看详情
    quit() {
      this.showcourselist = true;
    },
    // 预约上课
    appointsuccess(index, row) {
      console.log(index, row);
      this.cid = row.content.cid;
      this.$confirm("上课时间为" + row.time)
        .then(_ => {
          row.appointment = true;
          // cid，memberid ,object 请求接口
        })
        .catch(_ => {});
    },
    // 预约失败，再次预约上课
    appointfail(index, row) {
      console.log(index, row);
      this.cid = row.content.cid;
      this.$confirm("上课时间为" + row.time)
        .then(_ => {
          row.appointment = true;
          row.appointok = 0;
          // cid，memberid ,object 请求接口
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
    clock(index, row) {
      console.log(index, row);
      this.cid = row.content.cid;
      this.evaluate = row.content.evaluate;
      this.dialogFormVisible = true;
    },
    submitEvaluate(){
      // this.evaluate,this.cid,this.memberId 请求接口
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
  width: 80%;
  overflow: hidden;
  background-color: #ccc;
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
