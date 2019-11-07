<template>
  <div></div>
</template>

<script>
import { _local } from "@/libs/util";
import { getData, fetchDaßta } from "@/api";
export default {
  // mixins: [SearchMixin],

  data() {
    return {
      code: "",
      state: ""
    };
  },
  methods: {
    wxCode() {
      getData("api", {
        s: "/hapi/Weixin/bindWxInfo",
        code: this.$route.query.code,
        state: this.$route.query.state
      }).then(data => {
        if (data) {
          // this.$route.query.id
          // this.$route.query.from
          console.log(data);
          // switch (this.$route.query.from) {
          //   case "confirmOrder":
          //     this.$router.push(
          //       `/confirmOrder?id=${this.$route.query.id}&orderNo=${this.$route.query.orderNo}`
          //     );
          //     break;
          //   case "policyDetails":
          //     this.$router.push(
          //       `/policyDetails?&no=${this.$route.query.no}&empower=1`
          //     );
          //     break;

          //   default:
          //     this.$router.push(`/home`);
          //     break;
          // }
          console.log(_local.get("backLink"));
          this.$router.push(_local.get("backLink"));
        }
      });
    }
  },
  watch: {
    "$route.query.code": function() {
      this.code = this.$route.query.code;
      this.state = this.$route.query.state;
    }
  },
  created() {
    if (this.$route.query.code) {
      this.wxCode();
    }
  }
};
</script>

<style lang="less" scoped>
</style>

