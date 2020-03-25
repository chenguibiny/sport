<template>
  <div>
    <tap :List="attention" />
    <div class="attention-page">
      <el-collapse accordion>
        <el-collapse-item
          title="关于卫生"
          name="1"
        >
          <div>不要用抓过器材的手擦汗；</div>
          <div>健身器材细菌过多，皮肤可能会过敏或者起痘，尤其是脸部以及颈部；</div>
          <div>带一条毛巾用来擦汗或者垫器材，注意卫生。</div>
        </el-collapse-item>
        <el-collapse-item
          title="关于饮食"
          name="2"
        >
          <div>不节食或者暴饮暴食；</div>
          <div>如果你只是为了保持健康的状态，请按时适量进食。增肌和塑形的伙伴们需要足够的营养帮助肌肉恢复和增长，不然辛苦的训练换不来等价的回报。</div>
          <div>同时，不要指望大强度的训练能够在短时间帮助你抵消一顿没有节制的晚餐，那只会让你的训练失去应由的价值。</div>
        </el-collapse-item>
        <el-collapse-item
          title="安全问题"
          name="3"
        >
          <div>力量训练注意规范性以及避免受伤</div>
          <div>动作不规范可以导致训练效果不佳，甚至无效果，或者更糟糕的非常难以逆转的肌肉形状扭曲。</div>
        </el-collapse-item>
        <el-collapse-item
          title="希望你能坚持下去"
          name="4"
        >
          <div>坚持绝对是最重要的；</div>
          <div>根据自己的工作娱乐等每天安排出固定时间，然后按照这个计划去锻炼。</div>
          <div>其次不贪功冒进，急于求成，避免受伤或坚持不下来，运动量慢慢加不是问题，只要能坚持就行。</div>
        </el-collapse-item>
        <el-collapse-item
          title="训练之后的拉伸必不可少！"
          name="5"
        >
          <div>力量训练之后，肌肉会充血，拉伸可以提高血液循环；</div>
          <div>健身之后肌肉里面会有部分乳酸堆积，训练后适当拉伸可以让身体加速排出乳酸；</div>
          <div>提高肌肉功能，拉伸能增加肌肉活动范围，增强身体的协调性和适应性。</div>
        </el-collapse-item>
        <el-collapse-item
          title="不抽烟"
          name="6"
        >
          <div>抽烟导致血管收缩，导致肌肉得不到血液中的营养物质的输送，氧气、蛋白质、水分等的缺失，即使你训练再刻苦，没有这些营养的补充，肌肉也难以生长。</div>
          <div>影响呼吸，烟中的焦油会直接覆盖甚至破坏肺泡，导致吸进去的氧气减少，导致细胞发布不完全，造成肌肉萎缩。</div>
        </el-collapse-item>
        <el-collapse-item
          title="不喝酒"
          name="7"
        >
          <div>酒后健身会进一步加重心肌负担，对心脏产生危害；</div>
          <div>酒精会促使肌肉产生疲劳松弛和肌张力下降，肌肉产生大量乳酸，引起四肢酸痛严重。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import tap from "@/components/member/img.vue";
import cookie from "@/cookie/cookie.js";
export default {
  beforeRouteEnter(to, from, next) {
    cookie.getCookie("memberId", function(data) {
      if (data !== "undefined") {
        to.matched[0].meta.login = true;
        next();
        return;
      } else {
        const answer = confirm(
          "你还没有登陆，要登陆后才能浏览信息，确定登陆吗？"
        );
        if (answer) {
          next("/");
        } else {
          next("/");
        }
      }
    });
  },
  data() {
    return {
      attention: ["关注以下事项", "让你健身少走弯路！"]
    };
  },
  components: {
    tap
  }
};
</script>
<style lang="scss">
.attention-page {
  width: 90%;
  min-height: 400px;
  margin: 0 auto;
  background-color: #fff;
  .el-collapse {
    height: 100%;
    .el-collapse-item {
      .el-collapse-item__header {
        font-size: 18px;
        font-weight: bolder;
      }
      .el-collapse-item__wrap {
        .el-collapse-item__content {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
