<template>
  <div>
    <div class="public-view">
      <div class="info">
        <div class="title">
          <div class="left">{{info.statusText}}</div>
          <div class="right">
            <span class="captchaStyle" v-if="info.status==0" @click="orderPay()">支付</span>
          </div>
        </div>
        <div class="content">
          <div class="left">订单服务ID</div>
          <div class="right">{{info.insurance_order_no}}</div>
        </div>
        <div class="content">
          <div class="left">支付价格</div>
          <div class="right">{{info.money_total}}元</div>
        </div>
        <div class="content">
          <div class="left">保障治疗金额度</div>
          <div class="right">{{info.all_pay}}元/{{info.security_date}}</div>
        </div>
        <div class="content">
          <div class="left">自付额度及保障比例</div>
          <div class="right">{{info.pay_self}}元 {{info.scale_pay*100}}%</div>
        </div>
        <div class="content">
          <div class="left">宠物姓名</div>
          <div class="right">{{info.pet_name}}</div>
        </div>
        <div class="content">
          <div class="left">性别</div>
          <div class="right">{{info.pet_sex}}</div>
        </div>
        <div class="content">
          <div class="left">绝育</div>
          <div class="right">{{info.pet_sterilization}}</div>
        </div>
        <div class="content">
          <div class="left">出生日期</div>
          <div class="right">{{info.pet_birthday}}</div>
        </div>
        <div class="content">
          <div class="left">主人姓名</div>
          <div class="right">{{info.contacter}}</div>
        </div>
        <div class="content">
          <div class="left">主人电话</div>
          <div class="right">{{info.phone}}</div>
        </div>
        <!-- <div class="content">
          <div class="left">身份证号</div>
          <div class="right">44586345324321213000</div>
        </div>-->
        <div class="content">
          <div class="left">主人地区</div>
          <div class="right">{{info.address}}</div>
        </div>
        <div class="content">
          <div class="left">观察期</div>
          <div class="right">自{{info.wait_date_start}}起至{{info.wait_date_end}}止</div>
        </div>
        <div class="content">
          <div class="left">保障期</div>
          <div class="right">自{{info.security_date_start}}起至{{info.security_date_end}}止</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData, getData } from "@/api";
import { _local } from "@/libs/util";
export default {
  // mixins: [SearchMixin],

  data() {
    return {
      info: {},
      appid: "",
      wxInfo: {},
      orderNo: ""
    };
  },
  created() {
    this.wxLogin();
    this.getInsuranceDetail();
    this.orderNo = this.$route.query.no;
    if (this.$route.query.empower == "1") {
      this.orderPay();
    }
  },
  methods: {
    orderPay() {
      getData("api", {
        s: "/hapi/Insurance/orderPay",
        orderNo: this.orderNo
      }).then(data => {
        if (data) {
          console.log(data);
          if (data.code == -502) {
            _local.set(
              "backLink",
              `/policyDetails?&no=${this.orderNo}&empower=1`,
              60000
            );

            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=http://m.cyongpet.com/payIndex&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          }
          this.wxInfo = data.payment;
          this.wxPay(this.appid, this.wxInfo);
          // this.$router.push("/warranty");
        }
      });
    },
    wxLogin() {
      getData("api", {
        s: "/hapi/Weixin/getAppid"
      }).then(data => {
        if (data) {
          this.appid = data.appid;
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
              //get_brand_wcpay_request:cancel
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
    },
    getInsuranceDetail() {
      getData("api", {
        s: "/hapi/Insurance/detail",
        orderNo: this.$route.query.no
      }).then(data => {
        if (data) {
          this.info = data;
        }
      });
    }
  },
  /* 给body添加height:100%*/
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
.info {
  background: #fff;
  //   padding: 0.3rem;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    // padding-bottom: 0.3rem;
    // margin-bottom: 0.09rem;
    padding: 0.3rem;
    border-bottom: 0.01rem solid rgba(240, 240, 240, 1);
    background: #f8f8f8;
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      color: #ff8408;
      font-size: 0.26rem;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    border-bottom: #f0f0f0 solid 0.01rem;
    .left {
      font-size: 0.26rem;
      color: #555555;
    }
    .right {
      font-size: 0.26rem;
      color: #222222;
    }
  }
}
.captchaStyle {
  padding: 0.02rem 0.08rem;
  text-align: center;
  font-size: 0.26rem;
  color: #fff;
  line-height: 0.56rem;
  width: 1.7rem;
  height: 0.56rem;
  background: #ff8408;
  border-radius: 2px;
}
</style>

