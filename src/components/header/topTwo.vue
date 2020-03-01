<template>
    <div class="content">
        <div class="msg">
            <button class="btn">修改信息</button>
        </div>
        <router-link class="toLogin" to="/">注销</router-link>
    </div>
</template>
<script>

export default {
    
}
</script>
<style lang="scss">
    .content{
        position: relative;
        width: 100%;
        height: 30px;
        background: #303133;
        .msg{
            position: absolute;
            height: 30px;
            width: 100px;
            right: 80px;
            .btn{
                position: absolute;
                border: none;
                height: 30px;
                line-height: 30px;
                background-color: transparent;
                font-size: 18px;
                color: #fff;
                cursor: pointer;
            }
        }
        .toLogin{
            position: absolute;
            display: block;
            color: #fff;
            height: 30px;
            line-height: 30px;
            text-decoration: none;
            cursor: pointer;
            right: 30px;
        }
    }
</style>