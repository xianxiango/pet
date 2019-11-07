<template>
  <div>
    <div class="public-view">
      <div class="info">
        <div class="title">
          <div class="left">保障信息</div>
        </div>
        <div class="content1">
          <div class="left">
            服务价格：
            <span class="bright">{{info.insurance.price}}元</span>
          </div>
          <div class="right">
            自付额：
            <span class="bright">{{info.insurance.pay_self}}元</span>
          </div>
        </div>
        <div class="content1">
          <div class="left">
            累计保障金额：
            <span class="bright">{{info.insurance.high_pay}}元</span>
          </div>
          <div class="right">
            保障补偿比例：
            <span class="bright">{{info.insurance.scale_pay*100}}%</span>
          </div>
        </div>
        <div
          class="content2"
        >观察期：自{{info.insurance.safegrard_start}}起至{{info.insurance.safegrard_end}}止</div>
        <div class="content2">保障期：自{{info.insurance.wait_start}}起至{{info.insurance.wait_end}}止</div>
      </div>
      <div class="info">
        <div class="title">
          <div class="left">宠物信息</div>
        </div>
        <div class="content1">
          <div class="left">宠物昵称：{{info.pet.pet_name}}</div>
          <div class="right">出生日期：{{info.pet.pet_birthday}}</div>
        </div>
        <div class="content1">
          <div class="left">品种：{{info.pet.pet_type}}</div>
          <div class="right">性别：{{info.pet.pet_sex}}</div>
        </div>
        <div class="content1">
          <div class="left">是否绝育：{{info.pet.pet_sterilization}}</div>
        </div>
        <div class="imgGroup">
          <img :src="info.pet.avatar_url" />
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div class="left">看护人信息</div>
        </div>
        <div class="content1">
          <div class="left">姓名：{{info.petOrderlies.contacter}}</div>
          <div class="right">电话：{{info.petOrderlies.phone}}</div>
        </div>
        <div class="content1">
          <div class="left">所在地区：{{info.petOrderlies.address}}</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="info" style="margin-bottom:0;padding-bottom:.53rem">
        <div class="title">
          <div class="left">缴费方式</div>
        </div>
        <XRadioGroup
          v-model="payType"
          class="radioGroup"
          style="display: flex;margin:.3rem 0 .1rem"
        >
          <!-- <XRadioCircular name="v1" value="1" label="按月缴费" style="margin-right:1.02rem"></XRadioCircular> -->
          <XRadioCircular name="v2" value="2" label="全额缴清"></XRadioCircular>
        </XRadioGroup>
        <div class="content1 pay">
          <div class="left">保费</div>
          <div class="right">¥{{info.payInfo.moneyStr}}</div>
        </div>
        <div class="content1 pay" v-if="info.payInfo.discount!=0">
          <div class="left">优惠</div>
          <div class="right">
            <span class="preferential">{{info.payInfo.discount_name}}</span>
            -¥{{info.payInfo.discount_money}}
          </div>
        </div>
        <div class="content1 pay">
          <div class="left">实付保费</div>
          <div class="right">¥{{info.payInfo.pay}}</div>
        </div>
      </div>
      <div class="confirm" @click="confirmF">
        <img
          :src="isConfirm?'static/images/Rectangled 4@2x.png':'static/images/Rectangle 4@2x.png'"
          alt
        />
        <span>我已同意并阅读</span>
        <span class="bright">《宠保协议》</span>
      </div>
      <div class="next" @click="payOrder">下一步</div>
    </div>
  </div>
</template>

