<template>
    <div class="img">
        <img src="@/assets/img/show.png" alt="">
        <div class="font" v-for="(item,index) in List" :key="index">{{item}}</div>
    </div>
</template>
<script>
export default {
    props:["List"]
}
</script>
<style lang="scss">
    .img{
        position: relative;
        width: 80%;
        height: 120px;
        margin: 0 auto;
        img{
            width: 100%;
            height:100%;
        }
        .font{
            position:absolute;
            top: 10px;
            left: 0;
            right: 0;
            margin: auto;
            color:#fff;
            font-size: 30px;
            font-weight: bolder;
            text-align: center;
            &+div{
                top: 50px;
            }
        }
    }
</style>