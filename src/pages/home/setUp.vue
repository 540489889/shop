<template>
  <div class="setUpWrapper recommend-content">
    <ul class="h-list-1 h-list-ui">
      <li style="position:relative;">
        <div class="flex-box" style="width:100%; justify-content: space-between">
          <div class="list-left">
            自定义背景图
          </div>
          <div class="list-right"> <i class="el-icon-arrow-right"></i></div>
        </div>
        <el-upload
          class="avatar-uploader"
          auto-upload
          :action="uploadAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
      <li class="flex-box">
        <div class="list-left">
          账户切换
        </div>
        <div class="list-right"><b @click="outLogin">立即切换</b></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'homeSetup',
    data (){
      return {
        imageUrl: '',
        uploadAction: '/Home/Index/uppic'
      }
    },
    methods: {
      outLogin(){
        let _this = this
        axios.get('/Home/Index/loginout')
          .then(function (res) {
            if(res.status){
              _this.$router.push({ path: '/reg/index'});
            }
          })
      },
      handleAvatarSuccess(res, file) {
//        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res,file)
        if(!res.status){
          this.$notify({
            title: '消息',
            message: res.msg,
            showClose: false,
            duration: 2000,
            onClose: function () {

            }
          });
        }else{
          this.$router.push({ path: '/'});
        }
      },
      beforeAvatarUpload(file) {
//        console.log(file)
//        const isJPG = file.type === 'image/jpeg/png';
//        const isLt2M = file.size / 1024 / 1024 < 2;

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
//        if (!isLt2M) {
//          this.$message.error('上传头像图片大小不能超过 2MB!');
//        }
//        return isJPG && isLt2M;
      }
    }

  }
</script>
<style lang="less">
  .setUpWrapper{
    font-size:16px;
    .el-upload{
      opacity: 0;
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
    }
    .h-list-ui{
      background-color:white;
      margin-top:10px;
      li{
        position:relative;
        justify-content: space-between;
        padding:15px;
        border-bottom:1px solid #eee;
        .list-left{
          color:#506187;
          font-size:14px;
          position:relative;
        }
        .list-right{
          color:#506187;
          font-size:13px;
          opacity: 0.7;
          b{
            color:#16B3EF;
          }
        }
      }
      li:last-child{
        border:none;
      }
    }
  }
</style>
