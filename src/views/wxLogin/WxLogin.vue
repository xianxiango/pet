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
        s: "/hapi/Weixin/wxLogin",
        code: this.$route.query.code,
        state: this.$route.query.state
      }).then(data => {
        if (data) {
          this.$message.success("登录成功");
          let datas = data;
          _local.set("token", datas["token"], 30 * 1000 * 60 * 60 * 24);
          _local.set("user_id", datas["user_id"], 30 * 1000 * 60 * 60 * 24);
          _local.set("hasPhone", datas["hasPhone"], 30 * 1000 * 60 * 60 * 24);
          this.$store.commit("SET_TOKEN", datas["token"]);
          this.$store.commit("SET_USER_ID", datas["user_id"]);
          this.$store.commit("SET_HAS_PHONE", datas["hasPhone"]);

          if (this.$store.state.token) {
            this.$router.push("/center");
          } else {
            this.$router.replace("/login");
          }
        }
      });
    }
  },
  created() {
    if (this.$route.query.code) {
      this.wxCode();
    }
  },
  watch: {
    "$route.query.code": function() {
      this.code = this.$route.query.code;
      this.state = this.$route.query.state;
    }
  }
};
</script>

<style lang="less" scoped>
</style>

