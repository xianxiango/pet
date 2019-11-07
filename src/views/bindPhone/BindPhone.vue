<template>
  <keep-alive>
    <div>
      <div class="public-view">
        <div class="info">
          <div class="content1">
            <div class="left">手机</div>
            <div class="right">
              <input type="text" placeholder="请输入手机号码" v-model="phone" />
            </div>
          </div>
          <div class="content1">
            <div class="left">验证码</div>
            <div class="right">
              <input type="text" class="verificationCode" placeholder="请输入验证码" v-model="code" />
              <!-- <span class="verificationButton">请输入验证码</span> -->
              <span
                @click="getLoginCode()"
                class="captchaStyle"
                :class="{'wait':isWait}"
              >{{captcha}}</span>
            </div>
          </div>
        </div>
        <div class="seizeSeat"></div>
        <div class="next" @click="bindPhone">绑定手机</div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import { _local } from "@/libs/util";
import { fetchData, getData } from "@/api";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      captcha: "获取验证码",
      isWait: false,
      count: _local.get("captcha"),
      phone: "",
      code: ""
    };
  },
  created() {
    this.dealCaptcha();
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
  },
  beforeDestroy() {
    if (this.resend) {
      clearInterval(this.resend);
    }
  },
  methods: {
    bindPhone() {
      fetchData("/hapi/Weixin/bindPhone", {
        phone: this.phone,
        code: this.code
      }).then(data => {
        // this.$store.dispatch("setOrdersPetid", id);
        if (data) {
          _local.set("hasPhone", 1, 30 * 1000 * 60 * 60 * 24);
          this.$store.commit("SET_HAS_PHONE", 1);
          this.$router.push("/center");
        }
      });
    },
    getLoginCode() {
      getData("api", {
        s: "/hapi/Sms/getLoginCode",
        phone: this.phone
      }).then(data => {
        this.$Notification.success("验证码发送成功");
        this.getCaptcha();
      });
    },
    getCaptcha() {
      if (_local.get("Scaptcha")) {
        return false;
      } else {
        this.count = 60;
        var _this = this;
        this.resend = setInterval(function() {
          _this.count--;

          if (_this.count > 0) {
            _local.set("Scaptcha", _this.count * 1000, _this.count * 1000);
          } else {
            clearInterval(_this.resend);
          }
        }, 1000);
      }
    },
    dealCaptcha() {
      if (_local.get("Scaptcha")) {
        var _this = this;
        this.count = parseInt(_local.get("Scaptcha") / 1000);
        this.resend = setInterval(function() {
          _this.count--;
          if (_this.count > 0) {
            _local.set("Scaptcha", _this.count * 1000, _this.count * 1000);
          } else {
            clearInterval(_this.resend);
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  padding: 0.6rem 0.3rem 0.3rem;
  display: flex;
  flex-direction: column;
  color: #222222;
  font-size: 0.24rem;

  .content1 {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.01rem solid #f0f0f0;
    height: 1.05rem;
    align-items: center;
    &:last-child {
      border: none;
    }
    .left {
      font-size: 0.28rem;
      color: #333333;
      .bright {
        color: #ff8408;
        font-size: 0.24rem;
        margin-left: 0.2rem;
      }
    }
    .right {
      display: flex;
      align-items: center;

      .rectangle {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
      .tips {
        color: #cccccc;
        &.choose {
          color: #222222;
          font-size: 0.28rem;
        }
      }
      input {
        width: 4.9rem;
        height: 100%;
        border: none;
        outline: none;
        color: #333333;
        font-size: 0.28rem;
      }
      .verificationCode {
        width: 3.2rem;
      }
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
.seizeSeat {
  background: #fff;
  height: 4.67rem;
}
.next {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

