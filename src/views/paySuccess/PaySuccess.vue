
<template>
  <div>
    <div class="paySuccess">
      <div class="paySuccess_img">
        <img src="static/images/gou.png" alt />
      </div>
      <div class="paySuccess_tips">支付成功</div>
      <div class="paySuccess_button">
        <span @click="goto()">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api";
export default {
  // mixins: [SearchMixin],
  data() {
    return {};
  },
  // created() {
  //   this.getList();
  // },
  components: {},
  methods: {
    goto() {
      this.$router.push({ path: "/warranty" });
    }
  },
  beforeCreate() {
    document.getElementsByTagName("body")[0].className = "add_bg";
  },
  beforeMount() {
    document.getElementsByTagName("body")[0].className = "add_bg";
  },
  beforeDestroy() {
    document.body.removeAttribute("class");
  },
  destroy() {
    document.body.removeAttribute("class");
  },
  mounted: function() {
    document.getElementsByTagName("body")[0].className = "add_bg";
  }
};
</script>

<style lang="less" scoped>
.paySuccess {
  margin-top: 2rem;
  .paySuccess_img {
    margin: 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .paySuccess_tips {
    text-align: center;
    color: #333333;
    font-size: 0.38rem;
    font-family: "PingFangSC-Medium";
    margin: 0.3rem 0.6rem;
  }
  .paySuccess_button {
    text-align: center;
    span {
      display: inline-block;
      border-radius: 4px;
      width: 4rem;
      height: 0.88rem;
      background: #ff8408;
      color: #ffffff;
      font-size: 0.32rem;
      line-height: 0.88rem;
    }
  }
}
</style>

