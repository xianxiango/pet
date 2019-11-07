<template>
  <div>
    <div class="public-view">
      <div class="petCard" v-for="item in list">
        <div class="headImg">
          <img :src="item.avatar_url" alt />
        </div>
        <div class="content">
          <div class="content1">
            <div class="left">{{item.pet_name}}</div>
            <div class="right">
              <span class="edit" v-if="item.status==0" @click="editPet(item.pet_id)">修改</span>
            </div>
          </div>
          <div class="content2">
            <span class="gender" :class="{'male':item.pet_sex=='公'}">{{item.pet_sex}}</span>
            <span
              class="sterilization"
              :class="{'no':item.pet_sterilization=='未绝育'}"
            >{{item.pet_sterilization}}</span>
            <span class="age">{{item.pet_birthday}}</span>
          </div>
          <div class="content3">
            <div class="name">{{item.orderlies_contacter}}</div>
            <div
              class="address"
            >{{item.orderlies_city}} {{item.orderlies_region}} {{item.orderlies_phone}}</div>
          </div>
        </div>
      </div>
      <infinite-loading @infinite="getList">
        <span slot="no-results" style="padding-bottom:50px;font-size: 0.24rem;">没有更多了～</span>
        <span slot="no-more" style="font-size: 0.24rem;">没有更多了～</span>
      </infinite-loading>
      <router-link :to="'/addPet'">
        <div class="addButton">添加宠物</div>
      </router-link>
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
  // created() {
  //   this.getList();
  // },
  components: {
    InfiniteLoading
  },
  methods: {
    getList($state) {
      // let params = new URLSearchParams();
      // params.append("page", this.page);
      // params.append("size", this.size);

      getData("api", {
        s: "/hapi/Pet/petList",
        page: this.page,
        list_rows: this.size
      }).then(data => {
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
      });
    },
    // getPetList() {
    //   getData("api", {
    //     s: "/hapi/Pet/petList",
    //     page: 1,
    //     list_rows: 8
    //   }).then(data => {
    //     if (data.code == 200) {
    //       this.petList = data.data;
    //     }
    //   });
    // },

    editPet(id) {
      this.$router.push({ name: "editPet", query: { id: id } });
    }
    // checkOrderlies(id) {
    //   getData("api", {
    //     s: "/hapi/pet/checkOrderlies",
    //     pet_id: id
    //   }).then(data => {
    //     if (data) {
    //       this.$router.push({ name: "guardian" });
    //     } else {
    //       this.$router.push({ name: "confirmOrder" });
    //     }
    //     // this.$router.push({ name: "remindDetails" });
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.petCard {
  margin: 0.2rem 0.3rem;
  background: #fff;
  padding: 0.3rem;
  display: flex;
  border-radius: 4px;
  .headImg {
    display: flex;
    width: 1.1rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
.content {
  flex: 1;
  .content1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.11rem;
    .left {
      font-size: 0.28rem;
      font-family: PingFangSC-Medium, sans-serif;
      color: #333333;
    }
    .right {
      display: flex;
      .edit {
        border-radius: 23px;
        font-size: 0.24rem;
        background: #ffebd7;
        width: 1.06rem;
        height: 0.46rem;
        line-height: 0.46rem;
        color: #ff8d27;
        display: inline-block;
        text-align: center;
      }
    }
  }
  .content2 {
    display: flex;
    padding-bottom: 0.25rem;
    border-bottom: solid 0.01rem #f0f0f0;
    .gender {
      display: inline-block;
      min-width: 0.32rem;
      height: 0.32rem;
      line-height: 0.32rem;
      text-align: center;
      font-size: 0.22rem;
      border-radius: 4px;
      font-family: PingFangSC-Medium, sans-serif;
      margin-right: 0.3rem;
      border: solid 0.02rem #ff3535;
      color: #ff3535;
      &.male {
        border: solid 0.02rem #0086e9;
        color: #0086e9;
      }
      // &.female {
      // }
    }
    .sterilization {
      display: inline-block;
      min-width: 0.76rem;
      height: 0.32rem;
      line-height: 0.32rem;
      text-align: center;
      font-size: 0.22rem;
      border-radius: 4px;
      font-family: PingFangSC-Medium, sans-serif;
      margin-right: 0.3rem;
      border: solid 0.02rem #ff8408;
      color: #ff8408;
      // &.yes {

      // }
      &.no {
        border: solid 0.02rem #cccccc;
        color: #cccccc;
      }
    }
    .age {
      font-family: PingFangSC-Medium, sans-serif;
      color: #333333;
      font-size: 0.24rem;
    }
  }
  .content3 {
    color: #333;
    padding-top: 0.13rem;
    .name {
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 0.28rem;
      margin-bottom: 0.1rem;
    }
    .address {
      font-size: 0.24rem;
    }
  }
}
.addButton {
  margin: 0.4rem 0.3rem;
  height: 0.96rem;
  font-size: 0.3rem;
  line-height: 0.96rem;
  text-align: center;
  background: #ff8408;
  color: #fff;
  border-radius: 4px;
}
</style>

