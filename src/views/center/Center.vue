<template>
  <div>
    <div class="public-view">
      <div class="hearder">
        <div class="left">
          <img :src="userInfo.avatarUrl" alt v-if="userInfo.avatarUrl!=''" />
          <img src="static/images/Group 2@2x.png" alt v-else />
        </div>
        <div class="right">
          <div class="name">{{userInfo.nickName}}</div>
          <div
            class="phone"
            v-if="hasBind==1"
          >已绑定手机号{{`${userInfo.phone.slice(0,3)}****${userInfo.phone.slice(7,11)}`}}</div>
          <div class="phone" v-else @click="gotoBindPhone">
            找不到订单号？
            <span class="captchaStyle">绑定手机号</span>
          </div>
        </div>
      </div>
      <div class="content">
        <router-link to="/warranty">
          <div class="content-box">
            <div class="content-box2">
              <img src="static/images/Group 2@2x2.png" alt />
              <div class="title">保单管理</div>
            </div>
          </div>
        </router-link>
        <router-link to="/petList">
          <div class="content-box">
            <div class="content-box2">
              <img src="static/images/Group 5@2x2.png" alt />
              <div class="title">我的宠物</div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="logout">
        <div class="button" @click="getLogout()">退出登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
import { _local } from "@/libs/util";
import { getData } from "@/api";
var user_id = _local.get("user_id");
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        avatarUrl: ""
      },
      hasBind: _local.get("hasPhone")
    };
  },
  methods: {
    getLogout() {
      getData("api", {
        s: "/hapi/User/logout",
        user_id: parseInt(user_id)
      }).then(data => {
        this.$store.commit("DEL_TOKEN");
        // _local.remove("token");
        this.$router.push("/");
      });
    },
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
    gotoBindPhone() {
      this.$router.push("/bindPhone");
    }
  },
  created() {
    this.getUserInfo();
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
.hearder {
  height: 1.57rem;
  background: #fff;
  display: flex;
  .left {
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 100%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .name {
      font-family: PingFangSC-Medium, sans-serif;
      color: #333333;
      font-size: 0.28rem;
      margin-top: 0.4rem;
    }
    .phone {
      color: #a1a1a1;
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }
}
.content {
  background: #fff;
  padding: 0.57rem 0.26rem;
  display: flex;
  justify-content: space-between;
  .content-box {
    width: 3.32rem;
    height: 2.61rem;
    background: #f8f9fb;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content-box2 {
      display: flex;
      flex-direction: column;
      .title {
        margin-top: 0.2rem;
        color: #222222;
        font-size: 0.26rem;
      }
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
.logout {
  position: absolute;
  width: 100%;

  bottom: 0.4rem;
  .button {
    height: 0.96rem;
    line-height: 0.96rem;
    font-family: PingFangSC-Medium, sans-serif;
    color: #222222;
    font-size: 0.3rem;
    text-align: center;
    background: #f8f9fb;
    margin: 0 0.34rem;
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

