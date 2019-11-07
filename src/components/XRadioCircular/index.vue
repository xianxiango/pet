<template>
  <label class="XRadio">
    <input
      class="XRadioInput"
      type="radio"
      v-model="model"
      :name="name"
      :value="value"
      :disabled="_disabled"
      @change="handleChange"
    />
    <span :class="model==value?'XRadioButtonActive':'XRadioButton'">✔</span>
    <span class="label">{{label}}</span>

    <!-- <slot></slot> -->
    <!-- <template v-if="!$slots.default">{{label}}</template> -->
  </label>
</template>
<script>
export default {
  name: "XRadioCircular",
  inject: {
    //获得从祖先组件定义的xRadioGroup
    xRadioGroup: {
      default: "" //默认为''
    }
    // lala: {
    //   default: "" //默认为''
    // }
  },
  props: {
    name: String,
    disabled: Boolean,
    label: [String, Number, Boolean],
    value: null //v-model绑定的值
    //size: String
  },
  computed: {
    isGroup() {
      // console.log(this.xRadioGroup);
      return this.xRadioGroup !== ""; //是否包含与radio-group中
    },
    model: {
      get() {
        //获取时触发
        return this.isGroup ? this.xRadioGroup.value : this.value; //实现了在group和radio上都可以绑定v-model
      },
      set(val) {
        //赋值时触发
        this.isGroup
          ? this.xRadioGroup.$emit("input", val) //通过input完成双向绑定
          : this.$emit("input", val);
      }
    },
    _disabled() {
      return this.isGroup ? this.xRadioGroup.disabled : this.disable;
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup && this.xRadioGroup.$emit("handleChange", this.model); //如xRadioGroup存在，触发其handleChange事件
      });
    }
  }
};
</script>
<style lang="less" scoped>
.XRadio {
  display: flex;
}
.XRadioInput {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
}
.label {
  line-height: 0.34rem;
  font-size: 0.28rem;
  margin-left: 0.1rem;
}
.XRadioButtonActive {
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 100%;
  background: #ff8408;
  font-size: 0.17rem;
  line-height: 0.34rem;
  color: #fff;
  text-align: center;
  border: 0.01rem solid #ff8408;
}
.XRadioButton {
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 100%;
  background: #fff;
  font-size: 0.17rem;
  line-height: 0.34rem;
  color: #fff;
  text-align: center;
  border: 0.01rem solid #cccccc;
}
</style>