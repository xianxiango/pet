<template>
  <div class="app-wrapper">
    <!-- <div id="header">
      <div class="left">X</div>
      <div class="center">{{$route.meta.title}}</div>
      <div class="right">...</div>
    </div>-->
    <div class="main-container">
      <div class="headerBox">
        <div class="left">
          <img src="static/images/Group@2x.png" alt @click="drawer = true" />
        </div>
        <div class="title">
          <span>宠保-宠物保险平台</span>
        </div>
        <div class="right">
          <router-link to="/center">
            <img :src="avatarUrl" v-if="avatarUrl!=''" alt />
            <img src="static/images/Oval@2x(1).png" v-else alt />
          </router-link>
        </div>
      </div>
      <section class="app-main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </section>
    </div>
    <el-drawer
      class="drawer"
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      :append-to-body="true"
      size="30%"
    >
      <router-link to="/home">
        <div class="child" @click="drawer =false">
          <div>
            <i class="el-icon-location"></i>首页
          </div>
        </div>
      </router-link>

      <!-- <router-link to="/center">
        <div class="child" @click="drawer =false">
          <div>
            <i class="el-icon-menu"></i>个人中心
          </div>
        </div>
      </router-link>-->
    </el-drawer>
  </div>
</template>

<script>
import md5 from "md5";
import { _local } from "@/libs/util";
// import { fetchData } from "@/api";
export default {
  name: "Main",
  data() {
    return {
      drawer: false,
      direction: "ttb",
      avatarUrl: "static/images/Oval@2x(1).png"
    };
  },
  watch: {
    "$store.state.orders.avatarUrl": function() {
      this.avatarUrl = this.$store.state.orders.avatarUrl;
    },
    "_local.get('avatarUrl')": function() {
      this.avatarUrl = _local.get("avatarUrl");
    }
  },
  created() {
    this.avatarUrl = _local.get("avatarUrl");
  },
  mounted() {
    this.avatarUrl = _local.get("avatarUrl");
  }
};
</script>

<style lang="less" scoped>
.drawer {
  a {
    display: flex;
    // align-items: center;
    flex: 1;
    padding-left: 0.5rem;
    .child {
      display: flex;
      flex: 1;
      align-items: center;
    }
    i {
      padding-right: 0.5rem;
    }
  }
  // padding-left: 1rem;
  a {
    font-size: 0.4rem;
  }
}
#header {
  height: 1rem;
  line-height: 1rem;
  background: #f2f2f2;
  font-size: 0.35rem;
  display: flex;
  font-family: PingFangSC-Medium, sans-serif;

  .left {
    width: 0.75rem;
    text-align: center;
  }
  .center {
    flex: 1;
  }
  .right {
    width: 0.75rem;
    text-align: center;
  }
}
.headerBox {
  background: #fff;
  height: 0.92rem;
  display: flex;
  font-family: PingFangSC-Medium, sans-serif;
  font-size: 0.32rem;
  padding: 0 0.3rem;
  border-bottom: solid 0.01rem #f0f0f0;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.4rem;
      height: 0.33rem;
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 100%;
    }
  }
}
</style>
