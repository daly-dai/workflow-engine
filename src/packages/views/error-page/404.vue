<template>
  <div :class="$style.main">
    <div :class="$style.bg">
      <img src="https://gitee.com/static/errors/images/404.png" alt="" />
    </div>
    <div :class="$style.text">抱歉，您所访问的页面不存在</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Exception404",
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
