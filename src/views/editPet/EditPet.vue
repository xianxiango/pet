<template>
  <div>
    <div class="public-view">
      <div class="info">
        <div class="title">
          <div class="left">宠物信息</div>
        </div>
        <div class="content1 typeInfo">
          <div class="left">类型</div>
          <div class="right">
            <XRadioGroup v-model="cat_dog" class="radioGroup">
              <XRadio name="cat" value="1" label="猫"></XRadio>
              <XRadio name="dog" value="2" label="狗"></XRadio>
            </XRadioGroup>
          </div>
        </div>
        <div class="content1 headInfo">
          <div class="left">
            头像
            <span class="bright">查看示例</span>
          </div>
          <div class="right">
            <!-- <img class="petImg" src="static/images/Oval@2x.png" alt /> -->
            <upload-images :url="imageUpload" @success="imageSuccess" :src="avatar_url"></upload-images>
            <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt />
          </div>
        </div>
        <div class="content1 headInfo">
          <div class="left">鼻纹</div>
          <div class="right">
            <!-- <img class="petImg" src="static/images/Oval@2x.png" alt /> -->
            <upload-images :url="imageUpload" @success="imageSuccess2" :src="noseprint_url"></upload-images>
            <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt />
          </div>
        </div>
        <div class="content1">
          <div class="left">昵称</div>
          <div class="right">
            <input type="text" placeholder="请输入昵称" v-model="pet_name" />
            <!-- <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt /> -->
          </div>
        </div>
        <div class="content1">
          <div class="left">品种</div>
          <div class="right">
            <input type="text" placeholder="请输入品种" v-model="pet_type" />
            <!-- <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt /> -->
          </div>
        </div>
        <div class="content1">
          <div class="left">生日</div>
          <div class="right" @click="birthdayClick()">
            <span>{{pet_birthday==""?"请选择生日":pet_birthday}}</span>
            <img class="rectangle" src="static/images/Rectangle-path@2x.png" alt />
          </div>
        </div>
        <div class="content1">
          <div class="left">性别</div>
          <div class="right">
            <XRadioGroup v-model="pet_sex" class="radioGroup">
              <XRadio name="cat" value="1" label="公"></XRadio>
              <XRadio name="dog" value="2" label="母"></XRadio>
            </XRadioGroup>
          </div>
        </div>
        <div class="content1">
          <div class="left">是否绝育</div>
          <div class="right">
            <XRadioGroup v-model="is_sterilization" class="radioGroup">
              <XRadio name="cat" value="1" label="是"></XRadio>
              <XRadio name="dog" value="2" label="否"></XRadio>
            </XRadioGroup>
          </div>
        </div>
      </div>
      <div class="next" @click="editPet()">完成</div>
    </div>
  </div>
</template>

<script>
import XRadio from "@/components/XRadio";
import XRadioGroup from "@/components/XRadioGroup";
import url from "@/api/url";
import { fetchData, getData } from "@/api";
import UploadImages from "@/components/Upload";

const isDev = process.env.NODE_ENV === "development";
export default {
  // mixins: [SearchMixin],
  data() {
    return {
      cat_dog: 1,
      pet_name: "",
      pet_type: "",
      pet_birthday: "",
      avatar_url: "",
      noseprint_url: "",
      pet_sex: 1,
      is_sterilization: 1,
      imageUpload: url.imageUpload
    };
  },
  components: {
    XRadio,
    XRadioGroup,
    UploadImages
  },
  created() {
    this.getOrderlies();
  },
  methods: {
    imageSuccess(index, data) {
      if (data) {
        this.avatar_url = data.file_url;
      } else {
        this.avatar_url = "";
      }
    },
    imageSuccess2(index, data) {
      if (data) {
        this.noseprint_url = data.file_url;
      } else {
        this.noseprint_url = "";
      }
    },

    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    birthdayClick() {
      //生日
      var _this = this;
      this.$picker.show({
        type: "datePicker",
        date: "2010-01-01",
        endTime: this.getNowFormatDate(), //截至时间
        startTime: "1990-01-01", //开始时间
        onOk: date => {
          _this.pet_birthday = date; // birthday就是所需字段，在data 里定义下
        }
      });
    },
    editPet() {
      fetchData("/hapi/pet/petSave", {
        pet_id: this.$route.query.id,
        cat_dog: this.cat_dog,
        avatar_url: this.avatar_url,
        noseprint_url: this.noseprint_url,
        pet_name: this.pet_name,
        pet_type: this.pet_type,
        pet_birthday: this.pet_birthday,
        pet_sex: this.pet_sex,
        is_sterilization: this.is_sterilization
      }).then(data => {
        // this.$store.dispatch("setOrdersPetid", id);
        // if (data) {
        //   this.$message.success("修改成功");
        //   this.$router.push({ name: "petList" });
        // }
        if (data) {
          this.$router.push({
            name: "guardian",
            query: { id: this.$route.query.id }
          });
          // this.checkOrderlies(this.$route.query.id);
        }
      });
    },
    getOrderlies() {
      getData("api", {
        s: "/hapi/pet/detail",
        pet_id: this.$route.query.id
      }).then(data => {
        if (data) {
          this.cat_dog = data.cat_dog;
          this.pet_name = data.pet_name;
          this.pet_type = data.pet_type;
          this.pet_birthday = data.pet_birthday;
          this.avatar_url = data.avatar_url;
          this.noseprint_url = data.noseprint_url;
          this.pet_sex = data.pet_sex;
          this.is_sterilization = data.is_sterilization;
        }
        // this.$router.push({ name: "remindDetails" });
      });
    },
    checkOrderlies(id) {
      getData("api", {
        s: "/hapi/pet/checkOrderlies",
        pet_id: id
      }).then(data => {
        if (data) {
          this.$router.push({ name: "guardian", query: { id: id } });
        } else {
          this.$router.push({ name: "petList" });
        }
        // this.$router.push({ name: "remindDetails" });
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
.info {
  background: #fff;
  padding: 0.6rem 0.3rem 0.3rem;
  display: flex;
  flex-direction: column;
  color: #222222;
  font-size: 0.24rem;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
    .left {
      font-size: 0.34rem;
      font-family: PingFangSC-Medium, sans-serif;
    }
  }
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
      .petImg {
        width: 0.8rem;
        height: 0.8rem;
      }
      input {
        width: 4.9rem;
        height: 100%;
        border: none;
        outline: none;
        color: #333333;
        font-size: 0.28rem;
      }
      .rectangle {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
      .tips {
        color: #cccccc;
      }
    }
  }
}
.headInfo {
  height: 1.4rem !important;
}
.typeInfo {
  height: 1.26rem !important;
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

