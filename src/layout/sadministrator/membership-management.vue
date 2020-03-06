<template>
  <div>
    <div class="top"></div>
    <el-table :data="currentPage" style="width: 90%;margin:0 auto;">
      <el-table-column label="账号" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="changePass(scope.$index, scope.row)"
            >修改密码</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
import cookie from '@/cookie/cookie.js'
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
       //每页多少数据
      n:8,
      //当前页
      m:1,
      tableData: [
        {
          id:1,
          name:"wangxiaohu",
          password:"11111",
        },
        {
          id:2,
          name:"wangxiaohu",
          password:"1321",
        },
        {
          id:3,
          name:"wangxiaohu",
          password:"1231",
        },
        {
          id:4,
          name:"wangxiaohu",
          password:"1341",
        },
        {
          id:5,
          name:"wangxiaohu",
          password:"2341",
        },
        {
          id:6,
          name:"wangxiaohu",
          password:"151",
        },
        {
          id:7,
          name:"wangxiaohu",
          password:"3221",
        },
        {
          id:8,
          name:"wangxiaohu",
          password:"1312",
        },
        {
          id:9,
          name:"wangxiaohu",
          password:"4124321",
        },
        {
          id:10,
          name:"wangxiaohu",
          password:"34124",
        },
        {
          id:11,
          name:"wangxiaohu",
          password:"41412",
        },
        {
          id:12,
          name:"wangxiaohu",
          password:"123412",
        },
        {
          id:13,
          name:"wangxiaohu",
          password:"13421",
        },
        {
          id:14,
          name:"wangxiaohu",
          password:"354234",
        },
        {
          id:15,
          name:"wangxiaohu",
          password:"3464",
        }
      ]
    };
  },
  computed:{
    currentPage(){
      return this.tableData.slice((this.m-1)*this.n,(this.m-1)*this.n + this.n);
    }
  },
  methods: {
    changePass(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
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
}
</script>
<style lang="scss">
  .top{
    margin:0 auto;
    width:90%;
    height:10px;
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
