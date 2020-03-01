<template>
  <div class="wrapper">
    <ul>
      <li >
        <router-link class="msg" :to="{name:'announcement'}">公告信息管理</router-link>
      </li>
      <li>
        <router-link class="msg" :to="{name:'coachingmanagement'}">教练管理</router-link>
      </li>
      <li>
        <router-link class="msg" :to="{name:'membershipmanagement'}">会员管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ["公告信息管理", "教练管理","会员管理"]
    };
  }
};
</script>
<style lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  height: 50px;
  background: #606266;
  ul {
    position: absolute;
    height: 50px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-left: 250px;
    li {
      list-style: none;
      float: left;
      height: 50px;
      padding-right: 30px;
      & + li::before {
        display: inline-block;
        content: "|";
        clear: both;
        color: #fff;
        padding-right: 30px;
        font-size: 25px;
        line-height: 50px;
      }
      .msg {
        color: #fff;
        font-size: 25px;
        line-height: 50px;
        text-decoration: none;
        &.active,&.exact{
          color:aqua;
        }
      }
    }
  }
}
</style>