<template>
  <keep-alive>
    <div>
      <div class="public-view">
        <div class="info">
          <div class="content1">
            <div class="left">联系人</div>
            <div class="right">
              <input type="text" placeholder="请输入真实姓名" v-model="contacter" />
            </div>
          </div>
          <div class="content1">
            <div class="left">性别</div>
            <div class="right">
              <XRadioGroup v-model="gender" class="radioGroup">
                <XRadio name="male" value="1" label="男"></XRadio>
                <XRadio name="female" value="2" label="女"></XRadio>
              </XRadioGroup>
            </div>
          </div>
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
          <div class="content1">
            <div class="left">地区</div>
            <div class="right">
              <!-- <v-distpicker class="picker" type="mobile" @selected="selected"></v-distpicker> -->
              <!-- <span>广州市</span> -->
              <h-selector v-model="address" :showValue="showAddress">
                <!-- <h-wrapper prop="province">
                  <h-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :value="item.id"
                  >{{item.name}}</h-option>
                </h-wrapper>
                <h-wrapper prop="city">
                  <h-option v-for="item in cityList" :key="item.id" :value="item.id">{{item.name}}</h-option>
                </h-wrapper>-->
                <h-wrapper prop="region">
                  <h-option v-for="item in regionList" :key="item.id" :value="item.id">{{item.name}}</h-option>
                </h-wrapper>
              </h-selector>
              <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt />
            </div>
          </div>
          <div class="content1">
            <div class="left">医院</div>
            <div class="right">
              <span class="tips" v-if="hospital_id==''" @click="goToHospital">请选择愿意前往的医院</span>
              <span class="tips choose" v-if="hospital_id!=''">{{hospital_name}}</span>
              <img
                class="rectangle"
                src="static/images/Rectangle-path@2x.png"
                alt
                v-model="region_id"
                @click
              />
            </div>
          </div>
        </div>
        <div class="seizeSeat"></div>
        <div class="next" v-if="!isEdit" @click="addOrderlies">下一步</div>
        <div class="next" v-else @click="editOrderlies">修改</div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import XRadio from "@/components/XRadio";
