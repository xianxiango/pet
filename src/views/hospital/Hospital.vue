<template>
  <div>
    <div class="public-view">
      <div class="view">
        <div class="search">
          <div class="searchInput">
            <img src="static/images/search.png" alt />
            <input type="text" v-model="name" name id />
          </div>
          <div class="searchButton" @click="changeType">搜索</div>
        </div>
        <div class="content1">
          <div class="left">医院名称</div>
          <div class="right">地址</div>
        </div>
        <div class="content2" v-for="item in list" @click="chooseHospital(item.hospital_id)">
          <div class="left">{{item.name}}</div>
          <div class="right">{{item.address}}</div>
        </div>
        <infinite-loading @infinite="getHospitalList" :identifier="infiniteId">
          <span slot="no-results" style="padding-bottom:50px;font-size: 0.24rem;">没有更多了～</span>
          <span slot="no-more" style="font-size: 0.24rem;">没有更多了～</span>
        </infinite-loading>
      </div>
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
      size: "10",
      name: "",
      infiniteId: +new Date()
    };
  },
  components: {
    InfiniteLoading
  },
  created() {
    // this.getHospitalList();
  },
  methods: {
    chooseHospital(hospital_id) {
      this.$store.dispatch("setHospitalId", hospital_id);
      this.$router.push({
        name: "guardian",
        query: { id: this.$route.query.id }
      });
    },
    changeType() {
      this.page = 1;
      this.list = [];
      this.infiniteId += 1;
    },

    getHospitalList($state) {
      getData("api", {
        s: "/hapi/hospital/getList",
        page: this.page,
        list_rows: this.size,
        name: this.name
      }).then(data => {
        if (data) {
          if (this.isSearch) {
            this.list = data.data;
          } else {
            if (data.data.length == 0) {
              $state.complete();
            } else {
              this.list = this.list.concat(data.data);
              this.page++;
              $state.loaded();
            }
          }
        } else {
          $state.complete();
        }
      });
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
  }
};
</script>

<style lang="less" scoped>
.view {
  padding: 0.3rem;
  background: #fff;
  height: 100%;
}
.search {
  display: flex;
  padding-bottom: 0.3rem;
  border-bottom: 0.01rem solid #f0f0f0;

  .searchInput {
    flex: 1;
    height: 0.82rem;
    display: flex;
    background: #f8f8f8;
    align-items: center;
    img {
      height: 0.39rem;
      width: 0.39rem;
      margin: 0 0.2rem 0 0.22rem;
    }
    input {
      height: 0.82rem;
      width: 100%;
      outline: none;
      background: transparent;
      border: none;
      color: #222222;
      font-size: 0.28rem;
    }
  }
  .searchButton {
    height: 0.82rem;
    width: 1.28rem;
    background: #ff8408;
    border-radius: 4px;
    line-height: 0.82rem;
    text-align: center;
    margin-left: 0.2rem;
    font-size: 0.28rem;
    color: #fff;
  }
}
.content1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cccccc;
  font-size: 0.24rem;
  margin-top: 0.3rem;
}
.content2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #222222;
  font-size: 0.28rem;
  margin-top: 0.3rem;
  .left,
  .right {
    max-width: 45%;
  }
}
</style>

