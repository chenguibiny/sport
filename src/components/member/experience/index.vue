<template>
  <div class="experienceWrap">
    <div
      class="experienceContent"
      v-show="!showDetail"
    >
      <div
        v-for="(item,index) in dataList"
        :key="index"
        class="nameList"
      >
        <h1>{{index+1}}.{{item.title}}</h1>
        <p>{{item.content}}</p>
      </div>
    </div>

    <div v-show="showDetail">
      <el-container>
        <el-main width="542px">
          <el-row class="detailBox">
            <el-col
              :span="17"
              style="padding:40px;height:100%;"
            >
              <el-row>
                <h1 style="text-align:center;">{{dataList.title}}</h1>
              </el-row>
              <el-row>
                <p
                  class="contentBox"
                  v-for="(item,index) in dataListArray"
                  :key="index"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</p>
                <p style="text-align:right; padding-right:20px;">{{dataList.time}}</p>
              </el-row>
            </el-col>
            <el-col
              :span="6"
              style="padding:30px;height:700px; border-left:1px dashed grey;  "
            >
              <p style="font-weight:bold;margin-bottom:35px;">推荐阅读</p>
              <el-row>
                <div
                  v-for="(item,index) in dataList"
                  :key="index"
                  class="titleList"
                  @click.native="reLoad"
                >{{item.title}}</div>
              </el-row>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      dataList: [
        {
          title: "按开发了",
          content:
            "按开发了按开发了按开发了按开发了按开发了按开发了按开发了按开发了按开发了"
        },
        {
          title: "阿卡丽的饭",
          content:
            "阿卡丽的饭阿卡丽的饭阿卡丽的饭阿卡丽的饭阿卡丽的饭阿卡丽的饭阿卡丽的饭阿卡丽的饭"
        },
        {
          title: "留校",
          content:
            "留校留校留校留校留校留校留校留校留校留校留校留校留校留校留校留校"
        },
        {
          title: "拍咯i",
          content: "拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i"
        },
        {
          title: "拍咯i",
          content: "拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i"
        },
        {
          title: "拍咯i",
          content: "拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i"
        },
        {
          title: "拍咯i",
          content: "拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i"
        },
        {
          title: "拍咯i",
          content: "拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i拍咯i"
        }
      ],
      dataListArray:[],
      showDetail: false,
      userKey: ""
    };
  },
  created: function() {
    // this.userKey = this.$route.params.userKey;
    // api.getExperience().then(res => {
    //   if (res.status === 200) {
    //     //  this.dataList = res.data;
    //     [...this.dataList] = res.data;
    //     //  console.log(this.dataList);
    //   }
    // });
  },
  //  updated:function(){
  //    api.getExperience().then(res => {
  //    if(res.status === 200){
  //     //  this.dataList = res.data;
  //      console.log(res.data);
  //      [...this.dataList] = res.data;
  //      console.log(this.dataList)
  //     //  console.log(this.dataList);
  //    }
  //  })
  //  },
  methods: {
    // jump(id) {
    //   api.getDetailExperience({ id: id }).then(res => {});
    // }
  }
};
</script>

<style lang = "scss" scoped>
.experienceWrap {
  margin: 0 auto;
  width: 80%;
  overflow: hidden;
  background-color: #ccc;
  min-height: 490px;
  box-sizing: border-box;
}
.nameList {
  width: 50%;
  box-sizing: border-box;
  float: left;
  border-bottom: 1px dashed grey;
  border-right: 1px dashed grey;
  text-decoration: none;
}
h1 {
  padding-left: 10px;
}
h1:hover {
  color: #00b38a;
}

p {
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