<script>
import XRadioCircular from "@/components/XRadioCircular";
import XRadioGroup from "@/components/XRadioGroup";
import { fetchData, getData } from "@/api";
import { _local } from "@/libs/util";
export default {
  // mixins: [SearchMixin],

  data() {
    return {
      petImg: ["static/images/Oval Copy 2@2x.png", "static/images/Oval@2x.png"],
      isConfirm: true,
      payType: 2,
      info: {},
      wxInfo: {},
      appid: "",
      orderNo: ""
    };
  },
  components: { XRadioCircular, XRadioGroup },
  created() {
    this.wxLogin();
    this.getOrder();
    if (this.$route.query.orderNo) {
      this.orderPay();
    }
  },
  watch: {
    payType() {
      this.payChange();
    }
  },
  methods: {
    wxLogin() {
      getData("api", {
        s: "/hapi/Weixin/getAppid"
      }).then(data => {
        if (data) {
          this.appid = data.appid;
        }
      });
    },
    confirmF() {
      if (this.isConfirm) {
        this.isConfirm = false;
      } else {
        this.isConfirm = true;
      }
    },
    // confirm() {
    //   this.$router.push({ path: "/warranty" });
    // },

    getOrder() {
      getData("api", {
        s: "/hapi/Insurance/preInsurance",
        insurance_id: 1,
        pet_id: this.$route.query.id
      }).then(data => {
        if (data) {
          this.info = data;
        }
      });
    },

    async payOrder() {
      if (this.isConfirm) {
        //

        getData("api", {
          s: "/hapi/Insurance/order",
          insurance_id: 1,
          pet_id: this.$route.query.id,
          pay_id: this.payType
        }).then(data => {
          if (data) {
            if (data.code == -502) {
              // this.$store.commit(
              //   "SET_BACK_LINK",
              //   `/confirmOrder?id=${this.$route.query.id}&orderNo=${data.orderNo}`
              // );
              _local.set(
                "backLink",
                `/confirmOrder?id=${this.$route.query.id}&orderNo=${data.orderNo}`,
                60000
              );
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=http://m.cyongpet.com/payIndex&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
            }
            this.$message.success("添加成功");

            this.wxInfo = data.payment;
            this.orderNo = data.orderNo;
            this.wxPay(this.appid, this.wxInfo);
            // this.orderPay(this.appid, this.wxInfo);
          }
        });
      } else {
        this.$Notification.error("同意并阅读宠保协议才能添加订单");
      }
    },
    orderPay() {
      getData("api", {
        s: "/hapi/Insurance/orderPay",
        orderNo: this.orderNo
      }).then(data => {
        if (data) {
          this.wxInfo = data.payment;
          this.wxPay(this.appid, this.wxInfo);
          // this.$router.push("/warranty");
        }
      });
    },
    wxPay(appid, wxInfo) {
      var _this = this;
      function onBridgeReady() {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: appid, //公众号名称，由商户传入 ok
            timeStamp: wxInfo.timeStamp, //时间戳，自1970年以来的秒数 ok
            nonceStr: wxInfo.nonceStr, //随机串
            package: `prepay_id=${wxInfo.prepay_id}`,
            signType: "MD5", //微信签名方式
            paySign: wxInfo.paySign //微信签名
          },
          function(res) {
            // alert(res.err_msg);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              alert("支付成功！");

              _this.$router.push("/warranty");
              // _this.orderPay();
            } else {
              _this.$router.push("/warranty");
            }
          }
        );
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  color: #222222;
  font-size: 0.24rem;
  margin-bottom: 0.16rem;
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    margin-bottom: 0.09rem;
    border-bottom: 0.01rem solid rgba(240, 240, 240, 1);
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
  }
  .content1 {
    display: flex;
    justify-content: space-between;
    padding-top: 0.24rem;
    &.pay {
      font-size: 0.26rem;
      .left {
        color: #555;
      }
      .right {
        .preferential {
          border-radius: 4px;
          border: 0.01rem solid #ff213c;
          color: #ff213c;
          // width: 1.25rem;
          padding: 0 0.08rem;
          height: 0.32rem;
          line-height: 0.32rem;
          text-align: center;
          font-size: 0.2rem;
        }
      }
    }
    .left,
    .right {
      .bright {
        color: #ff8408;
      }
    }
  }
  .content2 {
    padding-top: 0.24rem;
  }
  .imgGroup {
    padding-top: 0.24rem;
    display: flex;
    img {
      border-radius: 100%;
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.3rem;
    }
  }
}
.confirm {
  height: 0.96rem;
  //   line-height: 0.96rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 0.26rem;
    height: 0.26rem;
    margin-right: 0.1rem;
  }

  .bright {
    color: #ff8408;
  }
}
</style>

