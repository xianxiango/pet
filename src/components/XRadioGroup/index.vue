<template>
  <div class="radioGroup">
    <slot></slot>
    <!-- radio组件会插入其中 -->
  </div>
</template>
<script>
export default {
  name: "XRadioGroup",
  provide() {
    return {
      xRadioGroup: this //将组件本身的vue对象传递给下级
      // lala: 1
    };
  },
  props: {
    value: null, //v-model绑定的值
    disabled: Boolean
  },
  created() {
    this.$on("handleChange", value => {
      //监听自身的handleChange事件
      this.$emit("change", value); //触发自身的change事件
    });
  }
};
</script>