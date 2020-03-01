<template>
  <div class="wrapper">
    <ul>
      <li>
        <router-link class="msg" :to="{name:'carousel'}">主页</router-link>
      </li>
      <li>
        <router-link class="msg" :to="{name:'coursemanagement'}">课程管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        &.active,
        &.exact {
          color: aqua;
        }
      }
    }
  }
}
</style>
