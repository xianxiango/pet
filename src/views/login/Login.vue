<template>
  <div>
    <div class="public-view">
      <div class="login">
        <div class="userImg">
          <img src="static/images/Group 2@2x.png" alt />
        </div>
        <div class="info">
          <div class="infoBox">
            <div class="left">
              <span>手机</span>
            </div>
            <div class="center">
              <input type="text" v-model="phone" placeholder="请输入手机号码" />
            </div>
          </div>
          <div class="infoBox">
            <div class="left">
              <span>验证码</span>
            </div>
            <div class="center">
              <input type="text" v-model="code" placeholder="请输入验证码" />
            </div>
            <div class="right">
              <span
                @click="getLoginCode()"
                class="captchaStyle"
                :class="{'wait':isWait}"
              >{{captcha}}</span>
            </div>
          </div>
        </div>
        <div class="loginBotton">
          <span class="button" @click="login()">登陆</span>
        </div>
        <div class="separator">其他登录方式</div>
        <div class="otherLogin">
          <div class="wc">
            <img src="static/images/Group 4@2x.png" @click="wxLogin()" alt />
            <div class="cont">微信登陆</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _local } from "@/libs/util";
import { getData, fetchData } from "@/api";
export default {
  // mixins: [SearchMixin],

  data() {
    return {
      captcha: "获取验证码",
      isWait: false,
      count: _local.get("captcha"),
      phone: "",
      code: "",
      appid: ""
    };
  },
  methods: {
    wxLogin() {
      getData("api", {
        s: "/hapi/Weixin/getAppid"
      }).then(data => {
        if (data) {
          this.appid = data.appid;
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=http://m.cyongpet.com/wxLogin&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
        }
      });
    },
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
          this.$store.commit("SET_TOKEN", datas["token"]);
          this.$store.commit("SET_USER_ID", datas["user_id"]);

          if (this.$store.state.token) {
            this.$router.push("/");
          } else {
            this.$router.replace("/login");
          }
        }
      });
    },
    login() {
      fetchData("/hapi/User/login", {
        phone: this.phone,
        code: this.code
      }).then(data => {
        if (data) {
          this.$message.success("登录成功");
          let datas = data;
          _local.set("token", datas["token"], 30 * 1000 * 60 * 60 * 24);
          _local.set("user_id", datas["user_id"], 30 * 1000 * 60 * 60 * 24);
          _local.set("hasPhone", 1, 30 * 1000 * 60 * 60 * 24);
          this.$store.commit("SET_TOKEN", datas["token"]);
          this.$store.commit("SET_USER_ID", datas["user_id"]);
          this.$store.commit("SET_HAS_PHONE", 1);

          if (this.$store.state.token) {
            this.$router.push("/");
          } else {
            this.$router.replace("/login");
          }
        }
      });
    },
    getLoginCode() {
      getData("api", {
        s: "/hapi/Sms/getLoginCode",
        phone: this.phone
      }).then(data => {
        if (data) {
          this.$Notification.success("验证码发送成功");
          this.getCaptcha();
        }
      });
    },
    getCaptcha() {
      if (_local.get("captcha")) {
        return false;
      } else {
        this.count = 60;
        var _this = this;
        this.resend = setInterval(function() {
          _this.count--;

          if (_this.count > 0) {
            _local.set("captcha", _this.count * 1000, _this.count * 1000);
          } else {
            clearInterval(_this.resend);
          }
        }, 1000);
      }
    },
    dealCaptcha() {
      if (_local.get("captcha")) {
        var _this = this;
        this.count = parseInt(_local.get("captcha") / 1000);
        this.resend = setInterval(function() {
          _this.count--;
          if (_this.count > 0) {
            _local.set("captcha", _this.count * 1000, _this.count * 1000);
          } else {
            clearInterval(_this.resend);
          }
        }, 1000);
      }
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
  },
  created() {
    if (this.$route.query.code) {
    }
    this.dealCaptcha();
  },
  beforeDestroy() {
    if (this.resend) {
      clearInterval(this.resend);
    }
  },
  watch: {
    count() {
      if (this.count > 0) {
        this.captcha = this.count + "秒后重发";
        this.isWait = true;
      } else {
        this.isWait = false;
        this.captcha = "获取验证码";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: #fff;
  padding: 0 0.3rem;
  .userImg {
    padding: 0.6rem 0 0.7rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
  .info {
    .infoBox {
      display: flex;
      height: 1.16rem;
      border-bottom: 0.01rem solid #f0f0f0;
      .left {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 0.28rem;
        width: 2.04rem !important;
        flex-shrink: 0;
      }
      .center {
        // flex: 1;
        flex-shrink: 1;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          outline: none;
          border: none;
          font-size: 0.28rem;
          color: #333333;
        }
      }
      .right {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        width: 1.7rem;
        .captchaStyle {
          text-align: center;
          font-size: 0.26rem;
          color: #fff;
          line-height: 0.56rem;
          width: 1.7rem;
          height: 0.56rem;
          background: #ff8408;
          border-radius: 2px;
          &.wait {
            background: #cccccc;
          }
        }
      }
    }
  }
  .loginBotton {
    padding: 0.6rem 0;
    .button {
      display: block;
      height: 0.96rem;
      width: 100%;
      background: #ff8408;
      font-size: 0.3rem;
      line-height: 0.96rem;
      text-align: center;
      color: #fff;
      border-radius: 4px;
    }
  }
}
.separator {
  text-align: center;
  position: relative;
  font-size: 0.24rem;
  color: #cccccc;
  &::before {
    content: "";
    width: 2.52rem;
    height: 0.01rem;
    background: #f0f0f0;
    position: absolute;
    left: 0px;
    top: 50%;
  }
  &::after {
    content: "";
    width: 2.52rem;
    height: 0.01rem;
    background: #f0f0f0;
    position: absolute;
    right: 0px;
    top: 50%;
  }
}
.otherLogin {
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .wc {
    display: flex;

    align-items: center;
    flex-direction: column;
    img {
      width: 0.82rem;
      height: 0.82rem;
    }
    .cont {
      margin-top: 0.19rem;
      color: #a1a1a1;
      font-size: 0.24rem;
    }
  }
}
</style>