import XRadioGroup from "@/components/XRadioGroup";
import HOption from "@/components/Hoption";
import HSelector from "@/components/Hselector";
import HWrapper from "@/components/Hwrapper";
import { _local } from "@/libs/util";
import { fetchData, getData } from "@/api";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      isEdit: false,
      captcha: "获取验证码",
      isWait: false,
      count: _local.get("captcha"),
      contacter: "",
      gender: 1,
      phone: "",
      code: "",
      city_id: "",
      region_id: "",
      province_id: "",
      hospital_id: "",
      hospital_name: "",
      address: {
        province: "",
        city: "",
        region: ""
      },
      // provinceList: [],
      // cityList: [],
      regionList: []
    };
  },
  components: {
    XRadio,
    XRadioGroup,
    vDistpicker,
    HSelector,
    HOption,
    HWrapper
  },
  activated() {
    if (this.$store.state.hospitalID != "") {
      this.hospital_id = this.$store.state.hospitalID;
      this.$store.dispatch("setHospitalId", "");
      this.getHospitalName(this.hospital_id);
    }
  },
  created() {
    // this.provinceList
    this.getAddressTree2();
    this.getOrderlies();
    this.dealCaptcha();
  },
  computed: {
    showAddress() {
      // let province = this.provinceList.find(
      //   item => item.id === this.address.province
      // ) || { name: "选择省" };
      // // this.getAddressTree1(province.id);
      // let city = this.cityList.find(item => item.id =ß== this.address.city) || {
      //   name: "选择市"
      // };

      let region = this.regionList.find(
        item => item.id === this.address.region
      ) || {
        name: "选择区"
      };
      return `${region.name}`;
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
    },
    address() {
      // this.city_id = this.address.city;
      this.region_id = this.address.region;
      // this.province_id = this.address.province;
    }
    // provinceList() {
    //   this.regionList = [];
    // },
    // province_id() {
    //   this.getAddressTree1(this.province_id);
    // },
    // city_id() {
    //   this.getAddressTree2(this.city_id);
    // }
  },
  beforeDestroy() {
    if (this.resend) {
      clearInterval(this.resend);
    }
  },
  methods: {
    goToHospital() {
      this.$router.push({
        name: "hospital",
        query: { id: this.$route.query.id }
      });
    },
    selected(data) {
      // console.log(data);
      this.popupVisible = false;
      this.agentArea = data.province.value + data.city.value + data.area.value;
    },
    addOrderlies() {
      fetchData("/hapi/pet/addOrderlies", {
        pet_id: this.$route.query.id,
        contacter: this.contacter,
        gender: this.gender,
        phone: this.phone,
        code: this.code,
        city_id: "1964",
        region_id: this.region_id,
        hospital_id: this.hospital_id
      }).then(data => {
        if (data) {
          this.$message.success("监护人添加成功");
          this.$router.push({
            name: "confirmOrder",
            query: { id: this.$route.query.id }
          });
        }
      });
    },
    editOrderlies() {
      fetchData("/hapi/pet/orderliesSave", {
        pet_id: this.$route.query.id,
        contacter: this.contacter,
        gender: this.gender,
        phone: this.phone,
        code: this.code,
        city_id: "1964",
        region_id: this.region_id,
        hospital_id: this.hospital_id
      }).then(data => {
        if (data) {
          this.$message.success("监护人添加成功");
          this.$router.push({
            name: "confirmOrder",
            query: { id: this.$route.query.id }
          });
        }
      });
    },
    getOrderlies() {
      getData("api", {
        s: "/hapi/pet/orderliesDetail",
        pet_id: this.$route.query.id
      }).then(data => {
        if (data) {
          this.isEdit = true;
          this.contacter = data.contacter;
          this.gender = data.gender;
          this.phone = data.phone;
          // this.code = data.code;
          // this.address.province = data.city_id;
          this.address.region = data.region_id;
          this.hospital_id = data.hospital_id;
        }
      });
    },
    getHospitalName(id) {
      console.log(id);
      getData("api", {
        s: "/hapi/hospital/detail",
        hospital_id: id
      }).then(data => {
        if (data) {
          this.hospital_name = data.name;
        }
      });
    },
    // getAddressTree0(pid) {
    //   // var tree;
    //   getData("api", {
    //     s: "/hapi/Region/getAddressTree",
    //     pid: pid,
    //     level: 1
    //   }).then(data => {
    //     if (data) {
    //       this.provinceList = data;
    //     }
    //   });

    //   // return tree;
    // },
    // getAddressTree1(pid) {
    //   // var tree;
    //   getData("api", {
    //     s: "/hapi/Region/getAddressTree",
    //     pid: pid,
    //     level: 2
    //   }).then(data => {
    //     if (data) {
    //       this.cityList = data;
    //     }
    //   });

    //   // return tree;
    // },
    getAddressTree2() {
      // var tree;
      getData("api", {
        s: "/hapi/Region/getAddressTree",
        pid: 1965,
        level: 3
      }).then(data => {
        if (data) {
          this.regionList = data;
        }
      });

      // return tree;
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
      if (_local.get("Gcaptcha")) {
        return false;
      } else {
        this.count = 60;
        var _this = this;
        this.resend = setInterval(function() {
          _this.count--;

          if (_this.count > 0) {
            _local.set("Gcaptcha", _this.count * 1000, _this.count * 1000);
          } else {
            clearInterval(_this.resend);
          }
        }, 1000);
      }
    },
    dealCaptcha() {
      if (_local.get("Gcaptcha")) {
        var _this = this;
        this.count = parseInt(_local.get("Gcaptcha") / 1000);
        this.resend = setInterval(function() {
          _this.count--;
          if (_this.count > 0) {
            _local.set("Gcaptcha", _this.count * 1000, _this.count * 1000);
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
      // .verificationButton {
      //   background: #ff8408;
      //   border-radius: 2px;
      //   width: 1.7rem;
      //   height: 0.56rem;
      //   font-size: 0.26rem;
      //   color: #fff;
      //   text-align: center;
      //   line-height: 0.56rem;
      // }
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

