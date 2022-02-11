<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    /**
     * @description 自定义前缀
     */
    prefix: {
      type: String,
      default: "icon",
    },
    /**
     * @description icon的文件名称
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * @description 填充的颜色
     */
    color: {
      type: String,
      default: "#333",
    },
    /**
     * @description svg的大小
     */
    size: {
      type: Number,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    return { symbolId };
  },
});
</script>
