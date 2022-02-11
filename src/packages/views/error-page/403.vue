<template>
  <div :class="$style.main">
    <div :class="$style.bg">
      <img src="https://gitee.com/static/errors/images/403.png" alt="" />
    </div>
    <div :class="$style.text">对不起，您没有访问该页面的权限</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Exception403",
});
</script>

<style lang="less" module>
.main {
  background-color: white;
  .bg {
    width: 600px;
    height: 300px;
    background: url("https://gitee.com/static/errors/images/bg.png") no-repeat
      center;

    img {
      width: 70%;
    }
  }

  .text {
    margin-top: 30px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
