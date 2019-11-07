<template>
  <div>
    <div class="public-view">
      <div class="homeImg">
        <img class="img" src="static\images\Bitmap.png" />
      </div>
      <div class="introduce">
        <div class="left">
          <div class="introduceBox">
            <img src="static\images\Group@2x.png" alt />
            <span class="text">8500元额度</span>
          </div>
          <div class="introduceBox">
            <img src="static\images\Group@2x.png" alt />
            <span class="text">全病种理赔</span>
          </div>
        </div>
        <div class="right">
          <div class="introduceBox">
            <img src="static\images\Group@2x.png" alt />
            <span class="text">免植入芯片、免两证</span>
          </div>
          <div class="introduceBox">
            <img src="static\images\Group@2x.png" alt />
            <span class="text">全国正规医院通用</span>
          </div>
        </div>
      </div>
      <div class="settleAClaim">
        <div class="title">
          <div class="left">理赔流程</div>
          <!-- <div class="right">查看详情</div> -->
        </div>
        <div class="content">
          <div class="contentBox">
            <div class="img">
              <img src="static\images\Bitmap@2x(1).png" alt />
            </div>
            <div class="text">购买保障</div>
          </div>
          <div class="contentBox">
            <div class="img">
              <img src="static\images\Group 3@2x.png" alt />
            </div>
            <div class="text">宠物就医</div>
          </div>
          <div class="contentBox">
            <div class="img">
              <img src="static\images\Group 4@2x.png" alt />
            </div>
            <div class="text">申请保障</div>
          </div>
          <div class="contentBox">
            <div class="img">
              <img src="static\images\Group 5@2x.png" alt />
            </div>
            <div class="text">快速赔偿</div>
          </div>
        </div>
      </div>
      <sticky-slot class="stickyTop">
        <div class="tab" ref="tab">
          <div class="child" :class="{'active':isActive==1}" @click="goAnchor(1)">产品介绍</div>
          <div class="child" :class="{'active':isActive==2}" @click="goAnchor(2)">常见问题</div>
        </div>
      </sticky-slot>

      <div class="details" ref="anchor-1">
        <div class="title">
          <div class="left">投保方案</div>
          <div class="right">{{commetInsurance.supplier}}</div>
        </div>
        <div class="content">
          <div class="left">保障范围</div>
          <div class="right">{{commetInsurance.range}}</div>
        </div>
        <div class="content">
          <div class="left">赔付比例</div>
          <div class="right">按病种结算报销比例：{{commetInsurance.scale_pay}}</div>
        </div>
        <div class="content">
          <div class="left">不可理赔范围</div>
          <div class="right">{{commetInsurance.no_damage}}</div>
        </div>
        <div class="content">
          <div class="left">累计赔付制度</div>
          <div class="right">{{commetInsurance.high_pay}}</div>
        </div>
        <div class="content">
          <div class="left">等待期</div>
          <div class="right">{{commetInsurance.wait_days}}天</div>
        </div>
        <div class="content">
          <div class="left">免赔额</div>
          <div class="right">{{commetInsurance.excess}}</div>
        </div>
        <div class="content">
          <div class="left">每次事故赔付限额</div>
          <div class="right">{{commetInsurance.per_high_pay}}</div>
        </div>
      </div>
      <div class="details">
        <div class="title2">
          <div class="left">投保方案</div>
          <div class="right"></div>
        </div>
        <div class="content">
          <div class="left">承保年龄</div>
          <div class="right">{{commetInsurance.security_age}}</div>
        </div>
        <div class="content">
          <div class="left">保障期</div>
          <div class="right">{{commetInsurance.security_date}}</div>
        </div>
        <div class="content">
          <div class="left">生效时间</div>
          <div class="right">{{commetInsurance.effective_days}}天后零时</div>
        </div>
        <!-- <div class="content">
          <div class="left">支持医院</div>
          <div class="right">10000</div>
        </div>-->
      </div>
      <div class="question" ref="anchor-2">
        <div class="title">
          <div class="left">常见问题</div>
        </div>
        <div class="txt">Q1:什么是等待期？</div>
        <div class="content">A：保单生效后，宠物在等待期内，因为保单载明的保险责任所产生的医疗费用，不在我们的保障范围内。已经购买过一年后续保，没有等待期</div>
      </div>
      <div class="bottomBox">
        <div class="left">
          <!-- <div class="top">
            <span>首月</span>
            <span class="big">￥2.99</span>
          </div>
          <div class="bottom">¥29.9/月</div>-->
          <span class="big">{{commetInsurance.price}}</span>
          <span>/ 年</span>
        </div>
        <router-link :to="'/choosePet'">
          <div class="right">立即购买</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import { getData } from "@/api";
