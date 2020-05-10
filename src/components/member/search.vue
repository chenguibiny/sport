<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left"
      >
        <img
          src="@/assets/img/sport.jpg"
          alt
        />
      </el-col>

      <el-col
        :span="15"
        class="searchBar"
      >
        <div class="searchBar-wrapper">
          <!-- v-model @focus @blur @input -->
          <el-input
            v-model="searchWord"
            placeholder="请输入内容"
            @focus="focus"
            @blur="blur"
            @input="input"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="toSearchCourse"
          >搜索</el-button>

          <!-- 输入关键词的展示 -->
          <!-- v-if -->
          <dl
            class="searchList"
            v-if="isSearchList"
          >
            <dd
              class="searchList__item"
              v-for="(item,index) in searchList"
              :key="index"
            >
              <!-- params -->
              <router-link
                class="router"
                :to="{name:'searchCourse',params:{searchWord:item}}"
              >{{item}}</router-link>
              <!-- <a class="router" @click="toSearchCourse">{{item}}</a> -->
            </dd>
          </dl>
        </div>

        <p class="suggest">
          <a
            v-for="(item,index) in suggestList"
            :key="index"
            href="#"
            @click="hotSearch(item)"
          >{{item}}</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import cookie from "@/cookie/cookie.js";
import api from "@/api/index.js";
export default {
  data() {
    return {
      searchWord: "",
      isFocus: false,
      searchList: [],
      suggestList: ["哑铃", "腹肌", "腿部", "胸肌", "手臂"],
      memberId: null
    };
  },
  async created() {
    let memberId;
    await cookie.getCookie("memberId", function(data) {
      memberId = data;
    });
    this.memberId = memberId;
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.searchWord;
    },
    isSearchList() {
      return this.isFocus && this.searchWord;
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      let self = this;
      //延迟触发blur，这样在点击关键字的时候才会跳转，不然先blur了，点击就无效
      setTimeout(function() {
        self.isFocus = false;
      }, 200);
    },
    input() {
      api
        .getAllCourseList({
          params: {
            sid: this.memberId,
            keyword: this.searchWord
          }
        })
        .then(res => {
          let list = res.data.data;
          let searchList = list.map(v => {
            return v.cname;
          });
          // 展示前5条
          this.searchList = searchList.slice(0, 6);
        });
    },
    hotSearch(item) {
      this.$router.push({ name: "searchCourse", params: { searchWord: item } });
    },
    toSearchCourse() {
      this.$router.push({
        name: "searchCourse",
        params: { searchWord: this.searchWord }
      });
    }
  }
};
</script>
<style lang="scss">
.m-header-searchbar {
  padding: 10px 20px;
  background-color: #e9eef3;
  align-items: start;
  box-sizing: border-box;
  border-bottom: black;
  .left {
    width: 280px;
    padding-top: 15px;
    img {
      margin-left: 140px;
      margin-top: -20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .searchBar {
    flex: 1;
    width: auto;
    .searchBar-wrapper {
      margin-top: 16px;
      border: 1px solid #13d1be;
      border-radius: 4px;
      width: 552px;
      box-sizing: border-box;
      position: relative;
      white-space: nowrap;
      .el-input {
        width: 462px;
      }
      input {
        border: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .el-button {
        width: 88px;
        border: none;
        background: cornflowerblue;
        font-size: 16px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        vertical-align: -1px;
        i {
          font-weight: bold;
        }
      }
      .searchList {
        position: absolute;
        top: 41px;
        left: 0;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        width: 462px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        border-top: none;
        z-index: 999;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

        dt {
          color: #999;
          font-weight: bold;
        }

        dd {
          display: inline-block;
          color: #666;
          margin-right: 10px;
          margin-bottom: 3px;
          margin-top: 5px;
          cursor: pointer;

          &:hover {
            background: #f8f8f8;
            color: #31bbac;
          }
        }

        &.searchList {
          padding: 0;
          margin: 0;
          dd {
            margin: 0;
            padding: 3px 10px;
            display: block;
            line-height: 1.6;
          }
        }
      }
    }

    .suggest {
      width: 552px;
      overflow: hidden;
      padding-left: 16px;
      margin-top: 8px;
      height: 16px;
      line-height: 16px;

      a {
        color: black;
        margin-right: 10px;
        margin-bottom: 3px;
        display: inline-block;
        font-size: 12px;
        text-decoration: none;
        &:hover {
          color: #31bbac;
        }
      }
    }
  }
}
.router {
  text-decoration: none;
  color: #666;
  &:hover {
    background: #f8f8f8;
    color: #31bbac;
  }
}
</style>
