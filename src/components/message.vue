<template>
  <div>
    <!-- <tap :List="message"/> -->
    <div class="message-page">
      <ul>
        <li v-for="(item,index) in currentPage" :key="index" v-on:click="show(index)">
          <span>{{item.title}}</span>
          <span>{{item.ptime}}</span>
        </li>
      </ul>
      <div class="message-show" v-if="showRight">
        <p>{{title}}</p>
        <p>{{time}}</p>
        <p>{{context}} </p>
      </div>
    </div>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="8"
        layout="total, prev, pager, next,jumper"
        :total="arrList.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import tap from "@/components/member/img.vue";
import api from '@/api/index.js'
import { deepClone, formatDate} from '@/utils/deepClone.js'
export default {
  data() {
    return {
      // message:["看过来咯","这里将会有最新的消息哦！"],
      indexshow: null,
      showRight:null,
      //存放所有数据
      title:"",
      time:"",
      context:"",
      arrList: [],
      //每页多少数据
      n: 8,
      //当前页
      m: 1,
      // 默认一开始第几页
      currentPage1:1
    };
  },
  computed: {
    //存放临时数据
    currentPage() {
      return this.arrList.slice(
        (this.m - 1) * this.n,
        (this.m - 1) * this.n + this.n
      )
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      let list;
      api
        .getMessage()
        .then(res => {
          list = res.data.data.list.map(v => {
            v.ptime = formatDate(v.ptime);
            return v;
          });
          this.arrList = list;
        })
        .catch(rej => {
          console.log(rej);
        });
    },
    show(index) {
      this.indexshow = index;
      this.showRight = 1;
      this.title = this.currentPage[index].title;
      this.time = this.currentPage[index].ptime;
      this.context = this.currentPage[index].context;
      console.log(this.indexshow);
    },
    //当前页数  parseInt(`${val}`)
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.m = parseInt(`${val}`);
    }
  },
  components: {
    tap
  }
};
</script>
<style lang="scss">
.message-page {
  width: 80%;
  margin: 0 auto;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  ul {
    float: left;
    width: 40%;
    background: #ccc;
    min-height: 400px;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #888;
      list-style: none;
      cursor: pointer;
      &:hover {
        background: lightslategray;
      }
      span {
        display: inline-block;
        width: 50%;
        height: 100%;
        font-weight: bold;
        line-height: 50px;
        text-align: left;
        text-indent: 2em;
        & + span {
          width: 40%;
          float: right;
          font-weight: 100;
        }
      }
    }
  }
  .message-show {
    float: right;
    width: 60%;
    height: 400px;
    box-sizing: border-box;
    background-color: #fff;
    p {
      box-sizing: border-box;
      &:nth-of-type(1) {
        height: 40px;
        font-size: 25px;
        line-height: 40px;
        font-weight: bolder;
        text-align: center;
      }
      &:nth-of-type(2) {
        margin-top: -12px;
        border-bottom: 1px solid black;
        text-align: end;
      }
      &:nth-of-type(3) {
        font-size: 18px;
        text-indent: 2em;
      }
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
