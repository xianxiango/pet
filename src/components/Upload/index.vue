<template>
  <div class="uploadbox">
    <el-upload
      class="public-uploader"
      ref="image"
      :show-file-list="false"
      :limit="1"
      :on-exceed="handleExceed"
      :action="url"
      :http-request="customUpload"
      :on-success="handleSuccess"
      :headers="myheader"
      name="iFile"
    >
      <div v-if="image">
        <div class="avatar">
          <img :src="image" />
        </div>
      </div>
      <i v-else class="el-icon-plus public-uploader-icon">{{text}}</i>
    </el-upload>
    <i v-if="image" class="delete el-icon-close" @click.stop="clearFiles"></i>
  </div>
</template>

<script>
import { fetchData, fileUpload } from "@/api";
import { _local } from "@/libs/util";
var token = _local.get("token");
export default {
  props: {
    url: {
      type: String
    },
    text: {
      type: String
    },
    src: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      info: null,
      image: null,
      myheader: {
        token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
  },
  watch: {
    src(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.image = this.src;
      }
    }
  },

  methods: {
    customUpload(file) {
      // this.generatorFileMd5(file.file)
      // 自定义上传

      fileUpload(this.url, file).then(res => {
        if (res) {
          this.info = res;
          let _this = this;
          var timeout = setTimeout(function() {
            _this.image = res.file_url;
            _this.$emit("success", _this.index, res);
            if (timeout != "") {
              clearTimeout(timeout);
            }
          }, 1000);
        } else {
          this.$message(res.msg);
        }
      });
    },
    // 清除文件
    clearFiles() {
      this.info = null;
      this.image = null;
      this.$refs.image.clearFiles();
      this.$emit("success", this.index, null);
    },
    // 超过限制
    handleExceed(file, fileList) {
      this.$message("当前已选中文件");
    },
    // 上传成功
    handleSuccess(res, file) {
      console.log(res);
      if (!res.code && res.data) {
        this.info = res.data;
        let _this = this;
        var timeout = setTimeout(function() {
          _this.image = res.data.file_url;
          _this.$emit("success", _this.index, res.data);
          if (timeout != "") {
            clearTimeout(timeout);
          }
        }, 1000);
      } else {
        this.$message(res.message);
      }
    },
    // 删除文件
    handleDelete() {
      if (!this.info && !this.image) return;
      let id;
      if (this.info && this.image) {
        const list = this.info.filename.split("/");
        const item = list[list.length - 1];
        id = item;
      } else if (this.image && !this.info) {
        const list = this.image.split("/");
        const item = list[list.length - 1];
        id = item;
      }
      // ƒ
    }
  },
  created() {
    if (this.src) {
      this.image = this.src;
    }
  }
};
</script>

<style lang="less">
.uploadbox {
  position: relative;
  .delete {
    // display: none;
    position: absolute;
    right: -0.1rem;
    top: -0.1rem;
    width: 0.5rem;
    height: 0.5rem;
    background: #f44336;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.5rem;
    border-radius: 50%;
  }
}
.public-uploader {
  text-align: center;
  float: left;
  overflow: hidden;
  position: relative;

  .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    // position: relative;
    overflow: hidden;
  }
  .public-uploader-icon {
    font-size: 0.28rem;
    color: #8c939d;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .avatar {
    width: 0.8rem;
    height: 0.8rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background: #f5f5f5;
    font-size: 0;
    border-radius: 50%;
    img {
      cursor: pointer;
      max-width: 100%;
      max-height: 100%;
      border: 0;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>

