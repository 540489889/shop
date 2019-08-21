<template>
  <scroll class="mineAddress wrapper recommend-content" :data="msg" v-loading.fullscreen.lock="fullscreenLoading">
    <ul class="goodsList goodsList1">
      <li v-for="(item,index) in msg" :key="item.id">
        <h4 class="flex-box timeYy">{{item.name}} <span>{{item.tel}}</span></h4>
        <div class="right-text">
          <h4>{{item.address}}</h4>
          <div class="flex-box bm-ad">
            <!--<span class="flex-box">-->
            <!--<el-radio @change="radioChange(item.id)" v-model="radio" :name="item.status">设为默认地址</el-radio>-->
            <!--</span>-->
            <span class="flex-box">
                  <div class="flex-box" v-if="item.status==1">
                      <input type="radio" :id="'a'+item.id" @change="radioChange(item.id)" checked name="radioFile" :value="item.status">
                      <label :for="'a'+item.id"> 设为默认地址</label>
                  </div>
                  <div class="flex-box" v-else>
                      <input @change="radioChange(item.id)" :id="'a'+item.id" type="radio"  name="radioFile" :value="item.status">
                      <label :for="'a'+item.id">设为默认地址</label>
                  </div>
              <!--<el-radio @change="radioChange(item.id)" v-model="radioFalse" :name="item.status">设为默认地址</el-radio>-->
              </span>
            <div>
              <router-link tag="a" :to="'/mine/editAddress?id='+item.id">编辑</router-link><a @click="deleteAddress(index,item.id)">删除</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <router-link tag="button" to="/mine/fillAddress" class="add-address">新增收货地址</router-link>
  </scroll>
</template>
<script>
  import Scroll from './../components/scroll.vue'
  import axios from 'axios'
  export default {
    name: 'editAddress',
    data () {
      return {
        radio: 1,
        radioFalse: 'false',
        fullscreenLoading:false,
        msg: []
      }
    },
    components: {
      Scroll
    },
    methods: {
      radioChange (id){
        console.log(id)
        let _this = this
        this.fullscreenLoading = true;
        let params = new URLSearchParams();
        params.append('id',id);
        axios({
          method: 'post',
          url: '/Home/Person/defaultAdd',
          data: params
        })
          .then(function (res) {
            const data = res.data
            _this.fullscreenLoading = false
            console.log(data)
            if(data.status){
              _this.$notify({
                title: '成功',
                type: 'success',
                message: data.msg,
                showClose: false,
                duration: 1000,
                onClose: function () {
                }
              });
            }else{
              _this.$notify({
                title: '错误',
                type: 'error',
                message: data.msg,
                showClose: false,
                duration: 1000,
                onClose: function () {
                }
              });
            }
          })
      },
      //获取地址信息
      getAddress () {
        this.fullscreenLoading = true
        axios.get('/Home/Person/address')
          .then(this.getAddressSucc)
      },
      getAddressSucc (res) {
        const data = res.data
        if(data.status){
          this.msg = data.msg
          console.log(this.msg)
          this.fullscreenLoading = false
        }
      },
      //删除
      deleteAddress (index,id){
        let _this = this
        this.fullscreenLoading = true;
        let params = new URLSearchParams();
        params.append('id',id);
        axios({
          method: 'post',
          url: '/Home/Person/deladdress',
          data: params
        })
          .then(function (res) {
            const data = res.data
            console.log(data)
            _this.$notify({
              title: '删除成功',
              type: 'success',
              message: data.msg,
              showClose: false,
              duration: 1000,
              onClose: function () {
                // 删一个数组元素
                _this.msg.splice(index,1);
                _this.fullscreenLoading = false;
              }
            });
          })

      },
    },
    mounted (){
      this.getAddress();
    }
  }
</script>
<style lang="less" scoped>
  .mineAddress{
    background-color:#f5f5f5;
    position:absolute;
    width:100%;
    height:100%;
    input[type="radio"] {
      width: 20px;
      height: 20px;
      opacity: 0;
      display:none;
    }
    input[type="radio"] + label::before {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: text-bottom;
      border: 1px solid #d9d9d9;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: "";
      position:relative;
      top:-2px;
    }
    input[type="radio"]:checked +  label::before {
      background-color: white;
      background-clip: content-box;
      border-color: #79a0ff;
      border-width: 5px;
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
      margin:0.8rem auto 0.2rem auto;
    }
  }
</style>
