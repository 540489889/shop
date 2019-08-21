<template>
  <div class="fillAddress">
    <scroll class=" recommend-content" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="d-w-mall">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="manName">
            <el-input v-model="ruleForm2.manName" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="manTell">
            <el-input v-model="ruleForm2.manTell" ></el-input>
          </el-form-item>
          <el-form-item label="所在地区" class="cityDiv" prop="city">
            <div class="cityDiv" @click="toAddress">{{ruleForm2.city}}</div>
            <el-input type="hidden" v-model="ruleForm2.city"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="xxCity">
            <el-input v-model="ruleForm2.xxCity"></el-input>
          </el-form-item>
          <el-form-item class="subBox">
            <el-button class="add-address" type="primary" @click="submitForm('ruleForm2')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>

    </scroll>
    <v-distpicker type="mobile" @selected='selected' v-show="addInp"></v-distpicker>
    <div class="mask" v-show="mask"></div>
  </div>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  import VDistpicker from 'v-distpicker'
  export default {
    name: 'fillAddress',
    data (){
      //姓名
      var checkManName = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入姓名'))
        }else{
          callback()
        }
      };
      //电话
      var checkManTell = (rule, value, callback) =>{
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!tellReg.test(value)){
          return callback(new Error('请输入正确的电话号码'))
        }else{
          callback()
        }
      };
      var checkCity = (rule, value, callback) =>{
        if(value=='请选择所在地区') {
          return callback(new Error('请选择地址'))
        }else{
          callback()
        }
      };
      var checkxxCity = (rule, value, callback) =>{
        if(!value) {
          return callback(new Error('请输入详细地址'))
        }else{
          callback()
        }
      };
      return {
        fullscreenLoading: false,
        city:'请选择',
        addInp :false,
        mask:false,
        ruleForm2: {
          manName: '',
          manTell: '',
          city:'请选择所在地区',
          xxCity:'',
          address: {
            province:null,
            city: null,
            district: null
          },
        },
        rules2: {
          manName: [
            { validator: checkManName, trigger: 'blur' }
          ],
          manTell: [
            { validator: checkManTell, trigger: 'blur' }
          ],
          city: [
            { validator: checkCity, trigger: 'blur' }
          ],
          xxCity: [
            { validator: checkxxCity, trigger: 'blur' }
          ]
        },
        dwShow: false,
        num: 1,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddressRess()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toAddress(){
        this.mask = true;
        this.addInp = true;
      },
      selected(data){
        this.mask =false;
        this.addInp = false;
        this.ruleForm2.city = data.province.value + ' ' + data.city.value +' ' + data.area.value
        this.ruleForm2.address.province = data.province.value
        this.ruleForm2.address.city = data.city.value
        this.ruleForm2.address.district = data.area.value
      },
      getAddressRess () {
        let _this = this
        this.fullscreenLoading = true;
        let params = new URLSearchParams();
        params.append('province',this.ruleForm2.address.province );
        params.append('city', this.ruleForm2.address.city);
        params.append('district', this.ruleForm2.address.district);
        params.append('datailAddress', this.ruleForm2.xxCity);
        params.append('tel', this.ruleForm2.manTell);
        params.append('name', this.ruleForm2.manName);
        axios({
          method: 'post',
          url: '/Home/Person/addaddress',
          data: params
        }).then(function (res) {
          _this.fullscreenLoading = false;
          const data = res.data
          if(data.status){
            _this.$notify({
              title: '成功',
              message: data.msg,
              showClose: false,
              duration: 2000,
              type: 'warning',
              onClose:function () {
                _this.$router.push({ path: '/mine/address' });
              }
            });
          }else{
            _this.$notify.error({
              title: '错误',
              message: data.msg,
              showClose: false,
              duration: 2000
            });
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      signVo(){

      }
    },
    components: {
      VDistpicker,
      Scroll
    }
  }
</script>
<style lang="less">
  .fillAddress{
    background-color:#f5f5f5;
    position:absolute;
    width:100%;
    height:100%;
    .cityDiv{
      height:40px;
      .el-input{
        position:absolute;
        display: initial;
        width:100%;
      }
    }
    .distpicker-address-wrapper{
      position: absolute;
      z-index: 99;
      width: 100%;
      overflow: auto;
      left:0;
      bottom:0;
      .address-container{
        max-height:5rem;
        overflow: auto;
      }
    }
    .d-w-mall{
      background-color:white;
      padding:0 15px;
      padding-top:15px;
      .subBox{
        border:none;
        .el-form-item__content{
          margin-left:0 !important;
        }
      }
    }
    .el-form-item{
      border-bottom:1px solid #eee;
      margin-bottom:15px;
    }
    .el-form-item__label{
      text-align: left;
    }
    .el-input__inner,.el-textarea__inner{
      background:none;
      border:none;
      padding:0;
    }
    .goodsList{
      li{
        background-color:white;
        margin-bottom:10px;
        padding-bottom:10px;
        padding:10px;
        padding-top:15px;
        .timeYy{
          padding:10px 0;
          justify-content: space-between;
          border-bottom:1px solid #eee;
          span{
            /*color:#11b1ee;*/
          }
        }
        .right-text{
          color:#506187;
          padding:10px 0;
          h4{
            font-size:15px;
            margin-bottom:15px;
          }
          .bm-ad{
            justify-content: space-between;
            a{
              display: inline-block;
              width:1.3rem;
              height:0.6rem;
              line-height:0.6rem;
              border-radius: 0.3rem;
              border:1px solid #ccc;
              text-align: center;
              margin-left:10px;
            }
            .active{
              border:1px solid #11b1ee;
              color:#11b1ee;
            }
          }
        }
      }
      li:last-child{
        border:none;
      }
    }
    .add-address{
      display: block;
      width:6rem;
      height:0.9rem;
      border:none;
      background: -webkit-linear-gradient(left, #3cc6fb , #11b1ee); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #3cc6fb , #11b1ee); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #3cc6fb , #11b1ee); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #3cc6fb , #11b1ee); /* 标准的语法 */
      color:white;
      border-radius: 0.45rem;
      margin:0.8rem auto 0.5rem auto;
    }
  }
</style>
