<template>
  <div class="main-page">
    <div class="center-page">
      <div class="slide">
        <el-carousel>
          <el-carousel-item>
            <img src="@/assets/img/xyl.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/img/wty.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/img/blb.jpg" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="img-top img-page">
        <img src="@/assets/img/yl.jpg" alt />
      </div>
      <div class="slide slider-t">
        <el-carousel>
          <el-carousel-item>
            <img src="@/assets/img/man.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/img/girlone.jpg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/img/girltwo.png" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="img-bottom img-page">
        <img src="@/assets/img/pyy.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.main-page {
  position: relative;
  height: 700px;
  .center-page {
    position: absolute;
    width: 90%;
    background-color: #ccc;
    height: 700px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    .slide {
      position: absolute;
      width: 70%;
      height: 250px;
      left: 10px;
      top: 10px;
      &.slider-t {
        top: 270px;
        height: 425px;
        .el-carousel__container {
          position: relative;
          height: 425px;
        }
      }
      .el-carousel {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        border-radius: 10px;
        .el-carousel__indicators {
          display: none;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-page {
      position: absolute;
      width: 27%;
      height: 250px;
      right: 10px;
      top: 10px;
      &.img-bottom {
        top: 270px;
        height: 425px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
