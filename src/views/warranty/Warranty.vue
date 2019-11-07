<template>
  <div>
    <div class="public-view">
      <div class="info" @click="gotoDetails(item.insurance_order_no)" v-for="item in list">
        <div class="title">
          <div class="left">{{item.insurance_order_name}}</div>
          <div class="right">{{item.statusText}}</div>
        </div>
        <div class="content1">
          <div class="left">
            <span class="bright">￥{{item.money_total}}</span>
            <span>/{{item.security_date}}</span>
          </div>
        </div>
        <div class="content2">
          <div class="left">保障期：自{{item.security_date_start}}日至{{item.security_date_end}}</div>
          <div class="right">
            <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt />
          </div>
        </div>
        <div class="buttonBox">
          <span @click.prevent="goToBao()">保障申请</span>
          <span class="disabled">保障查询</span>
          <span class="disabled">续保</span>
        </div>
      </div>
      <infinite-loading @infinite="getInsurance">
        <span slot="no-results" style="padding-bottom:50px;font-size: 0.24rem;">没有更多了～</span>
        <span slot="no-more" style="font-size: 0.24rem;">没有更多了～</span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api";
import InfiniteLoading from "vue-infinite-loading";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      list: [],
      page: "1",
      size: "8"
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {
    goToBao() {
      window.location.href =
        "https://mp.weixin.qq.com/cgi-bin/getimgdata?token=1993188753&msgid=undefined&mode=small&source=undefined&fileId=100000007&ow=-1";
    },
    getInsurance($state) {
      getData("api", {
        s: "/hapi/Insurance/getList",
        page: this.page,
        list_rows: this.size,
        name: ""
      }).then(data => {
        if (data) {
          if (data) {
            if (data.data.length == 0) {
              $state.complete();
            } else {
              this.list = this.list.concat(data.data);
              this.page++;
              $state.loaded();
            }
          } else {
            $state.complete();
          }
        }
      });
    },
    gotoDetails(no) {
      this.$router.push({ name: "policyDetails", query: { no: no } });
    }
  },
  created() {
    // console.log(this.$store.state.orders);
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
    border-bottom: 0.01rem solid rgba(240, 240, 240, 1);
    .left {
      color: #222222;
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
    .right {
      color: #ff324b;
      font-size: 0.24rem;
    }
  }
  .content1 {
    display: flex;
    justify-content: space-between;
    padding-top: 0.3rem;
    font-size: 0.28rem;
    .left {
      font-family: PingFangSC-Medium, sans-serif;
      .bright {
        color: #ff8408;
      }
    }
    .right {
      .rectangle {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
    }
  }
  .content2 {
    display: flex;
    justify-content: space-between;
    padding-top: 0.2rem;
    font-size: 0.24rem;
    .left {
      .bright {
        color: #ff8408;
      }
    }
    .right {
      .rectangle {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
    }
  }
}
.buttonBox {
  display: flex;

  justify-content: space-between;
  margin: 0.3rem 0 0.1rem;
  span {
    width: 2.1rem;
    height: 0.56rem;
    border-radius: 4px;
    line-height: 0.56rem;
    border: solid 0.01rem #ff8408;
    text-align: center;
    font-size: 0.24rem;
    color: #ff8408;
    &.disabled {
      border: solid 0.01rem #c3c3c3;
      color: #c3c3c3;
    }
  }
}
</style>