import stickySlot from "@/components/StickSlot";
import { _local } from "@/libs/util";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      isActive: 1,
      scrollTop: 0,
      interval: null,
      userInfo: {},
      commetInsurance: {}
    };
  },
  components: {
    stickySlot
  },
  methods: {
    getUserInfo() {
      getData("api", {
        s: "/hapi/center/userInfo"
      }).then(data => {
        if (data) {
          this.userInfo = data;
          this.$store.commit("SET_AVATAR_URL", data["avatarUrl"]);
          _local.set("avatarUrl", data["avatarUrl"], 30 * 1000 * 60 * 60 * 24);
        }
      });
    },
    getCommetInsurance() {
      getData("api", {
        s: "/hapi/Index/getCommetInsurance"
      }).then(data => {
        if (data) {
          this.commetInsurance = data;
        }
      });
    },
    goAnchor(selector) {
      this.isActive = selector;
      var top =
        this.$refs["anchor-" + selector].offsetTop -
        this.$refs.tab.offsetHeight;
      // window.pageYOffset = top;
      // document.documentElement.scrollTop = top;
      // document.body.scrollTop = top;

      this.interval = setInterval(() => {
        window.scrollTo(0, top);
        clearInterval(this.interval);
      }, 17);
    },
    menu() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // console.log(this.scrollTop, this.$refs.tab.offsetHeight);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  },
  created() {
    this.getCommetInsurance();
    if (this.$store.state.token != "") {
      this.getUserInfo();
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.menu);
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  watch: {
    scrollTop() {
      if (
        this.scrollTop >=
          this.$refs["anchor-1"].offsetTop - this.$refs.tab.offsetHeight &&
        this.scrollTop <
          this.$refs["anchor-2"].offsetTop - this.$refs.tab.offsetHeight
      ) {
        this.isActive = 1;
      }
      if (
        this.scrollTop >=
        this.$refs["anchor-2"].offsetTop - this.$refs.tab.offsetHeight
      ) {
        this.isActive = 2;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.homeImg {
  height: 3.34rem;
  // border: 0.01rem dashed #000;
  img {
    height: 3.34rem;
    width: 100%;
    padding: 0.01rem;
  }
}
.introduce {
  height: 1.52rem;
  background: #fff;
  display: flex;
  padding: 0.3rem 0;
  margin-bottom: 0.16rem;
  .left,
  .right {
    height: 1.52rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    .introduceBox {
      padding-left: 0.31rem;
      flex: 1;
      display: flex;
      align-items: center;
      .text {
        color: #222222;
        font-size: 0.26rem;
        flex: 1;
        padding-left: 0.06rem;
      }
      img {
        font-size: 0;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
.settleAClaim {
  height: 2.45rem;
  background: #fff;
  padding: 0.2rem 0.3rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.16rem;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.35rem;
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      padding-top: 0.1rem;
      color: #ff8408;
      font-size: 0.24rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    padding: 0 0.3rem;
    justify-content: space-between;
    .contentBox {
      display: flex;
      flex-direction: column;
      text-align: center;
      .img {
        display: flex;
        justify-content: center;
        margin-bottom: 0.11rem;
        img {
          font-size: 0;
          width: 0.8rem;
          height: 0.8rem;
        }
      }

      .text {
        color: #222222;
        font-size: 0.24rem;
      }
    }
  }
}
.details {
  background: #fff;
  padding: 0 0.3rem 0.3rem;
  margin-bottom: 0.16rem;
  .title {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.2rem;
    // padding-bottom: 0.2rem;
    border-bottom: 0.01rem solid #f0f0f0;
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      color: #222222;
      font-size: 0.28rem;
    }
  }
  .title2 {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.2rem;
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      color: #222222;
      font-size: 0.28rem;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .left {
      color: #555555;
      font-size: 0.26rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      color: #222222;
      font-size: 0.26rem;
    }
  }
}
.question {
  // height: 2.75rem;
  background: #fff;
  padding: 0.3rem 0.3rem 0.2rem 0.3rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.35rem;
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
  }
  .txt {
    color: #222222;
    font-size: 0.24rem;
    font-family: PingFangSC-Medium, sans-serif;
    margin-bottom: 0.23rem;
  }
  .content {
    margin-bottom: 0.3rem;
    font-size: 0.24rem;
    line-height: 0.33rem;
  }
}
.bottomBox {
  height: 0.96rem;
  line-height: 0.96rem;
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  .left {
    text-align: center;
    flex: 1;
    // display: block;
    font-size: 0.24rem;
    color: #222222;
    background: #fff;
    // display: flex;
    flex-direction: column;
    .big {
      color: #ff8408;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .top {
      span {
        height: 0.55rem;
        line-height: 0.55rem;
      }
      align-items: center;
      // height: 0.5rem;
      // flex: 1;
      display: flex;
      justify-content: center;
    }
    .bottom {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.24rem;
      color: #b7b7b7;
      text-decoration: line-through;
      // flex: 1;
    }
  }
  .right {
    text-align: center;
    width: 4.5rem;
    font-size: 0.3rem;
    background: #ff8408;
    color: #fff;
    font-family: PingFangSC-Medium, sans-serif;
  }
}
.tab {
  background: #fff;
  display: flex;
  padding: 0.2rem 0;
  .child {
    font-size: 0.28rem;
    color: #a1a1a1;
    width: 1.8rem;
    text-align: center;
    position: relative;
    &.active {
      color: #222222;
      font-family: PingFangSC-Medium, sans-serif;
      &::before {
        content: "";
        position: absolute;
        left: 0.7rem;
        top: 0.5rem;
        width: 0.4rem;
        height: 0.06rem;
        border-bottom: 0.06rem solid #ff8408;
        transition: 0.2s all linear;
      }
    }
  }
}
.stickyTop {
  top: 0;
  z-index: 10;
}
</style>

